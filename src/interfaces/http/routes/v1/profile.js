const express = require('express')
const authentication = require('../../middlewares/authentication');
const updateProfileController = require('../../controllers/profile/update');
const uploadFile = require('../../middlewares/upload-file');
const follow = require('../../controllers/profile/follow');
const unfollow = require('../../controllers/profile/unfollow');

module.exports = () => {
  const router = express.Router()

  router.post('/update', authentication({}), uploadFile.single('file'), updateProfileController)
  router.post('/follow/user', authentication({}), follow)
  router.patch('/unfollow/user', authentication({}), unfollow)

  return router;
}