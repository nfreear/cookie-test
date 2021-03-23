/*!
  headerfooter.js

  SOURCE :~ http://www.open.ac.uk/ouheaders/js/headerfooter.min.js?2.0.0.56;

  © 2021 The Open University. All rights reserved.
*/

// Unexpected use of comma operator.
// '$' is not defined.

const Event = window.Event;
// const location = location || window.location;

/* ... */

const OUCookiePolicy = {

  getCookie: function () {
    return Cookie.get('ou_cookie_policy');
  },

  setCookie: function (value) {
    return Cookie.set('ou_cookie_policy', value, 365);
  },

  accepted: function () {
    return OUCookiePolicy.getCookie() === 'continue' || Cookie.get('SAMSsession') !== null || Cookie.get('SAMS2session') !== null;
  },

  getPolicyUrl: function () {
    const a = window.location.hostname;
    const b = a.indexOf('.');
    return a.slice(b, a.length) === '.openuniversity.edu' ? '/privacy' : 'http://www.open.ac.uk/about/main/strategy-and-policies/policies-and-statements/cookie-use-ou-website';
  },

  displayNotification: function () {
    const a = document.createElement('div');
    a.setAttribute('class', 'ou-cookies-interaction');
    const b = document.createElement('div');
    b.setAttribute('class', 'ou-container');
    const c = document.createElement('div');
    c.setAttribute('class', 'ou-row');
    const d = document.createElement('h3');
    d.setAttribute('data-translate', 'true'), d.setAttribute('id', 'ou-header-id1');
    const e = document.createTextNode('Cookies on our website');
    d.appendChild(e), c.appendChild(d), b.appendChild(c), a.appendChild(b), OULanguageTranslation.init(d.id);
    const f = document.createElement('div');
    f.setAttribute('id', 'ou-polWrap'), f.setAttribute('class', 'ou-row ou-policyWrap');
    const g = document.createElement('p');
    g.setAttribute('data-translate', 'true'), g.setAttribute('id', 'ou-para-id');
    const h = document.createTextNode('We use cookies to make sure our websites work effectively and to improve your user experience.  If you continue to use this site we will assume that you are happy with this. However, you can change your cookie settings at any time. ');
    g.appendChild(h), f.appendChild(g), c.appendChild(f), b.appendChild(c), a.appendChild(b), OULanguageTranslation.init(g);
    const i = document.createElement('a');
    i.setAttribute('data-translate', 'true'), i.setAttribute('href', OUCookiePolicy.getPolicyUrl()), i.setAttribute('onclick', 'javaScript:document.location.href=OUCookiePolicy.getPolicyUrl()'), i.setAttribute('class', 'cookieInfo'), i.setAttribute('id', 'ou-anchortag-id1');
    const j = document.createTextNode('More Info/Change Settings.');
    i.appendChild(j), g.appendChild(i), OULanguageTranslation.init(i);
    const k = document.createElement('a');
    k.setAttribute('data-translate', 'true'), k.setAttribute('class', 'ou-button'), k.setAttribute('id', 'ou-cookies-bar-button'), k.setAttribute('role', 'button'), k.setAttribute('href', '#'), k.setAttribute('onclick', 'javaScript:OUCookiePolicy.accept()');
    const l = document.createTextNode('Continue');
    k.appendChild(l), OULanguageTranslation.init(k.id), f.appendChild(k);

    const cookieWrapper = document.createElement('div');
    cookieWrapper.id = 'i-cookies-bar', cookieWrapper.className = 'ou-cookies-bar ou-active', cookieWrapper.appendChild(a), document.body.insertBefore(cookieWrapper, document.body.firstChild), navigator.userAgent.indexOf('MSIE') !== -1 || navigator.appVersion.indexOf('Trident/') > 0 ? $(window).trigger('resize') : window.dispatchEvent(new Event('resize'));
  },

  accept: function () {
    OUCookiePolicy.setCookie('continue');

    let countryCode;
    typeof countryCode !== 'undefined' && countryCode === '' && OUCookiePolicy.setCookie(countryCode), typeof countryCode !== 'undefined' && countryCode !== '' && OUCookiePolicy.setCookie(countryCode), location.reload(!0);
  },

  notify: function () {
    OUCookiePolicy.displayNotification(), OUCookiePolicy.setCookie('notified');
  },

  init: function () {
    OUCookiePolicy.accepted() || OUCookiePolicy.notify();
  }
};

const Cookie = {

  set: function (name, val, age) {
    let d, e, f, g, h;
    age ? (f = new Date(), f.setTime(f.getTime() + 24 * age * 60 * 60 * 1e3), g = '; expires=' + f.toGMTString()) : g = '', h = location.host, h.split('.').length === 1 ? document.cookie = name + '=' + val + g + '; path=/' : (e = h.split('.'), e.shift(), d = '.' + e.join('.'), document.cookie = name + '=' + val + g + '; path=/; domain=' + d, Cookie.get(name) !== null && Cookie.get(name) === val || (d = '.' + h, document.cookie = name + '=' + val + g + '; path=/; domain=' + d));
  },

  get: function (name) {
    for (let b = name + '=', c = document.cookie.split(';'), d = 0; d < c.length; d++) {
      for (let e = c[d]; e.charAt(0) === ' ';) {
        e = e.substring(1, e.length);

        if (e.indexOf(b) === 0) {
          return e.substring(b.length, e.length);
        }
      }
    }
    return null;
  },

  erase: function (name) {
    Cookie.set(name, '', -1);
  }
};

window.addEventListener ? window.addEventListener('load', OUCookiePolicy.init, !1) : window.attachEvent && window.attachEvent('onload', OUCookiePolicy.init);

/* ... */

function OULanguageTranslation () {
  this.requiresTranslation = !1;
}

/* ... */

OULanguageTranslation.init = function (a) {
  /* No-op. */
};

/* ... */

/* End. */
