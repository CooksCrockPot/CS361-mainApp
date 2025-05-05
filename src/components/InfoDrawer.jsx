import { useState, useEffect, useRef } from 'react';
import './InfoDrawer.css';

function InfoDrawer({ locationName, wildfireData, floodData, earthquakeData, airQualityData, filters }) {
    const [isOpen, setIsOpen] = useState(false);
    const drawerRef = useRef(null);

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
            document.removeEventListener('mousedown', handleClickOutside)
        };
    }, []);
    return (
        <div
            ref={drawerRef}
            className={`info-drawer ${isOpen ? 'open' : ''}`}
        >
            <div className='drawer-tab' onClick={toggleDrawer}>
                {isOpen ? 'Close Info' : 'Open Info'}
            </div>

            {isOpen && (
                <div className='drawer-content'>
                    <h3>{locationName}</h3>

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
                </div>
           )}
        </div>
    )
}

export default InfoDrawer;
