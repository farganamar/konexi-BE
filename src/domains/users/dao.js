const UsersModel = require("../../drivers/mongoose/models/UsersModel");

const filePath = 'src/domains/users/dao';

module.exports = class {
  constructor() {
    this.Users = UsersModel
  }

  async findById(id) {
    try {
      const user = await this.Users.findById(id);

      return user;
    } catch (error) {
      console.error(`${filePath}/findById`, error?.message || error);

      throw error;
    }
  }

  async updateProfile(data) {
    try {
      console.log(data)
      const user = await this.Users.findOneAndUpdate(
        {
          _id: data.id
        },
        {
          avatar: data.avatar
        },
        { new : true }
      );

      return user;
    } catch (error) {
      console.error(`${filePath}/updateProfile`, error?.message || error);

      throw error;
    }
  }
};