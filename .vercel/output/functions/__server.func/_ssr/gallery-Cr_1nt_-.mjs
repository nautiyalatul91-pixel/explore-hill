import { t as hero_himalayas_default } from "./hero-himalayas-Dx5R6vBe.mjs";
import { r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { t as PageHero } from "./PageHero-B2khC5ZF.mjs";
import { t as gallery_camping_default } from "./gallery-camping-sBiRzPvm.mjs";
import { n as trip_mahasu_default, t as trek_kedarkantha_default } from "./trek-kedarkantha-Jx50rRly.mjs";
import { t as trip_hanol_default } from "./trip-hanol-CLJKyHJu.mjs";
import { n as trek_nagtibba_default, r as trek_yulla_default, t as trek_moila_default } from "./trek-yulla-DqDE_bPL.mjs";
import { t as gallery_bonfire_default } from "./gallery-bonfire-33oJG19z.mjs";
import { n as gallery_group_default, t as gallery_food_default } from "./gallery-group-C_0vxpEE.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/gallery-Cr_1nt_-.js
var import_jsx_runtime = require_jsx_runtime();
var items = [
	{
		src: hero_himalayas_default,
		alt: "Snow capped Himalayan peaks",
		tag: "Himalayas",
		span: "row-span-2"
	},
	{
		src: gallery_bonfire_default,
		alt: "Group around bonfire",
		tag: "Bonfire night"
	},
	{
		src: gallery_camping_default,
		alt: "Tents under Milky Way",
		tag: "Camping",
		span: "row-span-2"
	},
	{
		src: gallery_food_default,
		alt: "Local food being served",
		tag: "Local food"
	},
	{
		src: gallery_group_default,
		alt: "Trekking group on trail",
		tag: "Group travel"
	},
	{
		src: trek_moila_default,
		alt: "Forest trail",
		tag: "Moila Top"
	},
	{
		src: trek_kedarkantha_default,
		alt: "Snow trek",
		tag: "Kedarkantha"
	},
	{
		src: trek_nagtibba_default,
		alt: "Mountain sunrise",
		tag: "Nag Tibba"
	},
	{
		src: trek_yulla_default,
		alt: "Mountain temple",
		tag: "Yulla Kanda"
	},
	{
		src: trip_hanol_default,
		alt: "Village houses",
		tag: "Hanol village"
	},
	{
		src: trip_mahasu_default,
		alt: "Mahasu Devta Temple",
		tag: "Mahasu Temple"
	}
];
function GalleryPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
		eyebrow: "Gallery",
		title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: ["Frames from the ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-gradient",
			children: "trail"
		})] }),
		subtitle: "Mountains, villages, bonfires and the people who make our trips unforgettable.",
		image: gallery_bonfire_default
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "py-20 sm:py-28 bg-background",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mx-auto max-w-7xl px-4 sm:px-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[180px] sm:auto-rows-[220px] gap-3",
				children: items.map((it, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
					className: `group relative overflow-hidden rounded-2xl shadow-card hover-lift ${it.span ?? ""}`,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: it.src,
							alt: it.alt,
							loading: "lazy",
							className: "absolute inset-0 h-full w-full object-cover transition-transform duration-[1500ms] group-hover:scale-110"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-ridge/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("figcaption", {
							className: "absolute bottom-3 left-3 right-3 text-xs font-semibold uppercase tracking-wider text-white opacity-0 group-hover:opacity-100 transition-opacity",
							children: it.tag
						})
					]
				}, i))
			})
		})
	})] });
}
//#endregion
export { GalleryPage as component };
