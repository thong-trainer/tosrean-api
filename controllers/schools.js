const mongoose = require('mongoose');
// import models
const School = require('../models/school');
const SchoolDetail = require('../models/schoolDetail');
const License = require('../models/license');
const User = require('../models/user');

function licenseValidation(duration, packageLicense) {
  var ourPackages = ["personal", "business", "enterprise"];
  var ourDurations = [1, 3, 6, 12];
  // is package in the list
  if(!ourPackages.includes(packageLicense.toLowerCase())){
    return false;
  }
  // is duration is the list
  if(!ourDurations.includes(parseInt(duration, 0))){
    return false;
  }
  return true;
}


module.exports = {
  // get all documents
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
    var search = req.query.search;
    if (typeof search == 'undefined') search = "";
    search = new RegExp("^" + search, "i");
    console.log("searching...");
    console.log(search);
    const id = mongoose.Types.ObjectId(req.params.id);

    const schools = await SchoolDetail.aggregate([
       {
         // join here
         $lookup:
           {
             from: "schools", // join collection
             localField: "schoolId", // primary key
             foreignField: "_id", // foreign key
             as: "school" // new name alias
           }
      },
      //  set condition here
      // { $match: { "school.active": true, "school.schoolName": "Norton University" } },
      { $match: { "school.active": true, "school.schoolName": { $regex: search } } },
      { $sort: {"school.schoolName": 1} },
      { $skip: skip },
      { $limit: limit },
      { $unwind: "$school" },
      // select or unselect fields here
      { $project : {"_id": 0, "createdAt": 0, "updatedAt": 0} }
    ]);
    res.send(schools);
  },
  // get the document by id
  getById: async (req, res, next) => {
    const id = mongoose.Types.ObjectId(req.params.id);
    const school = await SchoolDetail.aggregate([
       {
         // join here
         $lookup:
           {
             from: "schools", // join collection
             localField: "schoolId", // primary key
             foreignField: "_id", // foreign key
             as: "school" // new name alias
           }
      },
      { $unwind: "$school" },
      //  set condition here
      { $match: {"schoolId": id, "school.active": true} },
      // select or unselect fields here
      { $project : {"_id": 0, "createdAt": 0, "updatedAt": 0} }
    ]);
    res.send(school[0]);
  },
  // create a new school
  insert: async (req, res, next) => {
    const newSchool = School(req.body);
    const school = await newSchool.save();
    // create a new school detail that reference to the school
    const newSchoolDetail = SchoolDetail(req.body);
    newSchoolDetail.schoolId = school._id;
    const schoolDetail = await newSchoolDetail.save();
    // create a new license that reference to the school
    const newLicence = License();
    newLicence.schoolId = school._id;
    newLicence.package = "personal";
    newLicence.duration = 1;
    const current = new Date();
    newLicence.expireAt = current.setMonth(current.getMonth() + newLicence.duration);
    newLicence.createBy = req.body.createBy;
    const license = await newLicence.save();
    // return
    res.send(school);
  },
  // edit a school by id
  update: async (req, res, next) => {
    const school = await School.findByIdAndUpdate({_id: req.params.id}, req.body);
    const result = await school.save();
    res.send(result);
  },
  // edit a school social by school id
  updateSocial: async (req, res, next) => {
    const schoolDetail = await SchoolDetail.findOne({schoolId: req.params.id});
    schoolDetail.socialIds = req.body.socialIds;
    schoolDetail.save();
    const result = await School.findById(req.params.id);
    res.send(result);
  },
  // upgrade school license
  upgradeLicense: async (req, res, next) => {
    // params validation
    if (!licenseValidation(req.body.duration, req.body.package)){
      res.status(500).json({
        message: "key or package license is incorrect.",
        success: false
      });
      return;
    }
    // check school and user already exists
    const school = await School.findById(req.body.schoolId);
    const user = await User.findById(req.body.createBy);
    if(school && user){
      // create a new license
      const newLicence = License(req.body);
      const current = new Date();
      newLicence.expireAt = current.setMonth(current.getMonth() + newLicence.duration);
      const license = await newLicence.save();
      res.send(license);
    }else{
      res.status(500).json({
        message: "incorrect information.",
        success: false
      });
    }


  },
};
