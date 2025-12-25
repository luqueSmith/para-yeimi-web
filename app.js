/* Datos (basados en constants.tsx) */
const INITIAL_LETTERS = [
  {
    id: 1,
    title: "Nuestra Primera Navidad Juntos",
    content: "Yeimi, desde que llegaste a mi vida, cada día se siente como Navidad. Eres el regalo que nunca esperé pero que siempre necesité. Tu sonrisa ilumina más que cualquier árbol navideño.",
    date: "24 Dic 2024",
    category: "christmas"
  },
  {
    id: 2,
    title: "Eres mi Universo",
    content: "No hay palabras suficientes en el diccionario para describir cuánto te amo. Eres mi refugio, mi paz y mi mayor alegría. Gracias por ser tú, Yeimi.",
    date: "Eternamente",
    category: "romantic"
  },
  {
    id: 3,
    title: "Una Promesa de Amor",
    content: "Prometo cuidarte, respetarte y amarte en cada estación de nuestra vida. No importa si es invierno o verano, mi corazón siempre estará tibio por tu amor.",
    date: "Siempre",
    category: "promise"
  }
];

const ROMANTIC_PHRASES = [
  "Yeimi, eres la razón de mis sonrisas.",
  "Bajo el muérdago o bajo el sol, te amo igual.",
  "Eres el milagro de mi Navidad.",
  "Mi deseo de Navidad se cumplió cuando te conocí.",
  "Tu amor es el único regalo que necesito.",
  "Contigo, el invierno se siente como primavera.",
  "Yeimi + Yo = Para siempre."
];

const MEMORIES = [
  { id: 1, imageUrl: "img/img-1.png", caption: "Nuestros momentos mágicos" },
  { id: 2, imageUrl: "img/img-2.png", caption: "Tu risa que lo cura todo" },
  { id: 3, imageUrl: "img/img-3.png", caption: "Caminando juntos de la mano" },
  { id: 4, imageUrl: "img/img-4.png", caption: "Mirando el futuro a tu lado" },
];

/* Utilidades */
const $ = (sel) => document.querySelector(sel);

function pad0(n) { return String(n); } // tu UI ya usa sin ceros

/* 1) Snowfall (como Snowfall.tsx) */
function initSnowfall() {
  const container = $("#snowfall");
  if (!container) return;

  const symbols = ["❄", "❅", "❤", "✨"];
  const count = 30;

  container.innerHTML = "";
  for (let i = 0; i < count; i++) {
    const s = document.createElement("span");
    const content = symbols[Math.floor(Math.random() * symbols.length)];
    const left = Math.random() * 100;
    const size = (Math.random() * (1.2 - 0.4) + 0.4);
    const duration = (Math.random() * (15 - 8) + 8);
    const delay = (Math.random() * 10);

    s.className = "snow-particle";
    s.textContent = content;
    s.style.left = `${left}%`;
    s.style.fontSize = `${size}rem`;
    s.style.animationDuration = `${duration}s`;
    s.style.animationDelay = `${delay}s`;
    s.style.color = content === "❤" ? "#f472b6" : "white";

    container.appendChild(s);
  }
}

/* 2) Twinkle lights (como TwinkleLights.tsx) */
function initTwinkleLights() {
  const wrap = $("#twinkle-lights");
  if (!wrap) return;

  const colors = ["#ff0000", "#00ff00", "#ffff00", "#0000ff", "#ff00ff", "#ffffff"];
  const lightsCount = 25;

  wrap.innerHTML = "";

  for (let i = 0; i < lightsCount; i++) {
    const d = document.createElement("div");
    d.className = "light";
    const c = colors[i % colors.length];
    d.style.backgroundColor = c;
    d.style.boxShadow = `0 0 8px ${c}`;
    d.style.animationDelay = `${i * 0.15}s`;
    wrap.appendChild(d);
  }

  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 500 32");
  svg.innerHTML = `<path d="M0 5 Q 50 15 100 5 T 200 5 T 300 5 T 400 5 T 500 5" fill="none" stroke="rgba(255,255,255,0.15)" stroke-width="0.5" />`;
  wrap.appendChild(svg);
}

/* 3) Countdown + isChristmas (como App.tsx) */
function getChristmasTs() {
  const now = new Date();
  const year = now.getFullYear();
  return new Date(year, 11, 25, 0, 0, 0).getTime(); // 25 Dic 00:00
}

