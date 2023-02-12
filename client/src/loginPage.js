import React, { useState, useEffect } from "react";
import "./LoginPage.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);
  const forgotpassword = () => {
    console.log("Sending email to", email);
    alert(`Sending email to ${email}`);
  };
  useEffect(() => {
    setFadeIn(true);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!showPassword) {
      setFadeIn(false);
      setTimeout(() => {
        if (!showPassword) {
          setShowPassword(true);
        } else {
          console.log("Email:", email);
          console.log("Password:", password);
        }
        setFadeIn(true);
      }, 500);
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
          <button className="forgot-password-button"
          type="button"
            onClick={forgotpassword}>
              Forgot Password
            </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
