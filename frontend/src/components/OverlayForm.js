import React, { useState } from 'react';
import axios from 'axios';
import '../App.css'; 

const OverlayForm = ({ fetchOverlays }) => {
  
  const [text, setText] = useState('Test Overlay Text');
  const [logoUrl, setLogoUrl] = useState('https://via.placeholder.com/150'); 
  const [size, setSize] = useState({ width: 150, height: 50 }); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
      const existingOverlaysResponse = await axios.get('http://localhost:5000/overlays');
      const existingOverlays = existingOverlaysResponse.data;

      
      const newPositionY = existingOverlays.length * 60; 

      const response = await axios.post('http://localhost:5000/overlays', { 
        text, 
        logo_url: logoUrl, 
        position: { x: 10, y: newPositionY }, 
        size 
      });

      if (response.data) {
        console.log('Overlay added:', response.data);
        fetchOverlays(); 
      }
      
      
      setText(''); 
      setLogoUrl(''); 
      setSize({ width: 100, height: 50 }); 
    } catch (error) {
      console.error('Error adding overlay:', error.response?.data || error.message);
    }
  };

  return (
    <form className="overlay-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Overlay Text"
        className="overlay-input"
      />
      <input
        type="text"
        value={logoUrl}
        onChange={(e) => setLogoUrl(e.target.value)}
        placeholder="Logo URL"
        className="overlay-input"
      />
      <button type="submit" className="overlay-btn">Add Overlay</button>
    </form>
  );
};

const OverlayDisplay = ({ overlays, fetchOverlays }) => {
  const handleDelete = async (overlayId) => {
    try {
      await axios.delete(`http://localhost:5000/overlays/${overlayId}`);
      fetchOverlays(); 
      console.log(`Overlay ${overlayId} deleted successfully.`);
    } catch (error) {
      console.error('Error deleting overlay:', error.response?.data || error.message);
    }
  };

  return (
    <div className="overlay-container"> {/* Flex container for overlays */}
      {overlays.map((overlay) => (
        <div
          key={overlay._id}
          className="overlay"
        >
          <p>{overlay.text}</p>
          {overlay.logo_url ? (
            <img
              src={overlay.logo_url}
              alt="Overlay Logo"
              className="overlay-logo"
              style={{ maxWidth: '100%' }}
              onError={() => console.error(`Failed to load image at ${overlay.logo_url}`)}
            />
          ) : (
            <p>No logo available</p>
          )}
          <button onClick={() => handleDelete(overlay._id)} className="delete-button">
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};



export { OverlayForm, OverlayDisplay };