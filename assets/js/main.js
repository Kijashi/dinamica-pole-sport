/**
 * DINÁMICA POLE SPORT • AÉREOS & MÁS
 * Frontend Controller — Editorial Light Mode
 * Fully aligned with client briefing and real business data.
 */

// Signal to CSS that JavaScript is active (enables entrance stagger)
document.documentElement.classList.add('js');

document.addEventListener('DOMContentLoaded', () => {
  initEntranceAnimation();
  initHeaderScroll();
  initMobileNav();
  initWhatsAppLinks();
  initSmoothScroll();
  initDynamicYear();
});

/**
 * 1. Orchestrated Entrance Animation
 * Adds .is-ready once layout is calculated so CSS transitions fire gracefully.
 */
function initEntranceAnimation() {
  requestAnimationFrame(() => {
    // Small timeout ensures paint has completed
    setTimeout(() => {
      document.body.classList.add('is-ready');
    }, 40);
  });
}

/**
 * 2. Sticky Header with elevation shadow
 */
function initHeaderScroll() {
  const header = document.getElementById('siteHeader') || document.querySelector('.site-header');
  if (!header) return;

  const onScroll = () => {
    const isScrolled = window.scrollY > 24;
    header.classList.toggle('is-scrolled', isScrolled);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/**
 * 3. Mobile Navigation Drawer
 */
function initMobileNav() {
  const toggleBtn = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  if (!toggleBtn || !navLinks) return;

  const setOpen = (open) => {
    navLinks.classList.toggle('is-open', open);
    document.body.classList.toggle('nav-open', open);
    toggleBtn.setAttribute('aria-expanded', String(open));
    toggleBtn.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
  };

  toggleBtn.addEventListener('click', () => {
    const isOpen = navLinks.classList.contains('is-open');
    setOpen(!isOpen);
  });

  // Close when clicking any link
  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setOpen(false));
  });

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (navLinks.classList.contains('is-open') &&
        !navLinks.contains(e.target) &&
        !toggleBtn.contains(e.target)) {
      setOpen(false);
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('is-open')) {
      setOpen(false);
      toggleBtn.focus();
    }
  });
}

/**
 * 4. WhatsApp Links with prefilled contextual text
 */
function initWhatsAppLinks() {
  const phone = '50662025442';
  const waLinks = document.querySelectorAll('a[data-wa]');

  waLinks.forEach((link) => {
    const customText = link.getAttribute('data-wa');
    if (!customText) return;
    const encoded = encodeURIComponent(customText);
    link.href = `https://wa.me/${phone}?text=${encoded}`;
  });
}

/**
 * 5. Accessible smooth scroll for internal anchors with header offset
 */
function initSmoothScroll() {
  const internalLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');

  internalLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      const targetEl = document.querySelector(targetId);
      if (!targetEl) return;

      e.preventDefault();
      const headerH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-h')) || 76;
      const targetY = targetEl.getBoundingClientRect().top + window.pageYOffset - headerH;

      window.scrollTo({
        top: Math.max(0, targetY),
        behavior: 'smooth'
      });

      // Update URL hash without jumping
      if (history.pushState) {
        history.pushState(null, '', targetId);
      }
    });
  });
}

/**
 * 6. Dynamic Year in Footer
 */
function initDynamicYear() {
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}
