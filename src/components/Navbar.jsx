import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import './Navbar.css';

function Navbar({ onSearch }) {
  const [searchInput, setSearchInput] = useState('');
  const location = useLocation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchInput.trim() && typeof onSearch === 'function') { // FIXED typo!
      onSearch(searchInput);
      setSearchInput('');
    }
  };

  const showSearchBar = location.pathname === '/map'; // ✅ Only show on /map

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="nav-left">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/map">Map</Link></li>
          <li><Link to="/resources">Resources</Link></li>
          <li><Link to="/help">Help</Link></li>
          <li><Link to="/bookmarks">Bookmarks</Link></li>
        </div>

        {showSearchBar && (
          <form className="search-form" onSubmit={handleSubmit}>
            <input
              type="text"
              value={searchInput}
              placeholder="Search City, State"
              onChange={(e) => setSearchInput(e.target.value)}
              className="search-input"
            />
            <button type="submit" className="search-button" title="Search">
              <FaSearch />
            </button>
          </form>
        )}
      </div>
    </nav>
  );
}

export default Navbar;

