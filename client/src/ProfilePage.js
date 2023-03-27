import React, { useState } from "react";
import "./ProfilePage.css";
import axios from "axios";

let response;
const BACKEND_ENDPOINT = process.env.REACT_APP_BACKEND_ENDPOINT;

const MainPage = () => {
    const [showScores, setShowScores] = useState(false);
    const [showUpload, setShowUpload] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (showScores) {
            setShowScores(false);
            return;
        }

        //response is set equal to the current user
        response = await axios.post(BACKEND_ENDPOINT + "/user/getScoreRecords", {
            email: JSON.parse(localStorage.getItem('userCredentials')).result.email
        });

        console.log("credentials: " + JSON.parse(localStorage.getItem('userCredentials')).result.profilePicture);
        console.log("pfp: " + localStorage.getItem('profilePicture'));

        setShowScores(true);
    };

    const handleChangePicture = async (e) => {
        e.preventDefault();

        if (showUpload) {
            setShowUpload(false);
            return;
        }

        setShowUpload(true);
    };

    //this should only be used for testing purposes
    /*const handleClearProfilePicture = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('profilePicture', "");
        const testresponse = await axios.patch(BACKEND_ENDPOINT + "/user/" + JSON.parse(localStorage.getItem('userCredentials')).result._id + "/profilePic",
            formData, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('userCredentials')).token}`,
            },
        });
        console.log(testresponse);
        localStorage.setItem("profilePicture", "");
        window.location.reload(false);
    }*/

    const handleFileInput = (e) => {
        const file = e.target.files[0];
        const allowedTypes = ["image/jpeg", "image/png"];
        const maxSize = 20 * 1024 * 1024;
        console.log(file)
        if (file && allowedTypes.includes(file.type) && file.size <= maxSize) {
            setSelectedFile(file);
        } else {
            setSelectedFile(null);
            if (file != null) {
                alert("Please select a valid image file (JPG or PNG) that is 20MB or less.");
            }
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const file = e.dataTransfer.files[0];
        const allowedTypes = ["image/jpeg", "image/png"];
        const maxSize = 20 * 1024 * 1024;
        if (file && allowedTypes.includes(file.type) && file.size <= maxSize) {
            setSelectedFile(file);
        } else {
            setSelectedFile(null);
            if (file != null) {
                alert("Please select a valid image file (JPG or PNG) that is 20MB or less.");
            }

        }
    };

    const handleUpload = async (e) => {
        if (!localStorage.getItem('userCredentials')) {
            alert("Please login to upload pictures. ");
            return;
        }

        if (selectedFile) {
            
            //profile pictures have invalid latitude and longitude of -1 so as not to confuse them with location images
            const lat = -1;
            const long = -1;
            const formData = new FormData();
            const userCredentials = JSON.parse(localStorage.getItem('userCredentials'))
            const userID = userCredentials.result._id
            formData.append('image', selectedFile);
            formData.append('userID', userID);
            formData.append('imageLat', lat);
            formData.append('imageLon', long);
            let pfpURL = "";
            try {
                const response = await axios.post(`${BACKEND_ENDPOINT}/image/uploadProfilePicture`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${userCredentials.token}`,
                    },
                });
                //console.log(response.data);
                //console.log(response.data.image);
                pfpURL = response.data.image;
                formData.append('profilePicture', pfpURL);
            } catch (err) {
                console.log(err);
            }

            formData.delete('image');
            formData.delete('userID');
            formData.delete('imageLat');
            formData.delete('imageLon');
            //may have to use the id of image later on instead of its name, so that it can reference the actual image file itself, and because the file name may allow for a 1 to many mapping
            //formData.append('profilePicture', selectedFile.name);
            const testresponse = await axios.patch(BACKEND_ENDPOINT + "/user/" + JSON.parse(localStorage.getItem('userCredentials')).result._id + "/profilePic",
                formData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('userCredentials')).token}`,
                },
            });
            console.log(testresponse);
            localStorage.setItem("profilePicture", pfpURL);

            setSelectedFile(null);
        } else {
            alert("Please select the photo you want to upload. ");
            return;
        }
    };

    return (
        <div className="main-page-container">
            <div className="middle-container">
                <div className="left-side">
                    <h3 style={{ color: "#C2B04A", fontSize: 30 }}>
                        Email: {JSON.parse(localStorage.getItem('userCredentials')).result.email}
                    </h3>
                    {!showScores && (
                    <button
                        className="button"
                        type="button"
                        onClick={handleSubmit}
                    >
                        View Past Scores
                    </button>
                    )}
                    {showScores && (
                        <>
                            <button
                                className="button"
                                type="button"
                                onClick={handleSubmit}
                            >
                                Hide Past Scores
                            </button>
                            <p style={{ color: "white", fontSize: 17 }}>
                                You have guessed a total of {response.data.result.recordCount} times!<br></br>
                            </p>
                            <p style={{ color: "white", fontSize: 17 }}>
                                Past Scores:<br></br><br></br>
                                {response.data.result.records.map((record, index) => { 
                                    return <span>Score {index}: {record}<br></br></span>;
                                }) }
                            </p>
                        </>
                    )}
                </div>
                <div className="right-side">
                    <p style={{ color: "white", fontSize: 30 }}>
                        Profile Picture
                    </p>
                    {(localStorage.getItem('profilePicture') === null && JSON.parse(localStorage.getItem('userCredentials')).result.profilePicture === "") && (
                        <img
                            className="profile-picture"
                            src={require("./assets/globe.png")}
                            alt="Default"
                        />
                    )}
                    {(localStorage.getItem('profilePicture') !== null) && (
                        <img className="profile-picture" src={localStorage.getItem('profilePicture')} alt="" />
                    )}
                    {(localStorage.getItem('profilePicture') === null && JSON.parse(localStorage.getItem('userCredentials')).result.profilePicture !== "") && (
                        <img className="profile-picture" src={JSON.parse(localStorage.getItem('userCredentials')).result.profilePicture} alt="" />
                    )}
                    {!showUpload && (
                        <button
                            className="button"
                            type="button"
                            onClick={handleChangePicture}
                        >
                            Update Profile Picture
                        </button>
                    )}
                    {showUpload && (
                        <>
                            <button
                                className="button"
                                type="button"
                                onClick={handleChangePicture}
                            >
                                Cancel
                            </button>
                            <div className="upload-container" onDragOver={handleDragOver} onDrop={handleDrop}>
                                <div className="upload-input">
                                    <input type="file" accept="image/jpeg, image/png" onChange={handleFileInput} />
                                    <button className="button" type="button" onClick={handleUpload}>Upload</button>
                                    {selectedFile && <button className="button" onClick={() => setSelectedFile(null)}>Clear</button>}
                                </div>
                                <div className="uploaded-files">
                                    {selectedFile ? (
                                        <div className="file-container">
                                            <img className="file-img" src={URL.createObjectURL(selectedFile)} alt="" />
                                            <div className="file-name">{selectedFile.name}</div>
                                        </div>
                                    ) : (
                                        <div className="file-container empty">
                                            <p> Drag & Drop an image OR <a href="#!" onClick={() => document.querySelector('input[type="file"]').click()}>Browse</a></p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </>
                    )}
                    {/*<button
                        className="button"
                        type="button"
                        onClick={handleClearProfilePicture}
                    >
                        Clear Profile Picture (for testing purposes only; remove later; this will not take immediate effect, you'll have to logout and login again to refresh credentials; if you tinker with profile pictures, please use this to leave your account without a profile picture so that you won't run into issues later)
                    </button>*/}
                </div>
            </div>
        </div>
    );
};

export default MainPage;
