# Feature Specification: Interactive Projects Section Redesign

**Feature Branch**: `005-projects-section-redesign`

**Created**: 2026-10-11

**Status**: Draft

**Input**: User description: "Redesign the interactive projects section of my existing professional portfolio website (https://www.marcosvalero.com/) from the ground up. The current 3D interactive carousel does not meet my visual expectations and must be replaced with a completely different, more innovative, visually compelling, and professionally polished experience. I grant full creative freedom to rethink the visual concept, layout, interactions, and presentation of this section..."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Interactive Editorial Showcase & Visual Focus Stage (Priority: P1)

A visitor exploring the portfolio scrolls to the `#projects` section and experiences a commanding, editorial-grade project showcase. The interface highlights the active project with prominent visual dominance: high-resolution imagery, project index numbering (e.g., `01 / 09`), bilingual title, descriptive summary, and tech-stack badges. The visitor can effortlessly browse across all verified projects through an intuitive navigation strip or interactive project list, immediately updating the main spotlight stage with smooth, responsive transitions and zero disorienting 3D transformations.

**Why this priority**: Presenting Marcos Valero's engineering work clearly and memorably is the core purpose of the portfolio. Replacing the awkward 3D carousel with a polished, high-impact presentation delivers immediate primary value to recruiters and clients.

**Independent Test**: Can be tested independently by navigating to `#projects`, browsing each project from the master selector, and verifying that the primary spotlight displays the corresponding title, description, image, and technologies correctly for all 9 existing projects without 3D canvas dependencies.

**Acceptance Scenarios**:

1. **Given** a visitor lands on the `#projects` section, **When** the section enters the viewport, **Then** the primary showcase displays the first project (Worldker) with its full visual preview, title, category, summary description, and associated technology pills.
2. **Given** the showcase is active, **When** the visitor selects another project from the interactive project selector or navigation controls, **Then** the spotlight stage transitions seamlessly to present the selected project's authentic details, media, and technology badges.
3. **Given** any of the 9 verified projects is active, **When** inspecting its presented data, **Then** the project name, description, and technologies match the verified portfolio repository records without fabricated metrics or missing fields.

---

### User Story 2 - Discipline & Category Filtering (Priority: P2)

A recruiter or engineering manager interested specifically in mobile development or enterprise systems can filter the project showcase by discipline (e.g., "All / Todos", "Mobile Apps / Aplicaciones Móviles", "Web Platforms / Plataformas Web", "Enterprise & PWAs / Sistemas y PWAs"). Selecting a category filters the available project index and automatically focuses the showcase on the first project within the chosen category, updating total count indicators smoothly.

**Why this priority**: Marcos has diverse engineering experience spanning native/cross-platform mobile apps, institutional web portals, and enterprise administrative systems. Category filtering allows visitors to immediately assess the exact skill profile they are recruiting for.

**Independent Test**: Can be tested independently by clicking each category filter button, verifying that only projects belonging to that discipline are listed in the selector, and confirming the counter reflects the filtered subset.

**Acceptance Scenarios**:

1. **Given** the filter bar is set to "All", **When** the visitor clicks "Mobile Apps", **Then** the showcase filters the list to show Worldker, Perfect Trainer, and TourTrack, updating the active project to the first item of that category.
2. **Given** a category filter is active with fewer items, **When** the visitor switches back to "All", **Then** all 9 projects are restored in the index with their original sequence preserved.
3. **Given** the active language is switched between Spanish and English, **When** viewing the category filter labels, **Then** all filter buttons and active counters display the corresponding localized strings.

---

### User Story 3 - Interactive Media Preview & Deep-Dive Inspection (Priority: P3)

A visitor evaluating technical depth can interact with rich project assets. When a project includes video (such as the Worldker mobile app demo), the visitor can toggle the live video preview directly within the spotlight stage or view an expanded media inspection view. For projects with image assets, clicking an inspect or view action opens a focused detail overlay/drawer displaying the comprehensive project summary, full technology stack, and expanded high-resolution imagery.

**Why this priority**: Video demos and full-bleed visual assets demonstrate real, working software rather than static concept art, significantly elevating credibility for potential clients and employers.

**Independent Test**: Can be tested independently by selecting Worldker, triggering video playback, pausing or closing, and selecting other projects to verify high-resolution image viewing and detail inspection modal/overlay behavior.

**Acceptance Scenarios**:

1. **Given** the active project has an available video file (`/video2.mp4`), **When** the visitor clicks the video preview trigger, **Then** the video plays smoothly within the showcase frame with audio muted by default and accessible pause/stop controls.
2. **Given** the active project has only image media, **When** viewing the media stage, **Then** no broken video controls appear, and the image renders with high visual fidelity and graceful loading.
3. **Given** the visitor clicks the project detail action, **When** the inspection overlay opens, **Then** the full project narrative, complete technology badges, and navigation arrows allow cycling through projects without leaving the inspection experience.
4. **Given** the inspection overlay is open, **When** the visitor presses the Escape key or clicks the dismiss button, **Then** the overlay closes and focus returns to the triggering element.

