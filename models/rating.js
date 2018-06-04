const mongoose = require('mongoose')
Schema = mongoose.Schema;

// create Rating Schema & Model
const RatingSchema = new Schema({
  topicId: {
    type: Schema.Types.ObjectId,
    ref: 'class',
    index: true,
    required: [true, 'classId field is required']
  },
  status: {
    type: String,
    index: true,
    required: [true, 'status field is required (use to identify who is topicId)']
  },
  // ratingAvg: {
  //   type: Number,
  //   required: [true, 'ratingAvg field is required'],
  //   default: 0
  // },
  userIds: [{
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: [true, 'userId field is required']
    },
    star: {
      type: Number,
      required: [true, 'rating field is required']
    }
  }]
});

const Rating = mongoose.model('rating', RatingSchema);
module.exports = Rating;
