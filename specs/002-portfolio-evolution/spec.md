# Feature Specification: Portfolio Evolution — Software Engineering, AI & Multimedia Portfolio (Galleries)

**Feature Directory**: `specs/002-portfolio-evolution`

**Created**: 2026-10-09

**Status**: Draft (Updated)

**Input**: User description: "/speckit-specify Update the existing portfolio evolution specification to include a complete multimedia portfolio for showcasing my audiovisual and visual creation projects. Support dedicated Video and Image galleries, YouTube embeds, responsive image lightbox, category filters, and complete bilingual localization while preserving software engineering as the primary professional specialty."

## 1. Executive Summary & Architecture Fit

This specification evolves the personal portfolio to showcase Marcos Valero's professional profile as a **Multimedia Computer Engineer**. Software engineering remains the primary discipline, complemented by a dedicated **Multimedia Portfolio** section containing an interactive **Video Gallery** (YouTube / Shorts with lightweight deferred embeds) and an **Image Gallery** (AI art, concept art, promotional design, with an accessible lightbox modal view).

To preserve the portfolio's established single-page architecture and Constitution principles, all galleries render within a unified `#multimedia` section component on [`app/page.tsx`](file:///Users/user/Desktop/portafolio/mi-portafolio/app/page.tsx) without adding multi-page routes, external databases, or CMS dependencies.

---

## 2. User Scenarios & Testing *(mandatory)*

### User Story 1 - Primary Software Engineering & Full-Stack Profile (Priority: P1) 🎯 MVP

As a potential employer or software client, I want to immediately understand Marcos Valero's primary identity as a Multimedia Computer Engineer and Software Developer (Web, Mobile, Full Stack), so that I can evaluate his software engineering background before exploring creative works.

**Why this priority**: Core objective #1 states that software engineering must remain the primary professional focus.

**Independent Test**: Verified by reviewing the Hero, About, and Software Development sections, confirming headline positioning, role badges, and primary contact links.

**Acceptance Scenarios**:

1. **Given** a visitor loading the portfolio, **When** reading the Hero and About sections, **Then** software engineering and full-stack/mobile development are highlighted as the primary discipline.
2. **Given** a visitor exploring the Software Development section (`#software`), **When** reviewing the 5 core pillars, **Then** technical competencies in Next.js, React Native, Node.js, and databases are presented with localized descriptions.

---

### User Story 2 - Audiovisual & Video Gallery Showcase (Priority: P2)

As a creative director, client, or recruiter, I want to explore a dedicated Video Gallery featuring cinematic AI videos, short films, video editing, and promotional work hosted on YouTube, so that I can preview his video production capabilities.

**Why this priority**: Core objective #2.A requires an accessible, responsive video showcase supporting standard YouTube videos and YouTube Shorts.

**Independent Test**: Can be tested independently by navigating to `#multimedia` $\rightarrow$ Video Gallery, clicking video thumbnails to load the lightweight player, and using the "Watch on YouTube" direct link.

**Acceptance Scenarios**:

1. **Given** a visitor browsing the Video Gallery, **When** viewing video cards, **Then** each item displays a responsive thumbnail, title, short description, category badge, production tools, and duration/date (when verified).
2. **Given** a visitor clicking a video card play button, **When** activated, **Then** the YouTube video player loads dynamically in-place or via detail modal using a privacy-conscious facade (`youtube-nocookie.com`) without blocking initial page load performance.
3. **Given** a YouTube Short or vertical format video, **When** displayed in the gallery, **Then** the card maintains a vertical $9:16$ or $4:5$ aspect ratio without distortion.
4. **Given** a video thumbnail that fails to load, **When** rendered, **Then** the system displays a graceful fallback preview card with a direct link to watch on YouTube.

---

### User Story 3 - Visual Creation & Image Gallery Showcase (Priority: P2)

As a visual designer, client, or visitor, I want to browse an Image Gallery featuring AI-generated artwork, concept art, cinematic frames, and promotional design, so that I can inspect high-resolution images in an accessible lightbox viewer.

**Why this priority**: Core objective #2.B requires a responsive image grid/masonry with fluid aspect ratio preservation and accessible detail modal viewing.

**Independent Test**: Verified by clicking any image card in the Image Gallery, observing the lightbox modal opening with high-resolution image, title, tool tags, keyboard navigation (`Esc`, `ArrowLeft`, `ArrowRight`), and close control.

**Acceptance Scenarios**:

