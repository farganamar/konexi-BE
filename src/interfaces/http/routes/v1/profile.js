const express = require('express')
const authentication = require('../../middlewares/authentication');
const updateProfileController = require('../../controllers/profile/update');
const uploadFile = require('../../middlewares/upload-file');

module.exports = () => {
  const router = express.Router()

  router.post('/update', authentication({}), uploadFile.single('file'), updateProfileController)

  return router;
}