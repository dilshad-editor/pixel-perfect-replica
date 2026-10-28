import { useEffect, useRef, useState } from "react";

import { SplitReveal } from "@/components/site/SplitReveal";
import { disciplines } from "@/data/portfolio";
import { ensureGsap, prefersReducedMotion, useGsap } from "@/lib/motion";
import { cn } from "@/lib/utils";

const INTRO =
  "Editing is more than cutting clips together. It's about building emotion, controlling rhythm, shaping atmosphere, and making every visual element work together.";

/** Pinned storytelling section on desktop; a simple stacked list on mobile / reduced motion. */
export function Beyond() {
  const [pinned, setPinned] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(min-width: 1024px)").matches && !prefersReducedMotion()) setPinned(true);
  }, []);

  return (
    <section
      id="beyond"
      data-nav="work"
      className="relative border-t border-border bg-surface"
      aria-labelledby="beyond-title"
    >
      {pinned ? <PinnedDisciplines /> : <StackedDisciplines />}
    </section>
  );
}

function Header({ split = true }: { split?: boolean }) {
  return (
    <>
      <p className="eyebrow mb-8">(03) — Craft</p>
      {split ? (
        <SplitReveal id="beyond-title" as="h2" text="Beyond basic editing." accent={["editing"]} className="display-lg uppercase" />
      ) : (
        <h2 id="beyond-title" data-beyond-title className="display-md uppercase">
          Beyond basic <span className="text-primary">editing.</span>
        </h2>
      )}
      <p className="mt-8 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">{INTRO}</p>
    </>
  );
}

function PinnedDisciplines() {
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);

  useGsap(root, ({ gsap, ScrollTrigger }) => {
    const n = disciplines.length;
    // clip-path (not transforms) — transforms inside the pinned element get re-parsed on refresh
    gsap.fromTo(
      "[data-beyond-title]",
      { clipPath: "inset(0% 0% 100% 0%)" },
      {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 1.3,
        ease: "expo.out",
        scrollTrigger: { trigger: root.current, start: "top 70%", once: true },
      },
    );
    ScrollTrigger.create({
      trigger: root.current,
      start: "top top",
      end: `+=${n * 70}%`,
      pin: true,
      scrub: true,
      onUpdate: (self) => {
        const i = Math.min(n - 1, Math.floor(self.progress * n));
        if (i !== activeRef.current) {
          activeRef.current = i;
          setActive(i);
        }
        gsap.set("[data-beyond-progress]", { scaleY: self.progress });
      },
    });
  });

  useEffect(() => {
    // Other sections were measured before this one pinned; re-measure.
    const id = window.setTimeout(() => {
      const { ScrollTrigger } = ensureGsap();
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
    }, 100);
    return () => window.clearTimeout(id);
  }, []);

  const current = disciplines[active] ?? disciplines[0]!;

  return (
    <div ref={root} className="relative flex h-screen items-center overflow-hidden">
      <div className="container-cinema grid grid-cols-12 gap-10">
        <div className="col-span-5 flex flex-col justify-center">
          <Header split={false} />
          <ol className="mt-12 space-y-3">
            {disciplines.map((d, i) => (
              <li
                key={d.number}
                className={cn(
                  "flex items-center gap-4 font-mono text-[0.7rem] uppercase tracking-[0.2em] transition-colors duration-500",
                  i === active ? "text-foreground" : "text-muted-foreground/50",
                )}
              >
                <span className={cn("h-px transition-all duration-700", i === active ? "w-10 bg-primary" : "w-4 bg-border")} />
                {d.number} — {d.title}
              </li>
            ))}
          </ol>
        </div>

        <div className="relative col-span-6 col-start-7 flex h-[70vh] items-center">
          <div aria-hidden className="absolute -left-8 top-0 h-full w-px bg-border">
            <div data-beyond-progress className="h-full w-px origin-top scale-y-0 bg-primary" />
          </div>
          <div className="relative h-full w-full">
            {disciplines.map((d, i) => (
              <article
                key={d.number}
                aria-hidden={i !== active}
                className={cn(
                  "absolute inset-0 flex flex-col justify-center transition-all duration-700 ease-[var(--ease-out-expo)]",
                  i === active
                    ? "translate-y-0 opacity-100"
                    : i < active
                      ? "-translate-y-12 opacity-0"
                      : "translate-y-12 opacity-0",
                )}
              >
                <span className="font-display text-[10rem] font-extrabold leading-none tracking-tighter text-outline xl:text-[12rem]">
                  {d.number}
                </span>
                <h3 className="mt-2 font-display text-[clamp(2rem,3.4vw,3.4rem)] font-extrabold uppercase leading-none tracking-tight">
                  {d.title}
                </h3>
                <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground">{d.text}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
      <p className="sr-only" aria-live="polite">
        {current.number} {current.title}
      </p>
    </div>
  );
}

function StackedDisciplines() {
  const root = useRef<HTMLDivElement>(null);
  useGsap(root, ({ gsap, reduced }) => {
    if (reduced) return;
    gsap.utils.toArray<HTMLElement>("[data-discipline]").forEach((el) => {
      gsap.from(el, { y: 40, opacity: 0, duration: 1, ease: "expo.out", scrollTrigger: { trigger: el, start: "top 88%", once: true } });
      gsap.from(el.querySelector("[data-line]"), {
        scaleX: 0,
        duration: 1.3,
        ease: "expo.inOut",
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
      });
    });
  });

  return (
    <div ref={root} className="section-pad">
      <div className="container-cinema">
        <Header />
        <ol className="mt-16">
          {disciplines.map((d) => (
            <li key={d.number} data-discipline className="relative py-10">
              <div data-line className="absolute inset-x-0 top-0 h-px origin-left bg-border" />
              <div className="flex items-baseline gap-5">
                <span className="font-mono text-xs text-primary">{d.number}</span>
                <div>
                  <h3 className="font-display text-[1.6rem] font-extrabold uppercase leading-none tracking-tight sm:text-5xl">
                    {d.title}
                  </h3>
                  <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">{d.text}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
