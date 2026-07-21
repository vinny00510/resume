const cursorLight = document.querySelector('.cursor-light');
document.addEventListener('mousemove', (event) => {
  cursorLight.style.left = `${event.clientX}px`;
  cursorLight.style.top = `${event.clientY}px`;
});

const navItems = document.querySelectorAll('.nav-item');
const sections = document.querySelectorAll('.content-section');

function activateSection(id) {
  navItems.forEach(item => item.classList.toggle('active', item.dataset.section === id));
  sections.forEach(section => section.classList.toggle('active-section', section.id === id));
}

navItems.forEach(item => {
  item.addEventListener('click', (event) => {
    const id = item.dataset.section;
    if (window.innerWidth >= 1024) {
      event.preventDefault();
      activateSection(id);
      history.replaceState(null, '', `#${id}`);
    }
  });
});

const initialHash = window.location.hash.replace('#', '');
if (initialHash && document.getElementById(initialHash)) {
  activateSection(initialHash);
}

const cipher = document.querySelector('.cipher');
const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
function runCipher(element) {
  const original = element.dataset.text;
  let iteration = 0;
  const timer = setInterval(() => {
    element.textContent = original
      .split('')
      .map((char, index) => {
        if (char === ' ') return ' ';
        if (index < iteration) return original[index];
        return letters[Math.floor(Math.random() * letters.length)];
      })
      .join('');

    if (iteration >= original.length) clearInterval(timer);
    iteration += 1 / 2;
  }, 35);
}

window.addEventListener('load', () => runCipher(cipher));

const cards = document.querySelectorAll('.tilt-card');
cards.forEach(card => {
  card.addEventListener('mousemove', (event) => {
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const rotateY = ((x / rect.width) - 0.5) * 8;
    const rotateX = ((y / rect.height) - 0.5) * -8;
    card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});
