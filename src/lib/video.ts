import type { VideoSource } from "@/data/portfolio";

/** URL for an on-demand iframe player, or null when the source should use a native <video>. */
export function getEmbedUrl(video: VideoSource): string | null {
  switch (video.type) {
    case "drive":
      return `https://drive.google.com/file/d/${video.id}/preview`;
    case "youtube":
      return `https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0`;
    case "vimeo":
      return `https://player.vimeo.com/video/${video.id}?autoplay=1`;
    default:
      return null;
  }
}

/** Link that opens the video on its host site in a new tab. */
export function getExternalUrl(video: VideoSource): string | null {
  switch (video.type) {
    case "drive":
      return `https://drive.google.com/file/d/${video.id}/view`;
    case "youtube":
      return `https://www.youtube.com/watch?v=${video.id}`;
    case "vimeo":
      return `https://vimeo.com/${video.id}`;
    case "file":
      return video.src;
    default:
      return null;
  }
}

/** The host's own preview frame of the uploaded video (not a substitute image). */
export function getHostThumbnail(video: VideoSource): string | null {
  switch (video.type) {
    case "drive":
      return `https://drive.google.com/thumbnail?id=${video.id}&sz=w1600`;
    case "youtube":
      return `https://i.ytimg.com/vi/${video.id}/maxresdefault.jpg`;
    default:
      return null;
  }
}

export function getHostLabel(video: VideoSource): string {
  switch (video.type) {
    case "drive":
      return "Google Drive";
    case "youtube":
      return "YouTube";
    case "vimeo":
      return "Vimeo";
    default:
      return "new tab";
  }
}

/** Hover-autoplay previews are only allowed for browser-playable files. */
export function canAutoplayPreview(video: VideoSource): boolean {
  return video.type === "file";
}
