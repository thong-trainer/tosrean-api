// express-promise-router: use for auto handle errors
// so, no need to apply try catch on the function
// install: npm install express-promise-router
const router = require('express-promise-router')();
const User = require('../../models/user');
const School = require('../../models/school');
const SchoolDetail = require('../../models/schoolDetail');
const License = require('../../models/license');
const Subject = require('../../models/subject');
const Class = require('../../models/class');
const Teacher = require('../../models/teacher');
const Student = require('../../models/student');

router.get('/test', async function(req, res, next) {

  for (var i = 0; i < 3; i++) {

    // create a user as teacher, but for school login
    const newUser = User(UserAsTeacherDemo(i));
    const user = await newUser.save();

    // create a new school
    const newSchool = School(SchoolDemo(i));
    newSchool.createBy = user._id;
    const school = await newSchool.save();

    // create a new school detail that reference to the school
    const newSchoolDetail = SchoolDetail(SchoolDemo());
    newSchoolDetail.schoolId = school._id;
    const schoolDetail = await newSchoolDetail.save();

    // create a new license that reference to the school
    const newLicence = License();
    newLicence.schoolId = school._id;
    newLicence.package = "personal";
    newLicence.duration = 1;
    const current = new Date();
    newLicence.expireAt = current.setMonth(current.getMonth() + newLicence.duration);
    newLicence.createBy = user._id;
    const license = await newLicence.save();


    // create a new subject
    const newSubject = Subject();
    newSubject.name = "C++ Programming " + i;
    newSubject.createBy = user._id;
    newSubject.departmentId = schoolDetail.departments[0]._id;
    const subject = await newSubject.save();


    // create a new class
    const newClass = Class();
    newClass.name = "Year I Team I" + i;
    newClass.school = school;
    newClass.level = schoolDetail.levels[0];
    newClass.subject = subject;
    newClass.status = "opening";
    newClass.code = 1111;
    newClass.teachBy = user._id;
    newClass.grades = GradesDemo();
    newClass.students = StudentsDemo();
    const myClass = await newClass.save();



    // create a new teacher
    const newTeacher = Teacher();
    newTeacher.userId = user._id;
    newTeacher.schools[0] = school;
    newTeacher.departments[0] = schoolDetail.departments[0];
    newTeacher.subject = subject;
    newTeacher.classes[0] = myClass;
    const teacher = newTeacher.save();


    res.send(myClass);
  }


});



router.get('/school/:id', async function(req, res, next) {
  var id = req.params.id;

  // create a user as teacher
  const newUser = User(UserDemoId(id));
  newUser.password = newUser.generateHash(newUser.password);
  const user = await newUser.save();

  // create a new school
  const newSchool = School(SchoolDemoId(id));
  newSchool.createBy = user._id;
  const school = await newSchool.save();

  // create a new school detail that reference to the school
  const newSchoolDetail = SchoolDetail();
  newSchoolDetail.schoolId = school._id;
  newSchoolDetail.departments = DepartmentsDemo();
  newSchoolDetail.levels = LevelsDemo();
  newSchoolDetail.socialIds = SocialIdsDemo();
  const schoolDetail = await newSchoolDetail.save();

  // add school permission to user
  const editUser = await User.findById(user._id);
  editUser.permission = PermissionDemo();
  editUser.permission.schoolId = school._id;
  await editUser.save();

  // create a new license that reference to the school
  const newLicence = License();
  newLicence.schoolId = school._id;
  newLicence.package = "personal";
  newLicence.duration = 1;
  const current = new Date();
  newLicence.expireAt = current.setMonth(current.getMonth() + newLicence.duration);
  newLicence.createBy = user._id;
  const license = await newLicence.save();

  // create new subjects
  // goup of subjects
  const newSubject1 = Subject();
  newSubject1.name = "C++ Programming";
  newSubject1.createBy = user._id;
  newSubject1.departmentId = schoolDetail.departments[0]._id;
  newSubject1.levelId = schoolDetail.levels[0]._id;
  await newSubject1.save();

  const newSubject2 = Subject();
  newSubject2.name = "C# Programming";
  newSubject2.createBy = user._id;
  newSubject2.departmentId = schoolDetail.departments[0]._id;
  newSubject2.levelId = schoolDetail.levels[0]._id;
  await newSubject2.save();

  const newSubject3 = Subject();
  newSubject3.name = "Marketing";
  newSubject3.createBy = user._id;
  newSubject3.departmentId = schoolDetail.departments[1]._id;
  newSubject3.levelId = schoolDetail.levels[1]._id;
  await newSubject3.save();

  const newSubject4 = Subject();
  newSubject4.name = "Accounting";
  newSubject4.createBy = user._id;
  newSubject4.departmentId = schoolDetail.departments[1]._id;
  newSubject4.levelId = schoolDetail.levels[1]._id;
  await newSubject4.save();
  // end group of subjects

  res.send(newSubject4);
});



