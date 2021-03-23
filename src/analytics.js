/*!
 Analytics with cookie-consent

 NDF, 14-Mar-2021.
*/

const GA_ANALYTICS_ID = 'UA-8330079-10'; // 'UA-1036645-1'; // EDIT !!

const DEBUG = true;

/* eslint-disable */
(function(i,s,o,g,r,a,m){
  i['GoogleAnalyticsObject']=r;
  i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments) },i[r].l =1*new Date();
  a=s.createElement(o),m=s.getElementsByTagName(o)[0];
  a.async=1;
  a.src=g;
  m.parentNode.insertBefore(a,m)
})(window,document,'script',`https://www.google-analytics.com/analytics${DEBUG ? '_debug' :''}.js`,'ga');
/* eslint-enable */

export function createAnalytics (consentToCookies, analyticsId = GA_ANALYTICS_ID) {
  const ga = window.ga;

  window.ga_debug = { trace: true };

  if (consentToCookies) {
    ga('create', analyticsId, 'auto');
  } else {
    // https://developers.google.com/analytics/devguides/collection/analyticsjs/cookies-user-id#disabling_cookies
    ga('create', analyticsId, {
      storage: 'none'
    });
  }
  // https://developers.google.com/analytics/devguides/collection/analyticsjs/ip-anonymization
  ga('set', 'anonymizeIp', true); // Privacy-related!
  ga('set', 'allowAdFeatures', false); // Privacy-related!
  ga('send', 'pageview');

  console.debug('createAnalytics:', consentToCookies);
}
