import { IGetTvShows } from "../../api/tvShowsApi";

interface IProps {
  kind: string;
  data?: IGetTvShows;
}

function TvSlider({ kind, data }: IProps) {
  return <h1>TV</h1>;
}

export default TvSlider;
