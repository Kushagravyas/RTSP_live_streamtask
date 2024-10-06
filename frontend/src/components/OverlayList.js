import React from 'react';
import axios from 'axios';

const OverlayList = ({ overlays, fetchOverlays }) => {
  const deleteOverlay = async (id) => {
    await axios.delete(`http://localhost:5000/overlays/${id}`);
    fetchOverlays();
  };

  return (
    <div>
      <h2>Overlay List</h2>
      <ul>
        {overlays.map((overlay) => (
          <li key={overlay._id}>
            {overlay.text} - {overlay.logo_url}
            <button onClick={() => deleteOverlay(overlay._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OverlayList;
