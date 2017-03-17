/* MongoDB Zoo (18.2.3)
 * =================== */

// Dependencies
var express = require("express");
var mongojs = require("mongojs");

// Initialize Express
var app = express();
app.use(express.static("public"));
// Database configuration
// Save the URL of our database as well as the name of our collection
var databaseUrl = "scraper";
var collections = ["nytimesData"];

// Use mongojs to hook the database to the db variable
var db = mongojs(databaseUrl, collections);

// This makes sure that any errors are logged if mongodb runs into an issue
db.on("error", function(error) {
  console.log("Database Error:", error);
});


// Routes
// 1. At the root path, send a simple hello world message to the browser
app.get("/", function(req, res) {
  res.send("Hello world");
});

// 2. At the "/all" path, display every entry in the nytimesData collection
app.get("/all", function(req, res) {
  // Query: In our database, go to the nytimesData collection, then "find" everything
  db.nytimesData.find({}, function(err, found) {
    // Log any errors if the server encounters one
    if (err) {
      console.log(err);
    }
    // Otherwise, send the result of this query to the browser
    else {
      res.json(found);
    }
  });
});

// 3. At the "/name" path, display every entry in the nytimesData collection, sorted by name
// app.get("/name", function(req, res) {
//   // Query: In our database, go to the nytimesData collection, then "find" everything,
//   // but this time, sort it by name (1 means ascending order)
//   db.nytimesData.find().sort({ name: 1 }, function(err, found) {
//     // Log any errors if the server encounters one
//     if (err) {
//       console.log(err);
//     }
//     // Otherwise, send the result of this query to the browser
//     else {
//       res.json(found);
//     }
//   });
// });

// // 4. At the "/weight" path, display every entry in the nytimesData collection, sorted by weight
// app.get("/weight", function(req, res) {
//   // Query: In our database, go to the nytimesData collection, then "find" everything,
//   // but this time, sort it by weight (-1 means descending order)
//   db.nytimesData.find().sort({ weight: -1 }, function(err, found) {
//     // Log any errors if the server encounters one
//     if (err) {
//       console.log(err);
//     }
//     // Otherwise, send the result of this query to the browser
//     else {
//       res.json(found);
//     }
//   });
// });

// Set the app to listen on port 3000
app.listen(3000, function() {
  console.log("App running on port 3000!");
});
