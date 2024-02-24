import { useRef, useEffect, useState } from 'react';
import VideoControls from './VideoControls';


const ShortVideo = ({ src, title }) => {
  const videoRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    };

    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
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
    if (isVisible) {
      video.play();
    } else {
      video.pause();
    }
  }, [isVisible]);

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

  return (
    <div className="relative">
      <video ref={videoRef} src={src} className="w-full h-auto object-cover" loop muted playsInline />
      <VideoControls videoRef={videoRef} duration={duration} />
   
    </div>
  );
};

export default ShortVideo;
