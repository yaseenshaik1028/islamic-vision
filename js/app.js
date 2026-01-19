
fetch("https://api.alquran.cloud/v1/ayah/13:28/en.asad")
  .then(res => res.json())
  .then(data => {
    const ayahArabic = document.querySelector(".daily-ayah .arabic");
    const ayahTranslation = document.querySelector(".daily-ayah .translation");
    const ayahRef = document.querySelector(".daily-ayah .ref");

    ayahArabic.textContent = data.data.text;
    ayahTranslation.textContent = data.data.edition.name;
    ayahRef.textContent =
      `Qur’an ${data.data.surah.englishName} : ${data.data.numberInSurah}`;
  })
  .catch(() => {
    console.warn("Ayah could not be loaded");
  });
