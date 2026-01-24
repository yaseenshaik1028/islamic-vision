// 🌙 Ramadan Timetable Script (Sehri & Iftar)
// Uses Aladhan API (CORS safe, no API key required)

const ramadanBox = document.getElementById("ramadanTimes");

// Change city & country if you want default
const DEFAULT_CITY = "Hyderabad";
const DEFAULT_COUNTRY = "India";

// Get current year & Ramadan month (Hijri 9)
const today = new Date();
const year = today.getFullYear();

// Helper: load Ramadan timetable
async function loadRamadan() {
  ramadanBox.innerHTML = "Loading Ramadan timetable...";

  try {
    const url = `https://api.aladhan.com/v1/hijriCalendarByCity?city=${DEFAULT_CITY}&country=${DEFAULT_COUNTRY}&method=2&month=9&year=${year}`;
    const response = await fetch(url);
    const data = await response.json();

    if (!data.data) {
      throw new Error("No Ramadan data");
    }

    ramadanBox.innerHTML = "";

    data.data.forEach(day => {
      // Only Hijri month 9 (Ramadan)
      if (day.date.hijri.month.number !== 9) return;

      ramadanBox.innerHTML += `
        <div class="ramadan-day">
          <strong>${day.date.readable}</strong><br>
          🌅 Sehri (Fajr): ${day.timings.Fajr}<br>
          🌇 Iftar (Maghrib): ${day.timings.Maghrib}
        </div>
      `;
    });

  } catch (error) {
    ramadanBox.innerHTML =
      "<p style='color:red'>Failed to load Ramadan timetable</p>";
    console.error(error);
  }
}

// Auto load on page open
loadRamadan();
