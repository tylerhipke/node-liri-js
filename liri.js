require("dotenv").config();
var axios = require('axios');
var keys = require("./keys.js");
// var spotify = new Spotify(keys.spotify);

var command = process.argv[2];
var userSpecfied = "";

var cliAmount = parseInt(process.argv.length);

for (var i = 3; i < cliAmount; i++) {
    userSpecfied += process.argv[i] + " ";
}
userSpecfied = userSpecfied.slice(0, -1);

switch (command) {
    case "concert-this":
        concert();
        break;
    case "spotify-this-song":
        spotify();
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
    console.log("Loading concert data for '" + userSpecfied + ".'");

    var url = "https://rest.bandsintown.com/artists/" + userSpecfied + "/events?app_id=codingbootcamp";
    axios.get(url)
        .then(function (response) {
            var thisKey = response.data;
            for (var i = 0; i < thisKey.length; i++) {
                console.log("Venue " + (i + 1) + ":\n" +
                    thisKey[i].venue.name + " in " + thisKey[i].venue.city + ", " + 
                    thisKey[i].venue.region + "\n");

            }
        });

}

function spotify() {
    console.log("spotify loading");

}

function movie() {

}

function doThis() {

}

function help() {

}