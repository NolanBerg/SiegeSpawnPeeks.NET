import React, { useState, useEffect, useRef } from "react";
import { Routes, Route, useNavigate } from "react-router-dom"; // Remove BrowserRouter import
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faEnvelope, faUser } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import MapDropdown from "./components/MapDropdown.jsx";
import MapPage from "./components/MapPage.jsx";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef(null);
  const navigate = useNavigate();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        closeModal();
      }
    };

    isModalOpen && document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isModalOpen]);

  return (
    <div className="App">
      <Routes>
        {/* Home Page */}
        <Route
          path="/"
          element={
            <>
              {/* Banner */}
              <div className="banner">
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
                    <a href="mailto:nolanreactdev@email.com" target="_blank" rel="noreferrer">
                      <FontAwesomeIcon icon={faEnvelope} className="envelope-icon" />
                    </a>
                  </span>
                  <span className="tab">
                    <a href="https://github.com/NolanBerg" target="_blank" rel="noreferrer">
                      <FontAwesomeIcon icon={faGithub} className="github-icon" />
                    </a>
                  </span>
                </div>
              </div>

              {/* Divider */}
              <div className="banner2"></div>

              {/* Main Content */}
              <div className="banner3">
                <MapDropdown />
              </div>

              {/* Modal */}
              {isModalOpen && (
                <div className="modal-overlay">
                  <div className="modal" ref={modalRef}>
                    <h2>About Us</h2>
                    <p>We provide spawn peeks for players ranging 
                      from the casual level to pros. If you have any
                      spawn peeks not on the site click the mail icon
                      and send them to me!
                    </p>
                    <button onClick={closeModal}>Close</button>
                  </div>
                </div>
              )}
            </>
          }
        />

        {/* Map Page */}
        <Route path="/map/:mapName" element={<MapPage />} />
      </Routes>
    </div>
  );
}

export default App;