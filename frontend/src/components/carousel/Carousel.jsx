import React, { useState } from "react";
// import { FaPlay } from "react-icons/fa";
import "./Carousel.css";

const Carousel = ({ videos }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % videos.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + videos.length) % videos.length
    );
  };

  return (
    <div>
      <div className="carousel-container">
        <div className="carousel-item active">
          <video
            autoPlay
            loop
            muted
            className="carousel-video"
            key={currentIndex}
          >
            <source src={videos[currentIndex].url} type="video/mp4" />
          </video>
          <div className="carousel-text">
            <h2>{videos[currentIndex].title}</h2>
            <br />
            <p>{videos[currentIndex].description}</p>
          </div>
        </div>
      </div>
      {/* <button className="carousel-play-button">
        <FaPlay />
      </button> */}
      <div className="carousel-video-thumbnails-container">
        <button onClick={handlePrev} className="arrow-button">
          ←
        </button>
        <div
          style={{
            overflowX: "hidden",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {videos.map((video, index) => (
            <div
              key={index}
              className={`thumbnail ${index === currentIndex ? "active" : ""}`}
            >
              <video width="120" muted>
                <source src={video.url} />
              </video>
            </div>
          ))}
        </div>
        <button onClick={handleNext} className="arrow-button">
          →
        </button>
      </div>
    </div>
  );
};

export default Carousel;
