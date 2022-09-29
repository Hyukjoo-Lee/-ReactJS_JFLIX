import { useQuery } from "react-query";
import { getTvShowsReview, IGetTvShowsReview } from "../../api/tvShowsApi";
import { IProps } from "../Movie/MovieDetail";
import {
  NoContents,
  Review,
  ReviewContainer,
  ReviewList,
  ReviewTitle,
} from "../Movie/MovieReview";

function TvShowReview({ id }: IProps) {
  const { data: reviewData } = useQuery<IGetTvShowsReview>(
    ["movie", `${id}_review`],
    () => getTvShowsReview(id)
  );

  return (
    <>
      <ReviewContainer>
        <ReviewTitle> Reviews </ReviewTitle>
        {reviewData?.total_results !== 0 ? (
          <ReviewList>
            {reviewData?.results.slice(0, 3).map((review) => (
              <Review>
                <a href={review.url}>{review.author}</a>
              </Review>
            ))}
          </ReviewList>
        ) : (
          <NoContents>No Reviews Available</NoContents>
        )}
      </ReviewContainer>
    </>
  );
}

export default TvShowReview;
