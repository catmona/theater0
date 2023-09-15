import { useState } from 'react';
import SearchBar from './components/SearchBar';
import { Video } from './globals';
import SearchResults from './components/SearchResults';
import VideoPlayer from './components/VideoPlayer';

function App() {
    console.log('starting the theater...');
    const [movieResults, setMovieResults] = useState<Video[]>();
    const [TVResults, setTVResults] = useState<Video[]>();
    const [selectedVideo, setVideo] = useState<Video>();

    return (
        <>
            <h1>Theater 0</h1>
            <SearchBar setTVResults={setTVResults} setMovieResults={setMovieResults} />
            <SearchResults movieResults={movieResults} TVResults={TVResults} setVideo={setVideo} />
            <VideoPlayer video={selectedVideo} />
        </>
    );
}

export default App;
