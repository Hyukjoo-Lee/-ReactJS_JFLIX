const API_KEY = "6a775266b4bb807f408dc64151848fcc";
// const API_KEY = process.env.REACT_APP_API_KEY;
const BASE_PATH = "https://api.themoviedb.org/3";
const REGION = "ca";
const LANG = "en-US";
const PAGE = "1";

export interface ITvShows {
  id: number;
  backdrop_path: string;
  poster_path: string;
  overview: string;
  first_air_date: string;
  name?: string;
  vote_average: string;
}

export interface IGetTvShows {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: ITvShows[];
  total_pages: number;
  total_results: number;
}

export interface IGetTvShowsDetail {
  id: number;
  backdrop_path: string;
  first_air_date: string,
  poster_path: string;
  name: string;
  original_name: string;
  overview: string;
  vote_average: number;
    genres: [
      {
        id: number;
        name: string;
      }
    ];
    last_episode_to_air: {
      air_date: string;
      name: string;
      episode_number: number;
    };
    next_episode_to_air: {
      air_date: string;
      name: string;
      episode_number: number;
    };
  }

  
export interface IGetTvShowsVideo {
    id: string,
    results: [
      {
        name: string,
        key: string,
      }
    ]
  }


export async function getTvShows(kind: string) {
    return await (
      await fetch(
        `${BASE_PATH}/tv/${kind}?api_key=${API_KEY}&language=${LANG}&page=${PAGE}&region=${REGION}`
      )
    ).json();
  }

export async function getTvShowsDetail(id: string) {
    return await (
      await fetch(`${BASE_PATH}/tv/${id}?api_key=${API_KEY}&language=${LANG}`)
    ).json();
  }

export async function getTvShowsVideo(id: string) {
    return await (
      await fetch(
        `${BASE_PATH}/tv/${id}/videos?api_key=${API_KEY}&language=${LANG}`
      )
    ).json();
  }

  export async function getTvShowsReview(id: string) {
    return await (
      await fetch(
        `${BASE_PATH}/tv/${id}/reviews?api_key=${API_KEY}&language=${LANG}`
      )
    ).json();
  }
