const signUrl = require("../../drivers/s3/signUrl");

const serializeProfile = (data) => {
  let result = {
    id: data.id,
    username: data.username,
    email: data.email,
    first_name: data.first_name,
    last_name: data.last_name,
    avatar: ''
  }

  if (data.avatar) {
    result.avatar = signUrl({
      bucket: process.env.S3_PUBLIC_BUCKET,
      key: data.avatar,
    })
  }

  return result

};

const serialize = (data) => {
  if (!data) {
    throw new Error('Expect data to be not undefined nor null');
  }
  if (Array.isArray(data)) {
    return data.map(serializeProfile);
  }
  return serializeProfile(data);
};

module.exports = {
  serialize,
};
