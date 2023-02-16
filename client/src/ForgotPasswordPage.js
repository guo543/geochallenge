import React, { useState, useEffect } from "react";
import "./ForgotPasswordPage.css";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [timer, setTimer] = useState(60);
  const [description, setDescription] = useState(
    "Enter the email address associated with your account and we’ll send you a code to reset your password."
  );
  const [isCode, setIsCode] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isCode) {
      interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer === 0) {
            clearInterval(interval);
            return prevTimer;
          }
          return prevTimer - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isCode]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsCode(true);
    setDescription("Enter the code you received from your email, check the spam box if you did not received");
  };

  return (
    <div className="ForgotPasswordPage" style={{ backgroundColor: "#1a1a2e" }}>
      <div className="rectangle">
        <div className="brand">GeoChallenge</div>
        <div className="description">{description}</div>
        <form onSubmit={handleSubmit}>
          {isCode ? (
            <label>
              <input
                type="text"
                value={code}
                placeholder={`Countdown: ${timer}`}
                onChange={(e) => setCode(e.target.value)}
              />
              
            </label>
            
          ) : (
            <label>
              <input
                type="email"
                value={email}
                placeholder="you@yourmail.com"
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
          )}
          <br />
          <button className="continue-button" type="submit">
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
