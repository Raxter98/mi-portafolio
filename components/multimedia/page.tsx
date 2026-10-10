"use client";

import { useState } from "react";
import { useTranslation } from "../../hooks/useTranslation";
import { Video, Image as ImageIcon, Mic, Bot, Sparkles, CheckCircle2, Filter } from "lucide-react";
import { Fade, Slide } from "react-awesome-reveal";
import { videoProjects, imageProjects } from "../../data/multimedia-gallery";
import { ImageProjectItem } from "../../types/portfolio-evolution";
import VideoCard from "./VideoCard";
import ImageCard from "./ImageCard";
import ImageLightboxModal from "./ImageLightboxModal";

export default function MultimediaSection() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<"video" | "image" | "overview">("video");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  // Helper for translating filter categories
  const getFilterLabel = (catId: string): string => {
    if (catId === "all") return t.multimedia.filters?.all || "All";
    const filterKey = (t.multimedia.filters as any)?.[catId];
    return filterKey || catId.replace("_", " ");
  };

  // Video category filter buttons
  const videoCategoryOptions = [
    { id: "all", label: getFilterLabel("all") },
    { id: "ai_short_film", label: getFilterLabel("ai_short_film") },
    { id: "cinematic", label: getFilterLabel("cinematic") },
    { id: "video_editing", label: getFilterLabel("video_editing") },
  ];

  // Image category filter buttons
  const imageCategoryOptions = [
    { id: "all", label: getFilterLabel("all") },
    { id: "ai_art", label: getFilterLabel("ai_art") },
    { id: "concept_art", label: getFilterLabel("concept_art") },
    { id: "promotional_design", label: getFilterLabel("promotional_design") },
    { id: "illustration", label: getFilterLabel("illustration") },
  ];

  // Filtered Video Items
  const filteredVideos = categoryFilter === "all"
    ? videoProjects
    : videoProjects.filter((item) => item.category === categoryFilter);

  // Filtered Image Items
  const filteredImages = categoryFilter === "all"
    ? imageProjects
    : imageProjects.filter((item) => item.category === categoryFilter);

  // Overview summary items
  const showcaseItems = [
    {
      id: "video",
      category: "video",
      data: t.multimedia.items.video,
      icon: Video,
      gradient: "from-red-500/20 via-orange-500/10 to-transparent",
    },
    {
      id: "image",
      category: "image",
      data: t.multimedia.items.image,
      icon: ImageIcon,
      gradient: "from-purple-500/20 via-pink-500/10 to-transparent",
    },
    {
      id: "audio",
      category: "audio",
      data: t.multimedia.items.audio,
      icon: Mic,
      gradient: "from-blue-500/20 via-cyan-500/10 to-transparent",
    },
    {
      id: "automation",
      category: "automation",
      data: t.multimedia.items.automation,
      icon: Bot,
      gradient: "from-emerald-500/20 via-teal-500/10 to-transparent",
    },
  ];

  const selectedImage = selectedImageIndex !== null ? filteredImages[selectedImageIndex] : null;

  return (
    <section id="multimedia" className="w-full max-w-7xl px-5 md:px-10 mt-28">
      {/* Header */}
      <Slide direction="down" triggerOnce>
        <div className="text-start mb-10">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-red-400">
            {t.multimedia.badge}
          </p>
          <h2 className="text-zinc-900 dark:text-white text-3xl md:text-5xl font-bold flex flex-wrap gap-2">
            <span className="bg-red-500 text-white px-3 py-1 rounded">
              {t.multimedia.title1}
            </span>
          </h2>
          <h3 className="text-zinc-900 dark:text-white text-3xl md:text-5xl font-bold mt-2">
            <span className="border-b-2 border-red-500">
              {t.multimedia.title2}
            </span>
          </h3>
          <p className="mt-4 text-zinc-600 dark:text-zinc-300 text-base max-w-3xl leading-relaxed">
            {t.multimedia.subtitle}
          </p>
        </div>
      </Slide>

      {/* Main Sub-tabs (Video Gallery | Image Gallery | Overview) */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8 border-b border-zinc-200 dark:border-white/10 pb-4">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => {
              setActiveTab("video");
              setCategoryFilter("all");
            }}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 focus:outline-none ${
              activeTab === "video"
                ? "bg-red-500 text-white shadow-lg shadow-red-500/30 scale-105"
                : "bg-zinc-100 dark:bg-zinc-800/80 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700"
            }`}
          >
            <Video className="w-4 h-4" />
            <span>{t.multimedia.subtabs?.videoGallery || "Video Gallery"}</span>
          </button>

          <button
            onClick={() => {
              setActiveTab("image");
              setCategoryFilter("all");
            }}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 focus:outline-none ${
              activeTab === "image"
                ? "bg-purple-600 text-white shadow-lg shadow-purple-600/30 scale-105"
                : "bg-zinc-100 dark:bg-zinc-800/80 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700"
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>{t.multimedia.subtabs?.imageGallery || "Image Gallery"}</span>
          </button>

          <button
            onClick={() => {
              setActiveTab("overview");
              setCategoryFilter("all");
            }}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 focus:outline-none ${
              activeTab === "overview"
                ? "bg-zinc-800 text-white shadow-lg scale-105"
                : "bg-zinc-100 dark:bg-zinc-800/80 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700"
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>{t.multimedia.subtabs?.overview || "Overview"}</span>
          </button>
        </div>

        {/* Category Filters (when inside Video or Image tab) */}
        {activeTab !== "overview" && (
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-xs text-zinc-400 font-semibold uppercase tracking-wider flex items-center gap-1 mr-1">
              <Filter className="w-3.5 h-3.5" />
              Filter:
            </span>
            {(activeTab === "video" ? videoCategoryOptions : imageCategoryOptions).map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCategoryFilter(cat.id)}
                className={`text-xs font-semibold px-3 py-1 rounded-lg transition-all duration-200 ${
                  categoryFilter === cat.id
                    ? activeTab === "video"
                      ? "bg-red-500/20 text-red-500 border border-red-500/40"
                      : "bg-purple-500/20 text-purple-400 border border-purple-500/40"
                    : "bg-zinc-100 dark:bg-zinc-800/60 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Video Gallery View */}
      {activeTab === "video" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map((video) => (
            <Fade key={video.id} triggerOnce>
              <VideoCard item={video} />
            </Fade>
          ))}
          {filteredVideos.length === 0 && (
            <div className="col-span-full py-12 text-center text-zinc-500 dark:text-zinc-400">
              No video projects found matching this category.
            </div>
          )}
        </div>
      )}

      {/* Image Gallery View */}
      {activeTab === "image" && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredImages.map((image, index) => (
              <Fade key={image.id} delay={index * 50} triggerOnce>
                <ImageCard item={image} onSelect={() => setSelectedImageIndex(index)} />
              </Fade>
            ))}
            {filteredImages.length === 0 && (
              <div className="col-span-full py-12 text-center text-zinc-500 dark:text-zinc-400">
                No image projects found matching this category.
              </div>
            )}
          </div>

          {/* Lightbox Modal */}
          <ImageLightboxModal
            item={selectedImage}
            onClose={() => setSelectedImageIndex(null)}
            onPrev={() =>
              setSelectedImageIndex((prev) =>
                prev !== null && prev > 0 ? prev - 1 : filteredImages.length - 1
              )
            }
            onNext={() =>
              setSelectedImageIndex((prev) =>
                prev !== null && prev < filteredImages.length - 1 ? prev + 1 : 0
              )
            }
            hasPrev={filteredImages.length > 1}
            hasNext={filteredImages.length > 1}
          />
        </>
      )}

      {/* Overview Grid View */}
      {activeTab === "overview" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {showcaseItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <Fade key={item.id} delay={index * 100} triggerOnce>
                <div className="relative group overflow-hidden rounded-2xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-white/[0.04] p-7 shadow-xl shadow-black/5 dark:shadow-black/30 backdrop-blur transition-all duration-300 hover:border-red-500/50 hover:shadow-red-500/10">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-50 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
                  />

                  <div className="relative z-10 flex flex-col h-full justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-red-500/15 flex items-center justify-center text-red-500">
                            <Icon className="w-5 h-5" />
                          </div>
                          <span className="text-xs uppercase tracking-wider font-semibold text-red-400">
                            {item.category.replace("_", " ")}
                          </span>
                        </div>

                        <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                          <CheckCircle2 className="w-3 h-3" />
                          Demonstrated
                        </span>
                      </div>

                      <h4 className="text-2xl font-bold text-zinc-900 dark:text-white mb-3 group-hover:text-red-500 transition-colors">
                        {item.data.title}
                      </h4>

                      <p className="text-zinc-600 dark:text-zinc-300 text-sm leading-relaxed mb-6">
                        {item.data.desc}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-zinc-100 dark:border-white/10">
                      <p className="text-[11px] uppercase tracking-widest text-zinc-400 dark:text-zinc-500 font-semibold mb-2">
                        Tools & Workflows
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {item.data.badges.map((badge: string, bIdx: number) => (
                          <span
                            key={bIdx}
                            className="text-xs font-medium px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800/90 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700"
                          >
                            {badge}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Fade>
            );
          })}
        </div>
      )}
    </section>
  );
}
