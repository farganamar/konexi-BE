const secretBodies = ['pin', 'password', 'password_confirmation', 'otp', 'refresh_token', 'access_token', 'birth_date', 'birth_place', 'gender', 'insurance_number', 'street', 'rt_rw', 'card_id', 'id_card'];
const hideBodies = ['username', 'first_name', 'last_name', 'email', 'phone', 'phone_number', 'phonenumber', 'birth_place'];

module.exports = (req, res, next) => {
  try {
    const rawBody = { ...req.body || {} };
    secretBodies.forEach((secretBody) => {
      if (rawBody[secretBody] && typeof rawBody[secretBody] === 'string') {
        rawBody[secretBody] = '***';
      }
    });

    hideBodies.forEach((hideBody) => {
      if (rawBody[hideBody] && typeof rawBody[hideBody] === 'string') {
        const hideData = rawBody[hideBody].slice(0, -parseInt(rawBody[hideBody].length * 0.5, 10));
        rawBody[hideBody] = `${hideData}***`;
      }
    });

    req.rawBody = rawBody;
    return next();
  } catch (error) {
    req.rawBody = {
      message: error?.message || '-',
    };
    return next();
  }
};
