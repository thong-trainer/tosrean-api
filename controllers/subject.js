// import models
const Subject = require('../models/subject');
const School = require('../models/school');

module.exports = {
  // get subjects by department id
  index: async (req, res, next) => {
    const subjects = await Subject.find({departmentId: req.params.departmentId, active: true});
    res.send(subjects);
  },
  // get a subject by id
  getById: async (req, res, next) => {
    const subject = await Subject.findOne({_id: req.params.id, active: true});
    res.send(subject);
  },
  // create a new subject
  insert: async (req, res, next) => {
    const newSubject = Subject(req.body);
    // assign department id to the subject
    newSubject.departmentId = req.params.departmentId;
    const result = await newSubject.save();
    res.send(result);
  },
  // edit a subject by id
  update: async (req, res, next) => {
    const subject = await Subject.findByIdAndUpdate({_id: req.params.id}, req.body);
    if(subject){
      // retreive a document by id
      Subject.findById(req.params.id).then(function(subject){
          res.send(subject);
      });
    }else{
      // the subject not found
      res.status(500).json({
        message: "incorrect information",
        success: false
      });
    }
  },
  // desactive a subject by id
  remove: async (req, res, next) => {
    const subject = await Subject.findById(req.params.id);
    subject.active = false;
    const result = await subject.save();
    res.send(result);
  }
};
