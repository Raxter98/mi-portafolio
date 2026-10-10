# Quickstart Verification Guide: Portfolio Evolution & Multimedia Galleries

**Feature Directory**: `specs/002-portfolio-evolution`  
**Date**: 2026-10-09  
**Status**: Complete  

## Overview

This guide provides runnable commands and manual verification procedures to validate the Multimedia Portfolio Video and Image Galleries across responsiveness, YouTube facade playback, Lightbox modal keyboard controls, and i18n key parity.

---

## Runnable Verification Scenarios

### Scenario 1: TypeScript Compilation Check
* **Goal**: Confirm zero type errors across all newly added gallery components, interfaces, and data models.
* **Command**:
  ```bash
  npx tsc --noEmit
  ```
* **Expected Result**: Exits with status `0` and 0 error messages.

---

### Scenario 2: i18n Dictionary Key Parity Test
* **Goal**: Confirm 100% key parity between `locales/en.json` and `locales/es.json` for all new Video, Image, and Lightbox modal strings.
* **Command**:
  ```bash
  node -e '
    const en = require("./locales/en.json");
    const es = require("./locales/es.json");
    const enKeys = Object.keys(en.multimedia || {}).sort();
    const esKeys = Object.keys(es.multimedia || {}).sort();
    const missing = enKeys.filter(k => !esKeys.includes(k));
    if (missing.length > 0) {
      console.error("Missing keys in es.json:", missing);
      process.exit(1);
    }
    console.log("Multimedia i18n keys match perfectly:", enKeys);
  '
  ```
* **Expected Result**: Output confirms 0 missing keys.

---

### Scenario 3: YouTube Facade Embed & Lightbox Verification
* **Goal**: Verify Video Gallery click-to-play facade and Image Lightbox Modal keyboard controls.
* **Steps**:
  1. Launch dev server: `npm run dev`.
  2. Open browser to `http://localhost:3000/#multimedia`.
  3. Click **Video Gallery** sub-tab $\rightarrow$ verify responsive video cards ($16:9$ and Shorts $9:16$).
  4. Click play button on a video card $\rightarrow$ confirm YouTube iframe loads dynamically using `youtube-nocookie.com`.
  5. Click **Image Gallery** sub-tab $\rightarrow$ verify grid rendering without layout shift.
  6. Click an image card $\rightarrow$ confirm Lightbox Modal opens displaying high-resolution image, title, tool badges, and description.
  7. Press `Escape` key $\rightarrow$ verify Lightbox closes and focus returns to card.
  8. Press `ArrowLeft` / `ArrowRight` when Lightbox is open $\rightarrow$ verify seamless image navigation.

---

## Artifact References

* Feature Specification: [`specs/002-portfolio-evolution/spec.md`](file:///Users/user/Desktop/portafolio/mi-portafolio/specs/002-portfolio-evolution/spec.md)
* Implementation Plan: [`specs/002-portfolio-evolution/plan.md`](file:///Users/user/Desktop/portafolio/mi-portafolio/specs/002-portfolio-evolution/plan.md)
* Technical Research: [`specs/002-portfolio-evolution/research.md`](file:///Users/user/Desktop/portafolio/mi-portafolio/specs/002-portfolio-evolution/research.md)
* Data Models: [`specs/002-portfolio-evolution/data-model.md`](file:///Users/user/Desktop/portafolio/mi-portafolio/specs/002-portfolio-evolution/data-model.md)
* i18n Contract Schema: [`specs/002-portfolio-evolution/contracts/i18n-dictionary-schema.json`](file:///Users/user/Desktop/portafolio/mi-portafolio/specs/002-portfolio-evolution/contracts/i18n-dictionary-schema.json)
