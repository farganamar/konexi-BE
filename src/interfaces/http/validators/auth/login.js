const joi = require('joi')

const validator = joi.object({
  email: joi.string().optional(),
  username: joi.string().optional(),
  password: joi.string().required(),
}).or('username', 'email')

module.exports = (object) => validator.validateAsync(object, {
  errors: {
    wrap: {
      label: '',
    },
  },
  object,
});