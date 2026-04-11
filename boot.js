window.addEventListener("DOMContentLoaded", () => {
  const boot = document.getElementById("boot");
  const site = document.getElementById("site");
  const bootText = document.getElementById("bootText");
  const bootBarFill = document.getElementById("bootBarFill");
  const bootPct = document.getElementById("bootPct");
  const bootStatus = document.getElementById("bootStatus");

  if (!boot || !site || !bootText || !bootBarFill || !bootPct || !bootStatus) {
    if (boot) boot.classList.add("hidden");
    if (site) site.classList.remove("hidden");
    return;
  }

  const lines = [
    ">> Initializing secure portfolio shell...",
    ">> Loading navigation, themes, and visual layers...",
    ">> Mounting cybersecurity profile workspace...",
    ">> Syncing certifications, projects, and experience modules...",
    ">> Verifying local assets and portfolio references...",
    ">> Preparing SOC, cloud security, and detection highlights...",
    ">> Wiring live case studies and interactive sections...",
    ">> Building recruiter-ready portfolio surfaces...",
    ">> Activating terminal preview and final motion pass...",
    ">> Running presentation hardening checks...",
    ">> Portfolio ready."
  ];

  let i = 0;
  let pct = 0;
  let done = false;

  function finishBoot() {
    boot.classList.add("hidden");
    site.classList.remove("hidden");
    boot.style.pointerEvents = "none";
    boot.style.opacity = "0";
    document.body.style.overflowY = "auto";
  }

  function step() {
    if (done) return;

    if (i < lines.length) {
      bootText.textContent += lines[i] + "\n";
      bootText.scrollTop = bootText.scrollHeight;
      i++;
    }

    pct = Math.min(100, pct + Math.floor(Math.random() * 7) + 5);
    bootBarFill.style.width = pct + "%";
    bootPct.textContent = pct + "%";
    bootStatus.textContent = lines[Math.min(lines.length - 1, i - 1)] || "Initializing...";

    if (pct >= 100) {
      done = true;
      setTimeout(finishBoot, 160);
      return;
    }

    setTimeout(step, 120);
  }

  document.body.style.overflow = "hidden";
  step();

  window.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !done) {
      done = true;
      bootBarFill.style.width = "100%";
      bootPct.textContent = "100%";
      bootStatus.textContent = "System check complete.";
      setTimeout(finishBoot, 120);
    }
  });
});
