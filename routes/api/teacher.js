const passport = require('passport');
// express-promise-router: use for auto handle errors
// so, no need to apply try catch on the function
// install: npm install express-promise-router
const router = require('express-promise-router')();
// import controllers
const TeacherController = require('../../controllers/teacher');

// access token authentication
router.use(passport.authenticate('bearer', { session: false}));

/*
NOTE: Get All Teachers
Url: localhost:4000/api/v1/teacher?access_token=<token>
Paramas: N/A
Token: required
Method: GET
*/
router.route('/:index/:limit').get(TeacherController.index);

/*
NOTE: Get a Teacher by (Teacher Id or User Id)
Url: localhost:4000/api/v1/teacher/<teacher_id_or_user_id>?access_token=<token>
Paramas: teacher_id_or_user_id as String
Token: required
Method: GET
*/
router.route('/:id').get(TeacherController.getById);

/*
NOTE: Create New Teacher
Url: localhost:4000/api/v1/teacher?access_token=<token>
Paramas: N/A
Token: required
Method: POST
*/
router.route('/').post(TeacherController.insert);

/*
NOTE: Update Teacher by Id
Url: localhost:4000/api/v1/teacher/<teacher_id>?access_token=<token>
Paramas: teacher_id as String
Token: required
Method: PUT
*/
router.route('/:id').put(TeacherController.update);


module.exports = router;
