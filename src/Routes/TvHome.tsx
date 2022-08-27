import { useQuery } from "react-query";
import { makeImagePath } from "../utils";
import TvSlider from "../Components/TvShow/TvSlider";
import { Banner, Loader, Overview, Title, Wrapper } from "./MovieHome";
import { getTvShows, IGetTvShows } from "../api/tvShowsApi";

function TvHome() {
  const { data: onAirData, isLoading: onAirLoading } = useQuery<IGetTvShows>(
    ["tv", "onair"],
    () => getTvShows("on_the_air")
  );

  const { data: popularData, isLoading: popularLoading } =
    useQuery<IGetTvShows>(["tv", "popular"], () => getTvShows("popular"));

  const { data: topData, isLoading: topLoading } = useQuery<IGetTvShows>(
    ["tv", "top"],
    () => getTvShows("top_rated")
  );

  return (
    <Wrapper>
      {onAirLoading && popularLoading && topLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          {/* Top Banner */}
          <Banner
            bgPhoto={makeImagePath(onAirData?.results[0].backdrop_path || "")}
          >
            <Title>{onAirData?.results[0].name}</Title>
            <Overview>{onAirData?.results[0].overview}</Overview>
          </Banner>

          {/* Sliders */}
          <TvSlider kind="onAir" data={onAirData} />
          <TvSlider kind="topRated" data={topData} />
          <TvSlider kind="popular" data={popularData} />
        </>
      )}
    </Wrapper>
  );
}

export default TvHome;
