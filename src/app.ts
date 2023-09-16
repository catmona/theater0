// import dotenv from 'dotenv';
// dotenv.config(); // load env vars from .env

// interface ISearchResults {
//     results: ISearchResult[];
// }

// interface ISearchResult {
//     id: string;
//     name: string;
//     title: string;
//     poster_path: string;
//     backdrop_path: string;
// }

// interface IDetails {
//     imdb_id: string;
// }

// window.onload = function () {
//     (<HTMLFormElement>document.getElementById('media-form')).addEventListener('submit', (e) => {
//         void inputForm(e);
//     });
//     (<HTMLInputElement>document.getElementById('fname')).addEventListener('input', changeQuery);
// };

// async function inputForm(e: SubmitEvent) {
//     e.preventDefault();
//     clearTimeout(timer);
//     await search();
// }

// let timer: NodeJS.Timeout;
// function changeQuery() {
//     //wait for x milliseconds of inactivity
//     clearTimeout(timer);
//     timer = setTimeout(() => {
//         search.bind(window);
//     }, 200);
// }

// async function search() {
//     const query = (<HTMLInputElement>document.getElementById('fname')).value;
//     //console.log(query)

//     await getResults(query, 'movie');
//     await getResults(query, 'tv');
// }

// async function getResults(query: string, type: string) {
//     const results = await queryTMDB(query, type);

//     //remove all but first search result
//     const searchResults = document.getElementById(type + '-results');
//     if (!searchResults) return [];

//     while (searchResults.children.length > 1) {
//         if (searchResults.lastChild) searchResults.removeChild(searchResults.lastChild);
//     }

//     //prepare array of search results
//     const dcontainers = [searchResults.querySelector('.details-container')!];
//     let last = dcontainers[0];
//     let n: Element;

//     //add search results to display
//     for (let i = 0; i < results.length; i++) {
//         searchResults.style.display = 'flex';
//         last = dcontainers[dcontainers.length - 1];

//         if (i >= dcontainers.length && last) {
//             //add new dcontainer
//             n = last.cloneNode(true) as Element;
//             dcontainers.push(n);
//             last.insertAdjacentElement('afterend', n);
//             last = n;
//         }
//         setDetails(dcontainers[i] as HTMLElement, results[i], type);
//     }
// }

// async function queryTMDB(query: string, type: string): Promise<ISearchResult[]> {
//     const url = 'https://api.themoviedb.org/3/search/' + type + '?include_adult=false&language=en-US&page=1' + '&query=' + query.replace(/ /g, '+');
//     const options = {
//         method: 'GET',
//         headers: {
//             accept: 'application/json',
//             Authorization: 'Bearer ' + import.meta.env.VITE_TMDB_KEY,
//         },
//     };

//     const res = await fetch(url, options);
//     const results = (await res.json()) as ISearchResults;
//     console.log(results);
//     showDiscover(true);

//     return results.results;
// }

// function setDetails(dcontainer: HTMLElement, video: ISearchResult, type: string) {
//     //console.log(video);

//     dcontainer.addEventListener('click', () => {
//         void clickPreview(video, type);
//     });

//     const title = dcontainer.querySelector('.d-title') as HTMLElement;
//     const poster = dcontainer;
//     // const year = dcontainer.querySelector(".d-year");
//     // const rating = dcontainer.querySelector(".d-rating");

//     dcontainer.style.display = 'flex';

//     if (type == 'tv') title.innerText = video.name;
//     else title.innerText = video.title;

//     poster.style.backgroundImage = "url('" + getPoster(video) + "')";
// }

// function getPoster(video: ISearchResult) {
//     let path = 'w154' + video.poster_path;

//     if (video.backdrop_path) path = 'w300' + video.backdrop_path;

//     return 'https://image.tmdb.org/t/p/' + path;
// }

// async function clickPreview(preview: ISearchResult, type: string) {
//     showDiscover(false);
//     const imdb_id = await detailsTMDB(preview.id, type);

//     if (type == 'tv') {
//         //have to get season & episode info first
//         showTVInfo(true);
//         // SET SEASON & EPISODE
//         const url = getVideo(imdb_id, type);
//         showVideo(url);
//     } else {
//         //show movie right away
//         const url = getVideo(imdb_id, type);
//         showVideo(url);
//     }
// }

// async function detailsTMDB(tmdb_id: string, type: string): Promise<IDetails> {
//     let extra = '?language=en-US';
//     if (type == 'tv') extra = '/external_ids';
//     const url = 'https://api.themoviedb.org/3/' + type + '/' + tmdb_id + extra;
//     const options = {
//         method: 'GET',
//         headers: {
//             accept: 'application/json',
//             Authorization: 'Bearer ' + import.meta.env.VITE_TMDB_KEY,
//         },
//     };

//     const res = await fetch(url, options);
//     const details = (await res.json()) as IDetails;
//     console.log(details.imdb_id);

//     return details;
// }

// function getVideo(id: string, type: string): string {
//     //try vidsrc
//     const url = url_vidsrc(type == 'tv' ? true : false, id);
//     if (!url) return '';

//     //set video
//     return url;
// }

// function url_vidsrc(isShow: boolean, id: string) {
//     const season = (<HTMLInputElement>document.getElementById('fseason')).value;
//     const episode = (<HTMLInputElement>document.getElementById('fepisode')).value;

//     let query = 'https://vidsrc.me/embed/' + id;
//     if (isShow) query = 'https://vidsrc.me/embed/' + id + '/' + season + '-' + episode;
//     console.log(query);
//     return query;
// }

// function showDiscover(show: boolean) {
//     if (!show) {
//         //hide
//         clearTimeout(timer);
//         document.getElementById('search-results')!.style.display = 'none';
//     } else {
//         //show
//         document.getElementById('search-results')!.style.display = 'flex';
//     }
// }

// function showTVInfo(show: boolean) {
//     if (!show) {
//         //hide
//     } else {
//         //show
//     }
// }

// function showVideo(url: string) {
//     (<HTMLIFrameElement>document.getElementById('embedsrc')).src = url;
// }
