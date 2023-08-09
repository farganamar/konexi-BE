const PostBusiness = require('../../../../domains/post/business');

const filePath = 'src/interfaces/http/controllers';

const postBusiness = new PostBusiness();

module.exports = async(req, res, next) => {
  try {
    const { payload, params } = req;
    const { id } = params;
    const { aud } = payload
    
    await postBusiness.delete(id, aud)

    res.send({
      status: true,
      message: 'ok',
    });
  } catch (error) {
    console.error(`${filePath}/delete`, error)
    next(error)
  }
};