import React, { Component } from 'react';

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
        this.fetchImage().then()
        console.log(randomCoordinate);

        const panorama = new window.google.maps.StreetViewPanorama(
            document.getElementById('streetview-map'),
            {
                position: randomCoordinate,
                disableDefaultUI: true,
                zoomControl: true,
                panControl: true,
                clickToGo: false,
                showRoadLabels: false,
                zoom: 0
            }
        )

        this.props.setStreetViewLocation(panorama.getPosition());
    }
    render() {
        return (
            <div className="file-container2">
                <img id="game-image" src={file.url} alt="" />
            </div>
        );
    }
}

export default Image