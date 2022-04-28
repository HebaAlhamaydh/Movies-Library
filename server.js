'use strict'

const express = require('express');
const res = require('express/lib/response');
const cors = require("cors");
const axios = require("axios").default;
const recipesData = require("./Movie Data/data.json");
require('dotenv').config();
const apiKey = process.env.API_KEY;
const app = express();
app.use(cors());
const PORT = 3000;

/////creating a rout /////

app.get("/", handleHomePage);
app.get("/favorite", handleFavorite);
app.get("/trending", handleTrending);
app.get("/search", handleSearch);
app.get("/popular", hundlePopular);
app.get("/nowPlaying", handleNowPlaying);

////////functions//////
function handleFavorite(req, res) {
    res.send("Welcome to Favorite Page");
}

function handleHomePage(req, res) {
    let recip = new Recipe("Spider-Man: No Way Home", "/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg", "Peter Parker is unmasked and no longer able to separate his normal life from the high-stakes of being a super-hero. When he asks for help from Doctor Strange the stakes become even more dangerous, forcing him to discover what it truly means to be Spider-Man.")
    res.send(recip);
}
function handleTrending(req, res) {
    const url = `https://api.themoviedb.org/3/trending/all/week?api_key=${apiKey}&language=en-US?`;
    //axios.get(url).then().catch()
    axios.get(url)
        .then(result => {
            console.log(result);
            console.log(result.data);
            let movies = result.data.results.map(recip => {
                return new Movie(recip.id, recip.title, recip.release_date, recip.poster_path, recip.overview)
            })
            res.json(movies);
        })
        .catch((error) => {
            console.log(error);
            res.send("inside catch");
        })
}
//searching////
function handleSearch(req, res) {
    console.log(req.query);
    let movieName = req.query.movieName;
    let url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${movieName}&page=2`;
    //axios.get(url).then().catch()
    axios.get(url)
        .then(result => {
            console.log(result.data.results);
            res.json(result.data.results);
        })
        .catch((error) => {
            console.log(error);
            res.send("inside catch");
        })
}
function hundlePopular(req, res) {
    let url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`;
    axios.get(url)
        .then(result => {
            res.json(result.data.results);
        })
        .catch((error) => {
            console.log(error);
            res.send("inside catch");
        })
}
function handleNowPlaying(req, res) {
    let url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=1`;
    axios.get(url)
        .then(result => {
            res.json(result.data.results);
        })
        .catch((error) => {
            console.log(error);
            res.send("inside catch");
        })
}

function handleError500(req, res) {
    if (req.staus = 500)
        res.status(500).send({
            "status": 500,
            "responseText": "Sorry, something went wrong"
        });
}
function handleError404(req, res) {
    if (req.staus = 404)
        res.send({
            "status": 404,
            "responseText": "page not found error"
        });
}



//app.method
app.listen(PORT, () => {
    console.log("server is running")
})

function Recipe(title, poster_path, overview) {

    this.title = title;
    this.poster_path = poster_path;
    this.overview = overview;
}
function Movie(id, title, release_date, poster_path, overview) {
    this.id = id;
    this.title = title;
    this.release_date = release_date;
    this.poster_path = poster_path;
    this.overview = overview;
}