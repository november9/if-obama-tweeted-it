"use strict";

var Twit = require("twit");
var _ = require("lodash")
var he = require('he');

var convertTwitterDate = require("../../utils/convertTwitterDate");
var generateComparisonString = require("../../utils/generateComparisonString");

var T = new Twit({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
  timeout_ms: 60 * 1000, // optional HTTP request timeout to apply to all requests.
  strictSSL: false // optional - requires SSL certificates to be valid.
});
var lastTrumpTweet;

function deleteTweets() {
  T.get(
    "statuses/user_timeline",
    { screen_name: "boorackobama", count: 80, tweet_mode: "extended" },
    function(err, data, response) {


      console.log("data", data);
      // lastTrumpTweet = data[9].id;
      return data.map(async function(val) {
        // console.log('lastTrumpTweet', lastTrumpTweet);
        console.log("val.id", val.id);
        // console.log('val.text', val.text);
        const tweetData = await val;
        if (tweetData) {
          // T.post('statuses/update', {status: val.full_text});
          T.post("statuses/destroy/:id", { id: val.id_str }, function(
            err,
            data,
            response
          ) {
            console.log(data);
          });
        } else {
          console.log("something went wrong!");
        }
      });
    }
  );
}

function getTweets (screenName, numTweets) {
  return T.get("statuses/user_timeline",
    { screen_name: screenName, count: numTweets, tweet_mode: "extended" })
    .catch(function(err) {
      console.log('ERROR TIME', err)
    })
    .then(function (result) {
      return result;
    });
}

function getFullText (tweetObject) {
  if (_.has(tweetObject, 'retweeted_status.full_text')) {
    return `RT: ${tweetObject.retweeted_status.user.name}: ${tweetObject.retweeted_status.full_text}`;
  }

  return tweetObject.full_text;
}


function tweetTrump() {
  console.log('starting tweetTrump...');
  var trumpTweets = getTweets('realDonaldTrump', 3);
  var latestBoorakTweet = getTweets('boorackobama', 1);

  Promise.all([trumpTweets, latestBoorakTweet]).then(function (val) {
    var trumpTweetsData = val[0].data;
    var latestBoorakTweetData = val[1].data[0];

    var trumpTweetsWithConvertedDate = trumpTweetsData.map(function(val) {
      val.created_at_ms = convertTwitterDate(val.created_at);
      return val;
    });

    var sortedTrumpTweets = _.orderBy(trumpTweetsWithConvertedDate, ['created_at_ms'], ['asc']);
    sortedTrumpTweets.forEach(function (sortedTrumpTweet) {
      var decodedSortedTweet = he.decode(getFullText(sortedTrumpTweet));
      delete sortedTrumpTweet.created_at_ms;
      if (
        !latestBoorakTweetData
        ||
        (
          latestBoorakTweetData.full_text
          &&
          (
            generateComparisonString(sortedTrumpTweet.full_text) !== generateComparisonString(latestBoorakTweetData.full_text)
          )
        )
      ) {
          console.log('ATTEMPTING TWEET...');
        T.post('statuses/update', {
          status: _.truncate(decodedSortedTweet, {
            'length': 280,
            'omission': ' [...]'
          }),
        })
        .then(function () {
          console.log('TWEET WAS POSTED!');
        })
        .catch(function (err) {
          console.log('TWEET FAILED TO POST!', err);
        });
      }
    });
  });
}

function postTrumpTweetsOnInterval () {
  setInterval(function () {
    tweetTrump();
  }, 120000);
}
// exports.tweet_trump_as_obama = deleteTweets;
exports.tweet_trump_as_obama = postTrumpTweetsOnInterval;
// exports.tweet_trump_as_obama = tweetTrump;
