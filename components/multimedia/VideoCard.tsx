"use client";

import { useState } from "react";
import { Play, ExternalLink, Clock, Calendar, Film } from "lucide-react";
import { VideoProjectItem } from "../../types/portfolio-evolution";
import { useTranslation } from "../../hooks/useTranslation";

interface VideoCardProps {
  item: VideoProjectItem;
}

export default function VideoCard({ item }: VideoCardProps) {
  const { t } = useTranslation();
  const [isPlaying, setIsPlaying] = useState(false);

  // Helper to check if string is translation key or literal
  const getTranslation = (key: string): string => {
    if (!key) return "";
    const parts = key.split(".");
    let curr: any = t;
    for (const p of parts) {
      if (curr && typeof curr === "object" && p in curr) {
        curr = curr[p];
      } else {
        return key;
      }
    }
    return typeof curr === "string" ? curr : key;
  };

  const title = getTranslation(item.titleKey);
  const description = getTranslation(item.descriptionKey);

  const isYouTubeId = item.youtubeId && !item.youtubeId.endsWith(".mp4") && !item.youtubeId.startsWith("/");
  const thumbnailUrl = isYouTubeId
    ? `https://img.youtube.com/vi/${item.youtubeId}/hqdefault.jpg`
    : "/arzobispado.webp";
  const youtubeWatchUrl = isYouTubeId
    ? `https://www.youtube.com/watch?v=${item.youtubeId}`
    : `/${item.youtubeId}`;

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-white/[0.04] p-5 shadow-xl shadow-black/5 dark:shadow-black/30 backdrop-blur transition-all duration-300 hover:border-red-500/50 flex flex-col justify-between ${
        item.isShort ? "max-w-sm mx-auto w-full" : "w-full"
      }`}
    >
      <div>
        {/* Media Container (16:9 or 9:16) */}
        <div
          className={`relative w-full overflow-hidden rounded-xl bg-zinc-950 mb-4 ${
            item.isShort ? "aspect-[9/16]" : "aspect-video"
          }`}
        >
          {isPlaying ? (
            isYouTubeId ? (
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${item.youtubeId}?autoplay=1&rel=0`}
                title={title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <video
                src={`/${item.youtubeId}`}
                controls
                autoPlay
                className="w-full h-full object-cover"
              />
            )
          ) : (
            <div
              onClick={() => setIsPlaying(true)}
              className="relative w-full h-full cursor-pointer group/thumb"
              role="button"
              tabIndex={0}
              aria-label={`Play ${title}`}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setIsPlaying(true);
                }
              }}
            >
              {/* Thumbnail Image */}
              <img
                src={thumbnailUrl}
                alt={title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover/thumb:scale-105"
                loading="lazy"
                onError={(e) => {
                  // Fallback thumbnail
                  (e.target as HTMLImageElement).src = "/arzobispado.webp";
                }}
              />

              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-black/40 group-hover/thumb:bg-black/20 transition-colors duration-300" />

              {/* Play Icon Badge */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-red-600/90 text-white flex items-center justify-center shadow-lg shadow-red-600/50 transition-all duration-300 group-hover/thumb:scale-110 group-hover/thumb:bg-red-500">
                  <Play className="w-6 h-6 fill-current ml-1" />
                </div>
              </div>

              {/* Short / Video format badge */}
              {item.isShort && (
                <span className="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-extrabold uppercase px-2 py-0.5 rounded shadow">
                  Short
                </span>
              )}

              {/* Duration badge */}
              {item.duration && (
                <span className="absolute bottom-3 right-3 bg-black/80 text-white text-xs font-mono px-2 py-1 rounded backdrop-blur">
                  {item.duration}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Category & Date Metadata */}
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-red-500 dark:text-red-400">
            <Film className="w-3.5 h-3.5" />
            {item.category.replace("_", " ")}
          </span>
          {item.publicationDate && (
            <span className="inline-flex items-center gap-1 text-xs text-zinc-500 dark:text-zinc-400">
              <Calendar className="w-3 h-3" />
              {item.publicationDate}
            </span>
          )}
        </div>

        {/* Title */}
        <h4 className="text-xl font-bold text-zinc-900 dark:text-white mb-2 group-hover:text-red-500 transition-colors">
          {title}
        </h4>

        {/* Description */}
        <p className="text-zinc-600 dark:text-zinc-300 text-sm leading-relaxed mb-4">
          {description}
        </p>
      </div>

      {/* Footer Tools & Direct Link */}
      <div className="pt-4 border-t border-zinc-100 dark:border-white/10 flex flex-col gap-3">
        <div className="flex flex-wrap gap-1.5">
          {item.tools.map((tool, idx) => (
            <span
              key={idx}
              className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700"
            >
              {tool}
            </span>
          ))}
        </div>

        <a
          href={youtubeWatchUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800/80 hover:bg-red-500 hover:text-white dark:hover:bg-red-600 transition-all duration-200"
          aria-label={`Watch ${title} on external player`}
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span>Ver / Watch Video</span>
        </a>
      </div>
    </div>
  );
}
