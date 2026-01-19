let start = 1;
let limit = 20; // hadith per page
let currentBook = "bukhari";

async function loadHadith() {
    currentBook = document.getElementById("book").value;
    start = 1;
    fetchHadith();
}

async function fetchHadith() {
    const container = document.getElementById("hadithContainer");
    const pageInfo = document.getElementById("pageInfo");

    container.innerHTML = "Loading...";

    const end = start + limit - 1;

    try {
        const response = await fetch(
            `https://api.hadith.gading.dev/books/${currentBook}?range=${start}-${end}`
        );
        const data = await response.json();

        container.innerHTML = "";

        data.data.hadiths.forEach(hadith => {
            container.innerHTML += `
                <div class="hadith">
                    <div class="number">Hadith #${hadith.number}</div>
                    <div class="arabic">${hadith.arab}</div>
                    <div class="translation">${hadith.id}</div>
                </div>
            `;
        });

        pageInfo.innerText = `Showing ${start} – ${end}`;

    } catch (error) {
        container.innerHTML = "<p style='color:red'>Failed to load hadith</p>";
        console.error(error);
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
