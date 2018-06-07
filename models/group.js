const mongoose = require('mongoose')
Schema = mongoose.Schema;

// create Group Schema & Model
const GroupSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name field is required']
  },
  classId: {
    type: Schema.Types.ObjectId,
    ref: 'class',
    required: [true, 'classId field is required']
  },
  members: [{
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: [true, 'userId field is required']
  }],
  active: {
    type: Boolean,
    default: true
  }
},{timestamps: true});

const Group = mongoose.model('group', GroupSchema);
module.exports = Group;
