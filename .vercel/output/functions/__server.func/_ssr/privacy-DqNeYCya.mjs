import { r as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-B99rZN6a.mjs";
import { n as require_react, r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { t as PageHero } from "./PageHero-B2khC5ZF.mjs";
import { t as trip_hanol_default } from "./trip-hanol-CA_hS0kf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/privacy-DqNeYCya.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PrivacyPage() {
	const [content, setContent] = (0, import_react.useState)({
		title: "Privacy Policy",
		content: "At Explore Hills, we take your privacy seriously. This privacy policy describes how we collect, use, and protect your personal information when you book a trek, subscribe to our newsletter, or fill out a contact lead form.\n\n1. Information Collection\nWe collect your name, email address, phone number, and special requirements when you place a booking or request a quote.\n\n2. Information Usage\nYour details are only used to coordinate your travel arrangements, verify guide requirements, and contact you via WhatsApp or Email.\n\n3. Data Protection\nWe do not sell or lease customer profiles to third parties. All traveler profiles are secured with Supabase storage and Row Level Security permissions."
	});
	(0, import_react.useEffect)(() => {
		async function load() {
			const { data } = await supabase.from("settings").select("*").eq("key", "static_pages").maybeSingle();
			if (data && typeof data.value === "object" && data.value !== null) {
				const val = data.value;
				if (val.privacy) setContent(val.privacy);
			}
		}
		load();
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
		eyebrow: "Legal",
		title: content.title,
		subtitle: "How we handle and protect traveler information.",
		image: trip_hanol_default
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
export { PrivacyPage as component };
