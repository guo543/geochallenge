import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./pages/Navbar";
import MainPage from "./pages/Mainpage";
import LoginPage from "./pages/loginPage";
import RegisterPage  from "./pages/registerPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import GamePage from "./pages/GamePage";
import LeaderBoardPage from "./pages/LeaderBoardPage";
import UploadPage from "./pages/UploadPage";
import ProfilePage from "./pages/ProfilePage";
import reportWebVitals from "./reportWebVitals";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navbar />}>
                    <Route index element={<MainPage />} />
                    <Route path="loginPage" element={<LoginPage />} />
                    <Route path="registerPage" element={<RegisterPage />} />
                    <Route path="forgotPasswordPage" element={<ForgotPasswordPage />} />
                    <Route path="gamePage" element={<GamePage />} />
                    <Route path="uploadPage" element={<UploadPage />} />
                    <Route path="profilePage" element={<ProfilePage />} />
                    <Route path="leaderboardPage" element={<LeaderBoardPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

/*root.render(
  <React.StrictMode>
    <Navbar />
    <MainPage />
  </React.StrictMode>
);*/

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
