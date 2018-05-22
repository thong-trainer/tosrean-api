// import models
const SchoolDetail = require('../models/schoolDetail');

module.exports = {
  // get departments by school id
  index: async (req, res, next) => {
    const school = await SchoolDetail.findOne(
      {schoolId: req.params.schoolId, "departments.active": true},
      {departments: 1, _id: 0} // select only departments field
    );
    // get active departments
    const departments = school.departments.filter(x => x.active == true);
    res.send(departments);
  },
  // get a department by id
  getById: async (req, res, next) => {
    // get a school detail by schools id
    const school = await SchoolDetail.findOne(
      {schoolId: req.params.schoolId},
      {departments: 1, _id: 0} // select only departments field
    );

    const department = school.departments.find(x => x._id == req.params.departmentId && x.active == true);
    res.send(department);
  },
  // create a new department
  insert: async (req, res, next) => {
   // get a school by id => (check school)
   const school = await SchoolDetail.findOne({schoolId: req.params.schoolId});
   const count = school.departments.length;
   // create a new department, add to the last of array departments
   school.departments[count] = req.body;
   // save to db
   const result = await school.save();
   res.send(school.departments[count]);
  },
  // edit a department by id
  update: async (req, res, next) => {
    // get a school detail by school id
    const school = await SchoolDetail.findOne({schoolId: req.params.schoolId});
    // get a department by id
    const department = school.departments.find(x => x._id == req.params.departmentId);
    department.name = req.body.name;
    department.description = req.body.description;
    // update to db
    const result = await school.save();
    res.send(department);
  },
  // desactive a department by id
  remove: async (req, res, next) => {

    // get a school detail by school id
    const school = await SchoolDetail.findOne({schoolId: req.params.schoolId});
    // get a department by id
    const department = school.departments.find(x => x._id == req.params.departmentId);
    department.active = false;
    // update to db
    const result = await school.save();
    res.send(department);
  }
};
