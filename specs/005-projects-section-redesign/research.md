# Technical Research & Architecture Decisions: Projects Section Redesign

**Feature**: `005-projects-section-redesign`
**Created**: 2026-10-11
**Status**: Completed

## 1. Executive Summary

This document establishes the technical and design research behind replacing the legacy 3D Three.js carousel (`ProjectCube`) with an **Interactive Editorial Stage & Cinematic Project Showcase**. The goal is to provide a visually compelling, professionally polished, accessible, and performant project showcase honoring Marcos Valero's authentic engineering work.

---

## 2. Research Topics & Architectural Decisions

### Research Item 1: Showcase Presentation Architecture (Replacing 3D WebGL)

- **Context**: The existing implementation uses Three.js to render a rotating 3D carousel cube in a WebGL canvas. While novel, 3D canvases suffer from blurry textures on Retina screens, lack of semantic HTML structure, awkward mobile drag controls, screen-reader opacity, and high memory/battery consumption.
- **Decision**: Transition completely from WebGL Three.js to an **Interactive Editorial Focus Stage & Dynamic Project Showcase** constructed with semantic React 18, Tailwind CSS, and lightweight Framer Motion transitions.
- **Rationale**:
  - Delivers crisp, pixel-perfect typography and high-definition imagery.
  - Native DOM elements provide full keyboard navigation, visible focus indicators, and WCAG 2.2 Level AA accessibility out of the box.
  - Eliminates requestAnimationFrame render loops and WebGL context loss risks.
  - Reduces page bundle weight and CPU/GPU memory footprint by over 70%.
  - Allows responsive stacking on mobile viewports that feels natural and touch-optimized.
- **Alternatives Considered**:
  - *Retaining Three.js with modified geometry (e.g. flat 3D cylinder)*: Rejected because canvas-based text and images remain non-accessible, difficult to read, and computationally heavy on mobile devices.
  - *Generic 3x3 Card Grid*: Rejected because the user explicitly prohibited generic card layouts and requested an innovative, editorial, award-winning experience.
  - *Full-page scroll-jacking slider*: Rejected because hijacking scroll on a single-page portfolio breaks anchor navigation (`#projects`, `#skills`, etc.) and causes user friction.

---

### Research Item 2: Spatial Layout & Editorial Composition

- **Context**: The projects section needs to stand out with an editorial, gallery-like feel while fitting seamlessly between the Software Engineering section and the Data Analysis Showcase.
- **Decision**: Implement an asymmetric dual-panel layout on desktop (`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12`), transitioning to a vertically stacked layout on tablet/mobile:
  - **Left Deck (lg:col-span-5)**: Curated Project Deck.
    - Section header and discipline filter pills ("Todos", "Apps Móviles", "Plataformas Web", "Sistemas y PWAs").
    - Project index counter (e.g., `01 / 09`) with active project metadata.
    - Large editorial typography with discipline tag and narrative description.
    - Comprehensive technology pill badges with subtle hover states.
    - Primary action controls: "Ver Detalles / View Details", "Ver Demo / Watch Video", and Previous/Next navigational steppers.
    - Interactive thumbnail/project list selector allowing direct jumping to any project.
  - **Right Stage (lg:col-span-7)**: Cinematic Focus Stage.
    - Full-bleed media container (`aspect-[16/10]`) with subtle rounded borders (`rounded-2xl`) and dark/light mode shadow illumination.
    - Dynamic switching between high-resolution imagery and native video preview for projects with video (Worldker).
    - Ambient radial glow matching the active project's primary accent.
    - Interactive overlay trigger for deep-dive inspection.
- **Rationale**: Keeps the project as the hero, balances visual impact with engineering rigor, and feels like an award-winning digital design agency case study.
- **Alternatives Considered**:
  - *Horizontal full-width carousel*: Less ergonomic for reading technology tags and long project descriptions.
  - *Accordion-style layout*: Too dense, hides project imagery.

---

### Research Item 3: Category Taxonomy & Project Classification

