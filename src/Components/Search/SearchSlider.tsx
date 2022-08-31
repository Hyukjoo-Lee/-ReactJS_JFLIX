import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IGetMovies } from "../../api/movieApi";
import { IGetTvShows } from "../../api/tvShowsApi";
import { makeImagePath } from "../../utils";
import {
  Box,
  boxVariants,
  Info,
  infoVariants,
  Row,
} from "../Movie/MovieSlider";

const ResultContents = styled.div`
  display: grid;
  grid-template-rows: repeat(6, 1fr);
  grid-template-columns: repeat(6, 1fr);
`;

interface SProps {
  data?: IGetMovies;
  data_2?: IGetTvShows;
}

function SearchSlider({ data, data_2 }: SProps) {
  const navigate = useNavigate();

  const onMovieClick = (movieId: number) => {
    navigate(`/movies/${movieId}`);
  };

  const onTvshowClick = (tvshowId: number) => {
    navigate(`/tv/${tvshowId}`);
  };

  return (
    <>
      <ResultContents>
        <Row position="absolute">
          {/* MOVIES */}
          {data?.results.map((movie) => (
            <Box
              key={movie.id}
              whileHover="hover"
              initial="normal"
              variants={boxVariants}
              transition={{ type: "tween" }}
              onClick={() => onMovieClick(movie.id)}
              bgphoto={makeImagePath(movie?.poster_path || "")}
            >
              <Info variants={infoVariants}>
                <h4>{movie.title}</h4>
              </Info>
            </Box>
          ))}
          {/* TV SHOWS */}
          {data_2?.results.map((tvshows) => (
            <Box
              key={tvshows.id}
              whileHover="hover"
              initial="normal"
              variants={boxVariants}
              transition={{ type: "tween" }}
              onClick={() => onTvshowClick(tvshows.id)}
              bgphoto={makeImagePath(
                tvshows?.poster_path || tvshows?.backdrop_path || ""
              )}
            >
              <Info variants={infoVariants}>
                <h4>{tvshows.name}</h4>
              </Info>
            </Box>
          ))}
        </Row>
      </ResultContents>
      <ResultContents>
        <Row position="absolute"></Row>
      </ResultContents>
    </>
  );
}

export default SearchSlider;
