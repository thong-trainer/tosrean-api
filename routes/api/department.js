const passport = require('passport');
// express-promise-router: use for auto handle errors
// so, no need to apply try catch on the function
// install: npm install express-promise-router
const router = require('express-promise-router')();
// import controllers
const DepartmentController = require('../../controllers/department');

// access token authentication
router.use(passport.authenticate('bearer', { session: false}));

/*
NOTE: Get Departments by School Id
Url: localhost:4000/api/v1/department/<school_id>?access_token=<token>
Paramas: school_id as String
Token: required
Method: GET
*/
router.route('/:schoolId').get(DepartmentController.index);

/*
NOTE: Get a Department
Url: localhost:4000/api/v1/department/<subject_id>/<department_id>?access_token=<token>
Paramas: subject_id as String, department_id as String
Token: required
Method: GET
*/
router.route('/:schoolId/:departmentId').get(DepartmentController.getById);

/*
NOTE: Create New Department
Url: localhost:4000/api/v1/department/<school_id>?access_token=<token>
Paramas: school_id as String
Token: required
Method: POST
*/
router.route('/:schoolId').post(DepartmentController.insert);

/*
NOTE: Update Department
Url: localhost:4000/api/v1/department/<school_id>/<department_id>?access_token=<token>
Paramas: school_id as String, department_id as String
Token: required
Method: PUT
*/
router.route('/:schoolId/:departmentId').put(DepartmentController.update);

/*
NOTE: Remove Department by Id
Url: localhost:4000/api/v1/department/<school_id>/<department_id>?access_token=<token>
Paramas: school_id as String, department_id as String
Token: required
Method: DELETE
*/
router.route('/:schoolId/:departmentId').delete(DepartmentController.remove);


module.exports = router;
