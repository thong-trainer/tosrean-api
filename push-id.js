//https://documentation.onesignal.com/reference#create-notification
//https://www.npmjs.com/package/node-onesignal
//https://github.com/rdelrosario/xamarin-plugins/tree/master/PushNotification
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
  contents: {"en": "English Message ID"},
  include_player_ids: ["af61c9cf-8210-4316-9f6e-9f18a933816b","50e91f0a-c291-4c15-9aa5-d1c5922ed4da","add5949b-efa1-418e-97fd-c642cfc82e85"]
};

sendNotification(message);