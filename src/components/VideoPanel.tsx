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
            className="flex h-[150px] w-[250px] min-w-[250px] max-w-[250px] cursor-pointer select-none bg-cover text-center shadow"
        >
            <h2 className="relative flex h-full w-full items-center justify-center text-center text-lg font-bold text-white shadow backdrop-blur-[1px] backdrop-brightness-95 backdrop-grayscale-[40%] hover:text-black hover:backdrop-blur-[1px] hover:backdrop-filter-none">
                {title}
            </h2>
        </div>
    );
}
