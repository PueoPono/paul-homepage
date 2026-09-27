# WORKFLOW.md — Paul Coaching Homepage Operating Guide

This file exists so future sessions do **not** reconstruct the website workflow from chat history or accidentally deploy from an old checkout.

## Read first

Canonical Obsidian source of truth:

`/Users/ponomini/Documents/Na-au-Obsidian/Agent-Shared/projects/active/paul-coaching-homepage-source-of-truth.md`

Related handoff for the 2026-09-26 regression/restore and Reveal Stroke UI:

`/Users/ponomini/Documents/Na-au-Obsidian/Agent-Shared/handoffs/2026-09-26-paul-homepage-reveal-ui-safe-coordination.md`

## Project Identity

- Repo: `https://github.com/PueoPono/paul-homepage`
- Canonical branch: `origin/main`
- Production/custom domain: `https://coaching.paulcropper.com`
- Hosting: Vercel
- Vercel project: `pueoponos-projects/paul-homepage`
- Preferred local repo path: `/Users/ponomini/paul-homepage`

## Critical anti-regression rule

Do **not** deploy from old/diverged local checkouts.

Known dangerous stale checkout:

`/Users/ponomini/.openclaw/workspace/paul-homepage`

That checkout previously contained the Reveal Stroke UI route but was behind current main and caused production to regress when it was deployed. It must not be pushed or deployed as-is.

If you need to deploy latest production, use a fresh temporary clone or a clean worktree from current `origin/main`.

## Current production baseline

Production was restored on 2026-09-26 from current GitHub `origin/main`:

- Commit: `dc15d28259f34659d5aace4de0cf1443892d4176`
- Label: `dc15d28 Document shared email dispatcher for review`
- Production: `https://coaching.paulcropper.com`

After restore, these pages were verified live:

- `/`
- `/emailreview/`
- `/emailreview/index.html`
- `/coachingpkg-signup.html`
- `/coachingpkg-signup-thank-you.html`

`/reveal-stroke-ui/` is expected to be 404 until it is safely republished from current main or moved to a separate tools project.

## Before any edit or deployment

Run these checks from the candidate checkout:

```bash
git remote -v
git fetch origin main
git status -sb
git rev-parse HEAD
git rev-parse origin/main
git worktree list --porcelain
```

Stop if:

- the checkout is behind/diverged and you do not understand why;
- unrelated dirty files are present;
- the path is `/Users/ponomini/.openclaw/workspace/paul-homepage`;
- `git diff --name-only` includes files unrelated to the requested work.

## Source of truth areas

### Homepage / public pages

- Homepage: `index.html`
- Shared stylesheet: `styles.css`
- Runtime site copy: `site-copy-runtime.js`
- Structured content: `site-content.json`
- Public pages:
  - `contact.html`
  - `faq.html`
  - `mission.html`
  - `my-story.html`
  - `resources.html`
  - `testimonials.html`
  - `work-with-paul.html`

### Admin/editor

- Site editor: `admin/index.html`
- Legacy text editor prototype: `editor-v1/`
- Legacy visual editor prototype: `editor-visual-1/`
- Email review UI: `emailreview/index.html`

### Coaching signup/payment

- Signup page: `coachingpkg-signup.html`
- Signup behavior: `coachingpkg-signup.js`
- Thank-you page: `coachingpkg-signup-thank-you.html`
- Terms: `coaching-terms-and-conditions.html`

### Planning/context

- `planning/full-coaching-website-plan.md`
- `planning/text-map-template.md`
- `planning/paul-source-content.md`
- Obsidian source-of-truth note listed above.

## Deployment workflow

### Clean production restore from current main

Use this when the user asks to restore/publish latest known-good main:

```bash
rm -rf /tmp/paul-homepage-origin-main-deploy
git clone --depth=1 --branch main https://github.com/PueoPono/paul-homepage.git /tmp/paul-homepage-origin-main-deploy
cd /tmp/paul-homepage-origin-main-deploy
vercel link --yes --scope pueoponos-projects --project paul-homepage
vercel deploy --prod --scope pueoponos-projects --yes
```

### Normal feature/change workflow

1. Start from current `origin/main`.
2. Create a clean branch/worktree.
3. Make only the requested change.
4. Verify `git diff --name-only` is limited to relevant files.
5. Run available syntax/static checks.
6. Deploy preview first when practical.
7. Production deploy only after explicit approval or clear restore instruction.
8. Verify important existing pages after production deploy.

## Verification checklist after production deploy

At minimum:

```text
https://coaching.paulcropper.com/
https://coaching.paulcropper.com/emailreview/
https://coaching.paulcropper.com/coachingpkg-signup.html
https://coaching.paulcropper.com/coachingpkg-signup-thank-you.html
```

For email/editor work, browser-load `/emailreview/` and check for console errors.

For sitewide style/header/nav work, verify homepage plus public pages affected by the shared header/styles.

## Small UI/tool rule

Small experimental tools should not be deployed by replacing the main coaching homepage production project.

Preferred future setup:

- Separate Vercel project: `paul-creative-tools` or `paul-labs`.
- Separate subdomain: `tools.paulcropper.com` or `labs.paulcropper.com`.
- Example routes:
  - `/reveal-stroke/`
  - `/shorts-review/`
  - `/audio-sync/`

Only promote a tool into `coaching.paulcropper.com` after it is stable and explicitly approved.

If a tool must live under the coaching site, add only its isolated folder from a clean current-main branch. Never deploy an old checkout just to make the tool route live.

## Legacy note

Older guidance in this repo referred to GitHub Pages and OpenClaw paths. That guidance is superseded. Production is Vercel at `coaching.paulcropper.com`; current main on GitHub is the canonical source for production deploys.
