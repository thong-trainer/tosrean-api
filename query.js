
/* ---------------------------------------------------------
NOTE: join collection use $lookup
Testing...
--------------------------------------------------------- */
const students = await Student.aggregate([
   {
     // join here
     $lookup:
       {
         from: "users", // join collection
         localField: "userId", // primary key
         foreignField: "_id", // foreign key
         as: "user" // new name alias
       }
  },
  {
    $unwind: "$user"
  },
  {
    //  set condition here
    $match: {"user.active": true}
  },
  {
    // select fields here
    $project : {"score" : 1, "schools" : 1, "user" : 1}
  }
]);
