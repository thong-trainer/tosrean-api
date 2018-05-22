const passport = require('passport');
// express-promise-router: use for auto handle errors
// so, no need to apply try catch on the function
// install: npm install express-promise-router
const router = require('express-promise-router')();
// import controllers
const SubjectController = require('../../controllers/subject');

// access token authentication
router.use(passport.authenticate('bearer', { session: false}));

/*
NOTE: Get Subjects by Department Id
Url: localhost:4000/api/v1/subject/<department_id>?access_token=<token>
Paramas: department_id as String
Token: required
Method: GET
*/
router.route('/:departmentId').get(SubjectController.index);

/*
NOTE: Get a Subject by Id
Url: localhost:4000/api/v1/subject/id/<subject_id>?access_token=<token>
Paramas: subject_id as String
Token: required
Method: GET
*/
router.route('/id/:id').get(SubjectController.getById);

/*
NOTE: Create New Subject
Url: localhost:4000/api/v1/subject/<school_id>/<department_id>?access_token=<token>
Paramas: school_id as String, department_id as String
Token: required
Method: POST
*/
router.route('/:departmentId').post(SubjectController.insert);

/*
NOTE: Update Subject by Id
Url: localhost:4000/api/v1/subject/<subject_id>?access_token=<token>
Paramas: subject_id as String
Token: required
Method: PUT
*/
router.route('/:id').put(SubjectController.update);

/*
NOTE: Remove Subject by Id
Url: localhost:4000/api/v1/subject/<subject_id>?access_token=<token>
Paramas: subject_id as String
Token: required
Method: DELETE
*/
router.route('/:id').delete(SubjectController.remove);


module.exports = router;
