var Twitter = require('twitter');
var Spotify = require('spotify');
var request = require('request');
var keys = require('./keys');

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




// client.get('statuses/usertimeline', function(error, tweets, response) {
//     if (!error) {
//         console.log(tweets);
//     }
// });
