import { ImageIcon } from "lucide-react";
import { useRef } from "react";

import { SplitReveal } from "@/components/site/SplitReveal";
import { profile } from "@/data/portfolio";
import { useGsap } from "@/lib/motion";

export function About() {
  const root = useRef<HTMLElement>(null);

  useGsap(root, ({ gsap, reduced, mobile }) => {
    const q = gsap.utils.selector(root);
    const at = (sel: string) => (q(sel)[0] as HTMLElement | undefined) ?? root.current!;
    if (reduced) return;

    gsap.fromTo(
      q("[data-portrait]"),
      { clipPath: "inset(100% 0% 0% 0%)" },
      {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 1.6,
        ease: "expo.inOut",
        scrollTrigger: { trigger: at("[data-portrait]"), start: "top 80%", once: true },
      },
    );
    if (!mobile) {
      gsap.fromTo(
        q("[data-portrait-inner]"),
        { yPercent: -10, scale: 1.15 },
        {
          yPercent: 10,
          scale: 1.15,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true },
        },
      );
    }
    gsap.from(q("[data-about-fade]"), {
      y: 40,
      opacity: 0,
      duration: 1,
      ease: "expo.out",
      stagger: 0.08,
      scrollTrigger: { trigger: at("[data-about-copy]"), start: "top 75%", once: true },
    });
    gsap.from(q("[data-divider]"), {
      scaleX: 0,
      duration: 1.4,
      ease: "expo.inOut",
      stagger: 0.05,
      scrollTrigger: { trigger: at("[data-about-copy]"), start: "top 75%", once: true },
    });
    gsap.from(q("[data-exp-bar]"), {
      scaleX: 0,
      duration: 2,
      ease: "expo.out",
      scrollTrigger: { trigger: at("[data-exp-bar]"), start: "top 90%", once: true },
    });
    const counter = { v: 0 };
    const el = q("[data-exp-count]")[0] as HTMLElement | undefined;
    if (el)
      gsap.to(counter, {
        v: 6,
        duration: 1.6,
        ease: "power3.out",
        onUpdate: () => (el.textContent = String(Math.round(counter.v))),
        scrollTrigger: { trigger: el, start: "top 90%", once: true },
      });
  });

  return (
    <section id="about" data-nav="about" ref={root} className="section-pad relative" aria-labelledby="about-title">
      <div className="container-cinema">
        <div className="mb-14 flex items-center justify-between gap-6 sm:mb-20">
          <p className="eyebrow">(01) — About</p>
          <p className="eyebrow hidden sm:block">The editor</p>
        </div>

        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          {/* Portrait */}
          <div className="lg:col-span-5">
            <div data-portrait className="relative aspect-[4/5] w-full overflow-hidden rounded-sm border border-border bg-surface">
              <div data-portrait-inner className="absolute inset-0">
                {profile.photo ? (
                  <img
                    src={profile.photo}
                    alt="Portrait of Dilshad Khan, professional video editor"
                    loading="lazy"
                    className="h-full w-full object-cover grayscale-[20%]"
                  />
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center gap-4 bg-poster p-8 text-center">
                    <ImageIcon className="h-8 w-8 text-muted-foreground" aria-hidden />
                    <p className="eyebrow text-foreground">Photo placeholder</p>
                    <p className="max-w-[16rem] text-xs leading-relaxed text-muted-foreground">
                      Professional photograph of Dilshad Khan will appear here once uploaded.
                    </p>
                  </div>
                )}
              </div>
              <div aria-hidden className="viewfinder inset-4" />
              <span className="absolute bottom-4 left-4 font-mono text-[0.65rem] tracking-[0.2em] text-muted-foreground">
                DK — FRAME 001
              </span>
            </div>
          </div>

          {/* Copy */}
          <div data-about-copy className="lg:col-span-7 lg:pt-6">
            <SplitReveal
            id="about-title"
              as="h2"
              text="The person behind the edits."
              accent={["edits"]}
              className="display-lg uppercase"
            />

            <p data-about-fade className="mt-10 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
              {profile.bio}
            </p>

            {/* Experience indicator */}
            <div data-about-fade className="mt-12 rounded-sm border border-border bg-surface p-6 sm:p-8">
              <div className="flex items-end gap-5">
                <span className="font-display text-7xl font-extrabold leading-none text-primary sm:text-8xl">
                  <span data-exp-count>6</span>
                </span>
                <div className="pb-2">
                  <p className="font-display text-lg font-bold uppercase leading-tight sm:text-xl">Months</p>
                  <p className="text-sm text-muted-foreground">of paid internship experience</p>
                </div>
              </div>
              <div className="mt-6 h-px w-full bg-border">
                <div data-exp-bar className="h-px w-full origin-left bg-primary" />
              </div>
            </div>

            <h3 data-about-fade className="eyebrow mt-14 text-foreground">
              Specializations
            </h3>
            <ul className="mt-6 grid sm:grid-cols-2 sm:gap-x-10">
              {profile.specializations.map((s, i) => (
                <li key={s} data-about-fade className="relative py-4">
                  <div data-divider className="absolute inset-x-0 top-0 h-px origin-left bg-border" />
                  <span className="flex items-baseline gap-4">
                    <span className="font-mono text-[0.68rem] text-primary">{String(i + 1).padStart(2, "0")}</span>
                    <span className="text-base">{s}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
