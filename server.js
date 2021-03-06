
require('dotenv').config();

var express = require('express'),
  app = express(),
  port = process.env.PORT || 8080,
  mongoose = require('mongoose'),
  // Tweet = require('./api/models/iotiModel'), //created model loading here
  bodyParser = require('body-parser');

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost/Tododb');
// mongoose.connect('mongodb://localhost/Iotidb');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./api/routes/iotiRoutes'); //importing route
routes(app); //register the route


app.listen(port);

console.log('If Obama Tweeted It RESTful API server started on: ' + port);