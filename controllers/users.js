const mongoose = require('mongoose');
// import models
const User = require('../models/user');
const Student = require('../models/student');
const Teacher = require('../models/teacher');

const School = require('../models/school');
const SchoolDetail = require('../models/schoolDetail');

module.exports = {
  // get all users active
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
    const users = await User.find({active: true}).skip(skip).limit(limit);
    res.send(users);
  },
  // get user by id
  getById: async (req, res, next) => {
    const status = req.query.status;

    var user;
    if (typeof status != 'undefined'){
      switch (status) {
        case "telephone":
            user = await User.findOne({telephone: req.params.id, active: true});
          break;
        default:
      }
    }else{
      user = await User.findOne({_id: req.params.id, active: true});
    }
    res.send(user);

  },
  // registation
  register: async (req, res, next) => {

    // var schools = await School.find();
    // const newTeacher = Teacher();
    // newTeacher.userId = "5af39b26bfd73c061d0db558";
    // newTeacher.schools = schools;
    // newTeacher.schoolDetails = null;
    // newTeacher.subjects = null;
    // newTeacher.ClassSchema = null;
    // const saved = await newTeacher.save();
    //
    // res.send(saved);
    // res.end();


    // create a new user
    const newUser = User(req.body);
    newUser._id = mongoose.Types.ObjectId();
    newUser.password = newUser.generateHash(newUser.password);

    if(newUser.education == null)
      newUser.education = "Write something about your education here...";

    if(newUser.email == null)
      newUser.email = "example@gmail.com";

    const user = await newUser.save();

    console.log("***** User *****");
    console.log(user);
    console.log("***** End User *****");

    // save to a reference collection
    if(user.level == "Student"){
      // create a new student
      const newStudent = Student();
      newStudent.userId = user._id;
      newStudent.classes = [];


          console.log("****888888*****");
          console.log(newStudent);
          console.log("*****9999999*****");

      await newStudent.save();

    }else{
      // create a new teacher
      const newTeacher = Teacher();
      newTeacher.userId = user._id;
      await newTeacher.save();
    }


    console.log("****Return*****");
    res.send(user);
  },
  // edit a user by id
  update: async (req, res, next) => {

    // res.send(req.body);
    // const editUser = User(req.body);
    // editUser.password = editUser.generateHash(editUser.password);
    const user = await User.findByIdAndUpdate({_id: req.params.id}, req.body);
    if(user){
      // retreive the user by id
      User.findById(req.params.id).then(function(user){
          res.send(user);
      });
    }else{
      // the user not found
      res.status(500).json({
        message: "incorrect information",
        success: false
      });
    }
  },
  // change password by id
  changePassword: async (req, res, next) => {
    const user = await User.findById(req.params.id);
    user.password = user.generateHash(req.body.password);
    const saved = await user.save();
    res.send(saved);
  },
  // user login
  login: async (req, res, next) => {
    // const telephone = req.params.telephone;
    // const password = req.params.password;
    // const token = req.query.access_token;

    // get a user by telephone
    // const user = await User.findOne({telephone: telephone},
    //   {country: 0, updatedAt: 0, createdAt: 0});
    // if(user){
    //     if(!user.validPassword(password)){
    //       // incorrect password
    //       res.status(500).json({
    //         message: "The password is incorrect.",
    //         success: false
    //       });
    //     }else if(!user.active){
    //       // desactive account
    //       res.status(500).json({
    //         message: "The account is desactive.",
    //         success: false
    //       });
    //     }else{
    //       // find a token
    //       var found = user.tokens.find(x => x.token == token);
    //       if(found){
    //         // return user information
    //         res.send(user);
    //       }else{
    //         // add a new token, then return user information
    //         user.tokens[user.tokens.length] = req.body.tokens[0];
    //         const u = await User.findByIdAndUpdate(user._id, user);
    //         res.send(u);
    //       }
    //     }
    // }else{
    //
    // }

    const token = req.query.access_token;
    const user = await User.findOne({telephone: req.body.telephone});
    console.log(user);
    if(user){
      if(!user.validPassword(req.body.password)){
        // incorrect password
        res.status(500).json({
          message: "The password is incorrect.",
          success: false
        });
      }else if(!user.active){
        // desactive account
        res.status(500).json({
          message: "The account is desactive.",
          success: false
        });
      }else{
        // find a token
        var found = user.tokens.find(x => x.token == token);
        if(found){
          // return user information
          res.send(user);
        }else{
          // add a new token, then return user information
          user.tokens[user.tokens.length] = req.body.tokens[0];
          const u = await User.findByIdAndUpdate(user._id, user);
          res.send(u);
        }
      }
    }else{
      res.status(500).json({
        message: "The telephone is invalid.",
        success: false
      });
    }
  }
};
