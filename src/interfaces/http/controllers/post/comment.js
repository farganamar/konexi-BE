const PostBusiness = require('../../../../domains/post/business');
const commentPostValidator = require('../../validators/post/comment')

const filePath = 'src/interfaces/http/controllers';

const postBusiness = new PostBusiness();

module.exports = async(req, res, next) => {
  try {
    const { body, payload, params } = req;
    const { id } = params;
    const { aud } = payload
    
    await commentPostValidator(body);    

    let result = await postBusiness.comment(id, { ...body, aud })

    res.send({
      status: true,
      message: 'ok',
      data: result,
    });
  } catch (error) {
    console.error(`${filePath}/comment`, error)
    next(error)
  }
};