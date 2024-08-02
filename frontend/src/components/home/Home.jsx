import React, { useEffect, useRef, useState } from "react";
import "./Home.css";

const Home = () => {
  const [videoSrc, setVideoSrc] = useState(null);
  const [uploading, setUploading] = useState(false);
  const videoRef = useRef(null);

  const handleVideoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploading(true);
      const reader = new FileReader();
      reader.onload = (e) => {
        setVideoSrc(e.target.result);
        setUploading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, [videoSrc]);

  return (
    <div className="home-container">
      {uploading && <p className="uploading-text">Uploading...</p>}
      {!uploading && (
        <video controls className="video-customs" ref={videoRef}>
          <source src={videoSrc ? videoSrc : ""} type="video/mp4" />
        </video>
      )}
      <div className="upload-btns-container">
        <div>
          <label htmlFor="upload-video" className="upload-label">
            Upload Video
          </label>
          <input
            id="upload-video"
            type="file"
            accept="video/*"
            onChange={handleVideoUpload}
            style={{ display: "none" }}
          />
        </div>
        <div>
          <label htmlFor="upload-image" className="upload-label">
            Upload Image
          </label>
          <input id="upload-image" type="file" style={{ display: "none" }} />
        </div>
      </div>
    </div>
  );
};

export default Home;
