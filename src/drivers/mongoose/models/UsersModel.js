const mongoose = require('..');

const userSchema = new mongoose.Schema(
  {
    ref_id: {
      type: String,
      required: true,
    },
    first_name: {
      type: String,
      required: true
    },
    last_name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      lowercase: true,
      index: true,
      unique: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    avatar: {
      type: String
    },
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    ],
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true },  
)

async function deleteUserRelation(next) {
  try {
    const id = mongoose.Types.ObjectId(this._conditions._id);

    await mongoose.model('Posts').find({ user_id: id }).deleteMany();

    next();
  } catch (error) {
    next(error)
  }
}

userSchema.pre('find', function find() {
  this.where({ deleted_at: null });
});

userSchema.pre('findOne', function findOne() {
  this.where({ deleted_at: null });
});


userSchema.pre('deleteOne', deleteUserRelation);

module.exports = mongoose.model('Users', userSchema);