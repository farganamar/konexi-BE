const normalizeEmail = require('../../helpers/utils/normalizeEmail');

const filePath = 'src/domains/authentication/dao';

module.exports = class {
  constructor({
    UsersModel
  }) {
    this.Users = UsersModel;
  }

  async findOne(params = null) {
    try {
      const user = await this.Users.findOne(params)

      return user;
    } catch (error) {
      console.error(`${filePath}/findOne`, error);

      throw error;
    }
  }

  async register(data) {
    try {
      const saveUser = await this.Users.findOneAndUpdate(
        {
          $or: [
            { email: data.oldEmail || data.email },
            { email: normalizeEmail(data.oldEmail || data.email) },
          ],          
          username: data.oldUsername || data.username,
        },
        {
          $set: data,
        },
        {
          upsert: true,
          new: true,          
        }
      ).catch((err) => {
        if (err.code === 11000) {
          if (err.keyPattern.email) {
            throw new Error('Email sudah digunakan oleh User Lain');
          } else {
            throw new Error('User already registered');
          }
        } else {
          throw err;
        }      
      })

      await saveUser.save();

      return saveUser
    } catch (error) {
      console.error(`${filePath}/register`, error);

      throw error;
    }
  }

  async findByEmail(email) {
    try {
      const user = await this.Users.findOne({
        $or: [
          { email },
          { email: normalizeEmail(email) },          
        ]        
      })

      return user;
    } catch (error) {
      console.error(`${filePath}/findByEmail`, error)

      throw error;
    }
  }

  async findByUsername(username) {
    try {
      const user = await this.Users.findOne({ username })

      return user;
    } catch (error) {
      console.error(`${filePath}/findByUsername`, error)

      throw error;
    }    
  }
};