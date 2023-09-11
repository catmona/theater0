async function submitForm(e) {
    e.preventDefault();
    clearTimeout(timer);
    document.getElementById("search-results").style.display = "none";
    
    const name = document.getElementById("fname").value;
    const video = await fetchImdbId(name)
    
    setVideo(video)
}

function setVideo(video) {
    console.log(video)
    clearTimeout(timer);
    document.getElementById("search-results").style.display = "none";
    
    const season = document.getElementById("fseason").value;
    const episode = document.getElementById("fepisode").value;
    
    const url = generateUrl(video.Type == "series" ? true : false, video.imdbID, season, episode);
    document.getElementById("embedsrc").src = url;
}

async function fetchImdbId(title) {
    const res = await fetch("https://www.omdbapi.com/?t=" + title.replace(/ /g, '+') + "&apikey=edb86f79");
    const movie = await res.json();
    
    return await movie;
}

function generateUrl(isShow, id, season, episode) {
    let query = "https://vidsrc.me/embed/" + id;
    if(isShow) query = "https://vidsrc.me/embed/"+ id + "/" + season + "-" + episode;
    console.log(query);
    return query;
}

function setDetails(dcontainer, movie) {
    console.log(movie);
    
    dcontainer.addEventListener("click", () => { setVideo(movie) })
    
    const title = dcontainer.querySelector(".d-title");
    const poster = dcontainer.querySelector(".d-poster");
    const year = dcontainer.querySelector(".d-year");
    const rating = dcontainer.querySelector(".d-rating");
    const genre = dcontainer.querySelector(".d-genre");
    const runtime = dcontainer.querySelector(".d-runtime");
    
    dcontainer.style.display = "flex";
    title.innerText = movie.Title;
    poster.style.backgroundImage = "url('" + movie.Poster + "')";
   
    if(movie.Year) year.innerText = movie.Year;
    if(movie.imdbRating) rating.innerText = movie.imdbRating + " ★";
    if(movie.Genre) genre.innerText = movie.Genre;
    if(movie.Runtime) runtime.innerText = movie.Runtime;
}

let timer;
function changeQuery() {
    //wait for x milliseconds of inactivity
    clearTimeout(timer);
    timer = setTimeout(search.bind(this), 1000);
}

async function search() {
    const name = document.getElementById("fname").value;
    console.log(name)
    
    const res = await fetch("https://www.omdbapi.com/?s=" + name.replace(/ /g, '+') + "&apikey=edb86f79")
    const results = await res.json();
    console.log(results)
    
    const searchResults = document.getElementById("search-results");
    while (searchResults.children.length > 1) {
        searchResults.removeChild(searchResults.lastChild);
    }
    
    const dcontainers = [searchResults.querySelector(".details-container")]
    let last = dcontainers[0];
    let n = "";
    
    for(let i = 0; i < results.Search.length; i++) {
        searchResults.style.display = "flex";
        last = dcontainers[dcontainers.length - 1];
        
        if(i >= dcontainers.length) { //add new dcontainer
            n = last.cloneNode(true);
            dcontainers.push(n);
            last.insertAdjacentElement('afterend', n);
            last = n;
        }
        setDetails(dcontainers[i], results.Search[i]);
    }
    
}