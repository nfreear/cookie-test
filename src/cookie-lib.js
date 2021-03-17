/*!
 NDF, 14-Mar-2021.

 https://developer.mozilla.org/en-US/docs/Web/API/document/cookie
 https://github.com/IET-OU/ou-gigya-auth-js/blob/ou-sams/src/ou-sams-authentication.js
*/

// OU strictly necessary cookies!
export const OU_NECESSARY_COOKIES = 'CDC_UID SAMSsession SAMS2session HS7BDF'.split(' ');

/*
const AUTH_SAMS_COOKIES = 'SAMSsession SAMS2session HS7BDF X_NOT_OUPERSIST'.split(' ');
const AUTH_CDC_COOKIES  = 'CDC_UID gig_llp gig_llu'.split(' ');
// Also: gig_bootstrap_3_mDxR4kcZ6X3IwdrDVmyMuxLhGbeVPL7-15Z5BINRdJIaxGBAaz8gRqP4_6yZ7Ku0'
const POLICY_COOKIES = 'ou_cookie_policy s_cc'.split(' ');
*/

export class CookieDictionary {
  constructor (testCookie = null) {
    const COOKIE = testCookie || document.cookie;

    this.dict = COOKIE
      ? COOKIE.split(';').map(it => {
          const co = it.match(/([^=]+)=(.*)/); // Was: it.split('=');
          return { cn: co[1].trim(), cv: decodeURIComponent(co[2]) };
        })
      : [];

    // console.debug(this);
  }

  find (name, def = null) {
    const cookie = this.dict.find(it => it.cn === name);
    return cookie && cookie.cv ? cookie.cv : def;
  }

  filter (cookieNames = []) {
    const include = this.dict.filter(it => cookieNames.includes(it.cn));
    const exclude = this.dict.filter(it => !cookieNames.includes(it.cn));

    return { include, exclude };
  }
}

export function filterCookies (includeNames = OU_NECESSARY_COOKIES) {
  // const necessary = [];
  // const optional = [];

  const DICT = new CookieDictionary();

  return DICT.filter(includeNames);
}

/* https://stackoverflow.com/questions/2144386/how-to-delete-a-cookie
*/
export function deleteCookie (cookie, domain = null) {
  const domainPart = domain ? `; domain=${domain}` : '';
  const deleteCookie = `${encodeURIComponent(cookie.cn)}=; max-age=-99${domainPart}`;

  document.cookie = deleteCookie;

  console.debug('Delete cookie:', deleteCookie);
}

export function deleteCookies (names, domain = null) {
  names.forEach(name => deleteCookie(name, domain));
}

/* https://stackoverflow.com/questions/14573223/set-cookie-and-get-cookie-with-javascript
*/
export function setCookie (name, value, ageSeconds = null) {
  const agePart = ageSeconds ? `; max-age=${parseInt(ageSeconds)}` : '';

  document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}${agePart}`;
}

// End.
