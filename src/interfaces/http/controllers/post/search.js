const PostBusiness = require('../../../../domains/post/business');
const { serialize } = require('../../../../serializer/post/detail');
const searchValidator = require('../../validators/post/search');

const filePath = 'src/interfaces/http/controllers';

const postBusiness = new PostBusiness();

module.exports = async(req, res, next) => {
  try {
    const { query } = req;

    const { keyword } = await searchValidator(query);  
    
    let result = await postBusiness.search(keyword)

    result = await serialize(result)

    res.send({
      status: true,
      message: 'ok',
      data: result
    });
  } catch (error) {
    console.error(`${filePath}/search`, error)
    next(error)
  }
};