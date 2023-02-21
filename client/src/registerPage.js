import React, { useState, useEffect } from "react";
import "./LoginPage.css";
// import localstorage from "local-storage";
import axios from "axios";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);
  const passRegex = new RegExp(/^.{8,}$/);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [isPurdueEmail, setIsPurdueEmail] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  useEffect(() => {
    setFadeIn(true);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const regex = /^[^%$]+@purdue.edu$/;
    const res = regex.exec(email);

    if (res === null) {
      // show error message on mismatch
      setIsPurdueEmail(false);
      return;
    } else {
      // reset to true for the error message to not show next time
      setIsPurdueEmail(true);
    }

    if (!showPassword && isPurdueEmail) {
      setFadeIn(false);
      setTimeout(() => {
        if (!showPassword) {
          setShowPassword(true);
        }
        setFadeIn(true);
      }, 500);
    } else {
      if (!passRegex.test(password) && isPurdueEmail) {
        setPasswordValid(false);
        setPasswordsMatch(true);
        return;
      } else {
        setPasswordValid(true);
        if (password !== confirmPassword) {
          setPasswordsMatch(false);
          return;
        } else {
          setPasswordsMatch(true);

          try {
            const response = await axios.post(
              "http://localhost:8000/user/signup",
              {
                email: email,
                password: password,
              }
            );
            localStorage.setItem(
              "userCredentials",
              JSON.stringify(response.data)
            );
          } catch (error) {
            if (error.response.status === 400) {
              alert("User already exists");
            } else {
              console.log(error);
            }
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
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  opacity: fadeIn ? 1 : 0,
                  transition: "opacity 0.2s ease-in",
                  border: isPurdueEmail ? "" : "2px solid red",
                }}
              />
              {!isPurdueEmail && (
                <div style={{ color: "red" }}>
                  Please enter a valid @purdue.edu email address
                </div>
              )}
            </label>
          ) : (
            <>
              <label>
                <input
                  type="password"
                  value={password}
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
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
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  style={{
                    opacity: fadeIn ? 1 : 0,
                    transition: "opacity 0.2s ease-in",
                    border: passwordsMatch ? "" : "2px solid red",
                  }}
                />
                {!passwordsMatch && (
                  <div style={{ color: "red" }}>Passwords do not match</div>
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
};

export default RegisterPage;
