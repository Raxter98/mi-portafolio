# Quickstart & Validation Guide: Projects Section Redesign

**Feature**: `005-projects-section-redesign`
**Created**: 2026-10-11
**Status**: Ready for Implementation Validation

## 1. Overview

This document outlines the step-by-step verification procedures to validate that the redesigned interactive projects section meets all functional requirements (FR-001 through FR-015) and success criteria (SC-001 through SC-007).

---

## 2. Prerequisites & Environment Setup

- Node.js 18+ installed.
- Dependencies installed: `npm install`.
- Local development server launched:
  ```bash
  npm run dev
  ```
  Open `http://localhost:3000` in a desktop browser.

---

## 3. End-to-End Validation Scenarios

### Scenario 1: Initial Presentation & Featured Spotlight
1. Open `http://localhost:3000` and navigate or scroll to the `#projects` section.
2. Verify that the section header renders with the styled badge, bilingual title, and introductory subtitle.
3. Verify that the primary showcase spotlights the featured project (**Worldker Mobile App**):
   - Counter displays `01 / 09`.
   - Category pill displays "Apps Móviles" (ES) or "Mobile Apps" (EN).
   - Technology badges display: React Native, Firebase, i18n, MySQL, Git.
   - High-resolution visual mockup is sharp and properly formatted (`aspect-[16/10]`).
4. Verify that no 3D canvas, WebGL warnings, or console errors are emitted.

### Scenario 2: Discipline Filtering & Dynamic Indexing
1. Click the "Plataformas Web" / "Web Platforms" category button.
2. Verify that:
   - The active project immediately updates to the first web project (**Portal Institucional Arzobispado**).
   - The total counter updates to reflect the filtered set (e.g. `01 / 02`).
   - The project selector index lists only the 2 web projects.
3. Click "Sistemas y PWAs" / "Enterprise & PWAs".
   - Verify that the 4 enterprise projects appear (Arzobispado CRUD, AutoVidrios, Fiado PWA, JCCRP).
4. Click "Todos" / "All".
   - Verify that all 9 projects are restored in the original sequence.

### Scenario 3: Video Demo Playback (Worldker)
1. Select the **Worldker** project in the showcase.
2. Verify that a "Ver Demostración" / "Watch Demo" play button is visible.
3. Click the play button.
4. Verify that `/video2.mp4` plays smoothly within the spotlight frame, muted by default.
5. Click "Detener Video" / "Stop Video" or switch to another project.
6. Verify that video playback stops immediately without audio leakage or console errors.

### Scenario 4: Deep-Dive Inspection Modal
1. On any project, click the "Ver Detalles" / "View Details" button or click directly on the media card.
2. Verify that the inspection modal opens with backdrop blur (`backdrop-blur-md`).
3. Verify that focus is trapped within the dialog.
4. Press `ArrowRight` or click the next arrow:
   - Verify the modal seamlessly advances to the next project without closing.
5. Press `Escape`:
   - Verify the modal closes immediately and keyboard focus returns to the triggering button.

### Scenario 5: Internationalization (ES / EN Parity)
1. In the top navigation bar, toggle the language button from ES to EN.
2. Verify that without reloading:
   - Section title updates to "FEATURED PROJECTS & ENGINEERING WORK".
   - Category filters update to "All Projects", "Mobile Apps", "Web Platforms", "Enterprise & PWAs".
   - Project titles and descriptions update to English.
   - Action buttons update ("View Details", "Watch Demo").
3. Toggle back to ES and confirm that Spanish strings restore cleanly.

### Scenario 6: Mobile & Tablet Responsiveness
1. Open browser developer tools and toggle device emulation (e.g., iPhone 14 Pro, 393px width; iPad, 768px width).
2. Verify that:
   - Layout stacks vertically without horizontal scroll overflow (`overflow-x-hidden`).
   - Touch targets for all buttons and tabs are at least 44x44px.
   - Project navigation steppers and dots are easily tapable.
   - Typography scales gracefully without overlapping.

### Scenario 7: Accessibility & Reduced Motion
1. In browser settings or DevTools, emulate `prefers-reduced-motion: reduce`.
2. Cycle through projects and category filters.
3. Verify that transitions update instantaneously without sliding or scaling animations.
4. Navigate through the entire section using only the `Tab` and `Enter` keys.
5. Verify that every interactive element displays a distinct, high-contrast focus ring.

---

## 4. Automated Verification Commands

Run the repository verification suite to guarantee zero linting regressions or build breaks:

```bash
# 1. Type checking and linting
npm run lint

# 2. Production build verification
npm run build
```

**Expected Result**: Both commands must exit with code `0` and 0 errors.
