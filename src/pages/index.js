import { useEffect, useRef, useState } from "react";
import ShortVideo from "../components/ShortVideo";

const videos = [
  { src: "/videos/video1.mp4", title: "Video 1" },
  { src: "/videos/video2.mp4", title: "Video 2" },
];

const Home = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const videoRefs = useRef([]);

  const handleVideoInView = (index) => {
    setActiveIndex(index);
  };

  useEffect(() => {
    if (videoRefs.current[activeIndex]) {
      videoRefs.current[activeIndex].play();
    }
    return () => {
      if (videoRefs.current[activeIndex]) {
        videoRefs.current[activeIndex].pause();
      }
    };
  }, [activeIndex]);

  return (
    <div className="flex flex-col gap-4">
      {videos.map((video, index) => (
        <div key={index} className="relative  max-w-xl mx-auto">
          <ShortVideo
            ref={(el) => (videoRefs.current[index] = el)}
            src={video.src}
            title={video.title}
            onInView={() => handleVideoInView(index)}
          />
        </div>
      ))}
    </div>
  );
};

export default Home;
