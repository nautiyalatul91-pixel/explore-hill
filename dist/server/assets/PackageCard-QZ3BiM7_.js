import { Link } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { ArrowRight, Clock, MapPin } from "lucide-react";
//#region src/components/site/PackageCard.tsx
function PackageCard({ pkg }) {
	return /* @__PURE__ */ jsxs("article", {
		className: "group relative overflow-hidden rounded-3xl bg-card shadow-card hover-lift",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "relative aspect-[4/3] overflow-hidden",
			children: [
				/* @__PURE__ */ jsx("img", {
					src: pkg.image,
					alt: pkg.name,
					loading: "lazy",
					width: 1280,
					height: 960,
					className: "h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-110"
				}),
				/* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-ridge/80 via-ridge/10 to-transparent" }),
				/* @__PURE__ */ jsxs("div", {
					className: "absolute top-4 left-4 flex gap-2",
					children: [/* @__PURE__ */ jsx("span", {
						className: "rounded-full glass px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-ridge",
						children: pkg.category === "trek" ? "Trek" : "Trip"
					}), pkg.difficulty && /* @__PURE__ */ jsx("span", {
						className: "rounded-full bg-ember/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-ember-foreground",
						children: pkg.difficulty
					})]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "absolute bottom-4 left-5 right-5 text-white",
					children: [/* @__PURE__ */ jsx("h3", {
						className: "font-display text-2xl font-bold leading-tight",
						children: pkg.name
					}), /* @__PURE__ */ jsxs("div", {
						className: "mt-1 flex items-center gap-3 text-xs text-white/80",
						children: [/* @__PURE__ */ jsxs("span", {
							className: "inline-flex items-center gap-1",
							children: [
								/* @__PURE__ */ jsx(Clock, { className: "h-3.5 w-3.5" }),
								" ",
								pkg.duration
							]
						}), /* @__PURE__ */ jsxs("span", {
							className: "inline-flex items-center gap-1",
							children: [/* @__PURE__ */ jsx(MapPin, { className: "h-3.5 w-3.5" }), " Uttarakhand"]
						})]
					})]
				})
			]
		}), /* @__PURE__ */ jsxs("div", {
			className: "p-6",
			children: [
				/* @__PURE__ */ jsx("p", {
					className: "text-sm text-muted-foreground line-clamp-2",
					children: pkg.tagline
				}),
				/* @__PURE__ */ jsx("ul", {
					className: "mt-4 grid grid-cols-2 gap-x-3 gap-y-1.5 text-xs text-foreground/80",
					children: pkg.highlights.slice(0, 4).map((h) => /* @__PURE__ */ jsxs("li", {
						className: "flex items-start gap-1.5",
						children: [
							/* @__PURE__ */ jsx("span", { className: "mt-1 h-1 w-1 rounded-full bg-ember shrink-0" }),
							" ",
							h
						]
					}, h))
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "mt-6 flex items-end justify-between",
					children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
						className: "text-[10px] uppercase tracking-widest text-muted-foreground",
						children: "From"
					}), /* @__PURE__ */ jsxs("p", {
						className: "font-display text-2xl font-bold text-primary",
						children: [pkg.priceLabel, /* @__PURE__ */ jsxs("span", {
							className: "text-xs font-medium text-muted-foreground",
							children: [" ", "/person"]
						})]
					})] }), /* @__PURE__ */ jsxs(Link, {
						to: "/book",
						search: { pkg: pkg.slug },
						className: "inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2.5 text-xs font-semibold text-primary-foreground hover:bg-primary/90 transition",
						children: ["Book Now ", /* @__PURE__ */ jsx(ArrowRight, { className: "h-3.5 w-3.5" })]
					})]
				})
			]
		})]
	});
}
//#endregion
export { PackageCard as t };
