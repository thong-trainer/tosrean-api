const mongoose = require('mongoose');
// import models
const User = require('../models/user');
const Student = require('../models/student');
const Teacher = require('../models/teacher');
const Class = require('../models/class');
const Subject = require('../models/subject');
const School = require('../models/school');
const SchoolDetail = require('../models/schoolDetail');
const Notification = require('../utils/notification');

module.exports = {
  // get all students
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

    // query validation (use to filter)
    var filter = req.query.filter;
    var search = req.query.search;

    var classes = [];
    if (typeof filter != 'undefined' && typeof search != 'undefined') {

      search = new RegExp("^" + search, "i");
      classes = await Class.find({
        $and: [
          { active: true, privacy: filter },
          { $or: [ { code: search }, { name: search }, {"level.name": search} ] }
        ]
      }).skip(skip).limit(limit);

      // switch (filter.toLowerCase()) {
      //   case "school":
      //     filterId = mongoose.Types.ObjectId(filterId);
      //     classes = await Class.find({active: true, "school._id": filterId}).skip(skip).limit(limit);
      //     break;
      //   case "teacher":
      //     filterId = mongoose.Types.ObjectId(filterId);
      //     classes = await Class.find({active: true, teachBy: filterId}).skip(skip).limit(limit);
      //     break;
      //   default:
      //     classes = await Class.find({active: true, privacy: filter, code: filterId}).skip(skip).limit(limit);
      //     break;
      // }
    }  else {
      classes = await Class.find({active: true}).skip(skip).limit(limit);
    }
    res.send(classes);

  },
  // get a class by id
  getById: async (req, res, next) => {
    const result = await Class.findOne({_id: req.params.id, active: true});
    res.send(result);
  },
  // create a new class
  insert: async (req, res, next) => {
    // starting
    const newClass = Class(req.body);
    newClass._id = mongoose.Types.ObjectId();
    newClass.grades = GradesDemo();

    // save to db
    const classRoom = await newClass.save();

    // update teacher information
    const teacher = await Teacher.findOne({userId: classRoom.teachBy});
    const index = teacher.classes.findIndex(x => x.id == classRoom._id);
    if(index == -1){
      // add a new class into the teacher profile
      const count = teacher.classes.length;
      teacher.classes[count] = classRoom;
      await Teacher.findByIdAndUpdate({_id: teacher._id}, teacher);
    }

    res.send(classRoom);
  },
  // edit a class by id
  update: async (req, res, next) => {

    // starting
    const editClass = await Class.findByIdAndUpdate({_id: req.params.id}, req.body);

    if(editClass){

      // retreive a document by id
      Class.findById(req.params.id).then(async function(classRoom){
        // update teacher information
        const teacher = await Teacher.findOne({userId: classRoom.teachBy});
        const index = teacher.classes.findIndex(x => x.id == classRoom._id);
        if(index != -1){
          // update a class into the teacher profile
          teacher.classes[index] = classRoom;
          await Teacher.findByIdAndUpdate({_id: teacher._id}, teacher);
        }
        // end update teacher profile

        // update every students in this class
        classRoom.students.forEach(async function(item){

          var student = await Student.findOne({userId: item.user._id});
          var index = student.classes.findIndex(x => x.id == classRoom._id);

          if(index == -1){
            // add a new class into the student profile
            const count = student.classes.length;
            student.classes[count] = classRoom;
          }
          else {
            // update a class into the student profile
            student.classes[index] = classRoom;
          }
          await Student.findByIdAndUpdate({_id: student._id}, student);

        });

        // return value
        res.send(classRoom);

      });
    }else{
      // the class not found
      res.status(500).json({
        message: "incorrect information",
        success: false
      });
    }
  },
  // edit a class by id
  addStudent: async (req, res, next) => {

    // add a new student

    const item = await Class.findById(req.params.id);
    const i = item.students.length;

    item.students[i] = req.body;

    // update class information
    const editClass = await Class.findByIdAndUpdate({_id: req.params.id}, item);
    if(editClass){

      // retreive a document by id
      Class.findById(req.params.id).then(async function(classRoom){
        // var tokens = [];
        // console.log("Teacher Token: "+req.query.access_token);
        // tokens.push(req.query.access_token);


        // update teacher information
        const teacher = await Teacher.findOne({userId: classRoom.teachBy});
        const index = teacher.classes.findIndex(x => x.id == classRoom._id);
        if(index != -1){
          // update a class into the teacher profile
          teacher.classes[index] = classRoom;

          await Teacher.findByIdAndUpdate({_id: teacher._id}, teacher);
        }
        // end update teacher profile

        // update every students in this class
        classRoom.students.forEach(async function(item){

          var student = await Student.findOne({userId: item.user._id});


          // // group of send notification
          // var user = await User.findById(item.user._id);
          // var token = user.tokens[user.tokens.length - 1].token;
          // console.log(">> Student Token: "+token+"   (telephone) "+user.telephone);
          // Notification.send("New Student", token);
          // // end group of send notification


          var index = student.classes.findIndex(x => x.id == classRoom._id);

          if(index == -1){
            // add a new class into the student profile
            const count = student.classes.length;
            student.classes[count] = classRoom;
          }
          else {
            // update a class into the student profile
            student.classes[index] = classRoom;
          }
          await Student.findByIdAndUpdate({_id: student._id}, student);

        });

        console.log("***** Finished *****");
        // return value
        res.send(classRoom);

        Notification.sendToClass(req.body.user, classRoom);

        // var message = {
        //   app_id: "82e23f59-0451-402c-9a88-295873247389",
        //   contents: {"en": "English Message ID"},
        //   include_player_ids: ["af61c9cf-8210-4316-9f6e-9f18a933816b","50e91f0a-c291-4c15-9aa5-d1c5922ed4da","add5949b-efa1-418e-97fd-c642cfc82e85"]
        // };
        //
        // Notification.sendNotification(message);

      });
    }else{
      // the class not found
      res.status(500).json({
        message: "incorrect information",
        success: false
      });
    }
  },
  // desactive a class by (class id and class code)
  remove: async (req, res, next) => {
    const result = await Class.findOne({_id: req.params.id, code: req.body.code});
    result.active = false;
    const c = await result.save();
    res.send(c);
  }

};


function GradesDemo() {
  return [{
      "name": "A",
      "maximum": "100",
      "minimum": "91",
      "status": "Excellent"
    },
    {
      "name": "B",
      "maximum": "90",
      "minimum": "81",
      "status": "Great"
    },
    {
      "name": "C",
      "maximum": "80",
      "minimum": "71",
      "status": "Good"
    },
    {
      "name": "D",
      "maximum": "70",
      "minimum": "61",
      "status": "Medium"
    },
    {
      "name": "E",
      "maximum": "60",
      "minimum": "50",
      "status": "Low"
    },
    {
      "name": "F",
      "maximum": "49",
      "minimum": "0",
      "status": "Failed"
    }
  ];
}
