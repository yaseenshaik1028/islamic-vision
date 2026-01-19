const API_KEY = "YOUR_API_KEY_HERE"; // 🔴 Replace this

async function loadHadith() {
    const book = document.getElementById("bookSelect").value;
    const container = document.getElementById("hadithContainer");

    container.innerHTML = "<p class='loading'>Loading Hadith...</p>";

    try {
        const response = await fetch(
            `https://api.sunnah.com/v1/hadiths/random?collection=${book}`,
            {
                headers: {
                    "X-API-Key": API_KEY
                }
            }
        );

        if (!response.ok) {
            throw new Error("API Error");
        }

        const data = await response.json();
        const hadith = data.hadith[0];

        container.innerHTML = `
            <div class="hadith">
                <div class="arabic">${hadith.arabic}</div>
                <div class="english">${hadith.english.text}</div>
            </div>
        `;

    } catch (error) {
        container.innerHTML = `
            <p style="color:red; text-align:center;">
                Error loading hadith. Check API key or internet.
            </p>
        `;
        console.error(error);
    }
}
