/*!
 Convert 'EditThisCookie' JSON to CSV ...

 NDF, 19-March-2021.
*/

const cookieData = require('../data/www.open.ac.uk-not-signed-in.json');
// const cookieData = require('../data/www.open.ac.uk.json');
// const cookieData = require('../data/www.open.ac.uk-youtube.com.json');

const CSV = cookieJsonToCsv(cookieData);

console.log(CSV.join('\n'));

function cookieJsonToCsv (data) {
  const CSV = [];

  data.forEach(cookie => {
    const { name, value, path, domain, expirationDate, session, id } = cookie;
    const time = expirationDate ? new Date(expirationDate * 1000).toISOString() : null;

    CSV.push(`${name},${value},${path},${domain},${expirationDate||'-'},${time},${session},${id}`);
  });

  return CSV;
}
