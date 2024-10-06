import React from 'react';
import '../App.css';

const VideoPlayer = () => {
  return (
    <div className="video-container"> {/* Apply video-container class */}
      {/* Embed the iframe from RTSP.me */}
      <iframe
        width="640"
        height="480"
        src="https://rtsp.me/embed/65ydBEbb/"
        frameBorder="0"
        allowFullScreen
        title="RTSP Stream"
        className="stream-iframe" // Apply class for iframe
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
    </div>
  );
};

export default VideoPlayer;