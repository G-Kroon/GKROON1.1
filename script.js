// Basic interactivity: mobile toggle, dropdown accessibility, keyboard support
document.addEventListener('DOMContentLoaded', function () {
  const navToggle = document.getElementById('nav-toggle');
  const mainNav = document.getElementById('main-nav');
  const navList = document.querySelector('.nav-list');
  const dropBtn = document.querySelector('.has-dropdown .drop-btn');
  const dropdown = document.getElementById('connectivity-menu');

  // Mobile nav toggle
  navToggle.addEventListener('click', function () {
    const expanded = this.getAttribute('aria-expanded') === 'true';
    this.setAttribute('aria-expanded', String(!expanded));
    if (navList.style.display === 'flex' || navList.style.display === 'block') {
      navList.style.display = '';
    } else {
      navList.style.display = window.innerWidth <= 980 ? 'block' : 'flex';
    }
  });

  // Dropdown toggle
  if (dropBtn) {
    dropBtn.addEventListener('click', function (e) {
      const expanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', String(!expanded));
      if (!expanded) {
        dropdown.style.display = 'block';
        dropdown.setAttribute('aria-hidden', 'false');
      } else {
        dropdown.style.display = 'none';
        dropdown.setAttribute('aria-hidden', 'true');
      }
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function (e) {
      if (!dropBtn.contains(e.target) && !dropdown.contains(e.target)) {
        dropBtn.setAttribute('aria-expanded', 'false');
        dropdown.style.display = 'none';
        dropdown.setAttribute('aria-hidden', 'true');
      }
    });

    // Keyboard support
    dropBtn.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        dropBtn.click();
        const first = dropdown.querySelector('a');
        if (first) first.focus();
      }
    });
  }

  // Make nav responsive on resize
  window.addEventListener('resize', function () {
    if (window.innerWidth > 980) {
      navList.style.display = 'flex';
    } else {
      navList.style.display = '';
    }
  });

  // Smooth anchor scrolling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // close mobile nav after click
        if (window.innerWidth <= 980 && navList.style.display) {
          navList.style.display = '';
          navToggle.setAttribute('aria-expanded', 'false');
        }
      }
    });
  });
});
