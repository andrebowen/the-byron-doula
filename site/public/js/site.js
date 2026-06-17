(function () {
  'use strict';

  /* ── Nav: scroll + hero overlay ─────────────────────────── */
  const nav = document.getElementById('site-nav');
  const hero = document.getElementById('hero');
  const main = document.querySelector('main');
  const siteMenu = document.getElementById('site-menu');

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
  let previousFocus = null;

  function getMenuFocusables() {
    if (!siteMenu) return [];
    return Array.prototype.filter.call(
      siteMenu.querySelectorAll('a[href], button:not([disabled])'),
      function (el) {
        return !el.hidden && el.getAttribute('aria-hidden') !== 'true';
      }
    );
  }

  function closeNav() {
    if (nav) nav.classList.remove('nav-open');
    document.body.classList.remove('nav-open');
    if (toggle) {
      toggle.setAttribute('aria-expanded', 'false');
      toggle.removeAttribute('hidden');
    }
    if (menuClose) menuClose.setAttribute('hidden', '');
    if (main) main.removeAttribute('inert');
    if (previousFocus && typeof previousFocus.focus === 'function') {
      previousFocus.focus();
    }
    previousFocus = null;
  }

  function openNav() {
    if (!nav) return;
    previousFocus = document.activeElement;
    nav.classList.add('nav-open');
    document.body.classList.add('nav-open');
    if (toggle) {
      toggle.setAttribute('aria-expanded', 'true');
      toggle.setAttribute('hidden', '');
    }
    if (menuClose) {
      menuClose.removeAttribute('hidden');
      menuClose.focus();
    }
    if (main) main.setAttribute('inert', '');
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

  if (siteMenu) {
    siteMenu.addEventListener('click', function (event) {
      if (!event.target.closest('.menu-drawer')) {
        closeNav();
      }
    });
  }

  window.addEventListener('resize', function () {
    if (window.innerWidth > 768) closeNav();
  });

  document.addEventListener('keydown', function (event) {
    if (!nav || !nav.classList.contains('nav-open')) return;

    if (event.key === 'Escape') {
      event.preventDefault();
      closeNav();
      return;
    }

    if (event.key !== 'Tab') return;

    const focusables = getMenuFocusables();
    if (!focusables.length) return;

    const first = focusables[0];
    const last = focusables[focusables.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
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

  function setFaqPanelState(panel, isActive) {
    panel.classList.toggle('active', isActive);
    if (isActive) {
      panel.removeAttribute('hidden');
    } else {
      panel.setAttribute('hidden', '');
    }
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
        const content = tab.closest('.faq__layout');
        if (!content) return;
        content.querySelectorAll('.faq-tab').forEach(function (t) {
          t.classList.remove('active');
          t.setAttribute('aria-selected', 'false');
        });
        content.querySelectorAll('.faq-panel').forEach(function (p) {
          setFaqPanelState(p, p.id === 'panel-' + panel);
        });
        tab.classList.add('active');
        tab.setAttribute('aria-selected', 'true');
        syncSlider();
      });
    });
  });

  /* ── FAQ accordion ──────────────────────────────────────── */
  let faqAnswerId = 0;

  function setFaqItemState(item, isOpen) {
    const btn = item.querySelector('.faq-q');
    item.classList.toggle('open', isOpen);
    if (btn) btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  }

  document.querySelectorAll('.faq-q').forEach(function (btn) {
    const item = btn.closest('.faq-item');
    const answer = item ? item.querySelector('.faq-a') : null;
    if (answer && !answer.id) {
      faqAnswerId += 1;
      answer.id = 'faq-answer-' + faqAnswerId;
    }
    if (answer) btn.setAttribute('aria-controls', answer.id);
    setFaqItemState(item, item.classList.contains('open'));

    btn.addEventListener('click', function () {
      const isOpen = item.classList.contains('open');
      const scope = this.closest('.faq-panel') || this.closest('.faq-inner');
      if (scope) {
        scope.querySelectorAll('.faq-item').forEach(function (i) {
          setFaqItemState(i, false);
        });
      }
      if (!isOpen) setFaqItemState(item, true);
    });
  });

})();
