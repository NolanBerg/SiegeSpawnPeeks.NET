import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faEnvelope, faUser, faLeftLong} from "@fortawesome/free-solid-svg-icons"; // Added faArrowLeft
import { faGithub } from "@fortawesome/free-brands-svg-icons";

// Sample video data - modify this to add/remove videos for each map
const mapContent = {
  Bank: [
    { id: "QzAPty06Yj0", title: "Alley Spawn Runout" },
    { id: "def456", title: "Alleyway Angle" },
    { id: "ghi789", title: "Roof Access Strat" }
  ],
  Border: [
    { id: "xyz123", title: "West Wall Tactics" },
    { id: "uvw456", title: "Customs Breach" }
  ],
  Chalet: [
    { id: "jkl012", title: "Penthouse Control" }
  ],
  Coastline: [
    { id: "jkl012", title: "Penthouse Control" }
  ]
};

const MapPage = () => {
  const { mapName } = useParams();
  const decodedName = decodeURIComponent(mapName);
  const navigate = useNavigate();
  const videos = mapContent[decodedName] || [];

  const openModal = () => {
    // Add modal logic if needed
  };

  return (
    <div className="map-page">
      {/* Top Banner */}
      <div className="bannermp">
        <div className="left-section">
          <a href="https://www.ubisoft.com/en-us/game/rainbow-six/siege" target="_blank" rel="noreferrer">
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
            <a href="mailto:nolanreactdev.com" target="_blank" rel="noreferrer">
              <FontAwesomeIcon icon={faEnvelope} className="envelope-icon" />
            </a>
          </span>
          <span className="tab">
            <a href="https://github.com/NolanBerg/SiegeSpawnPeeks.NET" target="_blank" rel="noreferrer">
              <FontAwesomeIcon icon={faGithub} className="github-icon" />
            </a>
          </span>
        </div>
      </div>

      {/* Divider */}
      <div className="banner2mp"></div>

      {/* Map Content */}
      <div className="map-content">
        {/* Back Button */}
        <button className="back-button" onClick={() => navigate("/")}>
          <FontAwesomeIcon icon={faLeftLong} className="arrow-icon" />
          <span className="back-text">Go Back</span>
        </button>

        <h1 className="map-title">{decodedName} Spawn Peek Guides</h1>
        
        <div className="videos-container">
          {videos.map((video, index) => (
            <div key={index} className="video-card">
              <h3>{video.title}</h3>
              <div className="video-wrapper">
                <iframe
                  width="100%"
                  height="315"
                  src={`https://www.youtube.com/embed/${video.id}`}
                  title={video.title}
                  frameBorder="0"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MapPage;