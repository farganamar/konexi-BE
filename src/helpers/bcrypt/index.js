const bcrypt = require('bcryptjs');

const filePath = 'src/helpers/bcrypt';

module.exports = {
  hashingPassword: (password) => new Promise(async (resolve, reject) => {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      resolve(hashedPassword);
    } catch (error) {
      console.error(`${filePath}/hashingPassword`, error);
      reject(error);
    }
  }),

  validatePassword: (password, hash) => new Promise(async (resolve, reject) => {
    try {
      const match = await bcrypt.compare(password, hash);

      resolve(match);
    } catch (error) {
      console.error(`${filePath}/validatePassword`, error);
      reject(error);
    }
  }),
};
