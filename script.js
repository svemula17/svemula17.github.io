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
const roles = ["Cybersecurity Analyst", "SOC Analyst", "Cloud Security Builder", "Threat Detection", "Vulnerability Management"];
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
<span class="out"><b>Commands:</b> help, about, experience, skills, projects, certifications, contact, open &lt;section&gt;, clear</span><br>
<span class="muted">Try:</span> <span class="cmd">experience</span>, <span class="cmd">projects</span>, <span class="cmd">open contact</span>
`;

const terminalData = {
  help: terminalHelp,
  about: `
<span class="out"><b>About</b></span><br>
<span class="out">Security analyst with 4+ years across SOC, engineering, IT support, and cloud/security labs.</span><br>
<span class="muted">Tip:</span> <span class="cmd">open about</span>
`,
  experience: `
<span class="out"><b>Experience</b></span><br>
<span class="out">1. Deloitte - Cybersecurity Analyst L1</span><br>
<span class="out">2. Phoenix Business Consulting - Cybersecurity Engineer</span><br>
<span class="out">3. Siddhartha Heavy Equipment - IT Support Technician</span><br>
<span class="out">4. Yeshiva University - Student Assistant, IT Department</span><br>
<span class="muted">Tip:</span> <span class="cmd">open experience</span>
`,
  skills: `
<span class="out"><b>Skills</b></span><br>
<span class="out">SOC: Splunk, alert triage, incident response, threat hunting</span><br>
<span class="out">Risk: Nessus, Qualys, Nmap, patching, remediation tracking</span><br>
<span class="out">Build: AWS, Python, Linux, Bash, SQL, Java</span><br>
<span class="muted">Tip:</span> <span class="cmd">open skills</span>
`,
  projects: `
<span class="out"><b>Projects</b></span><br>
<span class="out">Smart SIEM Risk Engine, AI Cloud Posture Platform, DVWA Testing Lab, Attack Identification Tool, AWS AI systems.</span><br>
<span class="muted">Tip:</span> <span class="cmd">open projects</span>
`,
  certifications: `
<span class="out"><b>Certifications</b></span><br>
<span class="out">CompTIA Security+, Google Cybersecurity, SOC Lab, Red Hat RH124, ISC2/Coursera, and Google security modules.</span><br>
<span class="muted">Tip:</span> <span class="cmd">open certifications</span>
`,
  contact: `
<span class="out"><b>Contact</b></span><br>
<span class="out">Email: saikumarvemula.us@gmail.com</span><br>
<span class="out">GitHub: github.com/svemula17</span><br>
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
      termPrint(`<span class="out">Unknown section: <b>${target}</b>. Try: about/projects/skills/experience/certifications/contact</span>`);
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

let lastW = 0;
let lastH = 0;
function resize() {
  const newW = window.innerWidth;
  const newH = window.innerHeight;
  // Ignore minor height changes (e.g. mobile address bar) to prevent animation jumping
  if (lastW === newW && Math.abs(lastH - newH) < 100) return;
  
  lastW = newW;
  lastH = newH;
  
  DPR = Math.min(window.devicePixelRatio || 1, 2);
  W = canvas.width = Math.floor(newW * DPR);
  H = canvas.height = Math.floor(newH * DPR);
  canvas.style.width = newW + "px";
  canvas.style.height = newH + "px";
}
let resizeTimeout;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(resize, 200);
});
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
const COUNT = Math.min(80, Math.floor((window.innerWidth * window.innerHeight) / 20000));
for (let i = 0; i < COUNT; i++) {
  P.push({
    x: rand(0, W),
    y: rand(0, H),
    vx: rand(-0.15, 0.15),
    vy: rand(-0.15, 0.15),
    r: rand(0.6, 2.0),
    a: rand(0.05, 0.20)
  });
}

let mode = 0;
// Target mode removed to persist home animation style across the website
// window.addEventListener("scroll", updateMode, { passive: true });

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
  const baseSpd = 0.5 + mode * 0.15;
  const spd = baseSpd * (mouse.active ? 1.2 : 1.0); /* ✅ cursor makes animation move more */
  const linkDist = (80 + mode * 10) * DPR;
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



