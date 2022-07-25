import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Routes/Home";
import Search from "./Routes/Search";
import Tv from "./Routes/Tv";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="tv" element={<Tv />}></Route>
        <Route path="search" element={<Search />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
