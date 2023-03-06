import React from "react";
import "./ProfilePage.css";

const MainPage = () => {
    return (
        <div className="main-page-container">
            <div className="middle-container">
                <div className="left-side">
                    <h3 style={{ color: "#C2B04A", fontSize: 30 }}>
                        Email: {localStorage.getItem("userCredentials").substring(localStorage.getItem("userCredentials").indexOf("email") + 8, localStorage.getItem("userCredentials").indexOf("password") - 3)}
                    </h3>
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
