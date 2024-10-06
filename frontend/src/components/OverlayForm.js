import React, { useState } from 'react';
import axios from 'axios';

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
    <form onSubmit={handleSubmit}>
      <input type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="Overlay Text" />
      <input type="text" value={logoUrl} onChange={(e) => setLogoUrl(e.target.value)} placeholder="Logo URL" />
      <button type="submit">Add Overlay</button>
    </form>
  );
};

export default OverlayForm;
