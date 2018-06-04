const passport = require('passport');
// express-promise-router: use for auto handle errors
// so, no need to apply try catch on the function
// install: npm install express-promise-router
const router = require('express-promise-router')();
// import controllers
const RatingController = require('../../controllers/rating');

// access token authentication
router.use(passport.authenticate('bearer', { session: false}));

/*
NOTE: Get a Rating by Topic Id, Status and User Id
Url: localhost:4000/api/v1/rating/<topic_id>/<status>/<user_id>?access_token=<token>
Paramas: topic_id as String, status as String, user_id as String
Token: required
Method: GET
*/
router.route('/:topicId/:status/:userId').get(RatingController.index);
/*
NOTE: Add a New User to the Rating
Url: localhost:4000/api/v1/rating?access_token=<token>
Paramas: N/A
Token: required
Method: POST
*/
router.route('/').post(RatingController.insert);

/*
NOTE: Update the User in to Rating
Url: localhost:4000/api/v1/rating/<rating_id>?access_token=<token>
Paramas: rating_id as String
Token: required
Method: PUT
*/
router.route('/:id').put(RatingController.update);

module.exports = router;
