/*jshint esversion: 8 */
const createLighthouse = require('lighthouse-lambda');

exports.handler = async function (event, context) {
  Promise.resolve()
    .then(() => createLighthouse(process.env.URL, { logLevel: 'info' }))
    .then(({ chrome, start }) => {
      return start()
        .then((results) => {
          return chrome.kill().then(() => JSON.stringify(results));
        })
        .catch((error) => {
          // Handle errors when running Lighthouse
          return chrome.kill().then(() => error);
        });
    })
    // Handle other errors
    .catch(callback);
};
