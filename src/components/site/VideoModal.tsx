import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";

import type { Project } from "@/data/portfolio";
import { VideoPlayer } from "@/components/site/VideoPlayer";

type Props = {
  project: Project | null;
  onOpenChange: (open: boolean) => void;
};

/** Accessible full-screen video dialog; the player only mounts while open. */
export function VideoModal({ project, onOpenChange }: Props) {
  return (
    <DialogPrimitive.Root open={!!project} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-[80] bg-background/90 backdrop-blur-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content
          data-lenis-prevent
          className="fixed left-1/2 top-1/2 z-[90] max-h-[92vh] w-[min(1200px,94vw)] -translate-x-1/2 -translate-y-1/2 overflow-y-auto focus:outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95"
        >
          {project && (
            <>
              <div className="mb-4 flex items-end justify-between gap-4">
                <div>
                  <p className="eyebrow">
                    {project.number} — {project.category}
                  </p>
                  <DialogPrimitive.Title className="mt-2 font-display text-2xl font-bold sm:text-4xl">
                    {project.title}
                    {project.subtitle && <span className="text-muted-foreground"> — {project.subtitle}</span>}
                  </DialogPrimitive.Title>
                  <DialogPrimitive.Description className="sr-only">
                    Video player for {project.title}
                  </DialogPrimitive.Description>
                </div>
                <DialogPrimitive.Close
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-primary hover:text-primary"
                  aria-label="Close video"
                >
                  <X className="h-5 w-5" />
                </DialogPrimitive.Close>
              </div>
              <VideoPlayer project={project} autoLoad />
            </>
          )}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
