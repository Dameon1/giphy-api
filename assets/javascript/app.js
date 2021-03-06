'use strict';

// document ready... allows the page to load completely before linking anything to the html
/////////////////....very important

$(document).ready(function() {

  // initial array to start things
  let starterButtons = ['Crying Jordan','Sips Tea','Deal With It','Like a Boss','Dank Memes','Kermit','Feels','Hair Flip','Salt Bae','Confused'];

  // API key
  let key = 'TJ3hFEuUCW6f24PJ1BdxxVsiFp4EkH0n';

  // buttons function for initial and possibly future button setup
  let buttons = () => {

  //a for loop through inital array to make buttons at start and possibly after newButton
    for (let i = 0; i < starterButtons.length; i++) {

      // creating a new variable that is a new <button>
      let button = $('<button>');

      // this gives the button front-end text
      button.text(starterButtons[i]);

      // adding the class "button" for styling purposes
      button.addClass('button');

      // adding back end data to the data to be used for searches
      button.attr('data', starterButtons[i]);

      // attaching the new buttons to the #techButtons div
      $('#techButtons').append(button);
    }
  };

  // working 'onclick' function that retrieves gifs
  $(document.body).on('click', '.button', function() {

    // determines the buttons search for term with searchTerm variable
    let searchTerm = $(this).attr('data');
   
    // query location
    let queryURL = 'https://api.giphy.com/v1/gifs/search?q=' +
    searchTerm + '&api_key=' + key + '&limit=10';

    // emptying out the content for new
    $('#gifs').empty();

    // ajax request
    $.ajax({
      url: queryURL,
      method: 'GET'
    })
      .done(function(response) {

      // variable to hold the response and a log to see what the response was
        let results = response.data;
     
        /* this loop goes through data recieved,creates a new <div> tag, creates a rating variable,
      creates and attaches <p> tag WITH text, a new <img> tag, adding different
      data attributes to change gifs state, attaches new <img> to the new <div>,
      attaches new div to #gifs id div*/


        for (var i = 0; i < results.length; i++) {
          // created new <div> with gifDiv variable
          let gifDiv = $('<div>');
          gifDiv.addClass('gifContainer');
          // created variable to hold rating
          let rating = results[i].rating;
          // created a variable for the ratings text and attached it to a <p> tag
          let p = $('<p >').text('Rating: ' + rating);
          // created a new <img> tag to hold gif
          let techImage = $('<img>');
          // added class .image to the image
          techImage.addClass('image size');
          // added the attribute of "src" to initialize gif   // these next 4 .attrs controls result states
          techImage.attr('src', results[i].images.fixed_height_still.url);
          // added the attribute of "data-state" as a toggle between start and stop
          techImage.attr('data-state', 'still');
          // added the attribute of "data-animate" to access start function
          techImage.attr('data-animate', results[i].images.fixed_height.url);
          // added attribute of "data-still" for stopping
          techImage.attr('data-still', results[i].images.fixed_height_still.url);
          // prepending(attaching) the gif to the new <div>
          gifDiv.prepend(techImage);
          // prepending(attaching) the text rating to the gif with p variable
          gifDiv.prepend(p);
          // prepending(attaching) all of new <div> to existing HTML id of #gifs
          $('#gifs').prepend(gifDiv);
        }
      });

  });

  // this allows the class images {created dynamically} to be clicked
  $(document.body).on('click', '.image', function() {

    // declaring variables to work with

    // created a variable to hold "current" data state to be able to change
    let state = $(this).attr('data-state');

    // created a variable that gets the still of gif
    let still = $(this).attr('data-still');

    // created a varieable that gets the moving gif
    let animate = $(this).attr('data-animate');

    // conditional to change state of gif between play and still
    if (state === 'animate') {
     
      $(this).attr('src', still);
      $(this).attr('data-state', 'still');
    }
    else  {
      
      $(this).attr('src', animate);
      $(this).attr('data-state','animate');
    }
  });

  // submit button functionality
  $('#addTech').on('click', function(event) {
    event.preventDefault();
    // created a variable to hold the user input
    let newTech = $('#tech-input').val().trim();

    // adding what was added to initial array
    starterButtons.push(newTech);

    // empty the buttons out
    $('#techButtons').empty();

    // re-populate buttons with button function call
    buttons();

    // clearing out the text input field
    $('#tech-input').val('');
  });


  // calling buttons function to start
  buttons();

  // closes out the document.ready
});
