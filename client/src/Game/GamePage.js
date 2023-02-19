import React, { Component, useState } from "react";
import './Game.css';
import Map from './Map'
import StreetView from './StreetView'
import "../MainPage.css";
import GuestEnterGameModal from "../components/guestEnterGameModal";



class GamePage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showGame : false,
            markerLocation : null,
            streetViewLocation : null,
            openModal : false,
            modalOpened : false,
        }
    }

    componentDidMount() {
        if (!modalOpened && localStorage.getItem("userCredentials") === null) {
            setModalOpened(true);
            setOpenModal(true);
        }
    }
    setOpenModal = (state) => { this.setState({ openModal : state })}
    startGame = () => { this.setState({ showGame : true }) }

    setMarkerLocation = (latLng) => { 
        console.log("MARKER COORDINATES = " + latLng)
        this.setState ({ markerLocation : latLng }) 
    }

    setStreetViewLocation = (latLng) => { 
        console.log("STREET VIEW COORDINATES = " + latLng)
        this.setState ({ streetViewLocation : latLng })
    }

    handleGuess = () => {
        console.log("TEST")
        console.log(this.state.markerLocation)
        console.log(this.state.streetViewLocation)
        let distance = window.google.maps.geometry.spherical.computeDistanceBetween(this.state.markerLocation, this.state.streetViewLocation);
        console.log(distance)
        // get position on street view
        // get marker position
        // calculate distance 
    };

    render () {
        return (
            <div className="main-page-container">
                {openModal && <GuestEnterGameModal closeModal={this.setOpenModal}/>}
                <div className="middle-container">
                    <div className="left-side">
                        <h3 style={{ color: "#C2B04A", fontSize: 30 }}>
                        The Ultimate Purdue Geography Gaming
                        </h3>
                        { !this.state.showGame ? 
                            <button className="start-button" onClick={ this.startGame }>
                                Start
                            </button>
                            :
                            <button className="start-button" onClick={this.handleGuess}>
                                Guess
                            </button>
                        }
                    </div>
                    <div className="right-side">
                        { this.state.showGame ?
                            <div id="streetview-container">
                                <StreetView setStreetViewLocation = { this.setStreetViewLocation } />
                                <Map setMarkerLocation = { this.setMarkerLocation }/>
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
    };
}
  
export default GamePage;