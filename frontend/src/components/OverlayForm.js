import React, { useState } from 'react';
import axios from 'axios';
import '../App.css'; // Import the CSS file

const OverlayForm = ({ fetchOverlays }) => {
  // Pre-fill with test values
  const [text, setText] = useState('Test Overlay Text');
  const [logoUrl, setLogoUrl] = useState('https://via.placeholder.com/150'); // Use a valid placeholder image URL
  const [position, setPosition] = useState({ x: 10, y: 20 }); // Sample position
  const [size, setSize] = useState({ width: 150, height: 50 }); // Sample size

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/overlays', { 
        text, 
        logo_url: logoUrl, 
        position, 
        size 
      });

      if (response.data) {
        console.log('Overlay added:', response.data);
        fetchOverlays(); // Refresh overlays after adding
      }
      
      // Reset the form after submission
      setText(''); // Clear the text input
      setLogoUrl(''); // Clear the logo URL input
      setPosition({ x: 0, y: 0 }); // Reset position
      setSize({ width: 100, height: 50 }); // Reset size
    } catch (error) {
      console.error('Error adding overlay:', error.response?.data || error.message);
    }
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
