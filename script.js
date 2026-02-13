/* =========================
   Theme switching
========================= */
document.querySelectorAll(".themeDot").forEach(btn => {
  btn.addEventListener("click", () => {
    const t = btn.getAttribute("data-theme");
    document.documentElement.setAttribute("data-theme", t);
  });
});

/* =========================
   Light/Dark switch (FIXED)
   - checked = DARK
   - unchecked = LIGHT
========================= */
const uiToggle = document.getElementById("uiToggle");

function syncUiCheckbox() {
  const ui = document.documentElement.getAttribute("data-ui") || "dark";
  if (uiToggle) uiToggle.checked = (ui === "dark");
}
syncUiCheckbox();

uiToggle?.addEventListener("change", () => {
  document.documentElement.setAttribute("data-ui", uiToggle.checked ? "dark" : "light");
});

/* =========================
   Hover spotlight cursor position (NEW)
========================= */
const hoverTargets = document.querySelectorAll(".hoverGlow");
hoverTargets.forEach(el => {
  el.addEventListener("mousemove", (e) => {
    const r = el.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 100;
    const y = ((e.clientY - r.top) / r.height) * 100;
    el.style.setProperty("--mx", `${x}%`);
    el.style.setProperty("--my", `${y}%`);
  });
});

/* =========================
   Scroll-to-top button
========================= */
const toTopBtn = document.getElementById("toTop");
function syncToTop(){
  if (!toTopBtn) return;
  toTopBtn.classList.toggle("show", window.scrollY > 500);
}
window.addEventListener("scroll", syncToTop, { passive: true });
syncToTop();
toTopBtn?.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

/* =========================
   Typing roles
========================= */
const roles = ["Cybersecurity Analyst","SOC Analyst","Red Hat Administration","Vulnerability Assessment"];
const roleEl = document.getElementById("rotatingRole");
let roleIndex = 0, charIndex = 0, deleting = false;

function typeRole() {
  if (!roleEl) return;
  const current = roles[roleIndex];

  if (!deleting) {
    roleEl.textContent = current.slice(0, charIndex + 1);
    charIndex++;
    if (charIndex === current.length) {
      deleting = true;
      setTimeout(typeRole, 900);
      return;
    }
    setTimeout(typeRole, 45);
  } else {
    roleEl.textContent = current.slice(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      setTimeout(typeRole, 220);
      return;
    }
    setTimeout(typeRole, 25);
  }
}
typeRole();

/* =========================
   Copy buttons
========================= */
document.querySelectorAll(".copyBtn").forEach(btn => {
  btn.addEventListener("click", async () => {
    const v = btn.getAttribute("data-copy") || "";
    try {
      await navigator.clipboard.writeText(v);
      const old = btn.textContent;
      btn.textContent = "Copied!";
      setTimeout(() => (btn.textContent = old), 900);
    } catch {}
  });
});

/* =========================
   Scroll spy (Header highlight FIX)
========================= */
const headerH = 76;
const navLinks = [...document.querySelectorAll(".navLink")];
const sections = navLinks
  .map(a => document.querySelector(a.getAttribute("href")))
  .filter(Boolean);

function setActiveLink(id){
  navLinks.forEach(a => {
    const match = a.getAttribute("href") === `#${id}`;
    a.classList.toggle("active", match);
  });
}

function onScrollSpy(){
  const scrollPos = window.scrollY + headerH + 140;
  let currentId = sections[0]?.id || "home";

  for (const sec of sections) {
    const top = sec.offsetTop;
    const bottom = top + sec.offsetHeight;
    if (scrollPos >= top && scrollPos < bottom) {
      currentId = sec.id;
      break;
    }
  }
  setActiveLink(currentId);
}
window.addEventListener("scroll", onScrollSpy, { passive: true });
window.addEventListener("resize", onScrollSpy);
onScrollSpy();

/* =========================
   HOME TERMINAL (Linux command navigation)
========================= */
const termBody = document.getElementById("termBody");
const termForm = document.getElementById("termForm");
const termInput = document.getElementById("termInput");

function termPrint(html) {
  if (!termBody) return;
  const div = document.createElement("div");
  div.className = "line";
  div.innerHTML = html;
  termBody.appendChild(div);
  termBody.scrollTop = termBody.scrollHeight;
}

const terminalHelp = `
<span class="out"><b>Commands:</b> help, about, education, projects, skills, experience, certifications, contact, open &lt;section&gt;, clear</span><br>
<span class="muted">Examples:</span> <span class="cmd">about</span>, <span class="cmd">open projects</span>, <span class="cmd">clear</span>
`;

