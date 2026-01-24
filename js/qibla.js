// 🧭 Qibla Direction Script (Full & Clean)

const qiblaText = document.getElementById("qiblaText");
const qiblaArrow = document.getElementById("qiblaArrow");

// Kaaba coordinates
const KAABA_LAT = 21.4225;
const KAABA_LON = 39.8262;

// Convert degrees to radians
function toRad(deg) {
  return deg * Math.PI / 180;
}

// Convert radians to degrees
function toDeg(rad) {
  return rad * 180 / Math.PI;
}

// Calculate Qibla bearing
function calculateQibla(lat, lon) {
  const dLon = toRad(KAABA_LON - lon);

  const y = Math.sin(dLon);
  const x =
    Math.cos(toRad(lat)) * Math.tan(toRad(KAABA_LAT)) -
    Math.sin(toRad(lat)) * Math.cos(dLon);

  let bearing = toDeg(Math.atan2(y, x));
  bearing = (bearing + 360) % 360;

  return bearing;
}

// Get user location
function getQiblaDirection() {
  if (!navigator.geolocation) {
    qiblaText.innerText = "❌ Geolocation not supported";
    return;
  }

  qiblaText.innerText = "📍 Detecting your location...";

  navigator.geolocation.getCurrentPosition(
    position => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      const qibla = calculateQibla(lat, lon);

      // Rotate arrow smoothly
      qiblaArrow.style.transform = `rotate(${qibla}deg)`;

      // Show text
      qiblaText.innerText = `🕋 Qibla Direction: ${qibla.toFixed(1)}° from North`;
    },
    error => {
      if (error.code === 1) {
        qiblaText.innerText = "❌ Location permission denied";
      } else {
        qiblaText.innerText = "⚠️ Unable to get location";
      }
    },
    {
      enableHighAccuracy: true,
      timeout: 10000
    }
  );
}

// Auto run on page load
getQiblaDirection();
