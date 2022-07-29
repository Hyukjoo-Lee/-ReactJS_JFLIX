import { useLocation } from "react-router";

function Search() {
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get("keyword");
  console.log(keyword);
  return <></>;
}
export default Search;
