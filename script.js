/* ==========================================================
   The Midterm Appreciation Club
   ========================================================== */

/* ----------------------------------------------------------
   ✏️  THE LETTER — edit everything Shania reads at the end here.
   Each string in `paragraphs` becomes its own paragraph.
   ---------------------------------------------------------- */
const PERSONAL_MESSAGE = {
  greeting: "Dear Shania,",
  paragraphs: [
    "You did it. Midterms are officially over, and I wanted to make you a little something to mark it, because getting through them is honestly a big deal.",
    "I know these past few weeks were a lot. All the studying, the stress, the “okay, just one more chapter” that was never just one more chapter. Whatever the results end up being, the effort you put in was real, and I noticed it. I’m really proud of how you kept showing up, even on the days you were completely over it.",
    "So here’s your only assignment now: rest. Sleep in, eat something good, watch something silly, do absolutely nothing for a bit, and please don’t feel guilty about any of it. You’ve more than earned a proper break.",
    "And if you want company for any of that, you know exactly where to find me.",
  ],
  closing: "Proud of you, always. ♡",
  signature: "— your boyfriend", // ← swap in your name before sending
};

/* The little star who hosts the club. */
const HOST_NAME = "Bintang";

/* ----------------------------------------------------------
   Game tuning
   ---------------------------------------------------------- */
const GAME_SECONDS = 18;

const MILESTONES = {
  3:  "Ooh, natural talent.",
  8:  "Bintang is taking notes.",
  15: "Okay, show-off. ♡",
  25: "Is this a record? I think this is a record.",
  35: "I’m running out of stars over here!",
};
const FIVE_SECONDS_LINE = "Five seconds left! No pressure. Literally none.";

/* ==========================================================
   Helpers
   ========================================================== */
const $ = (sel) => document.querySelector(sel);
const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
const prefersReducedMotion = () => reducedMotionQuery.matches;
const rand = (min, max) => min + Math.random() * (max - min);
const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

function restartAnimation(el, className) {
  el.classList.remove(className);
  void el.offsetWidth; // reflow so the animation can replay
  el.classList.add(className);
}

/* ==========================================================
   Screens
   ========================================================== */
const screens = {
  welcome: $("#screen-welcome"),
  game: $("#screen-game"),
  note: $("#screen-note"),
};

function showScreen(name, focusEl) {
  Object.entries(screens).forEach(([key, el]) => {
    const active = key === name;
    el.hidden = !active;
    el.classList.toggle("is-active", active);
  });
  const screen = screens[name];
  restartAnimation(screen, "is-entering");
  window.scrollTo(0, 0);
  const target = focusEl || screen.querySelector("[tabindex='-1']");
  if (target) target.focus({ preventScroll: true });
}

document.querySelectorAll("[data-host-name]").forEach((el) => (el.textContent = HOST_NAME));

/* ==========================================================
   Sprites (pre-rendered once per size for smooth drawing)
   ========================================================== */
const COLORS = {
  ink: "#4b1022",
  pink: "#ff5c93",
  hot: "#ff3d7f",
  soft: "#ffc6d9",
  cream: "#fffaf2",
};

function starPath(ctx, cx, cy, outer, inner) {
  ctx.beginPath();
  for (let i = 0; i < 10; i++) {
    const r = i % 2 === 0 ? outer : inner;
    const a = -Math.PI / 2 + (i * Math.PI) / 5;
    const x = cx + Math.cos(a) * r;
    const y = cy + Math.sin(a) * r;
    i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  }
  ctx.closePath();
}

function heartPath(ctx, cx, cy, s) {
  // s = half-width of the heart
  ctx.beginPath();
  ctx.moveTo(cx, cy + s * 0.95);
  ctx.bezierCurveTo(cx - s * 1.25, cy + s * 0.1, cx - s * 1.0, cy - s * 0.95, cx, cy - s * 0.42);
  ctx.bezierCurveTo(cx + s * 1.0, cy - s * 0.95, cx + s * 1.25, cy + s * 0.1, cx, cy + s * 0.95);
  ctx.closePath();
}

function makeSprite(size, draw) {
  const dpr = Math.min(window.devicePixelRatio || 1, 3);
  const c = document.createElement("canvas");
  c.width = c.height = Math.ceil(size * dpr);
  const ctx = c.getContext("2d");
  ctx.scale(dpr, dpr);
  draw(ctx, size);
  return { canvas: c, size };
}

