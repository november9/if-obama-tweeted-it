'use strict';
module.exports = function(app) {
  var ioti = require('../controllers/iotiController');
  ioti.tweet_trump_as_obama();

  app.route('/tweets')
  .get(ioti.list_all_tweets)
  .post(ioti.save_a_tweet);

 app.route('/tweets/:tweetId')
  .get(ioti.read_a_tweet)
  .put(ioti.update_a_tweet)
  .delete(ioti.delete_a_tweet);
};