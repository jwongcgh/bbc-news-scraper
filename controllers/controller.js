var Note = require("../models/Note.js");
var Article = require("../models/Article.js");
var request = require("request");
var cheerio = require("cheerio");
var express = require("express");

// ============================================
// ============================================

module.exports = {

  // A GET request to scrape the echojs website
  scrapeIt: function(req, res) {
    var data;
    // First, we grab the body of the html with request
    request('http://www.bbc.com/news', function(error, response, html) {
      // Then, we load that into cheerio and save it to $ for a shorthand selector
      var $ = cheerio.load(html);
      // Now, we grab every div with a .gs-c-promo-body class, and do the following:
      $('.gs-c-promo-body').each(function(i, element) {

        // Save an empty result object
        var result = {};
        result.savedArticle = false;

        // Add the text and href of every link, and save them as properties of the result object
        result.link = "http://www.bbc.com/" + $(element).find('a').attr('href');
        result.title = $(element).find('h3').text();

        // Using our Article model, create a new entry
        // This effectively passes the result object to the entry (and the title and link)
        var entry = new Article(result);

        // Now, save that entry to the db
        entry.save(function(err, doc) {
          // Log any errors
          if (err) {
            console.log(err);
          }
          // Or log the doc
          else {
            console.log("scraped");
          }
        }); // end save entry in database
      });
    });
    // Tell the browser that we finished scraping the text
    res.redirect('/');
  },  // end scrapeIt

// ============================================
// ============================================

  // when path is home '/' should display scraped data
  displayScraped: function(req, res) {
    // This will get the articles we scraped from the mongoDB
    // app.get("/articles", function(req, res) {
    // Grab every doc in the Articles array
    Article.find({}, function(error, doc) {
      // Log any errors
      if (error) {
        console.log(error);
      }
      // Or send the doc to the browser as a json object
      else {
        var data = {
          artic: doc
        }
        // for (let item in doc) {
        //   art.push(doc[item]);
        // }
        // console.log("art array is: " + art);
        res.render('index', data);
      }
    });
  // });
}, // end displayScraped

// ============================================
// ============================================

// mark articles as saved by changing its boolean value
saveArticle: function(req, res) {
  console.log("controller id: ", req.body);

  // change savedArticle boolean value to true (aka saved)
  Article.findOneAndUpdate(req.body, {savedArticle: true})
    .exec(function(err, doc) {
      if (err) {
        console.log(err);
      } else {
        res.redirect('/');
      }
    });
},

// ============================================
// ============================================


// ****************  NOT WORKING YET
// load saved articles on button click
loadSavedArticles: function(req, res) {
  console.log("inside loadSavedArticles controller");
  Article.findAll({}).where(savedArticle).equals(true).exec( function (err, doc) {
    // Log any errors
    if (error) {
      console.log(error);
    }
    // Or send the doc to the browser as a json object
    else {
      var data = {
        artic: doc
      }
      console.log("saved list: " + data);
      res.render('index', data);
    }
  });
}

}  // end of module exports
