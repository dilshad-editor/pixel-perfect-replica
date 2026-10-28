import { Link, useLocation } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState, type MouseEvent } from "react";

import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/site/Magnetic";
import { useSmoothScroll } from "@/components/site/SmoothScroll";
import { navItems } from "@/data/portfolio";
import { cn } from "@/lib/utils";

type NavId = (typeof navItems)[number]["id"];

export function Navbar() {
  const { pathname } = useLocation();
  const { scrollTo } = useSmoothScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<NavId>("home");
  const onHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active section indicator
  useEffect(() => {
    if (!onHome) return;
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-nav]"));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.getAttribute("data-nav") as NavId);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [onHome]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const handleNav = (id: string) => (e: MouseEvent) => {
    setOpen(false);
    if (onHome) {
      e.preventDefault();
      scrollTo(id === "home" ? 0 : `#${id}`);
      history.replaceState(null, "", id === "home" ? "/" : `/#${id}`);
    }
  };

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500",
          scrolled || !onHome
            ? "border-b border-border/60 bg-background/70 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <nav aria-label="Main" className="container-cinema flex h-16 items-center justify-between sm:h-20">
          <Link
            to="/"
            onClick={handleNav("home")}
            className="font-display text-lg font-extrabold tracking-tight sm:text-xl"
            aria-label="Dilshad Khan — home"
          >
            DILSHAD KHAN<span className="text-primary">.</span>
          </Link>

          <ul className="hidden items-center gap-9 md:flex">
            {navItems.map((item) => (
              <li key={item.id}>
                <Link
                  to="/"
                  {...(item.id === "home" ? {} : { hash: item.id })}
                  onClick={handleNav(item.id)}
                  data-active={onHome && active === item.id}
                  aria-current={onHome && active === item.id ? "true" : undefined}
                  className={cn(
                    "link-underline font-mono text-[0.7rem] uppercase tracking-[0.22em] transition-colors",
                    onHome && active === item.id ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <Magnetic>
              <Button asChild variant="cinema" size="pill" className="hidden sm:inline-flex">
                <Link to="/" hash="contact" onClick={handleNav("contact")}>
                  Let's Talk
                </Link>
              </Button>
            </Magnetic>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              className="relative flex h-11 w-11 items-center justify-center rounded-full border border-border md:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
            >
              <span className={cn("absolute h-px w-5 bg-foreground transition-transform duration-500", open ? "rotate-45" : "-translate-y-1")} />
              <span className={cn("absolute h-px w-5 bg-foreground transition-transform duration-500", open ? "-rotate-45" : "translate-y-1")} />
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: [0.77, 0, 0.175, 1] }}
            className="fixed inset-0 z-40 flex flex-col justify-between bg-surface px-6 pb-10 pt-28 md:hidden"
          >
            <ul className="space-y-2">
              {navItems.map((item, i) => (
                <li key={item.id} className="overflow-hidden">
                  <motion.div
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "110%" }}
                    transition={{ duration: 0.6, delay: 0.15 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link
                      to="/"
                      {...(item.id === "home" ? {} : { hash: item.id })}
                      onClick={handleNav(item.id)}
                      className="flex items-baseline gap-4 py-1 font-display text-5xl font-extrabold tracking-tight"
                    >
                      <span className="font-mono text-xs text-primary">0{i + 1}</span>
                      {item.label}
                    </Link>
                  </motion.div>
                </li>
              ))}
            </ul>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.5 } }} exit={{ opacity: 0 }}>
              <Button asChild variant="cinema" size="xl" className="w-full">
                <Link to="/" hash="contact" onClick={handleNav("contact")}>
                  Let's Talk
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
