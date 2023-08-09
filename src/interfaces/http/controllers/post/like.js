const PostBusiness = require('../../../../domains/post/business');
const likePostValidator = require('../../validators/post/like')

const filePath = 'src/interfaces/http/controllers';

const postBusiness = new PostBusiness();

module.exports = async(req, res, next) => {
  try {
    const { body, payload, params } = req;
    const { id } = params;
    const { aud } = payload
    
    await likePostValidator(body);    

    let result = await postBusiness.like(id, { ...body, aud })

    res.send({
      status: true,
      message: 'ok',
      data: result,
    });
  } catch (error) {
    console.error(`${filePath}/update`, error)
    next(error)
  }
};