import React, { useRef, useState, useEffect } from 'react';


const ShortVideo = ({ src, title }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const videoRef = useRef(null);

  const togglePlayPause = () => {
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const updateTime = () => {
    setCurrentTime(videoRef.current.currentTime);
    setDuration(videoRef.current.duration);
  };

  useEffect(() => {
    videoRef.current.addEventListener('timeupdate', updateTime);
    return () => {
      videoRef.current.removeEventListener('timeupdate', updateTime);
    };
  }, []);

  return (
    <div className="relative">
      <video
        ref={videoRef}
        src={src}
        className="w-full h-auto object-cover"
        loop
        muted
        playsInline
      />
     
    </div>
  );
};

export default ShortVideo;
