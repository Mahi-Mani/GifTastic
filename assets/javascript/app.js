// Declaration of variables
var animals = ["Lion","Tiger"];
var input;
var i;
// var limit = 10;
// var queryURL = "https://api.giphy.com/v1/gifs/" + xT4uQulxzV39haRFjG + "?api_key=fwPvz04E3buxTZ95FnxM8IJwGBRPT7dZ";

function searchGif(){
    $("#allDiv").show();
    var animal = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=fwPvz04E3buxTZ95FnxM8IJwGBRPT7dZ&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
        console.log(response);
        var image = response.data;
        for(var i=0;i<image.length;i++){
        // $("#images").append("<br><br><img src="+image[i].images.fixed_height.url+">");
        var imageDiv = $("<div>");
        // var pDiv = $("<div>"); 
        var imageTag = $("<img>");
        imageTag.attr("src",image[i].images.downsized_still.url);
        imageTag.attr("width","150px");
        imageTag.attr("height","150px");
        imageTag.addClass("animalGif");
        imageTag.addClass("column");
        imageTag.attr("data-still",image[i].images.downsized_still.url);
        imageTag.attr("data-animate",image[i].images.fixed_height.url);
        imageTag.attr("data-state","still");
        var rating = image[i].rating;
        var title = image[i].title.trim("GIF");
        var p = $("<p>").text("Rating: " + rating);
        p.addClass("column");
        console.log("Rating: "+rating);
        imageDiv.append(imageTag);
        imageDiv.prepend("<p>Rating : " + rating + "</p>");
        imageDiv.prepend("<p>Title : "+ title + "</p>");
        
        $(".row").prepend(imageDiv);
        $(".row").prepend("<br><hr>");
        }
});

}

function randomGif(event){
  event.preventDefault();
  // var animal = $(this).attr("data-name");
  var queryURL = "https://api.giphy.com/v1/gifs/random?api_key=fwPvz04E3buxTZ95FnxM8IJwGBRPT7dZ&limit=10&random_id=e826c9fc5c929e0d6c6d423841a282aa";

  $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      console.log(response);
      var gifs = response.data;
      // console.log("gifs"+gifs);
      // $("#images").append("<br><br><img src="+image[i].images.fixed_height.url+">");
      var newimageDiv = $("<div>");
      // var pDiv = $("<div>"); 
      var newimageTag = $("<img>");
      newimageTag.attr("src",gifs.images.downsized_still.url);
      console.log("image src "+gifs.images.downsized_still.url);
      newimageTag.attr("width","150px");
      newimageTag.attr("height","150px");
      newimageTag.addClass("animalGif");
      newimageTag.addClass("column");
      newimageTag.attr("data-still",gifs.images.downsized_still.url);
      newimageTag.attr("data-animate",gifs.images.fixed_height.url);
      newimageTag.attr("data-state","still");
      // var rating = gifs.rating;
      // var newp = $("<p>").text("");
      // newp.addClass("column");
      // console.log("Rating: "+rating);
      var title = gifs.title;
      newimageDiv.append(newimageTag);
      newimageDiv.prepend("<p>"+ title + "</p>");
      // newimageDiv.prepend("<p>Rating : " + rating + "</p>");
      $("#allDiv").show();
      $(".row").prepend(newimageDiv);

      $(".row").prepend("<br>");
    


});

}
 
        // To pause gif image when clicked
        $(document).on("click",".animalGif",function(){
          var state = $(this).attr("data-state");
          // console.log("State :"+state+"of animal "+animals[i]);
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



      // Function for generating button
      function generateButton() {
          // empties content of button div
        $("#gifView").empty();

        // Looping through the array of animals
        for (i = 0; i < animals.length; i++) {
          // <button type="submit" class="btn btn-primary"id="addAnimal">Add</button>

          var newButton = $("<button>");
          newButton.addClass("animalClass btn btn-success");
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

      $("#clear").on("click",function(event){
        event.preventDefault();
        $("#allDiv").hide();
        $(".row").empty();
        $("#enterAnimals").val("");

      });


      $(document).on("click",".animalClass",searchGif);
      $("#addGif").on("click", randomGif);

      
      generateButton();