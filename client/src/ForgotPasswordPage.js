import React, { useState, useEffect } from "react";
import "./ForgotPasswordPage.css";
import axios from "axios";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [timer, setTimer] = useState(60);
  const [description, setDescription] = useState(
    "Enter the email address associated with your account and we’ll send you a code to reset your password."
  );
  const [isCode, setIsCode] = useState(false);
  const [counter, setCounter] = useState(0);
  const [codematched, setCodematched] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const passRegex = new RegExp(/^.{8,}$/);
  const [passwordValid, setPasswordValid] = useState(true);
  const [passwordChanged, setPasswordChanged] = useState(false);

  const BACKEND_ENDPOINT = process.env.REACT_APP_BACKEND_ENDPOINT;

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
  }, [counter, isCode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isCode) {
      try {
        const response = await axios.post(
          BACKEND_ENDPOINT + "/user/verification",
          {
            email: email,
          }
        );
        if (response.status === 200) {
          setIsCode(true);
          setCounter(counter + 1);
          setDescription(
            "Enter the code you received from your email, check the spam box if you did not received"
          );
        }
      } catch (error) {
        setIsCode(true);
        console.log(error);
      }
    } else if (!codematched) {
      try {
        const response = await axios.post(
          BACKEND_ENDPOINT + "/user/checkcode",
          {
            email: email,
            code: code,
          }
        );
        if (response.status === 200) {
          setCodematched(true);
          setDescription("Enter your new password");
        }
      } catch (error) {
        if (error.response.status === 400) {
          console.log("bad request");
          setDescription("Code is not matched, please try again");
        }
        console.log(error);
      }
    }

    if (codematched) {
      try {
        if (passRegex.test(newPassword)) {
          setPasswordValid(true);
        } else {
          setPasswordValid(false);
        }
        const response = await axios.post(
          BACKEND_ENDPOINT + "/user/resetpassword",
          {
            email: email,
            newPassword: newPassword,
          }
        );
        if (response.status === 200) {
          console.log("password is reset");
          setPasswordChanged(true);
          setDescription("Password changed successfully!");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="ForgotPasswordPage" style={{ backgroundColor: "#1a1a2e" }}>
      <div className="rectangle">
        <div className="brand">GeoChallenge</div>
        <div className="description">{description}</div>
        <form onSubmit={handleSubmit}>
          {codematched ? (
            <label>
              <input
                type="password"
                value={newPassword}
                placeholder="Password"
                onChange={(e) => setNewPassword(e.target.value)}
                style={{
                  border: passwordValid ? "" : "2px solid red",
                }}
              />
              {!passwordValid && (
                <div style={{ color: "red" }}>
                  Password must be at least 8 characters long
                </div>
              )}
            </label>
          ) : isCode ? (
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
          {isCode && !codematched && (
            <button
              className="resend-button"
              type="button"
              onClick={async () => {
                setCounter(counter + 1);
                setTimer(60);
                const response = await axios.post(
                  BACKEND_ENDPOINT + "/user/verification",
                  {
                    email: email,
                  }
                );
                if (response.status === 200) {
                }
              }}
              disabled={timer !== 0}
            >
              {timer === 0 ? "Resend" : `Resend (${timer})`}
            </button>
          )}
          {passwordChanged && (
            <div style={{ color: "green" }}>Password changed successfully!</div>
          )}
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
