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
  const photoUpload = document.getElementById('photoUpload');
  const profileImage = document.getElementById('profileImage');
  const root = document.documentElement;
  const savedTheme = localStorage.getItem('portfolio-theme');

  // Load persisted profile image (if user uploaded previously)
  const savedImage = localStorage.getItem('profile-image');
  // Prefer a file placed in assets/portrait.jpg when available (user added to project folder).
  const fileSrc = 'assets/portrait.jpg';
  const tester = new Image();
  tester.onload = () => {
    // file exists on server, prefer it
    profileImage.src = fileSrc;
  };
  tester.onerror = () => {
    // file not found — fall back to saved upload if present
    if (savedImage) profileImage.src = savedImage;
  };
  tester.src = fileSrc;

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

  photoUpload.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target.result;
      profileImage.src = dataUrl;
      try {
        // persist image so it survives refresh; warning: large images use more storage
        localStorage.setItem('profile-image', dataUrl);
      } catch (err) {
        console.warn('Could not save image to localStorage:', err);
      }
    };
    reader.readAsDataURL(file);
  });
});