function makeStarSprite(r) {
  const pad = r * 0.35;
  return makeSprite(r * 2 + pad * 2, (ctx, size) => {
    const c = size / 2;
    ctx.lineJoin = "round";
    starPath(ctx, c, c + r * 0.06, r, r * 0.5);
    ctx.lineWidth = r * 0.26;
    ctx.strokeStyle = COLORS.ink;
    ctx.stroke();
    ctx.fillStyle = COLORS.pink;
    ctx.fill();
    // softer inner star
    starPath(ctx, c - r * 0.04, c + r * 0.02, r * 0.62, r * 0.31);
    ctx.fillStyle = COLORS.soft;
    ctx.fill();
    // little glint
    ctx.fillStyle = "rgba(255,255,255,.9)";
    ctx.beginPath();
    ctx.ellipse(c - r * 0.16, c - r * 0.18, r * 0.09, r * 0.17, -0.5, 0, Math.PI * 2);
    ctx.fill();
  });
}

function makeHeartSprite(r) {
  const pad = r * 0.35;
  return makeSprite(r * 2 + pad * 2, (ctx, size) => {
    const c = size / 2;
    ctx.lineJoin = "round";
    heartPath(ctx, c, c, r);
    ctx.lineWidth = r * 0.24;
    ctx.strokeStyle = COLORS.ink;
    ctx.stroke();
    ctx.fillStyle = COLORS.hot;
    ctx.fill();
    ctx.strokeStyle = "rgba(255,255,255,.85)";
    ctx.lineCap = "round";
    ctx.lineWidth = r * 0.14;
    ctx.beginPath();
    ctx.arc(c - r * 0.42, c - r * 0.25, r * 0.28, Math.PI * 1.05, Math.PI * 1.55);
    ctx.stroke();
  });
}

function makeBasketSprite(w, h) {
  const pad = 6;
  const W = w + pad * 2;
  const H = h + pad * 2;
  const dpr = Math.min(window.devicePixelRatio || 1, 3);
  const c = document.createElement("canvas");
  c.width = Math.ceil(W * dpr);
  c.height = Math.ceil(H * dpr);
  const ctx = c.getContext("2d");
  ctx.scale(dpr, dpr);
  ctx.lineJoin = "round";
  ctx.lineCap = "round";

  const top = pad + h * 0.34; // rim line
  const left = pad;
  const right = pad + w;
  const bottom = pad + h;
  const inset = w * 0.1;
  const lw = Math.max(2.5, w * 0.028);

  // handle
  ctx.beginPath();
  ctx.lineWidth = lw * 1.9;
  ctx.strokeStyle = COLORS.ink;
  ctx.ellipse(W / 2, top, w * 0.3, h * 0.32, 0, Math.PI, 0);
  ctx.stroke();
  ctx.lineWidth = lw * 0.8;
  ctx.strokeStyle = COLORS.soft;
  ctx.stroke();

  // body shape
  const body = () => {
    ctx.beginPath();
    ctx.moveTo(left, top);
    ctx.lineTo(right, top);
    ctx.lineTo(right - inset, bottom - 6);
    ctx.quadraticCurveTo(right - inset - 2, bottom, right - inset - 8, bottom);
    ctx.lineTo(left + inset + 8, bottom);
    ctx.quadraticCurveTo(left + inset + 2, bottom, left + inset, bottom - 6);
    ctx.closePath();
  };

  // gingham fill
  ctx.save();
  body();
  ctx.clip();
  ctx.fillStyle = COLORS.cream;
  ctx.fillRect(0, 0, W, H);
  const cell = Math.max(7, w / 11);
  ctx.fillStyle = "rgba(255,92,147,.55)";
  for (let x = 0; x < W; x += cell * 2) ctx.fillRect(x, 0, cell, H);
  for (let y = top; y < H; y += cell * 2) ctx.fillRect(0, y, W, cell);
  ctx.restore();

  body();
  ctx.lineWidth = lw;
  ctx.strokeStyle = COLORS.ink;
  ctx.stroke();

  // rim band
  const rimH = Math.max(8, h * 0.17);
  ctx.beginPath();
  ctx.roundRect
    ? ctx.roundRect(left - 3, top - rimH / 2, w + 6, rimH, rimH / 2)
    : ctx.rect(left - 3, top - rimH / 2, w + 6, rimH);
  ctx.fillStyle = COLORS.pink;
  ctx.fill();
  ctx.stroke();

  return { canvas: c, w: W, h: H, pad, rimOffset: top };
}

