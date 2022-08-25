import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useState } from "react";
import { useQuery } from "react-query";
import { useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getMovies, IGetMoviesResult } from "../../api/movieApi";
import useWindowDimensions from "../../useWindowDimensions";
import { makeImagePath } from "../../utils";

const Slider = styled.div`
  position: relative;
  height: 30vh;
`;

const Row = styled(motion.div)`
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(6, 1fr);
  position: absolute;
  width: 100%;
`;

const Box = styled(motion.div)<{ bgphoto: string }>`
  background-color: white;
  height: 200px;
  background-image: url(${(props) => props.bgphoto});
  background-size: 255px 200px;
  background-position: center center;
  color: red;
  font-size: 30px;
  cursor: pointer;

  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;

const boxVariants = {
  normal: {
    scale: 1,
  },

  hover: {
    scale: 1.2,
    y: -30,
    transition: {
      delay: 0.2,
      type: "tween",
    },
  },
};

const Info = styled(motion.div)`
  padding: 10px;
  background-color: black;
  opacity: 0;
  position: absolute;
  width: 100%;
  bottom: 0;
  h4 {
    text-align: center;
    font-size: 10px;
    color: white;
  }
`;

const infoVariants = {
  hover: {
    opacity: 1,
    zIndex: 100,
    transition: {
      delay: 0.2,
      type: "tween",
    },
  },
};

const ModalOverview = styled.p`
  color: ${(props) => props.theme.white.lighter};
  padding: 10px;
  position: relative;
  top: -50px;
  background-color: transparent;
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;

const ModalContainer = styled(motion.div)`
  position: absolute;
  width: 30vw;
  height: 70vh;
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 20px;
  overflow: hidden;
  background-color: ${(props) => props.theme.black.darker};

  img {
    align-items: center;
  }
`;

const ModalCover = styled.div`
  width: 100%;
  height: 400px;
  background-size: 100% 100%;
  background-position: center center;
`;

const ModalMovieTitle = styled.h3`
  color: ${(props) => props.theme.white.lighter};
  padding: 10px;
  font-size: 35px;
  position: relative;
  top: -50px;
`;

const SmallerTitle = styled.h3`
  color: ${(props) => props.theme.white.lighter};
  padding: 10px;
  font-size: 22px;
  position: relative;
  top: -50px;
`;

function MovieSlider() {
  const navigate = useNavigate();

  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const { data, isLoading } = useQuery<IGetMoviesResult>(
    ["movies", "now_playing"],
    getMovies
  );
  const offset = 6;

  const windowWidth = useWindowDimensions();
  const toggleLeaving = () => {
    setLeaving((prev) => !prev);
  };

  const onMouseClicked = (movieId: number) => {
    navigate(`/movies/${movieId}`);
  };

  const bigMovieMatch = useMatch(`/movies/:movieId`);
  const { scrollY } = useScroll();
  const setScrollY = useTransform(scrollY, (val) => val + 65);
  const onOverlayClicked = () => {
    navigate(-1);
  };

  const clickedMovie =
    bigMovieMatch?.params.movieId &&
    data?.results.find((movie) => movie.id === +bigMovieMatch?.params.movieId!);

  return (
    <>
      {/* Slider */}
      <Slider>
        <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
          <Row
            initial={{ x: windowWidth + 5 }}
            animate={{ x: 0 }}
            exit={{ x: -windowWidth - 5 }}
            transition={{ types: "tween", duration: 1 }}
            key={index}
          >
            {data?.results
              .slice(1)
              .slice(offset * index, offset * index + offset)
              .map((movie) => (
                <Box
                  layoutId={movie.id + ""}
                  key={movie.id}
                  whileHover="hover"
                  initial="normal"
                  variants={boxVariants}
                  transition={{ type: "tween" }}
                  onClick={() => onMouseClicked(movie.id)}
                  bgphoto={makeImagePath(movie?.poster_path || "")}
                >
                  <Info variants={infoVariants}>
                    <h4>{movie.title}</h4>
                  </Info>
                </Box>
              ))}
          </Row>
        </AnimatePresence>
      </Slider>

      {/* Modal */}
      <AnimatePresence>
        {bigMovieMatch ? (
          <>
            <Overlay
              onClick={onOverlayClicked}
              exit={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            />
            {/* Modal */}
            <ModalContainer
              style={{ top: setScrollY }}
              layoutId={bigMovieMatch.params.movieId}
            >
              {clickedMovie && (
                <>
                  <ModalCover
                    style={{
                      backgroundImage: `linear-gradient(to top, black, transparent), url( ${makeImagePath(
                        clickedMovie?.poster_path,
                        "w400" || ""
                      )})`,
                    }}
                  />
                  {clickedMovie.title.length < 22 ? (
                    <ModalMovieTitle>{clickedMovie.title}</ModalMovieTitle>
                  ) : (
                    <SmallerTitle>{clickedMovie.title}</SmallerTitle>
                  )}
                  <ModalOverview>{clickedMovie.overview}</ModalOverview>
                </>
              )}
            </ModalContainer>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}

export default MovieSlider;
