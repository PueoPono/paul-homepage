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

- **GitHub repo:** `https://github.com/PueoPono/paul-homepage`
- **Live URL (Pages):** `https://pueopono.github.io/paul-homepage/`
- **Primary editable file (live):** `index.html` (repo root)
- **Primary stylesheet (Theme A / active):** `styles.css` (repo root)
- **Alt stylesheet (Theme B):** `homepage/styles-b.css` and `homepage2/styles-b.css` (archive variants)
- **Assets folder (live):** `assets/` (repo root)
- **Current background image (A):** `assets/pc-gold-bg.webp`

### Publish workflow

1. Edit files in `C:\Users\turtlefree\.openclaw\workspace`
2. Commit changes
3. Push to `main` on `origin`
4. GitHub Pages updates from root files (`index.html`, `styles.css`, `assets/*`)

### Notes for Telegram-based edits

- Telegram session is separate chat history but shares the same workspace files.
- Website changes requested from Telegram should modify root site files and push:
  - `index.html`
  - `styles.css`
  - `assets/*`
- Keep copy and theme consistency with **Theme A** unless user explicitly asks to switch.

