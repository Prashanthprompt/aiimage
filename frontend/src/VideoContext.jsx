import React, { createContext, useState, useContext } from "react";

const VideoContext = createContext();

export const VideoProvider = ({ children }) => {
  const [savedVideos, setSavedVideos] = useState(() => {
    const storedVideos = localStorage.getItem("savedVideos");
    return storedVideos ? JSON.parse(storedVideos) : [];
  });

  const addVideo = (video) => {
    setSavedVideos((prevVideos) => {
      const updatedVideos = [...prevVideos, video];
      localStorage.setItem("savedVideos", JSON.stringify(updatedVideos));
      return updatedVideos;
    });
  };

  const clearSavedVideos = () => {
    setSavedVideos([]);
    sessionStorage.removeItem("savedVideos");
  };

  return (
    <VideoContext.Provider
      value={{ savedVideos, addVideo, setSavedVideos, clearSavedVideos }}
    >
      {children}
    </VideoContext.Provider>
  );
};

export const useVideoContext = () => useContext(VideoContext);
