const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create Subject Schema & Model
const SubjectSchema = new Schema({
  name: {
    type: String,
    index: true,
    required: [true, 'Name field is required']
  },
  description: {
    type: String,
    default: null
  },
  departmentId: {
    type: Schema.Types.ObjectId
  },
  levelId: {
    type: Schema.Types.ObjectId
  },
  createBy: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: [true, 'CreateBy field is required']
  },
  active: {
    type: Boolean,
    default: true,
    index: true
  }
}, {timestamps: true});

const Subject = mongoose.model('subject', SubjectSchema);
module.exports = Subject;
