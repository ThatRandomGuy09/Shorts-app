import { useState, useRef, useEffect } from "react";

const VideoControls = ({ videoRef }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const intervalRef = useRef();

  useEffect(() => {
    const video = videoRef.current;

    const handlePlayPause = () => {
      if (video.paused) {
        video.play();
        setIsPlaying(true);
      } else {
        video.pause();
        setIsPlaying(false);
      }
    };

    const handleTimeUpdate = () => {
      const currentTime = video.currentTime;
      const duration = video.duration;
      const progress = (currentTime / duration) * 100;

      setCurrentTime(currentTime);
      setDuration(duration);
      setProgress(progress);
    };

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("loadedmetadata", handleLoadedMetadata);

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, [videoRef]);

  const togglePlayPause = () => {
    const video = videoRef.current;
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
    setIsPlaying((prevState) => !prevState);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  return (
    <div className="absolute bottom-0 left-0 right-0 flex justify-between items-center p-4  text-white">
      <button onClick={togglePlayPause} className="focus:outline-none"></button>
      <div className="flex items-center">
        <span className="mr-2">{formatTime(currentTime)}</span>
        <input
          type="range"
          value={progress}
          step="any"
          className="w-32 mr-2"
          onChange={(e) => {
            const newTime = (e.target.value / 100) * duration;
            videoRef.current.currentTime = newTime;
            setProgress(e.target.value);
          }}
        />
        <span>{formatTime(duration)}</span>
      </div>
    </div>
  );
};

export default VideoControls;
