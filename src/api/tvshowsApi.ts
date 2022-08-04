const API_KEY = "6a775266b4bb807f408dc64151848fcc";
const BASE_PATH = "https://api.themoviedb.org/3";
const LANG = "en-US";
const PAGE = "1";
const REGION = "ca";

interface ITv {
    id: number;
    backdrop_path: string;
    poster_path: string;
    title: string;
    overview: string;
};

export interface IGetTvResult {
    dates: {
        maximum: string;
        minimum: string;
    };
    page: number;
    results: ITv[];
    total_pages: number;
    total_results: number;
}

export function getTV() {
    return fetch(
        `${BASE_PATH}/movie/now_playing?api_key=${API_KEY}&language=${LANG}&page=${PAGE}&region=${REGION}`
    ).then((res) => res.json());
}
