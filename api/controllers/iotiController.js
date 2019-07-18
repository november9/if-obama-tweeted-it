"use strict";

var Twit = require("twit");
var _ = require("lodash")
var he = require('he');
var moment = require('moment');

var T = new Twit({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
  timeout_ms: 60 * 1000, // optional HTTP request timeout to apply to all requests.
  strictSSL: false // optional - requires SSL certificates to be valid.
});
var lastTrumpTweet;

function abbreviateTweet (tweetText) {
  if (tweetText.length > 280) {
    return tweetText;
  }
}

function tweetTrump() {
  T.get(
    "statuses/user_timeline",
    { screen_name: "boorackobama", count: 10, tweet_mode: "extended" },
    function(err, data, response) {
      return;
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

  T.get(
    "statuses/user_timeline",
    { screen_name: "realDonaldTrump", count: 10, tweet_mode: "extended" },
    async function(err, data, response) {
      // return;
      // console.log("data", data);
      // lastTrumpTweet = data[9].id;
      var trumpTweetArray = await data.map(function(val) {
        console.log('val.created_at', val.created_at);
        var reformattedDate = new Date(Date.parse(val.created_at.replace(/( \+)/, ' UTC$1')));
        var reformattedDate = reformattedDate.getMilliseconds();

        console.log('reformattedDate', reformattedDate);
        // var dateStrArray = val.created_at.split(' ');
        // var yearVal = dateStrArray[dateStrArray.length - 1];
        // var monthVal = dateStrArray[1].toLowerCase;
        // var dayVal = dateStrArray[3];
        // var dayName = reformattedDate.toString().split('T')[0].split(' ')[0].toLowerCase();
        ;
        // var dateArray = val.created_at.split(' ');
        // var day = moment().day(val.created_at);
        // val.created_at_ms = moment(val.created_ad).valueOf();
        // console.log('val.created_at_ms', val.created_at_ms);
        return val;
      });
return;
      if (trumpTweetArray) {
        var sortedTrumpTweets = _.sortBy(trumpTweetArray, ['created_at_ms']);
        console.log('sortedTrumpTweets', sortedTrumpTweets);
        sortedTrumpTweets.forEach(function (sortedTweet) {
          delete sortedTweet.created_at_ms;
          T.post('statuses/update', {
            status: _.truncate(he.decode(sortedTweet.full_text), {
              'length': 280,
              'omission': ' [...]'
            }),
          })
          .then(function () {
            console.log('TWEET WAS POSTED!');
          })
          .catch(function () {
            console.log('TWEET FAILED TO POST!');
          });
        });
      } else {
        console.log('FAILED TO GET TRUMP TWEETS!');
      }

    }
  );
}

exports.tweet_trump_as_obama = tweetTrump;
