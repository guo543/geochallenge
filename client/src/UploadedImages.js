import { useState, useEffect } from "react";
import axios from "axios";

const BACKEND_ENDPOINT = process.env.REACT_APP_BACKEND_ENDPOINT;

const UploadedImages = () => {
    const imageFiles = [];

    let [getImageFiles, setImageFiles] = useState(null)
    
    useEffect(() => {
        const fetchUploadedFiles = async () => {
            if (!localStorage.getItem('userCredentials')) {
              return;
            }
            const userCredentials = JSON.parse(localStorage.getItem('userCredentials'))
            try {
                const response = await axios.get(`${BACKEND_ENDPOINT}/image/`, {
                    headers: {
                        'Authorization': `Bearer ${userCredentials.token}`,
                    },
                    params: {
                        userID: userCredentials.result._id,
                    }
                });
    
                response.data.images.forEach(function (item, index) {
                    imageFiles.push({
                        name: "abcabc",
                        url: item.imageURL
                    });
                });
                setImageFiles(imageFiles);

          
            } catch (err) {
              console.log(err);
            }
        }
    
        fetchUploadedFiles().catch(console.error);
    }, []);

    return (
        <div className="all-uploaded-files">
            <h2 className="upload-header">Uploaded Images:</h2>
            {getImageFiles && getImageFiles.map((image, index) => (
                index % 5 === 0 && 
                <div className="file-row" key={index}>
                    {getImageFiles.slice(index, index + 5).map((file, index) => (
                    <div className="file-container2" key={index}>
                        <img width={"100px"} height={"100px"} src={file.url} alt="" />
                        <div className="file-name">
                        {file.name}
                        </div>
                    </div>
                    ))}
                </div>
            ))}
        </div>
    );
    
}


export default UploadedImages;
