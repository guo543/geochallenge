import React, { Component } from 'react';
import axios from "axios";

const BACKEND_ENDPOINT = process.env.REACT_APP_BACKEND_ENDPOINT;

class Image extends Component {
    state = {
        imageUrl : null,
    }

    fetchImage = async () => {
        try {
            const response = await axios.get(`${BACKEND_ENDPOINT}/image/rand`);

            let image = response.data.image;
            this.props.setViewLocation( { lat: image.imageLat, lng: image.imageLon});
            this.setState({
                imageUrl : image.imageUrl
            })

            // create toggle of if imageUrl or location does not exist, revert back to street view
        } catch (err) {
            console.log(err);
        }
    }

    componentDidMount() {
        this.fetchImage()
    }
    render() {
        return (
            <div className="file-container2">
                <img id="game-image" src={this.state.imageUrl} alt="" />
            </div>
        );
    }
}

export default Image