// Dependencies
var express = require("express");
var exphbs = require("express-handlebars");
var bodyParser = require("body-parser");
var logger = require("morgan");

// var mongojs = require("mongojs");
var mongoose = require("mongoose");

// Require request and cheerio. This makes the scraping possible
// var request = require("request");
// var cheerio = require("cheerio");

// require models:
// var Note = require("./models/Note.js");
// var Article = require("./models/Article.js");

// =========

// manage promises
mongoose.Promise = Promise;

// ==========

// Initialize Express
var app = express();

// set handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main.handlebars"}));
app.set("view engine", "handlebars");

// use morgan and body parser
app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: false}));

// Database configuration if using mongojs
// var databaseUrl = "scraper";
// var collections = ["scrapedData"];
// Hook mongojs configuration to the db variable
// var db = mongojs(databaseUrl, collections);
// db.on("error", function(error) {
//   console.log("Database Error:", error);
// });

// ==========

// Make public a static dir
app.use(express.static(process.cwd() + "/public"));

// ==========

// database configuration with mongoose
mongoose.connect("mongodb://localhost/scraper");
var db = mongoose.connection;

db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});

db.once("open", function() {
  console.log("Mongoose connection successful.");
});

// ==========

require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

// ==========

// Listen on port 3000
app.listen(3000, function() {
  console.log("App running on port 3000!");
});

// ==========

// end server.js