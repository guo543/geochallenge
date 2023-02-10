import React, { useState, useEffect } from "react";
import "./LoginPage.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);

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
        <div className="welcome">Welcome!</div>
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
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
