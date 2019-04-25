/*jshint esversion: 8 */
const createLighthouse = require('lighthouse-lambda');
const AWS = require('aws-sdk');

exports.handler = async function (event, context) {
  
  let { chrome, start } = await createLighthouse(process.env.URL, { logLevel: 'info' });
  let results = await start();

  console.log(JSON.stringify(results.lhr));

  const s3 = new AWS.S3();
  var params = {
    Bucket : process.env.BUCKET,
    Key : process.env.KEY,
    Body : JSON.stringify(results.lhr)
  };
  await s3.putObject(params).promise();

  await chrome.kill();

};
