"use client";

import { ZoomIn, Sparkles, Image as ImageIcon } from "lucide-react";
import { ImageProjectItem } from "../../types/portfolio-evolution";
import { useTranslation } from "../../hooks/useTranslation";

interface ImageCardProps {
  item: ImageProjectItem;
  onSelect: () => void;
}

export default function ImageCard({ item, onSelect }: ImageCardProps) {
  const { t } = useTranslation();

  // Helper to resolve translation keys
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
  const expandLabel = (t.multimedia as any)?.expandImage || "Expandir Imagen";

  // Dynamic aspect ratio mapping
  const aspectClass =
    item.aspectRatio === "1:1"
      ? "aspect-square"
      : item.aspectRatio === "9:16"
      ? "aspect-[9/16]"
      : item.aspectRatio === "4:3"
      ? "aspect-[4/3]"
      : item.aspectRatio === "3:4"
      ? "aspect-[3/4]"
      : "aspect-video"; // default 16:9

  return (
    <div
      onClick={onSelect}
      role="button"
      tabIndex={0}
      aria-label={`${expandLabel}: ${title}`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect();
        }
      }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-900 shadow-xl shadow-black/5 dark:shadow-black/30 cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 hover:border-purple-500/50 hover:shadow-purple-500/10"
    >
      {/* Image Container with Thumbnail */}
      <div className={`relative w-full ${aspectClass} overflow-hidden bg-zinc-950`}>
        <img
          src={item.thumbnailUrl || item.imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/gallery/future.jpg";
          }}
        />

        {/* Dark Hover Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

        {/* Top Category Badge */}
        <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-[11px] font-bold text-purple-300 border border-purple-500/30">
          <Sparkles className="w-3 h-3 text-purple-400" />
          <span>{item.category.replace("_", " ").toUpperCase()}</span>
        </div>

        {/* Top Right HD Badge */}
        <div className="absolute top-3 right-3 z-10 flex items-center gap-1 px-2.5 py-1 rounded-full bg-purple-900/80 backdrop-blur-md text-[10px] font-extrabold text-purple-200 border border-purple-400/40 shadow">
          <ImageIcon className="w-3 h-3" />
          <span>HD</span>
        </div>

        {/* Center Hover Action Pill */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-600/90 text-white font-bold text-xs shadow-xl backdrop-blur-md scale-95 group-hover:scale-100 transition-transform">
            <ZoomIn className="w-4 h-4" />
            {expandLabel}
          </span>
        </div>
      </div>

      {/* Card Body Info */}
      <div className="p-4 flex flex-col justify-between flex-1 bg-white dark:bg-zinc-900 border-t border-zinc-100 dark:border-zinc-800">
        <div>
          <h4 className="text-base font-bold text-zinc-900 dark:text-white mb-1.5 group-hover:text-purple-400 transition-colors line-clamp-1">
            {title}
          </h4>
          <p className="text-zinc-600 dark:text-zinc-300 text-xs line-clamp-2 leading-relaxed mb-3">
            {description}
          </p>
        </div>

        {/* Footer: Tools Badges + Explicit Expand Button */}
        <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between gap-2">
          <div className="flex flex-wrap gap-1">
            {item.tools.slice(0, 2).map((tool, idx) => (
              <span
                key={idx}
                className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700"
              >
                {tool}
              </span>
            ))}
            {item.tools.length > 2 && (
              <span className="text-[10px] font-semibold text-zinc-400">
                +{item.tools.length - 2}
              </span>
            )}
          </div>

          {/* Explicit Expand Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelect();
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/50 hover:bg-purple-600 hover:text-white dark:hover:bg-purple-600 dark:hover:text-white border border-purple-200 dark:border-purple-800/60 transition-all duration-200 shrink-0"
            aria-label={`${expandLabel}: ${title}`}
          >
            <ZoomIn className="w-3.5 h-3.5" />
            <span>{expandLabel}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
