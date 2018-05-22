const mongoose = require('mongoose')
ClassSchema = require('./class').schema,
Schema = mongoose.Schema;

// create Student Schema & Model
const StudentSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    unique : true,
    index: true,
    required: [true, 'User Id field is required']
  },
  schools: [{
    studentNo: {
      type: String,
      required: [true, 'Student No field is required']
    },
    schoolId: {
      type: Schema.Types.ObjectId,
      ref: 'school',
      required: [true, 'School Id field is required']
    }
  }],
  classes: [ClassSchema]
});

const Student = mongoose.model('student', StudentSchema);
module.exports = Student;
