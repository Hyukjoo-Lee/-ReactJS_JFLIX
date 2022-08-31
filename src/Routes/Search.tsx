import { useLocation } from "react-router";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { getSearch, IGetMovies } from "../api/movieApi";
import { Banner, Loader, Wrapper } from "./MovieHome";
import styled from "styled-components";
import SearchSlider from "../Components/Search/SearchSlider";

const SearchContainer = styled.div`
  width: 100%;
  padding: 20px;
  margin: 1.8vw;
  display: inline-block;
  font-size: 1.2vw;
  min-height: 8px;
`;

const RecommendContainer = styled.div`
  display: flex;
  margin-top: 3vh;
`;

const RecommendLabel = styled.span`
  color: grey;
  flex: 0 auto;
  white-space: nowrap;
`;

const RecommendList = styled.ul`
  list-style-type: "\1F44D"; // thumbs up sign
  color: white;
`;

const RecommendContents = styled.li`
  padding-left: 1vw;
  padding-right: 1vw;
  float: left;
  border-right: 1px solid grey;
  :hover {
    color: #e7654e;
    cursor: pointer;
  }
`;

export const ResultHeader = styled.div`
  padding-top: 40px;
  padding-bottom: 40px;
  font-size: 1.4vw;
`;

function Search() {
  const navigate = useNavigate();
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get("keyword");

  const { data: searchMovie, isLoading: searchMovieLoading } =
    useQuery<IGetMovies>(["search", "movies", keyword], () =>
      getSearch("movie", keyword)
    );

  const { data: searchTvShow, isLoading: searchTvShowLoading } =
    useQuery<IGetMovies>(["search", "tv", keyword], () =>
      getSearch("tv", keyword)
    );

  /* maximum 10 related contents */
  const isOverTenResult = (totalresult: number) => {
    if (totalresult > 10) {
      return true;
    } else {
      return false;
    }
  };
  const onMovieClick = (movieId: number) => {
    navigate(`/movies/${movieId}`);
  };

  const onTvshowClick = (tvshowId: number) => {
    navigate(`/tv/${tvshowId}`);
  };
  return (
    <Wrapper>
      {searchMovieLoading && searchTvShowLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner bgPhoto={""} height="1vh"></Banner>
          {/* MOVIES */}
          <SearchContainer>
            <RecommendContainer>
              <RecommendLabel> Movies Related To: </RecommendLabel>
              <RecommendList>
                {isOverTenResult(searchMovie?.total_results!)
                  ? searchMovie?.results.slice(10).map((movie) => (
                      <RecommendContents
                        key={movie.id}
                        onClick={() => onMovieClick(movie.id)}
                      >
                        {movie.title}
                      </RecommendContents>
                    ))
                  : searchMovie?.results.map((movie) => (
                      <RecommendContents
                        key={movie.id}
                        onClick={() => onMovieClick(movie.id)}
                      >
                        {movie.title}
                      </RecommendContents>
                    ))}
              </RecommendList>
            </RecommendContainer>

            {/* TV SHOWS */}
            <RecommendContainer>
              <RecommendLabel>TV Shows Related To: </RecommendLabel>
              <RecommendList>
                {isOverTenResult(searchTvShow?.total_results!)
                  ? searchTvShow?.results.slice(10).map((tvshows) => (
                      <RecommendContents
                        key={tvshows.id}
                        onClick={() => onTvshowClick(tvshows.id)}
                      >
                        {tvshows.name}
                      </RecommendContents>
                    ))
                  : searchTvShow?.results.map((tvshows) => (
                      <RecommendContents
                        key={tvshows.id}
                        onClick={() => onTvshowClick(tvshows.id)}
                      >
                        {tvshows.name}
                      </RecommendContents>
                    ))}
              </RecommendList>
            </RecommendContainer>
            <ResultHeader>{keyword} Results </ResultHeader>
            {/* Slider Movies & TV Shows  */}
            <SearchSlider data={searchMovie} data_2={searchTvShow} />
          </SearchContainer>
        </>
      )}
    </Wrapper>
  );
}
export default Search;
