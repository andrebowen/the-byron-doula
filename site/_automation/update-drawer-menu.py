#!/usr/bin/env python3
"""Flatten hamburger drawer to single nav list."""

import re
from pathlib import Path

PUBLIC = Path(__file__).resolve().parents[1] / "public"

CHEVRON = (
    '<svg class="menu-drawer__chevron" width="7" height="12" viewBox="0 0 7 12" fill="none" aria-hidden="true">'
    '<path d="M1 1l5 5-5 5" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>'
    "</svg>"
)

ACTIVE = {
    "index.html": "home",
    "about.html": "about",
    "birth-preparation.html": "birth",
    "parent-coaching.html": "parent",
}

DRAWER_BODY_RE = re.compile(
    r'<div class="menu-drawer__body">.*?</div>(?=\s*<div class="menu-drawer__bottom">)',
    re.DOTALL,
)


def active_attr(page: str, key: str) -> str:
    return ' class="active"' if ACTIVE.get(page) == key else ""


def drawer_body(page: str) -> str:
    return f"""<div class="menu-drawer__body">
        <ul class="nav-links menu-drawer__list">
          <li><a href="index.html"{active_attr(page, "home")}><span>Home</span>{CHEVRON}</a></li>
          <li><a href="about.html"{active_attr(page, "about")}><span>About</span>{CHEVRON}</a></li>
          <li><a href="birth-preparation.html"{active_attr(page, "birth")}><span>Birth Preparation</span>{CHEVRON}</a></li>
          <li><a href="parent-coaching.html"{active_attr(page, "parent")}><span>Parent Coaching</span>{CHEVRON}</a></li>
        </ul>
      </div>"""


def main() -> None:
    for path in PUBLIC.glob("*.html"):
        text = path.read_text()
        if "menu-drawer__body" not in text:
            continue
        updated, n = DRAWER_BODY_RE.subn(drawer_body(path.name), text, count=1)
        if n:
            path.write_text(updated)
            print(f"updated {path.name}")


if __name__ == "__main__":
    main()
