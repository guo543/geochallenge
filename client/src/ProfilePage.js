import React from "react";
import "./ProfilePage.css";
import {useNavigate} from 'react-router-dom';

const MainPage = () => {
  const navigate = useNavigate();
  const handleStartClick = () => {};
  if (localStorage.getItem("userCredentials") == null) {

    return (
      <div className="profile-page-container">
        <div className="profile-mid-container">
            <p style={{ color: "white", fontSize: 17 }}>
              You need to login to access your profile page. 
            </p>
            <div className="buttons">
              <button className="login-button" onClick={() => {navigate("/loginPage")}}>
                Login
              </button>
  
              <button className="return-button" onClick={() => {navigate("/")}}>
                Return to main page ...
              </button>
            </div>
          
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page-container">
      <div className="profile-mid-container">
          <p style={{ color: "white", fontSize: 17 }}>
            Profile page place holder
          </p>
        
      </div>
    </div>
  );
};

export default MainPage;