const terminalData = {
  help: terminalHelp,
  about: `
<span class="out"><b>About</b></span><br>
<span class="out">• Cybersecurity M.S. student focused on practical labs and projects</span><br>
<span class="out">• OWASP Top 10 testing (DVWA), SIEM basics, and risk analysis</span><br>
<span class="muted">Tip:</span> <span class="cmd">open about</span> to scroll there
`,
  education: `
<span class="out"><b>Education</b></span><br>
<span class="out">• M.S. Cybersecurity — Yeshiva University, NYC, USA</span><br>
<span class="out">• B.Tech Mechanical Engineering — Hyderabad, India (2018–2021) • CGPA 3.9</span><br>
<span class="muted">Tip:</span> <span class="cmd">open education</span> to scroll there
`,
  projects: `
<span class="out"><b>Projects</b></span><br>
<span class="out">1) AI-Powered Cloud Security Posture & Deception Platform</span><br>
<span class="out">2) Web App Vulnerability Testing (DVWA)</span><br>
<span class="out">3) Forensics Toolkit / Log Analysis Lab</span><br>
<span class="muted">Tip:</span> <span class="cmd">open projects</span> to scroll there
`,
  skills: `
<span class="out"><b>Skills</b></span><br>
<span class="out">• Vulnerability Assessment • Security Risks • Detection Basics</span><br>
<span class="out">• SOC Lab • Log Triage • SIEM Basics</span><br>
<span class="out">• Wireshark • Nessus • Splunk • Linux • SQL</span><br>
<span class="out">• Python (basic automation) • Bash • TCP/IP • DNS</span><br>
<span class="muted">Tip:</span> <span class="cmd">open skills</span>
`,
  experience: `
<span class="out"><b>Experience</b></span><br>
<span class="out">SAP ABAP Consultant — Phoenix Business Consulting Pvt Ltd</span><br>
<span class="out">Aug 2022 – Sep 2024 • Hyderabad, India</span><br>
<span class="out">• DB Objects • Reports (ALV) • SmartForms/SAP Scripts</span><br>
<span class="muted">Tip:</span> <span class="cmd">open experience</span>
`,
  certifications: `
<span class="out"><b>Certifications</b></span><br>
<span class="out">• CompTIA Security+</span><br>
<span class="out">• Google Cybersecurity Professional Certificate (and modules)</span><br>
<span class="out">• SOC Lab Program • (ISC)² CC Specialization • More...</span><br>
<span class="muted">Tip:</span> <span class="cmd">open certifications</span>
`,
  contact: `
<span class="out"><b>Contact</b></span><br>
<span class="out">Email: saikumarvemula.us@gmail.com</span><br>
<span class="out">Phone: (551) 235-2122</span><br>
<span class="out">Location: New Jersey, USA</span><br>
<span class="muted">Tip:</span> <span class="cmd">open contact</span>
`
};

function scrollToSection(id){
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - headerH - 20;
  window.scrollTo({ top, behavior: "smooth" });
}

function handleCommand(raw){
  const cmd = raw.trim();
  if (!cmd) return;

  termPrint(`<span class="cmd">sai@portfolio:~$</span> <span class="out">${cmd}</span>`);

  if (cmd === "clear") {
    if (termBody) termBody.innerHTML = "";
    return;
  }

  if (cmd.startsWith("open ")) {
    const target = cmd.replace("open ", "").trim();
    if (terminalData[target]) {
      termPrint(`<span class="muted">Opening section:</span> <span class="cmd">${target}</span>`);
      scrollToSection(target);
    } else {
      termPrint(`<span class="out">Unknown section: <b>${target}</b>. Try: about/education/projects/skills/experience/certifications/contact</span>`);
    }
    return;
  }

  if (terminalData[cmd]) {
    termPrint(terminalData[cmd]);
    return;
  }

  termPrint(`<span class="out">Command not found: <b>${cmd}</b>. Type <span class="cmd">help</span>.</span>`);
}

function termBoot(){
  termPrint(`<span class="out">Welcome, Sai Kumar.</span> <span class="muted">Use terminal to preview sections.</span>`);
  termPrint(terminalHelp);
}
termBoot();

termForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  const v = termInput.value;
  termInput.value = "";
  handleCommand(v);
});

document.querySelectorAll(".suggestBtn").forEach(b => {
  b.addEventListener("click", () => {
    const cmd = b.getAttribute("data-cmd") || "";
    handleCommand(cmd);
    termInput?.focus();
  });
});

