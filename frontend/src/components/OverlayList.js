import React from 'react';
import axios from 'axios';
import '../App.css'; // Import the CSS file

const OverlayList = ({ overlays, fetchOverlays }) => {
  const deleteOverlay = async (id) => {
    await axios.delete(`http://localhost:5000/overlays/${id}`);
    fetchOverlays();
  };

  return (
    <div>
      <ul className="overlay-list"> {/* Add overlay-list class */}
        {overlays.map((overlay) => (
          <li key={overlay._id} className="overlay-item"> {/* Add overlay-item class */}
            {overlay.text} - {overlay.logo_url}
            <button onClick={() => deleteOverlay(overlay._id)} className="overlay-delete-btn"> {/* Add overlay-delete-btn class */}
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OverlayList;