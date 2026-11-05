// 6 ta Interaktiv Ta'limiy O'yinlar tizimi
class GamesHub {
  constructor() {
    this.currentGame = null;
    this.score = 0;
    this.streak = 0;
    this.round = 0;
    this.totalRounds = 10;
    this.timerInterval = null;
    this.timeLeft = 0;
  }

  // Yordamchi tasodifiy element tanlagich
  getRandom(arr, count = 1) {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return count === 1 ? shuffled[0] : shuffled.slice(0, count);
  }

  // O'yin 1: "Harfni Top" (Tingla va Harfni Tanla)
  startFindLetterGame() {
    this.currentGame = "findLetter";
    this.score = 0;
    this.streak = 0;
    this.round = 1;
    this.totalRounds = 10;

    const container = document.getElementById("game-play-area");
    container.innerHTML = `
      <div class="game-header-bar">
        <div class="stat-badge"><i class="fas fa-star text-amber-400"></i> Ball: <span id="game-score">0</span></div>
        <div class="stat-badge"><i class="fas fa-fire text-orange-500"></i> Ketma-ket: <span id="game-streak">0</span></div>
        <div class="stat-badge"><i class="fas fa-flag text-indigo-500"></i> Bosqich: <span id="game-round">1</span>/10</div>
      </div>
      <div class="game-card text-center">
        <div class="mb-4">
          <span class="inline-block px-4 py-1.5 rounded-full bg-indigo-100 text-indigo-800 font-semibold text-sm">
            Tinglang va to'g'ri harfni tanlang
          </span>
        </div>
        <div class="flex items-center justify-center gap-4 my-6">
          <button id="repeat-audio-btn" class="big-audio-btn shadow-lg" title="Ovozni qayta tinglash">
            <i class="fas fa-volume-up text-3xl"></i>
          </button>
          <div class="text-left">
            <h3 class="text-2xl font-bold text-gray-800" id="prompt-text">Qaysi harf yangramoqda?</h3>
            <p class="text-sm text-gray-500">Tugmani bosib qayta eshitishingiz mumkin</p>
          </div>
        </div>
        <div id="options-grid" class="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-lg mx-auto mt-6">
        </div>
      </div>
    `;

    document.getElementById("repeat-audio-btn").onclick = () => {
      if (this.currentQuestion) {
        audio.speak(this.currentQuestion.target.name + " harfi");
      }
    };

    this.nextFindLetterRound();
  }

  nextFindLetterRound() {
    if (this.round > this.totalRounds) {
      this.finishGame("Harfni Top", this.score);
      return;
    }

    document.getElementById("game-round").textContent = this.round;
    document.getElementById("game-score").textContent = this.score;
    document.getElementById("game-streak").textContent = this.streak;

    const alphabet = ALPHABET_DATA.latin;
    const target = this.getRandom(alphabet);
    const others = this.getRandom(alphabet.filter(l => l.id !== target.id), 3);
    const options = [target, ...others].sort(() => 0.5 - Math.random());

    this.currentQuestion = { target, options };

    // Harf talaffuzini aytish
    setTimeout(() => {
      audio.speak(target.name + " harfini toping");
    }, 200);

    const grid = document.getElementById("options-grid");
    grid.innerHTML = "";

    options.forEach(opt => {
      const btn = document.createElement("button");
      btn.className = "game-option-btn transform hover:scale-105 active:scale-95 transition";
      btn.innerHTML = `
        <span class="text-5xl font-black text-indigo-900 block mb-1">${opt.upper} ${opt.lower}</span>
        <span class="text-xs text-gray-500 font-medium">${opt.name}</span>
      `;

      btn.onclick = () => {
        if (opt.id === target.id) {
          btn.classList.add("correct-choice");
          audio.playSuccess();
          this.streak++;
          const roundScore = 10 + (this.streak > 2 ? 5 : 0);
          this.score += roundScore;
          userProgress.addXP(roundScore);
          showQuickFeedback(btn, "+ " + roundScore + " Ball! 🌟", true);
        } else {
          btn.classList.add("wrong-choice");
          audio.playWrong();
          this.streak = 0;
          showQuickFeedback(btn, "Noto'g'ri ❌", false);
        }

        // Barcha tugmalarni o'chirib qo'yish
        Array.from(grid.children).forEach(c => c.disabled = true);

        setTimeout(() => {
          this.round++;
          this.nextFindLetterRound();
        }, 1100);
      };

      grid.appendChild(btn);
    });
  }