/* =========================
   Scroll-driven project slider
========================= */
const projectScroller = document.getElementById("projectScroller");
const projectSlideTrack = document.getElementById("projectSlideTrack");
const projectDots = [...document.querySelectorAll(".projectDot")];
const projectSlides = [...document.querySelectorAll(".projectSlide")];
const aboutStoryScroller = document.getElementById("aboutStoryScroller");
const aboutStoryTrack = document.getElementById("aboutStoryTrack");
const aboutDots = [...document.querySelectorAll(".aboutDot")];
const aboutSlides = [...document.querySelectorAll(".aboutPanelSlide")];

function setProjectSlide(index) {
  if (!projectSlideTrack || !projectSlides.length) return;
  const safeIndex = Math.max(0, Math.min(index, projectSlides.length - 1));
  projectSlideTrack.style.transform = `translateX(-${safeIndex * 100}%)`;
  projectSlides.forEach((slide, i) => slide.classList.toggle("is-active", i === safeIndex));
  projectDots.forEach((dot, i) => dot.classList.toggle("is-active", i === safeIndex));
}

function syncProjectSlider() {
  if (!projectScroller || !projectSlides.length || window.innerWidth <= 860) return;
  const rect = projectScroller.getBoundingClientRect();
  const scrollable = projectScroller.offsetHeight - window.innerHeight;
  const progress = Math.max(0, Math.min(1, -rect.top / Math.max(scrollable, 1)));
  setProjectSlide(Math.round(progress * (projectSlides.length - 1)));
}

window.addEventListener("scroll", syncProjectSlider, { passive: true });
window.addEventListener("resize", syncProjectSlider);
projectDots.forEach(dot => {
  dot.addEventListener("click", () => {
    const index = Number(dot.dataset.slide || 0);
    if (!projectScroller || !projectSlides.length) return;
    const scrollable = projectScroller.offsetHeight - window.innerHeight;
    const top = projectScroller.offsetTop + (scrollable * (index / Math.max(projectSlides.length - 1, 1)));
    window.scrollTo({ top, behavior: "smooth" });
  });
});
syncProjectSlider();

function setAboutSlide(index) {
  if (!aboutStoryTrack || !aboutSlides.length) return;
  const safeIndex = Math.max(0, Math.min(index, aboutSlides.length - 1));
  aboutStoryTrack.style.transform = `translateX(-${safeIndex * 100}%)`;
  aboutSlides.forEach((slide, i) => slide.classList.toggle("is-active", i === safeIndex));
  aboutDots.forEach((dot, i) => dot.classList.toggle("is-active", i === safeIndex));
}

function syncAboutSlider() {
  if (!aboutStoryScroller || !aboutSlides.length || window.innerWidth <= 860) return;
  const rect = aboutStoryScroller.getBoundingClientRect();
  const scrollable = Math.max(aboutStoryScroller.offsetHeight - window.innerHeight, 1);
  const progress = Math.max(0, Math.min(1, -rect.top / scrollable));
  setAboutSlide(Math.round(progress * (aboutSlides.length - 1)));
}

window.addEventListener("scroll", syncAboutSlider, { passive: true });
window.addEventListener("resize", syncAboutSlider);
aboutDots.forEach(dot => {
  dot.addEventListener("click", () => {
    const index = Number(dot.dataset.aboutSlide || 0);
    if (!aboutStoryScroller || !aboutSlides.length) return;
    const scrollable = Math.max(aboutStoryScroller.offsetHeight - window.innerHeight, 1);
    const top = aboutStoryScroller.offsetTop + (scrollable * (index / Math.max(aboutSlides.length - 1, 1)));
    window.scrollTo({ top, behavior: "smooth" });
  });
});
syncAboutSlider();

const musicFrame = document.getElementById("musicFrame");
const musicNowPlaying = document.getElementById("musicNowPlaying");
const musicPrev = document.getElementById("musicPrev");
const musicNext = document.getElementById("musicNext");
const songItems = [...document.querySelectorAll(".songItem")];
let currentSongIndex = 0;

function updateMusicPlayer(index) {
  if (!musicFrame || !songItems.length) return;
  currentSongIndex = (index + songItems.length) % songItems.length;
  const activeSong = songItems[currentSongIndex];
  const youtubeId = activeSong.dataset.youtube;
  const title = activeSong.dataset.title || activeSong.textContent.trim();
  musicFrame.src = `https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`;
  if (musicNowPlaying) musicNowPlaying.textContent = title;
  songItems.forEach((item, i) => item.classList.toggle("is-active", i === currentSongIndex));
}

