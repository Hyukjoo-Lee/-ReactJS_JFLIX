import { useLocation } from "react-router";
import { useQuery } from "react-query";
import { getSearch, IGetMovies } from "../api/movieApi";
import { IGetTvShows } from "../api/tvShowsApi";
import { Loader } from "./MovieHome";

function Search() {
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get("keyword");

  const { data: searchMovie, isLoading: searchMovieLoading } =
    useQuery<IGetMovies>(["search", "movies", keyword], () =>
      getSearch("movie", keyword)
    );

  const { data: searchTvShow, isLoading: searchTvShowLoading } =
    useQuery<IGetTvShows>(["search", "tv", keyword], () =>
      getSearch("tv", keyword)
    );

  return (
    <>
      {searchMovieLoading && searchTvShowLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <h1>
            the first movie title is: {searchMovie?.results[0].original_title}{" "}
          </h1>
          <h1> the first tv show name is: {searchTvShow?.results[0].name} </h1>
        </>
      )}
    </>
  );
}
export default Search;
