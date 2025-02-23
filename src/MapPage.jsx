import React from "react";
import { useParams } from "react-router-dom";

const MapPage = () => {
  const { mapName } = useParams();

  return (
    <div className="map-page">
      <h1>{decodeURIComponent(mapName)}</h1>
      <p>This is the page for {decodeURIComponent(mapName)}.</p>
      {/* Add map-specific content here */}
    </div>
  );
};

export default MapPage;