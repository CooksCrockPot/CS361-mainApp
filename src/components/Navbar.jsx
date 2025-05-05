import { useState } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

function Navbar({ onSearch }) {

    const [searchInput, setSearchInput] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (searchInput.trim()) {
            onSearch(searchInput);
            setSearchInput('');
        }
    };

    return (
        <nav className='navbar'>
            <div className='nav-left'>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/saved'>Saved Locations</Link></li>
                <li><Link to='/about'>About</Link></li>
                <li><Link to='/login'>Login</Link></li>
            </div>

            <form className='search-form' onSubmit={handleSubmit}>
                <input
                    type='text'
                    value={searchInput}
                    placeholder='Search City, State'
                    onChange={(e) => setSearchInput(e.target.value)}
                />
                <button type='submit'>Go</button>
            </form>
        </nav>
    );
}

export default Navbar;
