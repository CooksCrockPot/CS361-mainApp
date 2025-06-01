const AIR_QUALITY_URL = 'https://api.openweathermap.org/data/2.5/air_pollution';
const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

let airCache = new Map();
const CACHE_DURATION_MS = 5 * 60 * 1000;

export async function getAirQuality(lat, lon) {
    const now = Date.now();
    const key = `${lat},${lon}`;
    const cached = airCache.get(key)

    const cacheValid = cached && (now - cached.timestamp < CACHE_DURATION_MS);


    if (cacheValid) return cached.data;

    try {
        const res = await fetch(`${AIR_QUALITY_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
        const data = await res.json();

        if (!data || !data.list || data.list.length === 0) {
            console.error("Unexpected air quality data:", data);
            return null;
        }

        const airData = {
            aqi: data.list[0].main.aqi,
            components: data.list[0].components,
            time: data.list[0].dt * 1000,
        };

        airCache.set(key, { data: airData, timestamp: now });

        return airData;
    } catch (error) {
        console.error("Failed to fetch air quality data:", error);
        return null;
    }
}

