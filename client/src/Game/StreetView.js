import React, { Component } from 'react';
// import { render } from 'react-dom';

const PURDUE_BOUNDS = {
    north: 40.439251,
    west: -86.946181,
    south: 40.416889,
    east: -86.892418,
}

function generateRandomCoordinatePurdue() {
    let rLat = Math.random() * (PURDUE_BOUNDS.north - PURDUE_BOUNDS.south) + PURDUE_BOUNDS.south
    let rLong = Math.random() * (PURDUE_BOUNDS.east - PURDUE_BOUNDS.west) + PURDUE_BOUNDS.west
    return { lat: rLat, lng: rLong }
}

class StreetView extends Component {
    
    componentDidMount() {
        // eslint-disable-next-line
        const randomCoordinate = generateRandomCoordinatePurdue();

        console.log(randomCoordinate);

        const panorama = new window.google.maps.StreetViewPanorama(
            document.getElementById('streetViewMap'),
            {
                position: randomCoordinate,
                disableDefaultUI: true,
                zoomControl: true,
                panControl: true,
                clickToGo: false,
                zoom: 0
            }
        )

        this.props.setStreetViewLocation(panorama.getPosition());
    }
    render() {
        return (
          <div id="streetViewMap" />
        );
    }
}

export default StreetView