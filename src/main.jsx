import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./style/index.scss";
import "./style/reset.scss";
import "./style/utils.scss";
import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./pages/Home.jsx";
import Movies from "./pages/Movies.jsx";
import DefaultLayout from "./layouts/DefaultLayout.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route path="/" element={<Movies />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
