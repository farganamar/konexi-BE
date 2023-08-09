const UserModel = require('../../drivers/mongoose/models/UsersModel')

const serializeDetail = async (data) => {
  let result = {
    id: data.id,
    content: data.content,
    user_id: data.user_id,
    likes: data.likes,
    comments: data.comments,
    created_at: data.createdAt,
  }

  if (data.likes.length > 0) {
    const likes = await UserModel.find({
          _id: {$in: data.likes}
        })

    result.likes = likes.map((v) => ({
      user_id: v.id,
      username: v.username
    }))
  }

  if (data.comments.length > 0) {
    const newComment = [];
    for (const comment of data.comments) {
      const user = await UserModel.findById(comment.userId)
      newComment.push({
        username: user.username,
        userId: user.id,
        comment: comment.comment
      })
    }

    result.comments = newComment
  }

  return result

};

const serialize = async (data) => {
  if (!data) {
    throw new Error('Expect data to be not undefined nor null');
  }
  if (Array.isArray(data)) {
    return Promise.all(data.map(serializeDetail));
  }
  return serializeDetail(data);
};

module.exports = {
  serialize,
};
