"use strict";

var Twit = require("twit");
var truncate = require("lodash").truncate
var he = require('he');

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
    function(err, data, response) {
      // return;
      // console.log("data", data);
      // lastTrumpTweet = data[9].id;
      return data.map(async function(val) {
        // console.log('val.full_text', val.full_text);
        // console.log('val.id', val.id);
        // console.log('val.text', val.text);
        const tweetData = await val;
        if (tweetData) {

          console.log('LENGTH:', tweetData.full_text.length);
          console.log('ID:', tweetData.id_str);
          T.post('statuses/update', {
            status: truncate(he.decode(val.full_text), {
              'length': 280,
              'omission': ' [...]'
            }),
          })
          .then(function (res) {
            console.log('SUCCESS!');
          })
          .catch(function(err) {
            console.log('ERROR YO', err);
          });

        } else {
          console.log("something went wrong!");
        }
        // if (lastTrumpTweet === val.id) {
        //     return;
        // } else {
        //     //T.post('statuses/update', {status: val.text});
        // }
      });
    }
  );
}

exports.tweet_trump_as_obama = tweetTrump;
