/* ==========================================================
   Shared site behaviour: nav, project grid, filters, reveal
   ========================================================== */

// Mobile nav toggle
const toggle = document.querySelector(".nav-toggle");
const links = document.querySelector(".nav-links");
if (toggle && links) {
  toggle.addEventListener("click", () => {
    const open = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open);
  });
  links.querySelectorAll("a").forEach(a => a.addEventListener("click", () => links.classList.remove("open")));
}

// Footer year
document.querySelectorAll("[data-year]").forEach(el => (el.textContent = new Date().getFullYear()));

// Reveal observer is declared up-front so renderProjects() can use it
let io;

// Project grid + filters (home page only)
const grid = document.getElementById("projects-grid");
const filterBar = document.getElementById("project-filters");

function cardHTML(p, i) {
  const num = String(i + 1).padStart(2, "0");
  const thumb = p.thumb
    ? `<img src="${p.thumb}" alt="${p.title} dashboard preview" loading="lazy">`
    : projectThumbSVG(p, i);
  const tools = p.tools.map(t => `<span class="tag mono">${t}</span>`).join("");
  return `
    <a class="project-card reveal" href="project.html?p=${p.slug}" data-domain="${p.domain}">
      <div class="pc-thumb">${thumb}<span class="pc-num">${num}</span></div>
      <div class="pc-body">
        <span class="pc-domain">${p.domain}</span>
        <h3>${p.title}</h3>
        <p>${p.summary}</p>
        <div class="pc-tools">${tools}</div>
        <span class="pc-link">View case study →</span>
      </div>
    </a>`;
}

function renderProjects(domain = "All") {
  if (!grid) return;
  const list = LIVE_PROJECTS.map((p, i) => ({ p, i })).filter(({ p }) => domain === "All" || p.domain === domain);
  grid.innerHTML = list.map(({ p, i }) => cardHTML(p, i)).join("");
  observeReveal();
}

if (grid && filterBar) {
  const domains = ["All", ...new Set(LIVE_PROJECTS.map(p => p.domain))];
  filterBar.innerHTML = domains
    .map(d => `<button class="filter-btn${d === "All" ? " active" : ""}" data-domain="${d}">${d}</button>`)
    .join("");
  filterBar.addEventListener("click", e => {
    const btn = e.target.closest(".filter-btn");
    if (!btn) return;
    filterBar.querySelectorAll(".filter-btn").forEach(b => b.classList.toggle("active", b === btn));
    renderProjects(btn.dataset.domain);
  });
  renderProjects();
}

// Reveal-on-scroll
function observeReveal() {
  const els = document.querySelectorAll(".reveal:not(.in)");
  if (!("IntersectionObserver" in window)) { els.forEach(el => el.classList.add("in")); return; }
  io = io || new IntersectionObserver(entries => {
    entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
  }, { threshold: 0.08 });
  els.forEach(el => io.observe(el));
}
observeReveal();
