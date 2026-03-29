# Visual Editor 1

A first-pass visual annotation tool for the Paul homepage project.

## Purpose

Lets Pauko:
- load a site page
- click visible elements
- capture implementation notes tied to the clicked element
- export a structured instruction brief for the assistant to implement

## Current behavior

- page selector loads site pages in an iframe
- click any visible element to capture:
  - page
  - element type
  - DOM path
  - current visible text/summary
- add instruction type + priority + note
- copy or save export JSON

## Output

Exports `visual-implementation-brief.json`

This is intended to be pasted into chat in future sessions so the assistant can implement requested edits precisely.
