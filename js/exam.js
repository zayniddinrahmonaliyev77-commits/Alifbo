// Katta Imtihon va Sertifikatlash Tizimi
class ExamManager {
  constructor() {
    this.questions = [];
    this.currentIndex = 0;
    this.score = 0;
    this.userAnswers = [];
    this.totalQuestions = 10;
  }

  generateQuestions() {
    return [
      {
        question: "O'zbek lotin alifbosida nechta unli harf mavjud?",
        options: ["4 ta", "6 ta (A, E, I, O, U, Oʻ)", "8 ta", "10 ta"],
        correct: 1,
        explanation: "O'zbek alifbosida 6 ta unli harf bor: A, E, I, O, U, Oʻ."
      },
      {
        question: "Quyidagi harflardan qaysi biri so'zning boshida HECH QACHON kelmaydi?",
        options: ["Sh", "Ch", "Ng", "Gʻ"],
        correct: 2,
        explanation: "'Ng' tovushi doimo so'z o'rtasida yoki oxirida keladi (masalan: tong, rang, dengiz)."
      },
      {
        question: "'D' harfidan keyin alifboda qaysi harf keladi?",
        options: ["B", "E", "F", "G"],
        correct: 1,
        explanation: "Alifbo tartibi: A, B, D, E, F..."
      },
      {
        question: "Qaysi so'zda tutuq belgisi (ʼ) to'g'ri ishlatilgan?",
        options: ["K'itob", "Aʼlo", "D'araxt", "M'ushuk"],
        correct: 1,
        explanation: "'Aʼlo', 'maʼno', 'sanʼat' kabi so'zlarda tutuq belgisi mavjud."
      },
      {
        question: "Lotin yozuvidagi 'Oʻ oʻ' harfiga kirill alifbosida qaysi harf mos keladi?",
        options: ["Ў ў", "Ғ ғ", "Ҳ ҳ", "Ю ю"],
        correct: 0,
        explanation: "Lotincha 'Oʻ oʻ' harfi kirillda 'Ў ў' sifatida yoziladi."
      },
      {
        question: "'Sher' va 'Shakar' so'zlari qaysi harf bilan boshlanadi?",
        options: ["Ch", "Sh", "S", "J"],
        correct: 1,
        explanation: "Bu so'zlar 'Sh' qo'shma harfi (digrafi) bilan boshlanadi."
      },
      {
        question: "Quyidagilardan qaysi biri jarangli undosh hisoblanadi?",
        options: ["P", "T", "B", "K"],
        correct: 2,
        explanation: "'B' jarangli undosh, uning jarangsiz jufti esa 'P' dir."
      },
      {
        question: "O'zbek alifbosida nechta harf va belgi mavjud?",
        options: ["26 ta", "28 ta", "29 ta harf va tutuq belgisi", "35 ta"],
        correct: 2,
        explanation: "Hozirgi o'zbek lotin alifbosida 29 ta harfiy birlik va tutuq belgisi bor."
      },
      {
        question: "Kirill yozuvidagi 'Ғ ғ' harfi lotin alifbosida qanday yoziladi?",
        options: ["G g", "Gʻ gʻ", "Q q", "H h"],
        correct: 1,
        explanation: "'Ғ ғ' harfi lotin yozuvida 'Gʻ gʻ' tarzida ifodalanadi."
      },
      {
        question: "'Choynak' so'zining birinchi harfi qaysi?",
        options: ["Ch", "Sh", "C", "H"],
        correct: 0,
        explanation: "'Choynak' so'zi 'Ch' harfi bilan boshlanadi."
      }
    ];
  }

  startExam() {
    this.questions = this.generateQuestions();
    this.currentIndex = 0;
    this.score = 0;
    this.userAnswers = [];

    const container = document.getElementById("exam-container");
    container.innerHTML = `
      <div class="max-w-2xl mx-auto bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-indigo-100">
        <div class="flex justify-between items-center mb-6 pb-4 border-b">
          <div>
            <span class="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
              Katta Yakuniy Imtihon
            </span>
            <h2 class="text-2xl font-black text-gray-800 mt-1">Alifbo Bilimdoni Sinovi</h2>
          </div>
          <div class="text-right">
            <span class="text-sm font-semibold text-gray-500">Savol:</span>
            <span class="text-xl font-black text-indigo-600" id="exam-progress-num">1</span>/10
          </div>
        </div>

        <!-- Progress bar -->
        <div class="w-full bg-gray-100 rounded-full h-3 mb-6 overflow-hidden">
          <div id="exam-progress-fill" class="bg-indigo-600 h-3 rounded-full transition-all duration-300" style="width: 10%"></div>
        </div>

        <div id="exam-question-card">
        </div>
      </div>
    `;

    this.renderQuestion();
  }

