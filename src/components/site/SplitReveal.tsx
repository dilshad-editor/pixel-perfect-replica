import { createElement, useRef, type ElementType } from "react";

import { cn } from "@/lib/utils";
import { useGsap } from "@/lib/motion";

type Props = {
  text: string;
  as?: ElementType;
  className?: string;
  /** Animate on mount instead of when scrolled into view. */
  immediate?: boolean;
  delay?: number;
  /** Split per character instead of per word. */
  chars?: boolean;
  /** Words (case-insensitive) to render with the red accent. */
  accent?: string[];
  id?: string;
};

/** Masked, staggered headline reveal. Text stays readable to screen readers via aria-label. */
export function SplitReveal({ text, as = "h2", className, immediate, delay = 0, chars, accent = [], id }: Props) {
  const ref = useRef<HTMLElement>(null);

  useGsap(ref, ({ gsap, reduced, mobile }) => {
    const targets = ref.current!.querySelectorAll("[data-split]");
    if (reduced) {
      gsap.set(targets, { yPercent: 0, opacity: 1 });
      return;
    }
    gsap.set(targets, { y: 0, yPercent: 110, rotate: chars ? 0 : 4, opacity: 1 });
    gsap.to(targets, {
      y: 0,
      yPercent: 0,
      rotate: 0,
      duration: mobile ? 0.9 : 1.2,
      ease: "expo.out",
      stagger: chars ? 0.035 : 0.07,
      delay,
      ...(immediate ? {} : { scrollTrigger: { trigger: ref.current!, start: "top 85%", once: true } }),
    });
  });

  const words = text.split(" ");
  const accentSet = new Set(accent.map((a) => a.toLowerCase()));

  return createElement(
    as,
    { ref, id, className: cn(className), "aria-label": text },
    words.map((word, wi) => {
      const isAccent = accentSet.has(word.toLowerCase().replace(/[^a-z]/g, ""));
      return (
        <span key={wi} aria-hidden className="inline-block whitespace-nowrap">
          {chars ? (
            word.split("").map((c, ci) => (
              <span key={ci} className="mask-line">
                <span data-split className={cn("inline-block", isAccent && "text-primary")}>
                  {c}
                </span>
              </span>
            ))
          ) : (
            <span className="mask-line">
              <span data-split className={cn("inline-block", isAccent && "text-primary")}>
                {word}
              </span>
            </span>
          )}
          {wi < words.length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      );
    }),
  );
}
