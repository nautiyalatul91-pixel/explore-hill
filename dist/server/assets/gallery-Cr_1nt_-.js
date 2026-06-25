import { n as trip_mahasu_default, t as trek_kedarkantha_default } from "./trek-kedarkantha-Jx50rRly.js";
import { t as gallery_bonfire_default } from "./gallery-bonfire-33oJG19z.js";
import { t as trip_hanol_default } from "./trip-hanol-CLJKyHJu.js";
import { t as gallery_camping_default } from "./gallery-camping-sBiRzPvm.js";
import { t as hero_himalayas_default } from "./hero-himalayas-Dx5R6vBe.js";
import { t as PageHero } from "./PageHero-B2khC5ZF.js";
import { n as trek_nagtibba_default, r as trek_moila_default, t as trek_yulla_default } from "./trek-yulla-DqDE_bPL.js";
import { n as gallery_food_default, t as gallery_group_default } from "./gallery-group-C_0vxpEE.js";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
//#region src/routes/gallery.tsx?tsr-split=component
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
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(PageHero, {
		eyebrow: "Gallery",
		title: /* @__PURE__ */ jsxs(Fragment, { children: ["Frames from the ", /* @__PURE__ */ jsx("span", {
			className: "text-gradient",
			children: "trail"
		})] }),
		subtitle: "Mountains, villages, bonfires and the people who make our trips unforgettable.",
		image: gallery_bonfire_default
	}), /* @__PURE__ */ jsx("section", {
		className: "py-20 sm:py-28 bg-background",
		children: /* @__PURE__ */ jsx("div", {
			className: "mx-auto max-w-7xl px-4 sm:px-6",
			children: /* @__PURE__ */ jsx("div", {
				className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[180px] sm:auto-rows-[220px] gap-3",
				children: items.map((it, i) => /* @__PURE__ */ jsxs("figure", {
					className: `group relative overflow-hidden rounded-2xl shadow-card hover-lift ${it.span ?? ""}`,
					children: [
						/* @__PURE__ */ jsx("img", {
							src: it.src,
							alt: it.alt,
							loading: "lazy",
							className: "absolute inset-0 h-full w-full object-cover transition-transform duration-[1500ms] group-hover:scale-110"
						}),
						/* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-ridge/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" }),
						/* @__PURE__ */ jsx("figcaption", {
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
