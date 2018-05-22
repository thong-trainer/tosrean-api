const mongoose = require('mongoose');
// import models
const Student = require('../models/student');

module.exports = {
  // get all students
  index: async (req, res, next) => {
    const students = await Student.find();
    res.send(students);
  },
  // get a student by (student id or user id)
  getById: async (req, res, next) => {
    const id = mongoose.Types.ObjectId(req.params.id);
    const students = await Student.aggregate([
       {
         // join here
         $lookup:
           {
             from: "users", // join collection
             localField: "userId", // primary key
             foreignField: "_id", // foreign key
             as: "user" // new name alias
           }
      },
      { $unwind: "$user" },
      //  set condition here
      { $match: {"user._id": id, "user.active": true} },
      // select or unselect fields here
      { $project : {"userId" : 0} }
    ]);
    res.send(students[0]);
    // const student = await Student.findOne({
    //   $or: [{_id: req.params.id}, {userId: req.params.id}]
    // });
    // res.send(student);
  },
  // create a new student
  insert: async (req, res, next) => {
    const newStudent = Student(req.body);
    const student = await newStudent.save();
    res.send(student);
  },
  // edit a student by id
  update: async (req, res, next) => {
    // get a student by user id
    const student = await Student.findOne({userId: req.params.id});
    // update teacher info
    const editStudent = await Student.findByIdAndUpdate({_id: student._id}, req.body);
    if(editStudent){
      // retreive a document by id
      Student.findById(req.params.id).then(function(student){
          res.send(student);
      });
    }else{
      // the student not found
      res.status(500).json({
        message: "incorrect information",
        success: false
      });
    }
  }

};
