const passport = require('passport');
// express-promise-router: use for auto handle errors
// so, no need to apply try catch on the function
// install: npm install express-promise-router
const router = require('express-promise-router')();
// import controllers
const LevelController = require('../../controllers/level');

// access token authentication
router.use(passport.authenticate('bearer', { session: false}));

/*
NOTE: Get Levels by School Id
Url: localhost:4000/api/v1/level/<school_id>?access_token=<token>
Paramas: school_id as String
Token: required
Method: GET
*/
router.route('/:schoolId').get(LevelController.index);

/*
NOTE: Get a Level
Url: localhost:4000/api/v1/level/<subject_id>/<level_id>?access_token=<token>
Paramas: subject_id as String, level_id as String
Token: required
Method: GET
*/
router.route('/:schoolId/:levelId').get(LevelController.getById);

/*
NOTE: Create New Level
Url: localhost:4000/api/v1/level/<school_id>?access_token=<token>
Paramas: school_id as String
Token: required
Method: POST
*/
router.route('/:schoolId').post(LevelController.insert);

/*
NOTE: Update Level
Url: localhost:4000/api/v1/level/<school_id>/<level_id>?access_token=<token>
Paramas: school_id as String, level_id as String
Token: required
Method: PUT
*/
router.route('/:schoolId/:levelId').put(LevelController.update);

/*
NOTE: Remove Level by Id
Url: localhost:4000/api/v1/level/<school_id>/<level_id>?access_token=<token>
Paramas: school_id as String, level_id as String
Token: required
Method: DELETE
*/
router.route('/:schoolId/:levelId').delete(LevelController.remove);


module.exports = router;
