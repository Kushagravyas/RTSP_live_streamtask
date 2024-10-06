import React, { useRef } from 'react';

const VideoPlayer = () => {
  const videoRef = useRef(null);

  const startStream = () => {
    if (videoRef.current) {
      videoRef.current.src = 'rtsp://your-rtsp-url';  // Replace with your RTSP stream
      videoRef.current.play();
    }
  };

  return (
    <div>
      <video ref={videoRef} controls width="600">
        <source src="" type="video/mp4" />
      </video>
      <button onClick={startStream}>Start Stream</button>
    </div>
  );
};

export default VideoPlayer;
