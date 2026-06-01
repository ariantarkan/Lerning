function toPersianDigits(str) {
  const map = ['۰','۱','۲','۳','۴','۵','۶','۷','۸','۹'];
  return String(str).replace(/\d/g, d => map[d]);
}

function parsePrice(text) {
  if (!text) return 0;
  let s = String(text).trim()
    .replace(/[۰-۹]/g, d => '0123456789'[ '۰۱۲۳۴۵۶۷۸۹'.indexOf(d) ]);
  s = s.replace(/,/g, '').replace(/[^\d]/g, '');
  return Number(s) || 0;
}

function formatPrice(priceNumber) {
  const n = Number(priceNumber) || 0;
  const withComma = n.toLocaleString('en-US');
  return toPersianDigits(withComma);
}


// Mobile Menu Toggle
const menuToggle = document.getElementById('mobile-menu');
const navMenu = document.getElementById('nav-menu');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    // Animate the hamburger icon
    menuToggle.classList.toggle('is-active');
});

// Optional: Close menu when clicking a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('is-active');
    });
});



