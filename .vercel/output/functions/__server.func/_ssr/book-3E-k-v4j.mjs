import { m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as gallery_camping_default } from "./gallery-camping-sBiRzPvm.mjs";
import { i as stringType, r as objectType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/book-3E-k-v4j.js
var $$splitComponentImporter = () => import("./book-CgHtDr0F.mjs");
var searchSchema = objectType({ pkg: stringType().optional() });
var Route = createFileRoute("/book")({
	validateSearch: (s) => searchSchema.parse(s),
	head: () => ({
		meta: [
			{ title: "Book Your Adventure — Explore Hills" },
			{
				name: "description",
				content: "Reserve your spot on an Explore Hills trek or cultural trip. Small groups, expert guides, all-inclusive packages."
			},
			{
				property: "og:title",
				content: "Book Your Adventure — Explore Hills"
			},
			{
				property: "og:description",
				content: "Reserve a Himalayan adventure today."
			},
			{
				property: "og:image",
				content: gallery_camping_default
			},
			{
				property: "og:url",
				content: "/book"
			}
		],
		links: [{
			rel: "canonical",
			href: "/book"
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
