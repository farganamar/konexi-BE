const s3 = require('.');

const putObject = ({
  bucket, key, buffer, contentType, isPublic = false,
}) => new Promise((resolve, reject) => {
  const options = {
    Bucket: bucket,
    Key: key,
    Body: buffer,
    ContentType: contentType,
  };

  if (isPublic) {
    options.ACL = 'public-read';
  }

  s3.putObject(options, (err, data) => {
    if (err) {
      reject(err);
    }

    resolve(data);
  });
});

module.exports = putObject;
