const passport = require('passport');
// express-promise-router: use for auto handle errors
// so, no need to apply try catch on the function
// install: npm install express-promise-router
const router = require('express-promise-router')();
// import controllers
const ClassController = require('../../controllers/class');


// access token authentication
router.use(passport.authenticate('bearer', { session: false}));

/*
NOTE: Get a List of Classes
Url: localhost:4000/api/v1/p_index/p_index/class?access_token=<token>&filter=q_filter&id=q_id
Paramas: p_index as Number, p_index as Number
Queries: q_filter as String (optional), q_id as String (optional)
Token: required
Method: GET
*/
router.route('/:index/:limit').get(ClassController.index);

/*
NOTE: Get a Class by Id
Url: localhost:4000/api/v1/class/<class_id>?access_token=<token>
Paramas: class_id as String
Token: required
Method: GET
*/
router.route('/:id').get(ClassController.getById);

/*
NOTE: Create New Class
Url: localhost:4000/api/v1/class?access_token=<token>
Paramas: N/A
Token: required
Method: POST
*/
router.route('/').post(ClassController.insert);

/*
NOTE: Update Class by Id
Url: localhost:4000/api/v1/class/<class_id>?access_token=<token>
Paramas: class_id as String
Token: required
Method: PUT
*/
router.route('/:id').put(ClassController.update);

/*
NOTE: Add Studen to the Class
Url: localhost:4000/api/v1/class/add-student/<class_id>?access_token=<token>
Paramas: class_id as String
Token: required
Method: POST
*/
router.route('/add-student/:id').put(ClassController.addOrRemoveStudent);

/*
NOTE: Remove Class by Id
Url: localhost:4000/api/v1/class/<class_id>?access_token=<token>
Paramas: class_id as String
Token: required
Method: DELETE
*/
router.route('/:id').delete(ClassController.remove);





// -----------
// Testing
// -----------

const Teacher = require('../../models/teacher');
const Student = require('../../models/student');
const Class = require('../../models/class');
router.get('/', async function(req, res, next) {

  const classRoom = await Class.findById("5afe5c63a2ea18222ce2c930");

  const teacher = await Teacher.findOne({userId: "5afe562acec690025efb690f"});
  var index = teacher.classes.findIndex(x => x.id == classRoom._id);

  classRoom.students.forEach(async function(item){
    var student = await Student.findOne({userId: item.user._id});
    console.log("*** Student UserId:"+student._id);
  });


  res.send(classRoom);
  // console.log("***** index: "+index);
  // res.send("classRoom: "+index);

});


module.exports = router;
