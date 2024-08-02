import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Videos from "./components/videos/Videos";
import Carousel from "./components/carousel/Carousel";
import SearchModal from "./components/searchModal/SearchModal";
import FreshVideos from "./components/freshVideos/FreshVideos";
import SavedVideos from "./components/savedVideos/SavedVideos";
import ConfirmToSave from "./components/confirmToSave/ConfirmToSave";
import Login from "./components/login/Login";
import video1 from "./assets/video1.mp4";
import video2 from "./assets/video2.mp4";

const videos = [
  {
    title: "Clap",
    url: video1,
    description: "Lorem ipsum",
    lang: "english",
  },
  {
    title: "Numbers",
    url: video2,
    description: "Lorem ipsum",
    lang: "english",
  },
];

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [loginStatus, setLoginStatus] = useState(
    sessionStorage.getItem("loginStatus") === "true"
  );

  useEffect(() => {
    sessionStorage.setItem("loginStatus", loginStatus);
  }, [loginStatus]);

  const handleSearch = (query) => {
    setSearchQuery(query.toLowerCase());
  };

  const openSearchModal = () => {
    setIsSearchModalOpen(true);
  };

  const closeSearchModal = () => {
    setIsSearchModalOpen(false);
  };

  return (
    <Router>
      <Navbar
        handleSearch={handleSearch}
        openSearchModal={openSearchModal}
        loginStatus={loginStatus}
        setLoginStatus={setLoginStatus}
      />
      <Routes>
        {!loginStatus ? (
          <Route path="*" element={<Navigate to="/login" replace />} />
        ) : (
          <>
            <Route
              path="/"
              element={
                <>
                  <Carousel videos={videos} />
                  <h3
                    style={{
                      paddingTop: "10px",
                      paddingLeft: "15px",
                      fontFamily: `"Nunito", sans-serif`,
                      background: "#000",
                      color: "#f2f2f2",
                    }}
                  >
                    Recently Played
                  </h3>
                  <Videos searchQuery={searchQuery} videos={videos} />
                  <SearchModal
                    isSearchModalOpen={isSearchModalOpen}
                    closeSearchModal={closeSearchModal}
                    handleSearch={handleSearch}
                    searchQuery={searchQuery}
                    videos={videos}
                  />
                  <FreshVideos videos={videos} />
                </>
              }
            />
            <Route
              path="/saved-videos"
              element={<SavedVideos videos={videos} />}
            />
            <Route
              path="/confirm-to-save"
              element={<ConfirmToSave videos={videos} />}
            />
          </>
        )}
        <Route
          path="/login"
          element={<Login setLoginStatus={setLoginStatus} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
