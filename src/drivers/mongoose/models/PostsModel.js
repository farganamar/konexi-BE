const mongoose = require('..');

const postSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users',
      required: true,
      index: true,
    },
    likes: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users',      
    }],
    comments: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        comment: {
          type: String,
          required: true,
        },
      }
    ],
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true },  
)


postSchema.pre('find', function find() {
  this.where({ deleted_at: null });
});

postSchema.pre('findOne', function findOne() {
  this.where({ deleted_at: null });
});


module.exports = mongoose.model('Posts', postSchema);