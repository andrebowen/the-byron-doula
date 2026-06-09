# Byron Doula Stitch

AI-assisted Stitch rebuild of thebyrondoula.com. All 10 pages built. Now using standard 9-stage website process (see stages/ below) in addition to Stitch workflow. Currently post content review / in design-build.

## Folder Map

```
Byron-Doula-Stitch/
├── AGENTS.md              (you are here)
├── CONTEXT.md             (Layer 1 — stage router)
├── MEMORY.md              (current state, decisions, blockers)
├── .stitch/
│   ├── DESIGN.md          (Earth & Grace design system)
│   ├── SITE.md            (site vision, sitemap, roadmap)
│   ├── next-prompt.md     (stitch-loop baton — current page task)
│   ├── metadata.json      (Stitch project ID: 5449818409884100063)
│   └── designs/           (staging: raw HTML + PNG from Stitch)
├── stages/
│   ├── 01-discovery-strategy/  (business goals, audience, sitemap, brief)
│   ├── 02-wireframing/         (low-fi structure)
│   ├── 03-visual-design/       (high-fi mockups, design system)
│   ├── 04-prototype/           (interactive)
│   ├── 05-content-creation/    (copy, media)
│   ├── 06-development/         (build)
│   ├── 07-testing-qa/          (hard gate)
│   ├── 08-launch/              (go live)
│   └── 09-maintenance-optimization/ (post launch)
├── _config/               (brand tokens, design config)
├── shared/                (cross-stage assets)
└── site/public/           (production pages — 10 pages built)
```

## Workflow

| Step | Command | What it does |
|------|---------|--------------|
| 1. Polish prompt | `/enhance-prompt` | Turns a rough idea into a Stitch-optimized prompt |
| 2. Generate design system | `/design-md` | Analyzes a Stitch screen, writes `.stitch/DESIGN.md` |
| 3. Build pages | `/stitch-loop` | Reads baton, generates page via Stitch, integrates into `site/public/`, writes next baton |
| 4. Convert to React | `/react-components` | Converts Stitch HTML output to React component system |

## Triggers

| Keyword | Action |
|---------|--------|
| `status` | Show which pages are built (check `.stitch/SITE.md` sitemap) and what is in the baton |
| `next page` | Run one stitch-loop iteration |

## Standard Website Stages Routing (new 9-stage system)

The project now also follows the standard website staging in `stages/`:

| Task | Go To |
|------|-------|
| Discovery, strategy, sitemap, brief | `stages/01-discovery-strategy/CONTEXT.md` |
| Wireframes / structure | `stages/02-wireframing/CONTEXT.md` |
| Visual design, mockups | `stages/03-visual-design/CONTEXT.md` |
| Prototype | `stages/04-prototype/CONTEXT.md` |
| Content finalisation | `stages/05-content-creation/CONTEXT.md` |
| Build / development | `stages/06-development/CONTEXT.md` |
| Testing & QA | `stages/07-testing-qa/CONTEXT.md` |
| Launch | `stages/08-launch/CONTEXT.md` |
| Maintenance & optimization | `stages/09-maintenance-optimization/CONTEXT.md` |

## MCP

- **Stitch MCP**: HTTP transport at `https://stitch.googleapis.com/mcp` — Connected
- **Auth**: `X-Goog-Api-Key` header (stored in `~/.claude.json`)
- **Plugins installed**: `stitch-design`, `stitch-build`, `stitch-utilities`

## Skills Available

| Skill | Description |
|-------|-------------|
| `stitch::generate-design` | Generate or edit screens via Stitch MCP |
| `stitch::manage-design-system` | Upload DESIGN.md and apply themes |
| `stitch::extract-design-md` | Extract design system from existing code |
| `stitch::code-to-design` | Convert frontend code to Stitch design |
| `design-md` | Analyze a Stitch project and write DESIGN.md |
| `enhance-prompt` | Transform vague idea into Stitch-optimized prompt |
| `stitch-loop` | Autonomous page-by-page build loop |
| `react-components` | Convert Stitch output to React components |

## First-Time Setup Checklist

- [x] Plugins installed (`npx plugins add google-labs-code/stitch-skills`)
- [x] Stitch MCP connected (`https://stitch.googleapis.com/mcp`)
- [x] Folder structure created
- [ ] Restart Claude Code to load skills
- [ ] Run `/enhance-prompt` on your site description
- [ ] Generate first screen in Stitch, then run `/design-md`
- [ ] Fill in `.stitch/SITE.md` with site vision
- [ ] Run `/stitch-loop` to build pages
