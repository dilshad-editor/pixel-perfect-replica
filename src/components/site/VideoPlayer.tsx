import { ExternalLink, Loader2, Play, VideoOff } from "lucide-react";
import { useState } from "react";

import type { Project } from "@/data/portfolio";
import { ProjectPoster } from "@/components/site/ProjectPoster";
import { getEmbedUrl, getExternalUrl, getHostLabel } from "@/lib/video";
import { cn } from "@/lib/utils";

type Props = {
  project: Project;
  className?: string;
  /** Start loading the player right away (used inside the modal). */
  autoLoad?: boolean;
};

/** Poster first; the iframe/video only loads after the visitor presses play. */
export function VideoPlayer({ project, className, autoLoad }: Props) {
  const [active, setActive] = useState(!!autoLoad);
  const [ready, setReady] = useState(false);
  const embed = getEmbedUrl(project.video);
  const external = getExternalUrl(project.video);
  const unavailable = project.video.type === "none";
  const label = `${project.title}${project.subtitle ? ` — ${project.subtitle}` : ""} (Project ${project.number})`;

  return (
    <div className={cn("w-full", className)}>
      <div
        className="relative w-full overflow-hidden rounded-sm border border-border bg-surface shadow-cinema"
        style={{ aspectRatio: project.aspect }}
      >
        {unavailable ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center">
            <VideoOff className="h-8 w-8 text-muted-foreground" aria-hidden />
            <p className="eyebrow">Video coming soon</p>
          </div>
        ) : !active ? (
          <button
            type="button"
            onClick={() => setActive(true)}
            className="group absolute inset-0 h-full w-full text-left"
            aria-label={`Play video: ${label}`}
          >
            <ProjectPoster project={project} />
            <span className="absolute inset-0 bg-background/30 transition-colors duration-500 group-hover:bg-background/10" />
            <span className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-red transition-transform duration-500 group-hover:scale-110 sm:h-24 sm:w-24">
              <Play className="ml-1 h-7 w-7 fill-current" aria-hidden />
            </span>
            <span className="absolute bottom-4 left-4 eyebrow text-foreground">Play — {project.number}</span>
          </button>
        ) : embed ? (
          <>
            {!ready && (
              <div className="absolute inset-0 flex items-center justify-center gap-3">
                <Loader2 className="h-5 w-5 animate-spin text-primary" aria-hidden />
                <span className="eyebrow">Loading player</span>
              </div>
            )}
            <iframe
              src={embed}
              title={`Video player: ${label}`}
              className="absolute inset-0 h-full w-full"
              allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
              allowFullScreen
              onLoad={() => setReady(true)}
            />
          </>
        ) : project.video.type === "file" ? (
          <video
            className="absolute inset-0 h-full w-full bg-background object-contain"
            controls
            autoPlay
            playsInline
            preload="metadata"
            aria-label={`Video: ${label}`}
          >
            <source src={project.video.src} type={project.video.mimeType ?? "video/mp4"} />
          </video>
        ) : null}
      </div>

      {external && (
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            Video not playing? It may be restricted from embedding.
          </p>
          <a
            href={external}
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline inline-flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-foreground"
          >
            Open in {getHostLabel(project.video)} <ExternalLink className="h-3.5 w-3.5" aria-hidden />
          </a>
        </div>
      )}
    </div>
  );
}
