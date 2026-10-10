# Implementation Plan: Portfolio Evolution — Software Engineering, AI & Multimedia Portfolio (Galleries)

**Branch**: `002-portfolio-evolution` | **Date**: 2026-10-09 | **Spec**: [spec.md](file:///Users/user/Desktop/portafolio/mi-portafolio/specs/002-portfolio-evolution/spec.md)

**Input**: Feature specification from `/specs/002-portfolio-evolution/spec.md`

## Summary

Evolve the personal portfolio to showcase Marcos Valero's profile as a Multimedia Computer Engineer. Software development remains the primary professional focus, supported by a complete **Multimedia Portfolio** section with an interactive **Video Gallery** (YouTube / Shorts click-to-play facade embeds) and an **Image Gallery** (AI art, concept art, promotional design with accessible Lightbox modal view). All content is 100% localized in Spanish and English and preserves the single-page SPA layout (`app/page.tsx`).

## Technical Context

**Language/Version**: TypeScript ^5, Node.js, React 18.2.0  
**Primary Dependencies**: Next.js 15.0.7, Tailwind CSS 3.4.17, Three.js 0.185.1, Framer Motion 12.5.0, Lucide React, React Icons, Flowbite React  
**Storage**: Typed local TypeScript data file (`data/multimedia-gallery.ts`) & client-side `localStorage` for `portfolio_lang` preference  
**Testing**: Type checking (`npx tsc --noEmit`), i18n key parity script, and quickstart scenario checks  
**Target Platform**: Modern desktop, tablet, and mobile web browsers  
**Project Type**: Next.js App Router Web Application (Single-Page Layout)  
**Performance Goals**: Defer YouTube iframe embeds until user interaction (Click-to-Play Facade), 0 Cumulative Layout Shift (CLS) on image grids, smooth section scrolling  
**Constraints**: Zero framework replacements, 100% Spanish/English i18n localization, WCAG 2.2 AA accessibility targeting, preserve visual identity per Project Constitution v1.0.0  
**Scale/Scope**: 1 main page layout (`app/page.tsx`), 1 gallery data file (`data/multimedia-gallery.ts`), 1 multimedia showcase component (`components/multimedia/page.tsx`), 1 image lightbox modal component (`components/multimedia/ImageLightboxModal.tsx`), expanded translation JSONs (`en.json`, `es.json`)  

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] **1. Technology Stack Preservation**: Preserved. Next.js, React, TypeScript, Tailwind CSS, Three.js, and Framer Motion retained without framework changes.
- [x] **2. Architecture and Code Quality**: Maintained. Typed local data structures, reusable components, clear separation of UI and localization resources.
- [x] **3. Responsive Design & Cross-Device Compatibility**: Ensured. Video cards ($16:9$ and $9:16$ Shorts) and Image grids adapt across mobile ($375\text{px}$), tablet ($768\text{px}$), and desktop ($1440\text{px}$).
- [x] **4. i18n**: Preserved & Expanded. Centralized translation strings in `locales/en.json` and `locales/es.json`.
- [x] **5. Visual Identity & Design System**: Preserved. Red accent color (`bg-red-500`), zinc dark backgrounds, rounded cards, and backdrop blur styles maintained.
- [x] **6. Accessibility**: WCAG 2.2 AA targeted. Single `<h1>` heading in Hero, semantic `<h2>`/`<h3>` tags, localized `aria-label` attributes, keyboard navigation for modal (`Esc`, `ArrowLeft`, `ArrowRight`).
- [x] **7. Performance & SEO**: Deferred YouTube player loading (facade pattern), natural aspect ratio preservation (0 CLS), updated OpenGraph metadata.
- [x] **8. Security**: Privacy-conscious YouTube embeds (`youtube-nocookie.com`), no secrets or credentials exposed.
- [x] **9. Testing & Verification**: Empirical runtime verification of i18n switching, lightbox navigation, and responsive layouts.
- [x] **10. Backward Compatibility**: All existing verified projects (*Worldker*, *Archbishopric*, etc.) preserved without regressions.
- [x] **11. Spec-Driven Development**: Spec Kit workflow followed.
- [x] **12. Documentation**: Artifacts saved in `specs/002-portfolio-evolution/`.
- [x] **13. Implementation Discipline**: Verified against codebase.

## Project Structure

### Documentation (this feature)

```text
specs/002-portfolio-evolution/
├── spec.md              # Feature specification
├── plan.md              # Implementation plan (this file)
├── research.md          # Technical research, facade player & lightbox strategy
├── data-model.md        # Data models (VideoProjectItem, ImageProjectItem, FilterCategory)
├── quickstart.md        # Verification scenarios & execution guide
├── contracts/           # i18n translation dictionary contract schema
│   └── i18n-dictionary-schema.json
└── checklists/
    └── requirements.md  # Specification quality checklist
```

### Source Code Layout

```text
mi-portafolio/
├── app/
│   ├── layout.tsx       # Root layout, metadata & Providers wrapper
│   ├── page.tsx         # Single-page layout (#home, #about, #software, #projects, #multimedia, #skills, #education, #contact)
├── components/
│   ├── nav/page.tsx     # Navigation bar & mobile dropdown
│   ├── software/page.tsx # Software Development core section
│   ├── multimedia/
│   │   ├── page.tsx     # Multimedia Portfolio container, video gallery & image gallery tabs
│   │   ├── VideoCard.tsx # Video project card & click-to-play facade player
│   │   ├── ImageCard.tsx # Image project card & lightbox launcher
│   │   └── ImageLightboxModal.tsx # Accessible image lightbox modal (keyboard nav, focus trap)
│   ├── skills/page.tsx  # Grouped technical skills grid
│   └── contact/page.tsx # Contact section
├── data/
│   └── multimedia-gallery.ts # Typed local data for video and image projects
├── types/
│   └── portfolio-evolution.ts # TypeScript interfaces
└── locales/
    ├── en.json          # English translation keys
    └── es.json          # Spanish translation keys
```

**Structure Decision**: Single-Page App Router layout in `app/page.tsx` with dynamic component imports and modular sub-components in `components/multimedia/`.
