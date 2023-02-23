import React, { Component, useState } from "react";
import './Game.css';
import Map from './Map'
import StreetView from './StreetView'
import "../MainPage.css";
import GuestEnterGameModal from "../components/guestEnterGameModal";

const MILE_PER_METER = 0.000621371;

class GamePage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showGame : false,
            markerLocation : null,
            streetViewLocation : null,
            openModal : false,
            modalOpened : false,
            distanceFromGuess : -1
        }
    }

    componentDidMount() {
        if (!this.state.modalOpened && localStorage.getItem("userCredentials") === null) {
            this.setState({ modalOpened : true });
            this.setState({ openModal : true });
        }
    }
    setOpenModal = (state) => { this.setState({ openModal : state })}
    startGame = () => { this.setState({ showGame : true }) }

    setMarkerLocation = (latLng) => { 
        this.setState ({ markerLocation : latLng }) 
    }

    setStreetViewLocation = (latLng) => { 
        this.setState ({ streetViewLocation : latLng })
    }

    handleGuess = () => {
        let distance = window.google.maps.geometry.spherical.computeDistanceBetween(this.state.markerLocation, this.state.streetViewLocation);
        distance = distance * MILE_PER_METER; //convert to miles
        distance = distance.toFixed(2);
        this.setState({ distanceFromGuess : distance })
        console.log(distance)
        // get position on street view
        // get marker position
        // calculate distance 
    };

    render () {
        return (
            <div className="main-page-container">
                {this.state.openModal && <GuestEnterGameModal closeModal={this.setOpenModal}/>}
                {
                    this.state.showGame ?
                    <div className="game-container">
                        <div id="streetview-container">
                            <StreetView setStreetViewLocation = { this.setStreetViewLocation } />
                            <Map setMarkerLocation = { this.setMarkerLocation }/>
                        </div>

                        { this.state.distanceFromGuess > 0 ? 
                            <h3 style={{ color: "#C2B04A", fontSize: 30 }}>
                                Miles away: {this.state.distanceFromGuess}
                            </h3>
                            :
                            <button className="guess-button" onClick={this.handleGuess}>
                                Guess
                            </button>
                        }
                    </div>
                    :
                    <div className="middle-container">
                        <div className="left-side">
                            <h3 style={{ color: "#C2B04A", fontSize: 30 }}>
                            The Ultimate Purdue Geography Gaming
                            </h3>
                            <button className="start-button" onClick={ this.startGame }>
                                    Start
                            </button>
                        </div>
                        <div className="right-side">
                            <img
                                    className="purdue-campus"
                                    src={require("../assets/Purdue Campus.jpg")}
                                    alt="Purdue Campus"
                                />
                        </div>
                    </div>

                }
            </div>
        );
    };
}
  
export default GamePage;