const EONET_URL = 'http://eonet.gsfc.nasa.gov/api/v3/events?category=wildfires';

let wildfireCache = null;
let lastFetched = 0;
const CACHE_DURATION_MS = 5 * 60 * 1000; // 5 minutes

export async function getWildfireMarkers() {
    const now = Date.now();
    const cacheValid = wildfireCache && (now - lastFetched < CACHE_DURATION_MS);

    if (cacheValid) {
        return wildfireCache;
    }

    try {
        const res = await fetch(EONET_URL);
        const data = await res.json();
        const markers = data.events.map(event => {
            const coords = event. geometry[0]?.coordinates;
            return {
                id: event.id,
                title: event.title,
                lat: coords[1],
                lng: coords[0],
                location: event.sources[0]?.url || 'Unknown',
                startDate: event.geometry[0]?.date || 'Unknown',
            };
        });

        wildfireCache = markers;
        lastFetched = now;

        return markers;
    } catch (error) {
        console.error("Failed to fetch wildfire data:", error);
        return [];
    }
}
