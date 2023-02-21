import React, { useState, useEffect } from "react";
import "./LoginPage.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);
<<<<<<< HEAD
  const [isPurdueEmail, setIsPurdueEmail] = useState(true);

  const forgotpassword = () => {
   
  };
=======
  const [errorMessage, setErrorMessage] = useState("");
  const history = useNavigate();
  const forgotpassword = () => {};
>>>>>>> c0075b8bda37ee2afc64221ff4e3ebe371813188
  useEffect(() => {
    setFadeIn(true);
  }, []);

<<<<<<< HEAD
  const handleSubmit = (e) => {
    console.log('click');

=======
  const handleSubmit = async (e) => {
>>>>>>> c0075b8bda37ee2afc64221ff4e3ebe371813188
    e.preventDefault();
    if (!showPassword) {
      // entering email
      
      // check if email is a purdue email
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

      setFadeIn(false);
      setTimeout(() => {
        if (!showPassword) {
          setShowPassword(true);
        }
        setFadeIn(true);
      }, 500);
    } else {
<<<<<<< HEAD
      // log in here
      console.log('logging in');
      console.log("Email:", email);
      console.log("Password:", password);
=======
      try {
        const response = await axios.post("http://localhost:8000/user/signin", {
          email: email,
          password: password,
        });
        console.log(response.data);
        localStorage.setItem("userCredentials", JSON.stringify(response.data));
        history("/");
      } catch (err) {
        console.log(err);
        if (err.response.status === 404) {
          setErrorMessage("Invalid email or password. Please try again.");
        }
      }
>>>>>>> c0075b8bda37ee2afc64221ff4e3ebe371813188
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
          {!showPassword && !isPurdueEmail && (
            <label style={{color: "red"}}>Invalid email address, please use a Purdue email</label>
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
