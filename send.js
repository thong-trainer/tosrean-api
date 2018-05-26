var admin = require("firebase-admin");

var serviceAccount = require("/Users/leykamthong/Desktop/Project/Api/tosrean-api/tosrean-6699e-firebase-adminsdk-3l6fi-f79c468cc8.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://tosrean-6699e.firebaseio.com"
});


//var regToken = "fDz4b2mAzaI:APA91bHc0p3017cThVLyb6YaK-fxvEcpakXrD9FmHE4tM3lIGvpgyR7ur9nV_AENwEbe8ssSiFr6QfWYfuCuflAcRDFtnzHekTyLIUX-9WO3RoYj0UuI-UWgNzlImOZJdSTVZScOY8gp";
//var regToken = "d-qf0j0Nwv0:APA91bHUBnyiDv-CT8xyGqvogTMZJqOqsh7fsh3MrD-9wqL1E2A8v28uy7pGow2LdmbmTg7r-Ml6J4aQLjsCiGr7BobFzCa8Ie_JjVvRRh0c3kfAYCaB3RDs3-HmogVeglEssgzpN-C4";
// var payLoad = {
//   data: {
//     title: "title",
//     body: "test"
//   }
// };
//
// var options= {
//   priority: "high",
//   timeToLive: 60 * 60 *24
// };
//
// admin.messaging().sendToDevice(regToken, payLoad, options).then(function(res){
//   console.log("Successfully : "+res);
// }).catch(function(error){
//   console.log("Error : "+error);
// });




var message = {
  apns: {
    payload: {
      aps: {
        alert: {
          title: '$GOOG up 1.43% on the day',
          body: '$GOOG gained 11.80 points to close at 835.67, up 1.43% on the day.',
          content_available : true
        },
        badge: 42,
      }
    }
  },
  data: {
    title: "title",
    body: "body",
    score: '850',
    time: '2:45'
  },
  token: "dINBkUVkReo:APA91bHBIYNkqwvchNKV6Cl8optCzz_zElDKSMrE0T1TC2u_qY9KhnpzLLThuc0yPSCNRMFeHGEjq6reIN-AM6ufEPupoAff8k3E06OFT7HAEbbnHZZBcYmMVaW3z10kbrTyzC6lUE0l"
};

admin.messaging().send(message)
  .then((response) => {
    // Response is a message ID string.
    console.log('Successfully sent message:', response);
  })
  .catch((error) => {
    console.log('Error sending message:', error);
  });
