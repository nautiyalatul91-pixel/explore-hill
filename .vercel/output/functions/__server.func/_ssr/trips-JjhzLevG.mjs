import { r as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-B99rZN6a.mjs";
import { n as require_react, r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { t as PageHero } from "./PageHero-B2khC5ZF.mjs";
import { x as MapPin } from "../_libs/lucide-react.mjs";
import { n as usePackages } from "./packages-De34pvPG.mjs";
import { t as PackageCard } from "./PackageCard-C00RwxmJ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/trips-JjhzLevG.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function TripsPage() {
	const { packages } = usePackages();
	const tripsList = packages.filter((p) => p.category === "trip");
	const mahasu = tripsList.find((t) => t.slug === "mahasu-devta-yatra");
	const [content, setContent] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		async function load() {
			const { data } = await supabase.from("settings").select("*").eq("key", "static_pages").maybeSingle();
			if (data && typeof data.value === "object" && data.value !== null) {
				const val = data.value;
				if (val.trips) setContent(val.trips);
			}
		}
		load();
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
			eyebrow: "Cultural Trips",
			title: content?.title ? content.title : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				"Soulful journeys through",
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-gradient",
					children: "timeless villages"
				})
			] }),
			subtitle: content?.subtitle || "Slow travel, village hospitality and the rituals that shape Uttarakhand — designed for travelers who want to feel, not just see.",
			image: content?.image || "/assets/trip-mahasu-ulq3Xp3z.jpg"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "py-20 sm:py-28 bg-background",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto max-w-7xl px-4 sm:px-6 grid gap-6 sm:grid-cols-2",
				children: tripsList.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PackageCard, { pkg: p }, p.slug))
			})
		}),
		mahasu?.route && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "py-20 sm:py-28 bg-mist",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-5xl px-4 sm:px-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-semibold uppercase tracking-[0.2em] text-ember",
						children: "Featured route"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-3 font-display text-4xl sm:text-5xl font-bold text-foreground",
						children: "Mahasu Devta Yatra"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-muted-foreground max-w-2xl",
						children: "A three-day circuit through ancient temples, riverside villages and sacred mountain trails."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
						className: "mt-10 relative border-l-2 border-dashed border-primary/30 pl-8 space-y-6",
						children: mahasu.route.map((stop, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "relative",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "absolute -left-[42px] grid h-8 w-8 place-items-center rounded-full bg-[var(--gradient-brand)] text-white text-xs font-bold shadow-card",
								children: i + 1
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 font-display text-xl font-semibold text-foreground",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-4 w-4 text-ember" }),
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
