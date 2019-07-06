"use strict";

var mongoose = require("mongoose");
var Tweet = mongoose.model("Tweets");
var Twit = require("twit");
<<<<<<< HEAD
var configure = require("../../config");

var T = new Twit(configure);

exports.list_all_tweets = function(req, res) {
    T.get(
        "statuses/user_timeline",
        { screen_name: "realDonaldTrump", count: 10 },
        function(err, tweets, response) {
            console.log('tweets', tweets)

            res.json(tweets)
            // return data.map(function(val) {
            //     console.log("TWEET TWEET!:  ", val.text);
            //     // return val.text;
            // });
        }
    );
}

// var scrape_tweets_from_twitter = function() {
//      T.get(
//         "statuses/user_timeline",
//         { screen_name: "realDonaldTrump", count: 10 },
//         function(err, data, response) {
//             // console.log('data', data)
//             return data.map(function(val) {
//                 console.log("TWEET TWEET!:  ", val.text);
//                 responseData(response, {
//                     statuses: response
//                 });

//                 // return val.text;
//             });
//         }
//     );
// };

// scrape_tweets_from_twitter();

// exports.list_all_tweets = function(req, res) {
//     Tweet.find({}, function(err, tweet) {
//         if (err) res.send(err);
//         res.json(tweet);
//     });
// };

exports.create_a_tweet = function(req, res) {
    var new_tweet = new Tweet(req.body);
    new_tweet.save(function(err, tweet) {
=======
var configure = require("../../configure");

var T = new Twit(configure);
var lastTrumpTweet;

function tweetTrump () {

    T.get(
        "statuses/user_timeline",
        { screen_name: "realDonaldTrump", count: 10 },
        function(err, data, response) {
            // console.log('data', data)
            lastTrumpTweet = data[9].id;
            return data.map(function(val) {
                console.log('lastTrumpTweet', lastTrumpTweet);
                console.log('val.id', val.id);
                if (lastTrumpTweet === val.id) {
                    return;
                } else {
                    T.post('statuses/update', {status: val.text});
                }
            });
        }
    );
}

// tweetTrump();

// T.get(
//     "statuses/user_timeline",
//     { screen_name: "realDonaldTrump", count: 10 },
//     function(err, data, response) {
//         // console.log('data', data)
//         return data.map(function(val) {
//             // T.post('statuses/update', {status: val.text});
//         });
//     }
// );

// var scrape_tweets_from_twitter = function() {
//      T.get(
//         "statuses/user_timeline",
//         { screen_name: "realDonaldTrump", count: 10 },
//         function(err, data, response) {
//             // console.log('data', data)
//             return data.map(function(val) {
//                 console.log("TWEET TWEET!:  ", val.text);
//                 responseData(response, {
//                     statuses: response
//                 });

//                 // return val.text;
//             });
//         }
//     );
// };

// scrape_tweets_from_twitter();

exports.list_all_tweets = function(req, res) {
    Tweet.find({}, function(err, tweet) {
>>>>>>> updated files
        if (err) res.send(err);
        res.json(tweet);
    });
};

<<<<<<< HEAD
=======
exports.create_a_tweet = function(req, res) {
    var new_tweet = new Tweet(req.body);
    new_tweet.save(function(err, tweet) {
        if (err) res.send(err);
        res.json(tweet);
    });
};

>>>>>>> updated files
exports.read_a_tweet = function(req, res) {
    Tweet.findById(req.params.tweetId, function(err, tweet) {
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
