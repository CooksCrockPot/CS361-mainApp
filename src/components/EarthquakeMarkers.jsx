import { Marker } from '@react-google-maps/api';


function EarthquakeMarkers({ earthquakeData, filters }) {
    if (!filters.earthquakes) return null;

    return (
        <>
        {earthquakeData.map((quake) => (
            <Marker
            key={quake.id}
            position={{ lat: quake.lat, lng: quake.lng }}
            title={`${quake.title} (M${quake.magnitude})`}
            />
        ))}
        </>
    );
}

export default EarthquakeMarkers;
