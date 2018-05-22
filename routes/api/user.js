const passport = require('passport');
// express-promise-router: use for auto handle errors
// so, no need to apply try catch on the function
// install: npm install express-promise-router
const router = require('express-promise-router')();
// import controllers
const UserController = require('../../controllers/users');

// access token authentication
router.use(passport.authenticate('bearer', { session: false}));

/*
NOTE: Get All Users
Url: localhost:4000/api/v1/user?access_token=<token>
Paramas: N/A
Token: required
Method: GET
*/
router.route('/:index/:limit').get(UserController.index);

/*
NOTE: Get a User by Id
Url: localhost:4000/api/v1/user/<user_id>?access_token=<token>
Paramas: user_id as String
Token: required
Method: GET
*/
router.route('/:id').get(UserController.getById);

/*
NOTE: Update a User by Id
Url: localhost:4000/api/v1/user/<user_id>?access_token=<token>
Paramas: user_id as String
Token: required
Method: PUT
*/
router.route('/:id').put(UserController.update);

router.route('/changepassword/:id').put(UserController.changePassword);


module.exports = router;
