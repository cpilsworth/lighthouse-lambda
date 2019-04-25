/*jshint esversion: 8 */
const createLighthouse = require('lighthouse-lambda');

exports.handler = async function (event, context) {
  Promise.resolve()
    .then(() => createLighthouse(process.env.URL, { logLevel: 'info' }))
    .then(({ chrome, start }) => {
      return start()
        .then((results) => {
          console.log( JSON.stringify(results));
          return chrome.kill().then(() => JSON.stringify(results));
        })
        .catch((error) => {
          console.log(error);
          // Handle errors when running Lighthouse
          return chrome.kill().then(() => error);
        });
    });
};
