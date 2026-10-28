import { useEffect, useRef, useState } from "react";

import type { Project } from "@/data/portfolio";
import { getHostThumbnail } from "@/lib/video";
import { cn } from "@/lib/utils";

/**
 * Poster for a project: custom thumbnail → the video host's own preview frame → a labelled placeholder.
 * Never substitutes unrelated imagery.
 */
export function ProjectPoster({ project, className, priority }: { project: Project; className?: string; priority?: boolean }) {
  const src = project.thumbnail ?? getHostThumbnail(project.video);
  const [failed, setFailed] = useState(!src);
  const [loaded, setLoaded] = useState(false);
  const img = useRef<HTMLImageElement>(null);

  // Catch load errors that happened before hydration.
  useEffect(() => {
    const el = img.current;
    if (el && el.complete) {
      if (el.naturalWidth === 0) setFailed(true);
      else setLoaded(true);
    }
  }, []);

  return (
    <div className={cn("relative h-full w-full overflow-hidden bg-poster", className)}>
      {!failed && src && (
        <img
          ref={img}
          src={src}
          alt={`Preview frame from ${project.title}${project.subtitle ? ` — ${project.subtitle}` : ""}, project ${project.number}`}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          referrerPolicy="no-referrer"
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          className={cn(
            "absolute inset-0 h-full w-full object-cover transition-opacity duration-700",
            loaded ? "opacity-100" : "opacity-0",
          )}
        />
      )}

      {(failed || !loaded) && (
        <div className="absolute inset-0 flex flex-col justify-between p-5 sm:p-7">
          <div className="flex items-center justify-between">
            <span className="eyebrow">{project.category}</span>
            <span className="font-mono text-[0.65rem] tracking-[0.2em] text-muted-foreground">
              {failed ? "THUMBNAIL PENDING" : "LOADING"}
            </span>
          </div>
          <div aria-hidden className="select-none font-display text-[clamp(5rem,16vw,14rem)] font-extrabold leading-none tracking-tighter text-outline">
            {project.number}
          </div>
          <div className="viewfinder inset-2" />
        </div>
      )}
    </div>
  );
}
