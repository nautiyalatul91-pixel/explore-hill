import { n as trip_mahasu_default } from "./trek-kedarkantha-Jx50rRly.js";
import { t as PageHero } from "./PageHero-B2khC5ZF.js";
import { i as trips } from "./packages-CLS7Ed0o.js";
import { t as PackageCard } from "./PackageCard-QZ3BiM7_.js";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { MapPin } from "lucide-react";
//#region src/routes/trips.tsx?tsr-split=component
function TripsPage() {
	const mahasu = trips.find((t) => t.slug === "mahasu-devta-yatra");
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsx(PageHero, {
			eyebrow: "Cultural Trips",
			title: /* @__PURE__ */ jsxs(Fragment, { children: [
				"Soulful journeys through",
				" ",
				/* @__PURE__ */ jsx("span", {
					className: "text-gradient",
					children: "timeless villages"
				})
			] }),
			subtitle: "Slow travel, village hospitality and the rituals that shape Uttarakhand — designed for travelers who want to feel, not just see.",
			image: trip_mahasu_default
		}),
		/* @__PURE__ */ jsx("section", {
			className: "py-20 sm:py-28 bg-background",
			children: /* @__PURE__ */ jsx("div", {
				className: "mx-auto max-w-7xl px-4 sm:px-6 grid gap-6 sm:grid-cols-2",
				children: trips.map((p) => /* @__PURE__ */ jsx(PackageCard, { pkg: p }, p.slug))
			})
		}),
		mahasu?.route && /* @__PURE__ */ jsx("section", {
			className: "py-20 sm:py-28 bg-mist",
			children: /* @__PURE__ */ jsxs("div", {
				className: "mx-auto max-w-5xl px-4 sm:px-6",
				children: [
					/* @__PURE__ */ jsx("p", {
						className: "text-xs font-semibold uppercase tracking-[0.2em] text-ember",
						children: "Featured route"
					}),
					/* @__PURE__ */ jsx("h2", {
						className: "mt-3 font-display text-4xl sm:text-5xl font-bold text-foreground",
						children: "Mahasu Devta Yatra"
					}),
					/* @__PURE__ */ jsx("p", {
						className: "mt-3 text-muted-foreground max-w-2xl",
						children: "A three-day circuit through ancient temples, riverside villages and sacred mountain trails."
					}),
					/* @__PURE__ */ jsx("ol", {
						className: "mt-10 relative border-l-2 border-dashed border-primary/30 pl-8 space-y-6",
						children: mahasu.route.map((stop, i) => /* @__PURE__ */ jsxs("li", {
							className: "relative",
							children: [/* @__PURE__ */ jsx("span", {
								className: "absolute -left-[42px] grid h-8 w-8 place-items-center rounded-full bg-[var(--gradient-brand)] text-white text-xs font-bold shadow-card",
								children: i + 1
							}), /* @__PURE__ */ jsxs("div", {
								className: "flex items-center gap-2 font-display text-xl font-semibold text-foreground",
								children: [
									/* @__PURE__ */ jsx(MapPin, { className: "h-4 w-4 text-ember" }),
									" ",
									stop
								]
							})]
						}, stop + i))
					})
				]
			})
		})
	] });
}
//#endregion
export { TripsPage as component };
