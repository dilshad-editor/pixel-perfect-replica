import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";

import { Button } from "@/components/ui/button";
import { socials } from "@/components/site/Footer";
import { Magnetic } from "@/components/site/Magnetic";
import { SplitReveal } from "@/components/site/SplitReveal";
import { contact } from "@/data/portfolio";
import { useGsap } from "@/lib/motion";

export function Contact({ compact = false }: { compact?: boolean }) {
  const root = useRef<HTMLElement>(null);

  useGsap(root, ({ gsap, reduced }) => {
    if (reduced) return;
    gsap.from("[data-contact-fade]", {
      y: 40,
      opacity: 0,
      duration: 1.1,
      ease: "expo.out",
      stagger: 0.07,
      scrollTrigger: { trigger: root.current, start: "top 60%", once: true },
    });
    gsap.fromTo(
      "[data-contact-glow]",
      { scale: 0.6, opacity: 0 },
      { scale: 1, opacity: 1, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "center center", scrub: true } },
    );
  });

  return (
    <section
      id="contact"
      data-nav="contact"
      ref={root}
      className={`relative flex flex-col justify-center overflow-hidden border-t border-border ${compact ? "py-28 sm:py-40" : "min-h-[100svh] py-28"}`}
      aria-labelledby="contact-title"
    >
      <div aria-hidden data-contact-glow className="absolute inset-0 bg-hero-glow" />
      <div className="container-cinema relative">
        <p data-contact-fade className="eyebrow mb-10 flex items-center gap-3">
          <span className="rec-dot" /> {compact ? "Next scene" : "(06) — Contact"}
        </p>
        <SplitReveal
            id="contact-title"
          as="h2"
          text="Let's create something worth watching."
          accent={["watching"]}
          className="display-xl max-w-[14ch] uppercase"
        />

        <div className="mt-14 grid gap-12 md:grid-cols-12 md:items-end">
          <div className="md:col-span-6">
            <p data-contact-fade className="max-w-md text-lg text-muted-foreground sm:text-xl">
              Have a project in mind? Let's bring your vision to life.
            </p>
            <div data-contact-fade className="mt-8">
              <Magnetic strength={0.25}>
                <Button asChild variant="cinema" size="xl">
                  <a href={`mailto:${contact.email}`}>
                    Let's Work Together <ArrowUpRight aria-hidden />
                  </a>
                </Button>
              </Magnetic>
            </div>
            <a
              data-contact-fade
              href={`mailto:${contact.email}`}
              className="link-underline mt-10 inline-block break-all font-display text-xl font-bold sm:text-3xl"
            >
              {contact.email}
            </a>
          </div>

          <ul className="md:col-span-5 md:col-start-8">
            {socials.map(({ label, href, icon: Icon, external }) => (
              <li key={label} data-contact-fade className="border-t border-border last:border-b">
                <a
                  href={href}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group flex items-center justify-between py-5 transition-colors hover:text-primary"
                >
                  <span className="flex items-center gap-4">
                    <Icon className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-primary" aria-hidden />
                    <span className="font-display text-2xl font-bold uppercase tracking-tight transition-transform duration-500 group-hover:translate-x-2">
                      {label}
                    </span>
                  </span>
                  <ArrowUpRight
                    className="h-5 w-5 transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1"
                    aria-hidden
                  />
                  {external && <span className="sr-only">(opens in new tab)</span>}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
