/* ===========================
   FRONTIER GRAMMAR SCHOOL
   script.js
=========================== */

// ── PAGE NAVIGATION ──────────────────────────────────────────
function showPage(pageId) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const target = document.getElementById('page-' + pageId);
  if (target) {
    target.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  document.querySelectorAll('.nav-link').forEach(l => {
    l.classList.toggle('active', l.dataset.page === pageId);
  });
  // Close mobile menu
  document.getElementById('navLinks').classList.remove('open');
}

// All nav links and buttons with data-page
document.addEventListener('click', function(e) {
  const el = e.target.closest('[data-page]');
  if (el) {
    e.preventDefault();
    showPage(el.dataset.page);
  }
});

// ── NAVBAR SCROLL ─────────────────────────────────────────────
window.addEventListener('scroll', function() {
  const navbar = document.getElementById('navbar');
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// ── HAMBURGER MENU ────────────────────────────────────────────
document.getElementById('hamburger').addEventListener('click', function() {
  document.getElementById('navLinks').classList.toggle('open');
});

// ── HERO PARTICLES ────────────────────────────────────────────
(function createParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  for (let i = 0; i < 25; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.left = Math.random() * 100 + 'vw';
    p.style.setProperty('--dur', (6 + Math.random() * 8) + 's');
    p.style.setProperty('--delay', (Math.random() * 10) + 's');
    p.style.width = p.style.height = (2 + Math.random() * 4) + 'px';
    container.appendChild(p);
  }
})();

// ── COUNTER ANIMATION ─────────────────────────────────────────
function animateCounter(el) {
  const target = +el.dataset.target;
  let current = 0;
  const step = target / 60;
  const timer = setInterval(() => {
    current += step;
    if (current >= target) { current = target; clearInterval(timer); }
    el.textContent = Math.floor(current);
  }, 25);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.stat-num').forEach(animateCounter);
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const statsBar = document.querySelector('.stats-bar');
if (statsBar) statsObserver.observe(statsBar);

// ── SCROLL REVEAL ─────────────────────────────────────────────
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

function setupReveal() {
  const revealSelectors = [
    '.feature-card', '.mvv-card', '.program-card',
    '.staff-card', '.step-card', '.gallery-item',
    '.leader-card'
  ];
  revealSelectors.forEach(sel => {
    document.querySelectorAll(sel).forEach((el, i) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(24px)';
      el.style.transition = `opacity 0.5s ease ${i * 0.07}s, transform 0.5s ease ${i * 0.07}s`;
      revealObserver.observe(el);
    });
  });
}
setupReveal();

// ── FORM HANDLER ──────────────────────────────────────────────
function handleForm(e) {
  e.preventDefault();
  const toast = document.getElementById('toast');
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3500);
  e.target.reset();
}

// ── NAVBAR INITIAL STATE ──────────────────────────────────────
// Force scrolled class if not on hero
window.dispatchEvent(new Event('scroll'));

// ── INIT ─────────────────────────────────────────────────────
showPage('home');
