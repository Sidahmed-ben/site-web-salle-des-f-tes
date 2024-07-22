// ImageGallery.js
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Modal from "react-modal";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import styles from "./ImageGallery.module.css";
import { NavigationHome } from "../components/navigationHome";

export const ImagesGallery = (props) => {
  const { search } = useLocation();
  const queryValue = React.useMemo(() => new URLSearchParams(search), [search]);
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchImages = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/api/images");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setImages(data.image_urls);
    } catch (error) {
      console.error("Failed to fetch images:", error);
    }
  };

  const openModal = (index) => {
    setCurrentImage(index);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setCurrentImage(0);
  };

  const showPrevImage = () => {
    setCurrentImage((currentImage - 1 + images.length) % images.length);
  };

  const showNextImage = () => {
    setCurrentImage((currentImage + 1) % images.length);
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

    fetchImages();
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [search]);

  return (
    <>
      <NavigationHome />
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
            {loading ? (
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100vh"
              >
                <CircularProgress />
              </Box>
            ) : (
              images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Gallery ${index}`}
                  onClick={() => openModal(index)}
                  className={styles.thumbnail}
                />
              ))
            )}
            <Modal
              isOpen={isOpen}
              onRequestClose={closeModal}
              contentLabel="Image Modal"
              className={styles.modal}
              overlayClassName={styles.overlay}
            >
              <img
                src={images[currentImage]}
                alt="Enlarged"
                className={styles.enlarged}
              />
              <button onClick={closeModal} className={styles["close-button"]}>
                X
              </button>
            </Modal>
            {isOpen && (
              <>
                <button
                  onClick={showPrevImage}
                  className={styles["prev-button"]}
                >
                  &lt;
                </button>
                <button
                  onClick={showNextImage}
                  className={styles["next-button"]}
                >
                  &gt;
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
