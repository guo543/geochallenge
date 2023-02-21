import React, {useState} from "react";
import { useNavigate } from "react-router-dom";

import "./MainPage.css";

import TitleBar from "./components/titleBar.js";
import GuestEnterGameModal from "./components/guestEnterGameModal";

const MainPage = () => {
  
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false)

  const handleStartClick = () => {
    if (localStorage.getItem("userCredentials") === null) {
      setOpenModal(true);
    } else {
      navigate("/gamePage");
    }
  };

  return (
    <div className="main-page-container">
      {openModal && <GuestEnterGameModal closeModal={setOpenModal}/>}

      <TitleBar />
      <div className="middle-container">
        <div className="left-side">
          <h3 style={{ color: "#C2B04A", fontSize: 30 }}>
            The Ultimate Purdue Geography Gaming
          </h3>
          <p style={{ color: "white", fontSize: 17 }}>
            Test your knowledge and explore the world with Purdue's street view
            and in door pictures. Navigate the map, find clues, and guess your
            location. Join now and see how well you know the Purdue campus!
          </p>
          <button className="start-button" onClick={handleStartClick}>
            Start
          </button>
        </div>
        <div className="right-side">
          <img
            className="purdue-campus"
            src={require("./assets/Purdue Campus.jpg")}
            alt="Purdue Campus"
          />
          <div className="contact">
            <h3 style={{ color: "#F2ECEC", fontSize: 24 }}>Contact us</h3>
            <div className="icon-container">
              <img
                className="clickable-icon"
                src={require("./assets/reddit.png")}
                alt="Purdue Campus"
              />
              <img
                className="clickable-icon"
                src={require("./assets/discord.png")}
                alt="Purdue Campus"
              />
              <img
                className="clickable-icon"
                src={require("./assets/twitter.png")}
                alt="Purdue Campus"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;