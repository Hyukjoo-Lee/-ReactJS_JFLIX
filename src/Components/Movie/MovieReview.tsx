import { useQuery } from "react-query";
import styled from "styled-components";
import { getMovieReview, IGetMovieReview } from "../../api/movieApi";
import { IProps } from "./MovieDetail";

export const ReviewContainer = styled.nav`
  margin-left: 10px;
`;

export const ReviewTitle = styled.h1`
  font-size: 32px;
`;

export const NoReviews = styled.h1`
  font-size: 20px;
  color: red;
`;
export const ReviewList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  font-size: 20px;
`;

export const Review = styled.li`
  margin-top: 5px;
  margin-right: 10px;
  cursor: pointer;
  color: white;
  text-decoration: underline;
  border-bottom: 1.5px solid rgba(0, 0, 0, 0.5);
  &:hover {
    color: tomato;
    opacity: 1;
  }
`;

function MovieReview({ id }: IProps) {
  const { data: reviewData } = useQuery<IGetMovieReview>(
    ["movie", `${id}_review`],
    () => getMovieReview(id)
  );

  return (
    <>
      <ReviewContainer>
        <ReviewTitle> Reviews </ReviewTitle>
        {reviewData?.total_results !== 0 ? (
          <ReviewList>
            {reviewData?.results.slice(0, 4).map((review, index) => (
              <Review key={index}>
                <a href={review.url}>{review.author}</a>
              </Review>
            ))}
          </ReviewList>
        ) : (
          <NoReviews>No Reviews Available</NoReviews>
        )}
      </ReviewContainer>
    </>
  );
}

export default MovieReview;
