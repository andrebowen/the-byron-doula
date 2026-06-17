#!/usr/bin/env python3
"""Migrate site2 inner pages to site.css-only design system."""

import re
from pathlib import Path

PUBLIC = Path(__file__).resolve().parents[1] / "public"
CSS_VER = "20260617ae"

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

DESKTOP_NAV_RE = re.compile(
    r"<!-- ═══════════════════════ NAV ═══════════════════════════ -->\s*"
    r"<nav class=\"site-nav site-nav--desktop\"[^>]*>.*?</nav>\s*",
    re.DOTALL,
)

DESKTOP_NAV_RE_ALT = re.compile(
    r"<nav class=\"site-nav site-nav--desktop\"[^>]*>.*?</nav>\s*",
    re.DOTALL,
)

HEADER_RE = re.compile(
    r"<header class=\"site-header[^\"]*\" id=\"site-nav\">.*?</header>\s*",
    re.DOTALL,
)


def active(page: str, flags: dict) -> str:
    return ' class="active"' if flags.get(page) else ""


def header(flags: dict) -> str:
    return f"""<header class="site-header site-header--solid" id="site-nav">
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
        <ul class="nav-links menu-drawer__list">
          <li><a href="index.html"{active("home", flags)}><span>Home</span><svg class="menu-drawer__chevron" width="7" height="12" viewBox="0 0 7 12" fill="none" aria-hidden="true"><path d="M1 1l5 5-5 5" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/></svg></a></li>
          <li><a href="about.html"{active("about", flags)}><span>About</span><svg class="menu-drawer__chevron" width="7" height="12" viewBox="0 0 7 12" fill="none" aria-hidden="true"><path d="M1 1l5 5-5 5" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/></svg></a></li>
          <li><a href="birth-preparation.html"{active("birth", flags)}><span>Birth Preparation</span><svg class="menu-drawer__chevron" width="7" height="12" viewBox="0 0 7 12" fill="none" aria-hidden="true"><path d="M1 1l5 5-5 5" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/></svg></a></li>
          <li><a href="parent-coaching.html"{active("parent", flags)}><span>Parent Coaching</span><svg class="menu-drawer__chevron" width="7" height="12" viewBox="0 0 7 12" fill="none" aria-hidden="true"><path d="M1 1l5 5-5 5" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/></svg></a></li>
        </ul>
      </div>
      <div class="menu-drawer__bottom">
        <a href="index.html#contact" class="menu-drawer__bottom-link">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M3.5 5.5h13v9h-13v-9z" stroke="currentColor" stroke-width="1.1"/><path d="M3.5 6.5l6.5 4.5 6.5-4.5" stroke="currentColor" stroke-width="1.1" stroke-linecap="round"/></svg>
          <span>Contact</span>
        </a>
      </div>
    </div>
    <ul class="site-header__links site-header__links--desktop nav-links">
      <li><a href="about.html"{active("about", flags)}>About</a></li>
      <li><a href="birth-preparation.html"{active("birth", flags)}>Birth Preparation</a></li>
      <li><a href="parent-coaching.html"{active("parent", flags)}>Parent Coaching</a></li>
    </ul>
  </nav>
</header>

"""


def patch_head(text: str) -> str:
    text = re.sub(r'\s*<link rel="preconnect"[^>]+>\s*', "\n", text)
    text = re.sub(
        r'<link rel="stylesheet" href="css/design-system\.css\?v=[^"]+">\s*',
        "",
        text,
    )
    text = re.sub(
        r'<link rel="stylesheet" href="css/site\.css\?v=[^"]+">',
        f'<link rel="stylesheet" href="css/site.css?v={CSS_VER}">',
        text,
    )
    if f'site.css?v={CSS_VER}' not in text:
        text = text.replace("</head>", f'  <link rel="stylesheet" href="css/site.css?v={CSS_VER}">\n</head>')
    text = text.replace("<body>", '<body class="page-inner">')
    text = re.sub(r'<body class="page-inner" class="page-inner">', '<body class="page-inner">', text)
    return text


def patch_file(name: str, flags: dict) -> None:
    path = PUBLIC / name
    text = path.read_text()
    text = patch_head(text)
    text = HEADER_RE.sub(header(flags), text, count=1)
    text = DESKTOP_NAV_RE.sub("", text)
    text = DESKTOP_NAV_RE_ALT.sub("", text)
    text = text.replace('style="color:var(--color-brand)"', 'class="link-cta"')
    path.write_text(text)
    print(f"migrated {name}")


def main() -> None:
    for name, flags in PAGES.items():
        patch_file(name, flags)


if __name__ == "__main__":
    main()