songItems.forEach((item, index) => {
  item.addEventListener("click", () => updateMusicPlayer(index));
});

musicPrev?.addEventListener("click", () => updateMusicPlayer(currentSongIndex - 1));
musicNext?.addEventListener("click", () => updateMusicPlayer(currentSongIndex + 1));



/* =========================
   Scroll reveal polish
========================= */
const revealTargets = document.querySelectorAll(".premiumSection, .statCard, .experienceCard, .skillBlock, .certRow, .contactBand, .eduMiniCard, .projectSlide, .aboutPanelSlide, .socVisual, .projectShot, .roleTargetNote");
revealTargets.forEach((el, index) => {
  el.classList.add("revealUp");
  el.style.setProperty("--reveal-delay", `${Math.min(index % 6, 5) * 55}ms`);
  if (index % 3 === 1) el.classList.add("fx-left");
  if (index % 3 === 2) el.classList.add("fx-right");
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("in-view");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

revealTargets.forEach(el => revealObserver.observe(el));



/* =========================
   Project case-study modal
========================= */
const caseStudies = {
  siem: {
    title: "Smart SIEM Risk Engine",
    problem: "SOC teams face alert fatigue when high-volume IDS and network logs are not normalized, scored, or prioritized for analyst action.",
    built: "A Python/FastAPI pipeline that validates raw alerts, normalizes fields, scores risk, maps MITRE ATT&CK techniques, triggers playbook-style responses, and streams updates to a WebSocket dashboard.",
    tools: "Python, FastAPI, WebSockets, SQLite, Pydantic, Chart.js, Jinja2, MITRE ATT&CK, Suricata/Zeek-style datasets.",
    outcome: "A stronger analyst workflow with risk bands, active blocked-IP state, live threat feeds, hunting queries, and clearer escalation context.",
    link: "https://github.com/svemula17/smart-siem-risk-engine"
  },
  cloud: {
    title: "AI Cloud Posture Platform",
    problem: "Cloud misconfigurations and exposed services are easier to understand when defenders can observe how attackers discover and interact with risky assets.",
    built: "A controlled cloud security and deception lab that deploys intentionally monitored cloud assets to convert attacker curiosity into defensive intelligence.",
    tools: "AWS, cloud security posture concepts, deception services, alerting, defensive research workflow.",
    outcome: "A practical cloud security lab showing attacker behavior patterns and how deception can support detection strategy.",
    link: "https://github.com/saivarmadpr/Cloud_Security_Posture_-_Deception_Platform"
  },
  dvwa: {
    title: "DVWA Vulnerability Testing Lab",
    problem: "Defenders need hands-on familiarity with common web attack paths to validate controls and write better remediation guidance.",
    built: "A DVWA lab workflow for testing SQL injection, XSS, CSRF, and related OWASP Top 10 issues with documented attack steps and remediation notes.",
    tools: "DVWA, Burp Suite, browser tooling, OWASP Top 10 testing methodology.",
    outcome: "Improved offensive-security understanding that translates directly into clearer defensive recommendations.",
    link: "https://github.com/svemula17"
  },
  attack: {
    title: "Attack Identification Tool",
    problem: "Analysts need clearer ways to turn indicators and observed behavior into attack classifications they can investigate.",
    built: "A security-analysis tooling concept focused on organizing attack signals into cleaner classifications and analyst-friendly output.",
    tools: "Python, detection logic, classification workflow, security analysis documentation.",
    outcome: "A portfolio-ready detection support concept that complements SOC triage and investigation workflows.",
    link: "https://github.com/svemula17/attack_identification_tool"
  },
  image: {
    title: "AWS Image AI Tagging",
    problem: "Uploaded image assets become difficult to organize and search without useful metadata extraction.",
    built: "A cloud-native image workflow using upload, tagging, and searchable metadata patterns for asset organization.",
    tools: "AWS storage patterns, metadata tagging, serverless workflow concepts.",
    outcome: "A clearer pattern for searchable cloud-hosted media assets and automated metadata enrichment.",
    link: "https://github.com/PeterMangoro/cloudComputingDiscussion1"
  },
  sentiment: {
    title: "AWS Sentiment Analysis System",
    problem: "Fintech teams receive large volumes of feedback that are slow to manually review, especially when negative sentiment needs fast attention.",
    built: "A serverless AWS system that processes CSV/JSON/TXT feedback through Lambda, stores results in DynamoDB, displays trends in a Nuxt/Vue dashboard, and sends SNS alerts.",
    tools: "AWS S3, Lambda, DynamoDB, API Gateway, SNS, CloudWatch, Nuxt/Vue, Chart.js, Tailwind CSS.",
    outcome: "A free-tier optimized platform with real-time insights, exportable results, negative sentiment alerts, and documented cost savings versus paid alternatives.",
    link: "https://github.com/PeterMangoro/cloudComputingDiscussion1"
  }
};

const caseModal = document.getElementById("caseModal");
const caseTitle = document.getElementById("caseModalTitle");
const caseProblem = document.getElementById("caseProblem");
const caseBuilt = document.getElementById("caseBuilt");
const caseTools = document.getElementById("caseTools");
const caseOutcome = document.getElementById("caseOutcome");
const caseLink = document.getElementById("caseLink");
let lastCaseTrigger = null;

function openCaseStudy(key, trigger) {
  const data = caseStudies[key];
  if (!caseModal || !data) return;
  lastCaseTrigger = trigger || null;
  caseTitle.textContent = data.title;
  caseProblem.textContent = data.problem;
  caseBuilt.textContent = data.built;
  caseTools.textContent = data.tools;
  caseOutcome.textContent = data.outcome;
  caseLink.href = data.link;
  caseModal.classList.add("open");
  caseModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("case-modal-open");
}

function closeCaseStudy() {
  if (!caseModal) return;
  caseModal.classList.remove("open");
  caseModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("case-modal-open");
  lastCaseTrigger?.focus?.();
}

document.querySelectorAll(".caseStudyBtn").forEach(btn => {
  btn.addEventListener("click", () => openCaseStudy(btn.dataset.case, btn));
});
document.querySelectorAll("[data-close-case]").forEach(btn => btn.addEventListener("click", closeCaseStudy));
window.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && caseModal?.classList.contains("open")) closeCaseStudy();
});

