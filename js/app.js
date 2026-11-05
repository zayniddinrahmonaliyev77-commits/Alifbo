// Foydalanuvchi rivojlanishi, holati va asosiy dastur logikasi
class UserProgress {
  constructor() {
    this.xp = 0;
    this.level = 1;
    this.learnedLetters = new Set();
    this.practicedLetters = new Set();
    this.badges = [];
    this.loadProgress();
  }

  loadProgress() {
    try {
      const saved = localStorage.getItem("alifbe_user_progress");
      if (saved) {
        const data = JSON.parse(saved);
        this.xp = data.xp || 0;
        this.level = Math.floor(this.xp / 100) + 1;
        this.learnedLetters = new Set(data.learnedLetters || []);
        this.practicedLetters = new Set(data.practicedLetters || []);
        this.badges = data.badges || [];
      }
    } catch (e) {
      console.warn("Progress yuklashda xatolik:", e);
    }
  }

  saveProgress() {
    try {
      const data = {
        xp: this.xp,
        learnedLetters: Array.from(this.learnedLetters),
        practicedLetters: Array.from(this.practicedLetters),
        badges: this.badges
      };
      localStorage.setItem("alifbe_user_progress", JSON.stringify(data));
      this.updateUI();
    } catch (e) {}
  }

  addXP(amount) {
    const oldLevel = this.level;
    this.xp += amount;
    this.level = Math.floor(this.xp / 100) + 1;

    if (this.level > oldLevel) {
      this.triggerLevelUp();
    }

    this.checkBadges();
    this.saveProgress();
  }

  markLetterLearned(letterId) {
    if (!this.learnedLetters.has(letterId)) {
      this.learnedLetters.add(letterId);
      this.addXP(15);
      this.checkBadges();
      this.saveProgress();
    }
  }

  markLetterPracticed(letterId) {
    if (!this.practicedLetters.has(letterId)) {
      this.practicedLetters.add(letterId);
      this.addXP(20);
      this.checkBadges();
      this.saveProgress();
    }
  }

  checkBadges() {
    const newBadges = [];

    if (this.learnedLetters.size >= 1 && !this.hasBadge("first_step")) {
      newBadges.push({ id: "first_step", title: "Birinchi Qadam", icon: "🌱", desc: "Birinchi harfni o'rgandingiz!" });
    }

    // Unlilarni tekshirish (a, e, i, o, u, o_g)
    const vowels = ["a", "e", "i", "o", "u", "o_g"];
    const allVowelsLearned = vowels.every(v => this.learnedLetters.has(v));
    if (allVowelsLearned && !this.hasBadge("vowel_master")) {
      newBadges.push({ id: "vowel_master", title: "Unlilar Bilimdoni", icon: "⭐", desc: "Barcha 6 ta unlini to'liq o'rgandingiz!" });
    }

    if (this.practicedLetters.size >= 5 && !this.hasBadge("calligrapher")) {
      newBadges.push({ id: "calligrapher", title: "Mohir Xattot", icon: "✍️", desc: "5 ta harf ustidan chiroyli yozib chiqdingiz!" });
    }

    if (this.learnedLetters.size >= 29 && !this.hasBadge("alphabet_hero")) {
      newBadges.push({ id: "alphabet_hero", title: "Alifbo Qahramoni", icon: "👑", desc: "Barcha 29 ta harfni to'liq zabt etdingiz!" });
    }

    if (this.xp >= 300 && !this.hasBadge("star_student")) {
      newBadges.push({ id: "star_student", title: "Zukko O'quvchi", icon: "🏆", desc: "300 dan ortiq tajriba balliga erishdingiz!" });
    }

    newBadges.forEach(b => {
      this.badges.push(b);
      this.showBadgeNotification(b);
    });
  }

  hasBadge(id) {
    return this.badges.some(b => b.id === id);
  }

