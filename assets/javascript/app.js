// Declaration of variables
var animals = ["lion","Tiger"];
var input;
var i;
var limit = 10;
// var queryURL = "https://api.giphy.com/v1/gifs/" + xT4uQulxzV39haRFjG + "?api_key=fwPvz04E3buxTZ95FnxM8IJwGBRPT7dZ";

function searchGif(){
    var animal = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=fwPvz04E3buxTZ95FnxM8IJwGBRPT7dZ&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
        console.log(response);
        var image = response.data;
        for(var i=0;i<limit;i++){
        // $("#images").append("<br><br><img src="+image[i].images.fixed_height.url+">");
        var imageDiv = $("<div>");
        var pDiv = $("<div>");
        var imageTag = $("<img>");
        imageTag.attr("src",image[i].images.downsized_still.url);
        imageTag.attr("width","150px");
        imageTag.attr("height","150px");
        imageTag.addClass("animalGif");
        imageTag.addClass("inline");
        imageTag.attr("data-still",image[i].images.downsized_still.url);
        imageTag.attr("data-animate",image[i].images.fixed_height.url);
        imageTag.attr("data-state","still");
        var rating = image[i].rating;
        var p = $("<p>").text("Rating: " + rating);
        console.log("rating: "+rating);
        // $("#gifView").append(rating);
        // $("#images").append(imageTag);
        imageDiv.html(imageTag);
        pDiv.append(p);
        // imageDiv.text(imageTag);
        // pDiv.text(p);
        $("#allDiv").prepend(imageDiv);
        $("#allDiv").prepend(pDiv);

        
        // image[i].images.480w_still.url 
        }

        // To pause gif image when clicked
$(".animalGif").on("click", function(){
  var state = $(this).attr("data-state");
  console.log("State :"+state);
  if(state === "still"){
    var animate = $(this).attr("data-animate");
    $(this).attr("src",animate);
    $(this).attr("data-state","animate");
  }

  if(state === "animate"){
    var still = $(this).attr("data-still");
    $(this).attr("src",still);
    $(this).attr("data-state","still");
  }


});
});
}



      // Function for generating button
      function generateButton() {
          // empties content of button div
        $("#gifView").empty();

        // Looping through the array of animals
        for (i = 0; i < animals.length; i++) {
          var newButton = $("<button>");
          newButton.addClass("animalClass");
          newButton.attr("data-name", animals[i]);
          newButton.text(animals[i]);
          // Added the button to the HTML
          $("#gifView").append(newButton);
        }
      }

      // This function handles events when button is clicked
      $("#addAnimal").on("click", function(event) {
        event.preventDefault();
        input = $("#enterAnimals").val();
        animals.push(input);
        generateButton();
      });

      $(document).on("click",".animalClass",searchGif);
      generateButton()