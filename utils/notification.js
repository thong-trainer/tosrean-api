//https://documentation.onesignal.com/reference#create-notification
//https://www.npmjs.com/package/node-onesignal
//https://github.com/rdelrosario/xamarin-plugins/tree/master/PushNotification

const User = require('../models/user');

const APP_ID = "82e23f59-0451-402c-9a88-295873247389";
const AUTH = "Basic ZDBiZDJmYWUtMDU5ZC00MGQxLWFlNGQtNjI5ODEzZjczZmVi";
module.exports = {
  sendAll: async (content) => {
    var headers = {
      "Content-Type": "application/json; charset=utf-8",
      "Authorization": "Basic ZDBiZDJmYWUtMDU5ZC00MGQxLWFlNGQtNjI5ODEzZjczZmVi"
    };

    var options = {
      host: "onesignal.com",
      port: 443,
      path: "/api/v1/notifications",
      method: "POST",
      headers: headers
    };

    var https = require('https');
    var req = https.request(options, function(res) {
      res.on('data', function(data) {
        console.log("Response:");
        console.log(JSON.parse(data));
      });
    });

    req.on('error', function(e) {
      console.log("ERROR:");
      console.log(e);
    });

    console.log('Sending Notification ...')

    var message = {
      app_id: APP_ID,
      contents: {"en": content},
      headings: {"en": "Title App"},
      data: {"test": "123899", "imageUrl": "profile_female_placeholder.png"},
      included_segments: ["Active Users"],

    };

    req.write(JSON.stringify(message));
    req.end();
  },
  sendToClass: async (user, classRoom) => {
    var headers = {
      "Content-Type": "application/json; charset=utf-8",
      "Authorization": "Basic ZDBiZDJmYWUtMDU5ZC00MGQxLWFlNGQtNjI5ODEzZjczZmVi"
    };

    var options = {
      host: "onesignal.com",
      port: 443,
      path: "/api/v1/notifications",
      method: "POST",
      headers: headers
    };

    var https = require('https');
    var req = https.request(options, function(res) {
      res.on('data', function(data) {
        console.log("Response:");
        console.log(JSON.parse(data));
      });
    });

    // return error
    req.on('error', function(e) {
      console.log("ERROR:");
      console.log(e);
    });

    console.log('Sending Notification ...');
    var tokens = [];
    // get a token from the teacher
    var teacher = await User.findById(classRoom.teachBy);
    if(teacher){
      //console.log("********** teacher ***********");
      //console.log(teacher.tokens);
      var token = teacher.tokens[teacher.tokens.length - 1].token;
      console.log(">> Teacher Token: "+token+"   (telephone) "+teacher.telephone);
      tokens.push(token);
    }


    // get a token from each students in the class
    for (var i = 0; i < classRoom.students.length; i++) {
      var student = classRoom.students[i];

      var user = await User.findById(student.user._id);
      var token = user.tokens[user.tokens.length - 1].token;
      console.log(">> Student Token: "+token+"   (telephone) "+user.telephone);
      tokens.push(token);
    }


    // message information
    var content = user.firstName +" "+ user.lastName+" joined in "+
    classRoom.level.name+" "+classRoom.name+" at "+classRoom.school.schoolName;
    var message = {
      app_id: APP_ID,
      headings: {"en": "New Student"},
      contents: {"en": content},
      data: {"profile": user._id, "imageUrl": user.profileImage, "timestamp": classRoom.updatedAt},
      include_player_ids: tokens
    };

    req.write(JSON.stringify(message));
    req.end();
  },
  sendToUser: async (content, token) => {
    var headers = {
      "Content-Type": "application/json; charset=utf-8",
      "Authorization": "Basic ZDBiZDJmYWUtMDU5ZC00MGQxLWFlNGQtNjI5ODEzZjczZmVi"
    };

    var options = {
      host: "onesignal.com",
      port: 443,
      path: "/api/v1/notifications",
      method: "POST",
      headers: headers
    };

    var https = require('https');
    var req = https.request(options, function(res) {
      res.on('data', function(data) {
        console.log("Response:");
        console.log(JSON.parse(data));
      });
    });

    req.on('error', function(e) {
      console.log("ERROR:");
      console.log(e);
    });

    console.log('Sending Notification ...')

    var message = {
      app_id: APP_ID,
      contents: {"en": content},
      include_player_ids: [token]
    };

    req.write(JSON.stringify(message));
    req.end();
  }


}
