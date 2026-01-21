async function getPrayerTimes() {
  const city = document.getElementById("city").value || "Makkah";
  const country = document.getElementById("country").value || "Saudi Arabia";

  const prayerBox = document.getElementById("prayerTimes");
  const dateBox = document.getElementById("dateBox");

  prayerBox.innerHTML = "Loading prayer times...";

  try {
    const response = await fetch(
      `https://api.aladhan.com/v1/timingsByCity?city=${city}&country=${country}&method=2`
    );

    const data = await response.json();

    const timings = data.data.timings;
    const date = data.data.date.readable;

    dateBox.innerHTML = `📅 ${date} — ${city}, ${country}`;

    prayerBox.innerHTML = `
      <div class="prayer"><span>Fajr</span><span>${timings.Fajr}</span></div>
      <div class="prayer"><span>Sunrise</span><span>${timings.Sunrise}</span></div>
      <div class="prayer"><span>Dhuhr</span><span>${timings.Dhuhr}</span></div>
      <div class="prayer"><span>Asr</span><span>${timings.Asr}</span></div>
      <div class="prayer"><span>Maghrib</span><span>${timings.Maghrib}</span></div>
      <div class="prayer"><span>Isha</span><span>${timings.Isha}</span></div>
    `;

  } catch (error) {
    prayerBox.innerHTML = "❌ Failed to load prayer times";
    console.error(error);
  }
}
