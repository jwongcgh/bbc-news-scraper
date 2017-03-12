// dependencies
var path = require("path");

// Routes
// =============================================================
module.exports = function(app) {

 // Each of the below routes just handles the HTML page that the user gets sent to.

 // app.get("/", function(req, res) {
 //   res.render("index.handlebars");
 // });

 // index route loads index.html
  app.get("/index", function(req, res) {
    res.sendFile(path.join(__dirname + "/../public/index.html"));
  });

 // saved route loads saved.html
  // app.get("/saved", function(req, res) {
  //   res.sendFile(path.join(__dirname + "/../public/saved.html"));
  // });


};
