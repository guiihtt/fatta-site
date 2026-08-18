/* ========================================================================== 
   FATTA VEÍCULOS — script principal
   ========================================================================== */

/**
 * CONFIGURAÇÃO — edite apenas aqui.
 * Número confirmado pelo cliente: o mesmo exibido na página do Facebook.
 */
const CONFIG = {
  whatsappNumber: '5555999834112', // formato: 55 (Brasil) + DDD + número, só dígitos
  whatsappMessage: 'Olá! Vi o site da Fatta Veículos e gostaria de saber mais sobre os veículos disponíveis.',
  whatsappDisplay: '(55) 99983-4112',
};

function buildWhatsAppLink() {
  const text = encodeURIComponent(CONFIG.whatsappMessage);
  return `https://wa.me/${CONFIG.whatsappNumber}?text=${text}`;
}

function wireWhatsAppLinks() {
  const link = buildWhatsAppLink();
  const ids = ['wa-header', 'wa-hero', 'wa-location', 'wa-cta', 'wa-fab'];
  ids.forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.setAttribute('href', link);
  });

  const display = document.getElementById('wa-display');
  if (display) display.textContent = CONFIG.whatsappDisplay;

  const footerText = document.getElementById('wa-footer-text');
  if (footerText) footerText.textContent = `WhatsApp: ${CONFIG.whatsappDisplay}`;
}

function wireMobileNav() {
  const toggle = document.getElementById('navToggle');
  const nav = document.getElementById('mobileNav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  // fecha o menu ao clicar em um link
  nav.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', () => {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

function highlightToday() {
  const rows = document.querySelectorAll('.hours-table tbody tr');
  if (!rows.length) return;
  // 0 = domingo ... 6 = sábado -> mapeando para a ordem das linhas (seg..dom)
  const jsDay = new Date().getDay();
  const rowIndex = jsDay === 0 ? 6 : jsDay - 1;
  if (rows[rowIndex]) rows[rowIndex].classList.add('is-today');
}

function setFooterYear() {
  const el = document.getElementById('year');
  if (el) el.textContent = new Date().getFullYear();
}

document.addEventListener('DOMContentLoaded', () => {
  wireWhatsAppLinks();
  wireMobileNav();
  highlightToday();
  setFooterYear();
});

function wireScrollAnimations() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  document.documentElement.classList.add('motion-ready');

  const groups = [
    '.section-head',
    '.about-grid > *',
    '.tags-grid > *',
    '.showcase-grid > *',
    '.location-grid > *',
    '.final-cta > *',
    '.footer-grid > *'
  ];

  const elements = document.querySelectorAll(groups.join(','));
  elements.forEach((el, index) => {
    el.classList.add('reveal-on-scroll');
    el.style.setProperty('--reveal-delay', `${Math.min((index % 4) * 80, 240)}ms`);
  });

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      obs.unobserve(entry.target);
    });
  }, { threshold: 0.14, rootMargin: '0px 0px -8% 0px' });

  elements.forEach((el) => observer.observe(el));
}

wireScrollAnimations();
