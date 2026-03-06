# DEPLOY.md — Website Update & Deploy Playbook

Use this file as the single source of truth for shipping site changes from chat.

## 1) Project Identity

- **Project name:**
- **Primary domain:**
- **Hosting platform:** (Vercel / Netlify / Cloudflare Pages / GitHub Pages / VPS / Other)

## 2) Source of Truth

- **Repo URL:**
- **Local path on this machine:**
- **Default branch:** (main / master / etc.)
- **Protected branch rules:**

## 3) Deployment Path (Canonical)

> This is the one command path the assistant should use by default.

- **Install command:**
- **Build command:**
- **Deploy command (production):**
- **Deploy command (preview/staging):**

## 4) Auth & Access

- **Git auth available on machine:** (yes/no + method)
- **Hosting CLI logged in:** (yes/no)
- **Required env vars/secrets location:**
- **Any manual approval required before prod deploy?**

## 5) Safe Delivery Workflow (Default)

Assistant should follow this unless you ask otherwise:

1. Pull latest default branch
2. Create/update branch for the change
3. Make requested edits
4. Run lint/build checks
5. Show concise diff summary
6. Commit with clear message
7. Deploy preview (if configured)
8. Deploy production after your explicit "ship it"

## 6) Commit & PR Conventions

- **Commit style:** (e.g., feat/fix/chore)
- **PR required before production?**
- **Who approves PRs?**

## 7) Rollback Plan

- **Fast rollback command:**
- **Previous stable release reference:**
- **Who gets notified on rollback:**

## 8) Quick Commands (fill these)

```bash
# Verify local state

# Pull latest

# Install deps

# Run tests/lint

# Build

# Deploy preview

# Deploy production
```

## 9) Chat Shortcuts You Can Use

- “Update [section] to [text], commit, preview deploy.”
- “Make [change], show diff only, do not deploy.”
- “Deploy latest main to production.”
- “Rollback production to previous stable.”

---

## Current Status

- [ ] Filled out and verified
- [ ] First dry run completed
- [ ] First real production deploy completed
