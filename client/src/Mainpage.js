import React from "react";
import "./MainPage.css";
import { useNavigate } from "react-router-dom";
import TitleBar from './titleBar.js'

const MainPage = () => {
  const navigate = useNavigate();
  const handleStartClick = () => {
    navigate("/gamePage")
  };

  return (
    <div className="main-page-container">
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
        </div>
      </div>
    </div>
  );
};

export default MainPage;
