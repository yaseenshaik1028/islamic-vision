async function getPrayerTimes() {
  const city = document.getElementById("city").value || "Hyderabad";
  const country = document.getElementById("country").value || "India";
  const container = document.getElementById("prayerContainer");

  // 🔒 SAFETY CHECK
  if (!container) {
    console.error("prayerContainer not found in HTML");
    return;
  }

  container.innerHTML = "Loading prayer times...";

  try {
    const response = await fetch(
      `https://api.aladhan.com/v1/timingsByCity?city=${city}&country=${country}&method=2`
    );

    const data = await response.json();
    const times = data.data.timings;

    container.innerHTML = `
      <div class="prayer"><span>Fajr</span><span>${times.Fajr}</span></div>
      <div class="prayer"><span>Dhuhr</span><span>${times.Dhuhr}</span></div>
      <div class="prayer"><span>Asr</span><span>${times.Asr}</span></div>
      <div class="prayer"><span>Maghrib</span><span>${times.Maghrib}</span></div>
      <div class="prayer"><span>Isha</span><span>${times.Isha}</span></div>
    `;
  } catch (error) {
    container.innerHTML =
      "<p style='color:red'>Failed to load prayer times</p>";
    console.error(error);
  }
}
