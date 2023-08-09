const PostBusiness = require('../../../../domains/post/business');
// const { serialize } = require('../../../../serializer/profile/detail');
const createPostValidator = require('../../validators/post/create')

const filePath = 'src/interfaces/http/controllers/post';

const postBusiness = new PostBusiness();

module.exports = async(req, res, next) => {
  try {
    const { body, payload } = req;
    const { aud } = payload
    
    await createPostValidator(body);    

    const params = {
      ...body,
      aud,
    }

    await postBusiness.create(params)

    res.send({
      status: true,
      message: 'ok',
    });
  } catch (error) {
    console.error(`${filePath}/create`, error)
    next(error)
  }
};