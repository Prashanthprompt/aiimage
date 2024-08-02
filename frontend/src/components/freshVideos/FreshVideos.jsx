import React, { useState } from "react";
import Modal from "react-modal";
import { IoMdCloudUpload } from "react-icons/io";
import { FaLongArrowAltRight } from "react-icons/fa";
import VideoModal from "../videoModal/VideoModal";
import "./FreshVideos.css";

const customFreshVideosStyles = {
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

const FreshVideos = ({ videos }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentVideo, setCurrentVideo] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [displayProperties, setDisplayProperties] = useState(false);

  const openModal = (url) => {
    setCurrentVideo(url);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setCurrentVideo("");
    setIsModalOpen(false);
  };

  const filteredVideos = selectedLanguage
    ? videos.filter((video) => video.lang === selectedLanguage)
    : videos;

  return (
    <div style={{ background: "#000" }}>
      <h3 className="fresh-videos-header">FreshVideos</h3>
      <div className="language-buttons">
        <button onClick={() => setSelectedLanguage("")}>All</button>
        <button onClick={() => setSelectedLanguage("telugu")}>Telugu</button>
        <button onClick={() => setSelectedLanguage("hindi")}>Hindi</button>
        <button onClick={() => setSelectedLanguage("english")}>English</button>
      </div>
      <div className="fresh-videos-display-container">
        {filteredVideos.map((video) => (
          <div
            key={video.title}
            className="fresh-videos-thumbnail"
            onClick={() => openModal(video.url)}
          >
            <div className="fresh-videos-video-container">
              <video className="fresh-videos-video-dimensions">
                <source src={video.url} title={video.title} />
              </video>
            </div>
          </div>
        ))}
        <VideoModal
          modalIsOpen={isModalOpen}
          closeModal={closeModal}
          customStyles={customFreshVideosStyles}
          currentVideo={currentVideo}
          displayProperties={displayProperties}
          setDisplayProperties={setDisplayProperties}
          setModalIsOpen={setIsModalOpen}
          setCurrentVideo={setCurrentVideo}
        />
      </div>
    </div>
  );
};

export default FreshVideos;