---

### User Story 4 - Accessible & Responsive Cross-Device Navigation (Priority: P4)

A visitor browsing on a smartphone, tablet, or using keyboard navigation / screen readers can navigate all projects with full usability. On mobile devices, the layout transitions to a vertically stacked, touch-friendly editorial layout with swipe/tap project switching and clear touch targets (minimum 44x44px). Keyboard users can navigate the project index using Tab and arrow keys, with prominent focus indicators and full screen reader accessibility. Users with reduced motion preferences experience instant state changes without motion sickness.

**Why this priority**: Conforms with WCAG 2.2 AA and portfolio constitution principles, ensuring that all visitors regardless of device or ability have a flawless experience.

**Independent Test**: Can be tested by navigating the section using only the keyboard (`Tab`, `Enter`, Arrow keys), testing on mobile viewport widths (375px, 768px), and enabling `prefers-reduced-motion` in browser settings.

**Acceptance Scenarios**:

1. **Given** a user navigates using only the keyboard, **When** tabbing into the projects section, **Then** every interactive element (filters, project selector items, media triggers, modal controls) has a visible, high-contrast focus indicator.
2. **Given** a mobile viewport (e.g., 375px width), **When** interacting with the projects section, **Then** there is zero horizontal scroll overflow, media scales responsively while preserving aspect ratios, and touch targets meet minimum 44x44px sizing.
3. **Given** the user has `prefers-reduced-motion: reduce` enabled, **When** switching projects or toggling filters, **Then** visual updates occur instantaneously without sliding, scaling, or disorienting transitions.

---

### Edge Cases

- **Missing or Broken Video File**: If a project's video asset fails to load or is not present, the interface must gracefully fall back to displaying the high-resolution project poster image without showing broken video player artifacts or blank spaces.
- **Missing or Slow-Loading Image**: If an image asset is loading over a slow connection, a themed subtle placeholder/skeleton matching the project container dimensions must be shown until the asset loads, preventing layout shift.
- **Viewport Extremes**:
  - Very small mobile screens (320px): Project title, tags, and navigation must wrap cleanly without text truncation or button overlap.
  - Ultra-wide screens (4K / 2560px+): Content must remain contained within the portfolio's max-width container (`max-w-7xl`) with centered alignment.
- **Fast Rapid Switching**: If a visitor rapidly clicks through project selector items, pending asset transitions or video loads must cancel gracefully without race conditions or overlapping audio/video streams.
- **Language Switch While Inspecting**: If the language toggle in the navigation bar is toggled while inspecting a project, all titles, descriptions, filter tags, and counter strings must update instantaneously to the target language without losing the currently selected project index.
- **Dark / Light Theme Consistency**: In both light and dark modes, all text, backgrounds, borders, technology badges, and modal overlays must maintain WCAG AA contrast ratios (minimum 4.5:1 for normal text, 3:1 for large text and UI components).

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The system MUST replace the existing 3D Three.js carousel/cube in `components/myProjects/page.tsx` with a non-3D, editorial-grade interactive project exploration experience.
- **FR-002**: The system MUST showcase all 9 verified portfolio projects:
  1. Worldker Mobile App
  2. Archdiocese Institutional Portal (`arzobispadoWeb`)
  3. Archdiocese Management System (`arzobispadoCrud`)
  4. Town Hall Medellín Event Platform (`alcaldia`)
  5. Auto Vidrios Management System (`autovidrios`)
  6. Fiado Financial PWA (`fiado`)
  7. Distribuciones J.C.C.R.P. Inventory System (`jccrp`)
  8. Perfect Trainer Mobile App (`perfecttrainer`)
  9. TourTrack Native Mobile App (`tourtrack`)
- **FR-003**: The system MUST NOT fabricate any project names, achievements, metrics, external URLs, or features not present in the existing repository data.
- **FR-004**: The system MUST present for each project: project title, descriptive narrative, primary visual media (image or video), technology badges, and category discipline.
- **FR-005**: The system MUST provide an interactive project selector that allows visitors to directly select and spotlight any project from the collection.
- **FR-006**: The system MUST provide discipline-based category filtering ("All", "Mobile Apps", "Web Platforms", "Enterprise Systems & PWAs") to allow quick segmentation of engineering work.
- **FR-007**: When switching between projects or categories, the system MUST recalculate active index positions and counters accurately (e.g., `01 / 09` or `02 / 03`).
- **FR-008**: For projects containing a video asset (Worldker), the system MUST allow interactive video playback with default muted audio, play/pause controls, and clear visual indications of playback state.
- **FR-009**: The system MUST provide an expanded inspection modal or drawer allowing deep-dive inspection of project details, full media preview, and continuous navigation between projects.
- **FR-010**: The system MUST support full internationalization in both Spanish (`es`) and English (`en`), using the portfolio's existing translation keys and localization system without hardcoded strings.
- **FR-011**: The system MUST be fully responsive, providing an optimized multi-column editorial presentation on desktop/laptop displays and an ergonomic, single-column touch-friendly flow on tablets and mobile phones.
- **FR-012**: The system MUST be fully keyboard-navigable, supporting Tab focus, Enter/Space activation, and Escape to dismiss the modal/overlay.
- **FR-013**: The system MUST respect user motion preferences, disabling non-essential transitions when `prefers-reduced-motion: reduce` is active.
- **FR-014**: The system MUST maintain visual harmony with the portfolio's established design language (red accent palette `text-red-500` / `bg-red-500`, dark/light theme tokens, and typography conventions).
- **FR-015**: The system MUST be modular and extensible, allowing future projects to be added by appending data entries to the project configuration without restructuring component markup or layouts.

