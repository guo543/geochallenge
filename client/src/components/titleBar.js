import React from "react";
import "./titleBar.css";
import { useNavigate } from "react-router-dom";

export default function TitleBar() {
    const navigate = useNavigate();
    return (
        <section className="titlebar-parent">
            <p className="title-text" style={{ color: "white", fontSize: 24, fontWeight: 'bold'}}>
              GeoChallenge
            </p>
            <div className="button-group">
              <button className="home-button" style={{fontWeight: 'bold'}} onClick={() => navigate("/")}>
                Home
              </button>
              <button className="leaderboard-button" style={{fontWeight: 'bold'}} onClick={() => navigate("/leaderboardPage")}>
                LeaderBoard
              </button>
              <button className="upload-button" style={{fontWeight: 'bold'}} onClick={() => navigate("/uploadPage")}>
                Upload
              </button>
              <button className="profile-button" style={{fontWeight: 'bold'}} onClick={() => navigate("/profilePage")}>
                Profile
              </button>
    
            </div>
          </section>)
}