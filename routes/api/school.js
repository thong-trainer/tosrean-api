const passport = require('passport');
// express-promise-router: use for auto handle errors
// so, no need to apply try catch on the function
// install: npm install express-promise-router
const router = require('express-promise-router')();
// import controllers
const SchoolController = require('../../controllers/schools');

// access token authentication
router.use(passport.authenticate('bearer', { session: false}));

/*
NOTE: Get All Schools
Url: localhost:4000/api/v1/school?access_token=<token>
Paramas: N/A
Token: required
Method: GET
*/
router.route('/:index/:limit').get(SchoolController.index);

/*
NOTE: Get a School by Id
Url: localhost:4000/api/v1/school/<school_id>?access_token=<token>
Paramas: school_id as String
Token: required
Method: GET
*/
router.route('/:id').get(SchoolController.getById);

/*
NOTE: Create New School
Url: localhost:4000/api/v1/school?access_token=<token>
Paramas: N/A
Token: required
Method: POST
*/
router.route('/').post(SchoolController.insert);

/*
NOTE: Update a School by Id
Url: localhost:4000/api/v1/school/<school_id>?access_token=<token>
Paramas: school_id as String
Token: required
Method: PUT
*/
router.route('/:id').put(SchoolController.update);

/*
NOTE: Update a School Phone by Id
Url: localhost:4000/api/v1/school/phone/<school_id>?access_token=<token>
Paramas: school_id as String
Token: required
Method: PUT
*/
router.route('/social/:id').put(SchoolController.updateSocial);


/*
NOTE: Upgrade School License
Url: localhost:4000/api/v1/school/phone/<school_id>?access_token=<token>
Paramas: school_id as String
Token: required
Method: PUT
*/
router.route('/upgrade').post(SchoolController.upgradeLicense);

module.exports = router;
