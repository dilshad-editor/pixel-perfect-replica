import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useLayoutEffect, type RefObject } from "react";

let registered = false;
export function ensureGsap() {
  if (!registered && typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
    registered = true;
    if (import.meta.env.DEV) (window as unknown as { __ST: unknown }).__ST = ScrollTrigger;
  }
  return { gsap, ScrollTrigger };
}

export function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function isFinePointer() {
  return typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Runs GSAP code scoped to a ref and reverts every tween/ScrollTrigger on unmount.
 * The callback receives `reduced` so it can skip or simplify motion.
 */
export function useGsap(
  scope: RefObject<HTMLElement | null>,
  setup: (ctx: { gsap: typeof gsap; ScrollTrigger: typeof ScrollTrigger; reduced: boolean; mobile: boolean }) => void,
  deps: unknown[] = [],
) {
  useIsoLayoutEffect(() => {
    if (!scope.current) return;
    ensureGsap();
    const reduced = prefersReducedMotion();
    const mobile = window.matchMedia("(max-width: 767px)").matches;
    const ctx = gsap.context(() => setup({ gsap, ScrollTrigger, reduced, mobile }), scope);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
