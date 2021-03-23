/*!
  headerfooter.js

  SOURCE :~ http://www.open.ac.uk/ouheaders/js/headerfooter.min.js?2.0.0.56;

  © 2021 The Open University. All rights reserved.
*/

/* ... */

var OUCookiePolicy = {

        getCookie: function () {
            return Cookie.get("ou_cookie_policy");
        },

        setCookie: function (a) {
            return Cookie.set("ou_cookie_policy", a, 365);
        },

        accepted: function () {
            return "continue" == OUCookiePolicy.getCookie() || null != Cookie.get("SAMSsession") || null != Cookie.get("SAMS2session");
        },

        getPolicyUrl: function () {
            var a = window.location.hostname,
                b = a.indexOf(".");
            return ".openuniversity.edu" == a.slice(b, a.length) ? "/privacy" : "http://www.open.ac.uk/about/main/strategy-and-policies/policies-and-statements/cookie-use-ou-website";
        },

        displayNotification: function () {
            var a = document.createElement("div");
            a.setAttribute("class", "ou-cookies-interaction");
            var b = document.createElement("div");
            b.setAttribute("class", "ou-container");
            var c = document.createElement("div");
            c.setAttribute("class", "ou-row");
            var d = document.createElement("h3");
            d.setAttribute("data-translate", "true"), d.setAttribute("id", "ou-header-id1");
            var e = document.createTextNode("Cookies on our website");
            d.appendChild(e), c.appendChild(d), b.appendChild(c), a.appendChild(b), OULanguageTranslation.init(d.id);
            var f = document.createElement("div");
            f.setAttribute("id", "ou-polWrap"), f.setAttribute("class", "ou-row ou-policyWrap");
            var g = document.createElement("p");
            g.setAttribute("data-translate", "true"), g.setAttribute("id", "ou-para-id");
            var h = document.createTextNode("We use cookies to make sure our websites work effectively and to improve your user experience.  If you continue to use this site we will assume that you are happy with this. However, you can change your cookie settings at any time. ");
            g.appendChild(h), f.appendChild(g), c.appendChild(f), b.appendChild(c), a.appendChild(b), OULanguageTranslation.init(g);
            var i = document.createElement("a");
            i.setAttribute("data-translate", "true"), i.setAttribute("href", OUCookiePolicy.getPolicyUrl()), i.setAttribute("onclick", "javaScript:document.location.href=OUCookiePolicy.getPolicyUrl()"), i.setAttribute("class", "cookieInfo"), i.setAttribute("id", "ou-anchortag-id1");
            var j = document.createTextNode("More Info/Change Settings.");
            i.appendChild(j), g.appendChild(i), OULanguageTranslation.init(i);
            var k = document.createElement("a");
            k.setAttribute("data-translate", "true"), k.setAttribute("class", "ou-button"), k.setAttribute("id", "ou-cookies-bar-button"), k.setAttribute("role", "button"), k.setAttribute("href", "#"), k.setAttribute("onclick", "javaScript:OUCookiePolicy.accept()");
            var l = document.createTextNode("Continue");
            k.appendChild(l), OULanguageTranslation.init(k.id), f.appendChild(k), cookieWrapper = document.createElement("div"), cookieWrapper.id = "i-cookies-bar", cookieWrapper.className = "ou-cookies-bar ou-active", cookieWrapper.appendChild(a), document.body.insertBefore(cookieWrapper, document.body.firstChild), -1 !== navigator.userAgent.indexOf("MSIE") || navigator.appVersion.indexOf("Trident/") > 0 ? $(window).trigger("resize") : window.dispatchEvent(new Event("resize"));
        },

        accept: function () {
            OUCookiePolicy.setCookie("continue"), "undefined" != typeof countryCode && "" == countryCode && OUCookiePolicy.setCookie(countryCode), "undefined" != typeof countryCode && "" != countryCode && OUCookiePolicy.setCookie(countryCode), location.reload(!0);
        },

        notify: function () {
            OUCookiePolicy.displayNotification(), OUCookiePolicy.setCookie("notified");
        },

        init: function () {
            OUCookiePolicy.accepted() || OUCookiePolicy.notify();
        }
    },

    Cookie = {
        set: function (a, b, c) {
            var d, e, f, g, h;
            c ? (f = new Date, f.setTime(f.getTime() + 24 * c * 60 * 60 * 1e3), g = "; expires=" + f.toGMTString()) : g = "", h = location.host, 1 === h.split(".").length ? document.cookie = a + "=" + b + g + "; path=/" : (e = h.split("."), e.shift(), d = "." + e.join("."), document.cookie = a + "=" + b + g + "; path=/; domain=" + d, null != Cookie.get(a) && Cookie.get(a) == b || (d = "." + h, document.cookie = a + "=" + b + g + "; path=/; domain=" + d));
        },
        get: function (a) {
            for (var b = a + "=", c = document.cookie.split(";"), d = 0; d < c.length; d++) {
                for (var e = c[d];
                    " " == e.charAt(0);) e = e.substring(1, e.length);
                if (0 == e.indexOf(b)) return e.substring(b.length, e.length);
            }
            return null;
        },
        erase: function (a) {
            Cookie.set(a, "", -1);
        }
    };

window.addEventListener ? window.addEventListener("load", OUCookiePolicy.init, !1) : window.attachEvent && window.attachEvent("onload", OUCookiePolicy.init);

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
