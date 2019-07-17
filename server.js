require("dotenv").config();

const Express = require("express");
const BodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;

const CONNECTION_URL = "mongodb+srv://dorono:BMTnqcXsu8Aptr@cluster0-dbh8e.gcp.mongodb.net/test?retryWrites=true&w=majority";

// const CONNECTION_URL = 'mongodb+srv://jazziseverywhere@gmail.com:' + process.env.DB_PASSWORD + '@cluster0-dbh8e.gcp.mongodb.net/test?retryWrites=true&w=majority';
const DATABASE_NAME = "Iotidb";

var app = Express();

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

var database, collection;

app.listen(3000, () => {
    MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true }, (error, client) => {
        if(error) {
            throw error;
        }
        database = client.db(DATABASE_NAME);
        collection = database.collection("posted_tweets");
        console.log("Connected to `" + DATABASE_NAME + "`!");
        app.post("/tweets", (request, response) => {
          collection.insert(request.body, (error, result) => {
              if(error) {
                  return response.status(500).send(error);
              }
              response.send(result.result);
          });
      });
    });
});

// require("dotenv").config();

// const express = require("express");
// const app = express();
// const port = process.env.PORT || 3000;
// const mongoose = require("mongoose");
// const ObjectId = require("mongodb").ObjectID;
// const bodyParser = require("body-parser");

// // mongoose instance connection url connection
// mongoose.Promise = global.Promise;
// // mongoose.connect("mongodb://localhost/Iotidb");
// mongoose.connect(`mongodb+srv://dorono:${encodeURIComponent(process.env.DB_PASSWORD)}@cluster0-dbh8e.gcp.mongodb.net/test?retryWrites=true&w=majority`, { useNewUrlParser: true });
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
// app.use(function(req, res) {
//   res.status(404).send({ url: req.originalUrl + " not found" });
// });

// var routes = require("./api/routes/iotiRoutes"); //importing route
// routes(app); //register the route

// app.listen(port, function (){
//   console.log("if-obama-tweeted-it RESTful API server started on: " + port);
// });

