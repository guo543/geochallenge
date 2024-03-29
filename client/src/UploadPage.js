import React, { useState, useEffect } from "react";
import "./UploadPage.css";
import UploadedImages from './UploadedImages'
import EXIF from 'exif-js';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UploadPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem('userCredentials')) {
      console.log("something")
      navigate("/loginPage")
    }
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const BACKEND_ENDPOINT = process.env.REACT_APP_BACKEND_ENDPOINT;
  const MAP_BOUNDS = {
    north: 40.580957,
    west: -87.095784,
    south: 40.314838,
    east: -86.657745,
  }

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

  const handleUpload =  () => {
    if (!localStorage.getItem('userCredentials')) {
      alert("Please login to upload pictures. ");
      return;
    }

    if (selectedFile) {
      EXIF.getData(selectedFile, async function () {
        var allMetaData = EXIF.getAllTags(this);
        if (allMetaData.GPSLatitude == null || allMetaData.GPSLongitude == null) {
          alert("Please upload an image with GPS coordinates.");
          return;
        }
        const lat = allMetaData.GPSLatitude[0].numerator / allMetaData.GPSLatitude[0].denominator +
          allMetaData.GPSLatitude[1].numerator / allMetaData.GPSLatitude[1].denominator / 60 +
          allMetaData.GPSLatitude[2].numerator / allMetaData.GPSLatitude[2].denominator / 3600;
        const long = allMetaData.GPSLongitude[0].numerator / allMetaData.GPSLongitude[0].denominator +
          allMetaData.GPSLongitude[1].numerator / allMetaData.GPSLongitude[1].denominator / 60 +
          allMetaData.GPSLongitude[2].numerator / allMetaData.GPSLongitude[2].denominator / 3600;
        if (lat < MAP_BOUNDS.south || lat > MAP_BOUNDS.north || -long < MAP_BOUNDS.west || -long > MAP_BOUNDS.east) {
          alert("Please upload an image with GPS coordinates within the bounds of Purdue University.");
          return;
        }
        const formData = new FormData();
        const userCredentials = JSON.parse(localStorage.getItem('userCredentials'))
        const userID = userCredentials.result._id
        formData.append('image', selectedFile);
        formData.append('userID', userID);
        formData.append('imageLat', lat);
        formData.append('imageLon', long);
        try {
          const response = await axios.post(`${BACKEND_ENDPOINT}/image/`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': `Bearer ${userCredentials.token}`,
            },
            validateStatus: function (status) {
              return status === 200 || status === 400;
            },
          });
          
          if (response.status === 400) {
            alert(response.data.message)
          } else {
            alert("Successfully uploaded image. Happy GeoChallenging!")
          }
        } catch (err) {
          console.log(err);
        }

      });


      setSelectedFile(null);
    } else {
      alert("Please select the photo you want to upload. ");
      return; 
    }
  };
  
  return (
    <div className="UploadPage">
      <h1 className="upload-header">Upload Page</h1>
      <p className="upload-subheader">Share your Purdue campus image with other players!</p>
      <div className="upload-container" onDragOver={handleDragOver} onDrop={handleDrop}>
        <div className="upload-input">
          <input type="file" accept="image/jpeg, image/png" onChange={handleFileInput} />
          {selectedFile && <button onClick={handleUpload}>Upload</button>}
          {selectedFile && <button onClick={() => setSelectedFile(null)}>Clear</button>}
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
      <UploadedImages/>
    </div>
  );
};

export default UploadPage;
