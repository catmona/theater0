import { useState } from 'react';
import SearchBar from './components/SearchBar';
import { Video } from './globals';
import SearchResults from './components/SearchResults';
import VideoPlayer from './components/VideoPlayer';

function App() {
    const [movieResults, setMovieResults] = useState<Video[]>();
    const [TVResults, setTVResults] = useState<Video[]>();
    const [selectedVideo, setVideo] = useState<Video>();

    function setVideoClear(video: Video) {
        setMovieResults([]);
        setTVResults([]);
        setVideo(video);
    }

    return (
        <>
            <div className="flex flex-col h-screen w-screen">
                <h1>Theater 0</h1>
                <SearchBar setTVResults={setTVResults} setMovieResults={setMovieResults} />
                <SearchResults
                    movieResults={movieResults}
                    TVResults={TVResults}
                    setVideo={(video) => {
                        setVideoClear(video);
                    }}
                />
                <VideoPlayer video={selectedVideo} hide={movieResults && TVResults && [...movieResults, ...TVResults].length > 0 ? true : false} />
            </div>
        </>
    );
}

export default App;
