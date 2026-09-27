# DEPLOY.md — Paul Coaching Homepage Deploy Playbook

Use this file as the repo-local deployment source of truth. The Obsidian canonical note is:

`/Users/ponomini/Documents/Na-au-Obsidian/Agent-Shared/projects/active/paul-coaching-homepage-source-of-truth.md`

## 1) Project Identity

- **Project name:** Paul Coaching Homepage / Paul Cropper coaching site
- **Primary domain:** `https://coaching.paulcropper.com`
- **Hosting platform:** Vercel
- **Vercel project:** `pueoponos-projects/paul-homepage`
- **GitHub repo:** `https://github.com/PueoPono/paul-homepage`
- **Canonical branch:** `origin/main`

## 2) Current known-good production baseline

Restored by Kukui on 2026-09-26 from clean `origin/main`.

- Commit: `dc15d28259f34659d5aace4de0cf1443892d4176`
- Label: `dc15d28 Document shared email dispatcher for review`
- Production/custom domain: `https://coaching.paulcropper.com`

Verified live after restore:

- `/`
- `/emailreview/`
- `/emailreview/index.html`
- `/coachingpkg-signup.html`
- `/coachingpkg-signup-thank-you.html`

Expected not live after restore:

- `/reveal-stroke-ui/` returns 404 because it is not in current `origin/main`; republish separately/safely.

## 3) Source of Truth

- **Repo URL:** `https://github.com/PueoPono/paul-homepage`
- **Preferred local path:** `/Users/ponomini/paul-homepage`
- **Default branch:** `main`
- **Obsidian source of truth:** `/Users/ponomini/Documents/Na-au-Obsidian/Agent-Shared/projects/active/paul-coaching-homepage-source-of-truth.md`
- **Do not deploy from:** `/Users/ponomini/.openclaw/workspace/paul-homepage`

## 4) Deployment Path — Canonical Restore of Latest Main

When the user asks to restore/publish the latest known-good main, deploy from a clean temporary clone:

```bash
rm -rf /tmp/paul-homepage-origin-main-deploy
git clone --depth=1 --branch main https://github.com/PueoPono/paul-homepage.git /tmp/paul-homepage-origin-main-deploy
cd /tmp/paul-homepage-origin-main-deploy
vercel link --yes --scope pueoponos-projects --project paul-homepage
vercel deploy --prod --scope pueoponos-projects --yes
```

## 5) Preview / Change Workflow

For new work:

1. `git fetch origin main`
2. create a clean branch/worktree from current `origin/main`
3. make requested changes only
4. verify `git diff --name-only`
5. run syntax/static checks that apply
6. deploy preview first when practical:

```bash
vercel link --yes --scope pueoponos-projects --project paul-homepage
vercel deploy --scope pueoponos-projects --yes
```

7. deploy production only after explicit approval or clear restore instruction:

```bash
vercel deploy --prod --scope pueoponos-projects --yes
```

## 6) Auth & Access

- Vercel CLI is installed and was logged in as of the 2026-09-26 restore.
- Vercel scope: `pueoponos-projects`.
- Do not print env vars or secrets.
- If a deploy requires env secrets, verify presence by status/name only, never by value.

## 7) Required pre-deploy safety checks

From the checkout you intend to deploy:

```bash
git remote -v
git fetch origin main
git status -sb
git rev-parse HEAD
git rev-parse origin/main
git worktree list --porcelain
git diff --name-only
```

Stop if:

- the checkout is stale/diverged and not intentionally being used for a preview;
- unrelated dirty files are present;
- `git diff --name-only` includes unrelated pages/APIs/migrations;
- the path is `/Users/ponomini/.openclaw/workspace/paul-homepage`;
- you are about to overwrite production just to publish a small experimental tool.

## 8) Required post-deploy verification

Check these URLs after production deploy:

```text
https://coaching.paulcropper.com/
https://coaching.paulcropper.com/emailreview/
https://coaching.paulcropper.com/coachingpkg-signup.html
https://coaching.paulcropper.com/coachingpkg-signup-thank-you.html
```

For `/emailreview/`, browser-load the page and check console errors.

For route-specific changes, verify both the changed route and the important existing routes above.

## 9) Small tools / experiments

Small tools like Reveal Stroke UI should preferably be deployed to a separate tools project/subdomain:

- Vercel project: `paul-creative-tools` or `paul-labs`
- Domain: `tools.paulcropper.com` or `labs.paulcropper.com`
- Routes: `/reveal-stroke/`, `/shorts-review/`, `/audio-sync/`

Do not deploy the main coaching homepage from an old tree just to make a tool page live.
