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
    case 'POTUS-tweets':
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
        //if no user input for argument 1 play "Maybe IDK"
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

//function to display data from OMDB API
function moviegoer() {
    var movie = "";
    console.log('moviegoer');
    //check for user input
    if (nodeArgs2 === undefined) {
        //if no movie is inputted then use Mr. Nobody
        movie = ("Mr. Nobody");
        console.log(movie);
        console.log('false');
    } else {
        //assign movie name from user input to variable for search
        movie = nodeArgs2;
        console.log(movie);
        console.log('true');
    }
}

//function to grab user inputted song from Spotify and play it
function spotifier() {
    var song = "";
    console.log('spotifier');
    //check for user input
    if (nodeArgs2 === undefined) {
        //if no user input for song, assign a song
        song = ("The Sign");
        console.log(song);
        console.log('false');
    } else {
        //assign song name from user input to variable for search  
        song = nodeArgs2;
        console.log(song);
        console.log('true');
    }

}

//function to grab data from random.txt to be used as parameters called in the appropriate function
function randomTxt() {
    fs.readFile("random.txt", "utf8", function(error, data) {
        console.log(data);
        //split data from random.txt using comma and store in an Array for use as parameters for function call
        var dataArr = data.split(",");
        console.log(dataArr);
        console.log(dataArr[0], dataArr[1]);

        //function((dataArr[0]), (dataArr[1]));

    })
}
