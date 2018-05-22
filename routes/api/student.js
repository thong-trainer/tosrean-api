const passport = require('passport');
// express-promise-router: use for auto handle errors
// so, no need to apply try catch on the function
// install: npm install express-promise-router
const router = require('express-promise-router')();
// import controllers
const StudentController = require('../../controllers/student');

// access token authentication
router.use(passport.authenticate('bearer', { session: false}));

/*
NOTE: Get All Students
Url: localhost:4000/api/v1/student?access_token=<token>
Paramas: N/A
Token: required
Method: GET
*/
router.route('/').get(StudentController.index);

/*
NOTE: Get a Student by (Student Id or User Id)
Url: localhost:4000/api/v1/student/<student_id_or_user_id>?access_token=<token>
Paramas: student_id_or_user_id as String
Token: required
Method: GET
*/
router.route('/:id').get(StudentController.getById);

/*
NOTE: Create New Student
Url: localhost:4000/api/v1/student?access_token=<token>
Paramas: N/A
Token: required
Method: POST
*/
router.route('/').post(StudentController.insert);

/*
NOTE: Update Student by Id
Url: localhost:4000/api/v1/student/<student_id>?access_token=<token>
Paramas: student_id as String
Token: required
Method: PUT
*/
router.route('/:id').put(StudentController.update);


module.exports = router;