router.get('/school/subject/generate', async function(req, res, next) {
  var schoolDetails = await SchoolDetail.find({});

  schoolDetails.forEach(async function(schoolDetail){
    // create new subjects
    // goup of subjects
    const newSubject1 = Subject();
    newSubject1.name = "C++ Programming";
    newSubject1.createBy = "5afe562acec690025efb690f";
    newSubject1.departmentId = schoolDetail.departments[0]._id;
    newSubject1.levelId = schoolDetail.levels[0]._id;
    await newSubject1.save();

    const newSubject2 = Subject();
    newSubject2.name = "C# Programming";
    newSubject2.createBy = "5afe562acec690025efb690f";
    newSubject2.departmentId = schoolDetail.departments[0]._id;
    newSubject2.levelId = schoolDetail.levels[0]._id;
    await newSubject2.save();

    const newSubject3 = Subject();
    newSubject3.name = "Marketing";
    newSubject3.createBy = "5afe562acec690025efb690f";
    newSubject3.departmentId = schoolDetail.departments[1]._id;
    newSubject3.levelId = schoolDetail.levels[1]._id;
    await newSubject3.save();

    const newSubject4 = Subject();
    newSubject4.name = "Accounting";
    newSubject4.createBy = "5afe562acec690025efb690f";
    newSubject4.departmentId = schoolDetail.departments[1]._id;
    newSubject4.levelId = schoolDetail.levels[1]._id;
    await newSubject4.save();
    // end group of subjects
  });

  res.send(schoolDetails);
});


router.post('/notify', async function(req, res, next) {


  res.send("Working...");


});

// function TeacherDemo() {
//   return {
//     "firstName": "Ham",
//     "lastName": "Sokly",
//     "country": "+855",
//     "telephone": "+855-69999001",
//     "gender": "Male",
//     "level": "Teacher",
//     "password": "12345",
//     "tokens": [{
//       "ip": "192.129.122",
//       "device": "iPhone7",
//       "token": "5ad7ee09a2d5fb038435f001"
//     }]
//   };
// }
function TeacherDemo() {
  return {
    "firstName": "Sam",
    "lastName": "Kakada",
    "country": "+855",
    "telephone": "+855-69999011",
    "gender": "Male",
    "level": "Teacher",
    "password": "12345",
    "tokens": [{
      "ip": "192.129.122",
      "device": "iPhone7",
      "token": "5ad7ee09a2d5fb038435f011"
    }]
  };
}

// section school

// function UserDemo() {
//   return {
//     "firstName": "Ley",
//     "lastName": "Kamthong",
//     "country": "+855",
//     "telephone": "+855-69999000",
//     "gender": "Male",
//     "level": "Teacher",
//     "password": "12345",
//     "tokens": [{
//       "ip": "192.129.122",
//       "device": "iPhone7",
//       "token": "5ad7ee09a2d5fb038435f000"
//     }]
//   };
// }
function UserDemoId(id) {
  return {
    "firstName": "Chan",
    "lastName": "Rachana",
    "country": "+855",
    "telephone": "+855-6999905"+id,
    "gender": "Male",
    "level": "Teacher",
    "password": "12345",
    "tokens": [{
      "ip": "192.129.122",
      "device": "iPhone7",
      "token": "5ad7ee09a2d5fb038435f05"+id
    }]
  };
}

