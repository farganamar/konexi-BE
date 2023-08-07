const AWS = require('aws-sdk');

const options = {
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_ACCESS_SECRET,
  signatureVersion: 'v4',
  region: process.env.S3_REGION,
};

if (process.env.S3_ENDPOINT) {
  options.endpoint = process.env.S3_ENDPOINT;
}

if (process.env.S3_FORCE_PATH_STYLE === 'TRUE') {
  options.s3ForcePathStyle = true;
}

const s3 = new AWS.S3(options);

module.exports = s3;
