import React, { useState, useEffect } from 'react';
import axios from 'axios';
import VideoPlayer from './components/VideoPlayer';
import { OverlayForm, OverlayDisplay } from './components/OverlayForm'; // Adjust the import path as needed
import './App.css'; // Import the CSS file

const App = () => {
  const [overlays, setOverlays] = useState([]);

  const fetchOverlays = async () => {
    try {
      const response = await axios.get('http://localhost:5000/overlays');
      setOverlays(response.data);
    } catch (error) {
      console.error('Error fetching overlays:', error);
    }
  };

  useEffect(() => {
    fetchOverlays();
  }, []);

  return (
    <div className="App">
      <h1 style={{ textAlign: "center" }}>Livestream with Overlays</h1>

      {/* Video player */}
      <VideoPlayer />

      {/* Overlay management */}
      <OverlayForm fetchOverlays={fetchOverlays} />

      {/* Overlay elements */}
      <OverlayDisplay overlays={overlays} fetchOverlays={fetchOverlays} />
    </div>
  );
};

export default App;
