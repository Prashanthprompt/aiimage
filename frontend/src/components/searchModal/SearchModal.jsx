import React, { useState, useEffect } from "react";
import Modal from "react-modal";
// import { IoMdCloudUpload } from "react-icons/io";
// import { FaLongArrowAltRight } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
import VideoModal from "../videoModal/VideoModal";
import "./SearchModal.css";
import "../videos/Videos.css";

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
    justifyContent: "flex-start",
    position: "relative",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.75)",
  },
};

const customInnerModalStyles = {
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

const SearchModal = ({
  isSearchModalOpen,
  closeSearchModal,
  handleSearch,
  searchQuery,
  videos,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentVideo, setCurrentVideo] = useState("");
  const [displayProperties, setDisplayProperties] = useState(false);

  const openModal = (url) => {
    setCurrentVideo(url);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setCurrentVideo("");
    setIsModalOpen(false);
  };

  const filteredVideos = videos.filter((video) =>
    video.title.toLowerCase().includes(searchQuery)
  );

  return (
    <Modal
      isOpen={isSearchModalOpen}
      onRequestClose={closeSearchModal}
      style={customStyles}
      contentLabel="Search Modal"
    >
      <button className="search-close-button" onClick={closeSearchModal}>
        Close
      </button>
      <input
        type="text"
        className="search-input-modal"
        placeholder="Search..."
        onChange={(e) => handleSearch(e.target.value)}
      />
      <div className="search-results">
        {filteredVideos.map((video) => (
          <div
            key={video.title}
            className="search-video-thumbnail"
            onClick={() => openModal(video.url)}
          >
            <div className="video-container">
              <video className="search-video-dimensions">
                <source src={video.url} title={video.title} />
              </video>
              <div className="video-title">{video.title}</div>
            </div>
          </div>
        ))}
      </div>
      {isModalOpen && (
        <VideoModal
          modalIsOpen={isModalOpen}
          closeModal={closeModal}
          customStyles={customInnerModalStyles}
          currentVideo={currentVideo}
          displayProperties={displayProperties}
          setDisplayProperties={setDisplayProperties}
        />
      )}
    </Modal>
  );
};

export default SearchModal;
