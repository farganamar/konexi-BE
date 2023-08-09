
const joi = require('joi')

const validator = joi.object({
  content: joi.string().required(),
})

module.exports = (object) => validator.validateAsync(object, {
  errors: {
    wrap: {
      label: '',
    },
  },
  object,
});