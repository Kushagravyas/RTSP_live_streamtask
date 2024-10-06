import React, { useState, useEffect } from 'react';
import axios from 'axios';
import VideoPlayer from './components/VideoPlayer';
import OverlayForm from './components/OverlayForm';
import OverlayList from './components/OverlayList';
import './App.css'; // Import the CSS file

const App = () => {
  const [overlays, setOverlays] = useState([]);

  const fetchOverlays = async () => {
    const response = await axios.get('http://localhost:5000/overlays');
    setOverlays(response.data);
  };

  useEffect(() => {
    fetchOverlays();
  }, []);

  return (
    <div className="App"> {/* Add App class */}
      <h1 style={{textAlign:"center"}}>Livestream with Overlays</h1>

      {/* Video player */}
      <VideoPlayer />

      {/* Overlay elements */}
      {overlays.map((overlay) => (
        <div
          key={overlay._id}
          className="overlay" // Apply overlay class
          style={{
            top: `${overlay.position.y}px`,
            left: `${overlay.position.x}px`,
            width: `${overlay.size.width}px`,
            height: `${overlay.size.height}px`
          }}
        >
          <p>{overlay.text}</p>
          {overlay.logo_url && <img src={overlay.logo_url} alt="Overlay Logo" className="overlay-logo" />} {/* Add overlay-logo class */}
        </div>
      ))}

      {/* Overlay management */}
      <OverlayForm fetchOverlays={fetchOverlays} />
      <OverlayList overlays={overlays} fetchOverlays={fetchOverlays} />
    </div>
  );
};

export default App;
