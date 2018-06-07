const mongoose = require('mongoose')
Schema = mongoose.Schema;

// create Exam Schema & Model
const ExamSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name field is required']
  },
  classId: {
    type: Schema.Types.ObjectId,
    ref: 'class',
    required: [true, 'classId field is required']
  },
  maximumScore: {
    type: Number,
    required: [true, 'maximumScore field is required']
  },
  examDate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    required: [true, 'status field is required']
  },
  students: [{
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: [true, 'userId field is required']
    },
    score: {
      type: Number,
      default: -1
    }
  }],
  active: {
    type: Boolean,
    default: true
  }
},{timestamps: true});

const Exam = mongoose.model('exam', ExamSchema);
module.exports = Exam;
