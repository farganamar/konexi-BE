const joi = require('joi')
const { validateAvailableEmail } = require('../../../../helpers/joi-validators/email-validator')
const { validateAvailableUsername } = require('../../../../helpers/joi-validators/username-validator')

const validator = joi.object({
  email: joi.string().external(validateAvailableEmail).required(),
  username: joi.string().external(validateAvailableUsername).required(),
  password: joi.string().required(),
  password_confirmation: joi.any().valid(joi.ref('password')),
  first_name: joi.string().required(),
  last_name: joi.string().required(),
})

module.exports = (object) => validator.validateAsync(object, {
  errors: {
    wrap: {
      label: '',
    },
  },
  object,
});