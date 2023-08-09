const PostBusiness = require('../../../../domains/post/business');
const updatePostValidator = require('../../validators/post/update')

const filePath = 'src/interfaces/http/controllers';

const postBusiness = new PostBusiness();

module.exports = async(req, res, next) => {
  try {
    const { body, payload, params } = req;
    const { id } = params;
    const { aud } = payload
    
    await updatePostValidator(body);    

    let result = await postBusiness.update(id, { ...body, aud })

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