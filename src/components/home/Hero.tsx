import { Link } from "@tanstack/react-router";
import { ArrowDownRight } from "lucide-react";
import { useEffect, useRef } from "react";

import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/site/Magnetic";
import { useSmoothScroll } from "@/components/site/SmoothScroll";
import { profile } from "@/data/portfolio";
import { isFinePointer, prefersReducedMotion, useGsap } from "@/lib/motion";

let introPlayed = false;

function Timecode() {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const start = performance.now();
    const pad = (n: number) => String(n).padStart(2, "0");
    const id = window.setInterval(() => {
      const t = (performance.now() - start) / 1000;
      const f = Math.floor((t % 1) * 24);
      if (ref.current)
        ref.current.textContent = `${pad(Math.floor(t / 3600))}:${pad(Math.floor(t / 60) % 60)}:${pad(Math.floor(t) % 60)}:${pad(f)}`;
    }, 1000 / 24);
    return () => window.clearInterval(id);
  }, []);
  return <span ref={ref}>00:00:00:00</span>;
}

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const { scrollTo } = useSmoothScroll();

  useGsap(root, ({ gsap, reduced, mobile }) => {
    const q = gsap.utils.selector(root);
    if (reduced) {
      gsap.set(q("[data-curtain]"), { display: "none" });
      return;
    }

    const first = !introPlayed;
    introPlayed = true;
    const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

    if (first) {
      tl.to(q("[data-curtain-label]"), { opacity: 0, duration: 0.35, delay: 0.45, ease: "power2.in" })
        .to(q("[data-curtain-top]"), { yPercent: -100, duration: 1.1, ease: "expo.inOut" }, "<0.15")
        .to(q("[data-curtain-bottom]"), { yPercent: 100, duration: 1.1, ease: "expo.inOut" }, "<")
        .set(q("[data-curtain]"), { display: "none" });
    } else {
      gsap.set(q("[data-curtain]"), { display: "none" });
    }

    tl.fromTo(q("[data-hero-bg]"), { scale: 1.25 }, { scale: 1, duration: 2.4 }, first ? "-=0.9" : 0)
      .fromTo(q("[data-hero-char]"), { yPercent: 115 }, { yPercent: 0, duration: 1.3, stagger: 0.04 }, "<0.15")
      .fromTo(q("[data-hero-fade]"), { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1.1, stagger: 0.08 }, "<0.45")
      .fromTo(q("[data-hero-line]"), { scaleX: 0 }, { scaleX: 1, duration: 1.4, ease: "expo.inOut" }, "<");

    // Scroll: content drifts up and fades; background parallax
    gsap.to(q("[data-hero-content]"), {
      yPercent: mobile ? -8 : -18,
      opacity: 0.1,
      ease: "none",
      scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
    });
    gsap.to(q("[data-hero-parallax]"), {
      yPercent: 22,
      ease: "none",
      scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
    });
  });

  // Mouse-responsive depth
  useEffect(() => {
    if (!isFinePointer() || prefersReducedMotion() || !root.current) return;
    let cleanup = () => {};
    import("gsap").then(({ gsap }) => {
      const layers = root.current?.querySelectorAll<HTMLElement>("[data-depth]");
      if (!layers) return;
      const setters = Array.from(layers).map((el) => ({
        d: Number(el.dataset["depth"]),
        x: gsap.quickTo(el, "x", { duration: 1.2, ease: "power3" }),
        y: gsap.quickTo(el, "y", { duration: 1.2, ease: "power3" }),
      }));
      const move = (e: PointerEvent) => {
        const nx = e.clientX / window.innerWidth - 0.5;
        const ny = e.clientY / window.innerHeight - 0.5;
        setters.forEach((s) => {
          s.x(nx * s.d);
          s.y(ny * s.d);
        });
      };
      window.addEventListener("pointermove", move, { passive: true });
      cleanup = () => window.removeEventListener("pointermove", move);
    });
    return () => cleanup();
  }, []);

  const [first = "", last = ""] = profile.name.toUpperCase().split(" ");

  return (
    <section
      id="home"
      data-nav="home"
      ref={root}
      className="relative flex min-h-[100svh] flex-col overflow-hidden"
      aria-labelledby="hero-title"
    >
      {/* Loading curtain */}
      <div data-curtain aria-hidden className="pointer-events-none fixed inset-0 z-[70]">
        <div data-curtain-top className="absolute inset-x-0 top-0 h-1/2 bg-background" />
        <div data-curtain-bottom className="absolute inset-x-0 bottom-0 h-1/2 bg-background" />
        <div data-curtain-label className="absolute inset-0 flex items-center justify-center gap-3">
          <span className="rec-dot" />
          <span className="eyebrow text-foreground">Dilshad Khan — Reel loading</span>
        </div>
      </div>

      {/* Cinematic background */}
      <div aria-hidden data-hero-parallax className="absolute inset-0">
        <div data-hero-bg className="absolute inset-0">
          <div data-depth="40" className="absolute -inset-10 bg-hero-glow" />
          <div data-depth="-18" className="absolute inset-0 flex flex-col justify-center gap-[9vh] opacity-40">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-px w-full bg-border" style={{ marginLeft: `${(i % 3) * 8}%` }} />
            ))}
          </div>
          <div
            data-depth="24"
            className="absolute right-[-6vw] top-1/2 -translate-y-1/2 select-none font-display text-[42vw] font-extrabold leading-none tracking-tighter text-outline opacity-20 md:text-[30vw]"
          >
            24
          </div>
        </div>
        <div className="absolute inset-0 bg-vignette" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-fade-bottom" />
      </div>

      {/* Viewfinder HUD */}
      <div aria-hidden className="viewfinder inset-x-4 bottom-6 top-20 sm:inset-x-8 sm:top-24" />
      <div
        aria-hidden
        data-hero-fade
        className="absolute right-6 top-24 hidden items-center gap-3 font-mono text-[0.68rem] tracking-[0.2em] text-muted-foreground sm:right-12 sm:top-28 sm:flex"
      >
        <span className="rec-dot" /> REC <Timecode />
      </div>

      <div data-hero-content className="container-cinema relative flex flex-1 flex-col justify-end pb-20 pt-28 sm:pb-24">
        <p data-hero-fade className="eyebrow mb-6 flex items-center gap-3">
          <span className="h-px w-10 bg-primary" />
          {profile.eyebrow}
        </p>

        <h1 id="hero-title" aria-label={profile.name} className="display-xl">
          <span aria-hidden className="block whitespace-nowrap">
            {first.split("").map((c, i) => (
              <span key={i} className="mask-line">
                <span data-hero-char className="inline-block">
                  {c}
                </span>
              </span>
            ))}
          </span>
          <span aria-hidden className="block whitespace-nowrap pl-[10vw]">
            {last.split("").map((c, i) => (
              <span key={i} className="mask-line">
                <span data-hero-char className="inline-block">
                  {c}
                </span>
              </span>
            ))}
            <span className="mask-line">
              <span data-hero-char className="inline-block text-primary">
                .
              </span>
            </span>
          </span>
        </h1>

        <div data-hero-line className="my-7 h-px w-full origin-left bg-border sm:my-8" />

        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-5">
            <p data-hero-fade className="font-display text-xl font-bold uppercase tracking-tight sm:text-2xl">
              {profile.role}
            </p>
            <p data-hero-fade className="mt-2 font-mono text-xs uppercase tracking-[0.22em] text-primary">
              {profile.tagline}
            </p>
          </div>
          <div className="md:col-span-7 md:pl-8">
            <p data-hero-fade className="max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {profile.intro}
            </p>
            <div data-hero-fade className="mt-8 flex flex-wrap gap-3">
              <Magnetic>
                <Button asChild variant="cinema" size="xl">
                  <Link
                    to="/"
                    hash="work"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo("#work");
                    }}
                  >
                    Explore My Work <ArrowDownRight aria-hidden />
                  </Link>
                </Button>
              </Magnetic>
              <Magnetic>
                <Button asChild variant="cinema-outline" size="xl">
                  <Link
                    to="/"
                    hash="contact"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo("#contact");
                    }}
                  >
                    Let's Connect
                  </Link>
                </Button>
              </Magnetic>
            </div>
          </div>
        </div>
      </div>

      <button
        type="button"
        data-hero-fade
        onClick={() => scrollTo("#about")}
        className="absolute bottom-10 right-12 hidden flex-col items-center gap-3 md:flex"
        aria-label="Scroll to About section"
      >
        <span className="eyebrow">Scroll</span>
        <span className="scroll-line h-12 w-px bg-border" />
      </button>
    </section>
  );
}
