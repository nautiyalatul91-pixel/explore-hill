import { r as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-B99rZN6a.mjs";
import { n as require_react, r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { t as PageHero } from "./PageHero-B2khC5ZF.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { B as ArrowLeft, L as Calendar, N as Clock, i as User } from "../_libs/lucide-react.mjs";
import { t as Route } from "./blog._slug-C6qteXME.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/blog._slug-DAurNmEU.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function BlogPostDetail() {
	const { slug } = Route.useParams();
	const [post, setPost] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		async function load() {
			const { data, error } = await supabase.from("posts").select("*").eq("slug", slug).maybeSingle();
			if (!error && data) setPost(data);
			setLoading(false);
		}
		load();
	}, [slug]);
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen grid place-items-center bg-background text-muted-foreground",
		children: "Loading story details..."
	});
	if (!post) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen flex flex-col items-center justify-center bg-background space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-xl font-bold text-foreground",
				children: "Story not found"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: "The story you are looking for has been moved or deleted."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/blog",
				className: "rounded-xl bg-primary text-primary-foreground px-4 py-2 text-sm font-semibold",
				children: "Back to Journal"
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
		eyebrow: "Explore Hills Journal",
		title: post.title,
		subtitle: post.summary || `Written by ${post.author_name || "Atul Nautiyal"}`,
		image: post.featured_image || "/assets/gallery-bonfire-CkXh8YQ9.jpg"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("article", {
		className: "py-20 bg-background text-foreground",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-3xl px-4 sm:px-6 space-y-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-4 text-xs text-muted-foreground border-b border-border pb-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/blog",
							className: "inline-flex items-center gap-1.5 text-primary font-semibold mr-auto",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4" }), " Back to Journal"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "h-3.5 w-3.5" }),
								" ",
								post.author_name || "Atul Nautiyal"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "h-3.5 w-3.5" }),
								" ",
								new Date(post.publish_date).toLocaleDateString()
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-3.5 w-3.5" }),
								" ",
								post.reading_time || "5 min read"
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "prose dark:prose-invert max-w-none whitespace-pre-wrap font-sans text-sm sm:text-base leading-relaxed space-y-4",
					children: post.content
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "border-t border-border pt-6 mt-8 space-y-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-2",
						children: [post.categories.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs bg-primary/10 text-primary font-semibold px-3 py-1 rounded-full uppercase tracking-wide",
							children: c
						}, c)), post.tags.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-xs bg-muted text-muted-foreground font-semibold px-3 py-1 rounded-full",
							children: ["#", t]
						}, t))]
					})
				})
			]
		})
	})] });
}
//#endregion
export { BlogPostDetail as component };
