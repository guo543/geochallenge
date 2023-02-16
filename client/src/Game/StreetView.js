import React, { Component } from 'react';
import { render } from 'react-dom';

class StreetView extends Component {
    componentDidMount() {
        const panorama = new window.google.maps.StreetViewPanorama(
            document.getElementById('streetViewMap'),
            {
                position: { lat: 40.4237054, lng: -86.9233833 },
                disableDefaultUI: true,
                zoomControl: true,
                panControl: true,
                clickToGo: false,
                zoom: 0
            }
        )
    }
    render() {
        return (
          <div id="streetViewMap" />
        );
    }
}

export default StreetView