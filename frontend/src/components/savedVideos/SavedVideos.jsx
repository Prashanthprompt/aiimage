import React from "react";
import { useVideoContext } from "../../VideoContext.jsx";
import "./SavedVideos.css";

const SavedVideos = () => {
  const { savedVideos } = useVideoContext();
  // const video = videos[0];

  console.log(savedVideos[0]);

  return (
    <div className="savedvideos-main-container">
      <div className="savedvideos-left-panel-container">
        <p className="left-panel-title">Saved Videos</p>
        <div className="left-videos-container">
          {savedVideos.map((video, index) => (
            <video className="left-video-dimension" key={index}>
              <source src={video.url} title={video.title} />
            </video>
          ))}
        </div>
      </div>
      <div className="savedvideos-right-panel-container">
        {savedVideos.length > 0 ? (
          <>
            <p className="right-panel-title">Enjoy your kid in Action</p>
            <div className="right-video-container">
              <video className="right-video-dimension" controls>
                <source
                  src={savedVideos[0]?.url}
                  title={savedVideos[0]?.title}
                  type="video/mp4"
                />
              </video>
            </div>
          </>
        ) : (
          <h2>No Saved Videos</h2>
        )}
      </div>
    </div>
  );
};

export default SavedVideos;
