import { useState, useEffect } from 'react';
import FilterDrawer from '../components/FilterDrawer';
import InfoDrawer from '../components/InfoDrawer';
import MapContainer from '../components/MapContainer';
import { getWildfireMarkers } from '../api/wildfireAPI';
import { getEarthquakeMarkers } from '../api/earthquakeAPI';
import { getAirQuality } from '../api/airQualityAPI';

function Map({ center, searchedCity }) {
  const [filters, setFilters] = useState({
    wildfires: true,
    floods: false,
    airQuality: false,
    earthquakes: false,
    distance: 25,
  });

  const [wildfires, setWildfires] = useState([]);
  const [earthquakes, setEarthquakes] = useState([]);
  const [airQuality, setAirQuality] = useState(null);

  useEffect(() => {
    async function loadWildfires() {
      const markers = await getWildfireMarkers();
      setWildfires(markers);
    }

    async function loadEarthquakes() {
      const markers = await getEarthquakeMarkers();
      setEarthquakes(markers);
    }

    async function loadAirQuality() {
      const data = await getAirQuality(center.lat, center.lng);
      setAirQuality(data);
    }

    loadAirQuality();
    loadWildfires();
    loadEarthquakes();
  }, [center]);

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

  const filteredEarthquakes = earthquakes.filter((quake) => {
    const distance = getDistanceFromLatLonInMiles(center.lat, center.lng, quake.lat, quake.lng);
    return distance <= filters.distance;
  });
  return (
    <>
      <FilterDrawer filters={filters} setFilters={setFilters} />
      <MapContainer
      center={center}
      filters={filters}
      wildfireData={filteredWildfires}
      earthquakeData={filteredEarthquakes}
      />

      <InfoDrawer
        locationName={searchedCity}
        wildfireData={filteredWildfires}
        earthquakeData={filteredEarthquakes}
        floodData={[]}
        airQualityData={airQuality}
        filters={filters}
      />
    </>
  );
}

export default Map;



