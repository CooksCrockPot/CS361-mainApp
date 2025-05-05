import { useEffect, useState } from 'react';
import { Marker } from '@react-google-maps/api';
import axios from 'axios';

function WildfireMarkers({ filters, center, wildfires }) {
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

    if (!filters.wildfires || !wildfires || wildfires.length ===0) {
        return null;
    }
    return (
        <>
        {wildfires

        .filter((fire) => {
            const distance = getDistanceFromLatLonInMiles(
                center.lat,
                center.lng,
                fire.lat,
                fire.lng
            );
            return distance <= filters.distance;
        })

        .map((fire, i) => {
            return (
                <Marker
                    key={i}
                    position= {{
                        lat: fire.lat,
                        lng: fire.lng,
                    }}
                    title={fire.title}
                />
            );
        })}
        </>
    );
}

export default WildfireMarkers;
