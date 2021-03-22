/*!
 Live-server middleware :~ set some test cookies.

 NDF, ~~ 15-March-2021.

 https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie
*/

const PORT = 8080;
const SC_DOMAIN = '.open.ac.uk';
const SC_URL_REGEX = /\/set-cookie/;

const liveServer = require('live-server');

const params = {
  port: PORT, // 8181, // Set the server port. Defaults to 8080.
  host: '0.0.0.0', // Set the address to bind to. Defaults to 0.0.0.0 or process.env.IP.
  // root: "/public", // Set root directory that's being served. Defaults to cwd.
  open: false, // When false, it won't load your browser by default.
  // ignore: 'scss,my/templates', // comma-separated string for paths to ignore
  // file: "index.html", // When set, serve this file (server root relative) for every 404 (useful for single-page applications)
  wait: 1000, // Waits for all changes, before reloading. Defaults to 0 sec.
  // mount: [['/components', './node_modules']], // Mount a directory to a route.
  logLevel: 2, // 0 = errors only, 1 = some, 2 = lots
  middleware: [setCookieMiddleware, function (req, res, next) { next(); }] // Takes an array of Connect-compatible middleware that are injected into the server middleware stack
};

liveServer.start(params);

function setCookieMiddleware (req, res, next) {
  const IS_JAVASCRIPT_OR_API = /\w\.js(on)?/.test(req.url);

  if (IS_JAVASCRIPT_OR_API) {
    res.setHeader('Access-Control-Allow-Origin', '*');
  }

  if (SC_URL_REGEX.test(req.url)) {
    res.writeHead(200, {
      'Set-Cookie': [
        `test_1=10 mins; Max-Age=600; Domain=${SC_DOMAIN}; Path=/`,
        `CDC_UID=99ee80e135bb44e7b7b98884bf2af5bc; Domain=${SC_DOMAIN}; Path=/`,
        `HS7BDF=Joe Bloggs; Domain=${SC_DOMAIN}; Path=/`,
        `SAMS2session=999c24756819fce779e793c9c9493865605516aajb123.samsStaffID=00001234; Domain=${SC_DOMAIN}; Path=/`
      ],
      'Content-Type': 'text/plain',
      'Access-Control-Allow-Origin': '*'
    });

    res.end('Setting test cookies!');

    console.log('Request cookies:', req.headers.cookie);
    console.log('Response headers:', res.getHeaders());
  } else {
    next();
  }
}
