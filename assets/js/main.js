$(document).ready(function(){

// Initial array so that there are buttons on the page
  
var gifArray = ["Frodo", "Gandalf", "Aragorn", "Elrond", "Arwen", "Smeagol", "Faramir", "Saruman"];

// Function to render the buttons on the page

function renderButtons() {  
    $("#gif-buttons").empty();
  
  for (i=0; i < gifArray.length; i++) {
    var button = $("<button>" + gifArray[i] + "</button>")
    button.addClass("gif-btn")
    button.addClass("btn btn-primary")
    button.attr("data-value", gifArray[i]);
    $("#gif-buttons").append(button);
  }
}

// Click event to add new buttons on the page

$("#add-gif").on("click", function(event) {
  event.preventDefault();
  var $newGif = $("#gif-input").val().trim();
  gifArray.push($newGif);
  $("#gif-input").val("")
  renderButtons();
});

// Click event that will display the gifs on the page

$("#gif-buttons").on("click", ".gif-btn", function() {
  var gifButton = $(this).attr("data-value");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
  gifButton + "&api_key=scSbJjvVscm9RoMLZNGjGZ7mt1S377Uu&limit=121";
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {    
    results = response.data
    for (var i = 0; i < 10; i++) {
     j = Math.floor(Math.random()*(30-1+1)+1)
    gifDiv = $("<div>")
    gifDiv.addClass("gif-div");    
    p = $("<p>")
    p.html("Title: " + results[j].title + "<br> " + "Rating: " + results[j].rating)
    gifImage = $("<img>")
    gifImage.attr("src", results[j].images.fixed_height_still.url)
    gifImage.attr("data-still", results[j].images.fixed_height_still.url)
    gifImage.attr("data-animate", results[j].images.fixed_height.url)
    gifImage.attr("data-state", "still")
    gifImage.addClass("gif img-responsive")
    gifDiv.append(p)
    gifDiv.append(gifImage)
      $("#gif-section").prepend(gifDiv)
    }
  });
});

// Rendering the buttons so that they appear on page when it is loaded.

renderButtons()

// On click event that will let the gif be animated or still

$("#gif-section").on("click", ".gif", function() {
  
    state = $(this).attr("data-state")
  if (state == "still"){
    $(this).attr("src", $(this).attr("data-animate"))
    $(this).attr("data-state", "animate")    
  }
  if (state == "animate"){
    $(this).attr("src", $(this).attr("data-still"))
    $(this).attr("data-state", "still")    
  } 
});
});