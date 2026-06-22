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

/* ── Cookie consent (GDPR / ePrivacy compliant) ───────────────
   Self-contained, no dependencies. Non-essential cookies/scripts
   stay blocked until the visitor gives explicit, granular consent.
   Reopen the chooser anywhere with the footer "Cookie Settings"
   control or window.cookieConsent.openSettings().
   ─────────────────────────────────────────────────────────────── */
(function () {
  'use strict';

  var STORE_KEY = 'tbd_cookie_consent';
  var POLICY_VERSION = 1; // bump to re-prompt everyone after a policy change

  // Non-essential categories the visitor can opt into. "necessary" is
  // implied/always-on and never stored as a choice.
  var CATEGORIES = [
    {
      id: 'analytics',
      name: 'Analytics',
      desc: 'Help me understand how the site is used so I can improve it. Set only with your consent.'
    },
    {
      id: 'marketing',
      name: 'Marketing',
      desc: 'Used to measure and personalise content from third parties (e.g. social embeds).'
    }
  ];

  /* ── persistence ─────────────────────────────────────────── */
  function readConsent() {
    try {
      var raw = window.localStorage.getItem(STORE_KEY);
      if (!raw) return null;
      var data = JSON.parse(raw);
      if (!data || data.v !== POLICY_VERSION) return null;
      return data;
    } catch (e) {
      return null;
    }
  }

  function writeConsent(granted) {
    var data = { v: POLICY_VERSION, ts: new Date().toISOString(), categories: {} };
    CATEGORIES.forEach(function (cat) {
      data.categories[cat.id] = !!granted[cat.id];
    });
    try {
      window.localStorage.setItem(STORE_KEY, JSON.stringify(data));
    } catch (e) { /* storage unavailable — banner will show next visit */ }
    return data;
  }

  /* ── apply consent: unblock opted-in scripts, fire event ─── */
  function applyConsent(data) {
    // Scripts gated behind consent ship as <script type="text/plain"
    // data-cc-category="analytics"> and are activated here once allowed.
    var blocked = document.querySelectorAll('script[type="text/plain"][data-cc-category]');
    Array.prototype.forEach.call(blocked, function (node) {
      var cat = node.getAttribute('data-cc-category');
      if (!data.categories[cat] || node.dataset.ccActivated) return;
      var active = document.createElement('script');
      Array.prototype.forEach.call(node.attributes, function (attr) {
        if (attr.name === 'type' || attr.name === 'data-cc-category') return;
        active.setAttribute(attr.name, attr.value);
      });
      active.type = 'text/javascript';
      if (node.src) {
        active.src = node.src;
      } else {
        active.textContent = node.textContent;
      }
      node.dataset.ccActivated = '1';
      node.parentNode.insertBefore(active, node.nextSibling);
    });

    document.dispatchEvent(new CustomEvent('cookieconsent:change', { detail: data }));
  }

  /* ── UI ──────────────────────────────────────────────────── */
  var root = null;
  var lastFocus = null;

  function buildUI() {
    root = document.createElement('div');
    root.className = 'cc-root';
    root.setAttribute('hidden', '');

    var toggles = CATEGORIES.map(function (cat) {
      return '' +
        '<div class="cc-cat">' +
          '<div class="cc-cat__head">' +
            '<span class="cc-cat__name">' + cat.name + '</span>' +
            '<label class="cc-switch">' +
              '<input type="checkbox" data-cc-input="' + cat.id + '">' +
              '<span class="cc-switch__track" aria-hidden="true"></span>' +
            '</label>' +
          '</div>' +
          '<p class="cc-cat__desc">' + cat.desc + '</p>' +
        '</div>';
    }).join('');

    root.innerHTML = '' +
      '<div class="cc-banner" role="dialog" aria-modal="false" aria-labelledby="cc-title" aria-describedby="cc-desc">' +
        '<div class="cc-banner__main">' +
          '<h2 class="cc-banner__title" id="cc-title">Cookies on this site</h2>' +
          '<p class="cc-banner__text" id="cc-desc">I use essential cookies to make this site work. With your permission I’d also like to set optional cookies to understand how the site is used. You can change your choice any time. See the <a href="cookies.html">Cookie Policy</a> and <a href="privacy-policy.html">Privacy Policy</a>.</p>' +
        '</div>' +
        '<div class="cc-banner__actions">' +
          '<button type="button" class="btn cc-btn cc-btn--ghost" data-cc-action="manage">Manage preferences</button>' +
          '<button type="button" class="btn cc-btn cc-btn--ghost" data-cc-action="reject">Reject optional</button>' +
          '<button type="button" class="btn cc-btn cc-btn--solid" data-cc-action="accept">Accept all</button>' +
        '</div>' +
      '</div>' +
      '<div class="cc-modal" role="dialog" aria-modal="true" aria-labelledby="cc-modal-title" hidden>' +
        '<div class="cc-modal__panel">' +
          '<div class="cc-modal__head">' +
            '<h2 class="cc-modal__title" id="cc-modal-title">Cookie preferences</h2>' +
            '<button type="button" class="cc-modal__close" data-cc-action="close" aria-label="Close cookie preferences">&times;</button>' +
          '</div>' +
          '<div class="cc-modal__body">' +
            '<div class="cc-cat cc-cat--locked">' +
              '<div class="cc-cat__head">' +
                '<span class="cc-cat__name">Strictly necessary</span>' +
                '<span class="cc-cat__always">Always on</span>' +
              '</div>' +
              '<p class="cc-cat__desc">Required for the site to function (page navigation, security, your cookie choice). These can’t be switched off.</p>' +
            '</div>' +
            toggles +
          '</div>' +
          '<div class="cc-modal__actions">' +
            '<button type="button" class="btn cc-btn cc-btn--ghost" data-cc-action="reject">Reject optional</button>' +
            '<button type="button" class="btn cc-btn cc-btn--ghost" data-cc-action="accept">Accept all</button>' +
            '<button type="button" class="btn cc-btn cc-btn--solid" data-cc-action="save">Save my choices</button>' +
          '</div>' +
        '</div>' +
      '</div>';

    document.body.appendChild(root);
    wireUI();
  }

  function inputs() {
    return root.querySelectorAll('[data-cc-input]');
  }

  function setToggles(values) {
    Array.prototype.forEach.call(inputs(), function (input) {
      input.checked = !!(values && values[input.getAttribute('data-cc-input')]);
    });
  }

  function collectToggles() {
    var out = {};
    Array.prototype.forEach.call(inputs(), function (input) {
      out[input.getAttribute('data-cc-input')] = input.checked;
    });
    return out;
  }

  function allOf(value) {
    var out = {};
    CATEGORIES.forEach(function (cat) { out[cat.id] = value; });
    return out;
  }

  function finish(granted) {
    var data = writeConsent(granted);
    applyConsent(data);
    closeBanner();
    closeModal();
  }

  function showBanner() {
    root.querySelector('.cc-banner').hidden = false;
    root.removeAttribute('hidden');
    root.classList.add('cc-root--banner');
  }

  function closeBanner() {
    root.querySelector('.cc-banner').hidden = true;
    root.classList.remove('cc-root--banner');
    if (root.querySelector('.cc-modal').hidden) root.setAttribute('hidden', '');
  }

  function openModal() {
    lastFocus = document.activeElement;
    var saved = readConsent();
    setToggles(saved ? saved.categories : allOf(false));
    root.removeAttribute('hidden');
    var modal = root.querySelector('.cc-modal');
    modal.hidden = false;
    root.classList.add('cc-root--modal');
    var close = modal.querySelector('.cc-modal__close');
    if (close) close.focus();
    document.addEventListener('keydown', onModalKey);
  }

  function closeModal() {
    var modal = root.querySelector('.cc-modal');
    modal.hidden = true;
    root.classList.remove('cc-root--modal');
    document.removeEventListener('keydown', onModalKey);
    if (root.querySelector('.cc-banner').hidden) root.setAttribute('hidden', '');
    if (lastFocus && typeof lastFocus.focus === 'function') lastFocus.focus();
    lastFocus = null;
  }

  function onModalKey(event) {
    var modal = root.querySelector('.cc-modal');
    if (modal.hidden) return;
    if (event.key === 'Escape') {
      event.preventDefault();
      closeModal();
      return;
    }
    if (event.key !== 'Tab') return;
    var f = modal.querySelectorAll('a[href], button:not([disabled]), input:not([disabled])');
    if (!f.length) return;
    var first = f[0], last = f[f.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault(); last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault(); first.focus();
    }
  }

  function wireUI() {
    root.addEventListener('click', function (event) {
      var trigger = event.target.closest('[data-cc-action]');
      if (trigger) {
        switch (trigger.getAttribute('data-cc-action')) {
          case 'accept': finish(allOf(true)); break;
          case 'reject': finish(allOf(false)); break;
          case 'manage': openModal(); break;
          case 'save':   finish(collectToggles()); break;
          case 'close':  closeModal(); break;
        }
        return;
      }
      // Click on the modal backdrop closes it.
      if (event.target.classList.contains('cc-modal')) closeModal();
    });
  }

  /* ── public API ──────────────────────────────────────────── */
  window.cookieConsent = {
    get: function () { return readConsent(); },
    has: function (cat) {
      var c = readConsent();
      return !!(c && c.categories[cat]);
    },
    openSettings: function () {
      if (!root) buildUI();
      openModal();
    }
  };

  /* ── footer "Cookie Settings" triggers ───────────────────── */
  document.addEventListener('click', function (event) {
    var link = event.target.closest('[data-cc-settings]');
    if (!link) return;
    event.preventDefault();
    window.cookieConsent.openSettings();
  });

  /* ── boot ────────────────────────────────────────────────── */
  function init() {
    buildUI();
    var saved = readConsent();
    if (saved) {
      applyConsent(saved);   // honour a prior choice, unblock scripts
    } else {
      showBanner();          // first visit / policy changed
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
