var Twitter = require('twitter');
var Spotify = require('spotify');
var request = require('request');
var keys = require('./keys');
var nodeArgs1 = process.argv[2];
var nodeArgs2 = process.argv[3];


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
        break;
    default:
        tweeter();

}

function tweeter() {
    var client = new Twitter({
        consumer_key: keys.twitterKeys.consumer_key,
        consumer_secret: keys.twitterKeys.consumer_secret,
        access_token_key: keys.twitterKeys.access_token_key,
        access_token_secret: keys.twitterKeys.access_token_secret
    });
    /**
     * Grab a list of favorited tweets
     **/
    var params = ({
        screen_name: 'POTUS',
        count: '20'
    });

    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            for (var i = 0; i < tweets.length; i++) {
                console.log('%j \n', tweets[i].text, tweets[i].created_at);
            }
        }
    });
}

function moviegoer() {
    console.log('moviegoer');
}

function spotifier() {
    console.log('spotifier');
}
