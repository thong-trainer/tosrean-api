//https://documentation.onesignal.com/reference#create-notification
//https://www.npmjs.com/package/node-onesignal
//https://github.com/rdelrosario/xamarin-plugins/tree/master/PushNotification
module.exports = {
  // get all students
  sendNotification: async (data) => {
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

    req.write(JSON.stringify(data));
    req.end();
  }

}
