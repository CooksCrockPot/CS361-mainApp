import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import WildfireMarkers from './WildfireMarkers';
import EarthquakeMarkers from './EarthquakeMarkers';

const containerStyle = {
    width: '100%',
    height: '75vh',
};

// This is centered on portand oregon
const center = {
    lat: 45.5152,
    lng: -122.6784,
 };

 function MapContainer({ filters, center, wildfireData, earthquakeData}) {
    const { isLoaded } = useJsApiLoader ({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    });

    return isLoaded ? (
        <div className="map-wrapper">
            <GoogleMap mapContainerStyle={ containerStyle } center={ center } zoom={ 8 }>
                <WildfireMarkers wildfireData={wildfireData} filters={filters} />
                <EarthquakeMarkers earthquakeData={earthquakeData} filters={filters} />
            </GoogleMap>
            <div>"Be patient, this may take a few moments to display data."</div>
        </div>

    ) : (
        <div>Loading Map...</div>
    );
 }

 export default MapContainer;
