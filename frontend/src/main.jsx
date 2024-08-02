import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Modal from "react-modal";
import { ToastContainer } from "react-toastify";
import { VideoProvider } from "./VideoContext.jsx";

Modal.setAppElement("#root");

ReactDOM.createRoot(document.getElementById("root")).render(
  <VideoProvider>
    <App />
    <ToastContainer autoClose={1500} />
  </VideoProvider>
);
