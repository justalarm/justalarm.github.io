const checkbox = document.getElementById('theme-checkbox');
const icon = document.getElementById('switch-icon');

function applyTheme(isDark) {
  document.body.classList.toggle('light', !isDark);
  if (icon) icon.textContent = isDark ? '🌙' : '☀️';
  if (checkbox) checkbox.checked = isDark;
  try {
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  } catch (e) {}
}

let savedTheme = null;
try { savedTheme = localStorage.getItem('theme'); } catch (e) {}
applyTheme(savedTheme !== 'light');

if (checkbox) {
  checkbox.addEventListener('change', () => {
    applyTheme(checkbox.checked);
  });
}