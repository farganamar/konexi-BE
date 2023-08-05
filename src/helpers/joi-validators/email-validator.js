const UsersModel = require('../../drivers/mongoose/models/UsersModel');

module.exports = {
  async validateAvailableEmail(email) {
    try {
      if (!email) {
        return email;
      }

      const user = await UsersModel.findOne({
        email: email,
      });

      if (user) {
        throw new Error('Email has been used');
      }

      return email;
    } catch (error) {
      throw new Error(error.message);
    }
  },
};
