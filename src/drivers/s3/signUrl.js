const s3 = require('.');

const signUrl = ({
  bucket,
  key,
  expiredInSecond = 300,
  region = process.env.S3_REGION,
}) => {
  if (region) {
    s3.config.region = region;
  }

  const params = {
    Bucket: bucket,
    Key: key,
    Expires: expiredInSecond,
  };

  const url = s3.getSignedUrl('getObject', params);

  return url;
};

module.exports = signUrl;
