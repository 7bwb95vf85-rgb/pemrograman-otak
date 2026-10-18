const year = document.querySelector("#year");
year.textContent = new Date().getFullYear();

const menuToggle = document.querySelector("#menuToggle");
const navLinks = document.querySelector("#navLinks");

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Tutup menu" : "Buka menu");
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

const searchInput = document.querySelector("#searchInput");
const articleCards = [...document.querySelectorAll(".article-card")];
const noResults = document.querySelector("#noResults");

searchInput.addEventListener("input", () => {
  const query = searchInput.value.trim().toLowerCase();
  let visibleCount = 0;
  articleCards.forEach((card) => {
    const content = (card.innerText + " " + card.dataset.search).toLowerCase();
    const matches = content.includes(query);
    card.hidden = !matches;
    if (matches) visibleCount++;
  });
  noResults.hidden = visibleCount !== 0;
});

const articleContent = {
  neuro: {
    category: "ILMU SARAF",
    title: "Apa Itu Neuroplastisitas?",
    text: "Neuroplastisitas adalah kemampuan sistem saraf untuk berubah sebagai respons terhadap pengalaman dan pembelajaran. Latihan berulang dapat membantu keterampilan berkembang, tetapi tidak berarti otak bisa diprogram secara instan. Perubahan dipengaruhi banyak hal, termasuk kualitas latihan, istirahat, dan lingkungan."
  },
  positive: {
    category: "PSIKOLOGI",
    title: "Berpikir Positif Secara Realistis",
    text: "Berpikir positif bukan berarti menyangkal masalah atau memaksa diri selalu bahagia. Cobalah mengenali pikiran otomatis, memeriksa bukti, dan mencari tafsiran yang lebih seimbang. Contoh: ubah 'Aku pasti gagal' menjadi 'Aku belum tahu hasilnya; aku bisa mempersiapkan diri dan mencoba langkah berikutnya.'"
  },
  mindful: {
    category: "LATIHAN",
    title: "Mengamati Pikiran Tanpa Mengikutinya",
    text: "Pikiran datang dan pergi. Dalam latihan mindfulness, kita mencoba menyadari pikiran tanpa harus langsung mempercayai atau menolaknya. Arahkan perhatian ke napas atau sensasi kaki menyentuh lantai selama beberapa menit. Jika latihan terasa tidak nyaman, berhenti dan pilih cara yang lebih aman."
  }
};

const dialog = document.querySelector("#articleDialog");
document.querySelectorAll(".read-more").forEach((button) => {
  button.addEventListener("click", () => {
    const article = articleContent[button.dataset.article];
    document.querySelector("#dialogCategory").textContent = article.category;
    document.querySelector("#dialogTitle").textContent = article.title;
    document.querySelector("#dialogText").textContent = article.text;
    dialog.showModal();
  });
});

document.querySelector("#dialogClose").addEventListener("click", () => dialog.close());

dialog.addEventListener("click", (event) => {
  if (event.target === dialog) dialog.close();
});

document.querySelector("#reframeButton").addEventListener("click", () => {
  const thought = document.querySelector("#thoughtInput").value.trim();
  const result = document.querySelector("#reflectionResult");
  if (!thought) {
    result.textContent = "Tuliskan satu pikiran terlebih dahulu, lalu kita periksa bersama.";
    return;
  }
  result.textContent = `Kamu menulis: “${thought}” Coba tanyakan: Apa bukti yang mendukung pikiran ini? Apa yang belum aku ketahui? Apa penjelasan lain yang masuk akal? Apa satu langkah kecil yang bisa kulakukan sekarang?`;
});

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const target = document.querySelector(link.getAttribute("href"));
    if (target) {
      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});
