const VERSION = 'v1.5';
document.querySelectorAll('[data-version]').forEach(el => {
  el.textContent = VERSION;
});


const observer = new IntersectionObserver((entries) => {
  entries.filter(e => e.isIntersecting).forEach((entry, i) => {
    setTimeout(() => entry.target.classList.add('visible'), i * 100);
    observer.unobserve(entry.target);
  });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in').forEach(el => {
  observer.observe(el);
});


const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

if (hamburger && mobileMenu) {
  function closeMenu() {
    mobileMenu.classList.remove('open');
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
  }

  hamburger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', String(isOpen));
    hamburger.classList.toggle('active', isOpen);
    if (isOpen) mobileMenu.querySelector('a')?.focus();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
      closeMenu();
      hamburger.focus();
    }
  });

  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('click', (e) => {
    if (mobileMenu.classList.contains('open') &&
        !mobileMenu.contains(e.target) &&
        !hamburger.contains(e.target)) {
      closeMenu();
    }
  });
}


document.querySelectorAll('[data-email]').forEach(el => {
  if (!el.dataset.user || !el.dataset.domain) return;

  const email = `${el.dataset.user}@${el.dataset.domain}`;
  const span = document.createElement('span');
  span.className = 'email-text';
  span.textContent = email;
  el.append(' ', span);
  el.style.cursor = 'pointer';

  el.addEventListener('click', () => {
    if (el.dataset.copying) return;
    el.dataset.copying = 'true';

    navigator.clipboard.writeText(email).then(() => {
      span.textContent = '복사됨!';
      setTimeout(() => {
        span.textContent = email;
        delete el.dataset.copying;
      }, 1500);
    }).catch(() => {
      const range = document.createRange();
      range.selectNode(span);
      window.getSelection()?.removeAllRanges();
      window.getSelection()?.addRange(range);
      delete el.dataset.copying;
    });
  });
});
