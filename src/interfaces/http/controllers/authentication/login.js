const LoginValidator = require("../../validators/auth/login");
const AuthenticationBusiness = require('../../../../domains/authentication/business');
const UsersModel = require('../../../../drivers/mongoose/models/UsersModel');
const jwt = require("../../../../helpers/jwt");
const { serialize } = require("../../../../serializer/auth/login");

const filePath = 'src/interfaces/http/controllers/authentication/register';

const authenticationBusiness = new AuthenticationBusiness({
  UsersModel,
  jwt
})
module.exports = async(req, res, next) => {
  const { body } = req
  try {
    const { email, username, password} = await LoginValidator(body)
    const users = await authenticationBusiness.login({ email, username, password })

    const resLogin = serialize(users)
    res.send({
      status: true,
      message: 'ok',
      data: resLogin
    });
  } catch (error) {
    console.error(`${filePath}/login`, error)
    next(error)
  }
};