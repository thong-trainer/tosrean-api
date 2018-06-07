const mongoose = require('mongoose')
// import models
const Group = require('../models/group');

module.exports = {
  // get groups by class id
  index: async (req, res, next) => {
     const groups = await Group.find({classId: req.params.classId, active: true});
    res.send(groups);
  },
  // get a group by id
  getById: async (req, res, next) => {
    const group = await Group.findOne({_id: req.params.id, active: true});
    res.send(group);
  },
  // create a new group
  insert: async (req, res, next) => {
    console.log(">> INSERTING...");
    const newGroup = Group(req.body);
    newGroup._id = mongoose.Types.ObjectId();
    const result = await newGroup.save();
    res.send(result);
  },
  // edit a group by id
  update: async (req, res, next) => {
    console.log(">> UPDATING...");
    const group = await Group.findByIdAndUpdate({_id: req.params.id}, req.body);
    if(group){
      // retreive a document by id
      Group.findById(req.params.id).then(function(group){
          res.send(group);
      });
    }else{
      // the group not found
      res.status(500).json({
        message: "incorrect information",
        success: false
      });
    }
  },
  // desactive a group by id
  remove: async (req, res, next) => {
    console.log(">> REMOVING...");
    const group = await Group.findById(req.params.id);
    group.active = false;
    const result = await group.save();
    res.send(result);
  }
};
