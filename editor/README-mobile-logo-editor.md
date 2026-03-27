# Mobile Header Logo Editor Prototype

Location: `editor/mobile-logo-editor.html`

This is a sandboxed, phone-first prototype for visually adjusting the **header logo on mobile** without touching the live `index.html`.

## How it works

- The editor loads a **test copy** of the homepage header + hero (`editor/mobile-home-preview.html`) inside a phone-shaped frame.
- That preview uses the same `styles.css` as the real site so layout and type match the live behaviour.
- Controls on the editor page directly manipulate the logo and overlay text in the iframe DOM (same-origin), so changes are applied in real time.

Nothing in this prototype writes to disk or edits the real homepage.

## Open this on a phone

From the `paul-homepage` folder, serve the site with any simple static server (for example `python -m http.server 8000`), then open:

- `http://localhost:8000/editor/mobile-logo-editor.html`

On a phone, this will show:

- A top bar with the editor title and **viewport presets** (Phone / Tall).
- A realistic phone frame containing the `mobile-home-preview.html` copy of the homepage.
- A control panel for the header logo.

## Controls implemented

**Viewport presets**

- Phone (390×720) – baseline mobile viewport.
- Tall (430×780) – a slightly taller, wider viewport.
- The iframe is scaled to fit the available width while preserving the chosen viewport size. Rotating the device triggers a rescale.

**Header Logo controls**

- **Logo size** – scales the heart/arrow logo image between 80–120%.
- **Text vertical offset** – moves the \"Vital & Strong\" + \"w/ Paul\" stack up/down relative to the logo.
- **Script text size** – scales the script font for both lines between 80–115%.
- **Nudge up / Nudge down** – quick 2px step adjustments for the text vertical offset.

**Presets**

- **Current** – approximates the existing mobile settings.
- **Compact** – slightly smaller logo and script, nudged upward (good for reducing header height on small screens).

## Implementation notes

- Preview HTML is intentionally minimal: just header + hero so performance is quick on a phone.
- All edits are performed with vanilla JS against the iframe `contentDocument` (no libraries required).
- The prototype uses and respects the existing mobile CSS rules in `styles.css` (including the `@media (max-width: 760px)` adjustments for the brand stack).

## Known limitations / next steps

- The editor currently only changes **visuals inside the sandbox preview**. There is no `Export` / `Copy CSS` flow yet.
- Adjustments are not persisted between reloads.
- Only the header logo stack is editable; future work could add controls for:
  - hero heading line lengths / font sizes
  - hero bottom logo size
  - header height and scroll breakpoint
- If the logo CSS changes in `styles.css`, the selectors used here (`.brand-mark.brand-mark--large.brand-mark--zoom`, `.brand-overlay-text`, `.brand-overlay-sub`) may need to be updated.

## What remains broken / open

- No direct mapping from chosen values → final CSS tokens for the production stylesheet.
- No way to save / name presets, or to view raw numeric values as CSS snippets.
- No guard rails yet for extremely small or large sizes beyond the current slider ranges.

This should be a solid starting point for iterating toward a full visual system editor for the mobile header.
