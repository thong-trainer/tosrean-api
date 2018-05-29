const passport = require('passport');
// express-promise-router: use for auto handle errors
// so, no need to apply try catch on the function
// install: npm install express-promise-router
const router = require('express-promise-router')();
// import controllers
const GroupController = require('../../controllers/group');

// access token authentication
router.use(passport.authenticate('bearer', { session: false}));

/*
NOTE: Get Groups by Class Id
Url: localhost:4000/api/v1/group/<class_id>?access_token=<token>
Paramas: class_id as String
Token: required
Method: GET
*/
router.route('/:classId').get(GroupController.index);

/*
NOTE: Get a Group by Id
Url: localhost:4000/api/v1/subject/id/<group_id>?access_token=<token>
Paramas: group_id as String
Token: required
Method: GET
*/
router.route('/id/:id').get(GroupController.getById);

/*
NOTE: Create New Group
Url: localhost:4000/api/v1/group?access_token=<token>
Paramas: N/A
Token: required
Method: POST
*/
router.route('/').post(GroupController.insert);

/*
NOTE: Update Group by Id
Url: localhost:4000/api/v1/group/<group_id>?access_token=<token>
Paramas: group_id as String
Token: required
Method: PUT
*/
router.route('/:id').put(GroupController.update);

/*
NOTE: Remove Group by Id
Url: localhost:4000/api/v1/group/<group_id>?access_token=<token>
Paramas: group_id as String
Token: required
Method: DELETE
*/
router.route('/:id').delete(GroupController.remove);


module.exports = router;