function startCountdown() {
  const elDays = $("#days");
  const elHours = $("#hours");
  const elMinutes = $("#minutes");
  const elSeconds = $("#seconds");

  function tick() {
    const christmas = getChristmasTs();
    const now = Date.now();
    const diff = christmas - now;

    let isChristmas = diff <= 0;
    let timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

    if (!isChristmas) {
      timeLeft.days = Math.floor(diff / (1000 * 60 * 60 * 24));
      timeLeft.hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      timeLeft.minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      timeLeft.seconds = Math.floor((diff % (1000 * 60)) / 1000);
    }

    if (elDays) elDays.textContent = pad0(timeLeft.days);
    if (elHours) elHours.textContent = pad0(timeLeft.hours);
    if (elMinutes) elMinutes.textContent = pad0(timeLeft.minutes);
    if (elSeconds) elSeconds.textContent = pad0(timeLeft.seconds);

    // Actualiza regalo (badge y warning)
    updateGiftState(isChristmas, timeLeft);
  }

  tick();
  setInterval(tick, 1000);
}

/* 4) Frases rotando (cada 5s) */
function startPhrases() {
  const el = $("#phrase");
  if (!el) return;

  let idx = 0;
  el.textContent = ROMANTIC_PHRASES[idx];

  setInterval(() => {
    idx = (idx + 1) % ROMANTIC_PHRASES.length;
    el.textContent = ROMANTIC_PHRASES[idx];
  }, 5000);
}

/* 5) Letters: render + open/close (como LetterCard.tsx) */
function renderLetters() {
  const grid = $("#lettersGrid");
  if (!grid) return;

  grid.innerHTML = "";
  for (const letter of INITIAL_LETTERS) {
    const wrapper = document.createElement("article");
    wrapper.className = "letter closed";
    wrapper.dataset.id = String(letter.id);

    wrapper.innerHTML = `
      <div class="letter-card">
        <div class="letter-inner">
          <div class="letter-front">
            <div class="envelope" aria-hidden="true">
              <span>✉️</span>
              <div class="envelope-badge" aria-hidden="true">❤️</div>
            </div>

            <div>
              <h3 class="letter-title gold-text-glow">${escapeHtml(letter.title)}</h3>
              <p class="letter-to">Para Yeimi</p>
            </div>

            <div class="tap-pill">
              <span>Toca para abrir</span>
            </div>
          </div>

          <div class="letter-back hidden">
            <div class="letter-topline">
              <span aria-hidden="true">🌹</span>
              <span class="letter-date">${escapeHtml(letter.date)}</span>
            </div>

            <h3>${escapeHtml(letter.title)}</h3>

            <p class="letter-content">${escapeHtml(letter.content)}</p>

            <div class="letter-sign">
              <p class="eternal">Eternamente tuyo,</p>
              <p class="name">Tu Amor</p>
              <div class="wax" aria-hidden="true">Y</div>
            </div>
          </div>
        </div>
      </div>

      <button class="letter-close hidden" aria-label="Cerrar carta">✕</button>
    `;

    wrapper.addEventListener("click", (e) => {
      // Si clic en botón cerrar, lo maneja su handler
      const closeBtn = e.target.closest?.(".letter-close");
      if (closeBtn) return;
      toggleLetter(wrapper, true);
    });

    const closeBtn = wrapper.querySelector(".letter-close");
    closeBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleLetter(wrapper, false);
    });

    grid.appendChild(wrapper);
  }
}

function toggleLetter(wrapper, open) {
  const front = wrapper.querySelector(".letter-front");
  const back = wrapper.querySelector(".letter-back");
  const closeBtn = wrapper.querySelector(".letter-close");

  if (open) {
    wrapper.classList.add("open");
    wrapper.classList.remove("closed");
    front.classList.add("hidden");
    back.classList.remove("hidden");
    closeBtn.classList.remove("hidden");
  } else {
    wrapper.classList.remove("open");
    wrapper.classList.add("closed");
    back.classList.add("hidden");
    front.classList.remove("hidden");
    closeBtn.classList.add("hidden");
  }
}

