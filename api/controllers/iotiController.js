'use strict';


var mongoose = require('mongoose'),
  Tweet = mongoose.model('Tweets');

exports.list_all_tweets = function(req, res) {
  Tweet.find({}, function(err, tweet) {
    if (err)
      res.send(err);
    res.json(tweet);
  });
};



exports.create_a_tweet = function(req, res) {
  var new_tweet = new Tweet(req.body);
  new_tweet.save(function(err, tweet) {
    if (err)
      res.send(err);
    res.json(tweet);
  });
};


exports.read_a_tweet = function(req, res) {
  Tweet.findById(req.params.tweetId, function(err, tweet) {
    if (err)
      res.send(err);
    res.json(tweet);
  });
};


exports.update_a_tweet = function(req, res) {
  Tweet.findOneAndUpdate({_id: req.params.tweetId}, req.body, {new: true}, function(err, tweet) {
    if (err)
      res.send(err);
    res.json(tweet);
  });
};


exports.delete_a_tweet = function(req, res) {


  Tweet.remove({
    _id: req.params.tweetId
  }, function(err, tweet) {
    if (err)
      res.send(err);
    res.json({ message: 'Tweet successfully deleted' });
  });
};