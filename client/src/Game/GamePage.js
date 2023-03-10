import React, { Component } from "react";
import axios from "axios";

import './Game.css';
import Map from './Map'
import StreetView from './StreetView'
import "../MainPage.css";
import GuestEnterGameModal from "../components/guestEnterGameModal";

const userCredentials = JSON.parse(localStorage.getItem('userCredentials'))
const BACKEND_ENDPOINT = process.env.REACT_APP_BACKEND_ENDPOINT;

const MILE_PER_METER = 0.000621371;

function scoreCalculation(distance) {
    let score = (1000 - (500 * distance**(1/2))).toFixed(0);
    if (score < 0) {
        return 0;
    }
    return score;
}

class GamePage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showGame : false,
            markerLocation : null,
            streetViewLocation : null,
            openModal : false,
            modalOpened : false,
            distanceFromGuess : -1,
            score: 0
        }
        this.imageId = null;
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
        this.setState({ distanceFromGuess : distance });
        console.log(distance);
        this.setState({ score : scoreCalculation(distance)});
        // get position on street view
        // get marker position
        // calculate distance 
    };

    handleReport = async () => {
        // TODO: this image id is hard coded for now for testing purposes.
        // remove this once games w/ images are implemented
        this.imageId = "640d1ca8f9691be1de1e0ec3";
        
        if (this.imageId === null) {
            alert("Unfortunately you cannot report a streetview.");
            return;   
        }

        const formData = new FormData();
        formData.append('id', this.imageId);

        try {
            const response = await axios.patch(`${BACKEND_ENDPOINT}/image/${this.imageId}/report`,
                formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${userCredentials.token}`,
                },
            });
            console.log(response.data);

            if (response.status === 200) {
                alert("Thank you for feedback. We will be looking into this issue. ")
                window.location.reload(false);
                return;
            }
        } catch (err) {
          console.log(err);
        }


    }

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

                        { this.state.score > 0 ? 
                            <h3 style={{ color: "#C2B04A", fontSize: 30 }}>
                                Score: {this.state.score}
                            </h3>
                            :
                            <button className="guess-button" onClick={this.handleGuess}>
                                Guess
                            </button>
                        }
                        
                        <button className="report-button" onClick={this.handleReport}>
                            Report Image
                        </button>
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