/* =========================
   Background animation (cursor makes it move more)
========================= */
const canvas = document.getElementById("fx");
const ctx = canvas.getContext("2d");
let W, H, DPR;

function resize() {
  DPR = Math.min(window.devicePixelRatio || 1, 2);
  W = canvas.width = Math.floor(window.innerWidth * DPR);
  H = canvas.height = Math.floor(window.innerHeight * DPR);
  canvas.style.width = window.innerWidth + "px";
  canvas.style.height = window.innerHeight + "px";
}
window.addEventListener("resize", resize);
resize();

function cssVar(name){
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}
function rand(min, max){ return Math.random() * (max - min) + min; }

const mouse = { x: W * 0.5, y: H * 0.5, active: false };
window.addEventListener("mousemove", (e) => {
  mouse.active = true;
  mouse.x = e.clientX * DPR;
  mouse.y = e.clientY * DPR;
});
window.addEventListener("mouseleave", () => (mouse.active = false));

const waves = [];
window.addEventListener("click", (e) => {
  waves.push({ x: e.clientX * DPR, y: e.clientY * DPR, r: 0, a: 0.55 });
});

const P = [];
const COUNT = Math.min(260, Math.floor((window.innerWidth * window.innerHeight) / 7600));
for (let i = 0; i < COUNT; i++) {
  P.push({
    x: rand(0, W),
    y: rand(0, H),
    vx: rand(-0.25, 0.25),
    vy: rand(-0.22, 0.22),
    r: rand(0.6, 2.0),
    a: rand(0.05, 0.30)
  });
}

let targetMode = 0;
let mode = 0;
const modeSections = [...document.querySelectorAll(".bgMode")];
const modeBySection = modeSections.map(s => ({
  el: s,
  mode: parseInt(s.getAttribute("data-bgmode") || "0", 10)
}));

function updateMode() {
  const mid = window.innerHeight * 0.55;
  let best = { mode: 0, dist: 1e9 };
  for (const s of modeBySection) {
    const r = s.el.getBoundingClientRect();
    const center = r.top + r.height / 2;
    const d = Math.abs(center - mid);
    if (d < best.dist) best = { mode: s.mode, dist: d };
  }
  targetMode = best.mode;
}
window.addEventListener("scroll", updateMode, { passive: true });
updateMode();

let lastScrollY = window.scrollY;
let scrollImpulse = 0;
window.addEventListener("scroll", () => {
  const y = window.scrollY;
  const dy = y - lastScrollY;
  lastScrollY = y;
  scrollImpulse += dy * 0.22;
}, { passive: true });

function drawWaves() {
  const accent = cssVar("--accent") || "rgba(0,255,170,0.95)";
  for (let i = waves.length - 1; i >= 0; i--) {
    const w = waves[i];
    w.r += 22 * DPR;
    w.a *= 0.92;

    ctx.beginPath();
    const stroke = accent.includes("rgba")
      ? accent.replace(/0\.\d+\)/, `${w.a})`)
      : accent;
    ctx.strokeStyle = stroke;
    ctx.lineWidth = 2 * DPR;
    ctx.arc(w.x, w.y, w.r, 0, Math.PI * 2);
    ctx.stroke();

    if (w.a < 0.02) waves.splice(i, 1);
  }
}

const rainCols = [];
function initRain() {
  rainCols.length = 0;
  const cols = Math.floor(W / (14 * DPR));
  for (let i = 0; i < cols; i++) {
    rainCols.push({ x: i * (14 * DPR), y: rand(-H, 0), v: rand(1.2, 3.0) * DPR });
  }
}
initRain();
window.addEventListener("resize", initRain);

function drawMatrixRain(mode, accent, driftY) {
  ctx.save();
  ctx.globalAlpha = 0.08 + (mode - 3.6) * 0.03;
  ctx.fillStyle = accent;
  ctx.font = `${14 * DPR}px "Share Tech Mono", monospace`;

  for (const c of rainCols) {
    c.y += c.v + driftY * 0.35 + (mouse.active ? 0.9 * DPR : 0);
    const ch = String.fromCharCode(0x30A0 + Math.floor(rand(0, 96)));
    ctx.fillText(ch, c.x, c.y);
    if (c.y > H + 40 * DPR) c.y = rand(-H * 0.2, 0);
    if (c.y < -80 * DPR) c.y = H + rand(0, 120 * DPR);
  }
  ctx.restore();
}

