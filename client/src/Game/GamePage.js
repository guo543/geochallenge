import './Game.css';
import Map from './Map'
import StreetView from './StreetView'


function GamePage() {
    return (
        <div id="streetview-container">
            <StreetView/>
            <div id="map-container">
                <Map/>
            </div>
        </div>
    );
}
  
export default GamePage;