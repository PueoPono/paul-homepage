# decisions.md — Approved / Notable Website Decisions

This file records durable decisions so future sessions can continue without guessing.

## Branding / Naming

### Approved
- Site title: `Men's Health | Vitality Coaching`

### Historical names used during build
- `Paul Cropper | Integrated Heart & Vitality`
- `Integrated Heart & Vitality Coaching`

## Logo / Header

### Current intended logo text
- Primary line: `Vitality`
- Secondary line: `w/ Paul`

### Important note
Logo styling has been fragile and has regressed more than once due to:
- inline overrides
- incomplete propagation from test pages
- desktop/mobile font divergence

Before further header logo edits:
- inspect both `index.html` and `styles.css`
- remove conflicting inline overrides first if present

## Desktop Hero Copy

Approved desktop hero phrasing used in later tests:
- Hero subline: `HEART & VITALITY COACHING`
- Headline lines:
  1. `Align the Heart.`
  2. `Train and Enjoy the Body.`
  3. `Calm the Mind.`
- Signature: `Dr. Paul, PhD`

## Copy Editing System

### Approved direction
A structured editing system is better than repeated direct HTML editing.

### Current v1 implementation
- `editor-v1/homepage-content.json` = structured homepage copy source for editor v1
- `editor-v1/index.html` = editing UI
- `editor-v1/preview-homepage.html` = rendered preview

### Known limitation
Editor v1 does not yet publish automatically back into the real homepage.

## Preferred Workflow

### Approved direction
Build a focused website editing tool rather than relying on repeated manual CSS nudges.

The preferred layered model is:
1. structured content layer
2. style/layout layer
3. page structure layer

## Test Pages / Experiments

### Important historical note
Multiple test pages were created during logo and hero tuning:
- `test1`–`test6`
- `page10`–`page13`

These were later deleted from GitHub when user requested cleanup.
Do not assume they still exist.

### Rule
If future experiments are needed:
- use isolated numbered pages
- do not assume permanence
- promote approved changes carefully into shared files
- clean up afterward if requested

## Current Unresolved / Sensitive Area

### Header logo parity
User explicitly reported:
- mobile and desktop logo fonts did not match
- approved test-page styling was not preserved accurately during propagation

Treat this as unresolved/sensitive until visually re-verified.
Do not assume the current live state fully matches user intent without checking.

## Current Copy Notes

User indicated:
- much of the website text is still placeholder text
- the website editing system should primarily help replace placeholder copy with real copy

## Reference Files For Whole-Site Review

Use these when reviewing site structure and copy:
- `planning/full-coaching-website-plan.md`
- `planning/text-map-template.md`

`planning/text-map-template.md` is the main editable map for whole-site copy/script review.
