/*jshint esversion: 6 */
const createLighthouse = require('lighthouse-lambda');

exports.handler = function (event, context, callback) {
  Promise.resolve()
    .then(() => createLighthouse(process.env.URL, { logLevel: 'info' }))
    .then(({ chrome, start }) => {
      return start()
        .then((results) => {
          console.log(JSON.stringify(result));
          return chrome.kill().then(() => callback(null));
        })
        .catch((error) => {
          console.log(error);
          // Handle errors when running Lighthouse
          return chrome.kill().then(() => callback(error));
        });
    })
    // Handle other errors
    .catch(callback);
};
