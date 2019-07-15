"use strict";

var Twit = require("twit");

var T = new Twit({
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token: process.env.ACCESS_TOKEN,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET,
    timeout_ms: 60*1000,  // optional HTTP request timeout to apply to all requests.
    strictSSL: false  // optional - requires SSL certificates to be valid.
});
var lastTrumpTweet;

function tweetTrump () {

    T.get(
        "statuses/user_timeline",
        { screen_name: "realDonaldTrump", count: 10 },
        function(err, data, response) {
            // console.log('data', data)
            // lastTrumpTweet = data[9].id;
            return data.map(function(val) {
                // console.log('lastTrumpTweet', lastTrumpTweet);
                // console.log('val.id', val.id);
                console.log('val.text', val.text);
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