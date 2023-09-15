import { useEffect, useState } from 'react';
import { Video } from '../globals';

interface props {
    video: Video;
    setVideo: (video: Video) => void;
}

interface IDetails {
    imdb_id: string;
}

export default function VideoPanel(props: props) {
    const { video, setVideo } = props;
    const [title, setTitle] = useState('');
    const [img, setImg] = useState('');
    const TMDB_KEY = import.meta.env.VITE_TMDB_KEY as string;

    useEffect(() => {
        setTitle(video.title);
        setImg(getImg());
    }, []);

    async function clickPanel() {
        video.imdb_id = await getIMDB();
        setVideo(video);
    }

    async function getIMDB(): Promise<string> {
        let extra = '?language=en-US';
        if (video.type == 'tv') extra = '/external_ids';

        const url = 'https://api.themoviedb.org/3/' + video.type + '/' + video.tmdb_id + extra;
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer ' + TMDB_KEY,
            },
        };

        const res = await fetch(url, options);
        const id = ((await res.json()) as IDetails).imdb_id;

        return id;
    }

    function getImg(): string {
        let path = 'w154' + video.poster_path;

        if (video.backdrop_path) path = 'w300' + video.backdrop_path;

        return "url('https://image.tmdb.org/t/p/" + path + "')";
    }

    return (
        <div
            onClick={void clickPanel}
            style={{ backgroundImage: img }}
            className="flex h-44 w-72 cursor-pointer select-none bg-cover text-center shadow"
        >
            <h2 className="relative text-white shadow font-bold text-lg w-full h-full flex justify-center items-center text-center backdrop-blur-{1px} backdrop-grayscale-{40%} backdrop-brightness-95 hover:backdrop-filter-none hover:backdrop-blur-{1px} hover:text-black">
                {title}
            </h2>
        </div>
    );
}
