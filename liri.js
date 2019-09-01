require("dotenv").config();
var keys = require("./keys.js");
// var spotify = new Spotify(keys.spotify);

var command = process.argv[2];
var userSpecfied = process.argv[3];

switch ( command ){
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

}

function spotify() {
    console.log("spotify loading");

}

function movie() {

}

function doThis(){

}

function help() {

}
