import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";

import { getNextProject, projects } from "@/data/portfolio";
import { getEmbedUrl, getExternalUrl } from "@/lib/video";
import { routeTree } from "@/routeTree.gen";

describe("portfolio projects", () => {
  it("has exactly the four supplied projects at the requested URLs", () => {
    expect(projects.map((p) => p.slug)).toEqual([
      "handcrafted-by-ss-01",
      "handcrafted-by-ss-02",
      "handcrafted-by-ss-03",
      "trapped-short-film",
    ]);
  });

  it("builds Google Drive preview URLs from the file id", () => {
    expect(getEmbedUrl(projects[0]!.video)).toBe(
      "https://drive.google.com/file/d/1uXPOG2uWy_hA1yF4jMI_JfbRCL6WIlOP/preview",
    );
    expect(getExternalUrl(projects[3]!.video)).toBe(
      "https://drive.google.com/file/d/1e62HXQvDftR4R73ifVgKc0WHgrLNbzAo/view",
    );
  });

  it("wraps next-project navigation from the last project back to the first", () => {
    expect(getNextProject("trapped-short-film")!.slug).toBe("handcrafted-by-ss-01");
  });

  it("matches a project page route for every project", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });
    for (const p of projects) {
      const match = router.matchRoutes(`/projects/${p.slug}`).at(-1);
      expect(match?.routeId).toBe("/projects/$slug");
      expect(match?.routeId).not.toBe(rootRouteId);
    }
  });
});
