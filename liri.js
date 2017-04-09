//Node Pkgs needed
var Twitter = require('twitter');
var Spotify = require('spotify');
var request = require('request');
var keys = require('./keys');
var fs = require('fs');
//store user inputs as variables
var nodeArgs1 = process.argv[2];
var nodeArgs2 = process.argv[3];

//create a series of functions executed based on the user's input using their first input parameter
switch (nodeArgs1) {
    case 'my-tweets':
        tweeter();
        break;
    case 'spotify-this-song':
        //pass the second user parameter as an argument to the called function
        spotifier(nodeArgs2);
        break;
    case 'movie-this':
        //pass the second user parameter as an argument to the called function
        moviegoer(nodeArgs2);
        break;
    case 'do-what-it-says':
        randomTxt();
        break;
    default:
        //if no user input for the arguments play the song "Maybe IDK"
        nodeArgs2 = ("Maybe IDK")
        spotifier(nodeArgs2);
}

//function to display 20 tweets from Twitter with their creation date and time
function tweeter() {
    var client = new Twitter({
        //use our keys stored in keys.js
        consumer_key: keys.twitterKeys.consumer_key,
        consumer_secret: keys.twitterKeys.consumer_secret,
        access_token_key: keys.twitterKeys.access_token_key,
        access_token_secret: keys.twitterKeys.access_token_secret
    });
    //set the parameters for the twitter person and number of tweets
    var params = ({
        screen_name: 'POTUS',
        count: '20'
    });
    //make the call to twitter to get the tweet texts
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            //if no errors start a loop
            for (var i = 0; i < tweets.length; i++) {
                //console the tweet text and date, time created
                console.log('%j \n', tweets[i].text, tweets[i].created_at);
            }
        }
    });
}

//function to display the following data from OMDB API:
// * Title of the movie.
// * Year the movie came out.
// * IMDB Rating of the movie.
// * Country where the movie was produced.
// * Language of the movie.
// * Plot of the movie.
// * Actors in the movie.
// * Rotten Tomatoes Rating.
function moviegoer() {
    var movie = "";
    //check for user input
    if (nodeArgs2 === undefined) {
        //if no movie is inputted then use Mr. Nobody
        movie = ("Mr. Nobody");
        nodeArgs2 = movie
    } else {
        //assign movie name from user input to variable for search
        movie = nodeArgs2;
    }
    request("http://www.omdbapi.com/?t=" + nodeArgs2 + "&y=&plot=short&r=json", function(error, response, body) {
        if (!error && response.statusCode === 200) {
            console.log("Movie name: " + JSON.parse(body).Title);
            console.log("Movie year: " + JSON.parse(body).Year);
            console.log("Movie rating: " + JSON.parse(body).imdbRating);
            console.log("Country where movie was produced: " + JSON.parse(body).Country);
            console.log("Movie language: " + JSON.parse(body).Language);
            console.log("Movie plot: " + JSON.parse(body).Plot);
            console.log("Movie actors: " + JSON.parse(body).Actors);
            //add a check to see if there is a rotten tomatoes rating for this movie
            if (JSON.parse(body).Ratings !== undefined && JSON.parse(body).Ratings.length > 1) {
                console.log("Movie Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
            } else {
                console.log('A "Rotten Tomatoes Rating" is not available for this movie.');
            }
        }
    });
}

//function to grab user input song name from Spotify and play it
function spotifier() {
    var song = "";
    var artist = "";
    //console.log('spotifier');
    //check for user input
    if (nodeArgs2 === undefined) {
        //if no user input for song, assign a song
        song = ("The Sign");
        artist = ("Ace of Base");
        nodeArgs2 = song;
        i = 15;
    } else {
        //assign song name from user input to variable for search  
        i = 0;
        // song = nodeArgs2;
    }
    Spotify.search({ type: 'track', query: nodeArgs2 }, function(err, data) {
        if (err) {
            console.log('Error occurred: ' + err);
            return;
        } else {
            console.log(data.tracks.items[i].preview_url);
        }
    });
}

//function to grab data from random.txt to be used as parameters called in the appropriate function
function randomTxt() {
    fs.readFile("random.txt", "utf8", function(error, data) {
        //split data from random.txt using comma and store in an Array for use as parameters for function call
        var dataArr = data.split(",");
        nodeArgs1 = (dataArr[0]);
        nodeArgs2 = (dataArr[1]);
        spotifier(nodeArgs2)

    });
}
