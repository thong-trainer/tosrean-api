const fs = require('fs');
const passport = require('passport');
const router = require('express-promise-router')();

const UserController = require('../../controllers/users');


/*
NOTE: Register a New User
Url: localhost:4000/api/v1/auth/register
Paramas: N/A
Token: required
Method: POST
*/
router.route('/register').post(UserController.register);

/*
NOTE: User Login
Url: localhost:4000/api/v1/auth/login
Paramas: N/A
Token: required
Method: POST
*/
router.route('/login').post(UserController.login);




module.exports = router;
