/* DEV TOOL — remove before launch */
(function () {
  const SECTIONS = [
    { label: 'Page (root)',             sel: '.bento-root',                                          noBand: true },
    { label: 'Nav header',              sel: 'header.bento-nav',                                     noBand: true },
    { label: 'Nav drawer',              sel: '.bento-nav-drawer',                                    noBand: true },
    { label: 'Hero',                    sel: '.bento-hero',                                          noBand: true },
    { label: 'About',                   sel: '.bento-about',                                         noBand: true },
    { label: 'Logos strip',             sel: '.bento-logos',                                         noBand: true },
    { label: 'Birth Prep card',         sel: '.bento-service[aria-label="Birth Preparation"]',       noBand: true },
    { label: 'Parent Coaching card',    sel: '.bento-service[aria-label="Parent Coaching"]',         noBand: true },
    { label: 'Testimonials',            sel: '#testimonials',                                        noBand: true },
    { label: 'Review cards',            sel: '.bento-review-card',                                   noBand: true },
    { label: 'FAQ',                     sel: '#faq',                                                 noBand: true },
    { label: 'FAQ items',               sel: '.bento-faq-item',                                      noBand: true },
    { label: 'Contact',                 sel: '#contact',                                             noBand: true },
    { label: 'Footer',                  sel: 'footer',                                               noBand: true },
  ].filter(({ sel }) => document.querySelector(sel));

  const TOKENS = [
    { label: '— default —',              value: '',                    bgClass: '' },
    { label: '── Neutral surfaces ──',   value: '',                    bgClass: '', disabled: true },
    { label: 'surface',                  value: '--md-sys-color-surface',                          bgClass: 'bg-surface' },
    { label: 'container-lowest',         value: '--md-sys-color-surface-container-lowest',         bgClass: 'bg-container-lowest' },
    { label: 'container-low',            value: '--md-sys-color-surface-container-low',            bgClass: 'bg-container-low' },
    { label: 'container',                value: '--md-sys-color-surface-container',                bgClass: 'bg-container' },
    { label: 'container-high',           value: '--md-sys-color-surface-container-high',           bgClass: 'bg-container-high' },
    { label: 'container-highest',        value: '--md-sys-color-surface-container-highest',        bgClass: 'bg-container-highest' },
    { label: '── Other ──',              value: '',                    bgClass: '', disabled: true },
    { label: 'primary-container',        value: '--md-sys-color-primary-container',               bgClass: '' },
    { label: 'secondary-container',      value: '--md-sys-color-secondary-container',             bgClass: '' },
    { label: 'secondary-fixed',          value: '--md-sys-color-secondary-fixed',                 bgClass: '' },
    { label: 'on-secondary-fixed-var',   value: '--md-sys-color-on-secondary-fixed-variant',      bgClass: '' },
    { label: 'tertiary-container',       value: '--md-sys-color-tertiary-container',              bgClass: '' },
    { label: 'inverse-surface',          value: '--md-sys-color-inverse-surface',                 bgClass: '' },
  ];

  /* ── Injected style tag (fallback for non-bg-* tokens) ── */
  const styleEl = document.createElement('style');
  styleEl.id = 'dev-bg-overrides';
  document.head.appendChild(styleEl);

  const BG_CLASSES = ['bg-surface','bg-container-lowest','bg-container-low','bg-container','bg-container-high','bg-container-highest'];

  /* overrides: { sel: { token, bgClass } } */
  const overrides = {};

  function applyOverrides() {
    let css = '';
    for (const [sel, { token }] of Object.entries(overrides)) {
      if (!token) continue;
      const els = document.querySelectorAll(sel);
      if (!els.length) continue;
      /* Full-bleed band via ::before so layout is never touched */
      css += `${sel} { position: relative; isolation: isolate; }\n`;
      css += `${sel}::before { content:''; position:absolute; inset:0; width:100vw; left:50%; transform:translateX(-50%); background:var(${token}); z-index:-1; }\n`;
    }
    styleEl.textContent = css;
  }

  function clearOverride(sel) {
    /* nothing to remove from DOM — all overrides are in styleEl */
  }

  /* ── Panel shell ── */
  const panel = document.createElement('div');
  panel.id = 'dev-bg-panel';
  panel.style.cssText = [
    'position:fixed',
    'top:80px',
    'right:0',
    'z-index:9999',
    'background:#1c1917',
    'color:#e7e5e4',
    'border-radius:12px 0 0 12px',
    'padding:0',
    'font-family:ui-monospace,monospace',
    'font-size:11px',
    'width:240px',
    'box-shadow:-4px 4px 20px rgba(0,0,0,0.45)',
    'max-height:calc(100vh - 100px)',
    'display:flex',
    'flex-direction:column',
  ].join(';');

  panel.innerHTML = `
    <div style="padding:14px 16px 10px;flex-shrink:0;display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid #2a2522;">
      <span style="font-size:11px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;opacity:.6;">BG Dev · Index</span>
      <button id="dev-bg-close" style="background:none;border:none;color:#e7e5e4;cursor:pointer;font-size:18px;line-height:1;padding:0 2px;opacity:.7;" title="Close">×</button>
    </div>
    <div id="dev-bg-rows" style="overflow-y:auto;padding:12px 16px;flex:1 1 auto;"></div>
    <div style="padding:10px 16px 14px;flex-shrink:0;border-top:1px solid #333;display:flex;flex-direction:column;gap:6px;">
      <button id="dev-bg-apply" style="background:#805530;border:none;color:#fff;cursor:pointer;border-radius:6px;padding:5px 10px;font-family:inherit;font-size:11px;width:100%;font-weight:700;">Copy CSS</button>
      <button id="dev-bg-reset" style="background:#333;border:none;color:#e7e5e4;cursor:pointer;border-radius:6px;padding:5px 10px;font-family:inherit;font-size:11px;width:100%;">Reset all</button>
    </div>
  `;

  const rows = panel.querySelector('#dev-bg-rows');

  SECTIONS.forEach(({ label, sel }) => {
    const row = document.createElement('div');
    row.style.cssText = 'margin-bottom:9px;';

    const lbl = document.createElement('div');
    lbl.textContent = label;
    lbl.style.cssText = 'opacity:.55;margin-bottom:3px;';

    const select = document.createElement('select');
    select.style.cssText = [
      'width:100%',
      'background:#2c2825',
      'color:#e7e5e4',
      'border:1px solid #3d3633',
      'border-radius:6px',
      'padding:4px 6px',
      'font-family:inherit',
      'font-size:11px',
      'cursor:pointer',
    ].join(';');

    TOKENS.forEach(({ label: tLabel, value, disabled }) => {
      const opt = document.createElement('option');
      opt.value = value;
      opt.textContent = tLabel;
      if (disabled) {
        opt.disabled = true;
        opt.style.cssText = 'color:#666;font-style:italic;';
      }
      select.appendChild(opt);
    });

    select.addEventListener('change', () => {
      if (select.value) {
        overrides[sel] = { token: select.value };
      } else {
        clearOverride(sel);
        delete overrides[sel];
      }
      applyOverrides();
    });

    row.appendChild(lbl);
    row.appendChild(select);
    rows.appendChild(row);
  });

  document.body.appendChild(panel);

  document.getElementById('dev-bg-close').addEventListener('click', () => panel.remove());

  document.getElementById('dev-bg-apply').addEventListener('click', () => {
    const btn = document.getElementById('dev-bg-apply');
    if (!Object.keys(overrides).length) {
      btn.textContent = 'Nothing selected';
      setTimeout(() => (btn.textContent = 'Copy classes'), 1500);
      return;
    }
    const lines = Object.entries(overrides).map(([sel, { token }]) => {
      return `${sel} { position: relative; isolation: isolate; }\n${sel}::before {\n  content: '';\n  position: absolute;\n  inset: 0;\n  width: 100vw;\n  left: 50%;\n  transform: translateX(-50%);\n  background: var(${token});\n  z-index: -1;\n}`;
    });
    navigator.clipboard.writeText(lines.join('\n\n')).then(() => {
      btn.textContent = 'Copied!';
      setTimeout(() => (btn.textContent = 'Copy classes'), 1500);
    });
  });

  document.getElementById('dev-bg-reset').addEventListener('click', () => {
    for (const key of Object.keys(overrides)) {
      clearOverride(key);
      delete overrides[key];
    }
    styleEl.textContent = '';
    panel.querySelectorAll('select').forEach(s => (s.value = ''));
  });
})();
