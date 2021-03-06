const mongoose = require('mongoose')
// import models
const Comment = require('../models/comment');

module.exports = {
  // get comments by department id
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

    const comments = await Comment.find({
      topicId: req.params.topicId,
      status: req.params.status,
      active: true
    }).sort({createdAt: -1}).skip(skip).limit(limit);

    res.send(comments);
  },
  // get a comment by id
  getById: async (req, res, next) => {
    const comment = await Comment.findOne({_id: req.params.id, active: true});
    res.send(comment);
  },
  // create a new comment
  insert: async (req, res, next) => {
    console.log(">> INSERTING...");
    const newComment = Comment(req.body);
    newComment._id = mongoose.Types.ObjectId();
    const result = await newComment.save();
    res.send(result);
  },
  // edit a comment by id
  update: async (req, res, next) => {
    console.log(">> UPDATING...");
    const comment = await Comment.findByIdAndUpdate({_id: req.params.id}, req.body);
    if(comment){
      // retreive a document by id
      Comment.findById(req.params.id).then(function(comment){
          res.send(comment);
      });
    }else{
      // the comment not found
      res.status(500).json({
        message: "incorrect information",
        success: false
      });
    }
  },
  // desactive a comment by id
  remove: async (req, res, next) => {
    console.log(">> REMOVING...");
    const comment = await Comment.findById(req.params.id);
    comment.active = false;
    const result = await comment.save();
    res.send(result);
  }
};
