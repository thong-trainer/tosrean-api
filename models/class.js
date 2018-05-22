const mongoose = require('mongoose')
SubjectSchema = require('./subject').schema,
SchoolSchema = require('./school').schema,
UserSchema = require('./user').schema,
Schema = mongoose.Schema;

// create Class Schema & Model
const ClassSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name field is required']
  },
  school: {
    type: SchoolSchema,
    required: [true, 'Subject field is required']
  },
  level: {
    _id: {
      type: Schema.Types.ObjectId,
      required: [true, 'Level Id field is required']
    },
    name: {
      type: String,
      required: [true, 'Level Name (Year 1, Year 2,...) field is required']
    }
  },
  department: {
    _id: {
      type: Schema.Types.ObjectId,
      required: [true, 'Department Id field is required']
    },
    name: {
      type: String,
      required: [true, 'Department Name field is required']
    }
  },
  subject: {
    type: SubjectSchema,
    required: [true, 'Subject field is required']
  },
  privacy: {
    type: String,
    required: [true, 'Privacy (Public, Private, Closed) field is required']
  },
  code: {
    type: String,
    required: [true, 'Code field is required']
  },
  color: {
    type: String,
    required: [true, 'Color field is required']
  },
  teachBy: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: [true, 'teachBy field is required']
  },
  grades: [{
    name: {
      type: String,
      required: [true, 'Name field is required']
    },
    maximum: {
      type: Number,
      required: [true, 'Miximum field is required']
    },
    minimum: {
      type: Number,
      required: [true, 'Minimum field is required']
    },
    status: {
      type: String,
      required: [true, 'Status (Excellent, Great, Good, Medium, Low, Failed) field is required']
    }
  }],
  students: [{
    user: {
      type: UserSchema
    },
    totalAbsence: {
      type: Number,
      default: 0
    },
    totalPresent: {
      type: Number,
      default: 0
    }
  }],
  active: {
    type: Boolean,
    default: true
  }
},{timestamps: true});

const Class = mongoose.model('class', ClassSchema);
module.exports = Class;
