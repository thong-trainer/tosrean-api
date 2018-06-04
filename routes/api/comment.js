const passport = require('passport');
// express-promise-router: use for auto handle errors
// so, no need to apply try catch on the function
// install: npm install express-promise-router
const router = require('express-promise-router')();
// import controllers
const CommentController = require('../../controllers/comment');

// access token authentication
router.use(passport.authenticate('bearer', { session: false}));

/*
NOTE: Get Comments by Topic Id
Url: localhost:4000/api/v1/comment/<topic_id>/<status>/index/limit?access_token=<token>
Paramas: topic_id as String, status as String, index as Number, limit as Number
Token: required
Method: GET
*/
router.route('/:topicId/:status/:index/:limit').get(CommentController.index);

/*
NOTE: Get a Comment by Id
Url: localhost:4000/api/v1/comment/<comment_id>?access_token=<token>
Paramas: comment_id as String
Token: required
Method: GET
*/
router.route('/:id').get(CommentController.getById);

/*
NOTE: Create New Comment
Url: localhost:4000/api/v1/comment?access_token=<token>
Paramas: N/A
Token: required
Method: POST
*/
router.route('/').post(CommentController.insert);

/*
NOTE: Update Comment by Id
Url: localhost:4000/api/v1/comment/<comment_id>?access_token=<token>
Paramas: comment_id as String
Token: required
Method: PUT
*/
router.route('/:id').put(CommentController.update);

/*
NOTE: Remove Comment by Id
Url: localhost:4000/api/v1/comment/<comment_id>?access_token=<token>
Paramas: comment_id as String
Token: required
Method: DELETE
*/
router.route('/:id').delete(CommentController.remove);


module.exports = router;
