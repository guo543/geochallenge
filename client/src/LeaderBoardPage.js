import React from "react";
import "./MainPage.css";

const MainPage = () => {
  const handleStartClick = () => {};
  return (
    <div className="main-page-container">
      <div className="middle-container">
        <div className="left-side">
          <h3 style={{ color: "#C2B04A", fontSize: 30 }}>
            The Ultimate Purdue Geography Gaming
          </h3>
          <p style={{ color: "white", fontSize: 17 }}>
            This will be the leaderboard page.
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
