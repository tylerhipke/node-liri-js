require("dotenv").config();
var axios = require('axios');
var moment = require('moment');
var keys = require("./keys.js");
var fs = require('fs');
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

run(command);

function run(command) {
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
        })
        .catch(function (error) {
            console.log(error);
        });
}

function spotifyThis() {
    if (userSpecfied === "") {
        userSpecfied = "The Sign by Ace of Base";
        console.log("#rickrolled...\n")
    }
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
    if (userSpecfied === "") {
        userSpecfied = "Mr Nobody";
        console.log("can't pick?...\n")
    }

    console.log("Loading movie data for '" + userSpecfied + ".'\n");

    var url = "http://www.omdbapi.com/?apikey=trilogy&t=" + userSpecfied;

    axios.get(url)
        .then(function (response) {
            var thisMovie = response.data;
            console.log(thisMovie.Title + "\n" +
                "\nYear: " + thisMovie.Year + "\n" +
                "IMDB: " + thisMovie.Ratings[0].Value + "\n" +
                "RottenTomato: " + thisMovie.Ratings[1].Value + "\n\n" +
                thisMovie.Country + "\n" +
                thisMovie.Language + "\n" +
                "\nCast: " + thisMovie.Actors + "\n" +
                "\nPlot: " + thisMovie.Plot);
        })

        .catch(function (error) {
            console.log(error);
        });
}

function doThis() {
    fs.readFile("random.txt", "utf8", function (error, data) {

        if (error) {
            return console.log(error);
        }

        var cli = data.replace(/,/g, ' ');
        cli = cli.replace(/"/g, ' ');
        console.log("Parsing from random.txt: " + cli + "\n\n");

        var dataArr = data.split(",");

        command = dataArr[0];
        userSpecfied = dataArr[1];
        run(command);

    });
}

function help() {
    console.log(
        "concert-this:  check available concerts\n" +
        "spotify-this-song:  check info about a single song\n" +
        "movie-this:  search IMDB info on a single movie\n" +
        "do-what-it-says:  parse info from random.txt as a cli command"
    )
}