  // O'yin 2: "Rasm va Harf" (Bosh harfni top)
  startPictureMatchGame() {
    this.currentGame = "pictureMatch";
    this.score = 0;
    this.streak = 0;
    this.round = 1;
    this.totalRounds = 10;

    const container = document.getElementById("game-play-area");
    container.innerHTML = `
      <div class="game-header-bar">
        <div class="stat-badge"><i class="fas fa-star text-amber-400"></i> Ball: <span id="game-score">0</span></div>
        <div class="stat-badge"><i class="fas fa-fire text-orange-500"></i> Ketma-ket: <span id="game-streak">0</span></div>
        <div class="stat-badge"><i class="fas fa-flag text-indigo-500"></i> Bosqich: <span id="game-round">1</span>/10</div>
      </div>
      <div class="game-card text-center">
        <span class="inline-block px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold text-sm mb-4">
          Rasmga qarab so'zning birinchi harfini toping!
        </span>
        <div class="my-6">
          <div id="pic-emoji" class="text-8xl animate-bounce mb-3 filter drop-shadow-md">🍎</div>
          <div id="pic-masked-word" class="text-3xl font-extrabold tracking-widest text-gray-800">
            _ N O R
          </div>
          <p id="pic-hint" class="text-sm text-gray-500 mt-2">Shirin va foydali nordon meva</p>
        </div>
        <div id="pic-options-grid" class="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-lg mx-auto mt-6">
        </div>
      </div>
    `;

    this.nextPictureMatchRound();
  }

  nextPictureMatchRound() {
    if (this.round > this.totalRounds) {
      this.finishGame("Rasm va Harf", this.score);
      return;
    }

    document.getElementById("game-round").textContent = this.round;
    document.getElementById("game-score").textContent = this.score;
    document.getElementById("game-streak").textContent = this.streak;

    const alphabet = ALPHABET_DATA.latin;
    const target = this.getRandom(alphabet);
    const others = this.getRandom(alphabet.filter(l => l.id !== target.id), 3);
    const options = [target, ...others].sort(() => 0.5 - Math.random());

    document.getElementById("pic-emoji").textContent = target.emoji;
    
    // Bosh harf yoki 'Ng' uchun mos yashirish
    const wordUpper = target.word.toUpperCase();
    const targetUpper = target.upper.toUpperCase();
    let maskedHtml = "";
    let revealedHtml = "";

    if (target.id === "ng") {
      // 'ng' so'z oxirida keladi (masalan: TONG)
      maskedHtml = `TO <span class="text-indigo-600 underline font-black">_ _</span>`;
      revealedHtml = `TO <span class="text-emerald-600 font-black animate-pulse">${target.upper}</span>`;
    } else {
      const restOfWord = wordUpper.slice(targetUpper.length);
      const spacedRest = restOfWord.split('').join(' ');
      maskedHtml = `<span class="text-indigo-600 underline font-black">_</span> ${spacedRest}`;
      revealedHtml = `<span class="text-emerald-600 font-black animate-pulse">${target.upper}</span> ${spacedRest}`;
    }

    document.getElementById("pic-masked-word").innerHTML = maskedHtml;
    document.getElementById("pic-hint").textContent = target.sentence;

    // Harf talaffuzini boshlash
    audio.speak(target.word);

    const grid = document.getElementById("pic-options-grid");
    grid.innerHTML = "";

    options.forEach(opt => {
      const btn = document.createElement("button");
      btn.className = "game-option-btn hover:border-emerald-500";
      btn.innerHTML = `<span class="text-5xl font-black text-gray-800">${opt.upper}</span>`;

      btn.onclick = () => {
        if (opt.id === target.id) {
          btn.classList.add("correct-choice");
          document.getElementById("pic-masked-word").innerHTML = revealedHtml;
          audio.playSuccess();
          this.streak++;
          const roundScore = 15;
          this.score += roundScore;
          userProgress.addXP(roundScore);
          showQuickFeedback(btn, "Ofarin! " + target.word + " 👏", true);
        } else {
          btn.classList.add("wrong-choice");
          audio.playWrong();
          this.streak = 0;
          showQuickFeedback(btn, "Qayta urining", false);
        }

        Array.from(grid.children).forEach(c => c.disabled = true);

        setTimeout(() => {
          this.round++;
          this.nextPictureMatchRound();
        }, 1200);
      };

      grid.appendChild(btn);
    });
  }

