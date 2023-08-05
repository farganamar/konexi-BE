const JWT = require('jsonwebtoken');

module.exports = {
  generateAccessToken: (payload) =>
    new Promise((resolve, reject) => {
      const secret = process.env.ACCESS_TOKEN_KEY;
      const option = {
        expiresIn: '1d',
      };
      JWT.sign(payload, secret, option, async (err, token) => {
        if (err) return reject(err);

        return resolve(token);
      });
    }),
};
