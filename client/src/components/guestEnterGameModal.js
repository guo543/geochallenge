import React from "react";
import { useNavigate } from "react-router-dom";
import './guestEnterGameModal.css'
 
function GuestEnterGameModal({ closeModal }) {
    const navigate = useNavigate();

    return (
    <div className="modalBackground">
        <div className="modelContainer">
            <div className="title">
                <h1>Do you want to continue as a guest?</h1>
            </div>
            <div className="body">
                <p>Your scores will not be saved and your progress can be lost. </p>
            </div>
            <div className="footer">
                <button onClick={() => navigate("/")}>Cancel</button>
                <button onClick={() => {
                    console.log("close");
                    closeModal(false)}}>Continue</button>
            </div>
        </div>
    </div>)
}

export default GuestEnterGameModal;