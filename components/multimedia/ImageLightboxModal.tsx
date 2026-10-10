"use client";

import { useEffect } from "react";
import { X, ChevronLeft, ChevronRight, Sparkles, Layers } from "lucide-react";
import { ImageProjectItem } from "../../types/portfolio-evolution";
import { useTranslation } from "../../hooks/useTranslation";

interface ImageLightboxModalProps {
  item: ImageProjectItem | null;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
  hasPrev?: boolean;
  hasNext?: boolean;
}

export default function ImageLightboxModal({
  item,
  onClose,
  onPrev,
  onNext,
  hasPrev = false,
  hasNext = false,
}: ImageLightboxModalProps) {
  const { t } = useTranslation();

  useEffect(() => {
    if (!item) return;

    // Body scroll lock
    const originalStyle = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Keydown handler
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft" && hasPrev && onPrev) {
        onPrev();
      } else if (e.key === "ArrowRight" && hasNext && onNext) {
        onNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalStyle;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [item, onClose, onPrev, onNext, hasPrev, hasNext]);

  if (!item) return null;

  // Translation helper
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
  const processText = item.creativeProcessKey ? getTranslation(item.creativeProcessKey) : "";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onClick={onClose}
    >
      {/* Modal Container */}
      <div
        className="relative max-w-5xl w-full max-h-[90vh] bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 text-white hover:bg-red-600 flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
          aria-label="Close Lightbox"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left / Prev Navigation Button */}
        {hasPrev && onPrev && (
          <button
            onClick={onPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/60 text-white hover:bg-red-600 flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
            aria-label="Previous Image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        {/* Right / Next Navigation Button */}
        {hasNext && onNext && (
          <button
            onClick={onNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/60 text-white hover:bg-red-600 flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
            aria-label="Next Image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}

        {/* Artwork Image View */}
        <div className="flex-1 bg-black flex items-center justify-center p-4 min-h-[300px] md:min-h-[500px]">
          <img
            src={item.imageUrl}
            alt={title}
            className="max-h-[80vh] w-auto max-w-full object-contain rounded-lg shadow-lg"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/arzobispado.webp";
            }}
          />
        </div>

        {/* Artwork Information Sidebar */}
        <div className="w-full md:w-80 lg:w-96 p-6 bg-zinc-900 flex flex-col justify-between overflow-y-auto border-t md:border-t-0 md:border-l border-zinc-800">
          <div>
            {/* Category Tag */}
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-purple-400 mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              {item.category.replace("_", " ")}
            </span>

            {/* Title */}
            <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>

            {/* Description */}
            <p className="text-zinc-300 text-sm leading-relaxed mb-6">
              {description}
            </p>

            {/* Creative Process / Workflow */}
            {processText && processText !== item.creativeProcessKey && (
              <div className="mb-6 bg-zinc-800/60 p-3.5 rounded-xl border border-zinc-700/50">
                <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-purple-400" />
                  Creative Process
                </h4>
                <p className="text-zinc-300 text-xs leading-relaxed">
                  {processText}
                </p>
              </div>
            )}
          </div>

          {/* Tools Badges */}
          <div className="pt-4 border-t border-zinc-800">
            <p className="text-[11px] uppercase tracking-widest text-zinc-400 font-semibold mb-2">
              Tools & Software
            </p>
            <div className="flex flex-wrap gap-1.5">
              {item.tools.map((tool, idx) => (
                <span
                  key={idx}
                  className="text-xs font-medium px-2.5 py-1 rounded-full bg-zinc-800 text-zinc-200 border border-zinc-700"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
