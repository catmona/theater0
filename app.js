async function submitForm(e) {
    e.preventDefault();
    const name = document.getElementById("fname").value;
    const isShow = document.getElementById("ftype").checked;
    const season = document.getElementById("fseason").value;
    const episode = document.getElementById("fepisode").value;
    
    const imdbId = await fetchImdbId(name)

    const url = generateUrl(isShow, imdbId, season, episode);
    document.getElementById("embedsrc").src = url;
}

async function fetchImdbId(title) {
    const res = await fetch("http://www.omdbapi.com/?t=" + title.replace(/ /g, '+') + "&apikey=edb86f79");
    const movie = await res.json();
    console.log(movie);
    
    return await movie.imdbID;
}

function generateUrl(isShow, id, season, episode) {
    let query = "https://vidsrc.me/embed/" + id;
    if(isShow) query = "https://vidsrc.me/embed/"+ id + "/" + season + "-" + episode;
    
    return query;
}