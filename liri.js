//Node Pkgs needed
var Twitter = require('twitter');
var Spotify = require('spotify');
var request = require('request');
var keys = require('./keys');
//store user inputs as variables
var nodeArgs1 = process.argv[2];
var nodeArgs2 = process.argv[3];

//create a series of functions executed based on the user's input
switch (nodeArgs1) {
    case 'POTUS-tweets':
        tweeter();
        break;
    case 'spotify-this-song':
        spotifier(nodeArgs2);
        break;
    case 'movie-this':
        moviegoer(nodeArgs2);
        break;
    case 'do-what-it-says':
        randomTxt();
        break;
    default:
        tweeter();

}
//function to display 20 tweets with their creation date and time
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

function moviegoer() {
    var movie = "";
    console.log('moviegoer');
    //if no movie is inputted then use Mr. Nobody
    if (nodeArgs2 === undefined) {
        movie = ("Mr. Nobody");
        console.log(movie);
        console.log('false');
        //assign movie name to variable for search    
    } else {
        movie = nodeArgs2;
        console.log(movie);
        console.log('true');
    }
}

function spotifier() {
    var song = "";
    console.log('spotifier');
    if (nodeArgs2 === undefined) {
        song = ("The Sign");
        console.log(song);
        console.log('false');
        //assign movie name to variable for search    
    } else {
        song = nodeArgs2;
        console.log(song);
        console.log('true');
    }

}

function randomTxt() {
    console.log('randomTxt');
}
