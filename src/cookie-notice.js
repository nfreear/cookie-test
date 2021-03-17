/*!
 Work-in-progress! - © 2021 Nick Freear.

 NDF, 15-Mar-2021

 https://ico.org.uk/for-organisations/guide-to-pecr/cookies-and-similar-technologies/
*/

import { filterCookies, deleteCookies, OU_NECESSARY_COOKIES } from './cookie-lib.js';

const CONFIG_SELECTOR = '#cookie-notice-config';

export const DEFAULTS = {
  label: 'Cookie notice',
  message: 'We use necessary cookies to make our site work. We’d also like to set optional analytics cookies to help us improve it. We won’t set optional cookies unless you enable them. You can read more on our',
  link: './cookies',
  linkText: 'Cookies page',
  accept: 'I accept',
  reject: 'I do not accept',
  position: 'top',
  role: 'form',
  necessaryCookies: OU_NECESSARY_COOKIES,
  eventPrefix: 'iet-ou.cookie-notice:',
  eventTarget: window,
  cookieDomain: '.open.ac.uk'
};

const Event = window.Event;
const localStorage = window.localStorage;

const AUTO_RUN = !!document.querySelector('script[ src *= "/cookie-notice.js?auto" ]');

export class CookieNotice {
  constructor (options = {}) {
    this.OPT = this.getConfig(options);
    this.state = this.getState();
  }

  getConfig (options) {
    const ELEM = document.querySelector(CONFIG_SELECTOR);
    const DATA_SET = ELEM ? ELEM.dataset : {};

    const OPT = { ...DEFAULTS, ...options, ...DATA_SET };

    if (typeof OPT.necessaryCookies === 'string') {
      OPT.necessaryCookies = OPT.necessaryCookies.split(' ');
    }
    return OPT;
  }

  getHtml () {
  // Was: buildTemplate () {}
    const OPT = this.OPT;

    const TEMPLATE = `
    <p>${OPT.message} <a href="${OPT.link}">${OPT.linkText}</a>.</p>
    <p>
    <button class="accept-btn">${OPT.accept}</button> <button class="reject-btn">${OPT.reject}</button>
    </p>`;

    /* const TEMPLATE = [
      '<p>',
      `${OPT.message} <a href="${OPT.link}">${OPT.linkText}</a>`,
      '</p>',
      '<p>',
      `<button class="accept">${OPT.accept}</button> <button class="reject">${OPT.reject}</button>`,
      '</p>'
    ]; */

    return TEMPLATE;
  }

  buildNotice () {
    const OPT = this.OPT;
    const NOTE = this.NOTICE = document.createElement('div');

    NOTE.classList.add('iet-ou-cookie-notice');
    NOTE.classList.add(OPT.position);

    NOTE.setAttribute('role', OPT.role);
    NOTE.setAttribute('aria-label', OPT.label);

    NOTE.innerHTML = this.getHtml(); // .buildTemplate().join('\n');

    NOTE.querySelector('.accept-btn').addEventListener('click', ev => {
      ev.preventDefault();

      this.hide();
      this.saveState('accept');
      this.dispatchEvent('accept', { ev });
    });

    NOTE.querySelector('.reject-btn').addEventListener('click', ev => {
      ev.preventDefault();

      this.hide();
      const cookies = this.rejectCookies();
      this.saveState('reject');
      this.dispatchEvent('reject', { cookies, ev });
    });

    document.body.prepend(NOTE);
  }

  hide () {
    this.NOTICE.classList.add('hide');
  }

  rejectCookies () {
    const cookies = filterCookies();

    deleteCookies(cookies.exclude, this.OPT.cookieDomain);

    console.debug('Reject:', cookies);
  }

  dispatchEvent (action, data = null) {
    const OPT = this.OPT;
    const event = new Event(`${OPT.eventPrefix}${action}`);
    event.data = data;

    this.OPT.eventTarget.dispatchEvent(event);

    console.debug('CookieNotice dispatch:', action, event);
  }

  saveState (action) {
    const OPT = this.OPT;

    localStorage.setItem(`${OPT.eventPrefix}action`, action);
    localStorage.setItem(`${OPT.eventPrefix}date`, new Date().toISOString());
  }

  getState () {
    const OPT = this.OPT;

    return {
      action: localStorage.getItem(`${OPT.eventPrefix}action`),
      date: localStorage.getItem(`${OPT.eventPrefix}date`)
    }
  }

  isAccepted () {
    return this.getState().action === 'accept';
  }

  hasState () {
    return !!this.getState().action;
  }

  autoRun () {
    if (this.hasState()) {
      this.dispatchEvent(this.isAccepted() ? 'accept' : 'reject', { autoRun: true });
    } else {
      this.buildNotice();
    }

    console.debug('CookieNotice:', this);
  }
}

if (AUTO_RUN) {
  const CN = new CookieNotice();

  CN.autoRun();
}
