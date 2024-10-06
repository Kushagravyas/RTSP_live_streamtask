import React, { useState, useEffect } from 'react';
import axios from 'axios';
import VideoPlayer from './components/VideoPlayer';
import OverlayForm from './components/OverlayForm';
import OverlayList from './components/OverlayList';

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
    <div className="App">
      <h1>Livestream with Overlays</h1>
      <VideoPlayer />
      <OverlayForm fetchOverlays={fetchOverlays} />
      <OverlayList overlays={overlays} fetchOverlays={fetchOverlays} />
    </div>
  );
};

export default App;
