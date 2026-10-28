import { useEffect, useRef, useState } from "react";

import { ensureGsap, isFinePointer, prefersReducedMotion } from "@/lib/motion";

/** Minimal circular cursor. Grows and reads "VIEW" over elements marked data-cursor="view". */
export function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [mode, setMode] = useState<"default" | "view" | "link">("default");

  useEffect(() => {
    if (!isFinePointer() || prefersReducedMotion()) return;
    setEnabled(true);
    document.documentElement.classList.add("has-custom-cursor");
    return () => document.documentElement.classList.remove("has-custom-cursor");
  }, []);

  useEffect(() => {
    if (!enabled || !dot.current || !ring.current) return;
    const { gsap } = ensureGsap();
    gsap.set([dot.current, ring.current], { xPercent: -50, yPercent: -50, x: -100, y: -100 });
    const dx = gsap.quickTo(dot.current, "x", { duration: 0.12, ease: "power3" });
    const dy = gsap.quickTo(dot.current, "y", { duration: 0.12, ease: "power3" });
    const rx = gsap.quickTo(ring.current, "x", { duration: 0.45, ease: "power3" });
    const ry = gsap.quickTo(ring.current, "y", { duration: 0.45, ease: "power3" });

    const move = (e: PointerEvent) => {
      dx(e.clientX);
      dy(e.clientY);
      rx(e.clientX);
      ry(e.clientY);
      const t = e.target as HTMLElement | null;
      if (t?.closest('[data-cursor="view"]')) setMode("view");
      else if (t?.closest("a, button, [role='button']")) setMode("link");
      else setMode("default");
    };
    const leave = () => gsap.to([dot.current, ring.current], { opacity: 0, duration: 0.3 });
    const enter = () => gsap.to([dot.current, ring.current], { opacity: 1, duration: 0.3 });

    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", leave);
    document.addEventListener("pointerenter", enter);
    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
      document.removeEventListener("pointerenter", enter);
    };
  }, [enabled]);

  if (!enabled) return null;

  const ringSize = mode === "view" ? "h-24 w-24 bg-primary border-primary" : mode === "link" ? "h-12 w-12 border-primary" : "h-8 w-8 border-foreground/50";

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[100]">
      <div
        ref={ring}
        className={`fixed left-0 top-0 flex items-center justify-center rounded-full border transition-[width,height,background-color,border-color] duration-500 ease-[var(--ease-out-expo)] ${ringSize}`}
      >
        <span
          className={`font-mono text-[0.65rem] tracking-[0.25em] text-primary-foreground transition-opacity duration-300 ${mode === "view" ? "opacity-100" : "opacity-0"}`}
        >
          VIEW
        </span>
      </div>
      <div
        ref={dot}
        className={`fixed left-0 top-0 h-1.5 w-1.5 rounded-full bg-primary transition-opacity duration-300 ${mode === "view" ? "opacity-0" : "opacity-100"}`}
      />
    </div>
  );
}
