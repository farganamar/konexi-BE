const PostBusiness = require('../../../../domains/post/business');
const { serialize } = require('../../../../serializer/post/detail');

const filePath = 'src/interfaces/http/controllers';

const postBusiness = new PostBusiness();

module.exports = async(req, res, next) => {
  try {
    const { payload } = req;
    const { aud } = payload
    
    let result = await postBusiness.getUserPosts(aud)

    result = await serialize(result)

    res.send({
      status: true,
      message: 'ok',
      data: result
    });
  } catch (error) {
    console.error(`${filePath}/delete`, error)
    next(error)
  }
};