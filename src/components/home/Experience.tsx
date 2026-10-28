import { useRef } from "react";

import { SplitReveal } from "@/components/site/SplitReveal";
import { experience } from "@/data/portfolio";
import { useGsap } from "@/lib/motion";

export function Experience() {
  const root = useRef<HTMLElement>(null);

  useGsap(root, ({ gsap, reduced }) => {
    if (reduced) return;
    gsap.fromTo(
      "[data-timeline-line]",
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: "none",
        scrollTrigger: { trigger: "[data-timeline]", start: "top 75%", end: "bottom 60%", scrub: true },
      },
    );
    gsap.utils.toArray<HTMLElement>("[data-entry]").forEach((el) => {
      gsap.from(el, { x: 40, opacity: 0, duration: 1.1, ease: "expo.out", scrollTrigger: { trigger: el, start: "top 80%", once: true } });
    });
  });

  return (
    <section id="experience" data-nav="skills" ref={root} className="section-pad relative border-t border-border" aria-labelledby="exp-title">
      <div className="container-cinema grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="eyebrow mb-8">(05) — Experience</p>
          <SplitReveal id="exp-title" as="h2" text="My creative journey." accent={["journey"]} className="display-md uppercase" />
        </div>

        <ol data-timeline className="relative lg:col-span-7">
          <div aria-hidden className="absolute bottom-0 left-[7px] top-2 w-px bg-border">
            <div data-timeline-line className="h-full w-px origin-top bg-primary" />
          </div>
          {experience.map((e) => (
            <li key={e.title} data-entry className="relative pb-6 pl-12">
              <span aria-hidden className="absolute left-0 top-2 h-[15px] w-[15px] rounded-full border border-primary bg-background">
                <span className="absolute inset-[3px] rounded-full bg-primary" />
              </span>
              <p className="font-mono text-xs uppercase tracking-[0.22em] text-primary">{e.period}</p>
              <h3 className="mt-3 font-display text-3xl font-extrabold uppercase leading-none tracking-tight sm:text-5xl">
                {e.title}
              </h3>
              <p className="mt-3 eyebrow">{e.role}</p>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">{e.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
