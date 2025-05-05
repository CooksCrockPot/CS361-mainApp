import { useState, useEffect } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer'
import FilterDrawer from './components/FilterDrawer';
import InfoDrawer from './components/InfoDrawer'
import MapContainer from './components/MapContainer';

import SavedLocations from './pages/SavedLocations';
import About from './pages/About';
import Login from './pages/Login';

function App() {
  const [searchedCity, setSearchedCity] = useState('Portland, OR');

  const [filters, setFilters] = useState ({
    wildfires: true,
    floods: false,
    airQuality: false,
    earthquakes: false,
    distance: 25,
  });

  const [center, setCenter] = useState({
    lat: 45.5152,
    lng: -122.6784,
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
            console.error('Failed to fetch wildfire data', error)
        }
    };
    fetchWildfires();
}, []);

  // const mockWildfires = [
  //   {
  //     title: 'Shireen Fire',
  //     location: 'Portland, OR',
  //     startDate: '2024-05-01',
  //     lat: 45.5152,
  //     lng: -122.6784,
  //   },
  //   {
  //     title: 'Lexi',
  //     location: 'Salem, OR',
  //     startDate: '2024-05-01',
  //     lat: 46.2,
  //     lng: -121.5,
  //   },
  //   {
  //     title: 'Campfire',
  //     location: 'Portland, OR',
  //     startDate: '2024-05-01',
  //     lat: 44.5,
  //     lng: -123.3,
  //   },
  // ];

  function getDistanceFromLatLonInMiles(lat1, lon1, lat2, lon2) {
    const R = 3958.8
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c;
    return distance;
  }

  const filteredWildfires = wildfires.filter((fire) => {
    const distance = getDistanceFromLatLonInMiles(center.lat, center.lng, fire.lat, fire.lng);
    return distance <= filters.distance;
  })

  const handleSearch = async (location) => {
    try {
      const res = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          location
        )}&key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`
      );
      const data = await res.json();
      console.log('Fetched Geocoding Data:', data);
      if (data.results.length > 0) {
        const { lat, lng } = data.results[0].geometry.location;
        console.log('New Center:', { lat, lng });
        setCenter({ lat, lng})
        setSearchedCity(location);
      } else {
        alert('location not found!');
      }
    } catch (error) {
      console.error('Failed to search location', error);
    }
  };

  return (
    <>
      <Navbar onSearch={handleSearch} />
      <FilterDrawer filters={filters} setFilters={setFilters} />
      <main style={{ flex: '1 0 auto', paddingTop: '70px' }}>

        <Routes>
          <Route path="/" element={<MapContainer filters={filters} center={center} wildfireData={filteredWildfires} />} />
          <Route path="/saved" element={<SavedLocations />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
      <InfoDrawer
        locationName={searchedCity}
        wildfireData={filteredWildfires || [] }
        floodData={[]}
        earthquakeData={[]}
        airQualityData={[]}
        filters={filters}
      />
      <Footer />
    </>
  );
}

export default App;
