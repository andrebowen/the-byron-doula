(function () {
  'use strict';

  /* ── Nav: scroll + hero overlay ─────────────────────────── */
  const nav = document.getElementById('site-nav');
  const hero = document.getElementById('hero');

  function updateNav() {
    if (!nav) return;
    const pastHero = hero
      ? window.scrollY > hero.offsetHeight - nav.offsetHeight
      : window.scrollY > 40;
    nav.classList.toggle('scrolled', pastHero);
  }

  if (nav) {
    window.addEventListener('scroll', updateNav, { passive: true });
    updateNav();
  }

  /* ── Nav: mobile hamburger ──────────────────────────────── */
  const toggle = document.getElementById('nav-toggle');
  const menuClose = document.getElementById('menu-close');
  const navLinks = nav ? nav.querySelectorAll('.menu-drawer a, .site-header__links--desktop a') : [];

  function closeNav() {
    if (nav) nav.classList.remove('nav-open');
    document.body.classList.remove('nav-open');
    if (toggle) {
      toggle.setAttribute('aria-expanded', 'false');
      toggle.removeAttribute('hidden');
    }
    if (menuClose) menuClose.hidden = true;
  }

  function openNav() {
    if (!nav) return;
    nav.classList.add('nav-open');
    document.body.classList.add('nav-open');
    if (toggle) {
      toggle.setAttribute('aria-expanded', 'true');
      toggle.setAttribute('hidden', '');
    }
    if (menuClose) menuClose.hidden = false;
  }

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      if (nav.classList.contains('nav-open')) {
        closeNav();
      } else {
        openNav();
      }
    });
  }

  if (menuClose) {
    menuClose.addEventListener('click', closeNav);
  }

  if (navLinks.length) {
    navLinks.forEach(function (link) {
      link.addEventListener('click', closeNav);
    });
  }

  window.addEventListener('resize', function () {
    if (window.innerWidth > 768) closeNav();
  });

  /* ── FAQ tabs ───────────────────────────────────────────── */
  function updateFaqTabSlider(tabs) {
    const slider = tabs.querySelector('.faq-tab-slider');
    const active = tabs.querySelector('.faq-tab.active');
    if (!slider || !active) return;
    const tabsRect = tabs.getBoundingClientRect();
    const activeRect = active.getBoundingClientRect();
    slider.style.width = activeRect.width + 'px';
    slider.style.left = (activeRect.left - tabsRect.left) + 'px';
  }

  document.querySelectorAll('.faq-tabs').forEach(function (tabs) {
    const syncSlider = function () { updateFaqTabSlider(tabs); };
    syncSlider();
    window.addEventListener('resize', syncSlider);
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(syncSlider);
    }
    if (typeof ResizeObserver !== 'undefined') {
      const ro = new ResizeObserver(syncSlider);
      ro.observe(tabs);
      tabs.querySelectorAll('.faq-tab').forEach(function (tab) { ro.observe(tab); });
    }

    tabs.querySelectorAll('.faq-tab').forEach(function (tab) {
      tab.addEventListener('click', function () {
        const panel = tab.dataset.panel;
        const content = tab.closest('.faq-content') || tab.closest('.faq__layout');
        if (!content) return;
        content.querySelectorAll('.faq-tab').forEach(function (t) {
          t.classList.remove('active');
          t.setAttribute('aria-selected', 'false');
        });
        content.querySelectorAll('.faq-panel').forEach(function (p) { p.classList.remove('active'); });
        tab.classList.add('active');
        tab.setAttribute('aria-selected', 'true');
        const target = document.getElementById('panel-' + panel);
        if (target) target.classList.add('active');
        syncSlider();
      });
    });
  });

  /* ── FAQ accordion ──────────────────────────────────────── */
  document.querySelectorAll('.faq-q').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const item = this.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      const scope = this.closest('.faq-panel') || this.closest('.faq-inner');
      if (scope) {
        scope.querySelectorAll('.faq-item').forEach(function (i) { i.classList.remove('open'); });
      }
      if (!isOpen) item.classList.add('open');
    });
  });

  /* ── Reviews filter (reviews.html only) ────────────────── */
  const grid = document.querySelector('.reviews-full-grid');
  if (grid) {
    grid.querySelectorAll('.t-card').forEach(function (card) {
      const img = card.querySelector('.t-avatar');
      card.dataset.cat = (img && img.src.includes('/dads/')) ? 'dad' : 'mum';
    });
    document.querySelectorAll('.rf-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        document.querySelectorAll('.rf-btn').forEach(function (b) { b.classList.remove('rf-active'); });
        this.classList.add('rf-active');
        const f = this.dataset.filter;
        grid.querySelectorAll('.t-card').forEach(function (c) {
          c.style.display = (f === 'all' || c.dataset.cat === f) ? '' : 'none';
        });
      });
    });
  }

})();