1. **Given** a visitor viewing the Image Gallery, **When** scrolling the grid, **Then** images render in a fluid responsive grid preserving natural aspect ratios without layout shifts (CLS).
2. **Given** a visitor clicking an image card, **When** opened, **Then** an accessible lightbox modal displays the artwork, title, category, tool badges (Midjourney, Flux, ComfyUI, Photoshop), alt text, and close control.
3. **Given** a visitor navigating via keyboard, **When** the lightbox is open, **Then** pressing `Escape` closes the modal, and `ArrowLeft` / `ArrowRight` navigate between adjacent gallery images.
4. **Given** a user with reduced motion enabled (`prefers-reduced-motion: reduce`), **When** interacting with the gallery or lightbox, **Then** smooth zoom animations are disabled.

---

### User Story 4 - Category Filtering & Gallery Navigation (Priority: P3)

As a user exploring multimedia work, I want intuitive tab navigation between Videos and Images, along with category filter buttons (e.g. AI Short Films, Editing, AI Art, Concept Art, Design), so that I can quickly filter projects by discipline.

**Why this priority**: Core objective #2.C requires clean sub-navigation between Videos and Images and filterable categories across mobile, tablet, and desktop viewports.

**Independent Test**: Verified by clicking "Videos" vs "Images" sub-tabs and category filter buttons, observing immediate card list filtering without page reload.

**Acceptance Scenarios**:

1. **Given** the Multimedia Portfolio section, **When** clicking the "Video Gallery" or "Image Gallery" sub-tab, **Then** the visible gallery view updates seamlessly.
2. **Given** an active category filter button (e.g. "AI Short Films" or "Concept Art"), **When** selected, **Then** only cards matching that category are displayed, with an empty state fallback if no items match.

---

### User Story 5 - 100% Bilingual Localization & Accessibility (Priority: P4)

As a global visitor, I want all gallery titles, filter labels, modal controls, metadata tags, empty states, and accessibility labels available in both Spanish and English.

**Why this priority**: Core objectives #4 and #7 mandate complete i18n localization and WCAG 2.2 AA accessibility compliance.

**Independent Test**: Executing the i18n key parity check script and toggling language between EN and ES across all gallery controls and lightboxes.

**Acceptance Scenarios**:

1. **Given** the active language set to Spanish or English, **When** inspecting gallery sub-tabs, filter buttons, modal controls ("Close", "Watch on YouTube", "Next", "Previous"), **Then** all text renders in the selected language.
2. **Given** a screen reader user, **When** focusing interactive gallery cards, **Then** localized `aria-label` attributes and accessible image alt texts are read correctly.

---

### Edge Cases

- **Third-party Embed Failure**: What if YouTube iframe fails to load or video is set to private/deleted? System MUST provide an external button linking directly to YouTube (`https://youtube.com/watch?v=...`) with an error indicator.
- **Image Load Failure**: What if a showcase image path is broken? System MUST render a styled fallback card showing the project title, category tag, and fallback icon.
- **No Sound Auto-play**: Third-party video embeds MUST NOT auto-play sound automatically upon page load.
- **Zero Fabricated Content**: Only verified projects, verified YouTube URLs, and actual local image paths are published. Sample placeholders MUST be explicitly identified during development.

---

