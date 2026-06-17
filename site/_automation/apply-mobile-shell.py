#!/usr/bin/env python3
"""Inject homepage mobile shell (header + footer) into site2 inner pages."""

from pathlib import Path

PUBLIC = Path(__file__).resolve().parents[1] / "public"

PAGES = {
    "about.html": {"about": True},
    "birth-preparation.html": {"birth": True},
    "parent-coaching.html": {"parent": True},
    "services.html": {},
    "privacy-policy.html": {},
    "cookies.html": {},
    "terms.html": {},
    "thankyou.html": {},
}

OLD_FOOTER_START = "<!-- ═══════════════════════ FOOTER"
FOOTER_MARKER = '<footer class="site-footer"'

NEW_FOOTER = """<footer class="site-footer">
  <div class="site-footer__row">
    <div class="site-footer__social">
      <a href="go/1.html" rel="noopener noreferrer"><img src="images/icons/1.svg" width="22" height="22" alt="" role="presentation"></a>
      <a href="go/2.html" rel="noopener noreferrer"><img src="images/icons/2.svg" width="22" height="22" alt="" role="presentation"></a>
      <a href="go/3.html" rel="noopener noreferrer"><img src="images/icons/3.svg" width="22" height="22" alt="" role="presentation"></a>
    </div>
    <ul class="site-footer__legal">
      <li><a href="privacy-policy.html">Privacy Policy</a></li>
      <li><a href="terms.html">Terms of Service</a></li>
      <li><a href="cookies.html">Cookies</a></li>
    </ul>
    <span class="site-footer__copy">© 2026 The Byron Doula</span>
  </div>
  <p class="site-footer__ack">I acknowledge the Bundjalung People as the original and true custodians of the land on which I live and work. I pay respect to all of our country's First Nations peoples and their ongoing strength in practising the world's oldest living culture. I pay respect to their Elders past, present and emerging.</p>
</footer>"""


def active(page: str, flags: dict) -> str:
    return ' class="active"' if flags.get(page) else ""


def mobile_header(flags: dict) -> str:
    return f"""<header class="site-header site-header--solid site-header--inner" id="site-nav">
  <div class="site-header__bar">
    <button class="site-header__toggle" id="nav-toggle" type="button" aria-label="Menu" aria-expanded="false" aria-controls="site-menu">
      <svg class="site-header__toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <line x1="0.75" y1="3.25" x2="15.25" y2="3.25" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
        <line x1="0.75" y1="8.25" x2="15.25" y2="8.25" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
        <line x1="0.75" y1="13.25" x2="15.25" y2="13.25" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
      </svg>
    </button>
    <a href="index.html" class="site-header__logo">The Byron Doula</a>
    <a href="index.html#contact" class="btn btn--ghost btn--sm site-header__cta">Get in touch</a>
    <button class="site-header__close" id="menu-close" type="button" aria-label="Close menu" hidden>
      <svg class="site-header__close-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M13.9308 0.355022C14.4041 -0.118341 15.1716 -0.118341 15.645 0.355022C16.1183 0.828385 16.1183 1.59586 15.645 2.06922L9.7142 8L15.645 13.9308C16.1183 14.4041 16.1183 15.1716 15.645 15.645C15.1716 16.1183 14.4041 16.1183 13.9308 15.645L8 9.7142L2.06922 15.645C1.59586 16.1183 0.828385 16.1183 0.355022 15.645C-0.118341 15.1716 -0.118341 14.4041 0.355022 13.9308L6.2858 8L0.355024 2.06922C-0.118338 1.59586 -0.118338 0.828385 0.355024 0.355022C0.828387 -0.118341 1.59586 -0.118341 2.06922 0.355022L8 6.2858L13.9308 0.355022Z" fill="currentColor"/>
      </svg>
    </button>
  </div>
  <nav class="site-header__menu" id="site-menu" aria-label="Main">
    <div class="menu-drawer">
      <div class="menu-drawer__body">
        <p class="menu-drawer__label">Services</p>
        <ul class="nav-links menu-drawer__list">
          <li><a href="birth-preparation.html"{active("birth", flags)}><span>Birth Preparation</span><svg class="menu-drawer__chevron" width="7" height="12" viewBox="0 0 7 12" fill="none" aria-hidden="true"><path d="M1 1l5 5-5 5" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/></svg></a></li>
          <li><a href="parent-coaching.html"{active("parent", flags)}><span>Parent Coaching</span><svg class="menu-drawer__chevron" width="7" height="12" viewBox="0 0 7 12" fill="none" aria-hidden="true"><path d="M1 1l5 5-5 5" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/></svg></a></li>
        </ul>
        <div class="menu-drawer__rule" role="presentation"></div>
        <ul class="nav-links menu-drawer__list">
          <li><a href="index.html"{active("home", flags)}><span>Home</span><svg class="menu-drawer__chevron" width="7" height="12" viewBox="0 0 7 12" fill="none" aria-hidden="true"><path d="M1 1l5 5-5 5" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/></svg></a></li>
          <li><a href="about.html"{active("about", flags)}><span>About</span><svg class="menu-drawer__chevron" width="7" height="12" viewBox="0 0 7 12" fill="none" aria-hidden="true"><path d="M1 1l5 5-5 5" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/></svg></a></li>
        </ul>
      </div>
      <div class="menu-drawer__bottom">
        <a href="index.html#contact" class="menu-drawer__bottom-link">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M3.5 5.5h13v9h-13v-9z" stroke="currentColor" stroke-width="1.1"/><path d="M3.5 6.5l6.5 4.5 6.5-4.5" stroke="currentColor" stroke-width="1.1" stroke-linecap="round"/></svg>
          <span>Contact</span>
        </a>
      </div>
    </div>
  </nav>
</header>

"""


def patch_file(name: str, flags: dict) -> None:
    path = PUBLIC / name
    text = path.read_text()

    if "site-header--inner" in text:
        print(f"skip {name} (already patched)")
        return

    text = text.replace(
        'href="css/design-system.css?v=20260617w">',
        'href="css/design-system.css?v=20260617w">\n  <link rel="stylesheet" href="css/site.css?v=20260617ad">',
    )
    text = text.replace('content="#722F1E"', 'content="#ffffff"')
    text = text.replace("<body>", '<body class="page-inner">')
    text = text.replace("<body>\n", '<body class="page-inner">\n')

    text = text.replace('<nav class="site-nav" id="site-nav">', '<nav class="site-nav site-nav--desktop" id="site-nav-desktop">')

    insert_at = text.find("<!-- ═══════════════════════ NAV")
    if insert_at == -1:
        insert_at = text.find('<nav class="site-nav site-nav--desktop"')
    if insert_at == -1:
        raise SystemExit(f"nav not found in {name}")

    text = text[:insert_at] + mobile_header(flags) + text[insert_at:]

    footer_idx = text.find(OLD_FOOTER_START)
    if footer_idx == -1:
        footer_idx = text.find(FOOTER_MARKER)
    if footer_idx == -1:
        raise SystemExit(f"footer not found in {name}")

    footer_end = text.find("</footer>", footer_idx) + len("</footer>")
    text = text[:footer_idx] + NEW_FOOTER + text[footer_end:]

    path.write_text(text)
    print(f"patched {name}")


def main() -> None:
    for name, flags in PAGES.items():
        patch_file(name, flags)


if __name__ == "__main__":
    main()
