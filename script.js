// =========================
// Corazones flotantes
// =========================
(function createFloatingHearts() {
  const container = document.getElementById("floating-hearts-container");
  if (!container) return;

  const HEARTS_COUNT = 25;

  for (let i = 0; i < HEARTS_COUNT; i++) {
    const heart = document.createElement("div");
    heart.className = "floating-heart";
    heart.textContent = "❤";

    const left = Math.random() * 100; // %
    const delay = Math.random() * 5; // s
    const duration = 5 + Math.random() * 10; // s
    const fontSize = 20 + Math.random() * 20; // px

    heart.style.left = left + "%";
    heart.style.animationDelay = delay + "s";
    heart.style.animationDuration = duration + "s";
    heart.style.fontSize = fontSize + "px";

    container.appendChild(heart);
  }
})();

// =========================
// Timer "Tiempo Juntos"
// =========================
(function initTimeTogether() {
  const wrapper = document.getElementById("time-together");
  if (!wrapper) return;

  const startAttr = wrapper.getAttribute("data-start");
  // Fecha de inicio de la relación (puedes cambiarla en el HTML)
  const startDate = startAttr ? new Date(startAttr) : new Date();

  const daysEl = document.getElementById("days-value");
  const hoursEl = document.getElementById("hours-value");
  const minutesEl = document.getElementById("minutes-value");
  const secondsEl = document.getElementById("seconds-value");

  function updateTime() {
    const now = new Date();
    const diff = now.getTime() - startDate.getTime();

    if (diff < 0) return;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    if (daysEl) daysEl.textContent = String(days).padStart(2, "0");
    if (hoursEl) hoursEl.textContent = String(hours).padStart(2, "0");
    if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, "0");
    if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, "0");
  }

  updateTime();
  setInterval(updateTime, 1000);
})();

// =========================
// Mensaje del corazón
// (antes usaba Gemini, ahora frases aleatorias)
// =========================
(function initLoveNote() {
  const textEl = document.getElementById("love-note-text");
  const button = document.getElementById("love-note-button");
  const buttonText = document.getElementById("love-button-text");
  const errorEl = document.getElementById("love-note-error");

  if (!textEl || !button || !buttonText) return;

  const messages = [
    "Te amo más que ayer y menos que mañana.",
    "Tu sonrisa es mi lugar favorito en el mundo.",
    "Si volviera a nacer, te volvería a elegir una y mil veces.",
    "Contigo todo es más bonito, incluso los días normales.",
    "Eres mi casualidad favorita convertida en destino.",
    "Tu abrazo es el lugar donde todo tiene sentido.",
    "Gracias por existir y por dejarme quererte.",
  ];

  function getRandomMessage() {
    return messages[Math.floor(Math.random() * messages.length)];
  }

  button.addEventListener("click", () => {
    button.disabled = true;
    buttonText.textContent = "Pensando en ti...";
    if (errorEl) errorEl.classList.add("hidden");

    setTimeout(() => {
      try {
        const message = getRandomMessage();
        textEl.textContent = `"${message}"`;
      } catch (e) {
        if (errorEl) errorEl.classList.remove("hidden");
        textEl.textContent = '"Te amo más que ayer y menos que mañana."';
      } finally {
        button.disabled = false;
        buttonText.textContent = "Dime algo lindo";
      }
    }, 800);
  });
})();

// =========================
// Botón de música (simulado)
// =========================
(function initMusicToggle() {
  const toggleBtn = document.getElementById("music-toggle");
  const icon = document.getElementById("music-icon");
  const audio = document.getElementById("bg-music");

  if (!toggleBtn || !icon) return;

  let playing = false;

  toggleBtn.addEventListener("click", () => {
    playing = !playing;

    if (playing) {
      toggleBtn.classList.add("text-love-500", "bg-love-50");
      toggleBtn.classList.remove("text-gray-400");
      icon.textContent = "🔊";
      toggleBtn.title = "Pausar música";
      if (audio && audio.play) {
        audio.play().catch(() => {});
      }
    } else {
      toggleBtn.classList.remove("text-love-500", "bg-love-50");
      toggleBtn.classList.add("text-gray-400");
      icon.textContent = "🔇";
      toggleBtn.title = "Reproducir música";
      if (audio && audio.pause) {
        audio.pause();
      }
    }
  });
})();
