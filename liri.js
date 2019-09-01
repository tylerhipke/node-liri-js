require("dotenv").config();
var axios = require('axios');
var moment = require('moment');
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

var command = process.argv[2];
var userSpecfied = "";

//link together specified commands
var cliAmount = parseInt(process.argv.length);
for (var i = 3; i < cliAmount; i++) {
    userSpecfied += process.argv[i] + " ";
}
userSpecfied = userSpecfied.slice(0, -1);

//define user specified commands
switch (command) {
    case "concert-this":
        concert();
        break;
    case "spotify-this-song":
        spotifyThis();
        break;
    case "movie-this":
        movie();
        break;
    case "do-what-it-says":
        doThis();
        break;
    case "help":
        help();
        break;
    default:
        console.log("Please type a valid command.  Type help for information.");
}

function concert() {
    console.log("Loading concert data for '" + userSpecfied + ".'\n");

    var url = "https://rest.bandsintown.com/artists/" + userSpecfied + "/events?app_id=codingbootcamp";

    axios.get(url)
        .then(function (response) {
            var thisKey = response.data;
            for (var i = 0; i < thisKey.length; i++) {
                var time = moment(thisKey[i].datetime);
                console.log("Concert " + (i + 1) + ":\n" +
                    thisKey[i].venue.name + " in " + thisKey[i].venue.city + ", " +
                    thisKey[i].venue.region + "\n" +
                    time.format("MMM Do YY") + "\n");
            }
        });
}

function spotifyThis() {
    console.log("Loading song data for '" + userSpecfied + "'\n");

    spotify
        .search({
            type: 'track',
            query: userSpecfied,
            limit: 1
        })
        .then(function (response) {
            var thisSong = response.tracks.items[0];
            console.log(thisSong.name + " by " + thisSong.artists[0].name + 
            " from their album " + thisSong.album.name + "\n" +
            "\nLink: " + thisSong.preview_url);
        })
        .catch(function (err) {
            console.log(err);
        });

}

function movie() {

}

function doThis() {

}

function help() {

}