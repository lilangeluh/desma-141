// Basic mobile nav toggle
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');

hamburger.addEventListener('click', () => {
  nav.querySelector('ul').classList.toggle('show');
});
