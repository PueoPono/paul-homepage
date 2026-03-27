# WORKFLOW.md — Paul Homepage Operating Guide

This file exists so future sessions do **not** need to reconstruct the website workflow from chat history.

## Project Identity

- Repo: `https://github.com/PueoPono/paul-homepage`
- Local path commonly used: `/Users/ponomini/.openclaw/workspace/paul-homepage`
- Live site base: `https://pueopono.github.io/paul-homepage/`
- Deploy model: push to `main` → GitHub Pages serves the site

## Core Rule

Do not rely on memory or prior chat alone.
Before making website edits, inspect:
1. `WORKFLOW.md`
2. `planning/decisions.md`
3. `planning/text-map-template.md`
4. `editor-v1/` if copy/editor work is involved
5. current `index.html` + `styles.css`

## Source of Truth Areas

### 1. Visual / layout behavior
- Shared CSS: `styles.css`
- Homepage HTML: `index.html`
- Other public pages:
  - `contact.html`
  - `faq.html`
  - `mission.html`
  - `my-story.html`
  - `resources.html`
  - `testimonials.html`
  - `work-with-paul.html`

### 2. Copy / planning
- Website structure + plan: `planning/full-coaching-website-plan.md`
- Editable text map: `planning/text-map-template.md`
- Additional source material: `planning/paul-source-content.md`

### 3. Editor prototype
- Editor v1 lives in: `editor-v1/`
- Structured homepage content file: `editor-v1/homepage-content.json`
- Current editor entry point: `editor-v1/index.html`
- Preview page for editor: `editor-v1/preview-homepage.html`

## Deployment Workflow

Typical flow:
1. Edit files in local repo
2. Review changed files
3. Commit in `paul-homepage`
4. Push to `main`
5. Share cache-busted URL when needed:
   - `https://pueopono.github.io/paul-homepage/?v=<commit>`

## Safe Change Workflow

### For copy changes
Prefer:
- update structured content in `editor-v1/homepage-content.json` if the relevant section is covered
- otherwise update HTML directly, but note the need to move it into structured content later

### For visual changes
Prefer:
- update shared rules in `styles.css`
- avoid page-specific inline style patches unless the change is intentionally isolated/test-only

### For experiments
Use isolated pages first.
Examples used previously:
- `test1.html`, `test2.html`, etc.
- `page10.html`, `page11.html`, etc.

Important:
- experiment pages are disposable
- do **not** assume they persist forever
- once a decision is approved, propagate cleanly into shared files and then remove test pages if requested

## Propagation Rules

When a visual/header/logo change is approved:
1. Determine whether it should live in:
   - shared `styles.css`
   - page HTML content
   - structured content JSON
2. Apply to homepage first
3. If meant to be sitewide, propagate to all public pages using the shared header
4. Verify no leftover page-specific inline overrides are conflicting with shared styles

## Known Fragile Areas

### Header logo
This area has been fragile because of:
- conflicting inline styles vs shared CSS
- desktop/mobile diverging unintentionally
- temporary test-page values being partially propagated

When editing header logo styling:
- inspect `index.html` for inline `<style>` blocks first
- inspect `styles.css` desktop rules and mobile media-query rules together
- avoid mixing multiple font families across breakpoints unless explicitly intended

### Mobile vs desktop divergence
Do not assume a mobile tuning value maps directly to desktop.
Treat desktop and mobile as separate layout contexts unless the user explicitly wants parity.

## Editor V1 Notes

Editor v1 is a **copy system prototype**, not a full site builder.
Current purpose:
- edit homepage copy in a structured format
- preview it in a rendered homepage-like page

Current limitations:
- local save only
- no write-back to repo from browser
- only partial homepage content coverage

If continuing editor work, the next best improvements are:
1. cover more homepage sections
2. improve mobile usability
3. add export/apply workflow
4. eventually unify copy + visual editing

## When User Says “Apply to Homepage”

Checklist:
- confirm whether the change is:
  - homepage only
  - mobile only
  - desktop only
  - sitewide
- check for existing test page or approved reference
- port only the approved changes
- avoid dragging in experimental overrides accidentally

## Cleanup Behavior

User has requested test pages/prototypes be deleted from GitHub after use in some cases.
So:
- treat test artifacts as temporary unless user says keep
- if deleting, remove related screenshot assets/editor test pages too
- commit cleanup clearly

## Current Live Link Pattern

Use cache-busted links after pushes:
- Homepage: `https://pueopono.github.io/paul-homepage/?v=<commit>`
- Editor v1: `https://pueopono.github.io/paul-homepage/editor-v1/?v=<commit>`

## Practical Continuity Rule

Before asking Pauko where things are or how deployment works, check this file first.

## Current Next Homepage Step

If Pauko asks what the next website step is, answer with this:

Create a test page. In homepage block 2, use a dark forest background image with many trees and a dark overlay for readability. Across all sections, increase vertical breathing room and visual spaciousness: more top/bottom padding, more spacing between headings, body text, and CTAs, and less dense layout overall. The feeling should be calm, grounded, premium, and easy on the nervous system.
