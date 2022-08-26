import { useQuery } from "react-query";
import styled from "styled-components";
import { getMovies, IGetMovies } from "../api/movieApi";
import { makeImagePath } from "../utils";
import MovieSlider from "../Components/Movie/MovieSlider";

export const Wrapper = styled.div`
  background: black;
`;

export const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Banner = styled.div<{ bgPhoto: string }>`
  display: flex;
  height: 70vh;
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

export const Title = styled.h2`
  display: flex;
  align-items: center;
  width: 80%;
  font-family: "Roboto";
  font-weight: 800;
  font-size: 64px;
  margin-bottom: 20px;
  color: whitesmoke;
  text-shadow: 2px 2px 2px black;
`;

export const Overview = styled.p`
  width: 50%;
  font-size: 20px;
  font-weight: 300;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.3;
`;

function Home() {
  const { data: nowData, isLoading: nowLoading } = useQuery<IGetMovies>(
    ["movie", "now"],
    () => getMovies("now_playing")
  );

  const { data: popularData, isLoading: popularLoading } = useQuery<IGetMovies>(
    ["movie", "popular"],
    () => getMovies("popular")
  );

  const { data: topData, isLoading: topLoading } = useQuery<IGetMovies>(
    ["movie", "top"],
    () => getMovies("top_rated")
  );

  return (
    <Wrapper>
      {nowLoading && popularLoading && topLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          {/* Top Banner */}
          <Banner
            bgPhoto={makeImagePath(nowData?.results[0].backdrop_path || "")}
          >
            <Title>{nowData?.results[0].title}</Title>
            <Overview>{nowData?.results[0].overview}</Overview>
          </Banner>

          {/* Sliders */}
          <MovieSlider kind="now" data={nowData} />
          <MovieSlider kind="top_rated" data={topData} />
          <MovieSlider kind="popular" data={popularData} />
        </>
      )}
    </Wrapper>
  );
}

export default Home;
