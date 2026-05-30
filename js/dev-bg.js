/* DEV TOOL — remove before launch */
(function () {
  const ALL_SECTIONS = [
    { label: 'Nav',                  sel: 'nav.nav-solid' },
    { label: 'Page Header',          sel: '.page-header' },
    { label: 'Hero',                 sel: '.hero' },
    { label: 'About',                sel: '.about' },
    { label: 'About Hero',           sel: '.about-hero' },
    { label: 'About Credentials',    sel: '.about-credentials' },
    { label: 'About Interviews',     sel: '.about-interviews' },
    { label: 'Credentials strip',    sel: '.credentials' },
    { label: 'Birth Preparation',    sel: '#services' },
    { label: 'Parent Coaching',      sel: '#parent-coaching' },
    { label: 'Contact',              sel: '.contact' },
    { label: 'Testimonials',         sel: '.testimonials' },
    { label: 'Services / Reviews',   sel: 'section.section:not(.faq)' },
    { label: 'FAQ',                  sel: '.faq' },
    { label: 'Footer',               sel: 'footer' },
  ];

  /* Only show sections that actually exist on this page */
  const SECTIONS = ALL_SECTIONS.filter(({ sel }) => document.querySelector(sel));

  const TOKENS = [
    { label: 'surface',              value: '--md-sys-color-surface' },
    { label: 'surface-bright',       value: '--md-sys-color-surface-bright' },
    { label: 'surface-dim',          value: '--md-sys-color-surface-dim' },
    { label: 'container-lowest',     value: '--md-sys-color-surface-container-lowest' },
    { label: 'container-low ✓',      value: '--md-sys-color-surface-container-low' },
    { label: 'container',            value: '--md-sys-color-surface-container' },
    { label: 'container-high',       value: '--md-sys-color-surface-container-high' },
    { label: 'container-highest',    value: '--md-sys-color-surface-container-highest' },
    { label: 'primary-container',    value: '--md-sys-color-primary-container' },
    { label: 'secondary-container',  value: '--md-sys-color-secondary-container' },
    { label: 'tertiary-container',   value: '--md-sys-color-tertiary-container' },
  ];

  const styleEl = document.createElement('style');
  styleEl.id = 'dev-bg-overrides';
  document.head.appendChild(styleEl);

  const overrides = {};

  function applyOverrides() {
    let css = '';
    for (const [sel, token] of Object.entries(overrides)) {
      css += `${sel} { background: var(${token}) !important; }\n`;
    }
    styleEl.textContent = css;
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
    'width:230px',
    'box-shadow:-4px 4px 20px rgba(0,0,0,0.45)',
    'max-height:calc(100vh - 100px)',
    'display:flex',
    'flex-direction:column',
  ].join(';');

  panel.innerHTML = `
    <div style="padding:14px 16px 10px;flex-shrink:0;display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid #2a2522;">
      <span style="font-size:11px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;opacity:.6;">BG Dev</span>
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

    const defaultOpt = document.createElement('option');
    defaultOpt.value = '';
    defaultOpt.textContent = '— default —';
    select.appendChild(defaultOpt);

    TOKENS.forEach(({ label: tLabel, value }) => {
      const opt = document.createElement('option');
      opt.value = value;
      opt.textContent = tLabel;
      select.appendChild(opt);
    });

    select.addEventListener('change', () => {
      if (select.value) {
        overrides[sel] = select.value;
      } else {
        delete overrides[sel];
      }
      applyOverrides();
    });

    row.appendChild(lbl);
    row.appendChild(select);
    rows.appendChild(row);
  });

  document.body.appendChild(panel);

  document.getElementById('dev-bg-close').addEventListener('click', () => {
    panel.remove();
  });

  document.getElementById('dev-bg-apply').addEventListener('click', () => {
    const btn = document.getElementById('dev-bg-apply');
    if (!Object.keys(overrides).length) {
      btn.textContent = 'Nothing selected';
      setTimeout(() => (btn.textContent = 'Copy CSS'), 1500);
      return;
    }
    const css = Object.entries(overrides)
      .map(([sel, token]) => `${sel} {\n    background: var(${token});\n}`)
      .join('\n');
    navigator.clipboard.writeText(css).then(() => {
      btn.textContent = 'Copied!';
      setTimeout(() => (btn.textContent = 'Copy CSS'), 1500);
    });
  });

  document.getElementById('dev-bg-reset').addEventListener('click', () => {
    for (const key of Object.keys(overrides)) delete overrides[key];
    applyOverrides();
    panel.querySelectorAll('select').forEach(s => (s.value = ''));
  });
})();
