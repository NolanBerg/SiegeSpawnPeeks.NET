import React from "react";
import { useParams } from "react-router-dom";

const MapPage = () => {
  const { mapName } = useParams();
  const decodedName = decodeURIComponent(mapName);

  return (
    <div className="map-page">
      <h1>{decodedName} Strategies</h1>
      <div className="content">
        {/* Add map-specific videos/content here */}
        <p>Content for {decodedName} coming soon!</p>
      </div>
    </div>
  );
};

export default MapPage;