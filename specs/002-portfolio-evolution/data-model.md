# Phase 1: Data Model & Schema Definitions

**Feature Directory**: `specs/002-portfolio-evolution`  
**Date**: 2026-10-09  
**Status**: Complete  

## 1. Data Entities

### Entity: VideoProjectItem
Represents an audiovisual project hosted on YouTube (standard video or vertical YouTube Short).

* **Fields**:
  * `id`: Unique string identifier (e.g. `video_01`)
  * `titleKey`: Translation key path for project title (e.g. `multimedia.videos.item1.title`)
  * `descriptionKey`: Translation key path for project description
  * `category`: Video category (`ai_film` | `cinematic` | `editing` | `promotional`)
  * `youtubeId`: Verified 11-character YouTube video ID (e.g. `dQw4w9WgXcQ`)
  * `isShort`: Boolean flag indicating vertical format ($9:16$)
  * `customThumbnailUrl`: Optional local thumbnail image path under `public/`
  * `tools`: Array of tool badges (e.g. `["Runway Gen-3", "Pika", "Premiere Pro"]`)
  * `duration`: Verified duration string (e.g. `"2:15"`)
  * `date`: Verified release date string (e.g. `"2024"`)

---

### Entity: ImageProjectItem
Represents a visual artwork, concept design, AI illustration, or promotional graphic.

* **Fields**:
  * `id`: Unique string identifier (e.g. `image_01`)
  * `titleKey`: Translation key path for image title
  * `descriptionKey`: Translation key path for image description
  * `category`: Image category (`ai_art` | `concept_art` | `promotional_design` | `illustration`)
  * `imageUrl`: High-resolution asset URL or local path under `public/`
  * `thumbnailUrl`: Optimized thumbnail image path
  * `tools`: Array of tool badges (e.g. `["Midjourney v6", "ComfyUI", "Photoshop"]`)
  * `aspectRatio`: Image container format (`square` | `landscape` | `portrait`)
  * `altTextKey`: Translation key path for accessible alt text

---

### Entity: GalleryFilterCategory
Represents a category filter option.

* **Fields**:
  * `id`: Category filter ID (`all` | `ai_film` | `cinematic` | `editing` | `ai_art` | `concept_art` | `promotional_design`)
  * `labelKey`: i18n translation key path for button label
  * `targetGallery`: Applicable gallery view (`video` | `image` | `both`)

---

## 2. TypeScript Interfaces (`types/portfolio-evolution.ts`)

```typescript
export type VideoCategory = "ai_film" | "cinematic" | "editing" | "promotional";
export type ImageCategory = "ai_art" | "concept_art" | "promotional_design" | "illustration";
export type GalleryTab = "video" | "image";

export interface VideoProjectItem {
  id: string;
  titleKey: string;
  descriptionKey: string;
  category: VideoCategory;
  youtubeId: string;
  isShort?: boolean;
  customThumbnailUrl?: string;
  tools: string[];
  duration?: string;
  date?: string;
}

export interface ImageProjectItem {
  id: string;
  titleKey: string;
  descriptionKey: string;
  category: ImageCategory;
  imageUrl: string;
  thumbnailUrl?: string;
  tools: string[];
  aspectRatio: "square" | "landscape" | "portrait";
  altTextKey: string;
}

export interface GalleryFilterCategory {
  id: string;
  labelKey: string;
  targetGallery: "video" | "image" | "both";
}
```
