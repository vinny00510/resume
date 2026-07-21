const body = document.body;
const themeToggle = document.getElementById('themeToggle');
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const year = document.getElementById('year');

year.textContent = new Date().getFullYear();

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
  body.classList.add('light');
  themeToggle.textContent = '☀';
}

themeToggle.addEventListener('click', () => {
  body.classList.toggle('light');
  const isLight = body.classList.contains('light');
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
  themeToggle.textContent = isLight ? '☀' : '☾';
});

menuToggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

function setActiveLink() {
  const scrollPosition = window.scrollY + 110;
  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    const active = scrollPosition >= top && scrollPosition < top + height;
    document.querySelector(`.nav-links a[href="#${id}"]`)?.classList.toggle('active', active);
  });
}
window.addEventListener('scroll', setActiveLink);
setActiveLink();

const revealItems = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.16 });
revealItems.forEach(item => observer.observe(item));

const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    const filter = button.dataset.filter;
    projectCards.forEach(card => {
      const categories = card.dataset.category;
      const show = filter === 'all' || categories.includes(filter);
      card.style.display = show ? 'block' : 'none';
    });
  });
});
