import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./Components/Header";
import MovieHome from "./Routes/MovieHome";
import Search from "./Routes/Search";
import TvHome from "./Routes/TvHome";

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      {/* <BrowserRouter> */}
      <Header />
      <Routes>
        <Route path="/" element={<MovieHome />}>
          <Route path="/movies/:movieId" element={<MovieHome />} />
        </Route>
        <Route path="tv" element={<TvHome />}>
          <Route path="/tv/:tvShowId" element={<TvHome />} />
        </Route>
        <Route path="search" element={<Search />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
