import { useState, useEffect, useRef } from 'react';
import { FaBookmark } from 'react-icons/fa';
import './InfoDrawer.css';

function InfoDrawer({ locationName, wildfireData, earthquakeData, airQualityData, floodData, filters }) {
    const [isOpen, setIsOpen] = useState(false);
    const drawerRef = useRef(null);

    const [isBookmarked, setIsBookmarked] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const toggleDrawer = () => {
        setIsOpen((prev) => !prev);
    };

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (drawerRef.current && !drawerRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleBookmarkClick = () => {
        if (!isBookmarked) {

            setShowConfirm(true);
        } else {

            setIsBookmarked(false);
        }
    };

    function aqiLabel(aqi) {
        switch (aqi) {
            case 1: return "Good";
            case 2: return "Fair";
            case 3: return "Moderate";
            case 4: return "Poor";
            case 5: return 'Very Poor';
            default: return "Unknown";
        }
    }

    const confirmBookmark = () => {
        setIsBookmarked(true);
        setShowConfirm(false);
    };

    const cancelBookmark = () => {
        setShowConfirm(false);
    };

    return (
        <div ref={drawerRef} className={`info-drawer ${isOpen ? 'open' : ''}`}>

            <div className="drawer-tab" onClick={toggleDrawer}>
                {isOpen ? 'Close Info' : 'Open Info'}
            </div>


            {isOpen && (
                <div className="drawer-inner">
                    <div className="location-header">
                        <h3>{locationName}</h3>

                        <button
                            className="bookmark-button"
                            onClick={handleBookmarkClick}
                        >
                            <FaBookmark color={isBookmarked ? 'gold' : 'grey'} size={24} />
                        </button>
                    </div>

                    {showConfirm && (
                        <div className="confirm-popup">
                            <p>Do you want to bookmark this location?</p>
                            <button
                                className="confirm-button yes"
                                onClick={confirmBookmark}
                            >
                                Yes
                            </button>
                            <button
                                className="confirm-button no"
                                onClick={cancelBookmark}
                            >
                                No
                            </button>
                        </div>
                    )}

                    {filters.airQuality && airQualityData && (
                        <div>
                            <h4>Air Quality</h4>
                            <p><strong>AQI:</strong> {airQualityData.aqi} ({aqiLabel(airQualityData.aqi)})</p>
                            <p><strong>Measured:</strong> {new Date(airQualityData.time).toLocaleDateString()}</p>
                            <ul>
                                {Object.entries(airQualityData.components).map(([key, value]) => (
                                    <li key={key}>
                                        {key.toUpperCase()}: {value} ug/m^3
                                    </li>
                                ))}
                            </ul>

                            {airQualityData.components.pm2_5 > 35 && (
                                <p className="smoke-warning">Smoke levels are elevated (PM2.5 over 35 ug/m^3)</p>
                            )}
                        </div>
                    )}
                    {filters.wildfires && wildfireData.length > 0 && (
                        <div>
                            <h4>Wildfires ({wildfireData.length})</h4>
                            <ul>
                                {wildfireData.map((fire, idx) => (
                                    <li key={idx}>
                                        {fire.title} - {fire.location} - {fire.startDate}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                    {filters.earthquakes && earthquakeData.length > 0 && (
                        <div>
                            <h3>Recent Earthquakes</h3>
                            <ul>
                                {earthquakeData.map((quake) => (
                                    <li key={quake.id}>
                                        <strong>{quake.title}</strong><br />
                                        Magnitude: {quake.magnitude}<br />
                                        Time: {new Date(quake.time).toLocaleString()}<br />
                                        <a href={quake.url} target="_blank" rel="noopener noreferrer">
                                            More Info
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {filters.floods && floodData.length > 0 && (
                        <div>
                            <h3>Flood Events</h3>
                            <ul>
                                {floodData.map((flood) => (
                                    <li key={flood.id}>
                                        <strong>{flood.title}</strong><br />
                                        Date: {new Date(flood.time).toLocaleString()}<br />
                                        <a href={flood.link} target="_blank" rel="noopener noreferrer">
                                            More Info
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                </div>
            )}
        </div>
    );
}

export default InfoDrawer;


