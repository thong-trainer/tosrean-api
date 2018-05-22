const mongoose = require('mongoose')
SchoolDetailSchema = require('./schoolDetail').schema,
SchoolSchema = require('./school').schema,
SubjectSchema = require('./subject').schema,
ClassSchema = require('./class').schema,
Schema = mongoose.Schema;

// create Teacher Schema & Model
const TeacherSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    unique : true,
    index: true,
    required: [true, 'User field is required']
  },
  schools: [SchoolSchema],
  schoolDetails: [SchoolDetailSchema],
  subjects: [SubjectSchema],
  classes: [ClassSchema]
});

const Teacher = mongoose.model('teacher', TeacherSchema);
module.exports = Teacher;
