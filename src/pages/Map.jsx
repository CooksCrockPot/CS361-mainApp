import { useState, useEffect } from 'react';
import FilterDrawer from '../components/FilterDrawer';
import InfoDrawer from '../components/InfoDrawer';
import MapContainer from '../components/MapContainer';

function Map({ center, searchedCity }) {
  const [filters, setFilters] = useState({
    wildfires: true,
    floods: false,
    airQuality: false,
    earthquakes: false,
    distance: 25,
  });

  const [wildfires, setWildfires] = useState([]);

  useEffect(() => {
    const fetchWildfires = async () => {
      try {
        const res = await fetch(
          'https://eonet.gsfc.nasa.gov/api/v3/events?category=wildfires'
        );
        const data = await res.json();
        const events = data.events.filter((e) => e.geometry.length > 0);

        const mappedFires = events.map((event) => ({
          title: event.title,
          location: event.sources[0]?.url || 'Unknown',
          startDate: event.geometry[0]?.date || 'Unknown',
          lat: event.geometry[0]?.coordinates[1],
          lng: event.geometry[0]?.coordinates[0],
        }));
        setWildfires(mappedFires);
      } catch (error) {
        console.error('Failed to fetch wildfire data', error);
      }
    };
    fetchWildfires();
  }, []);

  function getDistanceFromLatLonInMiles(lat1, lon1, lat2, lon2) {
    const R = 3958.8;
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;
  }

  const filteredWildfires = wildfires.filter((fire) => {
    const distance = getDistanceFromLatLonInMiles(center.lat, center.lng, fire.lat, fire.lng);
    return distance <= filters.distance;
  });

  return (
    <>
      <FilterDrawer filters={filters} setFilters={setFilters} />
      <MapContainer center={center} filters={filters} wildfireData={filteredWildfires} />
      <InfoDrawer
        locationName={searchedCity}
        wildfireData={filteredWildfires}
        floodData={[]}
        earthquakeData={[]}
        airQualityData={[]}
        filters={filters}
      />
    </>
  );
}

export default Map;



