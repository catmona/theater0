import { Video } from '../globals';
import { VideoTrack } from './VideoTrack';

interface props {
    movieResults: Video[];
    TVResults: Video[];
    setVideo: (video: Video) => void;
}
export default function SearchResults(props: props) {
    const { movieResults, TVResults, setVideo } = props;

    return (
        <div className="flex flex-col">
            <VideoTrack heading="Movies" videos={movieResults} setVideo={setVideo} />
            <VideoTrack heading="TV Shows" videos={TVResults} setVideo={setVideo} />
        </div>
    );
}
