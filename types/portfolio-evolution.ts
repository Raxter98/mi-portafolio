import React from "react";

export type MultimediaCategory = "ai_video" | "ai_image" | "audio_voice" | "ai_automation";

export type VideoCategory = "ai_short_film" | "cinematic" | "video_editing" | "promotional" | "experimental";
export type ImageCategory = "ai_art" | "concept_art" | "cinematic_frame" | "promotional_design" | "illustration";
export type GalleryFilterCategory = "all" | VideoCategory | ImageCategory;

export interface SoftwarePillar {
  id: string;
  iconName: string;
  titleKey: string;
  descriptionKey: string;
  techBadges: string[];
}

export interface VideoProjectItem {
  id: string;
  youtubeId: string;
  titleKey: string;
  descriptionKey: string;
  category: VideoCategory;
  isShort?: boolean;
  tools: string[];
  duration?: string;
  publicationDate?: string;
}

export interface ImageProjectItem {
  id: string;
  imageUrl: string;
  thumbnailUrl?: string;
  titleKey: string;
  descriptionKey: string;
  category: ImageCategory;
  aspectRatio: "1:1" | "16:9" | "9:16" | "4:3" | "3:4";
  tools: string[];
  creativeProcessKey?: string;
}

export interface MultimediaShowcaseItem {
  id: string;
  category: MultimediaCategory;
  titleKey: string;
  descriptionKey: string;
  mediaType: "image" | "video" | "audio";
  mediaUrl: string;
  thumbnailUrl?: string;
  tools: string[];
  isDemonstrated: boolean;
}

export interface SkillItem {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  textColor: string;
}

export interface SkillCategoryGroup {
  id: string;
  titleKey: string;
  skills: SkillItem[];
}
