import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faEnvelope, faUser, faLeftLong } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import Modal from "./Modal.jsx"; // Import the reusable Modal

const mapContent = {
  "Bank": [
    { id: "QzAPty06Yj0", title: "Alley Spawn Runout" },
  ],
  "Border": [
    
  ],
  "Chalet": [
    { id: "vx63egdPMv8", title: "Hallway Window" },
    { id: "c14nc9v87_A", title: "Gaming Room Window" }
  ],
  "Clubhouse": [
    
  ],
  "Coastline": [
    
  ],
  "Consulate": [
    
  ],
  "Emerald Plains": [
    { id: "ixusGfk63XY", title: "Archive Runout" },
    { id: "AfF7PpmC9OI", title: "Memorial Window" }
  ],
  "Kafe Dostoyevsky": [
    
  ],
  "Kanal": [
   
  ],
  "Lair": [
   
  ],
  "Nighthaven Labs": [
    
  ],
  "Oregon": [
    
  ],
  "Outback": [
    
  ],
  "Skyscraper": [
    
  ],
  "Theme Park": [
   
  ],
  "Villa": [
    
  ]
};

const MapPage = () => {
  const { mapName } = useParams();
  const decodedName = decodeURIComponent(mapName);
  const navigate = useNavigate();
  const videos = mapContent[decodedName] || [];
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

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

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h2>About Us</h2>
        <p>
          We provide spawn peeks for players ranging from the casual level to pros. If you have any spawn peeks not on
          the site, click the mail icon and send them to me!
        </p>
        <button onClick={closeModal}>Close</button>
      </Modal>
    </div>
  );
};

export default MapPage;