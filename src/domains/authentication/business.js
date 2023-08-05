const shortId = require("shortid-36");
const bcrypt = require("../../helpers/bcrypt");
const Dao = require('./dao')

const filePath = 'src/domains/authentication/business'

module.exports = class {
  constructor({
    UsersModel,
    jwt
  }) {
    this.dao = new Dao({
      UsersModel
    });
    this.jwt = jwt
  }

  async register(argData) {
    try {
      const data = argData
      data.password = await bcrypt.hashingPassword(data.password)
      data.ref_id = shortId.generate()

      let userExists = await this.dao.findOne({ email: data.email, username: data.username })

      if (userExists) {
        throw new Error('User already registered!')
      }

      const user = await this.dao.register(data)

      const payload = {
        aud: user.id
      }

      user.access_token = await this.jwt.generateAccessToken(payload);

      return user;
    } catch (error) {
      console.error(`${filePath}/register`, error);

      throw error;      
    }
  }

};



