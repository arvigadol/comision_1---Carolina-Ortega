import { Schema, model } from 'mongoose';

const CommentSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: false,
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: 'Post',
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
  versionKey: false,
});

export const CommentModel = model('Comment', CommentSchema );