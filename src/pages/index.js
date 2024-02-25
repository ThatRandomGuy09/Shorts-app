import { useEffect, useRef, useState } from "react";
import ShortVideo from "../components/ShortVideo";
import Navbar from "@/components/NavBar";

const videos = [
  { src: "/videos/video1.mp4", title: "Mountains" },
  { src: "/videos/video2.mp4", title: "People going on a Trek" },
];

const Home = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const videoRefs = useRef([]);

  const handleVideoInView = (index) => {
    setActiveIndex(index);
  };

  useEffect(() => {
    if (videoRefs.current[activeIndex]) {
      videoRefs.current[activeIndex].current.play();
    }
    return () => {
      if (videoRefs.current[activeIndex]) {
        videoRefs.current[activeIndex].current.pause();
      }
    };
  }, [activeIndex]);

  return (
    <div className="flex flex-col gap-4">
      <Navbar />
      {videos.map((video, index) => (
        <div key={index} className="relative max-w-xl mx-auto">
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
