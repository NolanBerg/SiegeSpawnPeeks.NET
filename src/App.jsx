import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons"; 
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faUser, faSearch } from "@fortawesome/free-solid-svg-icons";
import MapDropdown from "./MapDropdown.jsx";
import MapPage from "./MapPage.jsx";

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

  return (
    <Router>
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
            {/* Add Home Button */}
            <span className="tab" onClick={() => navigate("/")}>
              <FontAwesomeIcon icon={faHome} className="home-icon" />
            </span>
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
          <MapDropdown />
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="modal-overlay">
            <div className="modal" ref={modalRef}>
              <h2>About Us</h2>
              <p>Welcome to SiegeSpawnPeeks.NET! What we do:</p>
              <ul>
                <li>Spawn peek tutorials for all ranked maps.</li>
                <li>Made for competitive players trying to find new strats.</li>
                <li>
                  New videos getting uploaded. If you have spawn peek videos you 
                  want featured, click the mail icon and send them in!
                </li>
              </ul>
              <button onClick={closeModal}>Close</button>
            </div>
          </div>
        )}
      </div>

      {/* Routes */}
      <Routes>
        <Route path="/map/:mapName" element={<MapPage />} />
      </Routes>
    </Router>
  );
}

export default App;