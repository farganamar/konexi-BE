const ProfileBusiness = require('../../../../domains/user/business');
const follow = require('../../validators/profile/follow');

const filePath = 'src/interfaces/http/controllers/profile';

const profileBusiness = new ProfileBusiness();

module.exports = async(req, res, next) => {
  try {
    const { body, payload } = req;
    const { aud } = payload
    
    const { user_id: userId } = await follow(body) 

    await profileBusiness.unfollow(userId, aud)

    res.send({
      status: true,
      message: 'ok'
    });
  } catch (error) {
    console.error(`${filePath}/follow`, error)
    next(error)
  }
};