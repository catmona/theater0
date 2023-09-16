import { Video } from '../globals';
import { VideoTrack } from './VideoTrack';

interface props {
    movieResults: Video[] | undefined;
    TVResults: Video[] | undefined;
    setVideo: (video: Video) => void;
}
export default function SearchResults(props: props) {
    const { movieResults, TVResults, setVideo } = props;

    //console.log(movieResults == undefined);

    return (
        <div className="flex flex-col">
            {movieResults && movieResults.length > 0 ? <VideoTrack heading="Movies" videos={movieResults} setVideo={setVideo} /> : null}
            {TVResults && TVResults.length > 0 ? <VideoTrack heading="TV Shows" videos={TVResults} setVideo={setVideo} /> : null}
        </div>
    );
}
