
require('dotenv').config();

const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const mongoose = require('mongoose')
//   Task = require('./api/models/iotiModel'), //created model loading here
const Tweet = require('./api/models/iotiModel'); //created model loading here
const bodyParser = require('body-parser');

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost/Tododb');
mongoose.connect('mongodb://localhost/Iotidb');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./api/routes/iotiRoutes'); //importing route
routes(app); //register the route


app.listen(port);

console.log('todo list RESTful API server started on: ' + port);