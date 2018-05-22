const mongoose = require('mongoose');
// import models
const Teacher = require('../models/teacher');
const Subject = require('../models/subject');

async function getSubject(data) {
  var newSubjects = [];
  // First Loop
  for (var i = 0; i < data.schoolDetails.length; i++) {
    var school = data.schoolDetails[i];

    // Second Loop
    for (var j = 0; j < school.departments.length; j++) {
      var department = school.departments[j];
      var subjects = await Subject.find({departmentId: department._id});

      for (var k = 0; k < subjects.length; k++) {
        var sub = subjects[k];
        newSubjects.push(sub);
      }

    }
  }
  return newSubjects;
}

module.exports = {
  // get teachers by department id
  index: async (req, res, next) => {
    // params validation
    if (isNaN(req.params.index) || isNaN(req.params.limit)) {
      res.status(500).json({
        message: "incorrect information.",
        success: false
      });
      return;
    }

    const limit = parseInt(req.params.limit, 0);
    const skip = req.params.index * limit;
    const teachers = await Teacher.find().skip(skip).limit(limit);
    res.send(teachers);
  },
  // get a teacher by (teacher id or user id)
  getById: async (req, res, next) => {
    const id = mongoose.Types.ObjectId(req.params.id);
    const teachers = await Teacher.aggregate([
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
    res.send(teachers[0]);
  },
  // create a new teacher
  insert: async (req, res, next) => {
    const newTeacher = Teacher(req.body);
    const teacher = await newTeacher.save();
    res.send(teacher);
  },
  // edit a teacher by id
  update: async (req, res, next) => {

    // Add subjects to body
    req.body.subjects = await getSubject(req.body);
    // get a teacher by user id
    const teacher = await Teacher.findOne({userId: req.params.id});
    // update teacher info
    const editTeacher = await Teacher.findByIdAndUpdate({_id: teacher._id}, req.body);
    if(editTeacher){
      // retreive a document by id
      Teacher.findById(teacher._id).then(function(teacher){
          res.send(teacher);
      });
    }else{
      // the teacher not found
      res.status(500).json({
        message: "incorrect information",
        success: false
      });
    }

  }

};
