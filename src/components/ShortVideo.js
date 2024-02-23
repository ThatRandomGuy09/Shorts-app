import { useEffect, useRef, useState } from "react";

const ShortVideo = ({ src, title }) => {
  const [isVisible, setIsVisible] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        setIsVisible(entry.isIntersecting);
      });
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
    if (isVisible) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  }, [isVisible]);

  return (
    <div className="relative w-367 h-653 overflow-hidden">
      <video
        ref={videoRef}
        src={src}
        className="w-full h-auto object-cover"
        loop
        muted
        playsInline
      />
      <p className="absolute bottom-0 left-0 right-0 bg-black text-white px-2 py-1 text-sm">
        {title}
      </p>
    </div>
  );
};

export default ShortVideo;