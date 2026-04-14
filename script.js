/* ============================================================
   MÉLINA SABATIER — script.js
   ============================================================ */

(function () {
  "use strict";

  const feed         = document.getElementById("projects-feed");
  const filters      = document.querySelectorAll(".nav-filter");
  const projects     = document.querySelectorAll(".project");
  const contactBtn   = document.getElementById("contact-toggle");
  const overlay      = document.getElementById("contact-overlay");
  const overlayClose = document.getElementById("overlay-close");

  const barName      = document.getElementById("bar-name");
  const barCategory  = document.getElementById("bar-category");
  const barSpec      = document.getElementById("bar-spec");
  const barDate      = document.getElementById("bar-date");

  /* ── 1. FILTER ───────────────────────────────────────────── */
  filters.forEach((btn) => {
    btn.addEventListener("click", () => {
      filters.forEach((f) => f.classList.remove("active"));
      btn.classList.add("active");
      const chosen = btn.dataset.filter;
      projects.forEach((p) => {
        p.classList.toggle("hidden", chosen !== "all" && p.dataset.category !== chosen);
      });
      const first = [...projects].find((p) => !p.classList.contains("hidden"));
      if (first) { feed.scrollTo({ top: first.offsetTop, behavior: "instant" }); updateBar(first); }
      else resetBar();
    });
  });

  /* ── 2. CONTACT OVERLAY ──────────────────────────────────── */
  contactBtn.addEventListener("click", () => overlay.classList.toggle("open"));
  overlayClose.addEventListener("click", () => overlay.classList.remove("open"));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") overlay.classList.remove("open"); });

  /* ── 3. CAROUSEL — images + vidéos ──────────────────────── */
  projects.forEach((project) => {
    const wrap  = project.querySelector(".project-image-wrap");
    const items = [...wrap.querySelectorAll("img, video")];
    const total = items.length;
    let current = 0;

    // Initialise TOUS les projets — même ceux avec 1 seul élément
    items.forEach((el, i) => {
      if (i === 0) {
        el.classList.add("active");
        if (el.tagName === "VIDEO") el.play().catch(() => {});
      } else {
        el.classList.remove("active");
        if (el.tagName === "VIDEO") { el.pause(); el.currentTime = 0; }
      }
    });

    // Carousel seulement si plusieurs éléments
    if (total <= 1) return;

    wrap.style.cursor = "pointer";
    wrap.addEventListener("click", () => {
      const prev = items[current];
      prev.classList.remove("active");
      if (prev.tagName === "VIDEO") { prev.pause(); prev.currentTime = 0; }
      current = (current + 1) % total;
      const next = items[current];
      next.classList.add("active");
      if (next.tagName === "VIDEO") next.play().catch(() => {});
    });

    wrap.setAttribute("tabindex", "0");
    wrap.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); wrap.click(); }
    });
  });

  /* ── 4. BOTTOM BAR ───────────────────────────────────────── */
  function resetBar() { barName.textContent = "—"; barCategory.textContent = "—"; barSpec.textContent = "—"; barDate.textContent = "—"; }

  function updateBar(project) {
    const meta = project.querySelector(".project-meta");
    if (!meta) return;
    barName.textContent     = meta.querySelector(".meta-name").textContent;
    barCategory.textContent = meta.querySelector(".meta-category").textContent;
    barSpec.textContent     = meta.querySelector(".meta-spec").textContent;
    barDate.textContent     = meta.querySelector(".meta-date").textContent;
  }

  function findCurrentProject() {
    const mid = feed.scrollTop + feed.clientHeight / 2;
    let found = null;
    projects.forEach((p) => {
      if (p.classList.contains("hidden")) return;
      if (mid >= p.offsetTop && mid < p.offsetTop + p.offsetHeight) found = p;
    });
    return found;
  }

  function onSettle() { const p = findCurrentProject(); p ? updateBar(p) : resetBar(); }

  if ("onscrollend" in window) {
    feed.addEventListener("scrollend", onSettle, { passive: true });
  } else {
    let t;
    feed.addEventListener("scroll", () => { clearTimeout(t); t = setTimeout(onSettle, 120); }, { passive: true });
  }

  onSettle();
})();
