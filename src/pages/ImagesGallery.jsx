import React, { useEffect, useState } from "react";
import { NavigationGallery } from "../components/navigationGallery";
import { BrowserRouter as Router, Link, useLocation } from "react-router-dom";
import "lightgallery.js/dist/css/lightgallery.css";

import { LightgalleryItem } from "react-lightgallery";
const images = [
  "./img/about11.jpg",
  "./img/about11.jpg",
  "./img/about11.jpg",
  "./img/about11.jpg",
];

export const ImagesGallery = (props) => {
  const { search } = useLocation();
  const queryValue = React.useMemo(() => new URLSearchParams(search), [search]);
  const [query, setQuery] = useState("");

  const onInit = () => {
    console.log("lightGallery has been initialized");
  };

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
          <div className="row">
            <LightgalleryItem
              group="any"
              src={
                "https://images.caradisiac.com/images/2/1/0/6/172106/S0-mercedes-amg-classe-a-35-un-prix-de-50-400-eur-569831.jpg"
              }
            >
              <a
                href={
                  "https://images.caradisiac.com/images/2/1/0/6/172106/S0-mercedes-amg-classe-a-35-un-prix-de-50-400-eur-569831.jpg"
                }
              >
                <img
                  src={
                    "https://images.caradisiac.com/images/2/1/0/6/172106/S0-mercedes-amg-classe-a-35-un-prix-de-50-400-eur-569831.jpg"
                  }
                />
                <ItemTitle>
                  <LinesEllipsis
                    text={"title"}
                    maxLine="2"
                    ellipsis="..."
                    trimRight
                    basedOn="letters"
                  />
                </ItemTitle>
              </a>
            </LightgalleryItem>
          </div>
        </div>
      </div>
    </>
  );
};
