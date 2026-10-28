import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Play } from "lucide-react";
import { useRef, useState, type PointerEvent } from "react";

import { Magnetic } from "@/components/site/Magnetic";
import { ProjectPoster } from "@/components/site/ProjectPoster";
import { SplitReveal } from "@/components/site/SplitReveal";
import { VideoModal } from "@/components/site/VideoModal";
import { projects, type Project } from "@/data/portfolio";
import { isFinePointer, prefersReducedMotion, useGsap } from "@/lib/motion";
import { cn } from "@/lib/utils";

// Asymmetric editorial layout (desktop). Index matches project order.
const layout = [
  { col: "md:col-span-7", aspect: "aspect-[16/10]", offset: "" },
  { col: "md:col-span-4 md:col-start-9", aspect: "aspect-[4/5]", offset: "md:mt-48" },
  { col: "md:col-span-5 md:col-start-2", aspect: "aspect-[4/5]", offset: "md:-mt-24" },
  { col: "md:col-span-6 md:col-start-7", aspect: "aspect-[16/10]", offset: "md:mt-40" },
];

function ProjectCard({ project, index, onPlay }: { project: Project; index: number; onPlay: (p: Project) => void }) {
  const media = useRef<HTMLDivElement>(null);
  const l = layout[index % layout.length] ?? layout[0]!;

  const tilt = (e: PointerEvent<HTMLDivElement>) => {
    if (!media.current || !isFinePointer() || prefersReducedMotion()) return;
    const r = media.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    media.current.style.transform = `perspective(1200px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg)`;
  };
  const reset = () => {
    if (media.current) media.current.style.transform = "";
  };

  return (
    <article data-card className={cn("group relative", l.col, l.offset)}>
      <div className="relative">
        <Link
          to="/projects/$slug"
          params={{ slug: project.slug }}
          data-cursor="view"
          className="block"
          aria-label={`View project ${project.number}: ${project.title}${project.subtitle ? ` — ${project.subtitle}` : ""}`}
        >
          <div
            ref={media}
            onPointerMove={tilt}
            onPointerLeave={reset}
            className="transition-transform duration-700 ease-[var(--ease-out-expo)] will-change-transform"
          >
            <div data-card-media className={cn("relative overflow-hidden rounded-sm border border-border", l.aspect)}>
              <div data-card-parallax className="absolute -inset-y-[8%] inset-x-0">
                <div className="h-full w-full transition-transform duration-[1.4s] ease-[var(--ease-out-expo)] group-hover:scale-[1.06]">
                  <ProjectPoster project={project} />
                </div>
              </div>
              <div className="absolute inset-0 bg-background/10 transition-colors duration-700 group-hover:bg-transparent" />
            </div>
          </div>
        </Link>

        <button
          type="button"
          onClick={() => onPlay(project)}
          className="absolute bottom-4 right-4 z-10 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-red transition-transform duration-500 hover:scale-110"
          aria-label={`Play video: ${project.title} ${project.number}`}
        >
          <Play className="ml-0.5 h-5 w-5 fill-current" aria-hidden />
        </button>
      </div>

      <div className="mt-6 flex items-start justify-between gap-6">
        <div className="flex items-start gap-5">
          <span className="overflow-hidden">
            <span data-card-num className="block font-mono text-sm text-primary">
              {project.number}
            </span>
          </span>
          <div>
            <h3 className="font-display text-2xl font-bold uppercase leading-none tracking-tight sm:text-3xl">
              <Link to="/projects/$slug" params={{ slug: project.slug }} className="link-underline">
                {project.title}
              </Link>
            </h3>
            <p className="mt-2 eyebrow">
              {project.subtitle ? `${project.subtitle} · ` : ""}
              {project.category}
            </p>
          </div>
        </div>
        <Magnetic>
          <Link
            to="/projects/$slug"
            params={{ slug: project.slug }}
            className="hidden shrink-0 items-center gap-2 rounded-full border border-border px-5 py-3 font-mono text-[0.65rem] uppercase tracking-[0.2em] transition-colors duration-500 hover:border-primary hover:bg-primary hover:text-primary-foreground sm:inline-flex"
            tabIndex={-1}
            aria-hidden
          >
            View Project <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </Magnetic>
      </div>
    </article>
  );
}

export function Works() {
  const root = useRef<HTMLElement>(null);
  const [playing, setPlaying] = useState<Project | null>(null);

  useGsap(root, ({ gsap, reduced, mobile }) => {
    if (reduced) return;
    const cards = gsap.utils.toArray<HTMLElement>("[data-card]");
    cards.forEach((card) => {
      const mediaEl = card.querySelector("[data-card-media]");
      const num = card.querySelector("[data-card-num]");
      const tl = gsap.timeline({ scrollTrigger: { trigger: card, start: "top 85%", once: true } });
      tl.fromTo(
        mediaEl,
        { clipPath: "inset(18% 12% 18% 12%)", opacity: 0.2 },
        { clipPath: "inset(0% 0% 0% 0%)", opacity: 1, duration: 1.5, ease: "expo.inOut" },
      ).from(num, { yPercent: 120, duration: 0.9, ease: "expo.out" }, "-=0.6");
      tl.from(card.querySelectorAll("h3, .eyebrow"), { y: 24, opacity: 0, duration: 0.9, stagger: 0.06, ease: "expo.out" }, "<");

      if (!mobile) {
        gsap.fromTo(
          card.querySelector("[data-card-parallax]"),
          { yPercent: -4 },
          { yPercent: 4, ease: "none", scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: true } },
        );
      }
    });
  });

  return (
    <section id="work" data-nav="work" ref={root} className="section-pad relative" aria-labelledby="work-title">
      <div className="container-cinema">
        <div className="mb-16 flex items-center justify-between gap-6 sm:mb-24">
          <p className="eyebrow">(02) — Work</p>
          <p className="eyebrow">{String(projects.length).padStart(2, "0")} Projects</p>
        </div>

        <div className="mb-20 grid gap-8 md:grid-cols-12 md:items-end sm:mb-28">
          <SplitReveal
            id="work-title"
            as="h2"
            text="Selected works."
            accent={["works"]}
            className="display-xl uppercase md:col-span-8"
          />
          <p className="max-w-sm text-lg text-muted-foreground md:col-span-4 md:justify-self-end">
            Every frame has a purpose. Every edit tells a story.
          </p>
        </div>

        <div className="grid gap-20 md:grid-cols-12 md:gap-x-8 md:gap-y-0">
          {projects.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} onPlay={setPlaying} />
          ))}
        </div>
      </div>

      <VideoModal project={playing} onOpenChange={(o) => !o && setPlaying(null)} />
    </section>
  );
}
