import React, { useEffect, useState } from "react";
import { NavigationGallery } from "../components/navigationGallery";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { BrowserRouter as Router, Link, useLocation } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import styles from "react-responsive-carousel/lib/styles/carousel.min.css";

const images = [
  "./img/about11.jpg",
  "./img/about11.jpg",
  "https://picsum.photos/200/300?image=1050",
  "https://picsum.photos/300/300?image=202",
  "https://picsum.photos/300/300?image=202",
  "https://picsum.photos/300/300?image=202",
  "https://picsum.photos/300/300?image=202",
  "https://picsum.photos/300/300?image=202",
  "./img/about11.jpg",
  "https://picsum.photos/200/300?image=1050",
  "https://picsum.photos/300/300?image=202",
  "https://picsum.photos/300/300?image=202",
  "https://picsum.photos/300/300?image=202",
  "./img/about11.jpg",
  "./img/about11.jpg",
  "https://picsum.photos/200/300?image=1050",
  "https://picsum.photos/300/300?image=202",
  "https://picsum.photos/300/300?image=202",
  "https://picsum.photos/300/300?image=202",
  "https://picsum.photos/300/300?image=202",
  "https://picsum.photos/300/300?image=202",
];

export const ImagesGallery = (props) => {
  const { search } = useLocation();
  const queryValue = React.useMemo(() => new URLSearchParams(search), [search]);
  const [query, setQuery] = useState("");
  useEffect(() => {
    console.log(queryValue.get("type"));
    switch (queryValue.get("type")) {
      case "Fetes":
        setQuery("Fêtes");
        break;
      case "Bien-etres":
        setQuery("Bien êtres");
        break;
      case "Hebergements":
        setQuery("Hébergements");
        break;
      default:
        setQuery("Fêtes");
        break;
    }
  }, [search]);

  return (
    <>
      <NavigationGallery></NavigationGallery>
      <div id="portfolio" className="text-center">
        <div className="container container-sm">
          <div className="section-title">
            <h2>{query}</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit duis sed
              dapibus leonec.
            </p>
          </div>
          <div className="container" style={{}}>
            <Carousel>
              <div>
                <img
                  src="https://picsum.photos/300/300?image=202"
                  height="auto"
                  width="300px"
                />
              </div>
              <div>
                <img src="./img/about11.jpg" height="300px" width="300px" />
              </div>
              <div>
                <img
                  src="https://picsum.photos/200/300?image=1050"
                  height="300px"
                  width="300px"
                />
              </div>
            </Carousel>
          </div>
        </div>
      </div>
    </>
  );
};
