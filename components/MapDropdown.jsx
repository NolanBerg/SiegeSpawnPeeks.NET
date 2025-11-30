'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const MapDropdown = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredMaps, setFilteredMaps] = useState([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const router = useRouter();

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

  const handleMapSelection = (map) => {
    const formattedMap = map.toLowerCase().replace(/\s+/g, "-");
    router.push(`/map/${formattedMap}`);
    setSearchQuery("");
    setFilteredMaps([]);
    setIsDropdownVisible(false);
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