function PermissionDemo(){
  return {
        "level": "superadmin",
        "isView": true,
        "isInsert": true,
        "isUpdate": true,
        "isDelete": true,
      };
}

function DepartmentsDemo() {
  return [{
      "name": "Computer Science4"
    },
    {
      "name": "International Bussiness4"
    }
  ];
}

function LevelsDemo() {
  return [{
      "name": "Year 1"
    },
    {
      "name": "Year 2"
    },
    {
      "name": "Year 3"
    },
    {
      "name": "Year 4"
    }
  ];
}

// ===============================================
// School Demo Data
// ===============================================
function SchoolDemoId(id) {
  return {
    "schoolName": "Zaman University "+id,
    "type": "University",
    "email": "demo4@gmail.com",
    "address": "#23, st 271, toulkok, phnom penh, cambodia",
    "description": "the best school in cambodia that provice information teachnology skills",
    "color": "#45FF34",
    "logoImage": "http://www.norton-u.com/images/logo/logo_only.png",
    "coverImage": "http://fedoraproject.org/w/uploads/3/36/Norton.jpg",
    "createBy": "is_empty",
    "phone": {
      "office": "+855-23334556",
      "support": "+855-10233488",
      "mobile": "+855-12223344"
    }
  };
}

function SocialIdsDemo() {
  return [{
      "name": "Facebook",
      "url": "http://facebook.com/norton-u"
    },
    {
      "name": "Twitter",
      "url": "http://twitter.com/norton-u"
    },
    {
      "name": "Website",
      "url": "http://www.norton-u.com/"
    }
  ];
}


// ===============================================
// User as Teacher Demo Data
// ===============================================
function UserAsTeacherDemo(index) {
  return {
    "firstName": "Ley",
    "lastName": "Kamthong",
    "country": "+855",
    "telephone": "+855-69999777" + index,
    "gender": "Male",
    "level": "Teacher",
    "password": "12345",
    "tokens": [{
      "ip": "192.129.122",
      "device": "iPhone7",
      "token": "5ad7ee09a2d5fb038435f426" + index
    }]
  };
}


// ===============================================
// School Demo Data
// ===============================================
function SchoolDemo(index) {
  return {
    "schoolName": "Norton University" + index,
    "type": "University",
    "email": "norton@gmail.com" + index,
    "address": "#23, st 271, toulkok, phnom penh, cambodia",
    "description": "the best school in cambodia that provice information teachnology skills",
    "color": "#45FF34",
    "logoImage": "http://www.norton-u.com/images/logo/logo_only.png",
    "coverImage": "http://fedoraproject.org/w/uploads/3/36/Norton.jpg",
    "createBy": "5adfd701b0b963040d3e38c2",
    "phone": {
      "office": "+855023334556",
      "support": "+855010233488",
      "mobile": "+855012223344"
    },
    "socialIds": [{
        "name": "Facebook",
        "url": "http://facebook.com/norton-u"
      },
      {
        "name": "Twitter",
        "url": "http://twitter.com/norton-u"
      },
      {
        "name": "Website",
        "url": "http://www.norton-u.com/"
      }
    ],
    "levels": [{
        "name": "Year 1"
      },
      {
        "name": "Year 2"
      },
      {
        "name": "Year 3"
      },
      {
        "name": "Year 4"
      }
    ],
    "departments": [{
        "name": "Computer Science"
      },
      {
        "name": "International Bussiness"
      }
    ]
  }
};

// ===============================================
// List Grades of Average Score
// ===============================================
function GradesDemo() {
  return [{
      "name": "A",
      "maximum": "100",
      "minimum": "91",
      "status": "Excellent"
    },
    {
      "name": "B",
      "maximum": "90",
      "minimum": "81",
      "status": "Great"
    },
    {
      "name": "C",
      "maximum": "80",
      "minimum": "71",
      "status": "Good"
    },
    {
      "name": "D",
      "maximum": "70",
      "minimum": "61",
      "status": "Medium"
    },
    {
      "name": "E",
      "maximum": "60",
      "minimum": "50",
      "status": "Low"
    },
    {
      "name": "F",
      "maximum": "49",
      "minimum": "0",
      "status": "Failed"
    }
  ];
}
module.exports = router;
