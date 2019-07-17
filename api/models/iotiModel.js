"use strict";
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var TrumpTweetSchema = new Schema({
    id_str: {
        type: String
    },
    id: {
        type: Number
    },
    text: {
        type: String
    },
    created_at: {
        type: String
    }
});

module.exports = mongoose.model("TrumpTweets", TrumpTweetSchema);
