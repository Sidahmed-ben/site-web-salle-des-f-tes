import React from "react";
import Home from "./pages/Home";
import SmoothScroll from "smooth-scroll";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ImagesGallery } from "./pages/ImagesGallery";

import "./App.css";

export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/gallery" element={<ImagesGallery />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
