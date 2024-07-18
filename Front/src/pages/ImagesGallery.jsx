import React, { useEffect, useState, useCallback } from "react";
import { NavigationGallery } from "../components/navigationGallery";
import { useLocation } from "react-router-dom";
import "lightgallery.js/dist/css/lightgallery.css";
import Gallery from "react-photo-gallery";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";

const photos = [
  {
    src: "https://drive.google.com/thumbnail?id=1Dq2HEEUdtwgbXxhhlvA0wsogjSslgl_Y&sz=w1000",
    width: 720,
    height: 1600,
  },
  {
    src: "https://drive.google.com/thumbnail?id=1-D0iuFtkNSekkexeFQsGuDScS1ifcT7Q&sz=w1000",
    width: 1600,
    height: 720,
  },
  // {
  //   src: "./img/bien-etre/3.jpeg",
  //   width: 720,
  //   height: 1600,
  // },
  // {
  //   src: "./img/bien-etre/1.jpeg",
  //   width: 720,
  //   height: 1600,
  // },
  // {
  //   src: "./img/bien-etre/2.jpeg",
  //   width: 1600,
  //   height: 720,
  // },
  // {
  //   src: "./img/bien-etre/3.jpeg",
  //   width: 720,
  //   height: 1600,
  // },
  // {
  //   src: "./img/bien-etre/1.jpeg",
  //   width: 720,
  //   height: 1600,
  // },
  // {
  //   src: "./img/bien-etre/2.jpeg",
  //   width: 1600,
  //   height: 720,
  // },
  // {
  //   src: "./img/bien-etre/3.jpeg",
  //   width: 720,
  //   height: 1600,
  // },
  // {
  //   src: "./img/bien-etre/1.jpeg",
  //   width: 720,
  //   height: 1600,
  // },
  // {
  //   src: "./img/bien-etre/2.jpeg",
  //   width: 1600,
  //   height: 720,
  // },
  // {
  //   src: "./img/bien-etre/3.jpeg",
  //   width: 720,
  //   height: 1600,
  // },
];

export const ImagesGallery = (props) => {
  const { search } = useLocation();
  const queryValue = React.useMemo(() => new URLSearchParams(search), [search]);
  const [query, setQuery] = useState("");
  const [currentImage, setCurrentImage] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

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

  const openLightbox = useCallback((event, { photo, index }) => {
    setCurrentImage(index);
    setIsOpen(true);
  }, []);

  const closeLightbox = () => {
    setCurrentImage(0);
    setIsOpen(false);
  };

  const moveNext = () => {
    setCurrentImage((currentImage + 1) % photos.length);
  };

  const movePrev = () => {
    setCurrentImage((currentImage + photos.length - 1) % photos.length);
  };

  const preloadImage = (src) => {
    const img = new Image();
    img.src = src;
  };

  useEffect(() => {
    if (isOpen) {
      preloadImage(photos[(currentImage + 1) % photos.length].src);
      preloadImage(
        photos[(currentImage + photos.length - 1) % photos.length].src
      );
    }
  }, [currentImage, isOpen]);

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
            <Gallery photos={photos} onClick={openLightbox} margin={5} />
            {isOpen && (
              <Lightbox
                mainSrc={photos[currentImage].src}
                nextSrc={photos[(currentImage + 1) % photos.length].src}
                prevSrc={
                  photos[(currentImage + photos.length - 1) % photos.length].src
                }
                onCloseRequest={closeLightbox}
                onMovePrevRequest={movePrev}
                onMoveNextRequest={moveNext}
                // animationDuration={300}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};
