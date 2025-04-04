import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"; // Import magnifying glass icon

const MapDropdown = () => {
  const [searchQuery, setSearchQuery] = useState(""); // State for search input
  const [filteredMaps, setFilteredMaps] = useState([]); // State for filtered maps
  const [isDropdownVisible, setIsDropdownVisible] = useState(false); // State for dropdown visibility
  const navigate = useNavigate();

  // List of all maps
  const maps = [
    "Bank",
    "Border",
    "Chalet",
    "Clubhouse",
    "Coastline",
    "Consulate",
    "Emerald Plains",
    "Kafe Dostoyevsky",
    "Kanal",
    "Lair",
    "Nighthaven Labs",
    "Oregon",
    "Outback",
    "Skyscraper",
    "Theme Park",
    "Villa",
  ];

  // Handle search input change
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Filter maps based on the query
    const filtered = maps.filter((map) =>
      map.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredMaps(filtered);
  };

  // Handle map selection enter or quit
  const handleMapSelection = (map) => {
    const formattedMap = map.toLowerCase().replace(/\s+/g, "-"); // Format the map name
    navigate(`/map/${formattedMap}`); // Navigate to the map page
    setSearchQuery(""); // Clear the search bar
    setFilteredMaps([]); // Clear the dropdown
    setIsDropdownVisible(false); // Hide dropdown
  };

  // Handle Enter key press
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      const selectedMap = maps.find((map) =>
        map.toLowerCase().includes(searchQuery.toLowerCase())
      );
      if (selectedMap) {
        handleMapSelection(selectedMap);
      }
    }
  };

  // Handle search bar focus
  const handleSearchFocus = () => {
    setIsDropdownVisible(true); // Show dropdown when search bar is focused
    setFilteredMaps(maps); // Show all maps initially
  };

  // Handle search bar blur when out of focus change 200 if needed
  const handleSearchBlur = () => {
    setTimeout(() => {
      setIsDropdownVisible(false); 
    }, 200); 
  };

  return (
    <div className="search-bar-container">
      {/* Search Bar */}
      <div className="search-bar-wrapper">
        <FontAwesomeIcon icon={faMagnifyingGlass} className="search-icon" />
        <input
          type="text"
          placeholder="Search for a map..."
          value={searchQuery}
          onChange={handleSearchChange}
          onKeyDown={handleKeyDown}
          onFocus={handleSearchFocus} // Show dropdown on focus
          onBlur={handleSearchBlur} // Hide dropdown on blur 
          className="search-bar"
        />
      </div>

      {/* Dropdown */}
      {isDropdownVisible && (
        <div className="dropdown">
          {filteredMaps.map((map, index) => (
            <div
              key={index}
              className="dropdown-item"
              onClick={() => handleMapSelection(map)}
            >
              {map}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MapDropdown;