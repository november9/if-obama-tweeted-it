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
    { screen_name: "boorackobama", count: 10, tweet_mode: "extended" },
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

function checkForDupe (trumpTweetText) {
  return T.get(
    "statuses/user_timeline",
    { screen_name: "boorackobama", count: 1, tweet_mode: "extended" },
    function (err, lastBoorakTweet) {
      console.log('generateComparisonString(trumpTweetText)', generateComparisonString(trumpTweetText));
      console.log('generateComparisonString(lastBoorakTweet[0].full_text)', generateComparisonString(lastBoorakTweet[0].full_text));

      return generateComparisonString(trumpTweetText) === generateComparisonString(lastBoorakTweet[0].full_text)
    });
}

function tweetTrump() {
  T.get(
    "statuses/user_timeline",
    { screen_name: "realDonaldTrump", count: 10, tweet_mode: "extended" },
    async function(err, data, response) {
      var trumpTweetArray = await data.map(function(val) {
        val.created_at_ms = convertTwitterDate(val.created_at);
        return val;
      });
      if (trumpTweetArray) {
        var sortedTrumpTweets = _.orderBy(trumpTweetArray, ['created_at_ms'],['desc']);
        sortedTrumpTweets.forEach(async function (sortedTweet) {
          var decodedSortedTweet = he.decode(sortedTweet.full_text);
          delete sortedTweet.created_at_ms;
          var isDupe = await checkForDupe(decodedSortedTweet);
          console.log('isDupe', isDupe);
          if (!isDupe) {
            // stuff
          }
          // T.post('statuses/update', {
          //   status: _.truncate(he.decode(decodedSortedTweet), {
          //     'length': 280,
          //     'omission': ' [...]'
          //   }),
          // })
          // .then(function () {
          //   console.log('TWEET WAS POSTED!');
          // })
          // .catch(function () {
          //   console.log('TWEET FAILED TO POST!');
          // });
        });
      } else {
        console.log('FAILED TO GET TRUMP TWEETS!');
      }

    }
  );
}

function postTrumpTweets () {
  setInterval(function () {
    tweetTrump();
  }, 3000000);
}
// exports.tweet_trump_as_obama = deleteTweets;
// exports.tweet_trump_as_obama = postTrumpTweets;
exports.tweet_trump_as_obama = tweetTrump;
