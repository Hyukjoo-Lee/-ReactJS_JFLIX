import styled from "styled-components";
import { IGetMovies } from "../../api/movieApi";
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
  gap: 10px;
  grid-template-rows: repeat(6, 1fr);
  grid-template-columns: repeat(6, 1fr);
`;

interface SProps {
  data?: IGetMovies;
}

function SearchSlider({ data }: SProps) {
  return (
    <>
      <ResultContents>
        <Row>
          {data?.results.map((movie) => (
            <Box
              key={movie.id}
              whileHover="hover"
              initial="normal"
              variants={boxVariants}
              transition={{ type: "tween" }}
              bgphoto={makeImagePath(movie?.poster_path || "")}
            >
              <Info variants={infoVariants}>
                <h4>{movie.title}</h4>
              </Info>
            </Box>
          ))}
        </Row>
      </ResultContents>
    </>
  );
}

export default SearchSlider;
