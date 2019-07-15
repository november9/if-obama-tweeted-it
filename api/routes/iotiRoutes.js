'use strict';
module.exports = function(app) {
  var ioti = require('../controllers/iotiController');
  ioti.tweet_trump_as_obama();
};