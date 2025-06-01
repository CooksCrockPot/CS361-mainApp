const USGS_URL = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson';

let earthquakeCache = null;
let lastFetched = 0;
const CACHE_DURATION_MS = 5 * 60 * 1000;

export async function getEarthquakeMarkers() {
    const now = Date.now();
    const cacheValid = earthquakeCache && (now - lastFetched < CACHE_DURATION_MS);

    if (cacheValid) {
        return earthquakeCache;
    }
    try {
        const res = await fetch(USGS_URL);
        const data = await res.json();

        const markers = data.features.map((quake) => ({
            id: quake.id,
            title: quake.properties.title,
            lat: quake.geometry.coordinates[1],
            lng: quake.geometry.coordinates[0],
            magnitude: quake.properties.mag,
            time: quake.properties.time,
            url: quake.properties.url,
        }));

        earthquakeCache = markers;
        lastFetched = now;

        return markers;
    } catch (error) {
        console.error("Failed to fetch earthquake data:", error);
        return [];
    }
}
