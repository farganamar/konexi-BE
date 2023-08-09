const ProfileBusiness = require('../../../../domains/user/business');
const { serialize } = require('../../../../serializer/profile/detail');
const updateProfileValidator = require('../../validators/profile/update')

const filePath = 'src/interfaces/http/controllers/profile';

const profileBusiness = new ProfileBusiness();

module.exports = async(req, res, next) => {
  try {
    const { file, payload } = req;
    const { aud } = payload

    if (!file) {
      throw new Error('File not found!');
    }
    
    await updateProfileValidator({
      file
    });    

    const params = {
      file,
      aud,
    }

    let result = await profileBusiness.updateProfile(params)
    result = serialize(result)

    res.send({
      status: true,
      message: 'ok',
      data: result
    });
  } catch (error) {
    console.error(`${filePath}/update`, error)
    next(error)
  }
};