import { useEffect, useState } from 'react';
import { Video } from '../globals';

interface props {
    video: Video;
    setVideo: (video: Video) => void;
}

export default function VideoPanel(props: props) {
    const { video, setVideo } = props;
    const [title, setTitle] = useState('');
    const [img, setImg] = useState('');

    useEffect(() => {
        setTitle(video.title);
        setImg(getImg());
    }, []);

    function clickPanel() {
        setVideo(video);
    }

    function getImg(): string {
        let path = 'w154' + video.poster_path;

        if (video.backdrop_path) path = 'w300' + video.backdrop_path;

        return "url('https://image.tmdb.org/t/p/" + path + "')";
    }

    return (
        <div onClick={clickPanel} style={{ backgroundImage: img }} className="flex h-44 w-72 cursor-pointer select-none bg-cover text-center shadow">
            <h2 className="relative text-white shadow font-bold text-lg w-full h-full flex justify-center items-center text-center backdrop-blur-{1px} backdrop-grayscale-{40%} backdrop-brightness-95 hover:backdrop-filter-none hover:backdrop-blur-{1px} hover:text-black">
                {title}
            </h2>
        </div>
    );
}
