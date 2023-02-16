import React, { useState } from "react";
import './Game.css';
import Map from './Map'
import StreetView from './StreetView'
import "../MainPage.css";


function GamePage() {
    const [ showGame, setShowGame ] = useState(false);
    const handleStartClick = () => { setShowGame(true)};

    return (
        <div className="main-page-container">
            <div className="middle-container">
                <div className="left-side">
                    <h3 style={{ color: "#C2B04A", fontSize: 30 }}>
                    The Ultimate Purdue Geography Gaming
                    </h3>
                    <button className="start-button" onClick={handleStartClick}>
                    Start
                    </button>
                </div>
                <div className="right-side">
                    { showGame ?
                        <div id="streetview-container">
                            <StreetView/>
                            <Map/>
                        </div>
                        : 
                        <img
                            className="purdue-campus"
                            src={require("../assets/Purdue Campus.jpg")}
                            alt="Purdue Campus"
                        />
                    }
                </div>
            </div>
      </div>
    );
}
  
export default GamePage;