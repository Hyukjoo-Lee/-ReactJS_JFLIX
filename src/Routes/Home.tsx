import { useQuery } from "react-query";
import styled from "styled-components";
import { getMovies, IGetMoviesResult } from "../api/movieApi";
import { makeImagePath } from "../utils";
import { useState } from "react";
import MovieSlider from "../Components/MovieSlider";

const Wrapper = styled.div`
  background: black;
`;
const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Banner = styled.div<{ bgPhoto: string }>`
  height: 70vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(
      rgba(255, 255, 255, 0.3),
      rgba(0, 0, 0, 0.5),
      rgba(0, 0, 0, 1)
    ),
    url(${(props) => props.bgPhoto});
  background-size: cover;
  background-repeat: no-repeat;
`;

const Title = styled.h2`
  display: flex;
  align-items: center;
  width: 80%;
  font-family: "Roboto";
  font-weight: 800;
  font-size: 64px;
  margin-bottom: 20px;
  color: cyan;
  text-shadow: 2px 2px 2px black;
`;

const Overview = styled.p`
  width: 48%;
  font-size: 20px;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.3;
`;

function Home() {
  const { data, isLoading } = useQuery<IGetMoviesResult>(
    ["movies", "now_playing"],
    getMovies
  );
  const [leaving, setLeaving] = useState(false);
  const [index, setIndex] = useState(0);

  const offset = 6;

  const increaseIndex = () => {
    if (data) {
      if (leaving) return;
      setLeaving(true);
      const totalMovies = data?.results.length - 1;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };

  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner
            onClick={increaseIndex}
            bgPhoto={makeImagePath(data?.results[0].backdrop_path || "")}
          >
            <Title>{data?.results[0].title}</Title>
            <Overview>{data?.results[0].overview}</Overview>
          </Banner>

          {/* Slider */}
          <MovieSlider />
          <MovieSlider />
          <MovieSlider />

        </>
      )}
    </Wrapper>
  );
}

export default Home;
