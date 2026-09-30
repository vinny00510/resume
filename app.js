(() => {
  "use strict";
  const data = window.PORTFOLIO_DATA || {};
  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => [...root.querySelectorAll(s)];

  function escapeHTML(value = "") {
    return String(value).replace(/[&<>'"]/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"}[char]));
  }

  function renderContent() {
    const experience = $("#experience-list");
    const skills = $("#skills-list");
    const projects = $("#projects-list");
    const education = $("#education-list");
    const certifications = $("#certifications-list");

    if (experience) experience.innerHTML = (data.experiences || []).map(item => `
      <article class="timeline-item">
        <div class="timeline-period">${escapeHTML(item.period)}</div>
        <div><h3>${escapeHTML(item.company)}</h3><p class="timeline-role">${escapeHTML(item.role)}</p><p>${escapeHTML(item.description)}</p></div>
      </article>`).join("");

    if (skills) skills.innerHTML = (data.skills || []).map(group => `
      <article class="skill-group"><h3>${escapeHTML(group.title)}</h3><div class="skill-tags">${(group.items || []).map(item => `<span>${escapeHTML(item)}</span>`).join("")}</div></article>`).join("");

    if (projects) projects.innerHTML = (data.projects || []).map(project => `
      <article class="project-card"><div class="project-top"><h3>${escapeHTML(project.name)}</h3><span class="project-status">${escapeHTML(project.status)}</span></div><p>${escapeHTML(project.description)}</p><div class="project-tags">${(project.technologies || []).map(item => `<span>${escapeHTML(item)}</span>`).join("")}</div></article>`).join("");

    if (education) education.innerHTML = (data.education || []).map(item => `
      <article class="glass-card education-card"><p class="eyebrow">${escapeHTML(item.status)}</p><h3>${escapeHTML(item.course)}</h3><p>${escapeHTML(item.institution)}</p><p>${escapeHTML(item.description)}</p></article>`).join("");

    if (certifications) certifications.innerHTML = (data.certifications || []).map(item => `<span>${escapeHTML(item)}</span>`).join("");
  }

  function setupNavigation() {
    const menu = $("#main-nav");
    const toggle = $(".menu-toggle");
    toggle?.addEventListener("click", () => {
      const open = menu.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.textContent = open ? "✕" : "☰";
    });
    $$("#main-nav a").forEach(link => link.addEventListener("click", () => {
      menu.classList.remove("open"); toggle?.setAttribute("aria-expanded", "false"); if (toggle) toggle.textContent = "☰";
    }));
    $$("[data-target]").forEach(item => item.addEventListener("click", () => document.getElementById(item.dataset.target)?.scrollIntoView({behavior:"smooth", block:"start"})));
  }

  function setupReveal() {
    if (!("IntersectionObserver" in window)) return $$(".reveal").forEach(el => el.classList.add("visible"));
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add("visible"); observer.unobserve(entry.target); }
    }), {threshold:.12});
    $$(".reveal").forEach(el => observer.observe(el));
  }

  function setupScrollUI() {
    const topbar = $(".topbar");
    const back = $("#back-to-top");
    const links = $$("#main-nav a");
    const sections = links.map(link => $(link.getAttribute("href"))).filter(Boolean);
    const update = () => {
      topbar?.classList.toggle("scrolled", scrollY > 20);
      back?.classList.toggle("visible", scrollY > 650);
      let current = "";
      sections.forEach(section => { if (scrollY >= section.offsetTop - 160) current = section.id; });
      links.forEach(link => link.classList.toggle("active", link.getAttribute("href") === `#${current}`));
    };
    addEventListener("scroll", update, {passive:true}); update();
    back?.addEventListener("click", () => scrollTo({top:0, behavior:"smooth"}));
  }

  function setupNebula() {
    addEventListener("pointermove", event => {
      document.documentElement.style.setProperty("--mx", `${(event.clientX / innerWidth) * 100}%`);
      document.documentElement.style.setProperty("--my", `${(event.clientY / innerHeight) * 100}%`);
    }, {passive:true});
  }

  function setupStarfield() {
    const canvas = $("#starfield"); if (!canvas) return;
    const ctx = canvas.getContext("2d"); let stars = []; let animation;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    function resize() {
      const dpr = Math.min(devicePixelRatio || 1, 2); canvas.width = innerWidth * dpr; canvas.height = innerHeight * dpr; canvas.style.width = `${innerWidth}px`; canvas.style.height = `${innerHeight}px`; ctx.setTransform(dpr,0,0,dpr,0,0);
      stars = Array.from({length:Math.min(240, Math.round(innerWidth * innerHeight / 6500))}, () => ({x:Math.random()*innerWidth,y:Math.random()*innerHeight,r:Math.random()*1.5+.2,s:Math.random()*.16+.03,a:Math.random()*.75+.2}));
    }
    function draw() {
      ctx.clearRect(0,0,innerWidth,innerHeight); ctx.fillStyle="#fff";
      stars.forEach(star => { star.y += star.s; if (star.y > innerHeight+2) {star.y=-2;star.x=Math.random()*innerWidth;} ctx.globalAlpha=star.a; ctx.beginPath(); ctx.arc(star.x,star.y,star.r,0,Math.PI*2); ctx.fill(); });
      ctx.globalAlpha=1; if (!reduced) animation=requestAnimationFrame(draw);
    }
    resize(); draw(); addEventListener("resize", resize); addEventListener("beforeunload", () => cancelAnimationFrame(animation));
  }

  document.addEventListener("DOMContentLoaded", () => {
    renderContent(); setupNavigation(); setupReveal(); setupScrollUI(); setupNebula(); setupStarfield();
    const year = $("#year"); if (year) year.textContent = new Date().getFullYear();
  });
})();
