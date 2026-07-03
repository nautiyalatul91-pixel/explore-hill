import { r as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-B99rZN6a.mjs";
import { n as require_react, r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { t as PageHero } from "./PageHero-B2khC5ZF.mjs";
import { t as trip_hanol_default } from "./trip-hanol-CA_hS0kf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/terms-CjfzqiVr.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function TermsPage() {
	const [content, setContent] = (0, import_react.useState)({
		title: "Terms and Conditions",
		content: "Please read these terms and conditions carefully before booking treks with Explore Hills.\n\n1. Booking & Confirmations\nAll bookings must be confirmed via WhatsApp. Seats are only reserved upon slot verification.\n\n2. Health & Safety\nTrekking in the Himalayas requires physical fitness. Clients must report any respiratory, cardiac, or medical conditions in advance on their traveler profile.\n\n3. Cancellation Policy\n- Cancellations 15 days before departure: 90% refund.\n- Cancellations 7-14 days before departure: 50% refund.\n- Cancellations within 7 days: No refund.\n\n4. Environmental Policy\nExplore Hills promotes responsible mountain tourism. Littering on trails is strictly prohibited."
	});
	(0, import_react.useEffect)(() => {
		async function load() {
			const { data } = await supabase.from("settings").select("*").eq("key", "static_pages").maybeSingle();
			if (data && typeof data.value === "object" && data.value !== null) {
				const val = data.value;
				if (val.terms) setContent(val.terms);
			}
		}
		load();
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
		eyebrow: "Legal",
		title: content.title,
		subtitle: "Booking policies, safety rules, and mountain codes.",
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
export { TermsPage as component };
