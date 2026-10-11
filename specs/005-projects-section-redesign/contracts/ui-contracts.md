# UI & Localization Contracts: Projects Section Redesign

**Feature**: `005-projects-section-redesign`
**Created**: 2026-10-11
**Status**: Completed

## 1. Component Interfaces

### 1.1 Root Section Component: `MyProjects`

The top-level container component rendering inside `app/page.tsx` anchored at `#projects`.

```typescript
export interface MyProjectsProps {
  className?: string;
}
```

### 1.2 Category Filters: `ProjectFilters`

```typescript
export interface ProjectFiltersProps {
  categories: CategoryFilterItem[];
  selectedCategory: ProjectCategory;
  onSelectCategory: (category: ProjectCategory) => void;
}
```

### 1.3 Project Deck / Navigator: `ProjectDeck`

Displays the active project's metadata, narrative, technologies, and project navigation controls.

```typescript
export interface ProjectDeckProps {
  project: LocalizedProject;
  currentIndex: number;
  totalCount: number;
  onPrev: () => void;
  onNext: () => void;
  onOpenDetails: () => void;
  onToggleVideo?: () => void;
  isVideoPlaying?: boolean;
  hasVideo?: boolean;
  projectsList: LocalizedProject[];
  onSelectProject: (id: string) => void;
}
```

### 1.4 Cinematic Focus Stage: `ProjectSpotlightStage`

Displays the primary visual preview, video demo player, and full-resolution interactive overlay trigger.

```typescript
export interface ProjectSpotlightStageProps {
  project: LocalizedProject;
  isVideoPlaying: boolean;
  onToggleVideo: () => void;
  onOpenDetails: () => void;
}
```

### 1.5 Deep-Dive Inspection Modal: `ProjectDetailModal`

The accessible modal dialog for inspecting in-depth details, architecture notes, and high-resolution media.

```typescript
export interface ProjectDetailModalProps {
  isOpen: boolean;
  project: LocalizedProject;
  currentIndex: number;
  totalCount: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}
```

---

## 2. Localization Contract (`locales/es.json` & `locales/en.json`)

The section extends the existing `projects` dictionary with a structured `showcase` namespace while strictly preserving existing keys:

### Spanish (`locales/es.json`) Contract Additions:
```json
{
  "projects": {
    "title1": "PROYECTOS DESTACADOS Y",
    "title2": "TRABAJO DE INGENIERÍA",
    "myProjects": "Mis Proyectos",
    "subtitle": "Exploración interactiva de proyectos destacados en desarrollo móvil, plataformas web y sistemas empresariales.",
    "showcase": {
      "badge": "Portafolio de Ingeniería",
      "categories": {
        "all": "Todos",
        "mobile": "Apps Móviles",
        "web": "Plataformas Web",
        "enterprise_pwa": "Sistemas y PWAs"
      },
      "actions": {
        "viewDetails": "Ver Detalles",
        "watchVideo": "Ver Demostración",
        "stopVideo": "Detener Video",
        "closeModal": "Cerrar",
        "prevProject": "Proyecto Anterior",
        "nextProject": "Proyecto Siguiente"
      },
      "meta": {
        "technologies": "Tecnologías y Herramientas",
        "overview": "Resumen del Proyecto",
        "projectNumber": "Proyecto",
        "of": "de"
      }
    },
    "items": { ... }
  }
}
```

### English (`locales/en.json`) Contract Additions:
```json
{
  "projects": {
    "title1": "FEATURED PROJECTS &",
    "title2": "ENGINEERING WORK",
    "myProjects": "My Projects",
    "subtitle": "Interactive exploration of featured engineering work across mobile development, web platforms, and enterprise systems.",
    "showcase": {
      "badge": "Engineering Showcase",
      "categories": {
        "all": "All Projects",
        "mobile": "Mobile Apps",
        "web": "Web Platforms",
        "enterprise_pwa": "Enterprise & PWAs"
      },
      "actions": {
        "viewDetails": "View Details",
        "watchVideo": "Watch Demo",
        "stopVideo": "Stop Video",
        "closeModal": "Close",
        "prevProject": "Previous Project",
        "nextProject": "Next Project"
      },
      "meta": {
        "technologies": "Technologies & Tools",
        "overview": "Project Overview",
        "projectNumber": "Project",
        "of": "of"
      }
    },
    "items": { ... }
  }
}
```

---

## 3. Keyboard & Accessibility Contract

| Target Element | Key Event | Expected Action |
| :--- | :--- | :--- |
| Category Filter Tab | `Enter` / `Space` | Selects category and activates first project |
| Category Filter Tab | `ArrowRight` / `ArrowLeft` | Moves focus between filter tabs |
| Project Index Item | `Enter` / `Space` | Focuses and spotlights project |
| Previous Button | `Enter` / `Space` | Navigates to previous project in active subset |
| Next Button | `Enter` / `Space` | Navigates to next project in active subset |
| Video Play/Stop Button | `Enter` / `Space` | Toggles video playback state |
| View Details Button | `Enter` / `Space` | Opens ProjectDetailModal and traps focus |
| Modal Container | `Escape` | Closes modal and restores focus to trigger button |
| Modal Nav Buttons | `ArrowLeft` / `ArrowRight` | Cycles to previous/next project in modal |
