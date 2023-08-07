const httpErrors = require('http-errors');
const { verifyAccessToken } = require('../../../helpers/jwt');

const { name: packageName } = require('../../../../package.json');

const filePath = 'src/interfaces/http/middlewares/authentication';

const authentication = () => async (req, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader || !authorizationHeader.toLowerCase().startsWith('bearer ')) {
      throw new Error('Missing or wrong Authorization request header');
    }

    const token = authorizationHeader
      .replace(/bearer/gi, '')
      .replace(/ /g, '');

    const payload = await verifyAccessToken(token);

    req.payload = payload;

    next();
  } catch (error) {
    let errorMessage = error?.message || error;
    console.error(`${filePath}`, {
      url: req.originalUrl,
      method: req.method,
      message: errorMessage,
    });
    if (process.env.NODE_ENV !== 'production') {
      errorMessage = `${packageName} ${req.method} ${req.originalUrl} - ${errorMessage}`;
    }
    next(httpErrors.Unauthorized(errorMessage));
  }
};

module.exports = authentication;
