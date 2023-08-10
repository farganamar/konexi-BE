const joi = require('joi')

const validator = joi.object({
  user_id: joi.string().required(),
})

module.exports = (object) => validator.validateAsync(object, {
  errors: {
    wrap: {
      label: '',
    },
  },
  object,
});