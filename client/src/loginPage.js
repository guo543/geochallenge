import React, { useState, useEffect } from "react";
import "./LoginPage.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const history = useNavigate();
  const forgotpassword = () => {};
  useEffect(() => {
    setFadeIn(true);
  }, []);

  const BACKEND_ENDPOINT = process.env.REACT_APP_BACKEND_ENDPOINT;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!showPassword) {
      setFadeIn(false);
      setTimeout(() => {
        if (!showPassword) {
          setShowPassword(true);
        }
        setFadeIn(true);
      }, 500);
    } else {
      try {
        const response = await axios.post(BACKEND_ENDPOINT + "/user/signin", {
          email: email,
          password: password,
        });
        console.log(response.data);
        localStorage.setItem("userCredentials", JSON.stringify(response.data));
        history("/");
        //navbar doesn't reflect being logged in without a refresh
        window.location.reload(false);
      } catch (err) {
        console.log(err);
        if (err.response.status === 404) {
          setErrorMessage("Invalid email or password. Please try again.");
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
        <div className="welcome">Welcome Back!</div>
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
                }}
              />
            </label>
          ) : (
            <label>
              <input
                type="password"
                value={password}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  opacity: fadeIn ? 1 : 0,
                  transition: "opacity 0.2s ease-in",
                }}
              />
            </label>
          )}
          <br />
          <button className="next-button" type="submit">
            {showPassword ? "Login" : "Next >"}
          </button>
          <Link to="/forgotPasswordPage">
            <button
              className="forgot-password-button"
              type="button"
              onClick={forgotpassword}
            >
              Forgot Password
            </button>
          </Link>

          {errorMessage && <div className="error-message">{errorMessage}</div>}
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
