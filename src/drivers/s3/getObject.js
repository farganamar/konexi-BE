const s3 = require('.');

const getObject = ({
  bucket, key,
}) => new Promise((resolve, reject) => {
  s3.getObject({
    Bucket: bucket,
    Key: key,
  }, (err, resp) => {
    if (err) {
      reject(err);
    }

    resolve(resp);
  });
});

module.exports = getObject;
