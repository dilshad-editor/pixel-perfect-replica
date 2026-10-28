import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { useRef } from "react";

import { Contact } from "@/components/home/Contact";
import { Magnetic } from "@/components/site/Magnetic";
import { ProjectPoster } from "@/components/site/ProjectPoster";
import { SplitReveal } from "@/components/site/SplitReveal";
import { VideoPlayer } from "@/components/site/VideoPlayer";
import { behindTheEdit, getNextProject, getProject } from "@/data/portfolio";
import { useGsap } from "@/lib/motion";

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const project = getProject(params.slug);
    if (!project) throw notFound();
    return { project, next: getNextProject(params.slug) };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Project not found — Dilshad Khan" }, { name: "robots", content: "noindex" }] };
    }
    const p = loaderData.project;
    const title = `${p.title}${p.subtitle ? ` — ${p.subtitle}` : ""} (${p.number}) — Dilshad Khan, Video Editor`;
    return {
      meta: [
        { title },
        { name: "description", content: p.description },
        { property: "og:title", content: title },
        { property: "og:description", content: p.description },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: p.description },
      ],
    };
  },
  notFoundComponent: ProjectNotFound,
  component: ProjectPage,
});

function ProjectNotFound() {
  return (
    <div className="container-cinema flex min-h-[80vh] flex-col items-start justify-center pt-24">
      <p className="eyebrow">404 — Missing reel</p>
      <h1 className="display-lg mt-6 uppercase">Project not found.</h1>
      <Link to="/" hash="work" className="link-underline mt-10 font-mono text-xs uppercase tracking-[0.22em]">
        Back to all projects
      </Link>
    </div>
  );
}

