import { useState } from "react";
import React from "react";
import Modal from "react-modal";
import "./contact-modal.css";

export const Contact = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);

  // Basic email validation function
  const isValidEmail = (email) => {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(String(email).toLowerCase());
  };

  // Function to clear state
  const clearState = () => {
    setName("");
    setEmail("");
    setMessage("");
  };

  const sendMail = async (email, name, message) => {
    let sended = true;
    // Remplacez ces données par celles que vous souhaitez envoyer
    const data = {
      email,
      name,
      message,
    };
    const response = await fetch("http://127.0.0.1:5000/api/send-mail", {
      method: "POST", // Spécifie que la méthode est POST
      headers: {
        "Content-Type": "application/json", // Indique que le corps de la requête est en JSON
      },
      body: JSON.stringify(data), // Convertit les données en JSON
    });

    // Vérifie si la requête a été effectuée avec succès
    if (!response.ok) {
      alert(
        "Une erreur s'est produite lors de l'envoi du mail, veuillez réessayer plus tard"
      );
      return !sended;
    }
    return sended;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(name, email, message);

    if (!isValidEmail(email)) {
      return alert("Veuillez entrer une adresse email valide");
    }
    if (!name || !email || !message) {
      return alert("Veuillez remplir tous les champs du formulaire");
    }
    // Send mail
    await sendMail(email, name, message);
    clearState();
    setModalIsOpen(true); // Ouvrir la modal
  };

  return (
    <div>
      <div id="contact">
        <div className="container">
          <div className="col-md-8">
            <div className="row">
              <div className="section-title">
                <h2>Contact</h2>
                <p>
                  Veuillez remplir le formulaire ci-dessous pour nous envoyer un
                  email et nous vous répondrons dans les plus brefs délais.
                </p>
              </div>
              <form name="sentMessage" validate onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <input
                        value={name}
                        className="form-control"
                        placeholder="Nom"
                        required
                        onChange={(e) => setName(e.target.value)}
                      />
                      <p className="help-block text-danger"></p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <input
                        type="email"
                        value={email}
                        className="form-control"
                        placeholder="Adresse email"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <p className="help-block text-danger"></p>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <textarea
                    value={message}
                    className="form-control"
                    rows="4"
                    placeholder="Message"
                    required
                    onChange={(e) => setMessage(e.target.value)}
                  ></textarea>
                  <p className="help-block text-danger"></p>
                </div>
                <div id="success"></div>
                <button type="submit" className="btn btn-custom btn-lg">
                  Envoyer le message
                </button>
              </form>
              <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                contentLabel="Message Sent"
                style={{
                  overlay: {
                    backgroundColor: "rgba(0, 0, 0, 0.75)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  },
                  content: {
                    position: "relative",
                    width: "auto",
                    maxWidth: "500px",
                    background: "#fff",
                    padding: "30px",
                    borderRadius: "8px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    color: "#333",
                    top: "auto",
                    left: "auto",
                    right: "auto",
                    bottom: "auto",
                    transform: "none",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  },
                }}
              >
                <p className="modal-title">Message Envoyé</p>
                <p className="modal-text">
                  Merci d'avoir envoyer le message ! Nous vous répondrons dans
                  les plus brefs délais.
                </p>
                <button
                  className="close-button"
                  onClick={() => setModalIsOpen(false)}
                >
                  Fermer
                </button>
              </Modal>
            </div>
          </div>
          <div className="col-md-3 col-md-offset-1 contact-info">
            <div className="contact-item">
              <h3>Contact Info </h3>
              <p>
                <span>
                  <i className="fa fa-map-marker"></i> Ville
                </span>
                {props.data ? props.data.address : "loading"}
              </p>
            </div>
            <div className="contact-item">
              <p>
                <span>
                  <i className="fa fa-phone"></i> Phone
                </span>{" "}
                {props.data ? props.data.phone : "loading"}
              </p>
            </div>
            <div className="contact-item">
              <p>
                <span>
                  <i className="fa fa-envelope-o"></i> Email
                </span>{" "}
                {props.data ? props.data.email : "loading"}
              </p>
            </div>
          </div>
          <div className="col-md-12">
            <div className="row">
              <div className="social">
                <ul>
                  <li>
                    <a href={props.data ? props.data.facebook : "/"}>
                      <i className="fa fa-facebook"></i>
                    </a>
                  </li>
                  <li>
                    <a href={props.data ? props.data.twitter : "/"}>
                      <i className="fa fa-twitter"></i>
                    </a>
                  </li>
                  <li>
                    <a href={props.data ? props.data.youtube : "/"}>
                      <i className="fa fa-youtube"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
