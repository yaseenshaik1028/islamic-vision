document.addEventListener("DOMContentLoaded", () => {
    loadHadith();
});

let start = 1;
let limit = 20;
let currentBook = "bukhari";

async function loadHadith() {
    currentBook = document.getElementById("book").value;
    start = 1;
    fetchHadith();
}

async function fetchHadith() {
    const container = document.getElementById("hadithContainer");
    const pageInfo = document.getElementById("pageInfo");

    if (!container) {
        console.error("hadithContainer not found");
        return;
    }

    container.innerHTML = "Loading...";

    const end = start + limit - 1;

    try {
        const response = await fetch(
            `https://api.hadith.gading.dev/books/${currentBook}?range=${start}-${end}`
        );

        const data = await response.json();
        container.innerHTML = "";

        data.data.hadiths.forEach(h => {
            container.innerHTML += `
                <div class="hadith">
                    <div class="number">Hadith #${h.number}</div>
                    <div class="arabic">${h.arab}</div>
                    <div class="translation">${h.id}</div>
                </div>
            `;
        });

        pageInfo.innerText = `Showing ${start} – ${end}`;

    } catch (err) {
        container.innerHTML = "<p style='color:red'>Error loading hadith</p>";
        console.error(err);
    }
}

function nextPage() {
    start += limit;
    fetchHadith();
}

function prevPage() {
    if (start > 1) {
        start -= limit;
        fetchHadith();
    }
}
