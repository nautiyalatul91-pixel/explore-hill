import { n as trip_mahasu_default, t as trek_kedarkantha_default } from "./trek-kedarkantha-Jx50rRly.js";
import { t as gallery_bonfire_default } from "./gallery-bonfire-33oJG19z.js";
import { t as trip_hanol_default } from "./trip-hanol-CLJKyHJu.js";
import { t as Route$9 } from "./book-DDZWMRGo.js";
import { t as hero_himalayas_default } from "./hero-himalayas-Dx5R6vBe.js";
import { useEffect, useState } from "react";
import { HeadContent, Link, Outlet, Scripts, createFileRoute, createRootRouteWithContext, createRouter, lazyRouteComponent, useRouter, useRouterState } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Instagram, Mail, Menu, MessageCircle, Mountain, Phone, X } from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Toaster } from "sonner";
//#region src/styles.css?url
var styles_default = "/assets/styles-CSpvmeT7.css";
//#endregion
//#region src/lib/lovable-error-reporting.ts
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
}
//#endregion
//#region src/lib/utils.ts
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
//#endregion
//#region src/components/site/Site_Layout.tsx
var NAV = [
	{
		to: "/",
		label: "Home"
	},
	{
		to: "/treks",
		label: "Treks"
	},
	{
		to: "/trips",
		label: "Trips"
	},
	{
		to: "/gallery",
		label: "Gallery"
	},
	{
		to: "/about",
		label: "About"
	},
	{
		to: "/contact",
		label: "Contact"
	}
];
function Logo({ light = false }) {
	return /* @__PURE__ */ jsxs(Link, {
		to: "/",
		className: "flex items-center gap-2.5 shrink-0",
		children: [/* @__PURE__ */ jsx("span", {
			className: cn("grid h-10 w-10 place-items-center rounded-xl shadow-card", light ? "bg-white/15 text-white" : "bg-primary text-primary-foreground"),
			children: /* @__PURE__ */ jsx(Mountain, {
				className: "h-5 w-5",
				strokeWidth: 2.2
			})
		}), /* @__PURE__ */ jsxs("span", {
			className: "flex flex-col leading-none",
			children: [/* @__PURE__ */ jsx("span", {
				className: cn("font-display text-lg font-bold tracking-tight", light ? "text-white" : "text-foreground"),
				children: "Explore Hills"
			}), /* @__PURE__ */ jsx("span", {
				className: cn("text-[10px] uppercase tracking-[0.18em]", light ? "text-white/70" : "text-muted-foreground"),
				children: "Uttarakhand"
			})]
		})]
	});
}
function Header() {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const [scrolled, setScrolled] = useState(false);
	const [open, setOpen] = useState(false);
	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 24);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);
	useEffect(() => {
		setOpen(false);
	}, [pathname]);
	return /* @__PURE__ */ jsx("header", {
		className: cn("fixed inset-x-0 top-0 z-50 transition-all duration-500", scrolled ? "py-2" : "py-4"),
		children: /* @__PURE__ */ jsxs("div", {
			className: "mx-auto max-w-7xl px-4 sm:px-6",
			children: [/* @__PURE__ */ jsxs("div", {
				className: cn("flex items-center justify-between rounded-2xl px-4 py-2.5 transition-all duration-500", scrolled ? "glass shadow-card" : "bg-white/10 backdrop-blur-md border border-white/15"),
				children: [
					/* @__PURE__ */ jsx(Logo, { light: !scrolled }),
					/* @__PURE__ */ jsx("nav", {
						className: "hidden lg:flex items-center gap-1",
						children: NAV.map((item) => /* @__PURE__ */ jsx(Link, {
							to: item.to,
							className: cn("px-3.5 py-2 text-sm font-medium rounded-lg transition-colors", scrolled ? "text-foreground hover:bg-secondary" : "text-white/90 hover:bg-white/15"),
							activeProps: { className: scrolled ? "px-3.5 py-2 text-sm font-semibold rounded-lg bg-secondary text-primary" : "px-3.5 py-2 text-sm font-semibold rounded-lg bg-white/20 text-white" },
							activeOptions: { exact: item.to === "/" },
							children: item.label
						}, item.to))
					}),
					/* @__PURE__ */ jsx("div", {
						className: "hidden lg:block",
						children: /* @__PURE__ */ jsx(Link, {
							to: "/book",
							className: "inline-flex items-center gap-2 rounded-xl bg-[var(--gradient-ember)] px-5 py-2.5 text-sm font-semibold text-ember-foreground shadow-glow hover:opacity-95 transition",
							children: "Book Now"
						})
					}),
					/* @__PURE__ */ jsx("button", {
						type: "button",
						"aria-label": "Toggle menu",
						onClick: () => setOpen((o) => !o),
						className: cn("lg:hidden grid h-10 w-10 place-items-center rounded-lg", scrolled ? "text-foreground hover:bg-secondary" : "text-white hover:bg-white/15"),
						children: open ? /* @__PURE__ */ jsx(X, { className: "h-5 w-5" }) : /* @__PURE__ */ jsx(Menu, { className: "h-5 w-5" })
					})
				]
			}), open && /* @__PURE__ */ jsx("div", {
				className: "lg:hidden mt-2 rounded-2xl glass p-3 shadow-elegant animate-fade-up",
				children: /* @__PURE__ */ jsxs("div", {
					className: "flex flex-col gap-1",
					children: [NAV.map((item) => /* @__PURE__ */ jsx(Link, {
						to: item.to,
						className: "px-4 py-3 rounded-lg text-sm font-medium text-foreground hover:bg-secondary",
						activeProps: { className: "px-4 py-3 rounded-lg text-sm font-semibold bg-secondary text-primary" },
						activeOptions: { exact: item.to === "/" },
						children: item.label
					}, item.to)), /* @__PURE__ */ jsx(Link, {
						to: "/book",
						className: "mt-2 inline-flex items-center justify-center rounded-xl bg-[var(--gradient-ember)] px-5 py-3 text-sm font-semibold text-ember-foreground shadow-glow",
						children: "Book Your Adventure"
					})]
				})
			})]
		})
	});
}
function Footer() {
	return /* @__PURE__ */ jsxs("footer", {
		className: "relative bg-ridge text-white",
		children: [/* @__PURE__ */ jsx("div", {
			className: "absolute inset-0 bg-aurora opacity-60",
			"aria-hidden": "true"
		}), /* @__PURE__ */ jsxs("div", {
			className: "relative mx-auto max-w-7xl px-4 sm:px-6 py-16",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "grid gap-12 md:grid-cols-2 lg:grid-cols-4",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "space-y-4",
						children: [/* @__PURE__ */ jsx(Logo, { light: true }), /* @__PURE__ */ jsx("p", {
							className: "text-sm text-white/70 max-w-xs",
							children: "Authentic Himalayan adventures, small-group experiences and hidden destinations of Uttarakhand."
						})]
					}),
					/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h4", {
						className: "font-display text-base font-semibold mb-4",
						children: "Explore"
					}), /* @__PURE__ */ jsx("ul", {
						className: "space-y-2 text-sm text-white/70",
						children: NAV.map((n) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, {
							to: n.to,
							className: "hover:text-white transition-colors",
							children: n.label
						}) }, n.to))
					})] }),
					/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h4", {
						className: "font-display text-base font-semibold mb-4",
						children: "Contact"
					}), /* @__PURE__ */ jsxs("ul", {
						className: "space-y-3 text-sm text-white/70",
						children: [
							/* @__PURE__ */ jsxs("li", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ jsx(Phone, { className: "h-4 w-4" }), " +91 63977 10701"]
							}),
							/* @__PURE__ */ jsxs("li", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ jsx(Mail, { className: "h-4 w-4" }), " contact@explorehills.in"]
							}),
							/* @__PURE__ */ jsxs("li", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ jsx(Instagram, { className: "h-4 w-4" }), " @atul__nautiyal"]
							})
						]
					})] }),
					/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h4", {
						className: "font-display text-base font-semibold mb-4",
						children: "Get in touch"
					}), /* @__PURE__ */ jsxs("div", {
						className: "flex flex-col gap-3",
						children: [/* @__PURE__ */ jsxs("a", {
							href: "https://wa.me/916397710701",
							target: "_blank",
							rel: "noreferrer",
							className: "inline-flex items-center justify-center gap-2 rounded-xl bg-[oklch(0.62_0.16_150)] px-4 py-2.5 text-sm font-semibold text-white hover:opacity-95 transition",
							children: [/* @__PURE__ */ jsx(MessageCircle, { className: "h-4 w-4" }), " Chat on WhatsApp"]
						}), /* @__PURE__ */ jsx(Link, {
							to: "/book",
							className: "inline-flex items-center justify-center gap-2 rounded-xl bg-white text-ridge px-4 py-2.5 text-sm font-semibold hover:bg-white/90 transition",
							children: "Book Your Adventure"
						})]
					})] })
				]
			}), /* @__PURE__ */ jsxs("div", {
				className: "mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/50",
				children: [/* @__PURE__ */ jsxs("p", { children: [
					"© ",
					(/* @__PURE__ */ new Date()).getFullYear(),
					" Explore Hills. Crafted in Uttarakhand by Atul Nautiyal."
				] }), /* @__PURE__ */ jsx("p", { children: "Travel responsibly. Leave only footprints." })]
			})]
		})]
	});
}
function FloatingWhatsApp() {
	return /* @__PURE__ */ jsx("a", {
		href: "https://wa.me/916397710701?text=Hi%20Explore%20Hills%2C%20I%27d%20like%20to%20know%20more%20about%20your%20trips.",
		target: "_blank",
		rel: "noreferrer",
		"aria-label": "Chat on WhatsApp",
		className: "fixed bottom-6 right-6 z-50 grid h-14 w-14 place-items-center rounded-full bg-[oklch(0.62_0.18_150)] text-white shadow-glow hover:scale-105 transition-transform animate-float",
		children: /* @__PURE__ */ jsx(MessageCircle, { className: "h-6 w-6" })
	});
}
function SiteLayout() {
	return /* @__PURE__ */ jsxs("div", {
		className: "min-h-screen flex flex-col bg-background",
		children: [
			/* @__PURE__ */ jsx(Header, {}),
			/* @__PURE__ */ jsx("main", {
				className: "flex-1",
				children: /* @__PURE__ */ jsx(Outlet, {})
			}),
			/* @__PURE__ */ jsx(Footer, {}),
			/* @__PURE__ */ jsx(FloatingWhatsApp, {}),
			/* @__PURE__ */ jsx(Toaster, {
				position: "top-right",
				richColors: true,
				closeButton: true
			})
		]
	});
}
//#endregion
//#region src/routes/__root.tsx
function NotFoundComponent() {
	return /* @__PURE__ */ jsx("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ jsxs("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ jsx("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ jsx("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ jsx("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ jsx("div", {
					className: "mt-6",
					children: /* @__PURE__ */ jsx(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	useEffect(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ jsx("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ jsxs("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ jsx("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ jsx("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ jsx("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ jsx("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$8 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "Explore Hills — Authentic Himalayan Adventures in Uttarakhand" },
			{
				name: "description",
				content: "Premium small-group treks, village stays, camping and spiritual journeys across the hidden Himalayas of Uttarakhand. Founded by Atul Nautiyal."
			},
			{
				name: "author",
				content: "Atul Nautiyal"
			},
			{
				name: "theme-color",
				content: "#0f1f3d"
			},
			{
				property: "og:site_name",
				content: "Explore Hills"
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700;9..144,800&family=Inter:wght@300;400;500;600;700&display=swap"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ jsxs("html", {
		lang: "en",
		children: [/* @__PURE__ */ jsx("head", { children: /* @__PURE__ */ jsx(HeadContent, {}) }), /* @__PURE__ */ jsxs("body", { children: [children, /* @__PURE__ */ jsx(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$8.useRouteContext();
	return /* @__PURE__ */ jsx(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ jsx(SiteLayout, {})
	});
}
//#endregion
//#region src/routes/trips.tsx
var $$splitComponentImporter$6 = () => import("./trips-DvW4yXpa.js");
var Route$7 = createFileRoute("/trips")({
	head: () => ({
		meta: [
			{ title: "Cultural & Spiritual Trips in Uttarakhand — Explore Hills" },
			{
				name: "description",
				content: "Village stays, temple yatras and cultural journeys across the hidden corners of Uttarakhand."
			},
			{
				property: "og:title",
				content: "Cultural Trips — Explore Hills"
			},
			{
				property: "og:description",
				content: "Hanol, Mahasu Devta Yatra and more."
			},
			{
				property: "og:image",
				content: trip_mahasu_default
			},
			{
				property: "og:url",
				content: "/trips"
			}
		],
		links: [{
			rel: "canonical",
			href: "/trips"
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
//#endregion
//#region src/routes/treks.tsx
var $$splitComponentImporter$5 = () => import("./treks-jOBuCtsf.js");
var Route$6 = createFileRoute("/treks")({
	head: () => ({
		meta: [
			{ title: "Himalayan Treks in Uttarakhand — Explore Hills" },
			{
				name: "description",
				content: "Small-group Himalayan treks: Kedarkantha, Moila Top, Nag Tibba and Yulla Kanda. Camping, bonfires and certified guides included."
			},
			{
				property: "og:title",
				content: "Himalayan Treks — Explore Hills"
			},
			{
				property: "og:description",
				content: "Beginner to moderate treks across Uttarakhand."
			},
			{
				property: "og:image",
				content: trek_kedarkantha_default
			},
			{
				property: "og:url",
				content: "/treks"
			}
		],
		links: [{
			rel: "canonical",
			href: "/treks"
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
//#endregion
//#region src/routes/sitemap[.]xml.ts
var BASE_URL = "";
var Route$5 = createFileRoute("/sitemap.xml")({ server: { handlers: { GET: async () => {
	const xml = [
		`<?xml version="1.0" encoding="UTF-8"?>`,
		`<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
		...[
			{
				path: "/",
				changefreq: "weekly",
				priority: "1.0"
			},
			{
				path: "/treks",
				changefreq: "weekly",
				priority: "0.9"
			},
			{
				path: "/trips",
				changefreq: "weekly",
				priority: "0.9"
			},
			{
				path: "/gallery",
				changefreq: "monthly",
				priority: "0.7"
			},
			{
				path: "/about",
				changefreq: "monthly",
				priority: "0.6"
			},
			{
				path: "/contact",
				changefreq: "monthly",
				priority: "0.6"
			},
			{
				path: "/book",
				changefreq: "weekly",
				priority: "0.8"
			}
		].map((e) => `  <url>\n    <loc>${BASE_URL}${e.path}</loc>\n    <changefreq>${e.changefreq}</changefreq>\n    <priority>${e.priority}</priority>\n  </url>`),
		`</urlset>`
	].join("\n");
	return new Response(xml, { headers: {
		"Content-Type": "application/xml",
		"Cache-Control": "public, max-age=3600"
	} });
} } } });
//#endregion
//#region src/routes/gallery.tsx
var $$splitComponentImporter$4 = () => import("./gallery-Cr_1nt_-.js");
var Route$4 = createFileRoute("/gallery")({
	head: () => ({
		meta: [
			{ title: "Gallery — Himalayan Moments | Explore Hills" },
			{
				name: "description",
				content: "A visual journey through our Himalayan adventures — mountains, villages, bonfires and people."
			},
			{
				property: "og:title",
				content: "Gallery — Explore Hills"
			},
			{
				property: "og:description",
				content: "Mountains, villages, bonfires and the people who make our trips magical."
			},
			{
				property: "og:image",
				content: gallery_bonfire_default
			},
			{
				property: "og:url",
				content: "/gallery"
			}
		],
		links: [{
			rel: "canonical",
			href: "/gallery"
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
//#endregion
//#region src/routes/contact.tsx
var $$splitComponentImporter$3 = () => import("./contact-BZNS3bpC.js");
var Route$3 = createFileRoute("/contact")({
	head: () => ({
		meta: [
			{ title: "Contact Explore Hills — Talk to Atul" },
			{
				name: "description",
				content: "Reach Explore Hills via WhatsApp, Instagram, call or email. Founder Atul Nautiyal personally answers every message."
			},
			{
				property: "og:title",
				content: "Contact Explore Hills"
			},
			{
				property: "og:description",
				content: "WhatsApp +91 6397710701 · @atul__nautiyal · contact@explorehills.in"
			},
			{
				property: "og:image",
				content: trip_hanol_default
			},
			{
				property: "og:url",
				content: "/contact"
			}
		],
		links: [{
			rel: "canonical",
			href: "/contact"
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
//#endregion
//#region src/routes/admin.tsx
var $$splitComponentImporter$2 = () => import("./admin-DF64afGA.js");
var Route$2 = createFileRoute("/admin")({
	head: () => ({ meta: [
		{ title: "Admin Dashboard — Explore Hills" },
		{
			name: "description",
			content: "Internal dashboard."
		},
		{
			name: "robots",
			content: "noindex, nofollow"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
//#endregion
//#region src/routes/about.tsx
var $$splitComponentImporter$1 = () => import("./about-CHJUNuuo.js");
var Route$1 = createFileRoute("/about")({
	head: () => ({
		meta: [
			{ title: "About Explore Hills — Founded by Atul Nautiyal" },
			{
				name: "description",
				content: "Explore Hills is an Uttarakhand-born travel startup building authentic Himalayan experiences, founded by Atul Nautiyal."
			},
			{
				property: "og:title",
				content: "About Explore Hills"
			},
			{
				property: "og:description",
				content: "Our story, mission and the team behind the hills."
			},
			{
				property: "og:image",
				content: hero_himalayas_default
			},
			{
				property: "og:url",
				content: "/about"
			}
		],
		links: [{
			rel: "canonical",
			href: "/about"
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
//#endregion
//#region src/routes/index.tsx
var $$splitComponentImporter = () => import("./routes-DJ7xJ37u.js");
var Route = createFileRoute("/")({
	head: () => ({
		meta: [
			{ title: "Explore Hills — Authentic Himalayan Adventures in Uttarakhand" },
			{
				name: "description",
				content: "Premium small-group treks, village stays, bonfire nights and spiritual journeys across the hidden Himalayas of Uttarakhand."
			},
			{
				property: "og:title",
				content: "Explore Hills — Authentic Himalayan Adventures"
			},
			{
				property: "og:description",
				content: "Couple-friendly, small-group treks and village stays across Uttarakhand. Founded by Atul Nautiyal."
			},
			{
				property: "og:image",
				content: hero_himalayas_default
			},
			{
				property: "og:url",
				content: "/"
			}
		],
		links: [{
			rel: "canonical",
			href: "/"
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
//#region src/routeTree.gen.ts
var TripsRoute = Route$7.update({
	id: "/trips",
	path: "/trips",
	getParentRoute: () => Route$8
});
var TreksRoute = Route$6.update({
	id: "/treks",
	path: "/treks",
	getParentRoute: () => Route$8
});
var SitemapDotxmlRoute = Route$5.update({
	id: "/sitemap.xml",
	path: "/sitemap.xml",
	getParentRoute: () => Route$8
});
var GalleryRoute = Route$4.update({
	id: "/gallery",
	path: "/gallery",
	getParentRoute: () => Route$8
});
var ContactRoute = Route$3.update({
	id: "/contact",
	path: "/contact",
	getParentRoute: () => Route$8
});
var BookRoute = Route$9.update({
	id: "/book",
	path: "/book",
	getParentRoute: () => Route$8
});
var AdminRoute = Route$2.update({
	id: "/admin",
	path: "/admin",
	getParentRoute: () => Route$8
});
var AboutRoute = Route$1.update({
	id: "/about",
	path: "/about",
	getParentRoute: () => Route$8
});
var rootRouteChildren = {
	IndexRoute: Route.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$8
	}),
	AboutRoute,
	AdminRoute,
	BookRoute,
	ContactRoute,
	GalleryRoute,
	SitemapDotxmlRoute,
	TreksRoute,
	TripsRoute
};
var routeTree = Route$8._addFileChildren(rootRouteChildren)._addFileTypes();
//#endregion
//#region src/router.tsx
var getRouter = () => {
	return createRouter({
		routeTree,
		context: { queryClient: new QueryClient() },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
