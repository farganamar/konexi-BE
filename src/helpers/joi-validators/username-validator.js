const UsersModel = require('../../drivers/mongoose/models/UsersModel');

module.exports = {
  async validateAvailableUsername(username) {
    try {
      if (!username) {
        return username;
      }

      const user = await UsersModel.findOne({
        username: username,
      });

      if (user) {
        throw new Error('username has been used');
      }

      return username;
    } catch (error) {
      throw new Error(error.message);
    }
  },
};
