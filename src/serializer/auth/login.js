const serializeLogin = (data) => ({
  username: data.username,
  email: data.email,
  access_token: data.access_token || '',
});

const serialize = (data) => {
  if (!data) {
    throw new Error('Expect data to be not undefined nor null');
  }
  if (Array.isArray(data)) {
    return data.map(serializeLogin);
  }
  return serializeLogin(data);
};

module.exports = {
  serialize,
};
