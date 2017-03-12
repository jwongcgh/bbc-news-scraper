$(document).ready(function () {




$("#scrapeBtn").on("click", function(event) {
  event.preventDefault();
  $.getJSON('/scrape', function(data) {
    console.log("scraped");
    console.log(data);
    // getScraped();
  });
});

// change savedArticle status
$(".artBtn").on("click", function(event){
  event.preventDefault();
  let data = {
    _id: $(this).attr("data-id")
  };
  console.log("data to controller: " + data);
  $.post('/:id', data, function(data) {
    console.log("post saved status: " + data);
  })
})

// link to saved articles
$("#savedArticleBtn").on("click", function(event) {
  event.preventDefault();
  $("#articlesList").empty();
  $.get('/loadSavedArticles', function(data) {
    // console.log("saved articles: " + data);
    console.log("founc saved done");
  })

})












}); // end doc ready
