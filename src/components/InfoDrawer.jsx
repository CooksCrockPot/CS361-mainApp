import { useState, useEffect, useRef } from 'react';
import { FaBookmark } from 'react-icons/fa';
import './InfoDrawer.css';

function InfoDrawer({ locationName, wildfireData, earthquakeData, filters }) {
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
                </div>
            )}
        </div>
    );
}

export default InfoDrawer;


