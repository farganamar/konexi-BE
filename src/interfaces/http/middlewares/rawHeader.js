const JWT = require('jsonwebtoken');

const keepHeaders = ['x-app-platform', 'x-app-version-code', 'x-app-version', 'x-app-device-id', 'x-app-device-name', 'x-app-device-version'];

module.exports = (req, res, next) => {
  try {
    const headers = { ...req.headers || {} };
    const rawHeader = {};

    keepHeaders.forEach((keepHeader) => {
      if (headers[keepHeader] && typeof headers[keepHeader] === 'string') {
        rawHeader[keepHeader] = headers[keepHeader];
      }
    });

    if (!('x-app-device-id' in rawHeader)) {
      const token = headers.authorization?.replace(/bearer/gi, '').replace(/ /g, '');
      const decoded = JWT.decode(token);

      const deviceId = decoded?.device || '-';
      rawHeader['x-app-device-id'] = deviceId;
    }

    req.rawHeader = rawHeader;
    return next();
  } catch (error) {
    req.rawHeader = {
      message: error?.message || '-',
    };
    return next();
  }
};
