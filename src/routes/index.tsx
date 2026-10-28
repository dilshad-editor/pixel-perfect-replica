import { createFileRoute } from "@tanstack/react-router";

import { About } from "@/components/home/About";
import { Beyond } from "@/components/home/Beyond";
import { Contact } from "@/components/home/Contact";
import { Experience } from "@/components/home/Experience";
import { Hero } from "@/components/home/Hero";
import { Marquee } from "@/components/home/Marquee";
import { Software } from "@/components/home/Software";
import { Works } from "@/components/home/Works";

const title = "Dilshad Khan — Professional Video Editor";
const description =
  "Portfolio of Dilshad Khan, a professional video editor crafting short-form reels, talking-head edits, promotional content and short films with cinematic color, sound and captions.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      <Hero />
      <About />
      <Marquee />
      <Works />
      <Beyond />
      <Software />
      <Experience />
      <Contact />
    </>
  );
}