/* Year in footer */
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();


/* =========================
   Premium interaction polish
========================= */
const railFill = document.getElementById("railFill");
const railLinks = [...document.querySelectorAll("[data-rail]")];
function syncProgressRail() {
  const doc = document.documentElement;
  const max = Math.max(doc.scrollHeight - window.innerHeight, 1);
  const pct = Math.max(0, Math.min(1, window.scrollY / max));
  if (railFill) railFill.style.height = `${pct * 100}%`;
  const active = document.querySelector(".navLink.active")?.getAttribute("href")?.replace("#", "");
  railLinks.forEach(link => link.classList.toggle("active", link.dataset.rail === active));
}
window.addEventListener("scroll", syncProgressRail, { passive: true });
window.addEventListener("resize", syncProgressRail);
syncProgressRail();

document.querySelectorAll(".experienceCard").forEach((card, index) => {
  const toggle = card.querySelector(".experienceToggle");
  if (!toggle) return;
  const setOpen = (open) => {
    card.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.textContent = open ? "Hide details" : "Tap to view details";
  };
  if (index === 0 && window.innerWidth <= 860) setOpen(true);
  toggle.addEventListener("click", () => {
    const next = !card.classList.contains("is-open");
    document.querySelectorAll(".experienceCard.is-open").forEach(openCard => {
      if (openCard !== card) {
        openCard.classList.remove("is-open");
        const openToggle = openCard.querySelector(".experienceToggle");
        openToggle?.setAttribute("aria-expanded", "false");
        if (openToggle) openToggle.textContent = "Tap to view details";
      }
    });
    setOpen(next);
  });
});

const certToggle = document.getElementById("certToggle");
const certMore = document.getElementById("certMore");
certToggle?.addEventListener("click", () => {
  if (!certMore) return;
  const shouldOpen = certMore.hasAttribute("hidden");
  certMore.toggleAttribute("hidden", !shouldOpen);
  certToggle.setAttribute("aria-expanded", String(shouldOpen));
  certToggle.textContent = shouldOpen ? "Show fewer certifications" : "View all certifications";
});
