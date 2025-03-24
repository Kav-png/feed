import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";

const NewsBanner = ({ newsItems }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Automatically rotate news every 5 seconds if not paused
  useEffect(() => {
    if (newsItems.length > 0 && !isPaused) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % newsItems.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [newsItems, isPaused]);

  // Navigate to the previous news item
  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? newsItems.length - 1 : prevIndex - 1
    );
  };

  // Navigate to the next news item
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % newsItems.length);
  };

  // Toggle pause/play
  const togglePause = () => {
    setIsPaused((prev) => !prev);
  };

  return (
    <div className="bg-blue-100 text-blue-900 p-4 flex items-center justify-between shadow-md">
      {newsItems.length > 0 ? (
        <>
          <button
            onClick={handlePrev}
            className="text-blue-700 hover:text-blue-900"
          >
            <ChevronLeft size={24} />
          </button>
          <div className="flex-1 text-center font-medium">
            {newsItems[currentIndex]}
          </div>
          <button
            onClick={handleNext}
            className="text-blue-700 hover:text-blue-900"
          >
            <ChevronRight size={24} />
          </button>
          <button
            onClick={togglePause}
            className="ml-4 text-blue-700 hover:text-blue-900"
          >
            {isPaused ? <Play size={24} /> : <Pause size={24} />}
          </button>
        </>
      ) : (
        <div className="flex-1 text-center font-medium">No news available</div>
      )}
    </div>
  );
};

export default NewsBanner;
