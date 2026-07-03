import { t as gallery_camping_default } from "./gallery-camping-sBiRzPvm.js";
import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
import { z } from "zod";
//#region src/routes/book.tsx
var $$splitComponentImporter = () => import("./book-BeGyWL-m.js");
var searchSchema = z.object({ pkg: z.string().optional() });
var Route = createFileRoute("/book")({
  validateSearch: (s) => searchSchema.parse(s),
  head: () => ({
    meta: [
      { title: "Book Your Adventure — Explore Hills" },
      {
        name: "description",
        content:
          "Reserve your spot on an Explore Hills trek or cultural trip. Small groups, expert guides, all-inclusive packages.",
      },
      {
        property: "og:title",
        content: "Book Your Adventure — Explore Hills",
      },
      {
        property: "og:description",
        content: "Reserve a Himalayan adventure today.",
      },
      {
        property: "og:image",
        content: gallery_camping_default,
      },
      {
        property: "og:url",
        content: "/book",
      },
    ],
    links: [
      {
        rel: "canonical",
        href: "/book",
      },
    ],
  }),
  component: lazyRouteComponent($$splitComponentImporter, "component"),
});
//#endregion
export { Route as t };
