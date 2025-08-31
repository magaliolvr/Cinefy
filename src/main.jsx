import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./style/index.scss";
import "./style/reset.scss";
import "./style/utils.scss";
import { BrowserRouter, Routes, Route } from "react-router";
import DefaultLayout from "./layouts/DefaultLayout.jsx";
import Home from "./pages/Home.jsx";
import Movies from "./pages/Movies.jsx";
import MovieDetail from "./pages/MovieDetail.jsx";
import TvShow from "./pages/TvShow.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/tvshow" element={<TvShow />} />
          <Route path="/moviedetail/:movieid" element={<MovieDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
