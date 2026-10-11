"use client";

import { useEffect, useRef, useState } from "react";
import { BarChart3, Play, Pause } from "lucide-react";

interface LoopingVideoPlayerProps {
  src?: string;
  poster?: string;
  alt?: string;
  className?: string;
}

export default function LoopingVideoPlayer({
  src = "/videos/data-preview.mp4",
  poster = "/projects/data-preview-poster.webp",
  alt = "Interactive data visualization preview",
  className = "",
}: LoopingVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [hasError, setHasError] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check for reduced motion
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Intersection Observer to pause video when offscreen
  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    if (prefersReducedMotion) {
      video.pause();
      setIsPlaying(false);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {
            // Autoplay blocked or media unavailable
          });
          setIsPlaying(true);
        } else {
          video.pause();
          setIsPlaying(false);
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden rounded-2xl border border-zinc-200 dark:border-white/10 bg-zinc-900 shadow-2xl shadow-black/20 ${className}`}
    >
      {/* Decorative gradient overlay border */}
      <div className="absolute inset-0 z-10 pointer-events-none rounded-2xl ring-1 ring-inset ring-white/10" />

      {!hasError ? (
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          autoPlay={!prefersReducedMotion}
          loop
          muted
          playsInline
          onError={() => setHasError(true)}
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.02]"
          aria-label={alt}
        />
      ) : (
        /* Visual Fallback Poster Card with Animated Analytics Graphic */
        <div className="relative flex flex-col items-center justify-center w-full aspect-video bg-gradient-to-br from-zinc-900 via-zinc-950 to-zinc-900 p-8 text-center">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(239,68,68,0.18),transparent_60%)]" />
          
          <div className="relative z-10 flex flex-col items-center">
            <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-500 mb-4 shadow-lg shadow-red-500/10">
              <BarChart3 className="w-10 h-10 animate-pulse" />
            </div>

            <div className="flex items-end gap-2 h-20 w-48 mb-4 px-2 py-1 rounded-xl bg-zinc-800/40 border border-white/5">
              <div className="flex-1 bg-red-500/40 rounded-t h-[40%]" />
              <div className="flex-1 bg-red-500/70 rounded-t h-[75%]" />
              <div className="flex-1 bg-red-500 rounded-t h-[100%]" />
              <div className="flex-1 bg-red-400 rounded-t h-[60%]" />
              <div className="flex-1 bg-red-500/60 rounded-t h-[85%]" />
              <div className="flex-1 bg-red-500/90 rounded-t h-[50%]" />
            </div>

            <span className="text-xs uppercase tracking-widest font-semibold text-zinc-400">
              Interactive Dashboard Preview
            </span>
          </div>
        </div>
      )}

      {/* Manual play/pause control button */}
      {!hasError && (
        <button
          onClick={togglePlay}
          className="absolute bottom-3 right-3 z-20 p-2.5 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 border border-white/10 text-white backdrop-blur transition-all focus:outline-none focus:ring-2 focus:ring-red-500"
          aria-label={isPlaying ? "Pausar animación" : "Reproducir animación"}
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </button>
      )}
    </div>
  );
}
