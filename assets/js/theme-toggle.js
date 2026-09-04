(function () {
  'use strict';

  const btn = document.getElementById('siteThemeToggle');
  const lightLink = document.getElementById('theme-light-link');
  const darkLink = document.getElementById('theme-dark-link');
  if (!btn || !lightLink || !darkLink) return;

  const icon = btn.querySelector('i');

  function syncButton(theme) {
    const isDark = theme === 'dark';
    if (icon) {
      icon.className = isDark ? 'bi bi-sun-fill' : 'bi bi-moon-fill';
    }
    btn.setAttribute('aria-pressed', String(isDark));
    btn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    lightLink.disabled = (theme !== 'light');
    darkLink.disabled = (theme !== 'dark');
    localStorage.setItem('theme', theme);
    syncButton(theme);
  }

  // The inline head script already applied the stored theme before paint —
  // just sync the button's icon/label to match, without re-deriving it.
  syncButton(document.documentElement.getAttribute('data-theme') || 'dark');

  btn.addEventListener('click', function () {
    const current = document.documentElement.getAttribute('data-theme') || 'dark';
    applyTheme(current === 'dark' ? 'light' : 'dark');
  });
})();
