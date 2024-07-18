import React from "react";
import { useNavigate } from "react-router-dom";

export const Services = (props) => {
  const navigate = useNavigate();
  const handleClick = (query) => {
    navigate(`/gallery?type=${query}`); // Change to the desired path
  };

  return (
    <div id="services" className="text-center">
      <div className="container" class="container-sm">
        <div className="section-title">
          <h2>Nos Prestations</h2>
          {/* <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit duis sed
            dapibus leonec.
          </p> */}
        </div>
        <div className="row">
          <div class="col-md-4">
            <div
              class="profile-card-2 fete"
              onClick={() => handleClick("Fetes")}
            >
              <div class="profile-name">Fêtes et Évènements</div>
              {/* <div class="profile-username">@johndoesurname</div> */}
            </div>
          </div>
          <div class="col-md-4">
            <div
              class="profile-card-2 bien-etre"
              onClick={() => handleClick("Bien-etres")}
            >
              <div class="profile-name">Bien êtres</div>
              {/* <div class="profile-username">@johndoesurname</div> */}
            </div>
          </div>
          <div class="col-md-4">
            <div
              class="profile-card-2 hebergement"
              onClick={() => handleClick("Hebergements")}
            >
              <div class="profile-name">Hébergements</div>
              {/* <div class="profile-username">@johndoesurname</div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
