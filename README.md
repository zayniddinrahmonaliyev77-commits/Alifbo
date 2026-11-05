# 📖 Alifbe.uz – O'zbek Alifbosini O'yinlar Orqali 0 dan Mukammal O'rganish Platformasi

Ushbu veb-sayt bolalar, o'quvchilar va o'zbek tilini (ham **Lotin**, ham **Kirill** yozuvida) noldan boshlab mukammal o'rganishni istagan har qanday yoshdagi foydalanuvchilar uchun maxsus yaratilgan interaktiv ta'limiy o'yinlar platformasidir.

---

## 🌟 Asosiy Imkoniyatlar va Bo'limlar

### 1. 🔤 Interaktiv Alifbe Kartalari (29 ta Harf + Tutuq belgisi)
- **Lotin va Kirill yozuvlari**: Istalgan vaqtda yagona tugma orqali Lotin yoki Kirill alifbosiga o'tish imkoniyati.
- **Har bir harf uchun to'liq ma'lumot**:
  - Katta va kichik ko'rinishi (`A a`, `B b`, `Gʻ gʻ`, `Sh sh`, `Ch ch`, `Ng ng`).
  - Fonetik tasnif: **Unli (6 ta)** yoki **Undosh (23 ta)** (jarangli/jarangsiz, portlovchi/sirg'aluvchi).
  - To'g'ri talaffuz bo'yicha audio va matnli qo'llanma.
  - Namunaviy so'z, qiziqarli gap va 4 tadan qo'shimcha rasmli so'zlar.
  - Maxsus **Tutuq belgisi (ʼ)** bo'yicha tushuntirish va amaliy misollar (`Aʼlo`, `Maʼno`, `Sanʼat`).

### 2. 🎮 6 xil Ta'limiy O'yinlar (Gamification)
1. **🎯 Harfni Top (Audio Viktorina)**:
   - Kompyuter harf nomini yoki tovushini aytadi, o'yinchi 4 ta variantdan to'g'risini topishi kerak.
   - Ketma-ket to'g'ri topish seriyasi (combo streak) va ballar tizimi.
2. **🖼️ Rasm va Harf (Bosh harfni topish)**:
   - Rangli rasm va bosh harfi tushirib qoldirilgan so'z ko'rsatiladi (masalan: `🍎 _ L M A`). O'yinchi to'g'ri harfni tanlaydi.
   - Murakkab harflar (`Sh`, `Ch`, `Oʻ`, `Gʻ` va `Ng`) bilan alohida aniqlikda ishlaydi.
3. **🧠 Xotira O'yini (Memory Cards)**:
   - 3D animatsiyali kartochkalar. Harf va mos rasm/so'z juftliklarini eslab qolib topish.
   - 3 ta murakkablik darajasi: Oson (4x2), O'rta (4x3), Qiyin (4x4).
4. **🧩 So'z Yig'uvchi (Word Builder)**:
   - Berilgan rasm va ma'noga qarab, aralashib ketgan harflarni bosqichma-bosqich to'g'ri ketma-ketlikda yig'ish.
5. **🌧️ Harf Yomg'iri (Arcade)**:
   - Osmondan rang-barang sharlar bilan sekin tushayotgan harflarni yerga tushmasdan ushlab olish. Bolalarda reaksiyani va klaviatura/harf tanishni kuchaytiradi.
6. **✍️ Interaktiv Yozuv Doskasi**:
   - Harflarni chiroyli yozishga o'rgatuvchi mashq.

### 3. ✍️ Interaktiv Yozuv Mashqi (Letter Tracing Studio)
- Haqiqiy daftardagidek yo'naltiruvchi chiziqlar va harf konturi.
- Katta (`A`) va kichik (`a`) harflar rejimi.
- Rang-barang qalamlar palitrasi (Ko'k, Qizil, Yashil, Sariq, Binafsha, Qora) va qalinlikni o'zgartirish.
- **Avtomatik baholash tizimi**: foydalanuvchi chizgan yozuvni tekshiradi, yulduzchalar (⭐⭐⭐) va tajriba ballari (XP) beradi.

### 4. 📖 Boyitilgan Rasmli Lug'at
- 100 dan ortiq jonli emojilar va tasvirlar bilan bezatilgan alifbo lug'ati.
- Har bir so'zning inglizcha tarjimasi, talaffuz qilinishi va amaliy gapda ishlatilishi.

### 5. 🎓 Katta Yakuniy Imtihon & Shaxsiy Sertifikat
- O'zbek alifbosini to'liq qamrab oluvchi 10 ta adaptiv savoldan iborat sinov.
- Natijalar tahlili va xatolarni ko'rib chiqish.
- Sinovdan 70% dan yuqori o'tgan o'quvchiga **ism-familiyasi yozilgan rasmiy "Alifbo Bilimdoni Sertifikati"** beriladi.
- Sertifikatni bir marta bosish bilan qog'ozga chop etish yoki PDF formatida yuklab olish mumkin (`@media print` optimallashtirilgan).

### 6. 🏆 Darajalar, XP va Medallar Tizimi
- Har bir o'rganilgan harf, chizilgan yozuv va yutilgan o'yin uchun **XP ballari** beriladi.
- 6 ta maxsus yutuq medali: *Birinchi Qadam*, *Unlilar Bilimdoni*, *Mohir Xattot*, *Alifbo Qahramoni*, *Zukko O'quvchi*, *Imtihon A'lochisi*.
- Ma'lumotlar foydalanuvchining brauzerida (`localStorage`) saqlanadi, qayta kirganda bilim va natijalar yo'qolmaydi!

---

## 🚀 Saytni Ishga Tushirish

Saytni ishlatish uchun ikkita juda oddiy usul mavjud:

### 1-usul: Hech qanday dastursiz to'g'ridan-to'g'ri ochish (Eng oson)
Loyiha papkasidagi **`index.html`** faylini sichqoncha bilan 2 marta bosing (yoki Chrome, Edge, Firefox brauzerlaridan biriga tashlang). Sayt darhol to'liq ishga tushadi!

### 2-usul: Mahalliy server orqali ochish (Node.js)
Agar kompyuteringizda Node.js o'rnatilgan bo'lsa:
```bash
# Loyiha papkasida terminalni oching va quyidagi buyruqni bering:
npm start

# yoki to'g'ridan-to'g'ri:
node server.js
```
Keyin brauzeringizda quyidagi manzilni oching:
👉 **`http://localhost:3000`**

---

## 📁 Loyiha Tuzilishi

```
├── index.html          # Asosiy HTML sahifa va barcha bo'limlar konteyneri
├── server.js           # Tezkor, yengil Node.js HTTP serveri (zero dependency)
├── package.json        # Loyiha ma'lumotlari va start skripti
├── README.md           # Qo'llanma
├── css/
│   └── style.css       # Maxsus zamonaviy uslublar, 3D animatsiyalar va print dizayn
└── js/
    ├── data.js         # Lotin va Kirill alifbosi, so'zlar bazasi va lug'at
    ├── audio.js        # Web Audio API tovush generatori va nutq sintezi (TTS)
    ├── tracing.js      # Sensor va sichqoncha bilan harf yozish doskasi
    ├── games.js        # 6 ta interaktiv o'yin mantig'i
    ├── exam.js         # 10 ta savolli imtihon va sertifikat generatori
    └── app.js          # SPA navigatsiya, foydalanuvchi XP/darajasi va holat boshqaruvi
```

---

## 💻 Texnologiyalar
- **HTML5 & CSS3** (Flexbox, Grid, 3D Transforms, Canvas API, Print Stylesheets)
- **Modern JavaScript (ES6+)** (Class asosidagi arxitektura, LocalStorage, Web Audio API, Web Speech API)
- **Tailwind CSS & FontAwesome** (Zamonaviy va qulay dizayn)
- **Zero-Dependency** (Hech qanday og'ir kutubxonalarsiz, 100% tez va yengil ishlaydi)

