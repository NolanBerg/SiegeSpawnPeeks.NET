import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faUser, faSearch } from "@fortawesome/free-solid-svg-icons";
import MapDropdown from "./MapDropdown.jsx";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef(null); // Ref for the modal

  // Function to open the modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        closeModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalOpen]);

  // Function to handle map selection
  const handleMapSelect = (map) => {
    console.log("Selected Map:", map);
    // You can add navigation logic here (e.g., using React Router)
  };

  return (
    <div className="App">
      {/* Banner Section */}
      <div className="banner">
        {/* Left Side: Logos */}
        <div className="left-section">
          <a
            href="https://www.ubisoft.com/en-us/game/rainbow-six/siege"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/images/logo.jpg" alt="Logo" className="logo" />
          </a>
          <a
            href="https://www.ubisoft.com/en-us/game/rainbow-six/siege/news-updates/1yyppDElemqVlUXSVif55M"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/images/ad.png" alt="Ad" className="ad" />
          </a>
        </div>

        {/* Middle Section: Second Logo */}
        <div className="middle-section">
          <img
            src="/images/logo2.png"
            alt="Second Logo"
            className="second-logo"
          />
        </div>

        {/* Right Side: Tabs */}
        <div className="right-section">
          <span className="tab" onClick={openModal}>
            <FontAwesomeIcon icon={faUser} className="user-icon" />
          </span>
          <span className="tab">
            <a
              href="mailto:nolanreactdev@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faEnvelope} className="envelope-icon" />
            </a>
          </span>
          <span className="tab">
            <a
              href="https://github.com/NolanBerg/SiegeSpawnPeeks.NET"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faGithub} className="github-icon" />
            </a>
          </span>
        </div>
      </div>

      {/* Divider Line */}
      <div className="banner2"></div>

      {/* Main Content Section */}
      <div className="banner3">
        {/* Search Bar with Map Dropdown */}
        <MapDropdown onSelectMap={handleMapSelect} />
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal" ref={modalRef}>
            <h2>About Us</h2>
            <p>Welcome to SiegeSpawnPeeks.NET! This site offers:</p>
            <ul>
              <li>Spawn peek tutorials for all ranked maps.</li>
              <li>Made for competitive players trying to find new strats.</li>
              <li>
                Constantly adding videos. If you have spawn peek videos, click
                the mail icon!
              </li>
            </ul>
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;