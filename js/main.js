/* ============================================================
   FLUXKODE — main.js (ES6+)
   ============================================================ */

'use strict';

// ─── NAVBAR SCROLL ───────────────────────────────────────────
const navbar = document.getElementById('mainNav');
if (navbar) {
  const handleNavbarScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  };
  window.addEventListener('scroll', handleNavbarScroll, { passive: true });
  handleNavbarScroll();
}

// ─── SCROLL ANIMATIONS ───────────────────────────────────────
const animateObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => {
          entry.target.classList.add('animated');
        }, parseInt(delay));
        animateObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll('[data-animate]').forEach(el => {
  animateObserver.observe(el);
});

// ─── PORTFOLIO FILTER ─────────────────────────────────────────
const filterBtns = document.querySelectorAll('.fk-filter-btn');
const portfolioItems = document.querySelectorAll('[data-category]');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const filter = btn.dataset.filter;

    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    portfolioItems.forEach(item => {
      const show = filter === 'all' || item.dataset.category === filter;
      item.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
      if (show) {
        item.style.opacity = '1';
        item.style.transform = 'scale(1)';
        item.style.display = 'block';
      } else {
        item.style.opacity = '0';
        item.style.transform = 'scale(0.95)';
        setTimeout(() => {
          if (!show) item.style.display = 'none';
        }, 350);
      }
    });
  });
});

// ─── CONTACT FORM ─────────────────────────────────────────────
const contactForm = document.getElementById('fkContactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('[type="submit"]');
    const originalText = btn.innerHTML;

    btn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span> Sending...';
    btn.disabled = true;

    setTimeout(() => {
      btn.innerHTML = '<i class="bi bi-check-lg me-2"></i> Message Sent!';
      btn.style.background = '#2a9d6e';
      btn.style.borderColor = '#2a9d6e';

      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.disabled = false;
        btn.style.background = '';
        btn.style.borderColor = '';
        contactForm.reset();
      }, 3000);
    }, 1500);
  });
}

// ─── COUNTER ANIMATION ────────────────────────────────────────
const counters = document.querySelectorAll('.stat-num');
const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const text = el.textContent.trim();
        const match = text.match(/^(\d+)(.*)$/);
        if (!match) return;

        const target = parseInt(match[1]);
        const suffix = match[2];
        let current = 0;
        const step = Math.max(1, Math.floor(target / 60));

        const interval = setInterval(() => {
          current = Math.min(current + step, target);
          el.textContent = current + suffix;
          if (current >= target) clearInterval(interval);
        }, 25);

        counterObserver.unobserve(el);
      }
    });
  },
  { threshold: 0.5 }
);
counters.forEach(c => counterObserver.observe(c));

// ─── ACTIVE NAV LINK ─────────────────────────────────────────
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-link').forEach(link => {
  const href = link.getAttribute('href');
  link.classList.toggle('active', href === currentPage);
});

// ─── SMOOTH HOVER CURSOR GLOW ─────────────────────────────────
document.querySelectorAll('.fk-service-card, .fk-why-card, .fk-testimonial-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty('--mouse-x', `${x}%`);
    card.style.setProperty('--mouse-y', `${y}%`);
  });
});
