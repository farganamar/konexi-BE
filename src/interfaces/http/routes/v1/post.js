const express = require('express')
const authentication = require('../../middlewares/authentication');
const createPostController = require('../../controllers/post/create');
const updatePostController = require('../../controllers/post/update');
const deletePostController = require('../../controllers/post/delete');
const like = require('../../controllers/post/like');
const comment = require('../../controllers/post/comment');
const userPost = require('../../controllers/post/userPost');
const search = require('../../controllers/post/search');

module.exports = () => {
  const router = express.Router()

  router.post('/create', authentication({}), createPostController)
  router.post('/:id/update', authentication({}), updatePostController)
  router.post('/:id/like', authentication({}), like)
  router.post('/:id/comment', authentication({}), comment)
  router.delete('/:id', authentication({}), deletePostController)
  router.get('/user', authentication({}), userPost)
  router.get('', authentication({}), search)

  return router;
}