var controller = require('../controllers/controller.js');

module.exports = function(app){
  app.get('/', controller.displayScraped);
  app.get("/scrape", controller.scrapeIt);
  app.post("/:id", controller.saveArticle);
  app.get('/loadSavedArticles', controller.loadSavedArticles);
}


