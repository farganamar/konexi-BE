const joi = require('joi')

const validator = joi.object({
  file: joi.object().optional(),
})

module.exports = (object) => validator.validateAsync(object, {
  errors: {
    wrap: {
      label: '',
    },
  },
  object,
});