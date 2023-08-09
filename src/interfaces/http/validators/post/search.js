const joi = require('joi')

const validator = joi.object({
  keyword: joi.string().optional(),
})

module.exports = (object) => validator.validateAsync(object, {
  errors: {
    wrap: {
      label: '',
    },
  },
  object,
});