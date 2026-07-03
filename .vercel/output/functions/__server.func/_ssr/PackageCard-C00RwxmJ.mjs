import { r as __toESM } from "../_runtime.mjs";
import { n as require_react, r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { F as ChevronLeft, N as Clock, P as ChevronRight, x as MapPin, z as ArrowRight } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/PackageCard-C00RwxmJ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PackageCard({ pkg }) {
	const [activeImageIdx, setActiveImageIdx] = (0, import_react.useState)(0);
	const hasMultipleImages = !!pkg.images && pkg.images.length > 1;
	const currentImage = hasMultipleImages ? pkg.images[activeImageIdx] : pkg.image;
	const handlePrev = (e) => {
		e.preventDefault();
		e.stopPropagation();
		if (pkg.images) setActiveImageIdx((prev) => prev === 0 ? pkg.images.length - 1 : prev - 1);
	};
	const handleNext = (e) => {
		e.preventDefault();
		e.stopPropagation();
		if (pkg.images) setActiveImageIdx((prev) => prev === pkg.images.length - 1 ? 0 : prev + 1);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "group relative overflow-hidden rounded-3xl bg-card shadow-card hover-lift",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative aspect-[4/3] overflow-hidden",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: currentImage,
					alt: pkg.name,
					loading: "lazy",
					width: 1280,
					height: 960,
					className: "h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
				}),
				hasMultipleImages && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: handlePrev,
					type: "button",
					className: "absolute left-3 top-1/2 -translate-y-1/2 z-20 flex h-8 w-8 items-center justify-center rounded-full glass border-none text-ridge hover:bg-white/30 transition opacity-0 group-hover:opacity-100 cursor-pointer",
					"aria-label": "Previous image",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "h-5 w-5" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: handleNext,
					type: "button",
					className: "absolute right-3 top-1/2 -translate-y-1/2 z-20 flex h-8 w-8 items-center justify-center rounded-full glass border-none text-ridge hover:bg-white/30 transition opacity-0 group-hover:opacity-100 cursor-pointer",
					"aria-label": "Next image",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-5 w-5" })
				})] }),
				hasMultipleImages && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute bottom-16 left-1/2 -translate-x-1/2 z-20 flex gap-1.5",
					children: pkg.images.map((_, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: (e) => {
							e.preventDefault();
							e.stopPropagation();
							setActiveImageIdx(idx);
						},
						className: `h-1.5 rounded-full transition-all cursor-pointer ${idx === activeImageIdx ? "bg-white w-3" : "bg-white/50 w-1.5"}`,
						"aria-label": `Go to slide ${idx + 1}`
					}, idx))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-ridge/80 via-ridge/10 to-transparent" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "absolute top-4 left-4 flex gap-2 z-10",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "rounded-full glass px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-ridge",
						children: pkg.category === "trek" ? "Trek" : "Trip"
					}), pkg.difficulty && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "rounded-full bg-ember/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-ember-foreground",
						children: pkg.difficulty
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "absolute bottom-4 left-5 right-5 text-white z-10",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-2xl font-bold leading-tight",
						children: pkg.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-1 flex items-center gap-3 text-xs text-white/80",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-3.5 w-3.5" }),
								" ",
								pkg.duration
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-3.5 w-3.5" }), " Uttarakhand"]
						})]
					})]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "p-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground line-clamp-2",
					children: pkg.tagline
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-4 grid grid-cols-2 gap-x-3 gap-y-1.5 text-xs text-foreground/80",
					children: pkg.highlights.slice(0, 4).map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-start gap-1.5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-1 h-1 w-1 rounded-full bg-ember shrink-0" }),
							" ",
							h
						]
					}, h))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex items-end justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[10px] uppercase tracking-widest text-muted-foreground",
						children: "From"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-display text-2xl font-bold text-primary",
						children: [pkg.priceLabel, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-xs font-medium text-muted-foreground",
							children: [" ", "/person"]
						})]
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/book",
						search: { pkg: pkg.slug },
						className: "inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2.5 text-xs font-semibold text-primary-foreground hover:bg-primary/90 transition",
						children: ["Book Now ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-3.5 w-3.5" })]
					})]
				})
			]
		})]
	});
}
//#endregion
export { PackageCard as t };
