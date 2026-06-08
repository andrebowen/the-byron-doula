// Nav scroll + mobile drawer
(function () {
  const nav = document.querySelector('.nav');
  const drawer = document.querySelector('.nav-drawer');
  const hamburger = document.querySelector('.hamburger');
  const drawerClose = document.querySelector('.drawer-close');

  function updateNav() {
    const overHero = window.scrollY < window.innerHeight - 80;
    nav.classList.toggle('over-hero', overHero);
    nav.classList.toggle('scrolled', !overHero);
  }

  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();

  if (hamburger) {
    hamburger.addEventListener('click', () => drawer.classList.add('open'));
  }
  if (drawerClose) {
    drawerClose.addEventListener('click', () => drawer.classList.remove('open'));
  }
  drawer?.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => drawer.classList.remove('open'))
  );
})();
