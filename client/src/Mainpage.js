import React from "react";
import { useNavigate } from "react-router-dom";

import "./MainPage.css";

import TitleBar from "./components/titleBar.js";

const MainPage = () => {
  const navigate = useNavigate();

  return (
    <div className="main-page-container">
      <TitleBar />
      <div className="content">

        <div className="left-part">
          <div className="left-part-conent">
            <h3>The Ultimate Purdue Geography Gaming</h3>
            <p>
              Test your knowledge and explore the world with Purdue's street view
              and indoor pictures. Navigate the map, find clues, and guess your
              location. Join now and see how well you know the Purdue campus!
            </p>
            <button className="start-button" onClick={() => navigate("/gamePage")}>
              Start
            </button>
            {localStorage.getItem("userCredentials") !== null && (
              <button
                className="start-button"
                onClick={() => navigate("/uploadPage")}
              >
                Upload Pictures for GeoChallenge
              </button>
            )}
          </div>
        </div>
        <div className="right-part">
          <img
            className="purdue-campus"
            src={require("./assets/Purdue Campus.jpg")}
            alt="Purdue Campus"
          />
          <div className="contact">
          <p>
             Contact Us
            </p>
          <img
                className="clickable-icon"
                src={require("./assets/reddit.png")}
                alt="Reddit"
              />
              <img
                className="clickable-icon"
                src={require("./assets/discord.png")}
                alt="Discord"
              />
              <img
                className="clickable-icon"
                src={require("./assets/twitter.png")}
                alt="Twitter"
              />
          </div>
          
        </div>

      </div>
    </div>
  );
};

export default MainPage;
