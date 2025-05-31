import { Marker } from '@react-google-maps/api';


function WildfireMarkers({ wildfireData, filters }) {
    if (!filters.wildfires) return null;

    return (
        <>
        {wildfireData.map((fire) => (
            <Marker
            key={fire.id}
            position={{ lat: fire.lat, lng: fire.lng }}
            title={fire.title}
            />
        ))}
        </>
    );
}

export default WildfireMarkers;