/* 6) Memories */
function renderMemories() {
  const grid = $("#memoriesGrid");
  if (!grid) return;

  grid.innerHTML = "";
  for (const m of MEMORIES) {
    const card = document.createElement("div");
    card.className = "memory";
    card.innerHTML = `
      <img src="${m.imageUrl}" alt="${escapeAttr(m.caption)}" loading="lazy" />
      <div class="cap"><p>${escapeHtml(m.caption)}</p></div>
    `;
    grid.appendChild(card);
  }
}

/* 7) Gift (como ChristmasGift.tsx) */
let giftState = { isChristmas: false, timeLeft: { days: 0, hours: 0, minutes: 0, seconds: 0 } };

function updateGiftState(isChristmas, timeLeft) {
  giftState = { isChristmas, timeLeft };

  const lockBadge = $("#giftLockBadge");
  if (lockBadge) {
    lockBadge.style.display = isChristmas ? "none" : "inline-flex";
  }

  // Si ya es navidad y el usuario abrió, se verá el unlocked
}

function initGift() {
  const locked = $("#giftLocked");
  const unlocked = $("#giftUnlocked");
  const warning = $("#giftWarning");
  const warningSub = $("#giftWarningSub");

  function showWarning() {
    if (!warning || !warningSub) return;
    const t = giftState.timeLeft;
    warningSub.textContent = `Faltan ${t.days}d ${t.hours}h ${t.minutes}m de magia.`;
    warning.classList.remove("hidden");
    setTimeout(() => warning.classList.add("hidden"), 4000);
  }

  function wiggle() {
    if (!locked) return;
    locked.classList.add("wiggle");
    setTimeout(() => locked.classList.remove("wiggle"), 500);
  }

  function openGift() {
    if (!locked || !unlocked) return;
    locked.classList.add("hidden");
    unlocked.classList.remove("hidden");
  }

  function handleGift() {
    if (!giftState.isChristmas) {
      wiggle();
      showWarning();
    } else {
      window.location.href = "./regalo/regalo.html";
    }
  }
  

  if (locked) {
    locked.addEventListener("click", handleGift);
    locked.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleGift();
      }
    });
  }

  const acceptBtn = $("#acceptLoveBtn");
  if (acceptBtn) {
    acceptBtn.addEventListener("click", () => {
      alert("💖 ¡Confirmado! Yeimi y su novio serán felices para siempre.");
    });
  }
}

/* 8) Poem generator (local, sin IA) */
function initPoemGenerator() {
  const input = $("#themeInput");
  const btn = $("#generatePoemBtn");
  const result = $("#poemResult");
  const text = $("#poemText");
  const insp = $("#poemInspiration");

  if (!input || !btn || !result || !text || !insp) return;

  const templates = [
    (theme) => `Yeimi, en ${theme.toLowerCase()} encuentro mi destino,\ncomo luces en diciembre, tu amor marca mi camino.\nSi el mundo se apaga, tú enciendes mi razón;\nmi Navidad eterna vive en tu corazón.`,
    (theme) => `Bajo el cielo de invierno, susurro tu nombre: Yeimi.\nHoy ${theme.toLowerCase()} se vuelve promesa y se vuelve sueño.\nEres paz y eres fuego, eres risa y eres hogar,\ny en tus ojos mi vida aprende a celebrar.`,
    (theme) => `Si ${theme.toLowerCase()} tuviera voz, diría lo que yo callo:\nque te amo sin medida, que por ti todo lo hallo.\nYeimi, mi milagro, mi ternura, mi verdad,\ncontigo cada día se convierte en Navidad.`
  ];

  function generate() {
    btn.disabled = true;
    btn.textContent = "Escribiendo...";

    const theme = (input.value || "Nuestra eterna conexión").trim();
    const pick = templates[Math.floor(Math.random() * templates.length)];
    const poem = pick(theme);

    // Simula “respuesta”
    setTimeout(() => {
      text.textContent = poem;
      insp.textContent = `Inspiración: ${theme}`;
      result.classList.remove("hidden");
      btn.disabled = false;
      btn.textContent = "Crear Poema ✨";
    }, 450);
  }

  btn.addEventListener("click", generate);
}

/* Seguridad simple de HTML */
function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
function escapeAttr(str) { return escapeHtml(str); }

/* Init */
document.addEventListener("DOMContentLoaded", () => {
  initSnowfall();
  initTwinkleLights();

  startCountdown();
  startPhrases();

  renderLetters();
  renderMemories();

  initGift();
  initPoemGenerator();
});
