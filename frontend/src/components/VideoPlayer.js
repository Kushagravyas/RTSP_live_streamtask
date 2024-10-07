import React, { useState } from 'react';
import '../App.css';

const VideoPlayer = () => {
  const [volume, setVolume] = useState(1);

  const handleVolumeChange = (e) => {
    setVolume(e.target.value);
  };

  return (
    <div className="video-container">
       <iframe
        width="640"
        height="480"
        src="https://rtsp.me/embed/65ydBEbb/"
        frameBorder="0"
        allowFullScreen
        title="RTSP Stream"
        className="stream-iframe"
      ></iframe>
      <p align="right">
        powered by{' '}
        <a
          href="https://rtsp.me"
          title="RTSP.ME - Free website RTSP video streaming service"
          target="_blank"
          rel="noopener noreferrer"
        >
          rtsp.me
        </a>
      </p>
      <div className="volume-control">
        <label htmlFor="volume">Volume: </label>
        <select id="volume" value={volume} onChange={handleVolumeChange}>
          <option value="0">Mute</option>
          <option value="0.5">50%</option>
          <option value="1">100%</option>
        </select>
      </div>
    </div>
  );
};

export default VideoPlayer;
