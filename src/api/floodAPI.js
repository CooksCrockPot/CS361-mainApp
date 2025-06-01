const NOAA_URL = 'http://api.weather.gov/alerts/active';

let floodCache = null;
let lastFetched = 0;
const CACHE_DURATION_MS = 5 * 60 * 1000; // 5 minutes

export async function getFloodMarkers() {
    const now = Date.now();
    const cacheValid = floodCache && (now - lastFetched < CACHE_DURATION_MS);

    if (cacheValid) {
        return floodCache;
    }

    try {
        const url = `${NOAA_URL}?point=${lat},${lon}&eent=Flood`;
        const res = await fetch(url)
        const data = await res.json();

        const markers = data.features
            .filter((f) => f.geometry?.coordinates)
            .map((flood) => {
                const coords = flood.geometry.coordinates;
                return {
                    id: flood.id,
                    title: flood.properties.headline,
                    lat: coords[1],
                    lng: coords[0],
                    time: flood.properties.effective,
                    link: flood.properties.uri,
            };
        });

        floodCache = markers;
        lastFetched = now;

        return markers;
    } catch (error) {
        console.error("Failed to fetch wildfire data:", error);
        return [];
    }
}
