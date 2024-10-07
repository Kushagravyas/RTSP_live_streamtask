import React from 'react';
import axios from 'axios';
import '../App.css';

const OverlayList = ({ overlays, setEditingOverlay, fetchOverlays }) => {
  const deleteOverlay = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/overlays/${id}`);
      fetchOverlays();  
    } catch (error) {
      console.error('Error deleting overlay:', error.response?.data || error.message);
    }
  };

  return (
    <div className="overlay-list">
      {overlays.map((overlay) => (
        <div key={overlay._id} className="overlay-item">
          <p><strong>Text:</strong> {overlay.text}</p>
          <p><strong>Logo URL:</strong> {overlay.logo_url}</p>
          <p><strong>Position:</strong> X: {overlay.position.x}, Y: {overlay.position.y}</p>
          <p><strong>Size:</strong> Width: {overlay.size.width}, Height: {overlay.size.height}</p>
          <div className="overlay-actions">
            <button
              onClick={() => setEditingOverlay(overlay)}
              className="overlay-btn"
            >
              Edit
            </button>
            <button
              onClick={() => deleteOverlay(overlay._id)}
              className="overlay-btn delete-btn"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OverlayList;
