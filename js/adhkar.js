document.addEventListener("DOMContentLoaded", () => {

  const morning = document.getElementById("morning");
  const day = document.getElementById("day");
  const night = document.getElementById("night");

  if (!morning || !day || !night) return;

  // 🌅 MORNING – Sahih Adhkar (Bukhari/Muslim – mashhoor)
  const morningList = [
    {
      ur: "ہم نے صبح کی اور ساری بادشاہی اللہ ہی کی ہے۔",
      en: "We have entered the morning, and all sovereignty belongs to Allah."
    },
    {
      ur: "اے اللہ! میں تجھ سے اس دن کی بھلائی مانگتا ہوں۔",
      en: "O Allah, I ask You for the goodness of this day."
    },
    {
      ur: "اللہ کے نام سے، جس کے نام کے ساتھ کوئی چیز نقصان نہیں دیتی۔",
      en: "In the name of Allah, with whose name nothing can cause harm."
    }
  ];

  // 🕛 DAY – Sahih Duas (General, Sunnah-based meanings)
  const dayList = [
    {
      ur: "اے اللہ! میرے رزق میں برکت عطا فرما۔",
      en: "O Allah, grant blessings in my provision."
    },
    {
      ur: "اے اللہ! مجھے اچھے اخلاق عطا فرما۔",
      en: "O Allah, grant me good character."
    },
    {
      ur: "اے اللہ! مجھے ہر حال میں تیرا شکر گزار بنا۔",
      en: "O Allah, make me grateful to You in all situations."
    }
  ];

  // 🌙 NIGHT – Sahih Adhkar (Sunnah)
  const nightList = [
    {
      ur: "ہم نے شام کی اور ساری بادشاہی اللہ ہی کی ہے۔",
      en: "We have entered the evening, and all sovereignty belongs to Allah."
    },
    {
      ur: "اے اللہ! تیرے نام کے ساتھ میں سوتا ہوں اور تیرے نام کے ساتھ جاگتا ہوں۔",
      en: "O Allah, in Your name I sleep and in Your name I awaken."
    },
    {
      ur: "اے اللہ! میری مغفرت فرما اور مجھے سکون کی نیند عطا فرما۔",
      en: "O Allah, forgive me and grant me peaceful sleep."
    }
  ];

  function render(list, container) {
    list.forEach(item => {
      const div = document.createElement("div");
      div.className = "card";
      div.innerHTML = `
        <div class="urdu">${item.ur}</div>
        <div class="english">${item.en}</div>
      `;
      container.appendChild(div);
    });
  }

  render(morningList, morning);
  render(dayList, day);
  render(nightList, night);
});