  triggerLevelUp() {
    audio.playFanfare();
    triggerConfetti();
    const popup = document.createElement("div");
    popup.className = "fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-fade-in";
    popup.innerHTML = `
      <div class="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl transform scale-100 animate-bounce">
        <div class="text-6xl mb-2">🎉</div>
        <h3 class="text-2xl font-black text-indigo-900">Yangi Daraja!</h3>
        <p class="text-indigo-600 font-extrabold text-xl my-2">Daraja ${this.level}: ${this.getLevelTitle()}</p>
        <p class="text-sm text-gray-600 mb-6">Ofarin! Siz o'zbek alifbosini yuqori darajada o'zlashtirmoqdasiz!</p>
        <button class="primary-btn w-full py-3" onclick="this.closest('.fixed').remove()">
          Davom etish 🚀
        </button>
      </div>
    `;
    document.body.appendChild(popup);
  }

  showBadgeNotification(badge) {
    audio.playStar();
    const toast = document.createElement("div");
    toast.className = "fixed bottom-5 right-5 z-50 bg-white border-2 border-amber-400 p-4 rounded-2xl shadow-xl flex items-center gap-3 animate-slide-up max-w-xs";
    toast.innerHTML = `
      <div class="text-4xl">${badge.icon}</div>
      <div>
        <span class="text-xs uppercase font-bold text-amber-600">Yangi Yutuq!</span>
        <h4 class="font-bold text-gray-800 text-sm">${badge.title}</h4>
        <p class="text-xs text-gray-500">${badge.desc}</p>
      </div>
    `;
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateY(20px)";
      setTimeout(() => toast.remove(), 400);
    }, 4000);
  }

  getLevelTitle() {
    if (this.level <= 1) return "Boshlovchi";
    if (this.level <= 2) return "Qiziquvchan";
    if (this.level <= 3) return "Zukko";
    if (this.level <= 5) return "Bilimdon";
    if (this.level <= 8) return "Alifbo Ustasi";
    return "Akademik";
  }

  updateUI() {
    // XP va Daraja
    const xpEl = document.getElementById("header-user-xp");
    const levelEl = document.getElementById("header-user-level");
    const levelTitleEl = document.getElementById("header-user-title");
    const progressFill = document.getElementById("header-level-progress");

    if (xpEl) xpEl.textContent = this.xp;
    if (levelEl) levelEl.textContent = this.level;
    if (levelTitleEl) levelTitleEl.textContent = this.getLevelTitle();

    const xpInCurrentLevel = this.xp % 100;
    if (progressFill) progressFill.style.width = `${xpInCurrentLevel}%`;

    // Statistikalar
    const learnedCountEl = document.getElementById("stat-learned-count");
    if (learnedCountEl) learnedCountEl.textContent = `${this.learnedLetters.size} / 29`;

    const practicedCountEl = document.getElementById("stat-practiced-count");
    if (practicedCountEl) practicedCountEl.textContent = `${this.practicedLetters.size} / 29`;
  }
}

const userProgress = new UserProgress();

// Asosiy sahifa holati
let currentScript = "latin"; // 'latin' yoki 'cyrillic'
let currentFilter = "all"; // 'all', 'vowels', 'consonants'
let currentActiveSection = "alifbe";

// Sahifani ishga tushirish
document.addEventListener("DOMContentLoaded", () => {
  renderAlphabetGrid();
  renderDictionaryList();
  renderBadgesList();
  userProgress.updateUI();
  tracingApp.init();

  // Boshlang'ich birinchi harfni Tracing-ga yuklash
  if (ALPHABET_DATA.latin.length > 0) {
    tracingApp.loadLetter(ALPHABET_DATA.latin[0], true);
  }

  setupEventListeners();
});

function setupEventListeners() {
  // Yozuv o'lchami va rang tanlagichlari
  document.querySelectorAll(".color-dot").forEach(dot => {
    dot.onclick = () => {
      document.querySelectorAll(".color-dot").forEach(d => d.classList.remove("ring-4", "ring-indigo-300"));
      dot.classList.add("ring-4", "ring-indigo-300");
      tracingApp.setBrushColor(dot.dataset.color);
    };
  });

  // Ovoz va speech sozlamalari tugmalari
  const soundToggleBtn = document.getElementById("sound-toggle-btn");
  if (soundToggleBtn) {
    soundToggleBtn.onclick = () => {
      const state = audio.toggleSound();
      soundToggleBtn.innerHTML = state ? '<i class="fas fa-volume-up"></i>' : '<i class="fas fa-volume-mute text-gray-400"></i>';
      audio.playClick();
    };
  }

  // Mobil menyu
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const mobileNav = document.getElementById("mobile-nav");
  if (mobileMenuBtn && mobileNav) {
    mobileMenuBtn.onclick = () => {
      mobileNav.classList.toggle("hidden");
    };
  }
}

