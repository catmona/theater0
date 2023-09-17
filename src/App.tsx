import { useEffect, useState } from 'react';
import SearchBar from './components/SearchBar';
import { Video } from './globals';
import SearchResults from './components/SearchResults';
import VideoPlayer from './components/VideoPlayer';
import EpisodeSelect from './components/EpisodeSelect';

function App() {
    const [movieResults, setMovieResults] = useState<Video[]>();
    const [TVResults, setTVResults] = useState<Video[]>();
    const [selectedVideo, setVideo] = useState<Video>();
    const [hideVideo, setHideVideo] = useState(true);

    function setVideoClear(video: Video) {
        setMovieResults([]);
        setTVResults([]);
        setVideo(video);
    }

    useEffect(() => {
        if (movieResults && TVResults && [...movieResults, ...TVResults].length > 0) setHideVideo(true);
        else if (!selectedVideo) setHideVideo(true);
        else setHideVideo(false);
    }, [movieResults, TVResults, selectedVideo]);

    useEffect(() => {
        console.log(selectedVideo);
    }, [selectedVideo]);

    return (
        <>
            <div className="flex h-screen w-screen flex-col">
                <h1 className="text-center text-lg m-4 font-bold text-inactive">Theater 0</h1>
                <SearchBar setTVResults={setTVResults} setMovieResults={setMovieResults} />
                <SearchResults
                    movieResults={movieResults}
                    TVResults={TVResults}
                    setVideo={(video) => {
                        setVideoClear(video);
                    }}
                />
                {selectedVideo ? <EpisodeSelect video={selectedVideo} setVideo={setVideo} hide={hideVideo || selectedVideo.type != 'tv'} /> : null}
                <VideoPlayer video={selectedVideo} hide={hideVideo} />
            </div>
        </>
    );
}

export default App;
