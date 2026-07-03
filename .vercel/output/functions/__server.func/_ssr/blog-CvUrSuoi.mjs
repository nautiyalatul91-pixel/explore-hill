import { r as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-B99rZN6a.mjs";
import { n as require_react, r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { t as PageHero } from "./PageHero-B2khC5ZF.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { L as Calendar, N as Clock, i as User, z as ArrowRight } from "../_libs/lucide-react.mjs";
import { t as gallery_bonfire_default } from "./gallery-bonfire-33oJG19z.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/blog-CvUrSuoi.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function BlogPage() {
	const [posts, setPosts] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		async function load() {
			const { data, error } = await supabase.from("posts").select("id, slug, title, summary, featured_image, categories, tags, author_name, reading_time, publish_date, featured").eq("status", "published").lte("publish_date", (/* @__PURE__ */ new Date()).toISOString()).order("publish_date", { ascending: false });
			if (!error && data) setPosts(data);
			setLoading(false);
		}
		load();
	}, []);
	const featuredPost = posts.find((p) => p.featured) || posts[0];
	const regularPosts = featuredPost ? posts.filter((p) => p.id !== featuredPost.id) : posts;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
		eyebrow: "Explore Hills Journal",
		title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: ["Stories from the ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-gradient",
			children: "Himalayan Trails"
		})] }),
		subtitle: "Guides, checklists, safety tips and local Garhwali stories from our mountain guides.",
		image: gallery_bonfire_default
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "py-20 sm:py-28 bg-background",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mx-auto max-w-7xl px-4 sm:px-6 space-y-16",
			children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-center py-10 text-muted-foreground",
				children: "Loading adventure stories..."
			}) : posts.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-center py-10 text-muted-foreground",
				children: "No journal entries found. Check back soon as our guides write from the trail!"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [featuredPost && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-3xl border border-border bg-card overflow-hidden shadow-card hover-lift grid md:grid-cols-2 animate-fade-up",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "h-64 md:h-auto relative min-h-[300px]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: featuredPost.featured_image || "/assets/gallery-bonfire-CkXh8YQ9.jpg",
						alt: featuredPost.title,
						className: "absolute inset-0 h-full w-full object-cover",
						loading: "lazy"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute top-4 left-4 bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider",
						children: "Featured"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-8 sm:p-10 flex flex-col justify-center space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-wrap gap-1",
							children: featuredPost.categories.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10px] bg-primary/10 text-primary font-bold px-2 py-0.5 rounded-full uppercase tracking-wide",
								children: c
							}, c))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-2xl sm:text-3xl font-bold text-foreground",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/blog/$slug",
								params: { slug: featuredPost.slug },
								className: "hover:text-primary transition-colors",
								children: featuredPost.title
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground line-clamp-3",
							children: featuredPost.summary || "Read the latest update from our trekking coordinators on the trail."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-4 text-xs text-muted-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center gap-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "h-3.5 w-3.5" }),
										" ",
										featuredPost.author_name || "Atul Nautiyal"
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center gap-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "h-3.5 w-3.5" }),
										" ",
										new Date(featuredPost.publish_date).toLocaleDateString()
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center gap-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-3.5 w-3.5" }),
										" ",
										featuredPost.reading_time || "5 min read"
									]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/blog/$slug",
							params: { slug: featuredPost.slug },
							className: "inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all",
							children: ["Read Full Story ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
						}) })
					]
				})]
			}), regularPosts.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-8",
				children: regularPosts.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-3xl border border-border bg-card overflow-hidden shadow-card hover-lift flex flex-col h-full animate-fade-up",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-48 relative overflow-hidden",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: p.featured_image || "/assets/gallery-bonfire-CkXh8YQ9.jpg",
							alt: p.title,
							className: "h-full w-full object-cover transition-transform duration-500 hover:scale-105",
							loading: "lazy"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-6 flex-1 flex flex-col justify-between space-y-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex flex-wrap gap-1",
									children: p.categories.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[9px] bg-primary/10 text-primary font-bold px-2 py-0.5 rounded-full uppercase tracking-wide",
										children: c
									}, c))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-display text-lg font-bold text-foreground line-clamp-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/blog/$slug",
										params: { slug: p.slug },
										className: "hover:text-primary transition-colors",
										children: p.title
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground line-clamp-3",
									children: p.summary || "Explore trekking guides and Himalayan stories."
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-3 pt-3 border-t border-border",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between text-[11px] text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center gap-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "h-3 w-3" }),
										" ",
										p.author_name || "Atul"
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center gap-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-3 w-3" }),
										" ",
										p.reading_time || "5m"
									]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/blog/$slug",
								params: { slug: p.slug },
								className: "inline-flex items-center gap-1 text-xs font-semibold text-primary hover:gap-2 transition-all",
								children: ["Read More ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-3 w-3" })]
							}) })]
						})]
					})]
				}, p.id))
			})] })
		})
	})] });
}
//#endregion
export { BlogPage as component };
