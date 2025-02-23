import React from "react";

const MapPage = ({ mapName }) => {
  return (
    <div className="map-page">
      <h1>{mapName}</h1>
      <p>This is the page for {mapName}.</p>
      {/* Add map-specific content here */}
    </div>
  );
};

export default MapPage;