  // O'yin 3: "Xotira O'yini" (Memory Card Matching)
  startMemoryGame(difficulty = "medium") {
    this.currentGame = "memory";
    this.score = 0;
    this.moves = 0;
    this.matches = 0;
    this.flippedCards = [];
    this.isLocked = false;

    let pairCount = 6;
    let gridCols = "grid-cols-4";
    if (difficulty === "easy") {
      pairCount = 4;
      gridCols = "grid-cols-4";
    } else if (difficulty === "hard") {
      pairCount = 8;
      gridCols = "grid-cols-4";
    }

    const alphabet = ALPHABET_DATA.latin;
    const selectedLetters = this.getRandom(alphabet, pairCount);

    // Juftliklar yaratish: Harf kartasi va Rasm kartasi
    const deck = [];
    selectedLetters.forEach((item, idx) => {
      deck.push({
        pairId: idx,
        type: "letter",
        content: item.upper,
        sub: item.lower,
        sound: item.upper
      });
      deck.push({
        pairId: idx,
        type: "picture",
        content: item.emoji,
        sub: item.word,
        sound: item.word
      });
    });

    deck.sort(() => 0.5 - Math.random());

    const container = document.getElementById("game-play-area");
    container.innerHTML = `
      <div class="game-header-bar">
        <div class="stat-badge"><i class="fas fa-hand-pointer text-indigo-500"></i> Urinishlar: <span id="memory-moves">0</span></div>
        <div class="stat-badge"><i class="fas fa-check-circle text-emerald-500"></i> Topilgan juftlik: <span id="memory-matches">0</span>/${pairCount}</div>
        <div class="flex gap-2">
          <button class="diff-btn ${difficulty === 'easy' ? 'active' : ''}" onclick="gamesHub.startMemoryGame('easy')">Oson (4x2)</button>
          <button class="diff-btn ${difficulty === 'medium' ? 'active' : ''}" onclick="gamesHub.startMemoryGame('medium')">O'rta (4x3)</button>
          <button class="diff-btn ${difficulty === 'hard' ? 'active' : ''}" onclick="gamesHub.startMemoryGame('hard')">Qiyin (4x4)</button>
        </div>
      </div>
      <div class="grid ${gridCols} gap-3 max-w-xl mx-auto my-6" id="memory-board">
      </div>
    `;

    const board = document.getElementById("memory-board");
    deck.forEach((cardData, idx) => {
      const cardEl = document.createElement("div");
      cardEl.className = "memory-card";
      cardEl.dataset.index = idx;
      cardEl.dataset.pairId = cardData.pairId;
      cardEl.innerHTML = `
        <div class="memory-card-inner">
          <div class="memory-card-front">
            <span class="text-3xl">❓</span>
          </div>
          <div class="memory-card-back">
            <span class="text-4xl block">${cardData.content}</span>
            <span class="text-xs font-semibold text-gray-600 block mt-1">${cardData.sub}</span>
          </div>
        </div>
      `;

      cardEl.onclick = () => this.handleMemoryCardClick(cardEl, cardData, pairCount);
      board.appendChild(cardEl);
    });
  }

  handleMemoryCardClick(cardEl, cardData, totalPairs) {
    if (this.isLocked) return;
    if (cardEl.classList.contains("flipped") || cardEl.classList.contains("matched")) return;

    cardEl.classList.add("flipped");
    audio.playPop();
    audio.speak(cardData.sound);
    this.flippedCards.push({ el: cardEl, data: cardData });

    if (this.flippedCards.length === 2) {
      this.moves++;
      document.getElementById("memory-moves").textContent = this.moves;
      this.isLocked = true;

      const [c1, c2] = this.flippedCards;
      if (c1.data.pairId === c2.data.pairId) {
        // Mos keldi!
        setTimeout(() => {
          c1.el.classList.add("matched");
          c2.el.classList.add("matched");
          audio.playSuccess();
          this.matches++;
          document.getElementById("memory-matches").textContent = this.matches;
          this.flippedCards = [];
          this.isLocked = false;

          if (this.matches === totalPairs) {
            const finalScore = Math.max(50, 200 - this.moves * 5);
            audio.playFanfare();
            triggerConfetti();
            userProgress.addXP(finalScore);
            setTimeout(() => {
              this.finishGame("Xotira O'yini", finalScore, `Siz ${this.moves} urinishda barcha juftliklarni topdingiz!`);
            }, 600);
          }
        }, 500);
      } else {
        // Mos kelmadi
        setTimeout(() => {
          c1.el.classList.remove("flipped");
          c2.el.classList.remove("flipped");
          audio.playWrong();
          this.flippedCards = [];
          this.isLocked = false;
        }, 900);
      }
    }
  }

