const JWT = require('jsonwebtoken');
const ms = require('ms')
const { setCacheData, getCacheData, deleteCacheData } = require('../../drivers/cache');

module.exports = {
  generateAccessToken: (payload) =>
    new Promise((resolve, reject) => {
      const secret = process.env.ACCESS_TOKEN_KEY;
      const option = {
        expiresIn: '1d',
      };
      JWT.sign(payload, secret, option, async (err, token) => {
        if (err) return reject(err);
        await setCacheData({
          key: `access_token_${payload.aud}`,
          data: token,
          additionalData: payload,
          expiredAt: (ms(process.env.ACCESS_TOKEN_EXP || '1d') / 1000).toFixed(0),
        });        

        return resolve(token);
      });
    }),
  verifyAccessToken: (token) =>
    new Promise((resolve, reject) => {
      JWT.verify(token, process.env.ACCESS_TOKEN_KEY, async (err, payload) => {
        try {
          if (err) {
            console.error(`${filePath}/verifyAccessToken`, err.message);
            throw new Error(err.message);
          }

          const { data: activeToken } = await getCacheData({
            key: `access_token_${payload.aud}`,
          });

          if (!activeToken) {
            throw new Error('Token access expired');
          }

          if (activeToken !== token) {
            throw new Error('Token access expired');
          }

          resolve(payload);
        } catch (error) {
          reject(error);
        }
      });
    }),    
};
