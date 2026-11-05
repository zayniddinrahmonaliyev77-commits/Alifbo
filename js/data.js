// O'zbek alifbosi ma'lumotlar bazasi (Lotin va Kirill)
const ALPHABET_DATA = {
  latin: [
    {
      id: "a",
      upper: "A",
      lower: "a",
      cyrillic: "А а",
      name: "A",
      type: "unli",
      typeLabel: "Unli tovush",
      word: "Anor",
      wordCyrillic: "Анор",
      translation: "Pomegranate",
      emoji: "🍎",
      sentence: "Anor – shirin va foydali nordon meva.",
      pronounceHint: "Og'iz keng ochilib, erkin aytiladi: [A]",
      words: [
        { word: "Anor", emoji: "🍎", text: "Qizil anor" },
        { word: "Asal", emoji: "🍯", text: "Shirin asal" },
        { word: "Ayiq", emoji: "🐻", text: "Bahaybat ayiq" },
        { word: "Arava", emoji: "🛒", text: "G'ildirakli arava" }
      ]
    },
    {
      id: "b",
      upper: "B",
      lower: "b",
      cyrillic: "Б б",
      name: "Be",
      type: "undosh",
      typeLabel: "Jarangli undosh",
      word: "Baliq",
      wordCyrillic: "Балиқ",
      translation: "Fish",
      emoji: "🐟",
      sentence: "Baliq toza suvda tez suzadi.",
      pronounceHint: "Lablar jipslashib, portlab chiqadi: [B]",
      words: [
        { word: "Baliq", emoji: "🐟", text: "Chiroyli baliq" },
        { word: "Banan", emoji: "🍌", text: "Mazali banan" },
        { word: "Buloq", emoji: "💧", text: "Muzdek buloq" },
        { word: "Boyqush", emoji: "🦉", text: "Zukko boyqush" }
      ]
    },
    {
      id: "d",
      upper: "D",
      lower: "d",
      cyrillic: "Д д",
      name: "De",
      type: "undosh",
      typeLabel: "Jarangli undosh",
      word: "Daraxt",
      wordCyrillic: "Дарахт",
      translation: "Tree",
      emoji: "🌳",
      sentence: "Katta daraxt ostida salqin soya bor.",
      pronounceHint: "Til uchi yuqori tishlarga tegib aytiladi: [D]",
      words: [
        { word: "Daraxt", emoji: "🌳", text: "Yashil daraxt" },
        { word: "Daftar", emoji: "📓", text: "Toza daftar" },
        { word: "Delfin", emoji: "🐬", text: "Aqlli delfin" },
        { word: "Doira", emoji: "🪘", text: "Yangroq doira" }
      ]
    },
    {
      id: "e",
      upper: "E",
      lower: "e",
      cyrillic: "Е е / Э э",
      name: "E",
      type: "unli",
      typeLabel: "Unli tovush",
      word: "Eshik",
      wordCyrillic: "Эшик",
      translation: "Door",
      emoji: "🚪",
      sentence: "Eshikni ochib xonani shamollatdik.",
      pronounceHint: "Lablar biroz yoyilib, til oldinga siljiydi: [E]",
      words: [
        { word: "Eshik", emoji: "🚪", text: "Yog'och eshik" },
        { word: "Echki", emoji: "🐐", text: "Shoxli echki" },
        { word: "Ertak", emoji: "🧚", text: "Sehrli ertak" },
        { word: "Ezgulik", emoji: "💖", text: "Yaxshi niyat" }
      ]
    },
    {
      id: "f",
      upper: "F",
      lower: "f",
      cyrillic: "Ф ф",
      name: "Ef",
      type: "undosh",
      typeLabel: "Jarangsiz undosh",
      word: "Fil",
      wordCyrillic: "Фил",
      translation: "Elephant",
      emoji: "🐘",
      sentence: "Fil – quruqlikdagi eng yirik va kuchli hayvon.",
      pronounceHint: "Yuqori tishlar pastki labga tegib sirg'aladi: [F]",
      words: [
        { word: "Fil", emoji: "🐘", text: "Xartumli fil" },
        { word: "Fazo", emoji: "🚀", text: "Cheksiz fazo" },
        { word: "Futbol", emoji: "⚽", text: "Qiziqarli futbol" },
        { word: "Favvora", emoji: "⛲", text: "Rangin favvora" }
      ]
    },
    {
      id: "g",
      upper: "G",
      lower: "g",
      cyrillic: "Г г",
      name: "Ge",
      type: "undosh",
      typeLabel: "Jarangli undosh",
      word: "Gul",
      wordCyrillic: "Гул",
      translation: "Flower",
      emoji: "🌸",
      sentence: "Bahorda atrofda xushbo'y gullar ochiladi.",
      pronounceHint: "Til orqasi yumshoq tanglayga tegib jaranglaydi: [G]",
      words: [
        { word: "Gul", emoji: "🌸", text: "Xushbo'y gul" },
        { word: "Gilos", emoji: "🍒", text: "Qip-qizil gilos" },
        { word: "Gitar", emoji: "🎸", text: "Kuy chalar gitar" },
        { word: "Gugurt", emoji: "🪵", text: "Olov vositasi" }
      ]
    },
    {
      id: "h",
      upper: "H",
      lower: "h",
      cyrillic: "Ҳ ҳ",
      name: "Ha",
      type: "undosh",
      typeLabel: "Jarangsiz bo'g'iz undoshi",
      word: "Hassa",
      wordCyrillic: "Ҳасса",
      translation: "Cane / Walking stick",
      emoji: "🦯",
      sentence: "Bobom ko'chaga chiqqanda hassasiga tayanadi.",
      pronounceHint: "Tomoqdan (bo'g'izdan) yumshoq nafas bilan chiqadi: [H]",
      words: [
        { word: "Hassa", emoji: "🦯", text: "Yog'och hassa" },
        { word: "Havo", emoji: "☁️", text: "Toza havo" },
        { word: "Halvo", emoji: "🍬", text: "Shirin halvo" },
        { word: "Hovuz", emoji: "🏊", text: "Tiniq hovuz" }
      ]
    },
    {
      id: "i",
      upper: "I",
      lower: "i",
      cyrillic: "И и",
      name: "I",
      type: "unli",
      typeLabel: "Unli tovush",
      word: "Igna",
      wordCyrillic: "Игна",
      translation: "Needle",
      emoji: "🪡",
      sentence: "Igna bilan chiroyli kashta tikiladi.",
      pronounceHint: "Jag'lar yaqinlashib, til oldinga ko'tariladi: [I]",
      words: [
        { word: "Igna", emoji: "🪡", text: "O'tkir igna" },
        { word: "Ilon", emoji: "🐍", text: "Uzun ilon" },
        { word: "Ildiz", emoji: "🌱", text: "Daraxt ildizi" },
        { word: "Ipak", emoji: "🧣", text: "Mayin ipak" }
      ]
    },
    {
      id: "j",
      upper: "J",
      lower: "j",
      cyrillic: "Ж ж",
      name: "Je",
      type: "undosh",
      typeLabel: "Jarangli undosh",
      word: "Jo'ja",
      wordCyrillic: "Жўжа",
      translation: "Chick",
      emoji: "🐥",
      sentence: "Sariq jo'jachalar onasi ketidan yugurdi.",
      pronounceHint: "Til tanglayga tegib jarangli chiqadi: [J]",
      words: [
        { word: "Jo'ja", emoji: "🐥", text: "Mittivoy jo'ja" },
        { word: "Jiyda", emoji: "🫒", text: "Shirin jiyda" },
        { word: "Jilva", emoji: "✨", text: "Yorqin nur" },
        { word: "Jomadon", emoji: "🧳", text: "Sayohat jomadoni" }
      ]
    },
    {
      id: "k",
      upper: "K",
      lower: "k",
      cyrillic: "К к",
      name: "Ka",
      type: "undosh",
      typeLabel: "Jarangsiz undosh",
      word: "Kitob",
      wordCyrillic: "Китоб",
      translation: "Book",
      emoji: "📖",
      sentence: "Kitob o'qigan inson dono va bilimli bo'ladi.",
      pronounceHint: "Til orqasi tanglayga tegib jarangsiz portlaydi: [K]",
      words: [
        { word: "Kitob", emoji: "📖", text: "Bilim manbai" },
        { word: "Kapalak", emoji: "🦋", text: "Rangin kapalak" },
        { word: "Koptok", emoji: "⚽", text: "Dumaloq koptok" },
        { word: "Kuchukcha", emoji: "🐶", text: "Vafoli kuchuk" }
      ]
    },
    {
      id: "l",
      upper: "L",
      lower: "l",
      cyrillic: "Л л",
      name: "El",
      type: "undosh",
      typeLabel: "Jarangli sonor undosh",
      word: "Lola",
      wordCyrillic: "Лола",
      translation: "Tulip",
      emoji: "🌷",
      sentence: "Bahorda qirlarda qirmizi lolalar ochiladi.",
      pronounceHint: "Til uchi yuqori milkka tegib, havo ikki yonidan chiqadi: [L]",
      words: [
        { word: "Lola", emoji: "🌷", text: "Qizil lola" },
        { word: "Limon", emoji: "🍋", text: "Nordon limon" },
        { word: "Lag'mon", emoji: "🍜", text: "Mazali taom" },
        { word: "Laylak", emoji: "🪶", text: "Baland uchar laylak" }
      ]
    },
    {
      id: "m",
      upper: "M",
      lower: "m",
      cyrillic: "М м",
      name: "Em",
      type: "undosh",
      typeLabel: "Jarangli burun sonor undoshi",
      word: "Mushuk",
      wordCyrillic: "Мушук",
      translation: "Cat",
      emoji: "🐱",
      sentence: "Yumshoq junli mushukcha pech yonida uxlardi.",
      pronounceHint: "Lablar birlashib, havo burundan chiqadi: [M]",
      words: [
        { word: "Mushuk", emoji: "🐱", text: "Erka mushuk" },
        { word: "Mashina", emoji: "🚗", text: "Tezkor mashina" },
        { word: "Maymun", emoji: "🐵", text: "Sho'x maymun" },
        { word: "Meva", emoji: "🍇", text: "Shirin mevalar" }
      ]
    },
    {
      id: "n",
      upper: "N",
      lower: "n",
      cyrillic: "Н н",
      name: "En",
      type: "undosh",
      typeLabel: "Jarangli burun sonor undoshi",
      word: "Non",
      wordCyrillic: "Нон",
      translation: "Bread",
      emoji: "🍞",
      sentence: "Issiq tandir nonining hidi juda xushbo'y.",
      pronounceHint: "Til milkka tegadi, ovoz burun orqali o'tadi: [N]",
      words: [
        { word: "Non", emoji: "🍞", text: "Tandir noni" },
        { word: "Nok", emoji: "🍐", text: "Sershira nok" },
        { word: "Nishon", emoji: "🎯", text: "Aniqlik nishoni" },
        { word: "Nihol", emoji: "🌱", text: "Yosh nihol" }
      ]
    },
    {
      id: "o",
      upper: "O",
      lower: "o",
      cyrillic: "О о",
      name: "O",
      type: "unli",
      typeLabel: "Unli tovush",
      word: "Olma",
      wordCyrillic: "Олма",
      translation: "Apple",
      emoji: "🍏",
      sentence: "Olma yegan kishining yanoqlari qizaradi.",
      pronounceHint: "Lablar doirasimon ochilib aytiladi: [O]",
      words: [
        { word: "Olma", emoji: "🍏", text: "Shirin olma" },
        { word: "Ona", emoji: "👩‍👧", text: "Mehribon ona" },
        { word: "Oftob", emoji: "☀️", text: "Issiq oftob" },
        { word: "Ot", emoji: "🐎", text: "Chopqir ot" }
      ]
    },
    {
      id: "p",
      upper: "P",
      lower: "p",
      cyrillic: "П п",
      name: "Pe",
      type: "undosh",
      typeLabel: "Jarangsiz lab undoshi",
      word: "Pufak",
      wordCyrillic: "Пуфак",
      translation: "Balloon",
      emoji: "🎈",
      sentence: "Bayramda bolalar rangli pufaklar uchirdilar.",
      pronounceHint: "Lablar jipslashib, kuchli havo bilan portlaydi: [P]",
      words: [
        { word: "Pufak", emoji: "🎈", text: "Uchar pufak" },
        { word: "Palov", emoji: "🍲", text: "Milliy palov" },
        { word: "Parvona", emoji: "🦋", text: "Nurga talpinar" },
        { word: "Pichoq", emoji: "🔪", text: "O'tkir asbob" }
      ]
    },
    {
      id: "q",
      upper: "Q",
      lower: "q",
      cyrillic: "Қ қ",
      name: "Qa",
      type: "undosh",
      typeLabel: "Jarangsiz chuqur til orqa undoshi",
      word: "Qovun",
      wordCyrillic: "Қовун",
      translation: "Melon",
      emoji: "🍈",
      sentence: "O'zbekistonning shirin qovunlari butun dunyoga mashhur.",
      pronounceHint: "Til ildizi tomoq tomon tortilib, chuqur portlaydi: [Q]",
      words: [
        { word: "Qovun", emoji: "🍈", text: "Shirin qovun" },
        { word: "Qalam", emoji: "✏️", text: "Rangli qalam" },
        { word: "Qush", emoji: "🐦", text: "Sayroqi qush" },
        { word: "Quyosh", emoji: "🌞", text: "Nurlari charog'on" }
      ]
    },
    {
      id: "r",
      upper: "R",
      lower: "r",
      cyrillic: "Р р",
      name: "Er",
      type: "undosh",
      typeLabel: "Jarangli titroq undosh",
      word: "Raketa",
      wordCyrillic: "Ракета",
      translation: "Rocket",
      emoji: "🚀",
      sentence: "Raketa olov purkab osmon-u falakka ko'tarildi.",
      pronounceHint: "Til uchi yuqori tanglayda bir necha bor titraydi: [R]",
      words: [
        { word: "Raketa", emoji: "🚀", text: "Fazoviy kema" },
        { word: "Randa", emoji: "🪵", text: "Duradgor asbobi" },
        { word: "Rasm", emoji: "🎨", text: "Go'zal rasm" },
        { word: "Radio", emoji: "📻", text: "Ovozli xabar" }
      ]
    },
    {
      id: "s",
      upper: "S",
      lower: "s",
      cyrillic: "С с",
      name: "Es",
      type: "undosh",
      typeLabel: "Jarangsiz sirg'aluvchi undosh",
      word: "Sabzi",
      wordCyrillic: "Сабзи",
      translation: "Carrot",
      emoji: "🥕",
      sentence: "Sabzida ko'rish qobiliyatini yaxshilovchi vitaminlar bor.",
      pronounceHint: "Til tishlar orqasiga yaqinlashib, havo shivirlab o'tadi: [S]",
      words: [
        { word: "Sabzi", emoji: "🥕", text: "Sariq sabzi" },
        { word: "Soat", emoji: "⏰", text: "Vaqt o'lchovchi" },
        { word: "Suv", emoji: "💧", text: "Hayot manbai" },
        { word: "Samolyot", emoji: "✈️", text: "Katta uchoq" }
      ]
    },
    {
      id: "t",
      upper: "T",
      lower: "t",
      cyrillic: "Т т",
      name: "Te",
      type: "undosh",
      typeLabel: "Jarangsiz portlovchi undosh",
      word: "Tarvuz",
      wordCyrillic: "Тарвуз",
      translation: "Watermelon",
      emoji: "🍉",
      sentence: "Yozning jaziramasida muzdek tarvuz juda lazzatli.",
      pronounceHint: "Til tishlarga tegib, keskin jarangsiz uziladi: [T]",
      words: [
        { word: "Tarvuz", emoji: "🍉", text: "Muzdek tarvuz" },
        { word: "Tovuq", emoji: "🐔", text: "Don cho'qir tovuq" },
        { word: "Tog'", emoji: "⛰️", text: "Baland cho'qqi" },
        { word: "Tuxum", emoji: "🥚", text: "Foydali tuxum" }
      ]
    },
    {
      id: "u",
      upper: "U",
      lower: "u",
      cyrillic: "У у",
      name: "U",
      type: "unli",
      typeLabel: "Unli tovush",
      word: "Uzum",
      wordCyrillic: "Узум",
      translation: "Grape",
      emoji: "🍇",
      sentence: "Ishkomda hosili ko'p shirin uzumlar osilib turibdi.",
      pronounceHint: "Lablar cho'chchayib, tor doira hosil qiladi: [U]",
      words: [
        { word: "Uzum", emoji: "🍇", text: "Shirin uzum" },
        { word: "Uy", emoji: "🏠", text: "Issiq boshpana" },
        { word: "Uchqun", emoji: "✨", text: "Yorqin chaqnash" },
        { word: "Usta", emoji: "🔨", text: "Mohir hunarmand" }
      ]
    },
    {
      id: "v",
      upper: "V",
      lower: "v",
      cyrillic: "В в",
      name: "Ve",
      type: "undosh",
      typeLabel: "Jarangli sirg'aluvchi undosh",
      word: "Velosiped",
      wordCyrillic: "Велосипед",
      translation: "Bicycle",
      emoji: "🚲",
      sentence: "Velosiped haydash sog'liq uchun juda foydalidir.",
      pronounceHint: "Yuqori tishlar pastki labga tegib jaranglaydi: [V]",
      words: [
        { word: "Velosiped", emoji: "🚲", text: "Ikki g'ildirakli" },
        { word: "Vatan", emoji: "🇺🇿", text: "Aziz yurtimiz" },
        { word: "Vaza", emoji: "🏺", text: "Chiroyli vaza" },
        { word: "Varaq", emoji: "📄", text: "Oq qog'oz" }
      ]
    },
    {
      id: "x",
      upper: "X",
      lower: "x",
      cyrillic: "Х х",
      name: "Xe",
      type: "undosh",
      typeLabel: "Jarangsiz tanglay-tomoq undoshi",
      word: "Xat",
      wordCyrillic: "Хат",
      translation: "Letter / Mail",
      emoji: "✉️",
      sentence: "Men do'stimga qiziqarli xat yozib jo'natdim.",
      pronounceHint: "Til orqasi yumshoq tanglayga yaqinlashib sirg'aladi: [X]",
      words: [
        { word: "Xat", emoji: "✉️", text: "Quvonchli xabar" },
        { word: "Xurmo", emoji: "🌴", text: "Shirin meva" },
        { word: "Xontaxta", emoji: "🪵", text: "Milliy stol" },
        { word: "Xarita", emoji: "🗺️", text: "Dunyo xaritasi" }
      ]
    },
    {
      id: "y",
      upper: "Y",
      lower: "y",
      cyrillic: "Й й",
      name: "Ye",
      type: "undosh",
      typeLabel: "Jarangli til o'rta undoshi",
      word: "Yulduz",
      wordCyrillic: "Юлдуз",
      translation: "Star",
      emoji: "⭐",
      sentence: "Tunda musaffo osmonda minglab yulduzlar porlaydi.",
      pronounceHint: "Til o'rtasi qattiq tanglayga ko'tarilib jaranglaydi: [Y]",
      words: [
        { word: "Yulduz", emoji: "⭐", text: "Porloq yulduz" },
        { word: "Yurak", emoji: "❤️", text: "Urib turgan yurak" },
        { word: "Yomg'ir", emoji: "🌧️", text: "Baraka suvi" },
        { word: "Yo'lbars", emoji: "🐅", text: "Jasur yirtqich" }
      ]
    },
    {
      id: "z",
      upper: "Z",
      lower: "z",
      cyrillic: "З з",
      name: "Ze",
      type: "undosh",
      typeLabel: "Jarangli sirg'aluvchi undosh",
      word: "Zebra",
      wordCyrillic: "Зебра",
      translation: "Zebra",
      emoji: "🦓",
      sentence: "Zebra o'zining chiroyli yo'l-yo'l chiziqlari bilan mashhur.",
      pronounceHint: "Til uchi pastki tishlarga tegib jaranglab sirg'aladi: [Z]",
      words: [
        { word: "Zebra", emoji: "🦓", text: "Yo'l-yo'l zebra" },
        { word: "Zanjir", emoji: "⛓️", text: "Mustahkam bog'ich" },
        { word: "Zinapoya", emoji: "🪜", text: "Yuqoriga yo'l" },
        { word: "Zarpechak", emoji: "🌿", text: "Chirmashgan o'simlik" }
      ]
    },
    {
      id: "o_g",
      upper: "Oʻ",
      lower: "oʻ",
      cyrillic: "Ў ў",
      name: "Oʻ",
      type: "unli",
      typeLabel: "Unli tovush (qisqa, lablangan)",
      word: "Oʻrik",
      wordCyrillic: "Ўрик",
      translation: "Apricot",
      emoji: "🍑",
      sentence: "Daraxtda sarg'ish rangli shirin o'riklar pishdi.",
      pronounceHint: "Lablar oldinga cho'zilib, torroq [o] aytiladi: [Oʻ]",
      words: [
        { word: "Oʻrik", emoji: "🍑", text: "Sarg'ish meva" },
        { word: "Oʻrdak", emoji: "🦆", text: "Suvda suzuvchi" },
        { word: "Oʻtin", emoji: "🪵", text: "Olov yoqilg'isi" },
        { word: "Oʻyin", emoji: "🎮", text: "Qiziqarli mashg'ulot" }
      ]
    },
    {
      id: "g_g",
      upper: "Gʻ",
      lower: "gʻ",
      cyrillic: "Ғ ғ",
      name: "Gʻe",
      type: "undosh",
      typeLabel: "Jarangli chuqur til orqa sirg'aluvchi",
      word: "Gʻoz",
      wordCyrillic: "Ғоз",
      translation: "Goose",
      emoji: "🪿",
      sentence: "Oq g'oz toza ko'l uzra viqor bilan suzadi.",
      pronounceHint: "Tomoq chuquridan, bo'g'izdan sirg'alib jaranglaydi: [Gʻ]",
      words: [
        { word: "Gʻoz", emoji: "🪿", text: "Oq patli g'oz" },
        { word: "Gʻisht", emoji: "🧱", text: "Mustahkam uy asosi" },
        { word: "Gʻildirak", emoji: "🛞", text: "Dumaloq aylanadi" },
        { word: "Gʻurur", emoji: "🏆", text: "Yuksak iftixor" }
      ]
    },
    {
      id: "sh",
      upper: "Sh",
      lower: "sh",
      cyrillic: "Ш ш",
      name: "She",
      type: "undosh",
      typeLabel: "Jarangsiz qo'shma undosh (digraf)",
      word: "Shar",
      wordCyrillic: "Шар",
      translation: "Ball / Sphere",
      emoji: "🔮",
      sentence: "Yer yuzi xuddi katta shar kabi dumaloqdir.",
      pronounceHint: "Til tanglayga yaqinlashib, shivirlab aytiladi: [Sh]",
      words: [
        { word: "Shar", emoji: "🔮", text: "Yaltiroq shar" },
        { word: "Sher", emoji: "🦁", text: "Hayvonlar shohi" },
        { word: "Shakar", emoji: "🍬", text: "Shirin ta'm" },
        { word: "Sharshara", emoji: "🌊", text: "Chashma suvi" }
      ]
    },
    {
      id: "ch",
      upper: "Ch",
      lower: "ch",
      cyrillic: "Ч ч",
      name: "Che",
      type: "undosh",
      typeLabel: "Jarangsiz qo'shma undosh (digraf)",
      word: "Choynak",
      wordCyrillic: "Чойнак",
      translation: "Teapot",
      emoji: "🫖",
      sentence: "Dasturxonga xushbo'y ko'k choyli choynak qo'yildi.",
      pronounceHint: "Til uchi va o'rtasi qattiq tanglayga uriladi: [Ch]",
      words: [
        { word: "Choynak", emoji: "🫖", text: "Naqshli choynak" },
        { word: "Chumoli", emoji: "🐜", text: "Mehnatkash chumoli" },
        { word: "Chaqmoq", emoji: "⚡", text: "Tezkor olov" },
        { word: "Chiroq", emoji: "💡", text: "Ziyo taratuvchi" }
      ]
    },
    {
      id: "ng",
      upper: "Ng",
      lower: "ng",
      cyrillic: "Нг нг",
      name: "Eng",
      type: "undosh",
      typeLabel: "Jarangli burun tovushi (so'z boshida kelmaydi)",
      word: "Tong",
      wordCyrillic: "Тонг",
      translation: "Dawn / Morning",
      emoji: "🌅",
      sentence: "Ertalab tong musaffo shabada bilan otdi.",
      pronounceHint: "Til orqasi tanglayga yopishib, tovush burundan chiqadi: [ng]",
      words: [
        { word: "Tong", emoji: "🌅", text: "Yorug' tong" },
        { word: "Rang", emoji: "🎨", text: "Kamalak ranglari" },
        { word: "Dengiz", emoji: "🌊", text: "Moviy dengiz" },
        { word: "Qo'ng'iroq", emoji: "🔔", text: "Jarangdor sado" }
      ]
    }
  ],

  // Tutuq belgisi maxsus belgisi
  specialSign: {
    symbol: "ʼ",
    cyrillic: "Ъ ъ",
    name: "Tutuq belgisi",
    description: "Unlilardan keyin kelsa cho'ziqlik beradi, undoshdan keyin kelsa keyingi unlini ajratib o'qishni bildiradi.",
    examples: [
      { word: "Aʼlo", meaning: "Eng yuqori baho, ajoyib", emoji: "🌟" },
      { word: "Maʼno", meaning: "So'zning mazmuni", emoji: "💡" },
      { word: "Sanʼat", meaning: "Ijodiy mahorat", emoji: "🎨" },
      { word: "Neʼmat", meaning: "Rizq, tansiq taom", emoji: "🍱" }
    ]
  },

  // Kirill qo'shimcha harflari
  cyrillicExtra: [
    { upper: "Ё", lower: "ё", latin: "Yo yo", word: "Йўлбарс (Yo'lbars)", emoji: "🐅" },
    { upper: "Ю", lower: "ю", latin: "Yu yu", word: "Юлдуз (Yulduz)", emoji: "⭐" },
    { upper: "Я", lower: "я", latin: "Ya ya", word: "Ялпиз (Yalpiz)", emoji: "🌿" },
    { upper: "Ц", lower: "ц", latin: "Ts ts", word: "Цирк (Sirk)", emoji: "🎪" },
    { upper: "Э", lower: "э", latin: "E e", word: "Эшик (Eshik)", emoji: "🚪" },
    { upper: "Щ", lower: "щ", latin: "Shch shch", word: "Щётка (Cho'tka)", emoji: "🪥" },
    { upper: "Ь", lower: "ь", latin: "-", word: "Юмшатиш белгиси", emoji: "🔹" }
  ],

  // O'yinlar uchun boyitilgan so'zlar ro'yxati
  gameWords: [
    { word: "ANOR", emoji: "🍎", hint: "Qizil, sersuv nordon-shirin meva" },
    { word: "BALIQ", emoji: "🐟", hint: "Suvda yashovchi hayvon" },
    { word: "DARAXT", emoji: "🌳", hint: "Bog'dagi yashil soya beruvchi o'simlik" },
    { word: "FIL", emoji: "🐘", hint: "Xartumi bor katta hayvon" },
    { word: "GUL", emoji: "🌸", hint: "Bahorda ochiluvchi xushbo'y o'simlik" },
    { word: "HASSA", emoji: "🦯", hint: "Bobolar tayanadigan tayoq" },
    { word: "KITOB", emoji: "📖", hint: "Sahifalari bor bilim manbai" },
    { word: "LOLA", emoji: "🌷", hint: "Bahoriy qizil gul" },
    { word: "MUSHUK", emoji: "🐱", hint: "Miyovlaydigan uy hayvoni" },
    { word: "NON", emoji: "🍞", hint: "Tandirda pishadigan aziz ne'mat" },
    { word: "OLMA", emoji: "🍏", hint: "Daraxtda pishadigan mazali meva" },
    { word: "PUFAK", emoji: "🎈", hint: "Havoda uchuvchi rang-barang sharcha" },
    { word: "QOVUN", emoji: "🍈", hint: "Polizda pishuvchi shirin ne'mat" },
    { word: "RAKETA", emoji: "🚀", hint: "Fazoga uchuvchi transport" },
    { word: "SABZI", emoji: "🥕", hint: "Oshga solinadigan foydali sabzavot" },
    { word: "TARVUZ", emoji: "🍉", hint: "Ich qizil, sersuv poliz ekini" },
    { word: "UZUM", emoji: "🍇", hint: "Ishkomda osilib pishadigan meva" },
    { word: "YULDUZ", emoji: "⭐", hint: "Kechasi osmonda charaqlaydi" },
    { word: "ZEBRA", emoji: "🦓", hint: "Oq-qora chiziqli hayvon" },
    { word: "CHOYNAK", emoji: "🫖", hint: "Choy damlanadigan idish" },
    { word: "SHAR", emoji: "🔮", hint: "Dumaloq shakldagi buyum" }
  ],

  // Harf chizish (Tracing) uchun boshlang'ich yo'nalish koordinatalari (svg / canvas)
  tracingGuides: {
    "A": [
      { start: [50, 190], end: [120, 30] },
      { start: [120, 30], end: [190, 190] },
      { start: [75, 130], end: [165, 130] }
    ],
    "B": [
      { start: [60, 30], end: [60, 190] },
      { start: [60, 30], end: [140, 30], curve1: [180, 75], curve2: [140, 110], end: [60, 110] },
      { start: [60, 110], end: [150, 110], curve1: [190, 150], curve2: [150, 190], end: [60, 190] }
    ]
  }
};

