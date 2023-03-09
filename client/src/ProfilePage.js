import React, { useState, useEffect } from "react";
import "./ProfilePage.css";
import axios from "axios";

let response;
const BACKEND_ENDPOINT = process.env.REACT_APP_BACKEND_ENDPOINT;

const MainPage = () => {
    const [showScores, setShowScores] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (showScores) {
            setShowScores(false);
            return;
        }

        //response is set equal to the current user
        response = await axios.post(BACKEND_ENDPOINT + "/user/getScoreRecords", {
            email: localStorage.getItem("userCredentials").substring(localStorage.getItem("userCredentials").indexOf("email") + 8, localStorage.getItem("userCredentials").indexOf("password") - 3)
        });

        setShowScores(true);
    };

    return (
        <div className="main-page-container">
            <div className="middle-container">
                <div className="left-side">
                    <h3 style={{ color: "#C2B04A", fontSize: 30 }}>
                        Email: {localStorage.getItem("userCredentials").substring(localStorage.getItem("userCredentials").indexOf("email") + 8, localStorage.getItem("userCredentials").indexOf("password") - 3)}
                    </h3>
                    {!showScores && (
                    <button
                        className="button"
                        type="button"
                        onClick={handleSubmit}
                    >
                        View Past Scores
                    </button>
                    )}
                    {showScores && (
                        <>
                            <button
                                className="button"
                                type="button"
                                onClick={handleSubmit}
                            >
                                Hide Past Scores
                            </button>
                            <p style={{ color: "white", fontSize: 17 }}>
                                This is where scores will be shown.
                                For now, here is the user's id: {response.data.result._id}
                            </p>
                        </>
                    )}
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
