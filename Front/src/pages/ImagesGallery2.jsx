import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import styles from "./ImageGallery.module.css";

const images = [
  "https://drive.google.com/thumbnail?id=1mYcRdelXUis1Di5iuWlN1GrIQzysAPQF&sz=w1000",
  "https://drive.google.com/thumbnail?id=1-D0iuFtkNSekkexeFQsGuDScS1ifcT7Q&sz=w1000",
  "https://drive.google.com/thumbnail?id=1mYcRdelXUis1Di5iuWlN1GrIQzysAPQF&sz=w1000",
  "https://drive.google.com/thumbnail?id=1-D0iuFtkNSekkexeFQsGuDScS1ifcT7Q&sz=w1000",
  "https://drive.google.com/thumbnail?id=1mYcRdelXUis1Di5iuWlN1GrIQzysAPQF&sz=w1000",
  "https://drive.google.com/thumbnail?id=1-D0iuFtkNSekkexeFQsGuDScS1ifcT7Q&sz=w1000",
];

export const ImagesGallery = () => {
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

  const openModal = (image) => {
    setCurrentImage(image);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setCurrentImage("");
  };

  return (
    <div className={styles.gallery}>
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
        <img src={currentImage} alt="Enlarged" className={styles.enlarged} />
        <button onClick={closeModal} className={styles["close-button"]}>
          Close
        </button>
      </Modal>
    </div>
  );
};
