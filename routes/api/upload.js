// express-promise-router: use for auto handle errors
// so, no need to apply try catch on the function
// install: npm install express-promise-router
const router = require('express-promise-router')();
// import controllers
const UploadController = require('../../controllers/upload');



router.route('/image').post(UploadController.saveImage);


module.exports = router;
