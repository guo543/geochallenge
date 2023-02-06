import React from "react";
import "./MainPage.css";

const MainPage = () => {
  return (
    <div className="main-page-container">
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
          <button className="start-button">Start</button>
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
