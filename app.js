(() => {
  "use strict";
  const data = window.CV_DATA || {};
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const panel = $("#panel");
  const backdrop = $("#panel-backdrop");
  const content = $("#panel-content");
  const title = $("#panel-title");
  const kicker = $("#panel-kicker");

  const escapeHTML = value => String(value ?? "").replace(/[&<>'"]/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"}[char]));
  const tags = values => `<div class="tags">${(values || []).map(value => `<span>${escapeHTML(value)}</span>`).join("")}</div>`;
  const cards = values => `<div class="cards">${(values || []).map(item => `<article class="content-card"><small>${escapeHTML(item.meta)}</small><h3>${escapeHTML(item.title)}</h3>${item.subtitle ? `<h4>${escapeHTML(item.subtitle)}</h4>` : ""}<p>${escapeHTML(item.text)}</p>${item.tags ? tags(item.tags) : ""}</article>`).join("")}</div>`;

  function render(section) {
    const item = data[section];
    if (!item) return;
    kicker.textContent = item.kicker || "";
    title.textContent = item.title || "";
    if (item.html) content.innerHTML = item.html;
    else if (item.items) content.innerHTML = cards(item.items);
    else if (item.groups) content.innerHTML = item.groups.map(group => `<section class="skill-group"><h3>${escapeHTML(group.title)}</h3>${tags(group.tags)}</section>`).join("");
    else if (item.tags) content.innerHTML = tags(item.tags);
    panel.classList.add("open");
    backdrop.classList.add("open");
    panel.setAttribute("aria-hidden", "false");
    document.body.classList.add("panel-open");
    history.replaceState(null, "", `#${section}`);
    setTimeout(() => $("#close-panel")?.focus(), 50);
  }

  function closePanel() {
    panel.classList.remove("open");
    backdrop.classList.remove("open");
    panel.setAttribute("aria-hidden", "true");
    document.body.classList.remove("panel-open");
    history.replaceState(null, "", location.pathname);
  }

  $$('[data-section]').forEach(button => button.addEventListener("click", () => render(button.dataset.section)));
  $("#close-panel").addEventListener("click", closePanel);
  backdrop.addEventListener("click", closePanel);
  addEventListener("keydown", event => { if (event.key === "Escape") { closePanel(); $("#help").hidden = true; } });

  const help = $("#help");
  $("#help-button").addEventListener("click", () => { help.hidden = false; });
  $("#close-help").addEventListener("click", () => { help.hidden = true; });
  help.addEventListener("click", event => { if (event.target === help) help.hidden = true; });

  const initial = location.hash.slice(1);
  if (data[initial]) render(initial);
  $("#year").textContent = new Date().getFullYear();

  const canvas = $("#stars");
  const ctx = canvas.getContext("2d");
  let stars = [];
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  function resize() {
    const dpr = Math.min(devicePixelRatio || 1, 2);
    canvas.width = innerWidth * dpr; canvas.height = innerHeight * dpr;
    canvas.style.width = `${innerWidth}px`; canvas.style.height = `${innerHeight}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    stars = Array.from({length: Math.min(260, Math.round(innerWidth * innerHeight / 5000))}, () => ({x:Math.random()*innerWidth,y:Math.random()*innerHeight,r:Math.random()*1.4+.2,v:Math.random()*.08+.015,a:Math.random()*.8+.2}));
  }
  function draw() {
    ctx.clearRect(0,0,innerWidth,innerHeight); ctx.fillStyle="#fff";
    stars.forEach(star => { star.y += star.v; if (star.y > innerHeight + 2) star.y = -2; ctx.globalAlpha = star.a; ctx.beginPath(); ctx.arc(star.x,star.y,star.r,0,Math.PI*2); ctx.fill(); });
    ctx.globalAlpha = 1; if (!reduced) requestAnimationFrame(draw);
  }
  resize(); draw(); addEventListener("resize", resize);
  addEventListener("pointermove", event => { document.documentElement.style.setProperty("--mx", `${event.clientX}px`); document.documentElement.style.setProperty("--my", `${event.clientY}px`); }, {passive:true});
})();
