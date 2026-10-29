/**
 * Central content file for the portfolio.
 * Edit text, links, videos, thumbnails, photo and experience here — every page reads from this file.
 * Only verified information belongs here. Leave a field empty/null when the asset is not available yet;
 * the site then shows a clearly labelled placeholder instead of inventing content.
 */
import photoAsset from "@/assets/dilshad-khan.jpg.asset.json";

export type VideoSource =
  | { type: "drive"; id: string }
  | { type: "youtube"; id: string }
  | { type: "vimeo"; id: string }
  | { type: "file"; src: string; mimeType?: string }
  | { type: "none" };

export type Project = {
  slug: string;
  number: string;
  title: string;
  subtitle?: string;
  category: string;
  description: string;
  contributions: string[];
  video: VideoSource;
  /** Custom poster image URL. When null, the site tries the video host's own preview frame, then a labelled placeholder. */
  thumbnail: string | null;
  /** Aspect ratio of the edit, e.g. "16 / 9" or "9 / 16". */
  aspect: string;
};

export const profile = {
  name: "Dilshad Khan",
  role: "Professional Video Editor",
  eyebrow: "Video Editor • Visual Storyteller",
  tagline: "Crafting stories through every frame.",
  intro:
    "Transforming raw footage into compelling visual experiences through creative editing, cinematic color grading, immersive sound, and purposeful storytelling.",
  bio: "I'm Dilshad Khan, a professional video editor specializing in short-form social media videos, Instagram reels, engaging talking-head edits, and promotional content. My creative approach focuses on storytelling, smooth transitions, dynamic captions, and clean, engaging visuals that hold audience attention. I believe every edit should feel purposeful and bring the story to life.",
  experienceHighlight: "6 Months of Paid Internship Experience",
  /** Professional photograph URL. null = show the labelled placeholder. */
  photo: photoAsset.url as string | null,
  specializations: [
    "Short-form social media editing",
    "Instagram reels",
    "Talking-head videos",
    "Promotional content",
    "Creative storytelling",
    "Cinematic color grading",
    "Background music integration",
    "Sound effects",
    "Scene-integrated animated captions",
  ],
};

export const contact = {
  email: "dilshadk00999@gmail.com",
  instagram:
    "https://www.instagram.com/_dilshadsaifii_?mdxt=MXNsdDc0d3hwdnczZA%3D%3D&utm_source=qr",
  linkedin:
    "https://www.linkedin.com/in/dil-shad-178a83317?utm_source=share_via&utm_content=profile&utm_medium=member_ios",
  whatsapp: "https://wa.me/917428949538",
};