// Bo'limlararo o'tish (SPA Router)
function navigateToSection(sectionId) {
  currentActiveSection = sectionId;
  audio.playClick();

  // Barcha bo'limlarni yashirish
  document.querySelectorAll(".app-section").forEach(sec => {
    sec.classList.add("hidden");
  });

  // Tanlangan bo'limni ko'rsatish
  const targetSection = document.getElementById(`section-${sectionId}`);
  if (targetSection) {
    targetSection.classList.remove("hidden");
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Navigatsiya tugmalari holatini yangilash
  document.querySelectorAll(".nav-link").forEach(link => {
    if (link.dataset.section === sectionId) {
      link.classList.add("active-nav");
    } else {
      link.classList.remove("active-nav");
    }
  });

  // Bo'limga xos qayta yuklashlar
  if (sectionId === "games") {
    // Agar o'yin tanlanmagan bo'lsa, ro'yxatni ko'rsatish
    const gameArea = document.getElementById("game-play-area");
    if (!gamesHub.currentGame) {
      showGameSelector();
    }
  } else if (sectionId === "exam") {
    examManager.startExam();
  } else if (sectionId === "achievements") {
    renderBadgesList();
  } else if (sectionId === "tracing") {
    setTimeout(() => {
      tracingApp.setupCanvasSize();
      tracingApp.drawGuide();
    }, 100);
  }

  // Mobil menyuni yopish
  const mobileNav = document.getElementById("mobile-nav");
  if (mobileNav) mobileNav.classList.add("hidden");
}

// O'yinlar tanlash menyusi
function showGameSelector() {
  gamesHub.currentGame = null;
  const gameArea = document.getElementById("game-play-area");
  gameArea.innerHTML = `
    <div class="text-center max-w-2xl mx-auto py-4">
      <span class="inline-block px-4 py-1.5 rounded-full bg-indigo-100 text-indigo-700 font-bold text-sm mb-3">
        🎮 6 xil qiziqarli o'yin
      </span>
      <h2 class="text-3xl font-black text-gray-800 mb-2">O'yin orqali alifboni o'rganing!</h2>
      <p class="text-gray-600 mb-8">Quyidagi o'yinlardan birini tanlang va bilimingizni sinab ko'ring:</p>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 text-left">
        <!-- O'yin 1 -->
        <div class="game-select-card group" onclick="gamesHub.startFindLetterGame()">
          <div class="w-14 h-14 rounded-2xl bg-indigo-100 flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition">
            🎯
          </div>
          <h3 class="font-extrabold text-gray-800 text-lg mb-1 group-hover:text-indigo-600 transition">Harfni Top</h3>
          <p class="text-xs text-gray-500">Ovozni tinglab, to'g'ri harfni topish viktorinasi.</p>
          <div class="mt-4 flex items-center text-xs font-bold text-indigo-600">
            O'ynash <i class="fas fa-arrow-right ml-1"></i>
          </div>
        </div>

        <!-- O'yin 2 -->
        <div class="game-select-card group" onclick="gamesHub.startPictureMatchGame()">
          <div class="w-14 h-14 rounded-2xl bg-emerald-100 flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition">
            🖼️
          </div>
          <h3 class="font-extrabold text-gray-800 text-lg mb-1 group-hover:text-emerald-600 transition">Rasm va Harf</h3>
          <p class="text-xs text-gray-500">Chiroyli rasmga qarab so'zning bosh harfini toping.</p>
          <div class="mt-4 flex items-center text-xs font-bold text-emerald-600">
            O'ynash <i class="fas fa-arrow-right ml-1"></i>
          </div>
        </div>

        <!-- O'yin 3 -->
        <div class="game-select-card group" onclick="gamesHub.startMemoryGame()">
          <div class="w-14 h-14 rounded-2xl bg-amber-100 flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition">
            🧠
          </div>
          <h3 class="font-extrabold text-gray-800 text-lg mb-1 group-hover:text-amber-600 transition">Xotira O'yini</h3>
          <p class="text-xs text-gray-500">Katakchalarni ochib harf va rasmlar juftligini eslab qoling.</p>
          <div class="mt-4 flex items-center text-xs font-bold text-amber-600">
            O'ynash <i class="fas fa-arrow-right ml-1"></i>
          </div>
        </div>

        <!-- O'yin 4 -->
        <div class="game-select-card group" onclick="gamesHub.startWordBuilderGame()">
          <div class="w-14 h-14 rounded-2xl bg-rose-100 flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition">
            🧩
          </div>
          <h3 class="font-extrabold text-gray-800 text-lg mb-1 group-hover:text-rose-600 transition">So'z Yig'uvchi</h3>
          <p class="text-xs text-gray-500">Tarqoq harflarni ketma-ket joylab butun so'z yasang.</p>
          <div class="mt-4 flex items-center text-xs font-bold text-rose-600">
            O'ynash <i class="fas fa-arrow-right ml-1"></i>
          </div>
        </div>

        <!-- O'yin 5 -->
        <div class="game-select-card group" onclick="gamesHub.startLetterRainGame()">
          <div class="w-14 h-14 rounded-2xl bg-sky-100 flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition">
            🌧️
          </div>
          <h3 class="font-extrabold text-gray-800 text-lg mb-1 group-hover:text-sky-600 transition">Harf Yomg'iri</h3>
          <p class="text-xs text-gray-500">Osmondan tushayotgan harflarni yerga tushmasdan tutib oling.</p>
          <div class="mt-4 flex items-center text-xs font-bold text-sky-600">
            O'ynash <i class="fas fa-arrow-right ml-1"></i>
          </div>
        </div>

        <!-- O'yin 6 (Mashq) -->
        <div class="game-select-card group" onclick="navigateToSection('tracing')">
          <div class="w-14 h-14 rounded-2xl bg-purple-100 flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition">
            ✍️
          </div>
          <h3 class="font-extrabold text-gray-800 text-lg mb-1 group-hover:text-purple-600 transition">Harf Yozish</h3>
          <p class="text-xs text-gray-500">Doskada harflarni barmoq yoki sichqoncha bilan yozish mashqi.</p>
          <div class="mt-4 flex items-center text-xs font-bold text-purple-600">
            Mashq qilish <i class="fas fa-arrow-right ml-1"></i>
          </div>
        </div>
      </div>
    </div>
  `;
}

// Alifbo kartochkalarini ekranga chiqarish
function renderAlphabetGrid() {
  const container = document.getElementById("alphabet-grid");
  if (!container) return;

  container.innerHTML = "";
  const list = ALPHABET_DATA.latin;

  const filtered = list.filter(item => {
    if (currentFilter === "vowels") return item.type === "unli";
    if (currentFilter === "consonants") return item.type === "undosh";
    return true;
  });

  filtered.forEach(item => {
    const isLearned = userProgress.learnedLetters.has(item.id);
    const card = document.createElement("div");
    card.className = `letter-card ${isLearned ? 'border-emerald-300 bg-emerald-50/20' : ''}`;

    const displayUpper = currentScript === "latin" ? item.upper : item.cyrillic.split(' ')[0];
    const displayLower = currentScript === "latin" ? item.lower : item.cyrillic.split(' ')[1] || '';
    const displayWord = currentScript === "latin" ? item.word : item.wordCyrillic;

    card.innerHTML = `
      <div class="flex justify-between items-start mb-2">
        <span class="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${item.type === 'unli' ? 'bg-amber-100 text-amber-700' : 'bg-indigo-100 text-indigo-700'}">
          ${item.type === 'unli' ? 'Unli' : 'Undosh'}
        </span>
        <button class="speak-btn hover:scale-110 transition" title="Ovozni tinglash" onclick="event.stopPropagation(); audio.speakLetter(${JSON.stringify(item).replace(/"/g, '&quot;')})">
          <i class="fas fa-volume-up text-sm text-gray-500 hover:text-indigo-600"></i>
        </button>
      </div>

      <div class="text-center py-2">
        <div class="text-5xl font-black text-gray-800 tracking-tight mb-1">
          ${displayUpper} <span class="text-4xl text-indigo-600 font-bold">${displayLower}</span>
        </div>
        <div class="text-3xl my-2 filter drop-shadow">${item.emoji}</div>
        <div class="text-lg font-bold text-gray-800">${displayWord}</div>
        <div class="text-xs text-gray-500">${item.name}</div>
      </div>

      <div class="mt-3 pt-2 border-t border-gray-100 flex justify-between items-center text-xs">
        <span class="${isLearned ? 'text-emerald-600 font-bold' : 'text-gray-400'}">
          ${isLearned ? '✓ O\'rganildi' : 'O\'rganish'}
        </span>
        <span class="text-indigo-600 font-semibold group-hover:underline">Batafsil →</span>
      </div>
    `;

    card.onclick = () => openLetterDetailModal(item);
    container.appendChild(card);
  });

  // Agar 'all' filtri tanlangan bo'lsa, Tutuq belgisi kartasini ham qo'shish
  if (currentFilter === "all") {
    const sign = ALPHABET_DATA.specialSign;
    const signCard = document.createElement("div");
    signCard.className = "letter-card border-purple-200 bg-purple-50/20";
    signCard.innerHTML = `
      <div class="flex justify-between items-start mb-2">
        <span class="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-purple-100 text-purple-700">
          Maxsus belgi
        </span>
      </div>
      <div class="text-center py-2">
        <div class="text-6xl font-black text-purple-900 tracking-tight mb-1">
          ${currentScript === 'latin' ? sign.symbol : sign.cyrillic}
        </div>
        <div class="text-3xl my-2">💡</div>
        <div class="text-lg font-bold text-gray-800">${sign.name}</div>
        <div class="text-xs text-gray-500">Ajratish va cho'ziqlik</div>
      </div>
      <div class="mt-3 pt-2 border-t border-gray-100 text-center text-xs text-purple-600 font-bold">
        Misollar: Aʼlo, Maʼno →
      </div>
    `;
    signCard.onclick = () => openSpecialSignModal();
    container.appendChild(signCard);
  }
}

// Harf batafsil ko'rish modali
function openLetterDetailModal(item) {
  audio.playClick();
  audio.speakLetter(item);
  userProgress.markLetterLearned(item.id);

  const modal = document.getElementById("letter-detail-modal");
  modal.classList.remove("hidden");

  const isUpper = true;
  document.getElementById("modal-upper-char").textContent = item.upper;
  document.getElementById("modal-lower-char").textContent = item.lower;
  document.getElementById("modal-cyrillic-char").textContent = item.cyrillic;
  document.getElementById("modal-letter-name").textContent = item.name + " (" + item.typeLabel + ")";
  document.getElementById("modal-letter-hint").textContent = item.pronounceHint;

  // Asosiy so'z va gap
  document.getElementById("modal-main-emoji").textContent = item.emoji;
  document.getElementById("modal-main-word").textContent = item.word;
  document.getElementById("modal-main-sentence").textContent = item.sentence;

  // Qo'shimcha so'zlar
  const extraWordsContainer = document.getElementById("modal-extra-words");
  extraWordsContainer.innerHTML = item.words.map(w => `
    <div class="p-3 bg-gray-50 rounded-2xl flex items-center gap-3 border border-gray-100 hover:bg-indigo-50/50 cursor-pointer transition" onclick="audio.speak('${w.word}')">
      <span class="text-3xl">${w.emoji}</span>
      <div>
        <h5 class="font-bold text-gray-800 text-sm">${w.word}</h5>
        <p class="text-xs text-gray-500">${w.text}</p>
      </div>
    </div>
  `).join('');

  // Tugmalar
  document.getElementById("modal-speak-btn").onclick = () => audio.speakLetter(item);
  document.getElementById("modal-practice-btn").onclick = () => {
    closeModal("letter-detail-modal");
    navigateToSection("tracing");
    const list = ALPHABET_DATA.latin;
    const idx = list.findIndex(l => l.id === item.id);
    if (idx !== -1) currentTracingIdx = idx;
    tracingApp.loadLetter(item, true);
  };
}

// Tutuq belgisi modali
function openSpecialSignModal() {
  const sign = ALPHABET_DATA.specialSign;
  const modal = document.getElementById("letter-detail-modal");
  modal.classList.remove("hidden");

  document.getElementById("modal-upper-char").textContent = sign.symbol;
  document.getElementById("modal-lower-char").textContent = sign.cyrillic;
  document.getElementById("modal-cyrillic-char").textContent = sign.cyrillic;
  document.getElementById("modal-letter-name").textContent = sign.name;
  document.getElementById("modal-letter-hint").textContent = sign.description;

  document.getElementById("modal-main-emoji").textContent = "💡";
  document.getElementById("modal-main-word").textContent = "Aʼlo (🌟)";
  document.getElementById("modal-main-sentence").textContent = "Tutuq belgisi unlini cho'zadi yoki so'z bo'g'inlarini aniq ajratadi.";

  const extraWordsContainer = document.getElementById("modal-extra-words");
  extraWordsContainer.innerHTML = sign.examples.map(w => `
    <div class="p-3 bg-purple-50 rounded-2xl flex items-center gap-3 border border-purple-100 hover:bg-purple-100 cursor-pointer transition" onclick="audio.speak('${w.word}')">
      <span class="text-3xl">${w.emoji}</span>
      <div>
        <h5 class="font-bold text-gray-800 text-sm">${w.word}</h5>
        <p class="text-xs text-gray-500">${w.meaning}</p>
      </div>
    </div>
  `).join('');

  document.getElementById("modal-speak-btn").onclick = () => audio.speak("Tutuq belgisi");
  document.getElementById("modal-practice-btn").style.display = "none";
}

function closeModal(modalId) {
  audio.playClick();
  const m = document.getElementById(modalId);
  if (m) m.classList.add("hidden");
  const practiceBtn = document.getElementById("modal-practice-btn");
  if (practiceBtn) practiceBtn.style.display = "inline-flex";
}

// Tracing natijasini ko'rsatuvchi modal
function showTracingResult(stars, feedback, xpGain, letterObj) {
  const modal = document.getElementById("tracing-result-modal");
  modal.classList.remove("hidden");

  document.getElementById("tr-stars").textContent = "⭐".repeat(stars);
  document.getElementById("tr-feedback").textContent = feedback;
  document.getElementById("tr-xp").textContent = `+${xpGain} XP`;

  document.getElementById("tr-next-btn").onclick = () => {
    closeModal("tracing-result-modal");
    // Keyingi harfga o'tish
    const list = ALPHABET_DATA.latin;
    const currIdx = list.findIndex(l => l.id === letterObj.id);
    const nextIdx = (currIdx + 1) % list.length;
    currentTracingIdx = nextIdx;
    tracingApp.loadLetter(list[nextIdx], tracingApp.isUpperCase);
    document.getElementById("tracing-letter-display").textContent = `${list[nextIdx].upper} ${list[nextIdx].lower}`;
  };
}

// Alifbo filtrlash va alifbo scriptini o'zgartirish
function setScript(script) {
  currentScript = script;
  audio.playClick();
  document.querySelectorAll(".script-btn").forEach(btn => {
    if (btn.dataset.script === script) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });
  renderAlphabetGrid();
  renderDictionaryList();
}

function setFilter(filter) {
  currentFilter = filter;
  audio.playClick();
  document.querySelectorAll(".filter-btn").forEach(btn => {
    if (btn.dataset.filter === filter) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });
  renderAlphabetGrid();
}

// Rasmli Lug'at bo'limini render qilish
function renderDictionaryList() {
  const container = document.getElementById("dictionary-grid");
  if (!container) return;

  container.innerHTML = "";
  const list = ALPHABET_DATA.latin;

  list.forEach(item => {
    const card = document.createElement("div");
    card.className = "bg-white p-5 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition flex flex-col justify-between";
    card.innerHTML = `
      <div>
        <div class="flex items-center justify-between mb-3">
          <span class="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-700 font-black text-xl flex items-center justify-center">
            ${currentScript === 'latin' ? item.upper : item.cyrillic.split(' ')[0]}
          </span>
          <button class="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-500 hover:text-indigo-600 transition" onclick="audio.speak('${item.word}')">
            <i class="fas fa-volume-up"></i>
          </button>
        </div>
        <div class="text-center my-3">
          <span class="text-5xl filter drop-shadow">${item.emoji}</span>
          <h4 class="text-xl font-bold text-gray-800 mt-2">${currentScript === 'latin' ? item.word : item.wordCyrillic}</h4>
          <p class="text-xs text-indigo-600 font-semibold">${item.translation}</p>
        </div>
        <p class="text-xs text-gray-600 mt-2 italic bg-gray-50 p-2.5 rounded-xl border border-gray-100">
          "${item.sentence}"
        </p>
      </div>

      <div class="mt-4 pt-3 border-t border-gray-100 flex flex-wrap gap-1.5">
        ${item.words.map(w => `
          <span class="px-2 py-1 bg-indigo-50/60 text-indigo-800 text-xs rounded-lg font-medium cursor-pointer hover:bg-indigo-100 transition" onclick="audio.speak('${w.word}')">
            ${w.emoji} ${w.word}
          </span>
        `).join('')}
      </div>
    `;
    container.appendChild(card);
  });
}

// Yutuqlar (Badges) ro'yxatini render qilish
function renderBadgesList() {
  const container = document.getElementById("badges-grid");
  if (!container) return;

  const allBadges = [
    { id: "first_step", title: "Birinchi Qadam", icon: "🌱", desc: "Birinchi harfni o'rganganda beriladi." },
    { id: "vowel_master", title: "Unlilar Bilimdoni", icon: "⭐", desc: "Barcha 6 ta unlini to'liq o'zlashtirganda beriladi." },
    { id: "calligrapher", title: "Mohir Xattot", icon: "✍️", desc: "5 ta harf ustidan chizish mashqini bajarganda beriladi." },
    { id: "alphabet_hero", title: "Alifbo Qahramoni", icon: "👑", desc: "Barcha 29 ta harfni to'liq o'zlashtirganda beriladi." },
    { id: "star_student", title: "Zukko O'quvchi", icon: "🏆", desc: "300 dan ortiq tajriba (XP) balli to'plaganda beriladi." },
    { id: "exam_pass", title: "Imtihon A'lochisi", icon: "🎓", desc: "Katta imtihonda 80% dan yuqori natija olganda beriladi." }
  ];

  container.innerHTML = allBadges.map(badge => {
    const isUnlocked = userProgress.hasBadge(badge.id);
    return `
      <div class="p-5 rounded-3xl border ${isUnlocked ? 'bg-gradient-to-br from-amber-50 to-orange-50 border-amber-300 shadow-md' : 'bg-gray-50/60 border-gray-200 opacity-60'} flex items-center gap-4 transition">
        <div class="w-16 h-16 rounded-2xl ${isUnlocked ? 'bg-amber-400/20 text-4xl' : 'bg-gray-200 text-3xl grayscale'} flex items-center justify-center flex-shrink-0">
          ${badge.icon}
        </div>
        <div>
          <div class="flex items-center gap-2">
            <h4 class="font-extrabold text-gray-800 text-base">${badge.title}</h4>
            ${isUnlocked ? '<span class="text-xs bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">Ochildi ✓</span>' : '<span class="text-xs bg-gray-200 text-gray-600 font-medium px-2 py-0.5 rounded-full">Qulflangan 🔒</span>'}
          </div>
          <p class="text-xs text-gray-500 mt-1">${badge.desc}</p>
        </div>
      </div>
    `;
  }).join('');
}

// Konfetti effekti (Pure Vanilla Canvas Confetti)
function triggerConfetti() {
  const canvas = document.createElement("canvas");
  canvas.className = "fixed inset-0 pointer-events-none z-50 w-full h-full";
  document.body.appendChild(canvas);

  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];
  const colors = ["#ef4444", "#3b82f6", "#10b981", "#f59e0b", "#8b5cf6", "#ec4899"];

  for (let i = 0; i < 90; i++) {
    particles.push({
      x: canvas.width / 2,
      y: canvas.height / 2,
      vx: (Math.random() - 0.5) * 16,
      vy: (Math.random() - 0.7) * 18,
      size: Math.random() * 8 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      vRot: (Math.random() - 0.5) * 10,
      gravity: 0.35,
      opacity: 1
    });
  }

  let animationId;
  const loop = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let alive = false;

    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity;
      p.rotation += p.vRot;
      p.opacity -= 0.012;

      if (p.opacity > 0) {
        alive = true;
        ctx.save();
        ctx.globalAlpha = p.opacity;
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        ctx.restore();
      }
    });

    if (alive) {
      animationId = requestAnimationFrame(loop);
    } else {
      cancelAnimationFrame(animationId);
      canvas.remove();
    }
  };

  loop();
}
