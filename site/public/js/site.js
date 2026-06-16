(function () {
  'use strict';

  /* ── Nav: scroll shadow ─────────────────────────────────── */
  const nav = document.getElementById('site-nav');
  if (nav) {
    window.addEventListener('scroll', function () {
      nav.classList.toggle('scrolled', window.scrollY > 40);
    }, { passive: true });
  }

  /* ── Nav: mobile hamburger ──────────────────────────────── */
  const toggle = document.getElementById('nav-toggle');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      nav.classList.toggle('nav-open');
    });
  }

  /* ── Nav: mobile services dropdown ─────────────────────── */
  document.querySelectorAll('.nav-dropdown-toggle').forEach(function (btn) {
    btn.addEventListener('click', function () {
      this.closest('li').classList.toggle('mobile-open');
    });
  });

  /* ── FAQ tabs (homepage) ────────────────────────────────── */
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
        const content = tab.closest('.faq-content');
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
    /* tag each card by avatar path */
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
