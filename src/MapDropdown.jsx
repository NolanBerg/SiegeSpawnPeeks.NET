import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const maps = [
  "Lair",
  "Nighthaven Labs",
  "Emerald Plains",
  "Bank",
  "Border",
  "Chalet",
  "Clubhouse",
  "Coastline",
  "Consulate",
  "Kafe Dostoyevsky",
  "Kanal",
  "Oregon",
  "Outback",
  "Skyscraper",
  "Theme Park",
  "Villa",
];

const MapDropdown = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const filteredMaps = maps
    .filter((map) => map.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort();

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    setIsDropdownOpen(true);
  };

  const handleMapSelect = (map) => {
    navigate(`/map/${encodeURIComponent(map)}`);
    setIsDropdownOpen(false);
    setSearchTerm("");
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.search-bar-container')) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className="search-bar-container">
      <input
        type="text"
        placeholder="Search for a map..."
        className="search-bar"
        value={searchTerm}
        onChange={handleInputChange}
        onFocus={() => setIsDropdownOpen(true)}
      />
      <button className="search-button">
        <FontAwesomeIcon icon={faSearch} />
      </button>

      {isDropdownOpen && (
        <div className="dropdown">
          {filteredMaps.length > 0 ? (
            filteredMaps.map((map) => (
              <div
                key={map}
                className="dropdown-item"
                onClick={() => handleMapSelect(map)}
              >
                {map}
              </div>
            ))
          ) : (
            <div className="dropdown-item">No maps found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default MapDropdown;