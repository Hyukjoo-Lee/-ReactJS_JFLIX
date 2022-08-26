import { useQuery } from "react-query";
import { makeImagePath } from "../utils";
import TvSlider from "../Components/TvShow/TvSlider";
import { Banner, Loader, Overview, Title, Wrapper } from "./MovieHome";
import { getTvShows, IGetTvShows } from "../api/tvShowsApi";

function TvHome() {
  const { data: onAirData, isLoading: onAirLoading } = useQuery<IGetTvShows>(
    ["tvshows", "onair"],
    () => getTvShows("on_the_air")
  );

  console.log(onAirData);
  return (
    <Wrapper>
      {onAirLoading ? (
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
        </>
      )}
    </Wrapper>
  );
}

export default TvHome;
