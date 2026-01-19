// ===== COMPLETE QUR'AN - ALL 30 JUZ (FINAL CORS-SAFE VERSION) =====

const API = 'https://api.alquran.cloud/v1';

let currentJuz = 1;
let currentReciter = 'ar.alafasy';
let currentAyahs = [];
let currentAyahIndex = -1;

// ===== DOM =====
const audioPlayer = document.getElementById('audioPlayer');
const playerStatus = document.getElementById('playerStatus');
const surahSelect = document.getElementById('surahSelect');
const reciterSelect = document.getElementById('reciterSelect');
const ayahSearch = document.getElementById('ayahSearch');
const goToAyah = document.getElementById('goToAyah');
const ayahList = document.getElementById('ayahList');

// ===== ALL 30 JUZ =====
const JUZS = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  name: `Juz ${i + 1}`
}));

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  console.log("✓ Initializing Complete Qur'an Player");
  populateJuzs();
  setupButtons();
  loadJuz(1);
  playerStatus.textContent = "📖 Loading complete Qur'an...";
});

// ===== POPULATE JUZ =====
function populateJuzs() {
  surahSelect.innerHTML = '';
  JUZS.forEach(juz => {
    const opt = document.createElement('option');
    opt.value = juz.id;
    opt.textContent = juz.name;
    surahSelect.appendChild(opt);
  });
  console.log("✓ All 30 Juz loaded");
}

// ===== LOAD JUZ =====
async function loadJuz(juzNum) {
  try {
    currentJuz = juzNum;
    currentAyahs = [];
    currentAyahIndex = -1;
    ayahList.innerHTML = '';

    playerStatus.textContent = `⏳ Loading Juz ${juzNum}...`;

    const res = await fetch(`${API}/juz/${juzNum}`);
    const data = await res.json();

    if (!data?.data?.ayahs) throw new Error('Invalid Juz data');

    for (const ayah of data.data.ayahs) {
      let translation = 'Translation not available';

      try {
        const trRes = await fetch(`${API}/ayah/${ayah.number}/en.sahih`);
        const trData = await trRes.json();
        translation = trData?.data?.text || translation;
      } catch {}

      currentAyahs.push({ ...ayah, translation });
    }

    // ===== JUZ INFO =====
    const first = currentAyahs[0];
    const last = currentAyahs[currentAyahs.length - 1];

    document.getElementById('surahNameArabic').textContent = `الجزء ${juzNum}`;
    document.getElementById('surahNameEnglish').textContent = `Juz ${juzNum}`;
    document.getElementById('surahMeaningEnglish').textContent = '';

    document.getElementById('surahStats').innerHTML = `
      <div class="stat"><span class="stat-label">Ayahs</span><span class="stat-value">${currentAyahs.length}</span></div>
      <div class="stat"><span class="stat-label">From</span><span class="stat-value">${first.surah.number}:${first.numberInSurah}</span></div>
      <div class="stat"><span class="stat-label">To</span><span class="stat-value">${last.surah.number}:${last.numberInSurah}</span></div>
    `;

    // ===== RENDER AYAH LIST =====
    currentAyahs.forEach((ayah, index) => {
      const div = document.createElement('div');
      div.className = 'ayah';
      div.dataset.index = index;
      div.dataset.ayah = ayah.number;

      div.innerHTML = `
        <div class="ayah-number">${ayah.surah.number}:${ayah.numberInSurah}</div>
        <div class="ayah-arabic">${ayah.text}</div>
        <div class="ayah-translation">${ayah.translation}</div>
        <div class="ayah-controls">
          <button class="ayah-btn" onclick="playAyahByIndex(${index})">🔊 Play</button>
          <button class="ayah-btn" onclick="copyAyah(
            '${ayah.text.replace(/'/g, "\\'")}',
            '${ayah.translation.replace(/'/g, "\\'")}'
          )">📋 Copy</button>
        </div>
      `;
      ayahList.appendChild(div);
    });

    playerStatus.textContent = `✓ Juz ${juzNum} loaded (${currentAyahs.length} Ayahs)`;
    surahSelect.value = juzNum;

  } catch (e) {
    console.error(e);
    playerStatus.textContent = `❌ Error: ${e.message}`;
  }
}

// ===== PLAY AYAH (CORS-SAFE MEDIA STREAM) =====
function playAyahByIndex(index) {
  const ayah = currentAyahs[index];
  if (!ayah) return;

  currentAyahIndex = index;

  const audioSrc =
    `https://cdn.islamic.network/quran/audio/128/${currentReciter}/${ayah.number}.mp3`;

  // STOP current audio
  audioPlayer.pause();

  // ENSURE no CORS mode is set
  audioPlayer.removeAttribute('crossorigin');
  audioPlayer.src = audioSrc;
  audioPlayer.dataset.ayah = ayah.number;

  audioPlayer.play()
    .then(() => {
      playerStatus.textContent =
        `▶️ Playing ${ayah.surah.number}:${ayah.numberInSurah}`;
    })
    .catch(err => {
      console.error('Playback error:', err);
      playerStatus.textContent = '❌ Playback blocked by browser';
    });
}

// ===== COPY AYAH =====
function copyAyah(arabic, translation) {
  const text = `Arabic:\n${arabic}\n\nTranslation:\n${translation}`;
  navigator.clipboard.writeText(text)
    .then(() => playerStatus.textContent = '✓ Copied to clipboard')
    .catch(err => console.error(err));
}

// ===== BUTTON SETUP =====
function setupButtons() {
  document.getElementById('playPauseBtn')?.addEventListener('click', () => {
    if (!audioPlayer.src) {
      playerStatus.textContent = '⚠️ Select an Ayah first';
      return;
    }
    audioPlayer.paused ? audioPlayer.play() : audioPlayer.pause();
  });

  document.getElementById('prevBtn')?.addEventListener('click', () => {
    if (currentAyahIndex > 0) playAyahByIndex(currentAyahIndex - 1);
  });

  document.getElementById('nextBtn')?.addEventListener('click', () => {
    if (currentAyahIndex < currentAyahs.length - 1) {
      playAyahByIndex(currentAyahIndex + 1);
    }
  });

  surahSelect?.addEventListener('change', e => {
    loadJuz(parseInt(e.target.value));
  });

  reciterSelect?.addEventListener('change', e => {
    currentReciter = e.target.value;
    playerStatus.textContent = '✓ Reciter changed';
  });

  goToAyah?.addEventListener('click', () => {
    const num = parseInt(ayahSearch.value);
    const index = currentAyahs.findIndex(a => a.number === num);
    if (index !== -1) {
      document.querySelector(`[data-index="${index}"]`)
        ?.scrollIntoView({ behavior: 'smooth' });
      playAyahByIndex(index);
    } else {
      playerStatus.textContent = '⚠️ Ayah not in this Juz';
    }
  });
}

// ===== AUDIO EVENTS =====
audioPlayer.addEventListener('play', () => {
  document.getElementById('playPauseBtn').textContent = '⏸️ Pause';
});

audioPlayer.addEventListener('pause', () => {
  document.getElementById('playPauseBtn').textContent = '▶️ Play';
});

audioPlayer.addEventListener('ended', () => {
  if (currentAyahIndex < currentAyahs.length - 1) {
    playAyahByIndex(currentAyahIndex + 1);
  } else {
    playerStatus.textContent = '✓ Juz finished';
  }
});

audioPlayer.addEventListener('error', () => {
  console.error(audioPlayer.error);
  playerStatus.textContent = '❌ Audio error';
});
