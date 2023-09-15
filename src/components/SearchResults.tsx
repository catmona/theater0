import { Video } from '../globals';
import { VideoTrack } from './VideoTrack';

interface props {
    movieResults: Video[] | undefined;
    TVResults: Video[] | undefined;
    setVideo: (video: Video) => void;
}
export default function SearchResults(props: props) {
    const { movieResults, TVResults, setVideo } = props;

    return (
        <div className="flex flex-col">
            {movieResults ? <VideoTrack heading="Movies" videos={movieResults} setVideo={setVideo} /> : null}
            {TVResults ? <VideoTrack heading="TV Shows" videos={TVResults} setVideo={setVideo} /> : null}
        </div>
    );
}
