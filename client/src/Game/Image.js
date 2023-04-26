import React, { Component } from 'react';
import axios from "axios";


class Image extends Component {
    state = {
        imageUrl : null,
    }

    fetchImage = async () => {
        try {
            var response = undefined;
            if (localStorage.getItem("userCredentials") == null) {
                response = await axios.get(`${process.env.REACT_APP_BACKEND_ENDPOINT}/image/rand`);
            } else {
                // console.log(localStorage.getItem("userCredentials"));
                const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_ENDPOINT}/user/${JSON.parse(localStorage.getItem("userCredentials")).result._id}`);
                console.log(data);
                response = await axios.get(`${process.env.REACT_APP_BACKEND_ENDPOINT}/image/randWithScore?averageScore=${data.averageScore}`,
                    {headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${JSON.parse(localStorage.getItem('userCredentials')).token}`,
                    }}
                );
            }

            let image = response.data.image[0];
            console.log("Image failed...")
            if (image === undefined) {
                this.props.cancelImageMode();
                return;
            }            

            this.props.setViewLocation( { lat: parseFloat(image.imageLat), lng: -parseFloat(image.imageLon)});

            this.setState({
                imageUrl : image.imageURL
            })

            // create toggle of if imageUrl or location does not exist, revert back to street view
            
            // This is a callback function for allowing parent (GamePage.js) 
            // to access the image id for reporting purposes.
            this.props.onFetchImage(image._id);
        } catch (err) {
            console.log(err);
        }
    }

    componentDidMount() {
        this.fetchImage()
    }
    render() {
        return (
            <div className="file-container2" >
                <img id="game-image" src={this.state.imageUrl} alt="" />
            </div>
        );
    }
}

export default Image