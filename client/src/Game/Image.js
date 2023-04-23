import React, { Component } from 'react';
import axios from "axios";


class Image extends Component {
    state = {
        imageUrl : null,
    }

    fetchImage = async () => {
        try {

            const response;

            if (localStorage.getItem("userCredentials") != null) {
                //if logged in, get an image based on the user's average score

                //response is set equal to the current user
                response = await axios.get(process.env.REACT_APP_BACKEND_ENDPOINT + "/user/getScoreRecords", {
                    params: {
                        email: JSON.parse(localStorage.getItem('userCredentials')).result.email
                    }
                });

                console.log("User's avg score: " + response.data.result.averageScore);

                //TODO make sure the correct backend query is called to give an image based on user's average score, NOT randomly
                //if user's average score is -1, they are a new player and should be given a simple image
                response = await axios.get(`${process.env.REACT_APP_BACKEND_ENDPOINT}/image/rand`);

            } else {
                //if not logged in, get a completely random image
                response = await axios.get(`${process.env.REACT_APP_BACKEND_ENDPOINT}/image/rand`);
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