import React from "react";

export const About = (props) => {
  return (
    <div id="about">
      <div className="container " class="container-sm">
        <div className="row">
          <div className="col-xs-12 col-md-5">
            {" "}
            <img src="img/about.jpeg" className="img-responsive" alt="" />{" "}
          </div>
          <div className="col-xs-12 col-md-7">
            <div className="about-text">
              <h2>On vous propose</h2>
              <p>
                Bienvenue à Babylone House, notre salle des fêtes et espace de
                détente, le cadre idéal pour toutes vos occasions spéciales. Que
                ce soit pour célébrer un mariage, organiser une réunion de
                famille, ou simplement profiter d'un week-end de relaxation,
                notre établissement vous offre tout ce dont vous avez besoin.
                <br />
                <br />
                Un vrai havre de paix à 1h de route de Paris, venez comme vous
                êtes, draps et serviettes seront fournis, toutes les commodités
                se trouvent à moins de 3km.
                <br></br>
                <br></br>
                Plongez dans notre piscine, détendez-vous dans notre hammam ou
                profitez de notre jacuzzi pour un moment de bien-être absolu.
              </p>
              <h3>Pourquoi Choisir Babylone House ?</h3>
              <div className="list-style">
                <div className="col-lg-6 col-sm-6 col-xs-12">
                  <ul>
                    {props.data
                      ? props.data.Why.map((d, i) => (
                          <li key={`${d}-${i}`}>{d}</li>
                        ))
                      : "loading"}
                  </ul>
                </div>
                <div className="col-lg-6 col-sm-6 col-xs-12">
                  <ul>
                    {props.data
                      ? props.data.Why2.map((d, i) => (
                          <li key={`${d}-${i}`}> {d}</li>
                        ))
                      : "loading"}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
