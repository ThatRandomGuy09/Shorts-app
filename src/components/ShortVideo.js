import { useRef, useEffect, useState } from 'react';
import VideoControls from './VideoControls';

const ShortVideo = ({ src, title }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true); // Autoplay initially
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const video = videoRef.current;

    if (isPlaying) {
      video.play();
    } else {
      video.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    };

    const observer = new IntersectionObserver(([entry]) => {
      setIsPlaying(entry.isIntersecting);
    }, options);

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    const handleLoadedMetadata = () => {
      setDuration(video.duration);
    };
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, []);

  const togglePlayPause = () => {
    setIsPlaying((prevState) => !prevState);
  };

  return (
    <div className="relative">
      <video ref={videoRef} src={src} className="w-full h-auto object-cover" loop muted playsInline />
      <button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-2" onClick={togglePlayPause}>
        {isPlaying ? (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>
      <VideoControls videoRef={videoRef} duration={duration} />
    </div>
  );
};

export default ShortVideo;
