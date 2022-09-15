import { useScroll, useTransform } from "framer-motion";
import { useQuery } from "react-query";
import { useMatch, useNavigate } from "react-router-dom";
import { IGetMovieVideo } from "../../api/movieApi";
import {
  IGetTvShowsDetail,
  getTvShowsDetail,
  getTvShowsVideo,
} from "../../api/tvShowsApi";

import { makeImagePath } from "../../utils";
import {
  closeBtn,
  CloseButton,
  Content,
  Data,
  IProps,
  ModalContainer,
  ModalCover,
  ModalOverview,
  ModalTitle,
  Overlay,
  Rating,
  ReleaseDate,
  Title,
  Trailer,
} from "../Movie/MovieDetail";

function TvDetail({ kind, id }: IProps) {
  const { data: detailData } = useQuery<IGetTvShowsDetail>(
    ["tvshows", `${kind}_detail`],
    () => getTvShowsDetail(id)
  );

  const { data: videoData } = useQuery<IGetMovieVideo>(
    ["tvshows", `${kind}_video`],
    () => getTvShowsVideo(id)
  );

  const navigate = useNavigate();

  const bigTvMatch = useMatch(`/tv/:tvShowId`);

  const { scrollY } = useScroll();
  const setScrollY = useTransform(scrollY, (val) => val + 65);

  const onCloseButtonClicked = () => {
    navigate(-1);
  };

  return (
    <>
      {bigTvMatch ? (
        <>
          <Overlay exit={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <ModalContainer
              style={{ top: setScrollY }}
              layoutId={bigTvMatch.params.tvShowId}
            >
              {detailData && (
                <Content>
                  <CloseButton onClick={onCloseButtonClicked}>
                    <img src={closeBtn} />
                  </CloseButton>
                  <ModalCover
                    style={{
                      backgroundImage: `url( ${makeImagePath(
                        detailData.poster_path,
                        "w400" || ""
                      )})`,
                    }}
                  />
                  <Data>
                    <ModalTitle>{detailData.name}</ModalTitle>
                    <Rating>
                      <span role="img" aria-label="rating">
                        ⭐️
                      </span>{" "}
                      {detailData.vote_average.toFixed(2)} / 10
                    </Rating>
                    <ReleaseDate>
                      First Air Date: {detailData.first_air_date}
                    </ReleaseDate>
                    <ModalOverview>{detailData.overview}</ModalOverview>
                    <Trailer>
                      {videoData?.results ? (
                        <>
                          <Title>Trailer</Title>
                          <iframe
                            width="370px"
                            height="300px"
                            src={`https://www.youtube.com/embed/${videoData.results[0].key}`}
                          ></iframe>
                        </>
                      ) : null}
                    </Trailer>
                  </Data>
                </Content>
              )}
            </ModalContainer>
          </Overlay>
        </>
      ) : null}
    </>
  );
}

export default TvDetail;
