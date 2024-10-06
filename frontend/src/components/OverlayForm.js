import React, { useState } from 'react';
import axios from 'axios';
import '../App.css'; // Import the CSS file

const OverlayForm = ({ fetchOverlays }) => {
  const [text, setText] = useState('');
  const [logoUrl, setLogoUrl] = useState('');
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [size, setSize] = useState({ width: 100, height: 50 });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/overlays', { text, logo_url: logoUrl, position, size });
    fetchOverlays();
  };

  return (
    <form className="overlay-form" onSubmit={handleSubmit}> {/* Add overlay-form class */}
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Overlay Text"
        className="overlay-input" // Add class
      />
      <input
        type="text"
        value={logoUrl}
        onChange={(e) => setLogoUrl(e.target.value)}
        placeholder="Logo URL"
        className="overlay-input" // Add class
      />
      <button type="submit" className="overlay-btn">Add Overlay</button> {/* Add overlay-btn class */}
    </form>
  );
};

export default OverlayForm;
