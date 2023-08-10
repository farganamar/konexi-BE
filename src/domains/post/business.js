const Dao = require('./dao');

const filePath = 'src/domains/post/business'

module.exports = class {
  constructor() {
    this.dao = new Dao();
  }

  async create(argData) {
    try {
      const data = argData
      const user = await this.dao.findUserById(data.aud)

      if (!user) throw new Error('User not found');

      const params = {
        ...data,
        user_id: data.aud
      }

      const post = this.dao.create(params)

      return post
    } catch (error) {
      console.error(`${filePath}/create`, error)

      throw error;
    }
  }

  async update(id, argData) {
    try {
      const data = argData
      let post = await this.dao.detail(id, data.aud)

      if (!post) throw new Error('Post not found');

      post = this.dao.update(id, data)

      return post
    } catch (error) {
      console.error(`${filePath}/update`, error)

      throw error;
    }
  }

  async delete(id, userId) {
    try {
      const post = this.dao.delete(id, userId)

      return post
    } catch (error) {
      console.error(`${filePath}/delete`, error)

      throw error;
    }    
  }

  async like(id, argData) {
    try {
      const data = argData

      const post = this.dao.likeComment(id, data)

      return post
    } catch (error) {
      console.error(`${filePath}/like`, error)

      throw error;
    }    
  }

  async comment(id, argData) {
    try {
      const data = argData

      const post = this.dao.likeComment(id, data)

      return post
    } catch (error) {
      console.error(`${filePath}/comment`, error)

      throw error;
    }    
  }

  async getUserPosts(userId) {
    try {
      const post = this.dao.getUserPost(userId)

      return post      
    } catch (error) {
      console.error(`${filePath}/getUserPosts`, error)

      throw error;      
    }
  }

  async search(keyword) {
    try {
      const posts = this.dao.search(keyword)

      return posts      
    } catch (error) {
      console.error(`${filePath}/search`, error)

      throw error;      
    }
  }  

  async getFeed(userId) {
    try {
      const posts = this.dao.getFeed(userId)

      return posts      
    } catch (error) {
      console.error(`${filePath}/getFeed`, error)

      throw error;      
    }
  }    

};



