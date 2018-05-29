var sendNotification = function(data) {
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

  req.write(JSON.stringify(data));
  req.end();
};

var message = {
  app_id: "82e23f59-0451-402c-9a88-295873247389",
  headings: {"en": "From Machine"},
  contents: {"en": "English Message All"},
  included_segments: ["Active Users"]
};

sendNotification(message);
