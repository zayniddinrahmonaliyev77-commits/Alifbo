// Ovoz va Musiqa tizimi (Web Audio API va SpeechSynthesis)
class AudioManager {
  constructor() {
    this.soundEnabled = true;
    this.speechEnabled = true;
    this.audioCtx = null;
    this.selectedVoice = null;
    this.voicesLoaded = false;

    // LocalStorage-dan sozlamalarni yuklash
    const savedSound = localStorage.getItem("alifbe_sound");
    if (savedSound !== null) {
      this.soundEnabled = savedSound === "true";
    }
    const savedSpeech = localStorage.getItem("alifbe_speech");
    if (savedSpeech !== null) {
      this.speechEnabled = savedSpeech === "true";
    }

    this.initAudioContext();
    this.initSpeech();
  }

  initAudioContext() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.audioCtx = new AudioCtx();
      }
    } catch (e) {
      console.warn("Web Audio API ishga tushmadi:", e);
    }
  }

  ensureAudioContext() {
    if (this.audioCtx && this.audioCtx.state === "suspended") {
      this.audioCtx.resume();
    }
  }

  initSpeech() {
    if (!("speechSynthesis" in window)) {
      console.warn("Speech Synthesis qo'llab-quvvatlanmaydi");
      return;
    }

    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      if (!voices || voices.length === 0) return;

      // O'zbek tili uchun eng mos ovozlarni qidirish
      // uz-UZ, yoki turkiy tillar (tr-TR), yoki yaxshi talaffuzli boshqa ovoz
      let voice = voices.find(v => v.lang.startsWith("uz"));
      if (!voice) {
        voice = voices.find(v => v.lang.startsWith("tr"));
      }
      if (!voice) {
        voice = voices.find(v => v.lang.startsWith("ru"));
      }
      if (!voice) {
        voice = voices[0];
      }
      this.selectedVoice = voice;
      this.voicesLoaded = true;
    };

    loadVoices();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }

  toggleSound() {
    this.soundEnabled = !this.soundEnabled;
    localStorage.setItem("alifbe_sound", this.soundEnabled);
    return this.soundEnabled;
  }

  toggleSpeech() {
    this.speechEnabled = !this.speechEnabled;
    localStorage.setItem("alifbe_speech", this.speechEnabled);
    return this.speechEnabled;
  }

  // Tovushlar (Web Audio API Synthesizer)
  playTone(freq, duration, type = "sine", gainVal = 0.15) {
    if (!this.soundEnabled || !this.audioCtx) return;
    this.ensureAudioContext();

    try {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);

      gain.gain.setValueAtTime(gainVal, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.audioCtx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start();
      osc.stop(this.audioCtx.currentTime + duration);
    } catch (e) {
      // ignore audio errors
    }
  }

  // Pufak yorilishi ovozi
  playPop() {
    if (!this.soundEnabled || !this.audioCtx) return;
    this.ensureAudioContext();

    try {
      const now = this.audioCtx.currentTime;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(450, now);
      osc.frequency.exponentialRampToValueAtTime(80, now + 0.08);

      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(now);
      osc.stop(now + 0.08);
    } catch (e) {}
  }

  // To'g'ri javob yangrog'i (chime)
  playSuccess() {
    if (!this.soundEnabled) return;
    this.playTone(523.25, 0.12, "triangle", 0.15); // C5
    setTimeout(() => this.playTone(659.25, 0.15, "triangle", 0.18), 90); // E5
    setTimeout(() => this.playTone(783.99, 0.28, "triangle", 0.2), 180); // G5
  }

  // Noto'g'ri javob mayin ovozi
  playWrong() {
    if (!this.soundEnabled) return;
    this.playTone(220, 0.15, "sawtooth", 0.1);
    setTimeout(() => this.playTone(180, 0.2, "sawtooth", 0.08), 120);
  }

  // Yulduzcha yig'ish ovozi
  playStar() {
    if (!this.soundEnabled) return;
    const notes = [659, 784, 988, 1318];
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        this.playTone(freq, 0.12, "sine", 0.15);
      }, idx * 60);
    });
  }

  // Tugmani bosish ovozi
  playClick() {
    if (!this.soundEnabled) return;
    this.playTone(600, 0.04, "sine", 0.08);
  }

  // G'alaba tantanasi (Fanfare)
  playFanfare() {
    if (!this.soundEnabled) return;
    const notes = [
      { f: 523.25, d: 0.12, t: 0 },
      { f: 523.25, d: 0.12, t: 120 },
      { f: 523.25, d: 0.12, t: 240 },
      { f: 659.25, d: 0.35, t: 360 },
      { f: 587.33, d: 0.15, t: 720 },
      { f: 659.25, d: 0.15, t: 870 },
      { f: 783.99, d: 0.5, t: 1020 }
    ];
    notes.forEach(n => {
      setTimeout(() => this.playTone(n.f, n.d, "triangle", 0.2), n.t);
    });
  }

  // So'z va harflarni ovozli o'qish (TTS)
  speak(text, lang = "uz-UZ") {
    if (!this.speechEnabled || !("speechSynthesis" in window)) return;

    window.speechSynthesis.cancel(); // oldingi gapni to'xtatish

    const utterance = new SpeechSynthesisUtterance(text);
    if (this.selectedVoice) {
      utterance.voice = this.selectedVoice;
    }
    utterance.lang = lang;
    utterance.rate = 0.9; // Bolalar va o'rganuvchilar uchun aniqroq tezlik
    utterance.pitch = 1.05; // Mayin ohang

    window.speechSynthesis.speak(utterance);
  }

  // Harfni o'qib berish
  speakLetter(letterObj) {
    if (!this.speechEnabled) return;
    const textToSpeak = `${letterObj.upper}. ${letterObj.word}.`;
    this.speak(textToSpeak);
  }
}

// Global audio instansiya
const audio = new AudioManager();

