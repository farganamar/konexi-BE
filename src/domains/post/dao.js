const PostsModel = require("../../drivers/mongoose/models/PostsModel");
const UsersModel = require("../../drivers/mongoose/models/UsersModel");

const filePath = 'src/domains/post/dao';

module.exports = class {
  constructor() {
    this.Posts = PostsModel
    this.Users = UsersModel 
  }

  async create(data) {
    try {
      const post = await this.Posts.create({
        content: data.content,
        user_id: data.user_id
      })

      return post
    } catch (error) {
      console.error(`${filePath}/create`, error);

      throw error;      
    }
  }

  async findUserById(id) {
    try {
      const user = await this.Users.findById(id);

      return user;
    } catch (error) {
      console.error(`${filePath}/findById`, error?.message || error);

      throw error;
    }
  }

  async update(id, data) {
    try {
      const post = await this.Posts.findOneAndUpdate(
        {
          _id: id,
          user_id: data.aud,
        },
        {
          content: data.content,
        },
      );      

      return post;
    } catch (error) {
      console.error(`${filePath}/update`, error?.message || error);

      throw error;      
    }
  }

  async detail(id, userId) {
    try {
      const post = await this.Posts.findOne({
        _id: id,
        user_id: userId
      })

      if(post) {
        post.likes = await this.Users.find({
          _id: {$in: post.likes}
        })
      }
      
      return post;
    } catch (error) {
      console.error(`${filePath}/detail`, error?.message || error);

      throw error;         
    }
  }

  async delete(id, userId) {
    try {
      const post = await this.Posts.findOneAndDelete({
        _id: id,
        user_id: userId
      })
      
      return post;
    } catch (error) {
      console.error(`${filePath}/delete`, error?.message || error);

      throw error;         
    }    
  }

  async likeComment(id, data) {
    try {
      const { comment, like, aud } = data
      const post = await this.Posts.findById(id)   

      if (!post) {
        throw new Error('Post not found')
      }

      if (comment) {
        const newComment = {
          userId: aud,
          comment: comment
        }        
        post.comments.push(newComment)
      }


      if (like == true) {
        if (!post.likes.includes(aud)) {
          // push user id to array likes
          post.likes.push(aud)
        }
      } else {
        if (post.likes.includes(aud)) {
          post.likes.pop(aud)
        }
      }

      return post.save();      
    } catch (error) {
      console.error(`${filePath}/likeComment`, error?.message || error);

      throw error;        
    }
  }

  async getUserPost(userId) {
    try {
      const posts = await this.Posts.find({
        user_id: userId
      })

      return posts
    } catch (error) {
      console.error(`${filePath}/getUserPost`, error?.message || error);

      throw error;         
    }
  }

  async search(keyword) {
    try {
      let posts = await this.Posts.find();
      if (keyword) {
        posts = await this.Posts.find({
          content: {
            $regex: keyword,
            $options: "i"
          }
        })

      }

      return posts
    } catch (error) {
      console.error(`${filePath}/search`, error?.message || error);

      throw error;         
    }
  }
};