  renderQuestion() {
    const q = this.questions[this.currentIndex];
    const fillPercent = ((this.currentIndex + 1) / this.totalQuestions) * 100;

    document.getElementById("exam-progress-num").textContent = this.currentIndex + 1;
    document.getElementById("exam-progress-fill").style.width = `${fillPercent}%`;

    const card = document.getElementById("exam-question-card");
    card.innerHTML = `
      <div class="mb-6">
        <h3 class="text-xl font-bold text-gray-800 leading-relaxed">${q.question}</h3>
      </div>
      <div class="grid grid-cols-1 gap-3" id="exam-options-container">
        ${q.options.map((opt, idx) => `
          <button class="exam-option-btn text-left p-4 rounded-2xl border-2 border-gray-200 hover:border-indigo-500 hover:bg-indigo-50/50 font-medium text-gray-700 transition flex items-center justify-between" onclick="examManager.handleAnswer(${idx})">
            <span>${opt}</span>
            <span class="w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center text-xs text-transparent indicator">✓</span>
          </button>
        `).join('')}
      </div>
    `;
  }

  handleAnswer(chosenIdx) {
    const q = this.questions[this.currentIndex];
    const isCorrect = chosenIdx === q.correct;

    if (isCorrect) {
      this.score++;
      audio.playSuccess();
    } else {
      audio.playWrong();
    }

    this.userAnswers.push({
      question: q.question,
      chosen: q.options[chosenIdx],
      correct: q.options[q.correct],
      isCorrect,
      explanation: q.explanation
    });

    const buttons = document.querySelectorAll(".exam-option-btn");
    buttons.forEach((btn, idx) => {
      btn.disabled = true;
      if (idx === q.correct) {
        btn.classList.add("bg-emerald-100", "border-emerald-500", "text-emerald-900");
      } else if (idx === chosenIdx) {
        btn.classList.add("bg-rose-100", "border-rose-500", "text-rose-900");
      }
    });

    setTimeout(() => {
      this.currentIndex++;
      if (this.currentIndex < this.totalQuestions) {
        this.renderQuestion();
      } else {
        this.finishExam();
      }
    }, 900);
  }

  finishExam() {
    audio.playFanfare();
    triggerConfetti();

    const percentage = Math.round((this.score / this.totalQuestions) * 100);
    const passed = percentage >= 70;
    const earnedXP = this.score * 20;
    userProgress.addXP(earnedXP);

    const container = document.getElementById("exam-container");
    container.innerHTML = `
      <div class="max-w-2xl mx-auto bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-indigo-100 text-center">
        <div class="text-7xl mb-3">${passed ? "🎓" : "📚"}</div>
        <h2 class="text-3xl font-black text-gray-800 mb-2">
          ${passed ? "Tabriklaymiz, Sinovdan O'tdingiz!" : "Yaxshi Harakat!"}
        </h2>
        <p class="text-gray-600 mb-6">
          ${passed ? "Siz o'zbek alifbosi bo'yicha mustahkam bilimga ega ekanligingizni isbotladingiz." : "Biroz ko'proq mashq qilib, yana sinab ko'ring!"}
        </p>

        <div class="flex justify-center gap-6 my-6">
          <div class="bg-indigo-50 border border-indigo-100 p-4 rounded-2xl min-w-[130px]">
            <span class="block text-3xl font-black text-indigo-600">${this.score} / ${this.totalQuestions}</span>
            <span class="text-xs text-gray-500 font-semibold">To'g'ri javoblar</span>
          </div>
          <div class="bg-emerald-50 border border-emerald-100 p-4 rounded-2xl min-w-[130px]">
            <span class="block text-3xl font-black text-emerald-600">${percentage}%</span>
            <span class="text-xs text-gray-500 font-semibold">Natija</span>
          </div>
          <div class="bg-amber-50 border border-amber-100 p-4 rounded-2xl min-w-[130px]">
            <span class="block text-3xl font-black text-amber-600">+${earnedXP}</span>
            <span class="text-xs text-gray-500 font-semibold">Yig'ilgan XP</span>
          </div>
        </div>

        ${passed ? `
          <div class="my-6 p-6 bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 rounded-2xl border border-indigo-200">
            <h3 class="text-lg font-bold text-indigo-900 mb-2">🏅 Shaxsiy Sertifikatni Qabul Qiling!</h3>
            <p class="text-sm text-gray-600 mb-4">Sertifikatda ko'rinadigan ismingizni kiriting:</p>
            <div class="flex max-w-sm mx-auto gap-2">
              <input type="text" id="cert-user-name" placeholder="Ismingiz (masalan: Jasur)" class="flex-1 px-4 py-2.5 rounded-xl border border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-semibold">
              <button class="primary-btn py-2.5 px-5" onclick="examManager.generateCertificate(${percentage})">
                Olish 📜
              </button>
            </div>
          </div>
        ` : `
          <div class="my-6">
            <button class="primary-btn py-3 px-8 text-lg" onclick="examManager.startExam()">
              <i class="fas fa-redo mr-2"></i> Qaytadan topshirish
            </button>
          </div>
        `}

        <div class="mt-8 text-left border-t pt-6">
          <h4 class="font-bold text-gray-800 mb-4">Savollar tahlili:</h4>
          <div class="space-y-3">
            ${this.userAnswers.map((item, idx) => `
              <div class="p-3.5 rounded-xl ${item.isCorrect ? 'bg-emerald-50/60 border border-emerald-200' : 'bg-rose-50/60 border border-rose-200'} text-sm">
                <div class="flex items-start justify-between font-bold mb-1">
                  <span>${idx + 1}. ${item.question}</span>
                  <span class="${item.isCorrect ? 'text-emerald-600' : 'text-rose-600'}">${item.isCorrect ? 'To\'g\'ri ✓' : 'Noto\'g\'ri ✗'}</span>
                </div>
                <div class="text-xs text-gray-600 mt-1">
                  Sizning javobingiz: <span class="font-semibold">${item.chosen}</span> | To'g'ri javob: <span class="font-bold text-emerald-700">${item.correct}</span>
                </div>
                <div class="text-xs text-indigo-700 mt-1 italic">
                  💡 Izoh: ${item.explanation}
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }

