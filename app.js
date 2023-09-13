import dotenv from 'dotenv';

dotenv.config();
const TMDB_KEY = process.env.TMDB_KEY;

window.onload = function() {
    document.getElementById("fname").addEventListener("input", changeQuery);
}

function url_vidsrc(isShow, id) {
    let query = "https://vidsrc.me/embed/" + id;
    if(isShow) query = "https://vidsrc.me/embed/"+ id + "/" + season + "-" + episode;
    console.log(query);
    return query;
}

function getPoster(path) {
    return "https://image.tmdb.org/t/p/w500" + path;
}

function setDetails(dcontainer, movie, type) {
    console.log(movie);
    
    dcontainer.addEventListener("click", () => { clickPreview(movie, type) })
    
    const title = dcontainer.querySelector(".d-title");
    const poster = dcontainer.querySelector(".d-poster");
    const year = dcontainer.querySelector(".d-year");
    const rating = dcontainer.querySelector(".d-rating");
    
    dcontainer.style.display = "flex";
    title.innerText = movie.title;
    poster.style.backgroundImage = "url('" + getPoster(movie.poster_path) + "')";
   
    if(movie.Year) year.innerText = movie.release_date;
    if(movie.imdbRating) rating.innerText = movie.vote_average + " ★";
}

let timer;
function changeQuery() {
    //wait for x milliseconds of inactivity
    clearTimeout(timer);
    timer = setTimeout(search.bind(this), 200);
}

async function search() {
    const query = document.getElementById("fname").value;
    console.log(query)
    
    getResults(query, "movie");
    //getResults(query, "TV");
}

async function getResults(query, type) {
    let results = await queryTMDB(query, type);
    
    //remove all but first search result
    const searchResults = document.getElementById(type + "-results");
    while (searchResults.children.length > 1) {
        searchResults.removeChild(searchResults.lastChild);
    }
    
    //prepare array of search results
    const dcontainers = [searchResults.querySelector(".details-container")]
    let last = dcontainers[0];
    let n = "";
    
    //add search results to display
    for(let i = 0; i < results.length; i++) {
        searchResults.style.display = "flex";
        last = dcontainers[dcontainers.length - 1];
        
        if(i >= dcontainers.length) { //add new dcontainer
            n = last.cloneNode(true);
            dcontainers.push(n);
            last.insertAdjacentElement('afterend', n);
            last = n;
        }
        setDetails(dcontainers[i], results[i], type);
    }
}

async function queryTMDB(query, type) {
    const url = 'https://api.themoviedb.org/3/search/' + type + '?include_adult=false&language=en-US&page=1'  + "&query=" + query.replace(/ /g, '+');
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer ' + TMDB_KEY
        }
      };
      
      const res = await fetch(url, options);
      const results = await res.json();
      console.log(results);
      showDiscover(true);
      
      return results.results;
}

async function detailsTMDB(id, type) {
    const url = 'https://api.themoviedb.org/3/' + type + '/' + id + '?language=en-US';
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer ' + TMDB_KEY
        }
      };
      
      const res = await fetch(url, options);
      const details = await res.json();
      console.log(details);
      
      return details;
}

let selectedSeason = 1;
let selectedEpisode = 1;

async function clickPreview(preview, type) {
    showDiscover(false);
    const details = await detailsTMDB(preview.id, type);
    
    if(type == "TV") {
        //have to get season & episode info first
        showTVInfo(true);
        // SET SEASON & EPISODE
    }
    else {
        //show movie right away
        const url = await getVideo(details.imdb_id, type);
        showVideo(url);
    }
}

function getVideo(id, type) {    
    //try vidsrc
    let url = url_vidsrc(type == "TV" ? true : false, id);
    if(!url) return null;
    
    
    //set video
    return url;
}

function showVideo(url) {
    document.getElementById("embedsrc").src = url;
}


function showDiscover(show) {
    if(!show) { //hide
        clearTimeout(timer);
        document.getElementById("movie-results").style.display = "none";
    }
    else { //show
        document.getElementById("movie-results").style.display = "flex";
    }
}

function showTVInfo(show) {
    if(!show) { //hide
        
    }
    else { //show
        
    }
}


