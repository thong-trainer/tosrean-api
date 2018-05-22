// import models
const SchoolDetail = require('../models/schoolDetail');

module.exports = {
  // get level by school id
  index: async (req, res, next) => {
    // get a school detail by school id
    const school = await SchoolDetail.findOne(
      {schoolId: req.params.schoolId},
      { levels: 1, _id: 0} // select only levels field
    );
    // get active levels
    const levels = school.levels.filter(x => x.active == true);
    res.send(levels);
  },
  // get a level by id
  getById: async (req, res, next) => {
    // get a school detail by school id
    const school = await SchoolDetail.findOne(
      {schoolId: req.params.schoolId},
      { levels: 1, _id: 0} // select only levels field
    );
    const level = school.levels.find(x => x._id == req.params.levelId && x.active == true);
    res.send(level);
  },
  // create a new level
  insert: async (req, res, next) => {
   // get a school detail by school id => (check school)
   const school = await SchoolDetail.findOne({schoolId: req.params.schoolId});
   const count = school.levels.length;
   // create a new level, add to the last of array levels
   school.levels[count] = req.body;
   // save to db
   const result = await school.save();
   res.send(school.levels[count]);
  },
  // edit a level by id
  update: async (req, res, next) => {

    // get a school detail by school id
    const school = await SchoolDetail.findOne({schoolId: req.params.schoolId});
    // get a level by id
    const level = school.levels.find(x => x._id == req.params.levelId);
    level.name = req.body.name;
    level.description = req.body.description;
    // update to db
    const result = await school.save();
    res.send(level);
  },
  // desactive a level by id
  remove: async (req, res, next) => {
    // get a school detail by school id
    const school = await SchoolDetail.findOne({schoolId: req.params.schoolId});
    // get a level by id
    const level = school.levels.find(x => x._id == req.params.levelId);
    level.active = false;
    // update to db
    const result = await school.save();
    res.send(result);
  }
};
