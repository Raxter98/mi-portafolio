# Phase 0: Research & Component Architecture (Video & Image Galleries)

**Feature Directory**: `specs/002-portfolio-evolution`  
**Date**: 2026-10-09  
**Status**: Complete  

## 1. Technical Decisions & Rationale

### Decision 1: Lightweight YouTube Click-to-Play Facade Pattern
* **Decision**: Implement a YouTube Facade Player component (`VideoCard.tsx`). The card renders a static thumbnail (`https://img.youtube.com/vi/{id}/hqdefault.jpg` or local thumbnail), title, category tag, and play button overlay. Clicking play dynamically creates an `<iframe>` pointing to `https://www.youtube-nocookie.com/embed/{youtubeId}?autoplay=1`.
* **Rationale**: Loading third-party YouTube iframes directly during initial page rendering dramatically degrades Core Web Vitals (LCP, TBT) and introduces unwanted third-party tracking scripts. The facade pattern defers iframe initialization until explicit user interaction, cutting initial page bundle weight by $> 500\text{KB}$ per video.
* **Alternatives Considered**: Embedding active YouTube `<iframe>`s immediately on page mount. Rejected due to severe performance degradation.

---

### Decision 2: Accessible Image Lightbox Modal Architecture
* **Decision**: Build an accessible `ImageLightboxModal.tsx` component.
  * Triggered when a user clicks an image card in the Image Gallery.
  * Locks background body scrolling (`document.body.style.overflow = "hidden"`).
  * Implements keyboard event listeners: `Escape` closes modal, `ArrowLeft` / `ArrowRight` navigate to previous/next image project.
  * Features a prominent close button (`X` icon), focus trap, and background blur overlay (`bg-black/80 backdrop-blur-md`).
  * Displays full image, localized title, category tag, tool badges (`Midjourney v6`, `Flux`, `ComfyUI`, `Photoshop`), description, and accessibility `alt` text.
* **Rationale**: Provides an immersive, high-resolution viewing experience targeting WCAG 2.2 AA accessibility requirements without leaving the portfolio page.

---

### Decision 3: Typed Local Data File Management
* **Decision**: Store all gallery project items in a typed TypeScript file at `data/multimedia-gallery.ts`.
* **Rationale**: Eliminates the overhead and security risks of setting up external databases or CMS endpoints. Adding a new video or image project requires only adding an entry to `data/multimedia-gallery.ts` without modifying component JSX code.

---

### Decision 4: Aspect Ratio & Layout Shift (CLS) Prevention
* **Decision**: Apply Tailwind aspect ratio classes to all media containers:
  * Standard YouTube Videos: `aspect-video` ($16:9$)
  * YouTube Shorts: `aspect-[9/16]` ($9:16$ vertical format)
  * Square Artwork: `aspect-square` ($1:1$)
  * Portrait Artwork: `aspect-[3/4]` or `aspect-[4/5]`
* **Rationale**: Guarantees fixed container dimensions while images or thumbnails load asynchronously, achieving $0.00$ Cumulative Layout Shift (CLS).

---

## 2. Component Composition Diagram

```
components/multimedia/
├── page.tsx                 # Main section container (#multimedia)
│   ├── Sub-Navigation Tabs  # [Video Gallery] vs [Image Gallery]
│   ├── Category Filters     # [All] [AI Shorts] [Cinematic] [AI Art] [Concept Art] [Design]
│   ├── Video Gallery Grid   # Maps videoProjects from data/multimedia-gallery.ts
│   │   └── VideoCard.tsx    # Click-to-Play Facade Player + "Watch on YouTube" link
│   └── Image Gallery Grid   # Maps imageProjects from data/multimedia-gallery.ts
│       └── ImageCard.tsx    # Responsive Image Card + Lightbox Launcher
└── ImageLightboxModal.tsx   # Fullscreen Lightbox Modal (Keyboard Nav & Focus Trap)
```
