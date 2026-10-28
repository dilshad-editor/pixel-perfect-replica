import { behindTheEdit } from "@/data/portfolio";

/** Slow typographic band between sections. Pure CSS transform loop. */
export function Marquee() {
  const items = [...behindTheEdit.tags, ...behindTheEdit.tags];
  return (
    <div aria-hidden className="relative overflow-hidden border-y border-border py-6 sm:py-8">
      <div className="marquee-track flex w-max gap-10">
        {[0, 1].map((k) => (
          <div key={k} className="flex shrink-0 items-center gap-10">
            {items.map((t, i) => (
              <span key={`${k}-${i}`} className="flex items-center gap-10">
                <span className={`font-display text-4xl font-extrabold uppercase tracking-tight sm:text-6xl ${i % 2 ? "text-outline" : ""}`}>
                  {t}
                </span>
                <span className="h-2.5 w-2.5 rounded-full bg-primary" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
