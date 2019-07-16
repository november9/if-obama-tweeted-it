"use strict";

var Twit = require("twit");
var moment = require('moment');

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
        { screen_name: "realDonaldTrump", count: 1 },
        // { screen_name: "boorackobama", count: 1 },
        function(err, data, response) {
            // console.log('data', data)
            // lastTrumpTweet = data[9].id;
            return data.map(function(val) {
                var trumpTweetCreatedAt = moment().valueOf(val.created_at);
                // if (trumpTweetCreatedAt)
                // console.log('lastTrumpTweet', lastTrumpTweet);
                console.log('val.created_at', val.created_at);
                console.log('moment().valueOf(val.created_at)', moment().valueOf(val.created_at));
                // if (lastTrumpTweet === val.id) {
                //     return;
                // } else {
                    return;
                    T.post('statuses/update', {
                        status: val.text,
                        entities: {
                            hashtags: [
                                val.id
                            ]
                        }
                    });
                // }
            });
        }
    );
}

exports.tweet_trump_as_obama = tweetTrump;