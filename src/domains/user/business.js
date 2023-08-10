const shortId = require("shortid-36");
const bcrypt = require("../../helpers/bcrypt");
const fs = require('fs')
const Dao = require('./dao');
const putObject = require("../../drivers/s3/putObject");
const headObject = require("../../drivers/s3/headObject");

const filePath = 'src/domains/users/business'

module.exports = class {
  constructor() {
    this.dao = new Dao();
  }

  async updateProfile(argData) {
    try {
      let avatar;
      const data = argData
      const file = data.file
      const user = this.dao.findById(data.aud)

      if (!user) throw new Error('User not found');

      if (file) {
        let bufferFile = fs.readFileSync(file.path)
        const bucket = process.env.S3_PUBLIC_BUCKET

        await putObject({
          bucket,
          key: file.filename,
          buffer: bufferFile,
          contentType: file.mimetype,
          isPublic: true,
        });

        await headObject({
          bucket,
          key: file.filename,
        });

        avatar = file.filename;
        fs.unlinkSync(file.path);
      }

      const result = await this.dao.updateProfile({ id: data.aud, avatar })

      return result;

    } catch (error) {
      console.error(`${filePath}/updateProfile`, error)

      throw error;      
    }
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

  async login({
    username,
    email,
    password,
  }) {
    try {
      let user;

      if (email) {
        user = await this.dao.findByEmail(email)
      }

      if (username) {
        user = await this.dao.findByUsername(username)
      }

      const isMatch = await bcrypt.validatePassword(password, user.password)

      if (!isMatch) {
          throw new Error('Username or Password does not match!');
        }      
      
      const payload = {
        aud: user.id,        
      }

      const accessToken = await this.jwt.generateAccessToken(payload);

      user.access_token = accessToken;
      user.username = user.username;
      user.email = user.email;

      return user
    } catch (error) {
      console.error(`${filePath}/login`, error)

      throw error;
    }
  }

  async follow(userId, currentUser) {
    try {
      const user = this.dao.follow(userId, currentUser)

      return user      
    } catch (error) {
      console.error(`${filePath}/follow`, error)

      throw error;      
    }
  }

    async unfollow(userId, currentUser) {
    try {
      const user = this.dao.unFollow(userId, currentUser)

      return user      
    } catch (error) {
      console.error(`${filePath}/unfollow`, error)

      throw error;      
    }
  }

};



