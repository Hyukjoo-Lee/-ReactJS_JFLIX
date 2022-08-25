import { motion, useScroll, useTransform } from "framer-motion";
import { useQuery } from "react-query";
import { useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  getMovieDetail,
  IGetMovieVideo,
  IGetMovieDetail,
  getMovieVideo,
} from "../../api/movieApi";
import { makeImagePath } from "../../utils";

const Overlay = styled(motion.div)`
  position: absolute;
  top: 0;
  width: 100%;
  height: 250vh;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;

const ModalContainer = styled(motion.div)`
  position: relative;
  display: flex;
  width: 80%;
  height: 100vh;
  margin: 0 auto;
  border-radius: 20px;
  overflow: hidden;
  background-color: transparent;
`;

const Content = styled.div`
  display: flex;
  width: 100%;
  height: 90%;
`;

const ModalCover = styled.div`
  width: 50%;
  height: 100%;
  background-size: cover;
  background-position: center;
  border-radius: 5px;
`;

const Data = styled.div`
  width: 50%;
  margin-left: 20px;
`;

const ModalMovieTitle = styled.h3`
  color: ${(props) => props.theme.white.lighter};
  padding: 10px;
  font-size: 35px;
  font-weight: bold;
  margin-top: 20px;
`;

const ModalOverview = styled.p`
  width: 370px;
  height: auto;
  color: ${(props) => props.theme.white.lighter};
  margin-left: 10px;
  background-color: transparent;
`;

const Rating = styled.p`
  color: ${(props) => props.theme.white.lighter};
  padding: 10px;
  font-size: 14px;
  font-weight: bold;
`;

const ReleaseDate = styled.p`
  color: ${(props) => props.theme.white.lighter};
  padding-left: 10px;
  padding-bottom: 10px;
  font-size: 14px;
  font-weight: bold;
`;

const Trailer = styled.div`
  padding: 10px;
  font-size: 30px;
`;

const Title = styled.h3`
  margin: 20px 0;
  font-size: 32px;
  margin-bottom: 10px;
`;

interface IProps {
  kind: string;
  id: string;
}

function MovieDetail({ kind, id }: IProps) {
  const { data: detailData } = useQuery<IGetMovieDetail>(
    ["movie", `${kind}_detail`],
    () => getMovieDetail(id)
  );

  const { data: videoData } = useQuery<IGetMovieVideo>(
    ["movie", `${kind}_video`],
    () => getMovieVideo(id)
  );

  const navigate = useNavigate();
  const bigMovieMatch = useMatch(`/movies/:movieId`);
  const { scrollY } = useScroll();

  const onOverlayClicked = () => {
    navigate(-1);
  };

  const setScrollY = useTransform(scrollY, (val) => val + 65);

  return (
    <>
      {bigMovieMatch ? (
        <>
          <Overlay
            onClick={onOverlayClicked}
            exit={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <ModalContainer
              style={{ top: setScrollY }}
              layoutId={bigMovieMatch.params.movieId}
            >
              {detailData && (
                <Content>
                  <ModalCover
                    style={{
                      backgroundImage: `url( ${makeImagePath(
                        detailData.poster_path,
                        "w400" || ""
                      )})`,
                    }}
                  />
                  <Data>
                    <ModalMovieTitle>{detailData.title}</ModalMovieTitle>
                    <Rating>
                      <span role="img" aria-label="rating">
                        ⭐️
                      </span>{" "}
                      {detailData.vote_average.toFixed(2)} / 10
                    </Rating>
                    <ReleaseDate>
                      Released Date: {detailData.release_date}
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

export default MovieDetail;
