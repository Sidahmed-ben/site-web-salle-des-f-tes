import React from "react";
export const Services = (props) => {
  return (
    <div id="services" className="text-center">
      <div className="container">
        <div className="section-title">
          <h2>Nos Prestations</h2>
          {/* <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit duis sed
            dapibus leonec.
          </p> */}
        </div>
        <div className="row">
          <div class="col-md-4">
            <div class="profile-card-2 fete">
              {/* <img src="img/services/fete.jpg" className="img img-responsive" /> */}
              <div class="profile-name">Fêtes</div>
              <div class="profile-username">@johndoesurname</div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="profile-card-2 bien-etre">
              {/* <img
                src="img/services/bien-etre.jpg"
                className="img img-responsive"
              /> */}
              <div class="profile-name">Bien être</div>
              <div class="profile-username">@johndoesurname</div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="profile-card-2 hebergement">
              {/* <img
                src="https://images.caradisiac.com/images/2/1/0/6/172106/S0-mercedes-amg-classe-a-35-un-prix-de-50-400-eur-569831.jpg"
                className="img img-responsive"
              /> */}
              <div class="profile-name">Hébergement</div>
              <div class="profile-username">@johndoesurname</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
