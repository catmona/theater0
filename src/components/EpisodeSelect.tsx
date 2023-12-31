import { useEffect, useState } from 'react';
import { Video } from '../globals';
import Dropdown from './Dropdown';

interface props {
    video: Video;
    setVideo: (video: Video) => void;
    hide: boolean;
}

interface Season {
    name: string;
    episode_count: number;
    season_number: number;
}

interface ShowDetails {
    seasons: Season[];
}

export default function EpisodeSelect(props: props) {
    const { video, setVideo, hide } = props;
    const TMDB_KEY = import.meta.env.VITE_TMDB_KEY as string;
    const [seasons, setSeasons] = useState<Season[]>([]);
    const [selectedSeason, setSelectedSeason] = useState(0);
    const [selectedEpisode, setSelectedEpisode] = useState(0);
    const [episodeList, setEpisodeList] = useState<number[]>([]);
    const [oldTitle, setOldTitle] = useState('');

    useEffect(() => {
        if (video.title != oldTitle) {
            setSelectedEpisode(0);
            setSelectedSeason(0);
            setOldTitle(video.title);
        }

        const grabSeasons = async () => {
            const s = await getSeasons();
            setSeasons(s);
        };

        void grabSeasons();
    }, [video]);

    useEffect(() => {
        console.log(seasons);
    }, [seasons]);

    async function getSeasons(): Promise<Season[]> {
        const url = 'https://api.themoviedb.org/3/tv/' + video.tmdb_id;
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer ' + TMDB_KEY,
            },
        };

        const res = await fetch(url, options);
        const details = (await res.json()) as ShowDetails;

        if (details.seasons) {
            const s = details.seasons;
            if (s.length > 0) {
                while (s[0].season_number != 1) s.shift();
            }
            console.log(s);
            return s;
        }
        return [];
    }

    useEffect(() => {
        if (!seasons || selectedSeason > seasons.length - 1) return;
        const totalEpisodes = seasons[selectedSeason].episode_count;
        let eps: number[] = [];
        for (let i = 1; i <= totalEpisodes + 1; i++) {
            eps = [...eps, i];
        }

        setEpisodeList(eps);
    }, [selectedSeason, seasons]);

    useEffect(() => {
        if (video.season == selectedSeason + 1 && video.episode == selectedEpisode + 1) return;

        const newvid = {
            tmdb_id: video.tmdb_id,
            imdb_id: video.imdb_id,
            title: video.title,
            poster_path: video.poster_path,
            backdrop_path: video.backdrop_path,
            type: video.type,
            season: selectedSeason + 1,
            episode: selectedEpisode + 1,
        };

        console.log('selected episode ' + selectedEpisode);
        setVideo(newvid);
    }, [selectedEpisode]);

    return hide ? null : (
        <div className="flex flex-row justify-center gap-4">
            <Dropdown prefix="" val={selectedSeason} setVal={setSelectedSeason} options={seasons.map((season) => season.name)} />
            <Dropdown prefix="Episode " val={selectedEpisode} setVal={setSelectedEpisode} options={episodeList} />
        </div>
    );
}
