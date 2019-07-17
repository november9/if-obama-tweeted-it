require("dotenv").config();

const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require("mongoose");
const Tweet = require("./api/models/iotiModel"); //created model loading here
const bodyParser = require("body-parser");

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
// mongoose.connect("mongodb://localhost/Iotidb");
mongoose.connect(`mongodb+srv://dorono:${encodeURIComponent(process.env.DB_PASSWORD)}@cluster0-dbh8e.gcp.mongodb.net/test?retryWrites=true&w=majority`, { useNewUrlParser: true });
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function(req, res) {
  res.status(404).send({ url: req.originalUrl + " not found" });
});

var routes = require("./api/routes/iotiRoutes"); //importing route
routes(app); //register the route

app.listen(port, function (){
  console.log("if-obama-tweeted-it RESTful API server started on: " + port);
});

