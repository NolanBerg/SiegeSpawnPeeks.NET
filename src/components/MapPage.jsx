import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faEnvelope, faUser } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

const MapPage = () => {
  const { mapName } = useParams();
  const decodedName = decodeURIComponent(mapName);
  const navigate = useNavigate();

  const openModal = () => {
    // Add your modal logic here
    console.log("Open modal");
  };

  return (
    <div className="map-page">
      {/* Top Banner */}
      <div className="banner">
        <div className="left-section">
          <a href="https://www.ubisoft.com" target="_blank" rel="noreferrer">
            <img src="/images/logo.jpg" alt="Logo" className="logo" />
          </a>
        </div>

        <div className="middle-section">
          <img src="/images/logo2.png" alt="Logo 2" className="second-logo" />
        </div>

        <div className="right-section">
          <span className="tab" onClick={() => navigate("/")}>
            <FontAwesomeIcon icon={faHome} className="home-icon" />
          </span>
          <span className="tab" onClick={openModal}>
            <FontAwesomeIcon icon={faUser} className="user-icon" />
          </span>
          <span className="tab">
            <a href="mailto:example@email.com" target="_blank" rel="noreferrer">
              <FontAwesomeIcon icon={faEnvelope} className="envelope-icon" />
            </a>
          </span>
          <span className="tab">
            <a href="https://github.com" target="_blank" rel="noreferrer">
              <FontAwesomeIcon icon={faGithub} className="github-icon" />
            </a>
          </span>
        </div>
      </div>

      {/* Divider */}
      <div className="banner2"></div>

      {/* Map Content */}
      <div className="map-content">
        <h1>{decodedName} Strategies</h1>
        <div className="content">
          {/* Add map-specific videos/content here */}
          <p>Content for {decodedName} coming soon!</p>
        </div>
      </div>
    </div>
  );
};

export default MapPage;