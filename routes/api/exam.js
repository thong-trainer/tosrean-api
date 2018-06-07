const passport = require('passport');
// express-promise-router: use for auto handle errors
// so, no need to apply try catch on the function
// install: npm install express-promise-router
const router = require('express-promise-router')();
// import controllers
const ExamController = require('../../controllers/exam');

// access token authentication
router.use(passport.authenticate('bearer', { session: false}));

/*
NOTE: Get Exams by Class Id
Url: localhost:4000/api/v1/exam/<class_id>?access_token=<token>
Paramas: class_id as String
Token: required
Method: GET
*/
router.route('/:classId').get(ExamController.index);

/*
NOTE: Get a Exam by Id
Url: localhost:4000/api/v1/exam/id/<exam_id>?access_token=<token>
Paramas: exam_id as String
Token: required
Method: GET
*/
router.route('/id/:id').get(ExamController.getById);

/*
NOTE: Create New Exam
Url: localhost:4000/api/v1/exam?access_token=<token>
Paramas: N/A
Token: required
Method: POST
*/
router.route('/').post(ExamController.insert);

/*
NOTE: Update Exam by Id
Url: localhost:4000/api/v1/exam/<exam_id>?access_token=<token>
Paramas: exam_id as String
Token: required
Method: PUT
*/
router.route('/:id').put(ExamController.update);

/*
NOTE: Update Score Student in Exam by Id
Url: localhost:4000/api/v1/exam/score/<exam_id>?access_token=<token>
Paramas: exam_id as String
Token: required
Method: PUT
*/
router.route('/score/:id').put(ExamController.updateScore);

/*
NOTE: Remove Exam by Id
Url: localhost:4000/api/v1/exam/<exam_id>?access_token=<token>
Paramas: exam_id as String
Token: required
Method: DELETE
*/
router.route('/:id').delete(ExamController.remove);


module.exports = router;