## 3. Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Portfolio MUST present Software Development as the primary professional focus, with Multimedia Production and AI Workflows presented as complementary multidisciplinary strengths.
- **FR-002**: Portfolio MUST maintain the single-page Next.js App Router architecture (`app/page.tsx`), rendering the Multimedia Portfolio under section anchor `#multimedia`.
- **FR-003**: Multimedia Portfolio section MUST feature sub-navigation tabs to switch between **Video Gallery** and **Image Gallery**.
- **FR-004**: **Video Gallery** MUST support verified standard YouTube videos and YouTube Shorts.
- **FR-005**: Video cards MUST render responsive thumbnails ($16:9$ for standard, $9:16$ for Shorts), title, short description, category tag, tool badges, and direct YouTube link.
- **FR-006**: Video playback MUST use a lightweight deferred embed strategy (click-to-play facade or modal iframe using `youtube-nocookie.com`) to prevent unnecessary initial page load overhead.
- **FR-007**: **Image Gallery** MUST display visual creation projects (AI art, concept art, promotional design, digital graphics) in a responsive grid preserving aspect ratios without layout shifts.
- **FR-008**: Image cards MUST support opening an accessible Lightbox Modal View displaying full image, title, category, tool badges, and creative description.
- **FR-009**: Lightbox modal MUST support keyboard controls (`Escape` to close, `ArrowLeft` / `ArrowRight` to navigate), visible close button, focus trap, and background scroll lock.
- **FR-010**: Gallery MUST support category filter buttons (e.g. *All*, *AI Short Films*, *Cinematic*, *Video Editing*, *AI Art*, *Concept Art*, *Promotional Design*).
- **FR-011**: Media items MUST support tool badges (e.g. `Runway`, `Pika`, `Midjourney`, `Flux`, `ComfyUI`, `ElevenLabs`, `Premiere Pro`, `Photoshop`).
- **FR-012**: Gallery data MUST be managed via a typed local TypeScript data file (`data/multimedia-gallery.ts`) without adding external database, CMS, or API dependencies.
- **FR-013**: Every new user-facing string (titles, tabs, filters, metadata labels, modal controls, empty states, aria-labels) MUST be centralized in `locales/en.json` and `locales/es.json`.
- **FR-014**: All gallery cards, filter buttons, lightbox controls, and video links MUST feature visible focus indicators, semantic HTML elements, and localized `aria-label` attributes targeting WCAG 2.2 AA.
- **FR-015**: Media assets MUST support lazy loading (`loading="lazy"`), WebGL/canvas fallbacks, and respect `prefers-reduced-motion`.

---

### Key Entities

- **VideoProjectItem**:
  * `id`: Unique string identifier
  * `titleKey`: i18n translation key path for project title
  * `descriptionKey`: i18n translation key path for description
  * `category`: Video category string (`ai_film`, `cinematic`, `editing`, `promotional`)
  * `youtubeId`: Verified 11-character YouTube video ID
  * `isShort`: Boolean indicating vertical YouTube Short format ($9:16$)
  * `thumbnailUrl`: Verified thumbnail image path or default YouTube thumbnail URL (`https://img.youtube.com/vi/{id}/hqdefault.jpg`)
  * `tools`: Array of tool badges (e.g. `["Runway Gen-3", "Pika", "Premiere Pro"]`)
  * `duration`: Optional verified duration string (e.g. `"1:45"`)

- **ImageProjectItem**:
  * `id`: Unique string identifier
  * `titleKey`: i18n translation key path for title
  * `descriptionKey`: i18n translation key path for description
  * `category`: Image category string (`ai_art`, `concept_art`, `promotional_design`, `illustration`)
  * `imageUrl`: Local asset path (`/showcase/...`) or verified external image URL
  * `thumbnailUrl`: Optimized thumbnail asset path
  * `tools`: Array of tool badges (e.g. `["Midjourney v6", "ComfyUI", "Photoshop"]`)
  * `aspectRatio`: Image aspect ratio classification (`square`, `landscape`, `portrait`)
  * `altTextKey`: i18n translation key path for accessibility alt text

- **GalleryFilterCategory**:
  * `id`: Category filter key (`all`, `ai_film`, `cinematic`, `editing`, `ai_art`, `concept_art`, `promotional_design`)
  * `labelKey`: i18n key path for filter button label

---

## 4. Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of new gallery interface strings, filter labels, modal controls, and metadata keys are fully localized in both `locales/en.json` and `locales/es.json`.
- **SC-002**: Initial page load weight (LCP) is protected by deferring YouTube iframe creation until user interaction (click-to-play facade).
- **SC-003**: 100% of Image Gallery lightbox interactions support keyboard navigation (`Escape`, `ArrowLeft`, `ArrowRight`) with visible focus traps and zero background page scrolling.
- **SC-004**: 100% of image assets render without Cumulative Layout Shift (CLS), preserving natural image aspect ratios across mobile ($375\text{px}$), tablet ($768\text{px}$), and desktop ($1440\text{px}$) viewports.
- **SC-005**: Zero fabricated projects, fake YouTube URLs, or unverified claims published in the production gallery data.

---

## 5. Assumptions

- Video content is hosted primarily on YouTube, enabling lightweight deferred iframe embeds without hosting large video files locally.
- Image assets are served from `public/showcase/` or verified public URLs with local fallbacks.
- Gallery content structure is managed in `data/multimedia-gallery.ts`, allowing easy addition of new video/image projects without UI code changes or CMS setup.
- Existing visual design system (`bg-red-500` accents, zinc dark backgrounds, backdrop blur cards, lucide icons) fully accommodates the video cards, image cards, and lightbox modal.
