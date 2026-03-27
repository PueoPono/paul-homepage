# Website Editor V1

Homepage copy editor prototype.

## Files
- `editor-v1/index.html` — editor UI
- `editor-v1/preview-homepage.html` — rendered homepage preview reading from structured content
- `editor-v1/homepage-content.json` — structured homepage copy source for v1

## Goal
Move homepage placeholder/content editing out of hardcoded HTML and into a simple editable source of truth.

## Current limitations
- Save is local-only for now (device localStorage)
- Preview reads from `homepage-content.json`
- Editor does not yet write back into repo automatically
- Only part of homepage content is covered in this first pass

## Next steps
1. Expand content coverage
2. Add export/save-to-file flow
3. Wire actual site/test page to structured content
4. Add desktop/mobile visual controls in the same tool
