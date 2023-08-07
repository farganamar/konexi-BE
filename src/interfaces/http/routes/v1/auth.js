const express = require('express')
const registerController = require('../../controllers/authentication/register');
const loginController = require('../../controllers/authentication/login');

module.exports = () => {
  const router = express.Router()

  router.post('/register', registerController);
  router.post('/login', loginController)

  return router;
}