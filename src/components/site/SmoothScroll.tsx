import Lenis from "lenis";
import { useLocation } from "@tanstack/react-router";
import { createContext, useCallback, useContext, useEffect, useRef, type ReactNode } from "react";

import { ensureGsap, prefersReducedMotion } from "@/lib/motion";

type ScrollTo = (target: string | number, opts?: { immediate?: boolean }) => void;

const SmoothScrollContext = createContext<{ scrollTo: ScrollTo }>({
  scrollTo: () => {},
});

export function useSmoothScroll() {
  return useContext(SmoothScrollContext);
}

const NAV_OFFSET = -72;

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const { gsap, ScrollTrigger } = ensureGsap();
    if (prefersReducedMotion()) return;

    const lenis = new Lenis({ duration: 1.15, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    lenisRef.current = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const scrollTo = useCallback<ScrollTo>((target, opts) => {
    const lenis = lenisRef.current;
    const el = typeof target === "string" ? document.querySelector<HTMLElement>(target) : null;
    if (typeof target === "string" && !el) return;
    if (lenis) {
      lenis.scrollTo(el ?? (target as number), {
        offset: el ? NAV_OFFSET : 0,
        immediate: !!opts?.immediate,
        duration: 1.4,
      });
    } else {
      const top = el ? el.getBoundingClientRect().top + window.scrollY + NAV_OFFSET : (target as number);
      window.scrollTo({ top, behavior: opts?.immediate || prefersReducedMotion() ? "auto" : "smooth" });
    }
  }, []);

  // Route change: jump to the section in the hash, or to the top, then recalc triggers.
  useEffect(() => {
    const { ScrollTrigger } = ensureGsap();
    const id = window.setTimeout(() => {
      if (hash) scrollTo(`#${hash}`, { immediate: false });
      else scrollTo(0, { immediate: true });
      ScrollTrigger.refresh();
    }, 80);
    return () => window.clearTimeout(id);
  }, [pathname, hash, scrollTo]);

  return <SmoothScrollContext.Provider value={{ scrollTo }}>{children}</SmoothScrollContext.Provider>;
}
