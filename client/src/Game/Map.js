import React, { Component } from 'react';

const MAP_BOUNDS = {
    north: 40.580957,
    west: -87.095784,
    south: 40.314838,
    east: -86.657745,
}

const MAP_CENTER = { lat: 40.4237054, lng: -86.9233833 }

class Map extends Component {  
    state = { 
        map : null,
    }

    addMarker = (latLng, map) => {
        if (this.state.markerGuess == null) {
            let marker = new window.google.maps.Marker({
                position: latLng,
                map: map,
                draggable: true,
            });
            this.setState({ markerGuess : marker });
        } else {
            this.state.markerGuess.setPosition(latLng);
        }
        this.props.setMarkerLocation(latLng);
    }

    componentDidMount() {

        if (this.state.map == null) {
            let newmap = new window.google.maps.Map(document.getElementById('map'), {
                center: MAP_CENTER,
                zoom: 14,
                minZoom: 13,
                disableDefaultUI: true,
                zoomControl: true,
                restriction: {
                    latLngBounds: MAP_BOUNDS,
                    strictBounds: false
                },
                mapTypeId: window.google.maps.MapTypeId.SATELLITE
            });

            newmap.addListener('click', (e) => {
                this.addMarker(e.latLng, newmap);
            });

            this.setState({ map : newmap });
        }
    }
    
    render() {
        return (
          <div id="map" />
        );
    }
}

export default Map