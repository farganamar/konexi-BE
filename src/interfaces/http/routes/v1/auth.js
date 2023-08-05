const express = require('express')
const registerController = require('../../controllers/authentication/register');

module.exports = () => {
  const router = express.Router()

  router.post('/register', registerController);

  return router;
}