  // O'yin 4: "So'z Yig'uvchi" (Word Builder / Scrambled Letters)
  startWordBuilderGame() {
    this.currentGame = "wordBuilder";
    this.score = 0;
    this.round = 1;
    this.totalRounds = 8;
    this.wordsList = [...ALPHABET_DATA.gameWords].sort(() => 0.5 - Math.random());

    const container = document.getElementById("game-play-area");
    container.innerHTML = `
      <div class="game-header-bar">
        <div class="stat-badge"><i class="fas fa-star text-amber-400"></i> Ball: <span id="game-score">0</span></div>
        <div class="stat-badge"><i class="fas fa-flag text-indigo-500"></i> Bosqich: <span id="game-round">1</span>/${this.totalRounds}</div>
      </div>
      <div class="game-card text-center">
        <span class="inline-block px-4 py-1.5 rounded-full bg-amber-100 text-amber-800 font-semibold text-sm mb-3">
          Harflarni ketma-ket bosib so'zni to'g'ri yig'ing!
        </span>
        <div class="my-4">
          <div id="wb-emoji" class="text-7xl mb-2 filter drop-shadow">🍎</div>
          <p id="wb-hint" class="text-sm text-gray-500 font-medium">Shirin qizil meva</p>
        </div>
        
        <!-- Yig'ilayotgan so'z katakchalari -->
        <div id="wb-slots" class="flex justify-center gap-2 my-6 min-h-[64px]">
        </div>

        <!-- Tarqoq harflar -->
        <div id="wb-letters" class="flex flex-wrap justify-center gap-3 my-4">
        </div>

        <div class="flex justify-center gap-4 mt-6">
          <button id="wb-reset-btn" class="secondary-btn text-sm py-2 px-4">
            <i class="fas fa-undo mr-1"></i> Qayta boshlash
          </button>
          <button id="wb-speak-btn" class="secondary-btn text-sm py-2 px-4">
            <i class="fas fa-volume-up mr-1"></i> Tinglash
          </button>
        </div>
      </div>
    `;

    document.getElementById("wb-reset-btn").onclick = () => this.resetWordBuilderRound();
    document.getElementById("wb-speak-btn").onclick = () => {
      if (this.currentWordItem) {
        audio.speak(this.currentWordItem.word);
      }
    };

    this.nextWordBuilderRound();
  }

  nextWordBuilderRound() {
    if (this.round > this.totalRounds) {
      this.finishGame("So'z Yig'uvchi", this.score);
      return;
    }

    document.getElementById("game-round").textContent = this.round;
    document.getElementById("game-score").textContent = this.score;

    this.currentWordItem = this.wordsList[this.round - 1];
    const targetWord = this.currentWordItem.word;

    document.getElementById("wb-emoji").textContent = this.currentWordItem.emoji;
    document.getElementById("wb-hint").textContent = this.currentWordItem.hint;

    // So'zni ovozli aytish
    audio.speak(targetWord);

    this.currentAssembledLetters = [];
    this.targetLetters = targetWord.split('');

    // Shuffled harflar
    this.availableLetters = this.targetLetters.map((char, index) => ({
      id: index,
      char: char,
      used: false
    })).sort(() => 0.5 - Math.random());

    this.renderWordBuilderUI();
  }

  renderWordBuilderUI() {
    const slotsContainer = document.getElementById("wb-slots");
    const lettersContainer = document.getElementById("wb-letters");

    slotsContainer.innerHTML = "";
    lettersContainer.innerHTML = "";

    // Slots
    for (let i = 0; i < this.targetLetters.length; i++) {
      const slot = document.createElement("div");
      slot.className = "wb-slot";
      if (this.currentAssembledLetters[i]) {
        slot.textContent = this.currentAssembledLetters[i].char;
        slot.classList.add("filled");
        // Bosganda harfni qaytarib olish
        slot.onclick = () => {
          this.removeLetterFromSlot(i);
        };
      } else {
        slot.textContent = "";
      }
      slotsContainer.appendChild(slot);
    }

    // Harf tugmalari
    this.availableLetters.forEach(item => {
      const btn = document.createElement("button");
      btn.className = `wb-letter-btn ${item.used ? 'opacity-30 cursor-not-allowed pointer-events-none' : ''}`;
      btn.textContent = item.char;

      btn.onclick = () => {
        if (item.used) return;
        this.addLetterToSlot(item);
      };

      lettersContainer.appendChild(btn);
    });

    // To'ldirilganini tekshirish
    if (this.currentAssembledLetters.length === this.targetLetters.length) {
      this.checkWordBuilderResult();
    }
  }

