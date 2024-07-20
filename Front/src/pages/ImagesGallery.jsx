import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Modal from "react-modal";
import styles from "./ImageGallery.module.css";

const images = [
  "https://drive.google.com/thumbnail?id=1mYcRdelXUis1Di5iuWlN1GrIQzysAPQF&sz=w1000",
  "https://drive.google.com/thumbnail?id=1-D0iuFtkNSekkexeFQsGuDScS1ifcT7Q&sz=w1000",
  "https://drive.google.com/thumbnail?id=1mYcRdelXUis1Di5iuWlN1GrIQzysAPQF&sz=w1000",
  "https://drive.google.com/thumbnail?id=1-D0iuFtkNSekkexeFQsGuDScS1ifcT7Q&sz=w1000",
  "img/bien-etre/1.jpeg",
  "https://drive.google.com/thumbnail?id=1-D0iuFtkNSekkexeFQsGuDScS1ifcT7Q&sz=w1000",
  "https://drive.google.com/thumbnail?id=1-D0iuFtkNSekkexeFQsGuDScS1ifcT7Q&sz=w1000",
  "https://drive.google.com/thumbnail?id=1mYcRdelXUis1Di5iuWlN1GrIQzysAPQF&sz=w1000",
  "https://drive.google.com/thumbnail?id=1-D0iuFtkNSekkexeFQsGuDScS1ifcT7Q&sz=w1000",
  "img/bien-etre/1.jpeg",
];

export const ImagesGallery = (props) => {
  const { search } = useLocation();
  const queryValue = React.useMemo(() => new URLSearchParams(search), [search]);
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  const openModal = (image) => {
    setCurrentImage(image);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setCurrentImage("");
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
      {/* <NavigationGallery></NavigationGallery> */}
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
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Gallery ${index}`}
                onClick={() => openModal(image)}
                className={styles.thumbnail}
              />
            ))}
            <Modal
              isOpen={isOpen}
              onRequestClose={closeModal}
              contentLabel="Image Modal"
              className={styles.modal}
              overlayClassName={styles.overlay}
            >
              <img
                src={currentImage}
                alt="Enlarged"
                className={styles.enlarged}
              />
              <button onClick={closeModal} className={styles["close-button"]}>
                X
              </button>
            </Modal>
          </div>
        </div>
      </div>
    </>
  );
};
