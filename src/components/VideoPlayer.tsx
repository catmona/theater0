import { useEffect, useState } from 'react';
import { Video } from '../globals';

interface props {
    video: Video | undefined;
    hide: boolean;
}

export default function VideoPlayer(props: props) {
    const { video, hide } = props;
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
        //console.log(query);
        //TODO check for valid response, change to api?
        return query;
    }

    return hide && url ? null : (
        <div className="mx-auto my-[5%] w-[80%] grow bg-transparent">
            {url ? (
                <iframe className="relative left-0 top-0 h-full w-full bg-transparent" height="2" width="2" allowFullScreen={true} src={url} />
            ) : null}
        </div>
    );
}
