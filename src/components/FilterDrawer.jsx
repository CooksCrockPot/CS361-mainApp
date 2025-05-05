import { useState, useRef, useEffect } from "react";
import './FilterDrawer.css';

function FilterDrawer({ filters, setFilters }) {
    const [isOpen, setIsOpen] = useState(false);
    const drawerRef = useRef(null);

    const toggleDrawer = () => {
        setIsOpen(!isOpen);
    };

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: checked,
        }));
    };

    const handleDistanceChange = (e) => {
        const newDistance = parseInt(e.target.value);
        setFilters((prevFilters) => ({
            ...prevFilters,
            distance: newDistance,
        }));
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (drawerRef.current && !drawerRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    return (
        <div ref={drawerRef} className={`filter-drawer ${isOpen ? 'open' : ''}`}>
            <div className="drawer-tab" onClick={toggleDrawer}>
                {isOpen ? '^Filters' : '>Filters'}
            </div>
            {isOpen && (
                <div className="drawer-content">
                    <label>
                        <input
                            type="checkbox"
                            name="wildfires"
                            checked={filters.wildfires}
                            onChange={handleCheckboxChange}
                        />
                        Wildfires
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="floods"
                            checked={filters.floods}
                            onChange={handleCheckboxChange}
                        />
                        Floods
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="airQuality"
                            checked={filters.airQuality}
                            onChange={handleCheckboxChange}
                        />
                        Air Quality
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="earthquakes"
                            checked={filters.earthquakes}
                            onChange={handleCheckboxChange}
                        />
                        Earthquakes
                    </label>
                    <label>
                        Distance from city:
                        <select value={filters.distance} onChange={handleDistanceChange}>
                            <option value={5}>5 miles</option>
                            <option value={15}>15 miles</option>
                            <option value={25}>25 miles</option>
                            <option value={50}>50 miles</option>
                            <option value={100}>100 miles</option>
                        </select>
                    </label>
                </div>
            )}
        </div>
    );
}

export default FilterDrawer;
