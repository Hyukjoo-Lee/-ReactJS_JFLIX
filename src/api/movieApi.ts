const API_KEY = "6a775266b4bb807f408dc64151848fcc";
// const API_KEY = process.env.REACT_APP_API_KEY;
const BASE_PATH = "https://api.themoviedb.org/3";
const REGION = "ca";
const LANG = "en-US";
const PAGE = "1";

export interface IMovie {
  id: number;
  backdrop_path: string;
  overview: string;
  release_date: string;
  poster_path: string;
  original_title: string;
  title?: string;
  vote_average: string;
}

export interface IGetMovies {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

export interface IGetMovieDetail {
    id: number;
    backdrop_path: string;
    poster_path: string;
    title: string;
    original_title: string;
    overview: string;
    vote_average: number;
    release_date: string;
    
    genres: [
      {
        id: number;
        name: string;
      }
    ];
    tagline: string;
  }

  
export interface IGetMovieVideo {
    id: string,
    results: [
      {
        name: string,
        key: string,
        official: true,
      }
    ]
  }

export async function getMovies(kind: string) {
    return await (
      await fetch(
        `${BASE_PATH}/movie/${kind}?api_key=${API_KEY}&language=${LANG}&page=${PAGE}&region=${REGION}`
      )
    ).json();
  }

export async function getMovieDetail(id: string) {
    return await (
      await fetch(`${BASE_PATH}/movie/${id}?api_key=${API_KEY}&language=${LANG}`)
    ).json();
  }

export async function getMovieVideo(id: string) {
    return await (
      await fetch(
        `${BASE_PATH}/movie/${id}/videos?api_key=${API_KEY}&language=${LANG}`
      )
    ).json();
  }