function drawScanLines(accent2, t, driftY) {
  ctx.save();
  ctx.globalAlpha = 0.07;
  ctx.strokeStyle = accent2;
  ctx.lineWidth = 1 * DPR;
  const step = 26 * DPR;
  const offset = ((t * 120 * DPR) + driftY * 0.7 + (mouse.active ? (mouse.y * 0.02) : 0)) % step;

  for (let y = -H; y < H * 2; y += step) {
    ctx.beginPath();
    ctx.moveTo(-W * 0.2, y + offset);
    ctx.lineTo(W * 1.2, y + offset + W * 0.25);
    ctx.stroke();
  }
  ctx.restore();
}

function drawRadar(accent, t, driftY) {
  const x = W * 0.78;
  const y = H * 0.28 + driftY * 0.15 + (mouse.active ? (mouse.y - H*0.5) * 0.02 : 0);
  const baseR = 40 * DPR;

  ctx.save();
  ctx.globalAlpha = 0.12;
  ctx.strokeStyle = accent;
  ctx.lineWidth = 1.2 * DPR;

  for (let i = 1; i <= 4; i++) {
    const r = baseR * i + (Math.sin(t * 2 + i) * 6 * DPR);
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.stroke();
  }

  ctx.globalAlpha = 0.18;
  const ang = (t * (mouse.active ? 2.4 : 1.8)) % (Math.PI * 2);
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + Math.cos(ang) * baseR * 5.2, y + Math.sin(ang) * baseR * 5.2);
  ctx.stroke();
  ctx.restore();
}

function drawParticles(mode, accent, driftY) {
  ctx.save();
  const baseSpd = 1 + mode * 0.25;
  const spd = baseSpd * (mouse.active ? 1.55 : 1.0); /* ✅ cursor makes animation move more */
  const linkDist = (110 + mode * 20) * DPR;
  const scrollDrift = driftY * 0.18;

  const mouseDriftX = mouse.active ? (mouse.x - W * 0.5) * 0.00015 : 0;
  const mouseDriftY = mouse.active ? (mouse.y - H * 0.5) * 0.00012 : 0;

  for (const p of P) {
    p.x += (p.vx + mouseDriftX) * spd;
    p.y += (p.vy + mouseDriftY) * spd + scrollDrift;

    if (p.x < -20) p.x = W + 20;
    if (p.x > W + 20) p.x = -20;
    if (p.y < -20) p.y = H + 20;
    if (p.y > H + 20) p.y = -20;

    if (mouse.active) {
      const dx = mouse.x - p.x;
      const dy = mouse.y - p.y;
      const d = Math.hypot(dx, dy);
      if (d < 260 * DPR) {
        p.x -= dx * 0.0015;   /* stronger interaction */
        p.y -= dy * 0.0015;
      }
    }
  }

  ctx.strokeStyle = accent;
  ctx.lineWidth = 1 * DPR;

  for (let i = 0; i < P.length; i++) {
    const a = P[i];
    for (let j = i + 1; j < P.length; j++) {
      const b = P[j];
      const d = Math.hypot(a.x - b.x, a.y - b.y);
      if (d < linkDist) {
        ctx.globalAlpha = (1 - d / linkDist) * 0.35;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
    }
  }

  for (const p of P) {
    ctx.globalAlpha = p.a;
    ctx.fillStyle = accent;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r * DPR, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.restore();
}

let t = 0;
function draw(){
  const accent = cssVar("--accent") || "rgba(0,255,170,0.95)";
  const accent2 = cssVar("--accent2") || "rgba(83,243,255,0.85)";
  const fxFade = cssVar("--fxFade") || "rgba(0,0,0,0.18)";

  mode += (targetMode - mode) * 0.04;
  t += 0.015;

  scrollImpulse *= 0.86;
  const driftY = scrollImpulse * DPR;

  ctx.fillStyle = fxFade;
  ctx.fillRect(0, 0, W, H);

  const glow = ctx.createRadialGradient(W*0.5, H*0.58, 0, W*0.5, H*0.58, Math.max(W,H)*0.8);
  glow.addColorStop(0, "rgba(255,255,255,0.035)");
  glow.addColorStop(1, "rgba(0,0,0,0)");
  ctx.globalAlpha = 1;
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, W, H);

  if (mode > 1.6 && mode < 3.4) drawScanLines(accent2, t, driftY);
  if (mode > 2.5 && mode < 4.6) drawRadar(accent, t, driftY);
  if (mode > 3.6) drawMatrixRain(mode, accent, driftY);

  drawParticles(mode, accent, driftY);
  drawWaves();

  requestAnimationFrame(draw);
}
requestAnimationFrame(draw);

/* Year in footer */
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();
