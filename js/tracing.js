// Harf chizish va yozish mashqi (Tracing Canvas)
class TracingApp {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.isDrawing = false;
    this.currentLetter = null;
    this.isUpperCase = true;
    this.brushColor = "#4f46e5";
    this.brushSize = 18;
    this.points = [];
    this.hasDrawn = false;
  }

  init() {
    this.canvas = document.getElementById("tracing-canvas");
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext("2d");

    this.setupCanvasSize();
    this.bindEvents();
    window.addEventListener("resize", () => {
      this.setupCanvasSize();
      this.drawGuide();
    });
  }

  setupCanvasSize() {
    if (!this.canvas) return;
    const rect = this.canvas.parentElement.getBoundingClientRect();
    const size = Math.min(rect.width - 20, 420);
    this.canvas.width = size;
    this.canvas.height = size;
  }

  bindEvents() {
    // Sichqoncha va sensor hodisalarini ushlash
    const getPos = (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      return {
        x: clientX - rect.left,
        y: clientY - rect.top
      };
    };

    const startDraw = (e) => {
      e.preventDefault();
      this.isDrawing = true;
      this.hasDrawn = true;
      const pos = getPos(e);
      this.ctx.beginPath();
      this.ctx.moveTo(pos.x, pos.y);
      this.ctx.strokeStyle = this.brushColor;
      this.ctx.lineWidth = this.brushSize;
      this.ctx.lineCap = "round";
      this.ctx.lineJoin = "round";
      audio.playPop();
    };

    const draw = (e) => {
      if (!this.isDrawing) return;
      e.preventDefault();
      const pos = getPos(e);
      this.ctx.lineTo(pos.x, pos.y);
      this.ctx.stroke();
    };

    const endDraw = (e) => {
      if (!this.isDrawing) return;
      e.preventDefault();
      this.isDrawing = false;
    };

    this.canvas.addEventListener("mousedown", startDraw);
    this.canvas.addEventListener("mousemove", draw);
    window.addEventListener("mouseup", endDraw);

    this.canvas.addEventListener("touchstart", startDraw, { passive: false });
    this.canvas.addEventListener("touchmove", draw, { passive: false });
    window.addEventListener("touchend", endDraw);
  }

  loadLetter(letterObj, isUpper = true) {
    this.currentLetter = letterObj;
    this.isUpperCase = isUpper;
    const displayEl = document.getElementById("tracing-letter-display");
    const nameEl = document.getElementById("tracing-letter-name");
    if (displayEl) displayEl.textContent = `${letterObj.upper} ${letterObj.lower}`;
    if (nameEl) nameEl.textContent = letterObj.word;
    this.clearCanvas();
  }

  clearCanvas() {
    if (!this.ctx || !this.canvas) return;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.hasDrawn = false;
    this.drawGuide();
  }

  drawGuide() {
    if (!this.ctx || !this.canvas || !this.currentLetter) return;

    const char = this.isUpperCase ? this.currentLetter.upper : this.currentLetter.lower;
    const w = this.canvas.width;
    const h = this.canvas.height;

    // Chizma fon katakchalari (yozuv daftari kabi chiziqlar)
    this.ctx.save();
    this.ctx.strokeStyle = "#e2e8f0";
    this.ctx.lineWidth = 1;
    this.ctx.setLineDash([4, 4]);

    // O'rta yo'naltiruvchi chiziqlar
    this.ctx.beginPath();
    this.ctx.moveTo(30, h * 0.25);
    this.ctx.lineTo(w - 30, h * 0.25);
    this.ctx.moveTo(30, h * 0.5);
    this.ctx.lineTo(w - 30, h * 0.5);
    this.ctx.moveTo(30, h * 0.75);
    this.ctx.lineTo(w - 30, h * 0.75);
    this.ctx.stroke();

    // Namuna harf konturi (dotted guide)
    this.ctx.setLineDash([]);
    this.ctx.font = `bold ${Math.floor(w * 0.55)}px 'Comic Sans MS', 'Fredoka', cursive, sans-serif`;
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";

    // Xira namuna foni
    this.ctx.fillStyle = "rgba(148, 163, 184, 0.22)";
    this.ctx.fillText(char, w / 2, h / 2 + 10);

    // Dotted kontur
    this.ctx.strokeStyle = "rgba(99, 102, 241, 0.45)";
    this.ctx.lineWidth = 3;
    this.ctx.setLineDash([8, 6]);
    this.ctx.strokeText(char, w / 2, h / 2 + 10);

    this.ctx.restore();
  }

  setBrushColor(color) {
    this.brushColor = color;
    audio.playClick();
  }

  setBrushSize(size) {
    this.brushSize = size;
  }

  // Yozuvni tekshirish va baholash
  checkDrawing() {
    if (!this.hasDrawn) {
      alert("Iltimos, avval harf ustidan chizib ko'ring! ✍️");
      return;
    }

    // Piksel to'laligini hisoblash
    const imgData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height).data;
    let coloredPixels = 0;
    for (let i = 3; i < imgData.length; i += 4) {
      if (imgData[i] > 100) coloredPixels++;
    }

    const totalArea = this.canvas.width * this.canvas.height;
    const ratio = coloredPixels / totalArea;

    let stars = 1;
    let feedback = "Yaxshi boshlanish! Yana bir bor mashq qiling.";
    let xpGain = 10;

    if (ratio >= 0.05 && ratio <= 0.35) {
      stars = 3;
      feedback = "Ofarin! Harfni juda chiroyli va aniq yozdingiz! 🌟🌟🌟";
      xpGain = 30;
      audio.playFanfare();
      triggerConfetti();
    } else if (ratio > 0.02) {
      stars = 2;
      feedback = "Ajoyib harakat! Biroz ko'proq mashq qilsangiz, mukammal bo'ladi!";
      xpGain = 20;
      audio.playSuccess();
    } else {
      stars = 1;
      feedback = "Biroz ko'proq chizishga harakat qiling!";
      xpGain = 10;
      audio.playClick();
    }

    // Modal ko'rsatish
    showTracingResult(stars, feedback, xpGain, this.currentLetter);
    userProgress.addXP(xpGain);
    userProgress.markLetterPracticed(this.currentLetter.id);
  }
}

const tracingApp = new TracingApp();