function ProjectPage() {
  const { project, next } = Route.useLoaderData();
  const root = useRef<HTMLDivElement>(null);

  useGsap(
    root,
    ({ gsap, reduced }) => {
      if (reduced) return;
      gsap.from("[data-p-fade]", { y: 30, opacity: 0, duration: 1.1, ease: "expo.out", stagger: 0.08, delay: 0.2 });
      gsap.fromTo(
        "[data-p-video]",
        { clipPath: "inset(10% 6% 10% 6%)", opacity: 0 },
        { clipPath: "inset(0% 0% 0% 0%)", opacity: 1, duration: 1.6, ease: "expo.inOut", delay: 0.4 },
      );
      gsap.utils.toArray<HTMLElement>("[data-p-reveal]").forEach((el) => {
        gsap.from(el, { y: 40, opacity: 0, duration: 1, ease: "expo.out", scrollTrigger: { trigger: el, start: "top 85%", once: true } });
      });
      gsap.from("[data-tag]", {
        y: 30,
        opacity: 0,
        duration: 0.9,
        ease: "expo.out",
        stagger: 0.07,
        scrollTrigger: { trigger: "[data-tags]", start: "top 85%", once: true },
      });
      gsap.from("[data-contrib]", {
        x: -20,
        opacity: 0,
        duration: 0.8,
        ease: "expo.out",
        stagger: 0.06,
        scrollTrigger: { trigger: "[data-contribs]", start: "top 85%", once: true },
      });
    },
    [project.slug],
  );

  return (
    <div ref={root} key={project.slug}>
      {/* Heading */}
      <header className="container-cinema pb-14 pt-32 sm:pb-20 sm:pt-44">
        <Link
          data-p-fade
          to="/"
          hash="work"
          className="link-underline inline-flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.22em] text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden /> All projects
        </Link>

        <div className="relative mt-12">
          <div>
            <p data-p-fade className="eyebrow flex items-center gap-3">
              <span className="text-primary">Project {project.number}</span>
              <span className="h-px w-8 bg-border" />
              {project.category}
            </p>
            <SplitReveal
              as="h1"
              immediate
              delay={0.1}
              text={project.title}
              className="display-title mt-6 uppercase"
            />
            {project.subtitle && (
              <p data-p-fade className="mt-4 font-display text-2xl font-bold uppercase text-muted-foreground sm:text-4xl">
                {project.subtitle}
              </p>
            )}
          </div>
          <span
            aria-hidden
            data-p-fade
            className="pointer-events-none absolute -top-10 right-0 hidden font-display text-[14rem] font-extrabold leading-none tracking-tighter text-outline opacity-60 lg:block"
          >
            {project.number}
          </span>
        </div>
      </header>

      {/* Video */}
      <section aria-label="Project video" className="container-cinema">
        <div data-p-video>
          <VideoPlayer project={project} />
        </div>
      </section>

      {/* Description + contributions */}
      <section className="container-cinema section-pad grid gap-16 lg:grid-cols-12" aria-labelledby="about-project">
        <div className="lg:col-span-7" data-p-reveal>
          <h2 id="about-project" className="eyebrow mb-8">
            (01) — The edit
          </h2>
          <p className="font-display text-2xl font-semibold leading-snug tracking-tight sm:text-4xl">
            {project.description}
          </p>
        </div>
        <div className="lg:col-span-4 lg:col-start-9">
          <h2 className="eyebrow mb-8" data-p-reveal>
            (02) — My contributions
          </h2>
          <ul data-contribs>
            {project.contributions.map((c, i) => (
              <li key={c} data-contrib className="flex items-baseline gap-4 border-t border-border py-4 last:border-b">
                <span className="font-mono text-[0.68rem] text-primary">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-lg">{c}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Behind the edit */}
      <section className="border-y border-border bg-surface" aria-labelledby="bte-title">
        <div className="container-cinema section-pad">
          <p className="eyebrow mb-8">(03) — Behind the edit</p>
          <SplitReveal
            id="bte-title"
            as="h2"
            text={behindTheEdit.heading}
            accent={["detail"]}
            className="display-lg max-w-6xl uppercase"
          />
          <p data-p-reveal className="mt-10 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {behindTheEdit.description}
          </p>
          <ul data-tags className="mt-14 flex flex-wrap gap-3">
            {behindTheEdit.tags.map((t) => (
              <li
                key={t}
                data-tag
                className="rounded-full border border-border bg-background px-6 py-3 font-mono text-[0.72rem] uppercase tracking-[0.2em] transition-all duration-500 hover:-translate-y-1 hover:border-primary hover:text-primary"
              >
                {t}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Next project */}
      <section className="container-cinema section-pad" aria-label="Next project">
        <div className="flex items-center justify-between">
          <p className="eyebrow">Next project</p>
          <Link
            to="/"
            hash="work"
            className="link-underline font-mono text-[0.7rem] uppercase tracking-[0.22em] text-muted-foreground hover:text-foreground"
          >
            Back to all projects
          </Link>
        </div>
        <Link
          to="/projects/$slug"
          params={{ slug: next.slug }}
          data-cursor="view"
          className="group mt-10 grid items-center gap-8 border-t border-border pt-10 md:grid-cols-12"
        >
          <div className="md:col-span-7">
            <span className="font-mono text-sm text-primary">{next.number}</span>
            <p className="mt-3 font-display text-[clamp(1.6rem,5.6vw,4.5rem)] font-extrabold uppercase leading-none tracking-tight transition-transform duration-700 group-hover:translate-x-3">
              {next.title}
            </p>
            <p className="mt-3 eyebrow">
              {next.subtitle ? `${next.subtitle} · ` : ""}
              {next.category}
            </p>
            <Magnetic>
              <span className="mt-8 inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 font-mono text-[0.68rem] uppercase tracking-[0.2em] transition-colors duration-500 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
                View next <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
              </span>
            </Magnetic>
          </div>
          <div className="relative aspect-[16/10] overflow-hidden rounded-sm border border-border md:col-span-5">
            <div className="h-full w-full transition-transform duration-[1.4s] group-hover:scale-105">
              <ProjectPoster project={next} />
            </div>
          </div>
        </Link>
      </section>

      <Contact compact />
    </div>
  );
}