/* ==========================================================
   GAME
   ========================================================== */
const canvas = $("#game-canvas");
const ctx = canvas.getContext("2d");
const stage = $("#stage");
const hudScore = $("#hud-score");
const hudTime = $("#hud-time");
const timebarFill = $("#timebar-fill");
const mcText = $("#mc-text");
const overlayIntro = $("#overlay-intro");
const overlayResults = $("#overlay-results");

const game = {
  running: false,
  W: 0,
  H: 0,
  score: 0,
  timeLeft: GAME_SECONDS,
  shownSeconds: GAME_SECONDS,
  items: [],
  pops: [],
  spawnIn: 0,
  basket: { x: 0, targetX: 0, w: 100, h: 56, y: 0, squish: 0 },
  keys: { left: false, right: false },
  saidMilestones: new Set(),
  saidFiveSeconds: false,
  lastTime: 0,
  rafId: 0,
  sprites: null,
};

function resizeCanvas() {
  const rect = stage.getBoundingClientRect();
  const W = Math.max(1, Math.round(rect.width));
  const H = Math.max(1, Math.round(rect.height));
  if (W === game.W && H === game.H && game.sprites) return;

  const dpr = Math.min(window.devicePixelRatio || 1, 3);
  canvas.width = Math.round(W * dpr);
  canvas.height = Math.round(H * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  const prevW = game.W || W;
  game.W = W;
  game.H = H;

  const b = game.basket;
  b.w = clamp(W * 0.26, 84, 140);
  b.h = b.w * 0.62;
  b.y = H - b.h - 12;
  const ratio = W / prevW;
  b.x = clamp((b.x || W / 2) * ratio, b.w / 2, W - b.w / 2);
  b.targetX = clamp((b.targetX || W / 2) * ratio, b.w / 2, W - b.w / 2);

  const r = clamp(W * 0.048, 15, 24);
  game.starR = r;
  game.sprites = {
    star: makeStarSprite(r),
    heart: makeHeartSprite(r * 0.95),
    basket: makeBasketSprite(b.w, b.h),
  };
  if (!game.running) draw();
}

new ResizeObserver(resizeCanvas).observe(stage);

function resetGame() {
  game.score = 0;
  game.timeLeft = GAME_SECONDS;
  game.shownSeconds = GAME_SECONDS;
  game.items = [];
  game.pops = [];
  game.spawnIn = 0.25;
  game.saidMilestones = new Set();
  game.saidFiveSeconds = false;
  game.keys.left = game.keys.right = false;
  game.basket.x = game.basket.targetX = game.W / 2;
  game.basket.squish = 0;
  hudScore.textContent = "0";
  hudTime.textContent = String(GAME_SECONDS);
  timebarFill.style.transform = "scaleX(1)";
  sayMC("Every star up there is yours to keep.");
}

function startGame() {
  cancelAnimationFrame(game.rafId);
  resizeCanvas();
  resetGame();
  overlayIntro.hidden = true;
  overlayResults.hidden = true;
  game.running = true;
  sayMC("Go go go! Catch them all!");
  canvas.focus({ preventScroll: true });
  game.lastTime = performance.now();
  game.rafId = requestAnimationFrame(loop);
}

function endGame() {
  game.running = false;
  game.keys.left = game.keys.right = false;
  hudTime.textContent = "0";
  timebarFill.style.transform = "scaleX(0)";
  sayMC("Time! Beautifully done.");
  draw();
  showResults();
}

function loop(now) {
  if (!game.running) return;
  // Clamp dt so a backgrounded tab doesn't burn through the timer.
  const dt = Math.min(0.05, (now - game.lastTime) / 1000);
  game.lastTime = now;
  update(dt);
  draw();
  if (game.running) game.rafId = requestAnimationFrame(loop);
}

function spawnItem() {
  const r = game.starR;
  const isHeart = Math.random() < 0.16;
  const margin = r * 1.4;
  game.items.push({
    type: isHeart ? "heart" : "star",
    x: rand(margin, game.W - margin),
    y: -r * 1.5,
    vy: game.H / rand(2.0, 2.7),
    drift: rand(-14, 14),
    swayPhase: rand(0, Math.PI * 2),
    rot: rand(-0.4, 0.4),
    spin: isHeart ? 0 : rand(-1.6, 1.6),
    r,
  });
}

function update(dt) {
  const b = game.basket;
  const { W, H } = game;

  // keyboard movement
  const dir = (game.keys.right ? 1 : 0) - (game.keys.left ? 1 : 0);
  if (dir) b.targetX += dir * W * 1.25 * dt;
  b.targetX = clamp(b.targetX, b.w / 2, W - b.w / 2);
  b.x += (b.targetX - b.x) * Math.min(1, dt * 20);
  b.squish = Math.max(0, b.squish - dt * 5);

  // spawning
  game.spawnIn -= dt;
  if (game.spawnIn <= 0) {
    spawnItem();
    game.spawnIn = rand(0.3, 0.52);
  }

  // falling + catching (catch zone is generous on purpose)
  const catchTop = b.y + b.h * 0.12;
  const catchBottom = b.y + b.h * 0.7;
  for (let i = game.items.length - 1; i >= 0; i--) {
    const it = game.items[i];
    it.y += it.vy * dt;
    it.swayPhase += dt * 2.4;
    it.x = clamp(it.x + Math.sin(it.swayPhase) * it.drift * dt, it.r, W - it.r);
    it.rot += it.spin * dt;

    const inX = Math.abs(it.x - b.x) <= b.w / 2 + it.r * 0.35;
    const inY = it.y + it.r * 0.6 >= catchTop && it.y - it.r <= catchBottom;
    if (inX && inY) {
      const pts = it.type === "heart" ? 2 : 1;
      catchItem(it, pts);
      game.items.splice(i, 1);
    } else if (it.y - it.r > H) {
      game.items.splice(i, 1); // missed — no penalty, it just floats away
    }
  }

  // "+1" pops
  for (let i = game.pops.length - 1; i >= 0; i--) {
    const p = game.pops[i];
    p.t += dt;
    if (p.t > p.life) game.pops.splice(i, 1);
  }

  // timer
  game.timeLeft -= dt;
  const secs = Math.max(0, Math.ceil(game.timeLeft));
  if (secs !== game.shownSeconds) {
    game.shownSeconds = secs;
    hudTime.textContent = String(secs);
    if (secs === 5 && !game.saidFiveSeconds) {
      game.saidFiveSeconds = true;
      sayMC(FIVE_SECONDS_LINE);
    }
  }
  timebarFill.style.transform = `scaleX(${clamp(game.timeLeft / GAME_SECONDS, 0, 1)})`;
  if (game.timeLeft <= 0) endGame();
}

function catchItem(it, pts) {
  const before = game.score;
  game.score += pts;
  game.basket.squish = 1;
  hudScore.textContent = String(game.score);
  restartAnimation(hudScore.parentElement, "is-bump");

  const reduced = prefersReducedMotion();
  game.pops.push({
    x: it.x,
    y: game.basket.y - 6,
    text: pts === 2 ? "+2 ♡" : "+1",
    t: 0,
    life: 0.7,
    sparkles: reduced
      ? []
      : Array.from({ length: 5 }, () => ({ a: rand(-Math.PI, 0), d: rand(18, 38) })),
  });

  // MC reactions on milestone crossings (hearts can skip a number)
  for (const m of Object.keys(MILESTONES).map(Number)) {
    if (before < m && game.score >= m && !game.saidMilestones.has(m)) {
      game.saidMilestones.add(m);
      sayMC(MILESTONES[m]);
    }
  }
}

function draw() {
  const { W, H, basket: b, sprites } = game;
  ctx.clearRect(0, 0, W, H);
  if (!sprites) return;

  // items
  for (const it of game.items) {
    const s = it.type === "heart" ? sprites.heart : sprites.star;
    ctx.save();
    ctx.translate(it.x, it.y);
    ctx.rotate(it.rot);
    ctx.drawImage(s.canvas, -s.size / 2, -s.size / 2, s.size, s.size);
    ctx.restore();
  }

  // basket (little squash when something lands)
  const bs = sprites.basket;
  const sq = prefersReducedMotion() ? 0 : Math.sin(b.squish * Math.PI) * 0.08;
  ctx.save();
  ctx.translate(b.x, b.y + b.h);
  ctx.scale(1 + sq, 1 - sq);
  ctx.drawImage(bs.canvas, -bs.w / 2, -b.h - bs.pad, bs.w, bs.h);
  ctx.restore();

  // pops
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  for (const p of game.pops) {
    const k = p.t / p.life;
    ctx.globalAlpha = 1 - k * k;
    ctx.font = `800 ${Math.round(game.starR * 1.05)}px Fraunces, Georgia, serif`;
    ctx.lineWidth = 4;
    ctx.strokeStyle = COLORS.cream;
    ctx.strokeText(p.text, p.x, p.y - k * 34);
    ctx.fillStyle = COLORS.ink;
    ctx.fillText(p.text, p.x, p.y - k * 34);
    ctx.fillStyle = COLORS.hot;
    for (const s of p.sparkles) {
      const d = s.d * Math.min(1, k * 1.6);
      ctx.beginPath();
      ctx.arc(p.x + Math.cos(s.a) * d, p.y + 10 + Math.sin(s.a) * d, 3.2 * (1 - k), 0, Math.PI * 2);
      ctx.fill();
    }
  }
  ctx.globalAlpha = 1;
}

/* ---------- MC speech ---------- */
function sayMC(text) {
  if (mcText.textContent === text) return;
  mcText.textContent = text;
  restartAnimation(mcText, "is-new");
}

/* ---------- Results (always a celebration) ---------- */
function showResults() {
  const n = game.score;
  const title = $("#results-title");
  const text = $("#results-text");
  if (n === 0) {
    title.textContent = "Zero stars. Maximum relaxation.";
    text.textContent =
      "Honestly? Peak post-midterm energy. The club fully approves. The score was only ever for fun — you already earned every star by getting through midterms.";
  } else {
    title.textContent = `You caught ${n} well-deserved star${n === 1 ? "" : "s"}!`;
    text.textContent =
      "Official club ruling: the score is just for fun. You already earned every star up there by getting through midterms. The ones that got away? Also yours.";
  }
  overlayResults.hidden = false;
  restartAnimation(overlayResults, "is-entering");
  // Let the final frame settle before moving focus.
  setTimeout(() => title.focus({ preventScroll: true }), 50);
}

/* ---------- Input: pointer (mouse + touch, iPhone Safari friendly) ---------- */
function pointerToBasket(e) {
  const rect = canvas.getBoundingClientRect();
  game.basket.targetX = clamp(e.clientX - rect.left, game.basket.w / 2, game.W - game.basket.w / 2);
}
canvas.addEventListener("pointerdown", (e) => {
  if (!game.running) return;
  e.preventDefault();
  try { canvas.setPointerCapture(e.pointerId); } catch (_) {}
  pointerToBasket(e);
});
canvas.addEventListener("pointermove", (e) => {
  if (!game.running) return;
  pointerToBasket(e);
});
// Belt and braces for older iOS: stop the page from scrolling while dragging.
canvas.addEventListener("touchmove", (e) => { if (game.running) e.preventDefault(); }, { passive: false });

/* ---------- Input: keyboard ---------- */
const LEFT_KEYS = new Set(["ArrowLeft", "a", "A"]);
const RIGHT_KEYS = new Set(["ArrowRight", "d", "D"]);
window.addEventListener("keydown", (e) => {
  if (!game.running) return;
  if (LEFT_KEYS.has(e.key)) { game.keys.left = true; e.preventDefault(); }
  if (RIGHT_KEYS.has(e.key)) { game.keys.right = true; e.preventDefault(); }
});
window.addEventListener("keyup", (e) => {
  if (LEFT_KEYS.has(e.key)) game.keys.left = false;
  if (RIGHT_KEYS.has(e.key)) game.keys.right = false;
});
window.addEventListener("blur", () => { game.keys.left = game.keys.right = false; });

/* ==========================================================
   NOTE
   ========================================================== */
const envelopeWrap = $("#envelope-wrap");
const envelope = $("#envelope");
const letter = $("#letter");
const noteActions = $("#note-actions");
const hugMsg = $("#hug-msg");
let hugCount = 0;
let openTimer = 0;

function renderLetter() {
  $("#letter-greeting").textContent = PERSONAL_MESSAGE.greeting;
  const body = $("#letter-body");
  body.replaceChildren(
    ...PERSONAL_MESSAGE.paragraphs.map((t) => {
      const p = document.createElement("p");
      p.textContent = t;
      return p;
    })
  );
  $("#letter-closing").textContent = PERSONAL_MESSAGE.closing;
  $("#letter-signature").textContent = PERSONAL_MESSAGE.signature;
}
renderLetter();

function goToNote() {
  clearTimeout(openTimer);
  envelope.classList.remove("is-open");
  envelopeWrap.classList.remove("is-opening");
  envelopeWrap.hidden = false;
  letter.hidden = true;
  noteActions.hidden = true;
  hugMsg.textContent = "";
  showScreen("note", $("#btn-open-letter"));
}

function openLetter() {
  envelope.classList.add("is-open");
  envelopeWrap.classList.add("is-opening");
  const delay = prefersReducedMotion() ? 0 : 950;
  openTimer = setTimeout(() => {
    envelopeWrap.hidden = true;
    letter.hidden = false;
    noteActions.hidden = false;
    restartAnimation(letter, "is-entering");
    window.scrollTo({ top: 0, behavior: "auto" });
    $("#note-title").focus({ preventScroll: true });
    const r = letter.getBoundingClientRect();
    burstHearts(r.left + r.width / 2, Math.max(60, r.top + 40), 14);
  }, delay);
}

const HUG_LINES = [
  "Hug received! Redeemable in person, no expiry date.",
  "Another one? Approved. ♡",
  "Hug bank balance: growing nicely.",
  "Okay, you’re officially getting the long kind of hug next time.",
];
function acceptHug(e) {
  hugCount += 1;
  const line = hugCount <= HUG_LINES.length ? HUG_LINES[hugCount - 1] : `Hugs accepted: ${hugCount}. Still counting. ♡`;
  hugMsg.textContent = line;
  restartAnimation(hugMsg, "is-new");
  const r = e.currentTarget.getBoundingClientRect();
  burstHearts(r.left + r.width / 2, r.top + r.height / 2, 12);
}

/* ---------- Floating hearts (skipped with reduced motion) ---------- */
const burstLayer = $("#burst-layer");
function burstHearts(x, y, count) {
  if (prefersReducedMotion() || !burstLayer.animate) return;
  const colors = ["#ff5c93", "#ff3d7f", "#ffc6d9"];
  for (let i = 0; i < count; i++) {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    const use = document.createElementNS("http://www.w3.org/2000/svg", "use");
    use.setAttribute("href", "#heart");
    svg.appendChild(use);
    svg.style.left = `${x}px`;
    svg.style.top = `${y}px`;
    svg.style.color = colors[i % colors.length];
    burstLayer.appendChild(svg);
    const angle = rand(-Math.PI * 0.95, -Math.PI * 0.05);
    const dist = rand(60, 150);
    const dx = Math.cos(angle) * dist;
    const dy = Math.sin(angle) * dist;
    const scale = rand(0.6, 1.2);
    const rot = rand(-40, 40);
    svg
      .animate(
        [
          { transform: "translate(0,0) scale(.2)", opacity: 1 },
          { transform: `translate(${dx}px, ${dy}px) scale(${scale}) rotate(${rot}deg)`, opacity: 1, offset: 0.6 },
          { transform: `translate(${dx * 1.1}px, ${dy - 40}px) scale(${scale}) rotate(${rot}deg)`, opacity: 0 },
        ],
        { duration: rand(900, 1300), easing: "cubic-bezier(.2,.8,.3,1)" }
      )
      .finished.then(() => svg.remove(), () => svg.remove());
  }
}

/* ==========================================================
   Wiring
   ========================================================== */
$("#btn-celebrate").addEventListener("click", () => {
  game.running = false;
  cancelAnimationFrame(game.rafId);
  overlayIntro.hidden = false;
  overlayResults.hidden = true;
  showScreen("game", $("#btn-start"));
  resizeCanvas();
  resetGame();
  draw();
});
$("#btn-start").addEventListener("click", startGame);
$("#btn-replay").addEventListener("click", startGame);
$("#btn-to-note").addEventListener("click", goToNote);
$("#btn-open-letter").addEventListener("click", openLetter);
$("#btn-hug").addEventListener("click", acceptHug);
$("#btn-play-again").addEventListener("click", () => {
  clearTimeout(openTimer);
  showScreen("game", $("#game-title"));
  startGame();
});

// Canvas text uses Fraunces; redraw once fonts are ready.
if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => draw());
