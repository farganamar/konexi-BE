const joi = require('joi')

const validator = joi.object({
  like: joi.boolean().required(),
})

module.exports = (object) => validator.validateAsync(object, {
  errors: {
    wrap: {
      label: '',
    },
  },
  object,
});