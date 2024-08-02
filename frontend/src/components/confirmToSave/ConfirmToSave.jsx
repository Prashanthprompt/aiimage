import React from "react";
import "./ConfirmToSave.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useVideoContext } from "../../VideoContext.jsx";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ConfirmToSave = ({ videos }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const video = location.state?.video || {};
  const { addVideo } = useVideoContext();

  const handleSave = () => {
    if (video) {
      addVideo({ url: video, title: "Saved Video" });
    }
    toast.success("Saved Successfully!");
    navigate("/saved-videos");
  };

  const handleReTransform = () => {
    navigate("/");
    setTimeout(() => {
      const event = new Event("openModal");
      window.dispatchEvent(event);
    }, 0);
  };

  return (
    <div className="confirm-to-save-main-container">
      <p className="confirm-to-save-title">Enjoy your kid in Action</p>
      <video className="confirm-to-save-video-dimensions" controls>
        <source src={video} type="video/mp4" />
      </video>
      <div className="confirm-to-save-buttons-container">
        <button className="confirm-to-save-btn" onClick={handleSave}>
          Save
        </button>
        <button
          className="confirm-to-save-btn btn-2"
          onClick={handleReTransform}
        >
          Re-Transform
        </button>
      </div>
    </div>
  );
};

export default ConfirmToSave;
