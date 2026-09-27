# TOOLS.md - Local Notes

Skills define _how_ tools work. This file is for _your_ specifics — the stuff that's unique to your setup.

## What Goes Here

Things like:

- Camera names and locations
- SSH hosts and aliases
- Preferred voices for TTS
- Speaker/room names
- Device nicknames
- Anything environment-specific

## Examples

```markdown
### Cameras

- living-room → Main area, 180° wide angle
- front-door → Entrance, motion-triggered

### SSH

- home-server → 192.168.1.100, user: admin

### TTS

- Preferred voice: "Nova" (warm, slightly British)
- Default speaker: Kitchen HomePod
```

## Why Separate?

Skills are shared. Your setup is yours. Keeping them apart means you can update skills without losing your notes, and share skills without leaking your infrastructure.

---

Add whatever helps you do your job. This is your cheat sheet.

## Website Ops (Paul Cropper)

Canonical Obsidian note:

`/Users/ponomini/Documents/Na-au-Obsidian/Agent-Shared/projects/active/paul-coaching-homepage-source-of-truth.md`

- **GitHub repo:** `https://github.com/PueoPono/paul-homepage`
- **Production URL:** `https://coaching.paulcropper.com`
- **Hosting:** Vercel
- **Vercel project:** `pueoponos-projects/paul-homepage`
- **Canonical branch:** `origin/main`
- **Preferred local repo path:** `/Users/ponomini/paul-homepage`
- **Do not deploy from:** `/Users/ponomini/.openclaw/workspace/paul-homepage`
- **Primary homepage file:** `index.html` (repo root)
- **Primary stylesheet:** `styles.css` (repo root)
- **Runtime copy:** `site-copy-runtime.js`, `site-content.json`
- **Email review UI:** `emailreview/index.html`
- **Coaching package pages:** `coachingpkg-signup.html`, `coachingpkg-signup.js`, `coachingpkg-signup-thank-you.html`

### Publish workflow

1. Read `WORKFLOW.md`, `DEPLOY.md`, and the canonical Obsidian note.
2. Start from current `origin/main` or a clean temporary clone.
3. Verify `git status -sb`, `git rev-parse HEAD`, and `git rev-parse origin/main`.
4. Confirm no unrelated dirty files are included.
5. Deploy preview when practical.
6. Deploy production to Vercel only from a clean current-main lineage.
7. Verify homepage, email review, signup, and thank-you pages after production deploy.

### Notes for chat-based edits

- Chat sessions may share filesystem but not context; always read the canonical notes before site work.
- Do not rely on old GitHub Pages links or OpenClaw paths.
- Website changes requested from chat should modify the relevant current repo files and preserve unrelated dirty work.
- Small tools/experimental UIs should go to a separate tools project/subdomain before being promoted into the main coaching site.

