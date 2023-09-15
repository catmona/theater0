import { Video } from '../globals';
import VideoPanel from './VideoPanel';

interface props {
    heading: string;
    videos: Video[];
    setVideo: (video: Video) => void;
}

export function VideoTrack(props: props) {
    const { heading, videos, setVideo } = props;

    return (
        <div>
            <h3>{heading}</h3>
            <div className="mb-5 mt-2 flex w-full flex-row justify-start gap-2 overflow-auto pb-4">
                {videos.map((video, i) => (
                    <VideoPanel video={video} setVideo={setVideo} key={i} />
                ))}
            </div>
        </div>
    );
}
