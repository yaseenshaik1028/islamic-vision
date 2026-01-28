// 🌙 Ramadan Timetable (Islamically Correct, No Guessing)
// Uses official Hijri calendar from AlAdhan
// Shows EXACT Ramadan days (29 or 30 as per calendar)

const ramadanBox = document.getElementById("ramadanTimes");

// Change city/country if needed
const CITY = "Hyderabad";
const COUNTRY = "India";
const METHOD = 2;

// Ramadan 2026 = Hijri 1447 AH, month 9
const HIJRI_YEAR = 1447;
const RAMADAN_MONTH = 9;

async function loadRamadanTimetable() {
  ramadanBox.innerHTML = "Loading authentic Ramadan timetable...";

  try {
    const response = await fetch(
      `https://api.aladhan.com/v1/hijriCalendarByCity?city=${CITY}&country=${COUNTRY}&method=${METHOD}&month=${RAMADAN_MONTH}&year=${HIJRI_YEAR}`
    );

    const json = await response.json();

    if (!json.data || json.data.length === 0) {
      throw new Error("No Ramadan data received");
    }

    ramadanBox.innerHTML = "";

    json.data.forEach((day, index) => {
      ramadanBox.innerHTML += `
        <div class="ramadan-day">
          <strong>Roza ${index + 1}</strong><br>
          📅 ${day.date.readable}<br>
          🌅 Sehri (Fajr): ${day.timings.Fajr}<br>
          🌇 Iftar (Maghrib): ${day.timings.Maghrib}
        </div>
      `;
    });

    // Optional info line
    ramadanBox.innerHTML += `
      <p style="text-align:center;margin-top:10px;font-weight:bold;">
        Total Roze: ${json.data.length}
      </p>
    `;

  } catch (error) {
    ramadanBox.innerHTML =
      "<p style='color:red'>Failed to load Ramadan timetable</p>";
    console.error(error);
  }
}

// Auto load on page open
loadRamadanTimetable();
