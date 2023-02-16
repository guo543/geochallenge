import React, { Component } from 'react';
import { render } from 'react-dom';

class Map extends Component {
    componentDidMount() {
        const map = new window.google.maps.Map(document.getElementById('map'), {
            center: { lat: 40.4237054, lng: -86.9233833 },
            zoom: 14,
            minZoom: 13,
            disableDefaultUI: true,
            zoomControl: true,
            //mapTypeId: window.google.maps.MapTypeId.SATELLITE
          });
    }
    render() {
        return (
          <div id="map" />
        );
    }
}

export default Map