const UsersModel  = require('../drivers/mongoose/models/UsersModel');

const findOne = ({
  condition = {},
  options = {},
}) => {
  const user = UsersModel.findOne(condition)

  return user
}