### Key Entities

- **Project**:
  - `id`: Unique project identifier key corresponding to translation schema (e.g., `worldker`, `arzobispadoWeb`, `fiado`).
  - `title`: Localized title of the project.
  - `text`: Localized narrative summary of the project.
  - `category`: Discipline classification (`mobile`, `web`, `enterprise_pwa`).
  - `imageUrl`: Public path to the high-resolution preview image.
  - `videoUrl`: Optional public path to the demonstration video asset (e.g., `/video2.mp4`).
  - `technologies`: Array of technology labels (e.g., `["React Native", "Firebase", "i18n", "MySQL", "Git"]`).
  - `featured`: Optional boolean flag indicating priority in the initial presentation.
- **Category Filter**:
  - `id`: Filter identifier (`all`, `mobile`, `web`, `enterprise_pwa`).
  - `label`: Localized display name for the filter button.
  - `count`: Computed number of projects matching the category.

## Creative Direction Evaluation

In accordance with the feature requirements, alternative creative directions were evaluated:

1. **Direction A — Interactive Editorial Stage & Cinematic Project Showcase (Selected)**:
   - *Concept*: An asymmetric, high-impact editorial layout inspired by premium design agency portfolios and editorial magazines. A dominant visual stage showcases the active project's high-definition imagery or video, accompanied by an interactive project index, discipline filters, technology badges, and an accessible deep-dive inspection drawer.
   - *Strengths*: Projects are the primary visual hero; typography and composition are deliberate and refined; eliminated heavy WebGL rendering loops; excellent mobile ergonomics and keyboard accessibility; perfectly scalable for future projects.
2. **Direction B — 3D Carousel / Cube (Previous Implementation - Rejected)**:
   - *Flaws*: Visual distortion on cube faces; poor readability on tilted planes; heavy Three.js canvas overhead; clunky mobile touch interaction; low accessibility for screen readers and keyboard users.
3. **Direction C — Standard Card Grid (Rejected)**:
   - *Flaws*: Visually generic and uninspiring; does not provide the cinematic focus or interactive editorial polish requested by the user.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of the 9 verified projects from the existing portfolio are displayed with their correct titles, descriptions, images, and technologies in both Spanish and English.
- **SC-002**: Elimination of 3D canvas dependencies in the projects section, reducing section JavaScript execution overhead and eliminating WebGL context creation errors.
- **SC-003**: The section is 100% navigable using keyboard-only inputs (`Tab`, `Shift+Tab`, `Enter`, `Space`, `Escape`), with visible focus indicators on all interactive controls.
- **SC-004**: Zero horizontal layout overflow or clipped content across all standard viewport widths from 320px up to 2560px+.
- **SC-005**: Project transitions respond within 150ms of user selection on standard mobile and desktop devices.
- **SC-006**: Complete internationalization parity: zero hardcoded strings; 100% of labels, headings, filter tags, and project descriptions toggle accurately between Spanish and English.
- **SC-007**: 100% compliance with `prefers-reduced-motion: reduce`, ensuring all transitions and autoplay motions are suppressed when the preference is detected.

## Assumptions

- The existing media assets (`/worldker.png`, `/video2.mp4`, `/arzobispado.webp`, `/crud.webp`, `/projects/Alcaldia.webp`, `/projects/AutoVidrios.webp`, `/projects/Fiado.webp`, `/projects/Jccrp.webp`, `/projects/perfecttrainer.webp`, `/projects/TourTrack.webp`) remain in their current public directory locations.
- The section will remain anchored at `#projects` in `app/page.tsx`, preserving external and internal navigation links.
- The existing translation files `locales/es.json` and `locales/en.json` will be extended with any new UI labels required for the redesigned showcase (such as category filter names and editorial captions) while preserving existing keys under `projects.items`.
- Future projects can be added by declaring a new item in the project dataset configuration and adding corresponding translation keys without modifying layout or presentation logic.
