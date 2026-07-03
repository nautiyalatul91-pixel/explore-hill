import { r as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-B99rZN6a.mjs";
import { n as require_react, r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { t as PageHero } from "./PageHero-B2khC5ZF.mjs";
import { t as gallery_group_default } from "./gallery-group-MaxqF0cG.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/careers-CFIw4_EV.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CareersPage() {
	const [content, setContent] = (0, import_react.useState)({
		title: "Careers at Explore Hills",
		content: "We are always looking for passionate mountain guides, content editors, coordinators, and local hosts who want to share the beauty of Uttarakhand with the world.\n\nOpen Roles:\n\n1. Certified Mountain Guide (Garhwal region)\nRequirements: BMC/AMC certified, first aid training, minimum 3 years guiding experience.\n\n2. Adventure Travel Coordinator (Dehradun base)\nRequirements: Customer support skills, logistics coordination experience, love for mountain trails.\n\nHow to Apply:\nSend your resume and a short note about your favorite Himalayan memory to contact@explorehills.in or message Atul Nautiyal on WhatsApp at +91 6397710701."
	});
	(0, import_react.useEffect)(() => {
		async function load() {
			const { data } = await supabase.from("settings").select("*").eq("key", "static_pages").maybeSingle();
			if (data && typeof data.value === "object" && data.value !== null) {
				const val = data.value;
				if (val.careers) setContent(val.careers);
			}
		}
		load();
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
		eyebrow: "Join the Team",
		title: content.title,
		subtitle: "Work in the lap of the Himalayas.",
		image: gallery_group_default
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "py-20 bg-background text-foreground animate-fade-up",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mx-auto max-w-3xl px-4 sm:px-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "prose dark:prose-invert max-w-none whitespace-pre-wrap font-sans text-sm sm:text-base leading-relaxed space-y-4",
				children: content.content
			})
		})
	})] });
}
//#endregion
export { CareersPage as component };
