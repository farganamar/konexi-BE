const RegisterValidator = require("../../validators/auth/register");
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
    const params = await RegisterValidator(body)
    const users = await authenticationBusiness.register(params)

    const resLogin = serialize(users)
    res.send({
      status: true,
      message: 'ok',
      data: resLogin
    });
  } catch (error) {
    console.error(`${filePath}/register`, error)
    next(error)
  }
};