const s3 = require('.');

const headObject = ({
  bucket, key,
}) => new Promise((resolve, reject) => {
  s3.headObject({
    Bucket: bucket,
    Key: key,
  }, (err, resp) => {
    if (err) {
      reject(err);
    }

    resolve(resp);
  });
});

module.exports = headObject;
