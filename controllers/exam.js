const mongoose = require('mongoose')
// import models
const Exam = require('../models/exam');

module.exports = {
  // get exams by class id
  index: async (req, res, next) => {
     const exams = await Exam.find({classId: req.params.classId, active: true});
    res.send(exams);
  },
  // get a exam by id
  getById: async (req, res, next) => {
    const exam = await Exam.findOne({_id: req.params.id, active: true});
    res.send(exam);
  },
  // create a new exam
  insert: async (req, res, next) => {
    console.log(">> INSERTING...");
    const newExam = Exam(req.body);
    newExam._id = mongoose.Types.ObjectId();
    const result = await newExam.save();
    res.send(result);
  },
  // edit a exam by id
  update: async (req, res, next) => {
    console.log(">> UPDATING...");
    const exam = await Exam.findByIdAndUpdate({_id: req.params.id}, req.body);
    if(exam){
      // retreive a document by id
      Exam.findById(req.params.id).then(function(exam){
          res.send(exam);
      });
    }else{
      // the exam not found
      res.status(500).json({
        message: "incorrect information",
        success: false
      });
    }
  },
  // edit score a exam by id
  updateScore: async (req, res, next) => {
    console.log(">> UPDATING SCORE...");
    const exam = await Exam.findById(req.params.id);
    if(exam){

      const student = req.body.students[0];
      const index = exam.students.findIndex(x => x.userId == student.userId);
      exam.students[index] = student;
      exam.status = req.body.status;
      var result = await exam.save();

      res.send(result);

    }else{
      // the exam not found
      res.status(500).json({
        message: "incorrect information",
        success: false
      });
    }
  },
  // desactive a exam by id
  remove: async (req, res, next) => {
    console.log(">> REMOVING...");
    const exam = await Exam.findById(req.params.id);
    exam.active = false;
    const result = await exam.save();
    res.send(result);
  }
};
