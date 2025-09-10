import React, { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import "./style/index.scss";
import "./style/reset.scss";
import "./style/utils.scss";
import { ThemeProvider } from "./hooks/ThemeContext.jsx";
import { BrowserRouter, Routes, Route } from "react-router";
import DefaultLayout from "./layouts/DefaultLayout.jsx";
import Home from "./pages/Home.jsx";
import Movies from "./pages/Movies.jsx";
import MovieDetail from "./pages/MovieDetail.jsx";
import TvShow from "./pages/TvShow.jsx";
import TvShowDetail from "./pages/TvShowDetail.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/tvshow" element={<TvShow />} />
            <Route path="/moviedetail/:movieId" element={<MovieDetail />} />
            <Route path="/tvshowdetail/:tvShowId" element={<TvShowDetail />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
);
