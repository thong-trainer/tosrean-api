const mongoose = require('mongoose')
Schema = mongoose.Schema;

// create School Schema & Model
const SchoolSchema = new Schema({
  schoolName: {
    type: String,
    index: true,
    required: [true, 'School Name field is required']
  },
  type: {
    type: String,
    lowercase: true,
    index: true,
    required: [true, 'Type (university, school, ...) field is required']
  },
  email: {
    type: String,
    lowercase: true,
    match: [/\S+@\S+\.\S+/, 'is invalid'],
    required: [true, 'Email field is required']
  },
  color: {
    type: String,
    required: [true, 'Color field is required']
  },
  logoImage: {
    type: String,
    required: [true, 'Logo Image field is required']
  },
  coverImage: {
    type: String,
    required: [true, 'Cover Image field is required']
  },
  description: {
    type: String,
    default: null
  },
  address: {
    type: String,
    required: [true, 'Address field is required']
  },
  phone: {
    office: String,
    support: String,
    mobile: String
  },
  createBy: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: [true, 'CreateBy field is required']
  },
  active: {
    type: Boolean,
    index: true,
    default: true
  }
}, {timestamps: true});

const School = mongoose.model('school', SchoolSchema);
module.exports = School;
