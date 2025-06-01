import { Marker } from '@react-google-maps/api';
import getMarkerIcon from '../utils/getMarkerIcon';

function FloodMarkers({ floodData, filters }) {
    if (!filters.floods) return null;

    return (
        <>
        {floodData.map((flood) => (
            <Marker
            key={flood.id}
            position={{ lat: flood.lat, lng: flood.lng }}
            title={flood.title}
            icon={getMarkerIcon('flood')}
            />
        ))}
        </>
    );
}

export default FloodMarkers;
