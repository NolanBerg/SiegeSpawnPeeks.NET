import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faEnvelope, faUser, faLeftLong } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

// Utility function to capitalize each word
const capitalizeMapName = (name) => {
  return name
    .split("-") // Split the string into words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
    .join(" "); // Join the words back with spaces
};

const mapContent = {
  "bank": [
    { id: "QzAPty06Yj0", title: "Alley Spawn Runout" },
  ],
  "border": [
    
  ],
  "chalet": [
    { id: "vx63egdPMv8", title: "Hallway Window" },
    { id: "c14nc9v87_A", title: "Gaming Room Window" },
    { id: "9A57OzSDFBs", title: "Mezzanine Floor" }
  ],
  "clubhouse": [
    { id: "yXdrASlSu0I", title: "Gym Window" }
  ],
  "coastline": [
    
  ],
  "consulate": [
    
  ],
  "emerald-plains": [
    { id: "ixusGfk63XY", title: "Archive Runout" },
    { id: "AfF7PpmC9OI", title: "Memorial Window" },
    { id: "-Q0gedd5Ucs", title: "Golf Course Runout" }
  ],
  "kafe-dostoyevsky": [
    
  ],
  "kanal": [
    { id: "orwvwmDfibI", title: "Museum Door" }
  ],
  "lair": [
   
  ],
  "nighthaven-labs": [
    
  ],
  "oregon": [
    
  ],
  "outback": [
    
  ],
  "skyscraper": [
    
  ],
  "theme-park": [
    { id: "tIncsIkQDLI", title: "Dragon Window" }
   
  ],
  "villa": [
    
  ]
};

const MapPage = () => {
  const { mapName } = useParams();
  const decodedName = decodeURIComponent(mapName); // Decode the map name
  const navigate = useNavigate();
  const videos = mapContent[decodedName] || []; // Match the formatted map name

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

        {/* Recapitalized Map Title */}
        <h1 className="map-title">{capitalizeMapName(decodedName)} Spawn Peek Guides</h1>

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