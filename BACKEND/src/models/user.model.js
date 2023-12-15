import { Schema, model } from 'mongoose';

const UserSchema = new Schema(
  {
    avatarURL: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      minLength: 3,
      maxLength: 20,
    },
    password: {
      type: String,
      required: true,    
    },
    posts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Post',
      },
    ],
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Comment',
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const UserModel = model('User', UserSchema);