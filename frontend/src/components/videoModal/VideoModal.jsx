import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import { IoMdCloudUpload } from "react-icons/io";
import { FaLongArrowAltRight } from "react-icons/fa";
// import "./VideoModal.css";
import "../videos/Videos.css";
// import axios from "axios";

const VideoModal = ({
  modalIsOpen,
  closeModal,
  customStyles,
  currentVideo,
  displayProperties,
  setDisplayProperties,
  setModalIsOpen,
  setCurrentVideo,
}) => {
  const [uploadedImages, setUploadedImages] = useState([
    "https://via.placeholder.com/150",
    "https://via.placeholder.com/150",
    "https://via.placeholder.com/150",
  ]);
  // const [postData, setPostData] = useState(null);
  // const [getData, setGetData] = useState(null);
  // const [postError, setPostError] = useState(null);
  // const [getError, setGetError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const handleOpenModal = () => {
      const lastVideo = sessionStorage.getItem("currentVideo");
      if (lastVideo) {
        setCurrentVideo(lastVideo);
        setModalIsOpen(true);
      }
    };

    window.addEventListener("openModal", handleOpenModal);
    return () => window.removeEventListener("openModal", handleOpenModal);
  }, [setModalIsOpen, setCurrentVideo]);

  // const handle3dTransform = () => {
  //   const fetchData = async () => {
  //     const YOUR_API_KEY = "msy_TkNc7NhGYzGDXXDWQh0BSxX2AZyj8o7XECuJ"; // Replace with your actual API key
  //     const headers = { Authorization: `Bearer ${YOUR_API_KEY}` };

  //     // Payload for POST request
  //     const payload = {
  //       image_url: "C:/Users/Prashanth/Pictures/IMG_5087.JPG", // Replace with your actual image URL
  //       enable_pbr: true,
  //     };

  //     try {
  //       // POST request
  //       const postResponse = await axios.post(
  //         "https://api.meshy.ai/v1/image-to-3d",
  //         payload,
  //         { headers }
  //       );
  //       setPostData(postResponse.data);
  //       const taskId = postResponse.data.task_id;
  //     } catch (error) {
  //       setPostError(error);
  //       console.log(error);
  //     }

  //     // Task ID for GET request
  //     // const taskId = "018a210d-8ba4-705c-b111-1f1776f7f578";

  //     try {
  //       // GET request
  //       const getResponse = await axios.get(
  //         `https://api.meshy.ai/v1/image-to-3d/${taskId}`,
  //         { headers }
  //       );
  //       setGetData(getResponse.data);
  //     } catch (error) {
  //       setGetError(error);
  //       console.error("GET request error:", error);
  //     }
  //   };

  //   fetchData();
  // };

  const handleAllDisplay = () => {
    setDisplayProperties(true);
    sessionStorage.setItem("displayProperties", "true");
  };

  const handleRenderClick = () => {
    navigate("/confirm-to-save", { state: { video: currentVideo } });
  };

  const handleImageUpload = (event, index) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUploadedImages((prevImages) => {
          const newImages = [...prevImages];
          newImages[index] = reader.result;
          return newImages;
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Video Modal"
    >
      <button className="close-button" onClick={closeModal}>
        Close
      </button>
      <div className="video-images-container">
        <video
          controls
          // autoPlay
          className={
            displayProperties ? "video-player" : "initial-video-player"
          }
        >
          <source src={currentVideo} type="video/mp4" />
        </video>
        <div
          className={
            displayProperties ? "images-container" : "initial-images-container"
          }
        >
          <div>
            <label htmlFor="upload-image1" className="upload-label">
              Upload your image <IoMdCloudUpload />
            </label>
            <input
              type="file"
              id="upload-image1"
              style={{ display: "none" }}
              onChange={(e) => handleImageUpload(e, 0)}
            />
          </div>
          <div className="image-and-input-element d3-image">
            <img src={uploadedImages[0]} alt="image1" />
            <div style={{ position: "relative", display: "inline-block" }}>
              <FaLongArrowAltRight
                style={{
                  fontSize: "100px",
                  color: "#5851d3",
                  margin: "0 20px 0 20px",
                }}
                // onClick={handle3dTransform}
              />
              <span
                style={{
                  position: "absolute",
                  top: "48%",
                  left: "45%",
                  transform: "translate(-50%, -50%)",
                  color: "#ffffff",
                  fontSize: "8px",
                  fontWeight: "bold",
                }}
              >
                Transform to 3D
              </span>
            </div>
            <img src="https://via.placeholder.com/150" alt="image2" />
          </div>
        </div>
      </div>
      <button
        className={
          displayProperties
            ? "initial-want-to-transform-button"
            : "want-to-transform-button"
        }
        onClick={handleAllDisplay}
      >
        Want to replace your kid in this video?
      </button>
      <div
        className={
          displayProperties
            ? "select-characters-and-render"
            : "initial-select-characters-and-render"
        }
      >
        <hr style={{ width: "280%", marginTop: "20px" }} />
        <p className="select-any-char-text">
          Select any character below to replace
        </p>
        <div className="image-and-input-element">
          <img src="https://via.placeholder.com/150" alt="image1" />
          <img src="https://via.placeholder.com/150" alt="image2" />
          <img src="https://via.placeholder.com/150" alt="image3" />
        </div>
        <button
          className="submit-btn"
          style={{ marginTop: "10px" }}
          onClick={handleRenderClick}
        >
          Render
        </button>
      </div>
    </Modal>
  );
};

export default VideoModal;