- **Context**: The portfolio contains 9 verified projects across diverse domains: mobile apps, institutional portals, and enterprise management tools.
- **Decision**: Define 4 structured discipline categories:
  1. `all` ("Todos" / "All"): Displays all 9 projects.
  2. `mobile` ("Apps Móviles" / "Mobile Apps"): 3 projects — Worldker, Perfect Trainer, TourTrack.
  3. `web` ("Plataformas Web" / "Web Platforms"): 2 projects — Archdiocese Institutional Portal, Town Hall Medellín.
  4. `enterprise_pwa` ("Sistemas y PWAs" / "Enterprise & PWAs"): 4 projects — Archdiocese Management System (CRUD), Auto Vidrios, Fiado PWA, Distribuciones J.C.C.R.P.
- **Rationale**:
  - Accurately mirrors Marcos's dual background in software engineering (web/enterprise) and mobile development.
  - Allows technical recruiters to filter by their specific hiring domain in a single click.
  - Guarantees non-empty states across all categories.
- **Alternatives Considered**:
  - *Tag-based multi-filter (filtering by individual technologies like React, Node, etc.)*: Overcomplicated; leads to empty search states and clumsy UI on mobile.

---

### Research Item 4: Media Handling, Video Playback & Asset Optimization

- **Context**: Worldker includes a high-impact demo video (`/video2.mp4`), while other projects feature high-resolution `.webp` and `.png` mockups.
- **Decision**:
  - Native HTML5 `<video>` element with `autoPlay`, `muted`, `loop`, `playsInline` attributes.
  - Explicit play/pause toggle button with accessible labels (`t.projects.playVideo` / `t.projects.pauseVideo`).
  - Next.js / HTML `<img>` elements with `loading="lazy"` and `aspect-[16/10]` responsive wrappers to prevent Layout Shift (CLS).
  - Subtle background skeletons while assets resolve.
  - Respect `prefers-reduced-motion` by pausing video autoplay and displaying the poster image.
- **Rationale**: Zero external player dependencies; optimal battery and bandwidth usage; bulletproof fallback behavior.
- **Alternatives Considered**:
  - *Third-party video libraries (Video.js, Player.js)*: Unnecessary bloat (+50KB gzip) for a simple local loop demo.

---

### Research Item 5: Deep-Dive Inspection Experience (Accessible Modal)

- **Context**: A visitor wanting to evaluate technical depth needs to inspect full descriptions, architecture notes, and larger imagery without leaving the homepage.
- **Decision**: An accessible dialog modal (`role="dialog"`, `aria-modal="true"`) that opens upon clicking "Ver Detalles" or clicking the project stage:
  - Traps keyboard focus inside the modal when active.
  - Closes on `Escape` key press or backdrop click.
  - Enables cycling between projects via `ArrowLeft` / `ArrowRight` or on-screen next/previous buttons without closing the modal.
  - Returns focus to the trigger element when dismissed.
- **Rationale**: Maximizes technical clarity while complying with WCAG 2.2 Level AA accessibility guidelines.
- **Alternatives Considered**:
  - *Inline accordion expanding inside the list*: Displaces surrounding layout and creates jarring page shifts.

---

### Research Item 6: Internationalization & Localization Architecture

- **Context**: The portfolio uses `LanguageContext` (`hooks/useTranslation.ts`) with `locales/es.json` and `locales/en.json`.
- **Decision**:
  - Reuse all existing project texts under `t.projects.items.*`.
  - Extend `locales/es.json` and `locales/en.json` under `projects.showcase` with UI labels for category filters, inspection actions, video controls, and navigation captions.
  - Ensure 100% string parity between Spanish and English.
- **Rationale**: Complete consistency with existing portfolio architecture, zero hardcoded strings.

---

## 3. Best Practices & Engineering Guidelines

1. **Clean Code & Modularity**:
   - `components/myProjects/page.tsx`: Orchestrator component managing active state, category filter, and modal visibility.
   - Clean sub-components or modular sections: `ProjectFilters`, `ProjectSpotlightStage`, `ProjectDeck`, `ProjectDetailModal`.
2. **Performance Constraints**:
   - Section render under 50ms.
   - Zero WebGL overhead.
   - Project switching response time < 100ms.
3. **Accessibility**:
   - Fully keyboard operable (`Tab`, `Shift+Tab`, `ArrowLeft`, `ArrowRight`, `Escape`, `Enter`).
   - Visible outline focus rings (`focus-visible:ring-2 focus-visible:ring-red-500`).
   - Motion reduced: `framer-motion` transition durations set to 0 when reduced motion is preferred.
