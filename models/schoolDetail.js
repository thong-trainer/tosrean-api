const mongoose = require('mongoose')
Schema = mongoose.Schema;

// create School Detail Schema & Model
const SchoolDetailSchema = new Schema({
  schoolId: {
    type: Schema.Types.ObjectId,
    index: true,
    ref: 'school',
    required: [true, 'School Id field is required']
  },
  socialIds: [{
    name: String,
    url: String
  }],
  levels: [{
    name: {
      type: String,
      index: true,
      required: [true, 'Grade(year 1, year 2,...) field is required']
    },
    description: {
      type: String,
      default: null
    },
    active: {
      type: Boolean,
      default: true,
      index: true
    }
  }],
  departments: [{
    name: {
      type: String,
      index: true,
      required: [true, 'Department Name field is required']
    },
    description: {
      type: String,
      default: null
    },
    active: {
      type: Boolean,
      default: true,
      index: true
    },
  }]

}, {timestamps: true});

const SchoolDetail = mongoose.model('schoolDetail', SchoolDetailSchema);
module.exports = SchoolDetail;
