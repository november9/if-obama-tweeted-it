'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var TweetSchema = new Schema({
  tweetText: {
    type: String,
    required: 'Kindly enter the name of the tweet'
  },
  Created_date: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model('Tweets', TweetSchema);