import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useMatch, useNavigate } from "react-router-dom";
import { IGetTvShows } from "../../api/tvShowsApi";
import { makeImagePath } from "../../utils";
import TvDetail from "./TvDetail";

import {
  Box,
  boxVariants,
  Info,
  infoVariants,
  NextIcon,
  PrevIcon,
  Row,
  RowVariants,
  Slider,
  SliderTitle,
} from "../Movie/MovieSlider";

interface IProps {
  kind: string;
  data?: IGetTvShows;
}

function TvSlider({ kind, data }: IProps) {
  const navigate = useNavigate();

  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);

  const toggleLeave = () => setLeaving((prev) => !prev);

  // To set direction of animation.
  const [isNext, setIsNext] = useState(true);

  const offset = 6;

  // To move next slide
  const increaseIndex = () => {
    if (data) {
      if (leaving) return;
      else {
        const totalTvShows = data?.results.length - 1;
        const maxIndex = Math.floor(totalTvShows / offset) - 1;

        toggleLeave();

        setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
        setIsNext(() => true);
      }
    }
  };

  // To move previous slide
  const decreaseIndex = () => {
    if (data) {
      if (leaving) return;
      else {
        const totalTvShows = data?.results.length - 1;
        const maxIndex = Math.floor(totalTvShows / offset) - 1;

        toggleLeave();

        setIndex((prev) => (prev === 0 ? maxIndex - 1 : prev - 1));
        setIsNext(() => false);
      }
    }
  };

  const [title, setTitle] = useState("");

  useEffect(() => {
    switch (kind) {
      case "onAir":
        setTitle("On The Air");
        break;
      case "popular":
        setTitle("Popular TV Shows");
        break;
      case "topRated":
        setTitle("Top Rated TV Shows");
        break;
    }
  });

  const toggleLeaving = () => {
    setLeaving((prev) => !prev);
  };

  const onMouseClicked = (tvShowId: number) => {
    navigate(`/tv/${tvShowId}`);
  };

  const bigTvMatch = useMatch(`/tv/:tvShowId`);

  const prevBtn = require(`../../assets/images/prevBtn.png`);
  const nextBtn = require(`../../assets/images/nextBtn.png`);

  return (
    <>
      {/* Slider */}
      <Slider>
        <SliderTitle>{title}</SliderTitle>
        <AnimatePresence
          initial={false}
          onExitComplete={toggleLeaving}
          custom={isNext}
        >
          <Row
            position="absolute"
            variants={RowVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ types: "tween", duration: 1 }}
            key={index}
            custom={isNext}
          >
            {data?.results
              .slice(1)
              .slice(offset * index, offset * index + offset)
              .map((tvShow) => (
                <Box
                  key={tvShow.id}
                  whileHover="hover"
                  initial="normal"
                  variants={boxVariants}
                  transition={{ type: "tween" }}
                  onClick={() => onMouseClicked(tvShow.id)}
                  bgphoto={makeImagePath(tvShow?.poster_path || "")}
                >
                  <Info variants={infoVariants}>
                    <h4>{tvShow.name}</h4>
                  </Info>
                </Box>
              ))}
          </Row>
        </AnimatePresence>
        <PrevIcon src={prevBtn} whileHover="hover" onClick={decreaseIndex} />
        <NextIcon src={nextBtn} whileHover="hover" onClick={increaseIndex} />
      </Slider>

      {/* Modal */}
      <AnimatePresence>
        {bigTvMatch ? (
          <TvDetail id={bigTvMatch.params.tvShowId!} kind={kind} />
        ) : null}
      </AnimatePresence>
    </>
  );
}

export default TvSlider;