  generateCertificate(percentage) {
    const input = document.getElementById("cert-user-name");
    const name = (input && input.value.trim()) ? input.value.trim() : "Alifbo Bilimdoni";
    const dateStr = new Date().toLocaleDateString("uz-UZ", { year: 'numeric', month: 'long', day: 'numeric' });

    const modal = document.getElementById("certificate-modal");
    modal.classList.remove("hidden");

    const certContent = document.getElementById("certificate-render-area");
    certContent.innerHTML = `
      <div id="printable-certificate" class="relative bg-amber-50/40 p-8 sm:p-12 rounded-3xl border-8 border-double border-indigo-900 text-center shadow-2xl overflow-hidden font-serif">
        <div class="absolute top-4 left-4 w-16 h-16 border-t-4 border-l-4 border-indigo-700 pointer-events-none"></div>
        <div class="absolute top-4 right-4 w-16 h-16 border-t-4 border-r-4 border-indigo-700 pointer-events-none"></div>
        <div class="absolute bottom-4 left-4 w-16 h-16 border-b-4 border-l-4 border-indigo-700 pointer-events-none"></div>
        <div class="absolute bottom-4 right-4 w-16 h-16 border-b-4 border-r-4 border-indigo-700 pointer-events-none"></div>

        <div class="text-indigo-900 uppercase font-sans tracking-widest text-xs font-bold mb-2">O'zbekiston Ta'lim va Innovatsiyalar Platformasi</div>
        <h1 class="text-4xl sm:text-5xl font-black text-indigo-950 my-2 tracking-wide font-serif">SERTIFIKAT</h1>
        <div class="text-sm font-sans text-gray-600 uppercase tracking-widest mb-6">Alifbo Akademiyasi A'lochisi</div>

        <p class="text-gray-700 text-base sm:text-lg italic font-sans mb-3">Ushbu sertifikat bilan tasdiqlanadiki:</p>
        <h2 class="text-3xl sm:text-4xl font-extrabold text-indigo-800 underline decoration-indigo-300 decoration-wavy underline-offset-8 mb-6 font-sans">
          ${name}
        </h2>
        
        <p class="text-gray-700 max-w-lg mx-auto text-base sm:text-lg leading-relaxed font-sans mb-8">
          O'zbek lotin alifbosini 0 dan boshlab to'liq va mukammal o'zlashtirdi, barcha interaktiv o'yinlar va sinovlardan muvaffaqiyatli o'tib, <strong>${percentage}%</strong> natija ko'rsatdi!
        </p>

        <div class="flex justify-between items-center max-w-md mx-auto pt-6 border-t border-indigo-200 font-sans">
          <div class="text-left">
            <span class="block text-xs text-gray-500 font-semibold">Sana:</span>
            <span class="text-sm font-bold text-gray-800">${dateStr}</span>
          </div>
          <div class="text-4xl filter drop-shadow">
            🏅
          </div>
          <div class="text-right">
            <span class="block text-xs text-gray-500 font-semibold">Daraja:</span>
            <span class="text-sm font-bold text-emerald-600">A'lochi Bilimdon</span>
          </div>
        </div>
      </div>
    `;

    audio.playFanfare();
  }
}

const examManager = new ExamManager();

