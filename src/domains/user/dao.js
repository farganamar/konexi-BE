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

  async follow(userId, currentUser) {
    try {
      const user = await this.Users.findById(userId);
      const follow = await this.Users.findById(currentUser) 

      if (!user) throw new Error('User not found')

      if (userId) {
        if (!follow.following.includes(userId) && userId !== currentUser) {
          follow.following.push(userId)
        }
      }

      return follow.save();      
    } catch (error) {
      console.error(`${filePath}/follow`, error?.message || error);

      throw error;      
    }
  }

  async unFollow(userId, currentUser) {
    try {
      const user = await this.Users.findById(userId);
      const follow = await this.Users.findById(currentUser) 

      if (!user) throw new Error('User not found')

      if (userId) {
        if (follow.following.includes(userId)) {
          follow.following.pop(userId)
        }
      }

      return follow.save();    
    } catch (error) {
      console.error(`${filePath}/follow`, error?.message || error);

      throw error;      
    }
  }  
};