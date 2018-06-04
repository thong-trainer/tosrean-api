const mongoose = require('mongoose')
Schema = mongoose.Schema;

// create Comment Schema & Model
const CommentSchema = new Schema({
  topicId: {
    type: Schema.Types.ObjectId,
    ref: 'class',
    required: [true, 'topicId field is required']
  },
  author: {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: [true, 'userId field is required']
    },
    username: {
      type: String,
      required: [true, 'username field is required']
    },
    profileImage: String
  },
  text: {
    type: String,
    required: [true, 'text field is required']
  },
  status: {
    type: String,
    required: [true, 'status field is required (use to identify who is topicId)']
  },
  active: {
    type: Boolean,
    default: true
  }
},{timestamps: true});

const Comment = mongoose.model('comment', CommentSchema);
module.exports = Comment;
