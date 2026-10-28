<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Project rules
- All portfolio content (projects, videos, bio, software, experience, contact links) lives in `src/data/portfolio.ts`; components only read from it, so content edits never touch layout code.
- Videos load on demand through `src/lib/video.ts` (Drive/YouTube/Vimeo/file); never put share URLs in `<video>` and never mount iframes before the visitor presses play.
- Missing assets (photo, thumbnails) render labelled placeholders; never substitute generated or stock imagery for the editor's work or likeness.
- GSAP work goes through `useGsap` in `src/lib/motion.ts` (scoped context + cleanup, reduced-motion aware); Lenis is owned by `SmoothScrollProvider` and synced to ScrollTrigger there.
- Inside the pinned Beyond section, animate with clip-path/opacity, not transforms: ScrollTrigger refreshes re-parse child transforms and leave text offset.
