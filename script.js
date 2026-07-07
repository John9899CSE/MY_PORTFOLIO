document.addEventListener('DOMContentLoaded', () => {
  const year = new Date().getFullYear();
  const footer = document.createElement('footer');
  footer.className = 'container';
  footer.style.padding = '2rem 0 3rem';
  footer.style.color = '#9eb0c7';
  footer.innerHTML = `© ${year} SK JOHN NAGUR MEERA VALLI`;
  document.body.appendChild(footer);

  const themeToggle = document.getElementById('themeToggle');
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  const root = document.documentElement;
  const savedTheme = localStorage.getItem('portfolio-theme');

  if (savedTheme === 'light') {
    root.classList.add('light-theme');
    themeToggle.textContent = '🌙';
  }

  themeToggle.addEventListener('click', () => {
    root.classList.toggle('light-theme');
    const isLight = root.classList.contains('light-theme');
    localStorage.setItem('portfolio-theme', isLight ? 'light' : 'dark');
    themeToggle.textContent = isLight ? '🌙' : '☀️';
  });

  menuToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  document.querySelectorAll('.nav-links a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
});
