import { VideoProjectItem, ImageProjectItem } from "../types/portfolio-evolution";

export const videoProjects: VideoProjectItem[] = [
  {
    id: "video_01",
    youtubeId: "1NqoLZ4mkW4",
    titleKey: "multimedia.videos.item1.title",
    descriptionKey: "multimedia.videos.item1.desc",
    category: "cinematic",
    isShort: false,
    tools: ["Google Veo 3", "Google Flow", "Premiere Pro", "After Effects"],
    duration: "6:20",
    publicationDate: "2026"
  },
  {
    id: "video_02",
    youtubeId: "ioXCB4FGnRY",
    titleKey: "multimedia.videos.item2.title",
    descriptionKey: "multimedia.videos.item2.desc",
    category: "video_editing",
    isShort: false,
    tools: ["Google Veo 3", "ElevenLabs", "Premiere Pro"],
    duration: "00:27",
    publicationDate: "2026"
  },
  {
    id: "video_03",
    youtubeId: "kMWJ5CVXv1o",
    titleKey: "multimedia.videos.item3.title",
    descriptionKey: "multimedia.videos.item3.desc",
    category: "video_editing",
    isShort: false,
    tools: ["CapCut", "Premiere Pro", "AI Motion", "Voiceover"],
    duration: "0:32",
    publicationDate: "2026"
  }
];

export const imageProjects: ImageProjectItem[] = [
  {
    id: "image_car_traveling",
    thumbnailUrl: "/gallery/car_traveling.jpeg",
    imageUrl: "/gallery/car_traveling.jpeg",
    titleKey: "multimedia.images.car_traveling.title",
    descriptionKey: "multimedia.images.car_traveling.desc",
    category: "cinematic_frame",
    aspectRatio: "16:9",
    tools: ["Midjourney v6", "Runway Gen-3", "Photoshop"],
    creativeProcessKey: "multimedia.images.car_traveling.process"
  },
  {
    id: "image_future",
    thumbnailUrl: "/gallery/future.jpg",
    imageUrl: "/gallery/future.jpg",
    titleKey: "multimedia.images.future.title",
    descriptionKey: "multimedia.images.future.desc",
    category: "concept_art",
    aspectRatio: "16:9",
    tools: ["Flux 1.1 Pro", "ComfyUI", "Lightroom"],
    creativeProcessKey: "multimedia.images.future.process"
  },
  {
    id: "image_horror_movie",
    thumbnailUrl: "/gallery/horror_movie.jpeg",
    imageUrl: "/gallery/horror_movie.jpeg",
    titleKey: "multimedia.images.horror_movie.title",
    descriptionKey: "multimedia.images.horror_movie.desc",
    category: "cinematic_frame",
    aspectRatio: "16:9",
    tools: ["Midjourney v6", "Color Grading", "Photoshop"],
    creativeProcessKey: "multimedia.images.horror_movie.process"
  },
  {
    id: "image_retro_sumer",
    thumbnailUrl: "/gallery/retro_sumer.jpg",
    imageUrl: "/gallery/retro_sumer.jpg",
    titleKey: "multimedia.images.retro_sumer.title",
    descriptionKey: "multimedia.images.retro_sumer.desc",
    category: "promotional_design",
    aspectRatio: "16:9",
    tools: ["Midjourney v6", "Illustrator", "Photoshop"],
    creativeProcessKey: "multimedia.images.retro_sumer.process"
  },
  {
    id: "image_wizard",
    thumbnailUrl: "/gallery/wizard.jpg",
    imageUrl: "/gallery/wizard.jpg",
    titleKey: "multimedia.images.wizard.title",
    descriptionKey: "multimedia.images.wizard.desc",
    category: "ai_art",
    aspectRatio: "16:9",
    tools: ["ComfyUI", "SDXL", "ControlNet"],
    creativeProcessKey: "multimedia.images.wizard.process"
  }
];