export const projects: Project[] = [
  {
    slug: "handcrafted-by-ss-01",
    number: "01",
    title: "Handcrafted by SS",
    category: "Video Editing",
    description:
      "Created an engaging visual edit for Handcrafted by SS, combining refined color grading, carefully selected background music, immersive sound effects, and scene-integrated captions to deliver a cohesive and compelling viewing experience.",
    contributions: [
      "Video editing",
      "Color grading",
      "Background music",
      "Sound effects",
      "Scene-integrated captions",
      "Visual storytelling",
    ],
    video: { type: "drive", id: "1uXPOG2uWy_hA1yF4jMI_JfbRCL6WIlOP" },
    thumbnail: null,
    aspect: "16 / 9",
  },
  {
    slug: "handcrafted-by-ss-02",
    number: "02",
    title: "Handcrafted by SS",
    category: "Video Editing",
    description:
      "Developed a polished video edit with attention to pacing, visual consistency, music synchronization, sound design, and creative captions that blend naturally with the on-screen content.",
    contributions: [
      "Video editing",
      "Color grading",
      "Background music",
      "Sound effects",
      "Scene-integrated captions",
      "Creative pacing",
    ],
    video: { type: "drive", id: "13gpEmqOZq54QpJBDNDWcihHq1AXHDffd" },
    thumbnail: null,
    aspect: "16 / 9",
  },
  {
    slug: "handcrafted-by-ss-03",
    number: "03",
    title: "Handcrafted by SS",
    category: "Video Editing",
    description:
      "Crafted a visually engaging edit by bringing together clean cuts, color enhancement, background music, carefully timed sound effects, and captions designed to complement the scene rather than distract from it.",
    contributions: [
      "Video editing",
      "Color grading",
      "Background music",
      "Sound effects",
      "Creative captions",
      "Storytelling",
    ],
    video: { type: "drive", id: "1TKaK5IMCgZ6n0KoMQy8JYKkj72DfWOiU" },
    thumbnail: null,
    aspect: "16 / 9",
  },
  {
    slug: "trapped-short-film",
    number: "04",
    title: "Trapped",
    subtitle: "Short Film",
    category: "Short Film Editing",
    description:
      "Edited the short film Trapped with an emphasis on cinematic storytelling, scene continuity, mood-driven color grading, background music, carefully timed sound effects, and captions that complement the film's visual atmosphere.",
    contributions: [
      "Short film editing",
      "Cinematic color grading",
      "Background music",
      "Sound effects",
      "Scene-integrated captions",
      "Narrative pacing",
    ],
    video: { type: "drive", id: "1e62HXQvDftR4R73ifVgKc0WHgrLNbzAo" },
    thumbnail: null,
    aspect: "16 / 9",
  },
  {
    slug: "freelance-work-reel",
    number: "05",
    title: "Freelance Work",
    subtitle: "Instagram Reel",
    category: "Instagram Reel",
    description: "A vertical Instagram reel edited as freelance work.",
    contributions: ["Video editing", "Short-form social media editing"],
    video: { type: "drive", id: "14ZXKbj6cO0HTCMfqAoggQOd4p7WdmJ00" },
    thumbnail: null,
    aspect: "9 / 16",
  },
  {
    slug: "freelance-work-reel-02",
    number: "06",
    title: "Freelance Work",
    subtitle: "Instagram Reel",
    category: "Instagram Reel",
    description: "A vertical Instagram reel edited as freelance work.",
    contributions: ["Video editing", "Short-form social media editing"],
    video: { type: "drive", id: "1RPQvLshVGgUpq2fpzVy5EedUYpeORbuL" },
    thumbnail: null,
    aspect: "9 / 16",
  },
  {
    slug: "freelance-work-reel-03",
    number: "07",
    title: "Freelance Work",
    subtitle: "Instagram Reel",
    category: "Instagram Reel",
    description: "A vertical Instagram reel edited as freelance work.",
    contributions: ["Video editing", "Short-form social media editing"],
    video: { type: "drive", id: "1Upzk2ZCOip0ymfTuCZx9F-Aw_ZNEsdli" },
    thumbnail: null,
    aspect: "9 / 16",
  },
];

export const behindTheEdit = {
  heading: "Every frame. Every sound. Every detail.",
  description:
    "From the rhythm of each cut to the color of every frame, my editing process combines visuals, background music, sound effects, and scene-integrated captions to create a seamless and engaging viewing experience.",
  tags: ["Video Editing", "Color Grading", "Background Music", "Sound Design", "Creative Captions"],
};

export const disciplines = [
  {
    number: "01",
    title: "Storytelling",
    text: "Structuring footage with purposeful cuts and pacing that keep the story engaging.",
  },
  {
    number: "02",
    title: "Color Grading",
    text: "Enhancing colors, visual consistency, and mood to strengthen the overall viewing experience.",
  },
  {
    number: "03",
    title: "Sound Design",
    text: "Using carefully timed sound effects to enhance movement, transitions, and important moments.",
  },
  {
    number: "04",
    title: "Background Music",
    text: "Selecting and integrating music that complements the mood and rhythm of each edit.",
  },
  {
    number: "05",
    title: "Scene-Integrated Captions",
    text: "Creating captions that blend naturally with the scene, support the message, and add visual energy without distracting from the footage.",
  },
];

export const software = [
  { name: "Adobe Premiere Pro", mark: "Pr" },
  { name: "Adobe After Effects", mark: "Ae" },
  { name: "DaVinci Resolve", mark: "Dr" },
  { name: "Adobe Photoshop", mark: "Ps" },
  { name: "CapCut Pro", mark: "Cc" },
];

export const experience = [
  {
    period: "6 Months",
    title: "Paid Internship",
    role: "Professional Video Editor",
    description:
      "Gained professional video editing experience through a six-month paid internship, developing practical skills in editing, visual storytelling, color grading, music integration, sound effects, and engaging caption design.",
  },
];

export const navItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
] as const;

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function getNextProject(slug: string) {
  const i = projects.findIndex((p) => p.slug === slug);
  return projects[(i + 1) % projects.length] ?? projects[0]!;
}
