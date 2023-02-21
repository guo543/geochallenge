import React, { useState } from "react";
import './Game.css';
import Map from './Map'
import StreetView from './StreetView'
import "../MainPage.css";
import GuestEnterGameModal from "../components/guestEnterGameModal";



function GamePage() {
    const [ openModal, setOpenModal ] = useState(false)
    const [ modalOpened, setModalOpened ] = useState(false)

    const [ showGame, setShowGame ] = useState(false);
    const handleStartClick = () => { setShowGame(true)};


    if (!modalOpened && localStorage.getItem("userCredentials") === null) {
        setModalOpened(true);
        setOpenModal(true);
    }

    return (
        <div className="main-page-container">
            {openModal && <GuestEnterGameModal closeModal={setOpenModal}/>}

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