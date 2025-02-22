import React from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'; // For envelope icon
import { faGithub } from '@fortawesome/free-brands-svg-icons'; // For GitHub icon
import { faUser } from '@fortawesome/free-solid-svg-icons'; // For user icon

function App() {
  return (
    <div className="App">
      {/* Banner */}
      <div className="banner">
        {/* Left Side: Logos */}
        <div className="left-section">
          <img src="/images/logo.jpg" alt="Logo" className="logo" />
          <img src="/images/logo2.png" alt="Second Logo" className="second-logo" />
        </div>

        {/* Right Side: Tabs */}
        <div className="right-section">
          <span className="tab">
            <FontAwesomeIcon icon={faUser} className="user-icon" /> 
          </span>
          <span className="tab">
            <FontAwesomeIcon icon={faEnvelope} className="envelope-icon" /> 
          </span>
          <span className="tab">
            <FontAwesomeIcon icon={faGithub} className="github-icon" /> 
          </span>
        </div>
      </div>
      <div className="banner2"></div>

      {/* Title */}
      <div>
        <h1>Search Maps</h1>
      </div>

      {/* Vite and React Logos */}
      <div className="logos-container">
        <img src="/images/vite.svg" alt="Vite Logo" className="vite-logo" />
        <img src="/images/react.svg" alt="React Logo" className="react-logo" />
      </div>
    </div>
  );
}

export default App;