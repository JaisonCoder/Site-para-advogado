// Sticky header on scroll
const header = document.getElementById('header');
if (header) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

// Mobile menu toggle
const menuToggle = document.getElementById('menu-toggle');
const nav = document.getElementById('nav');

if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    nav.classList.toggle('open');
  });

  // Close menu when clicking a link
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('active');
      nav.classList.remove('open');
    });
  });
}

// Intersection Observer for reveal animations
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -30px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

// Safety: if IntersectionObserver is not supported or fails, show everything after a short delay
setTimeout(() => {
  document.querySelectorAll('.reveal:not(.active)').forEach(el => {
    el.classList.add('active');
  });
}, 2500);

// Animated counter for the 90% stat
const counterElement = document.querySelector('.stat-number');
let counterStarted = false;

function animateCounter() {
  if (!counterElement || counterStarted) return;
  counterStarted = true;

  const target = parseInt(counterElement.getAttribute('data-target'), 10) || 90;
  const duration = 2000;
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out cubic
    const ease = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(ease * target);
    counterElement.textContent = current;

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      counterElement.textContent = target;
    }
  }

  requestAnimationFrame(update);
}

// Observe the stats section to trigger counter
const statsSection = document.querySelector('.diferenciais');
if (statsSection) {
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter();
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.35 });

  statsObserver.observe(statsSection);
}

// Smooth active nav link highlighting
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY + 120;

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    const navLink = document.querySelector(`.nav a[href="#${sectionId}"]`);

    if (navLink && scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      document.querySelectorAll('.nav a').forEach(a => a.classList.remove('active'));
      navLink.classList.add('active');
    }
  });
});
