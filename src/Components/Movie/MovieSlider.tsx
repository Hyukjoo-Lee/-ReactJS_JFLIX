import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IGetMovies } from "../../api/movieApi";
import useWindowDimensions from "../../useWindowDimensions";
import { makeImagePath } from "../../utils";
import MovieDetail from "./MovieDetail";

const Slider = styled.div`
  position: relative;
  margin: 2vh;
  height: 32vh;
`;

const SliderTitle = styled.h2`
  font-size: 1.4vw;
  gap: 20px;
  margin-bottom: 20px;
`;

const Row = styled(motion.div)`
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(6, 1fr);
  position: absolute;
  width: 100%;
`;

const Box = styled(motion.div)<{ bgphoto: string }>`
  background-color: white;
  height: 200px;
  border-radius: 5%;
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

interface IProps {
  kind: string;
  data?: IGetMovies;
}

function MovieSlider({ kind, data }: IProps) {
  const navigate = useNavigate();

  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);

  const offset = 6;

  // const increaseIndex = () => {
  //   if (data) {
  //     if (leaving) return;
  //     setLeaving(true);
  //     const totalMovies = data?.results.length - 1;
  //     const maxIndex = Math.floor(totalMovies / offset) - 1;
  //     setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
  //   }
  // };

  const [title, setTitle] = useState("");

  useEffect(() => {
    switch (kind) {
      case "now":
        setTitle("Playing Now");
        break;
      case "popular":
        setTitle("Popular Movies");
        break;
      case "top_rated":
        setTitle("Top Rated Movies");
        break;
    }
  });

  const windowWidth = useWindowDimensions();

  const toggleLeaving = () => {
    setLeaving((prev) => !prev);
  };

  const onMouseClicked = (movieId: number) => {
    navigate(`/movies/${movieId}`);
  };

  const bigMovieMatch = useMatch(`/movies/:movieId`);

  return (
    <>
      {/* Slider */}
      <Slider>
        <SliderTitle>{title}</SliderTitle>
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
          <MovieDetail id={bigMovieMatch.params.movieId!} kind={kind} />
        ) : null}
      </AnimatePresence>
    </>
  );
}

export default MovieSlider;
