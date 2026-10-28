import { useRef } from "react";

import { SplitReveal } from "@/components/site/SplitReveal";
import { software } from "@/data/portfolio";
import { useGsap } from "@/lib/motion";

export function Software() {
  const root = useRef<HTMLElement>(null);

  useGsap(root, ({ gsap, reduced }) => {
    if (reduced) return;
    gsap.from("[data-tool]", {
      y: 60,
      opacity: 0,
      duration: 1.1,
      ease: "expo.out",
      stagger: 0.08,
      scrollTrigger: { trigger: "[data-tool-grid]", start: "top 82%", once: true },
    });
  });

  return (
    <section id="skills" data-nav="skills" ref={root} className="section-pad relative" aria-labelledby="skills-title">
      <div className="container-cinema">
        <div className="mb-14 flex items-center justify-between gap-6 sm:mb-20">
          <p className="eyebrow">(04) — Skills</p>
          <p className="eyebrow">Software</p>
        </div>
        <SplitReveal
            id="skills-title"
          as="h2"
          text="The tools behind the creativity."
          accent={["creativity"]}
          className="display-lg max-w-5xl uppercase"
        />

        <ul data-tool-grid className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-sm border border-border bg-border sm:mt-24 sm:grid-cols-2 lg:grid-cols-5">
          {software.map((s, i) => (
            <li
              key={s.name}
              data-tool
              className="group relative flex min-h-[15rem] flex-col justify-between bg-background p-7 transition-colors duration-500 hover:bg-surface lg:min-h-[20rem]"
            >
              <div className="flex items-start justify-between">
                <span
                  aria-hidden
                  className="flex h-16 w-16 items-center justify-center rounded-md border border-border bg-elevated font-display text-2xl font-extrabold tracking-tight transition-all duration-500 group-hover:-translate-y-1 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground"
                >
                  {s.mark}
                </span>
                <span className="font-mono text-[0.65rem] text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <div>
                <span className="mb-4 block h-px w-8 bg-primary transition-all duration-700 group-hover:w-16" />
                <h3 className="font-display text-xl font-bold uppercase leading-tight tracking-tight">{s.name}</h3>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
