const mongoose = require('mongoose');
// import models
const Rating = require('../models/rating');

module.exports = {
  // get a rating
  index: async (req, res, next) => {

    const topicId = mongoose.Types.ObjectId(req.params.topicId);
    const userId = mongoose.Types.ObjectId(req.params.userId);
    const status = req.params.status;

    var data = await Rating.aggregate([
        { $match: {topicId: topicId, status: status} },
        { $unwind: "$userIds" },
        {
          $group: {
              "_id": "$_id",
              "selectedStar": {
                  $max: {
                      $cond: [ {$eq: ['$userIds.userId', userId]}, '$userIds.star', 0 ]
                  }
              },
              "totalOneStar": {
                  $sum: {
                      $cond: [{$eq: ['$userIds.star', 1]}, 1, 0]
                  }
              },
              "totalTwoStar":{
                  $sum: {
                      $cond: [{$eq: ['$userIds.star', 2]}, 1, 0]
                  }
              },
              "totalThreeStar":{
                  $sum: {
                      $cond: [{$eq: ['$userIds.star', 3]}, 1, 0]
                  }
              },
              "totalFourStar": {
                  $sum: {
                      $cond: [{$eq: ['$userIds.star', 4]}, 1, 0]
                  }
              },
              "totalFiveStar":{
                  $sum: {
                      $cond: [{$eq: ['$userIds.star', 5]}, 1, 0]
                  }
              }
          }
      },
    ]);

    var item = data[0];
    var value = (5 * item["totalFiveStar"] + 4 * item["totalFourStar"] + 3 * item["totalThreeStar"] +
                2 * item["totalTwoStar"] + 1 * item["totalOneStar"]);

    var total = (item["totalOneStar"] + item["totalTwoStar"] + item["totalThreeStar"] +
                item["totalFourStar"] + item["totalFiveStar"]);

    item["topicId"] = topicId;
    item["status"] = status;
    item["userId"] = userId;
    item["total"] = total;
    item["averageStar"] = parseInt(value / total);

    res.send(item);
  },
  // add a new user who rated to the topic
  insert: async (req, res, next) => {

    console.log(">> INSERTING...");
    const rating = await Rating.findOne({topicId: req.body.topicId, status: req.body.status});

    rating.userIds.push({ userId: req.body.userId, star: req.body.selectedStar });
    const result = await rating.save();
    res.send(result);

  },
  // edit a user who rated to the topic
  update: async (req, res, next) => {

    console.log(">> UPDATING...");
    const rating = await Rating.findOne({topicId: req.body.topicId, status: req.body.status});

    var index = rating.userIds.findIndex(x => x.userId == req.body.userId);
    rating.userIds[index].star = req.body.selectedStar;
    const result = await rating.save();
    res.send(result);

  }
};