  addLetterToSlot(item) {
    if (this.currentAssembledLetters.length >= this.targetLetters.length) return;
    item.used = true;
    this.currentAssembledLetters.push(item);
    audio.playPop();
    this.renderWordBuilderUI();
  }

  removeLetterFromSlot(index) {
    const removedItem = this.currentAssembledLetters[index];
    if (!removedItem) return;

    removedItem.used = false;
    this.currentAssembledLetters.splice(index, 1);
    audio.playClick();
    this.renderWordBuilderUI();
  }

  resetWordBuilderRound() {
    this.availableLetters.forEach(l => l.used = false);
    this.currentAssembledLetters = [];
    audio.playClick();
    this.renderWordBuilderUI();
  }

  checkWordBuilderResult() {
    const builtWord = this.currentAssembledLetters.map(l => l.char).join('');
    const targetWord = this.currentWordItem.word;

    const slots = document.querySelectorAll(".wb-slot");

    if (builtWord === targetWord) {
      slots.forEach(s => s.classList.add("correct"));
      audio.playSuccess();
      const roundScore = 20;
      this.score += roundScore;
      userProgress.addXP(roundScore);

      setTimeout(() => {
        this.round++;
        this.nextWordBuilderRound();
      }, 1000);
    } else {
      slots.forEach(s => s.classList.add("wrong"));
      audio.playWrong();
      setTimeout(() => {
        slots.forEach(s => s.classList.remove("wrong"));
        this.resetWordBuilderRound();
      }, 800);
    }
  }

  // O'yin 5: "Harf Yomg'iri" (Falling Balloon Letters Arcade)
  startLetterRainGame() {
    this.currentGame = "letterRain";
    this.score = 0;
    this.lives = 3;
    this.rainSpeed = 1.2;
    this.spawnInterval = null;
    this.animationFrame = null;
    this.activeBalloons = [];

    const container = document.getElementById("game-play-area");
    container.innerHTML = `
      <div class="game-header-bar">
        <div class="stat-badge"><i class="fas fa-star text-amber-400"></i> Ball: <span id="game-score">0</span></div>
        <div class="stat-badge text-red-500 font-bold" id="game-lives">
          ❤️❤️❤️
        </div>
        <div class="stat-badge text-sm text-gray-600">
          Tushayotgan harflarni tezda bosing!
        </div>
      </div>
      <div id="rain-canvas-wrapper" class="relative w-full h-[450px] bg-gradient-to-b from-sky-100 to-indigo-50 rounded-2xl overflow-hidden border border-sky-200 shadow-inner">
      </div>
    `;

    this.runRainLoop();
  }

