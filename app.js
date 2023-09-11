async function submitForm(e) {
    e.preventDefault();
    let isShow = false;
    const name = document.getElementById("fname").value;
    const season = document.getElementById("fseason").value;
    const episode = document.getElementById("fepisode").value;
    
    const movie = await fetchImdbId(name)
    if(movie.Type == "series") isShow = true;
    setDetails(movie, isShow);
    
    const url = generateUrl(isShow, movie.imdbID, season, episode);
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

function setDetails(movie, isShow) {
    console.log(movie);
    document.getElementById("details-container").style.display = "flex";
    document.getElementById("d-title").innerText = movie.Title;
    document.getElementById("d-poster").src = movie.Poster;
    document.getElementById("d-year").innerText = movie.Year;
    document.getElementById("d-rating").innerText = "Rated " + movie.imdbRating;
    document.getElementById("d-genre").innerText = movie.Genre;
    document.getElementById("d-runtime").innerText = movie.Runtime;
    
    if(isShow) {
        document.getElementById("d-seasons").innerText = movie.totalSeasons + " seasons";
    }
}