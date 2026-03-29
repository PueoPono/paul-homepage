# Text Editor MVP Plan

Last updated: 2026-03-28

## Goal
Create a web-based UI so Pauko can easily update website text without editing raw HTML.

## First MVP delivered
Location: `editor-v1/`

### Included
- structured site content file: `editor-v1/site-content.json`
- browser editor UI: `editor-v1/index.html`
- page list + block list
- editable fields for scalar text, bullet arrays, and feature arrays
- local save to browser storage
- JSON preview panel for portability and backup

## Current limitations
- edits are not yet wired into the live website automatically
- no publish button yet
- no full page visual preview yet
- content schema currently covers selected pages/blocks first

## Recommended next steps
1. expand content schema to all pages and all editable blocks
2. create a rendering script that injects content JSON into site pages
3. add preview mode for page/block output
4. add save-to-file workflow
5. add publish flow (commit + push)

## Safety value
This editor avoids direct hand-editing of HTML for routine text changes and creates a cleaner path toward safer updates.
