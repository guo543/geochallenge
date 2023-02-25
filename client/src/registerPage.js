import React, { useState, useEffect } from "react";
import "./LoginPage.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [isPurdueEmail, setIsPurdueEmail] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const [clicked, setClicked] = useState(false);
  const [duplicateEmail, setDuplicateEmail] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const history = useNavigate();
  const BACKEND_ENDPOINT = process.env.REACT_APP_BACKEND_ENDPOINT;

  useEffect(() => {
    setFadeIn(true);
  }, []);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!showPassword) {
      // validate email input
      if (!email.match(/^[^%$]+@purdue.edu$/)) {
        setIsPurdueEmail(false);
        setErrorMessage("Please enter a valid @purdue.edu email address");
        return;
      }
      setIsPurdueEmail(true);
      setErrorMessage("");
      // show password input
      setFadeIn(false);
      setTimeout(() => {
        setShowPassword(true);
        setFadeIn(true);
      }, 500);
    } else {
      // validate password and confirm password inputs
      if (password !== confirmPassword) {
        setPasswordsMatch(false);
        setErrorMessage("Passwords do not match");
        return;
      }
      setPasswordsMatch(true);
      if (!password.match(/^.{8,}$/)) {
        setPasswordValid(false);
        setErrorMessage("Password must be at least 8 characters long");
        return;
      }
      setPasswordValid(true);
      setErrorMessage("");
      // register user
      if (!clicked) {
        setClicked(true);
        try {
          const response = await axios.post(BACKEND_ENDPOINT + "/user/signup", {
            email: email,
            password: password,
          });
          localStorage.setItem("userCredentials", JSON.stringify(response.data));
          history("/");
          window.location.reload(false);
        } catch (error) {
          if (error.response.status === 400) {
            setErrorMessage("User already exists");
            setDuplicateEmail(true);
          } else {
            console.log(error);
          }
        }
      }
    }
  };
  return (
    <div className="LoginPage">
      <div className="rectangle">
        <div className="icon-container">
          <img
            className="globe-icon"
            src={require("./assets/globe.png")}
            alt="globe"
          />
        </div>
        <div className="welcome">Welcome !</div>
        <form onSubmit={handleSubmit}>
          {!showPassword ? (
            <label>
              <input
                type="email"
                value={email}
                placeholder="you@yourmail.com"
                onChange={handleEmailChange}
                style={{
                  opacity: fadeIn ? 1 : 0,
                  transition: "opacity 0.2s ease-in",
                  border: isPurdueEmail ? "" : "2px solid red",
                }}
              />
              {errorMessage && (
                <div style={{ color: "red" }}>{errorMessage}</div>
              )}
            </label>
          ) : (
            <>
              <label>
                <input
                  type="password"
                  value={password}
                  placeholder="Password"
                  onChange={handlePasswordChange}
                  style={{
                    opacity: fadeIn ? 1 : 0,
                    transition: "opacity 0.2s ease-in",
                    border: passwordValid ? "" : "2px solid red",
                  }}
                />
                {!passwordValid && (
                  <div style={{ color: "red" }}>
                    Password must be at least 8 characters long
                  </div>
                )}
              </label>
              <br />
              <label>
                <input
                  type="password"
                  value={confirmPassword}
                  placeholder="Confirm Password"
                  onChange={handleConfirmPasswordChange}
                  style={{
                    opacity: fadeIn ? 1 : 0,
                    transition: "opacity 0.2s ease-in",
                    border: passwordsMatch ? "" : "2px solid red",
                  }}
                />
                {!passwordsMatch && (
                  <div style={{ color: "red" }}>Passwords do not match</div>
                )}
                {duplicateEmail && (
                  <div style={{ color: "red" }}>Duplicate Email</div>
                )}
              </label>
            </>
          )}
          <br />
          <button className="next-button" type="submit">
            {showPassword ? "Register" : "Next >"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
