# Implementation Tasks: Portfolio Evolution — Software Engineering, AI & Multimedia Portfolio (Galleries)

**Feature Directory**: `specs/002-portfolio-evolution`  
**Date**: 2026-10-09  
**Spec**: [spec.md](file:///Users/user/Desktop/portafolio/mi-portafolio/specs/002-portfolio-evolution/spec.md) | **Plan**: [plan.md](file:///Users/user/Desktop/portafolio/mi-portafolio/specs/002-portfolio-evolution/plan.md)

---

## Phase 1: Setup (Shared Infrastructure & Data Model)

**Purpose**: Project initialization, data models, and local gallery data setup

- [x] T001 Initialize feature workspace in `specs/002-portfolio-evolution/`
- [x] T002 [P] Define TypeScript interfaces for `VideoProjectItem`, `ImageProjectItem`, and `GalleryFilterCategory` in `types/portfolio-evolution.ts`
- [x] T003 [P] Initialize typed local data file `data/multimedia-gallery.ts` containing verified video and image project items

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core metadata and centralized translation dictionary expansion (BLOCKS all user stories)

- [x] T004 Update OpenGraph and Twitter social metadata in `app/layout.tsx` to feature Multimedia Computer Engineer title and preview images
- [x] T005 [P] Expand `locales/en.json` dictionary with `software`, `multimedia`, `skillsGrouped`, and updated `nav` objects
- [x] T006 [P] Expand `locales/es.json` dictionary with matching Spanish translation objects for `software`, `multimedia`, `skillsGrouped`, and updated `nav` objects

**Checkpoint**: Core translation resources and metadata ready — user story implementation can begin

---

## Phase 3: User Story 1 - Primary Software Engineering & Full-Stack Profile (Priority: P1) 🎯 MVP

**Goal**: Reframe Marcos Valero's primary identity as a Multimedia Computer Engineer specializing in software development across Web, Mobile, APIs, and Databases.

**Independent Test**: Verify Hero, About, and Software Development sections render with localized text and clear action buttons.

### Implementation for User Story 1

- [x] T007 [P] [US1] Update hero title, greeting text, typewriter role array, and call-to-action buttons in `components/welcome/page.tsx`
- [x] T008 [P] [US1] Update professional profile description in `components/subtittle/page.tsx` to highlight computer engineering degree and software background
- [x] T009 [P] [US1] Implement Software Development section component in `components/software/page.tsx` displaying 5 core pillars (Web Apps, Mobile Development, APIs & Microservices, Databases, Software Engineering Practices)
- [x] T010 [US1] Dynamically import and integrate `Software` component into `app/page.tsx` under `#software` anchor ID

**Checkpoint**: User Story 1 functional and independently testable (Software Engineering primary profile established).

---

## Phase 4: User Story 2 - Audiovisual & Video Gallery Showcase (Priority: P2)

**Goal**: Showcase cinematic AI videos, short films, video editing, and promotional work hosted on YouTube using lightweight deferred embeds.

**Independent Test**: Click video cards in Video Gallery, verify thumbnail facade, deferred `youtube-nocookie.com` player load, and "Watch on YouTube" direct link.

### Implementation for User Story 2

- [x] T011 [P] [US2] Create lightweight YouTube Facade Player component in `components/multimedia/VideoCard.tsx` (rendering thumbnail, play button overlay, and deferred `iframe` pointing to `youtube-nocookie.com`)
- [x] T012 [P] [US2] Support vertical YouTube Shorts ($9:16$ format) and direct "Watch on YouTube" accessible button links in `components/multimedia/VideoCard.tsx`
- [x] T013 [US2] Integrate Video Gallery grid in `components/multimedia/page.tsx` mapping `videoProjects` from `data/multimedia-gallery.ts`

**Checkpoint**: User Story 2 functional and independently testable (Video Gallery complete).

---

## Phase 5: User Story 3 - Visual Creation & Image Gallery Showcase with Lightbox Modal (Priority: P2)

**Goal**: Showcase AI art, concept art, cinematic frames, and promotional design with an accessible Lightbox Modal View.

**Independent Test**: Click image card in Image Gallery $\rightarrow$ verify Lightbox Modal displays artwork, title, tool badges, description, and keyboard navigation (`Esc`, `ArrowLeft`, `ArrowRight`).

### Implementation for User Story 3

- [x] T014 [P] [US3] Create Image Card component in `components/multimedia/ImageCard.tsx` displaying responsive visual creation projects with aspect ratio preservation
- [x] T015 [P] [US3] Implement accessible Lightbox Modal component in `components/multimedia/ImageLightboxModal.tsx` featuring high-res artwork, title, tool badges, description, background scroll lock, and keyboard listeners (`Escape`, `ArrowLeft`, `ArrowRight`)
- [x] T016 [US3] Integrate Image Gallery grid and Lightbox state management into `components/multimedia/page.tsx`

**Checkpoint**: User Story 3 functional and independently testable (Image Gallery with Lightbox complete).

---

## Phase 6: User Story 4 - Category Filtering & Gallery Navigation (Priority: P3)

**Goal**: Provide intuitive sub-navigation between Videos and Images, along with category filter buttons.

**Independent Test**: Click "Video Gallery" vs "Image Gallery" sub-tabs and category filter buttons in `components/multimedia/page.tsx`, observing card filtering.

### Implementation for User Story 4

- [x] T017 [P] [US4] Implement gallery sub-tabs (*Video Gallery* vs *Image Gallery*) and category filter buttons (*All*, *AI Short Films*, *Cinematic*, *Video Editing*, *AI Art*, *Concept Art*, *Promotional Design*) in `components/multimedia/page.tsx`
- [x] T018 [US4] Dynamically import and integrate `Multimedia` component into `app/page.tsx` under `#multimedia` anchor ID

**Checkpoint**: User Story 4 functional (Gallery sub-tabs & category filtering complete).

---

## Phase 7: User Story 5 - 100% Bilingual Localization & Accessibility (Priority: P4)

**Goal**: Ensure smooth anchor scrolling across all 8 section anchors and 100% Spanish/English localization parity.

**Independent Test**: Execute i18n key parity check and test desktop/mobile navbar section links on `http://localhost:3000`.

### Implementation for User Story 5

- [x] T019 [P] [US5] Update navigation links (`navLinks`) in `components/nav/page.tsx` to include `software` (`#software`) and `multimedia` (`#multimedia`) anchors
- [x] T020 [P] [US5] Bind root `<html>` `lang` attribute dynamically to active language in `context/LanguageContext.tsx`
- [x] T021 [P] [US5] Add localized `aria-label` attributes and accessible image alt texts across all gallery cards, filter buttons, and lightbox controls
- [x] T022 [US5] Refactor skills grid layout in `components/skills/page.tsx` into 4 discipline groups (*Software Engineering*, *AI & Automation*, *Multimedia Production*, *Infrastructure & Tools*)

**Checkpoint**: User Story 5 functional (Complete bilingual i18n and 8-anchor navigation complete).

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Code quality validation, type safety verification, and quickstart testing

- [x] T023 [P] Execute type check command (`npx tsc --noEmit`) to verify 0 TypeScript errors across all components
- [x] T024 [P] Run i18n dictionary key parity script to ensure 100% match between `en.json` and `es.json`
- [x] T025 Run quickstart scenarios in `specs/002-portfolio-evolution/quickstart.md` and mark feature status as Complete in `specs/002-portfolio-evolution/spec.md`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: Can start immediately.
- **Foundational (Phase 2)**: Depends on Setup completion — BLOCKS all user stories.
- **User Stories (Phases 3-7)**: Depend on Foundational completion (can be executed in priority order P1 → P2 → P3 → P4).
- **Polish (Phase 8)**: Depends on completion of User Stories 1-5.

---

## Implementation Strategy

### MVP Scope (User Story 1 Only)

1. Complete Phase 1 (Setup) and Phase 2 (Foundational).
2. Complete Phase 3 (User Story 1 - Software Engineering Profile & Software Section).
3. Test User Story 1 independently.

### Full Portfolio Evolution Scope (User Stories 1-5)

1. Complete MVP (US1).
2. Complete US2 (Video Gallery with YouTube Facade Embeds).
3. Complete US3 (Image Gallery with Lightbox Modal).
4. Complete US4 (Category Filtering & Gallery Sub-Tabs).
5. Complete US5 (Grouped Skills & 100% Bilingual Localization).
6. Execute Phase 8 (Polish & Verification).
