import { useEffect, useState } from 'react';
import { Video } from '../globals';
import VideoPanel from './VideoPanel';

interface props {
    heading: string;
    videos: Video[];
    setVideo: (video: Video) => void;
}

export function VideoTrack(props: props) {
    const { heading, videos, setVideo } = props;
    const [panels, setPanels] = useState<JSX.Element[]>([]);

    useEffect(() => {
        let elements: JSX.Element[] = [];

        videos.map((video, i) => {
            elements = [...elements, <VideoPanel video={video} setVideo={setVideo} key={video.type + '-' + i} />];
        });

        setPanels(elements);
    }, [videos]);

    return (
        <div className="mx-[10%]">
            <h3 className="text-inactive">{heading}</h3>
            <div className="mb-5 mt-2 flex w-full flex-row justify-start gap-2 overflow-auto pb-4">{panels}</div>
        </div>
    );
}
