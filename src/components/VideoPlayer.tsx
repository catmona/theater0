import { useEffect, useState } from 'react';
import { Video } from '../globals';

interface props {
    video: Video | undefined;
}

export default function VideoPlayer(props: props) {
    const { video } = props;
    const [url, setUrl] = useState('');

    useEffect(() => {
        if (!video) return;

        let attempt = tryVidsrc();
        if (attempt) setUrl(attempt);

        attempt = '';
        //TODO other sources here
    }, [video]);

    function tryVidsrc(): string {
        if (!video) return '';

        let query = 'https://vidsrc.me/embed/' + video.imdb_id;
        if (video.type == 'tv') query = 'https://vidsrc.me/embed/' + video.imdb_id + '/' + 1 + '-' + 1;
        //TODO season-episode
        console.log(query);
        return query;
    }

    return (
        <div className="mx-auto mt-5 w-[80%] grow">
            {url ? <iframe className="relative left-0 top-0 h-80 w-full" height="2" width="2" allowFullScreen={true} src={url} /> : null}
        </div>
    );
}
