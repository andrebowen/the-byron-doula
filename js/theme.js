const THEMES = ['light', 'light-medium-contrast', 'light-high-contrast', 'dark', 'dark-medium-contrast', 'dark-high-contrast'];

function applyTheme(theme) {
  document.documentElement.classList.remove(...THEMES);
  document.documentElement.classList.add(theme);
  try { localStorage.setItem('md-theme', theme); } catch (_) {}
}

function resolveTheme() {
  try {
    const saved = localStorage.getItem('md-theme');
    if (saved && THEMES.includes(saved)) return saved;
  } catch (_) {}
  return 'light';
}

applyTheme(resolveTheme());


document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('themeToggle');
  if (btn) {
    btn.addEventListener('click', () => {
      const isDark = document.documentElement.classList.contains('dark');
      applyTheme(isDark ? 'light' : 'dark');
    });
  }
});

window.setTheme = applyTheme;
