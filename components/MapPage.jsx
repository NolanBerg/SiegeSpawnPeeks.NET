import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faEnvelope, faUser, faLeftLong } from "@fortawesome/free-solid-svg-icons";
import { faYoutube, faGithub } from "@fortawesome/free-brands-svg-icons";

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
    { id: "Ia-sY4LU0Ps", title: "Main Entrance Door" },
    { id: "kgkNIdB8R-w", title: "Square Window" },
    { id: "VImMMdOh2fI", title: "Garage Ramp Runout" }
  ],
  "border": [
    { id: "Kfu5IIRLHOk", title: "Detention Wall" },
    { id: "GRs5EwILLGU", title: "Detention Runout" },
    { id: "6wQJqBxZE-Q", title: "Supply Room Window" }
  ],
  "chalet": [
    { id: "vx63egdPMv8", title: "Hallway Window" },
    { id: "c14nc9v87_A", title: "Gaming Room Window" },
    { id: "9A57OzSDFBs", title: "Mezzanine Floor" },
    { id: "OLoDLyiyhVg", title: "Car Garage Runout" },
    { id: "dE4Gd5h41fg", title: "Trophy Window" },
    { id: "D3prdVUTGRI", title: "Bedroom Window" }
  ],
  "clubhouse": [
    { id: "ZHQ-oLY4k28", title: "CCTV Soft Wall" },
    { id: "yXdrASlSu0I", title: "Gym Window" },
    { id: "9KXLdlpKvOE", title: "Construction Runout" },
    { id: "PDRZWsQMXeg", title: "Junkyard Door" }
  ],
  "coastline": [
    { id: "KyIbFvHWm3Q", title: "Sunrise Window" },
    { id: "zdEe-0nDM4c", title: "Hookah Window" },
    { id: "2w-RucNAsRw", title: "VIP Runout" },
    { id: "j3qWWzyl2Co", title: "Pool Runout" },
    { id: "IiYlvDq2N30", title: "Pool Nitro" },
    { id: "AyXCYJpwbvc", title: "Ruins Runout" },
    { id: "h3PfH-TMLtA", title: "Hallway Window" },
    { id: "ueIVwbVU5w4", title: "Pool Door" },
    { id: "8jdlzKGBVG4", title: "Office Door" }
  ],
  "consulate": [
    { id: "Ps4YFBQIg50", title: "Hallway Window" },
    { id: "nchmYK1QYzk", title: "Visa Window" },
    { id: "GYKQQCCYM7A", title: "Yellow Stairs Door" },
    { id: "h-L1yRBqvWI", title: "Meeting Room Window" }
  ],
  "emerald-plains": [
    { id: "ixusGfk63XY", title: "Archive Runout" },
    { id: "AfF7PpmC9OI", title: "Memorial Window" },
    { id: "-Q0gedd5Ucs", title: "Stables Runout" },
    { id: "yz8I7LpR8Rs", title: "Back Entrance Door" },
    { id: "vA9vkRxldx8", title: "Mud Room Window" }
  ],
  "kafe-dostoyevsky": [ 
    { id: "0o-78ZUQb9M", title: "Park Door" },
    { id: "vlWGtyVlwwA", title: "Cigar Window" },
    { id: "2iNfVqSDQDM", title: "Cigar Window pt2" }
  ],
  "kanal": [
    { id: "orwvwmDfibI", title: "Museum Door" },
    { id: "O6Zz52TcNjk", title: "White Stairs Door" },
    { id: "tj9W851pwBA", title: "Bridge Window" },
    { id: "vAEpksRe6Y4", title: "Supply Corridor Door" },
    { id: "1eTip5fS6Zc", title: "Reception Window" },
    { id: "WT9UdGo4azs", title: "Locker Room Window" },
    { id: "lyZPk1qTcfQ", title: "Reception Window pt2" },
    { id: "ZQDBoJcIN-E", title: "Lounge Window" }
  ],
  "lair": [
    { id: "39tas0DUBTE", title: "Warehouse Runout" },
    { id: "TdZXnfDrf8k", title: "Operational Window" }
  ],
  "nighthaven-labs": [
    { id: "ZUJP374AFjA", title: "Vending Runout" },
    { id: "T2-i7CN35Bg", title: "West Warehouse Runout" },
    { id: "4hLIQGWfGTE", title: "Lobby Stairs Door" }
  ],
  "oregon": [
    { id: "NK0XnqSoVDk", title: "Main Runout" },
    { id: "aE5mBfPUYMc", title: "Garage Door" }
  ],
  "outback": [
    { id: "trS5tX2E0zc", title: "Dorms Window" },
    { id: "bgyLoo1xPMM", title: "Garage Runout" },
    { id: "tC_i2i86_Uc", title: "Shark Window" },
    { id: "6_JBE_io3Zs", title: "Restaurant Lobby Door" }
  ],
  "skyscraper": [
    { id: "MRus9jC4qdc", title: "Walk-in Window" },
    { id: "w0gj10rj6lQ", title: "Terrace Runout" },
    { id: "e_xTk39Q5m4", title: "Ventilation Runout" }
  ],
  "theme-park": [
    { id: "tIncsIkQDLI", title: "Dragon Window" },
    { id: "hKYP7YbC2V8", title: "Break Room Window" },
    { id: "7u2nLf5ttcc", title: "Arcade Entrance Runout" }
  ],
  "villa": [
    { id: "HrXDSwtqQ_I", title: "Old Office Runout" },
    { id: "Gtuh8S5qVmc", title: "Closet Window" },
    { id: "8fDsy6nfbhA", title: "Closet Runout" }
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
            <a href="https://www.youtube.com/@nolmanofficial" target="_blank" rel="noreferrer">
              <FontAwesomeIcon icon={faYoutube} className="youtube-icon" />
            </a>
          </span>
          <span className="tab">
            <a href="https://github.com/NolanBerg/SiegeSpawnPeeks.NET" target="_blank" rel="noreferrer">
              <FontAwesomeIcon icon={faGithub} className="github-icon" />
            </a>
          </span>
          <span className="tab">
            <a href="mailto:nolanreactdev@gmail.com" target="_blank" rel="noreferrer">
              <FontAwesomeIcon icon={faEnvelope} className="envelope-icon" />
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
        <h1 className="map-title">{capitalizeMapName(decodedName)} </h1>

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