"use strict";

var Twit = require("twit");
var axios = require("axios");

var T = new Twit({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
  timeout_ms: 60 * 1000, // optional HTTP request timeout to apply to all requests.
  strictSSL: false // optional - requires SSL certificates to be valid.
});

async function postAndStoreTweets (trumpTweet) {
  try {
    var postedTweet = T.post("statuses/update", {
      status: trumpTweet
    });
    var tweetToSave = await postedTweet;
    if (tweetToSave) {
      axios.post(
        "/tweets",
        {
          id: tweetToSave.id
        },
        {
          id_str: tweetToSave.id_str
        },
        {
          text: tweetToSave.text
        },
        {
          created_at: tweetToSave.created_at
        })
        .then(function(res) {
          console.log("WORKED", res);
        })
        .catch(function(err) {
          console.log("error", err);
        })
    }
  } catch(err) {
    console.log('error posting tweets', err);
  }
}

function tweetTrump() {
  var tweetsToSave = [{}];

  T.get(
    "statuses/user_timeline",
    { screen_name: "realDonaldTrump", count: 2 },
    function(err, data, response) {
      // console.log('data', data)
      // lastTrumpTweet = data[9].id;
      return data.map(function(tweet) {
        postAndStoreTweets(tweet.text);
      });
    }
  );
}

exports.tweet_trump_as_obama = tweetTrump;

exports.list_all_tweets = function(req, res) {
  Tweet.find({}, function(err, tweet) {
    if (err) res.send(err);
    res.json(tweet);
  });
};

exports.save_a_tweet = function(req, res) {
  var new_tweet = new Tweet(req.body);
  new_tweet.save(function(err, tweet) {
    if (err) res.send(err);
    res.json(tweet);
  });
};

exports.read_a_tweet = function(req, res) {
  Tweet.findById(req.params.id, function(err, tweet) {
    if (err) res.send(err);
    res.json(tweet);
  });
};

exports.update_a_tweet = function(req, res) {
  Tweet.findOneAndUpdate(
    { _id: req.params.tweetId },
    req.body,
    { new: true },
    function(err, tweet) {
      if (err) res.send(err);
      res.json(tweet);
    }
  );
};

exports.delete_a_tweet = function(req, res) {
  Tweet.remove(
    {
      _id: req.params.tweetId
    },
    function(err, tweet) {
      if (err) res.send(err);
      res.json({ message: "Tweet successfully deleted" });
    }
  );
};
