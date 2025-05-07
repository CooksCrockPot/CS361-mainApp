import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Map from './pages/Map';
import Home from './pages/Home';
import Resources from './pages/Resources';
import Help from './pages/Help';
import Bookmarks from './pages/Bookmarks';

function App() {
  const [center, setCenter] = useState({
    lat: 45.5152,
    lng: -122.6784,
  });
  const [searchedCity, setSearchedCity] = useState('Portland, OR');

  const searchLocation = async (location) => {
    try {
      const res = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(location)}&key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`
      );
      const data = await res.json();
      if (data.results.length > 0) {
        const { lat, lng } = data.results[0].geometry.location;
        setCenter({ lat, lng });
        setSearchedCity(location);
      } else {
        alert('Location not found!');
      }
    } catch (error) {
      console.error('Failed to search location', error);
    }
  };

  return (
    <>
      <Navbar onSearch={searchLocation} />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/map" element={<Map center={center} searchedCity={searchedCity} />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/help" element={<Help />} />
          <Route path="/bookmarks" element={<Bookmarks />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;


