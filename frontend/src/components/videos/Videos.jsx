import React, { useRef, useState } from "react";
import VideoModal from "../videoModal/VideoModal"; // Import the VideoModal component
import "./Videos.css";
// import "./VideoModal.css";

const Videos = ({ searchQuery, videos }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentVideo, setCurrentVideo] = useState("");
  const [displayProperties, setDisplayProperties] = useState(
    sessionStorage.getItem("displayProperties") === "true"
  );
  const carouselRef = useRef(null);

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "80%",
      height: "80%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.75)",
    },
  };

  const openModal = (url) => {
    sessionStorage.setItem("currentVideo", url);
    setCurrentVideo(url);
    setModalIsOpen(true);

    if (!url) return;

    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        const reader = new FileReader();
        reader.onload = async (e) => {
          const binaryData = e.target.result;
          console.log(binaryData);
          await fetch("http://127.0.0.1:5000/api/upload-video", {
            method: "POST",
            headers: {
              "Content-Type": "application/octet-stream",
            },
            body: binaryData,
          })
            .then((response) => response.json())
            .then((data) => {
              console.log("Response from backend:", data);
            })
            .catch((error) => {
              console.log("Error:", error);
            });
        };
        reader.readAsArrayBuffer(blob);
      });
  };

  const closeModal = () => {
    setCurrentVideo("");
    setModalIsOpen(false);
  };

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: -200,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: 200,
        behavior: "smooth",
      });
    }
  };

  const handleDisplay = () => {
    setDisplayProperties(false);
    // sessionStorage.setItem("displayProperties", "true");
  };

  return (
    <div className="arrows-videos-container">
      <button className="videos-arrow-button-left" onClick={scrollLeft}>
        {"<"}
      </button>
      <div className="videos-container" ref={carouselRef}>
        {videos.map((video) => (
          <div
            key={video.title}
            onClick={() => {
              openModal(video.url);
              handleDisplay();
            }}
            className="video-thumbnail"
          >
            <div className="video-container">
              <video className="video-dimensions">
                <source src={video.url} title={video.title} />
              </video>
              <div className="video-title">{video.title}</div>
            </div>
          </div>
        ))}
      </div>
      <button className="videos-arrow-button-right" onClick={scrollRight}>
        {">"}
      </button>

      <VideoModal
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        customStyles={customStyles}
        currentVideo={currentVideo}
        displayProperties={displayProperties}
        handleDisplay={handleDisplay}
        setDisplayProperties={setDisplayProperties}
        setModalIsOpen={setModalIsOpen}
        setCurrentVideo={setCurrentVideo}
      />
    </div>
  );
};

export default Videos;