  runRainLoop() {
    const wrapper = document.getElementById("rain-canvas-wrapper");
    if (!wrapper) return;

    const alphabet = ALPHABET_DATA.latin;

    // Harf pufakchalarini yaratish intervali
    this.spawnInterval = setInterval(() => {
      if (this.lives <= 0) return;
      const letter = this.getRandom(alphabet);
      const balloon = document.createElement("div");
      balloon.className = "rain-balloon animate-float";

      // Tasodifiy gorizontal joylashuv
      const maxX = wrapper.clientWidth - 70;
      const x = Math.max(10, Math.floor(Math.random() * maxX));
      let y = -70;

      balloon.style.left = `${x}px`;
      balloon.style.top = `${y}px`;

      const colors = ["#ef4444", "#3b82f6", "#10b981", "#8b5cf6", "#f59e0b", "#ec4899"];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      balloon.style.backgroundColor = randomColor;

      balloon.innerHTML = `
        <span class="text-2xl font-black text-white">${letter.upper}</span>
        <span class="text-xs font-bold text-white/80">${letter.lower}</span>
      `;

      balloon.onclick = () => {
        audio.playPop();
        audio.speak(letter.upper);
        balloon.remove();
        this.activeBalloons = this.activeBalloons.filter(b => b.el !== balloon);
        this.score += 5;
        document.getElementById("game-score").textContent = this.score;
        userProgress.addXP(5);
      };

      wrapper.appendChild(balloon);
      this.activeBalloons.push({ el: balloon, x, y, speed: this.rainSpeed + Math.random() * 0.8 });
    }, 1200);

    // Animatsiya loopi
    const updatePhysics = () => {
      if (this.lives <= 0) {
        this.finishRainGame();
        return;
      }

      const maxY = wrapper.clientHeight;
      for (let i = this.activeBalloons.length - 1; i >= 0; i--) {
        const item = this.activeBalloons[i];
        item.y += item.speed;
        item.el.style.top = `${item.y}px`;

        if (item.y > maxY - 60) {
          // Yerga tushib ketdi (jon kamayadi)
          item.el.remove();
          this.activeBalloons.splice(i, 1);
          this.lives--;
          audio.playWrong();
          this.updateLivesDisplay();
          if (this.lives <= 0) {
            this.finishRainGame();
            return;
          }
        }
      }

      this.animationFrame = requestAnimationFrame(updatePhysics);
    };

    this.animationFrame = requestAnimationFrame(updatePhysics);
  }

  updateLivesDisplay() {
    const livesEl = document.getElementById("game-lives");
    if (!livesEl) return;
    let hearts = "";
    for (let i = 0; i < 3; i++) {
      hearts += i < this.lives ? "❤️" : "🖤";
    }
    livesEl.textContent = hearts;
  }

  finishRainGame() {
    clearInterval(this.spawnInterval);
    cancelAnimationFrame(this.animationFrame);
    this.activeBalloons.forEach(b => b.el.remove());
    this.activeBalloons = [];
    this.finishGame("Harf Yomg'iri", this.score, `Siz ${this.score} ball to'pladingiz!`);
  }

  // O'yinni yakunlash oynasi
  finishGame(gameTitle, score, extraMsg = "") {
    clearInterval(this.timerInterval);
    audio.playFanfare();
    triggerConfetti();

    let stars = 3;
    if (score < 50) stars = 1;
    else if (score < 100) stars = 2;

    const starsHtml = "⭐".repeat(stars);

    const container = document.getElementById("game-play-area");
    container.innerHTML = `
      <div class="game-card text-center max-w-md mx-auto py-8">
        <div class="text-6xl mb-3">🏆</div>
        <h2 class="text-3xl font-extrabold text-gray-800">${gameTitle} Yakunlandi!</h2>
        <div class="text-3xl my-3">${starsHtml}</div>
        <p class="text-lg font-bold text-indigo-600 mb-2">To'plangan ball: ${score} ball</p>
        <p class="text-sm text-gray-600 mb-6">${extraMsg || "Juda zo'r natija ko'rsatdingiz! Alifboni mukammal o'rganmoqdasiz!"}</p>
        <div class="flex flex-col sm:flex-row justify-center gap-3">
          <button class="primary-btn py-2.5 px-6" onclick="gamesHub.restartCurrentGame()">
            <i class="fas fa-redo mr-2"></i> Qayta o'ynash
          </button>
          <button class="secondary-btn py-2.5 px-6" onclick="navigateToSection('games')">
            <i class="fas fa-th-large mr-2"></i> Boshqa o'yinlar
          </button>
        </div>
      </div>
    `;
  }

  restartCurrentGame() {
    if (this.currentGame === "findLetter") this.startFindLetterGame();
    else if (this.currentGame === "pictureMatch") this.startPictureMatchGame();
    else if (this.currentGame === "memory") this.startMemoryGame();
    else if (this.currentGame === "wordBuilder") this.startWordBuilderGame();
    else if (this.currentGame === "letterRain") this.startLetterRainGame();
  }
}

// Tezkor feedback ko'rsatuvchi yordamchi funksiya
function showQuickFeedback(element, text, isPositive) {
  const badge = document.createElement("div");
  badge.className = `feedback-popup ${isPositive ? 'text-emerald-700 bg-emerald-100 border-emerald-300' : 'text-rose-700 bg-rose-100 border-rose-300'}`;
  badge.textContent = text;

  element.parentElement.style.position = "relative";
  element.appendChild(badge);

  setTimeout(() => {
    badge.remove();
  }, 900);
}

const gamesHub = new GamesHub();
