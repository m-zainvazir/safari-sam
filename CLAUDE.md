# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

"Safari Sam's Amazing World": a kids' (6+) interactive world based on Dr. Gerald Robison's *Because He Liked It!* books. Currently **UI prototypes only**. `CONTEXT-PROMPT.md` is a company-wide briefing (Leadership Books, Book Coach AI); this folder is the Safari Sam part of the larger `LeadershipBooks` repo (git root is one level up, branch `bookcoach-author-dashboard`).

Parked on purpose, do not build unless asked: Ask Safari Sam, interactive adventures, Sam videos, explorer badges, book QR codes, parent area.

## Hard constraints

- Zero cost: plain HTML/CSS/JS, no build step, no server, no accounts, no paid services. Pages must work by double-clicking `prototypes/index.html` (file://). Only Google Fonts need internet (fallback stack exists).
- Plans go in `plans/NN-<name>.md` (numbered). `plans/01-world-ui-prototypes.md` holds the gate list, the age-suitability swaps and the next steps.

## Commands

- Run: open `prototypes/index.html` in a browser (no dev server needed).
- Regenerate facts: from `prototypes/`, `node tools/build-facts.mjs` (`--all` lists every fact). There are no tests or linters.
- Image work and screenshots were done with node plus headless Edge over DevTools protocol (no Python installed).

## Architecture

Three alternative "main worlds" share one gate-scene engine; they differ only in how the child picks a gate.

- `prototypes/index.html`: chooser page. `option-a-street.html` (Explorer Street, scrolling row of gates), `option-b-island.html` (SVG island map with zoom; recommended), `option-c-updown.html` (vertical tower with iris transition).
- `shared/worlds.js`: **all content**: `window.SAFARI` with 4 neighbourhoods (`hoods`) and 21 places (`worlds`), each with creatures. Field meanings are documented in the file header. Change this to add or move creatures.
- `shared/facts.js`: **generated**, never edit by hand. `tools/build-facts.mjs` reads `../Gerald Robbin/Gerald Robinson Kids/Notes/1. BHLI-compiled-noref.md`, matches each creature's `k` name exactly, and writes the question/fact. A creature's `f` index picks a different fact when the first is unsuitable for a young child.
- `shared/scene.js` + `scene.css`: `window.SafariScene` (`open(id)`, `close()`, `sam(kind)`, `isOpen()`). Home and Zoo are hand-built scenes; the other 19 are "quick" scenes auto-built from the creature list by `kind` (land, glass, ice, water, deep, sky, night, under, space). Creature card flow: question and fact, then "Why did God do that?", then "BECAUSE HE LIKED IT!".
- `shared/hub.css`: shared top bar and Sam speech bubble.
- Sizing uses cqh/cqw container units and a seeded random layout; `prefers-reduced-motion` is respected. Light and dark themes both need to work.

## Gotchas

- Sam is real art: `shared/sam-standing.png` and `sam-smiling.png` are transparent cut-outs of `SS Character/` (originals untouched). `samImg(kind)` in `scene.js` maps kinds to files; add new poses to `SAM_ART`. Image paths are relative to the HTML page, so pages must stay in `prototypes/`.
- Creature pictures are emoji stand-ins (`e`) until illustrator art exists.
- A published private artifact of the prototypes exists (https://claude.ai/artifact/LdgakrKoCxKTTf4nSwRzBL); republish from `prototypes/index.html` with `root: prototypes` after changes.
