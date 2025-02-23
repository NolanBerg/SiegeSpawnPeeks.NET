import React, { useState } from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'; // For envelope icon
import { faGithub } from '@fortawesome/free-brands-svg-icons'; // For GitHub icon
import { faUser, faSearch } from '@fortawesome/free-solid-svg-icons'; // For profile and search icons

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSearch = () => {
    console.log('Search Term:', searchTerm);
    // Add your search logic here
  };

  return (
    <div className="App">
      {/* Banner */}
      <div className="banner">
        {/* Left Side: Logos */}
        <div className="left-section">
          <a href="https://www.ubisoft.com/en-us/game/rainbow-six/siege" target="_blank" rel="noopener noreferrer">
            <img src="/images/logo.jpg" alt="logo" className="logo" />
          </a>
          <a href="https://www.ubisoft.com/en-us/game/rainbow-six/siege/news-updates/1yyppDElemqVlUXSVif55M" target="_blank" rel="noopener noreferrer">
            <img src="/images/ad.png" alt="Ad" className="ad" />
          </a>
        </div>
        {/* Middle Section: Second Logo */}
        <div className="middle-section">
          <img src="/images/logo2.png" alt="Second Logo" className="second-logo" />
        </div>

        {/* Right Side: Tabs */}
        <div className="right-section">
          <span className="tab" onClick={openModal}>
            <FontAwesomeIcon icon={faUser} className="user-icon" /> 
          </span>
          <span className="tab">
            <a href="mailto:nolanreactdev@gmail.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faEnvelope} className="envelope-icon" /> 
            </a>
          </span>
          <span className="tab">
            <a href="https://github.com/NolanBerg/SiegeSpawnPeeks.NET" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faGithub} className="github-icon" /> 
            </a>
          </span>
        </div>
      </div>
      <div className="banner2"></div>
      <div className="banner3">
        {/* Search Bar */}
        <div className="search-bar-container">
          <input
            type="text"
            placeholder="Search..."
            className="search-bar"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="search-button" onClick={handleSearch}>
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>About Us</h2>
            <p>
              Welcome to SiegeSpawnPeeks.NET! This is site offers:
            </p>
            <ul>
              <li>Spawn peek tutorials for all ranked maps.</li>
              <li>Made for competitive players trying to find new strats.</li>
              <li>Constantly adding videos. If you have spawn peeks videos click mail icon!</li>
            </ul>
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;