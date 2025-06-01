
const ICONS = {
    earthquakes: '/icons/triangle-alert.png',
    wildfire: '/icons/flame.png',
    flood: '/icons/waves.png',
    airQuality: '/icons/wind.png',
    tornado: '/icons/tornado.png',
    storm: '/icons/cloud-rain.png',
}

function getMarkerIcon(type) {
    return {
        url: `/icons/${type}.png`,
        scaledSize: new window.google.maps.Size(30, 30),
    }
}

export default getMarkerIcon;
