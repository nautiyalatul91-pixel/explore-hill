import { r as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-B99rZN6a.mjs";
import { n as require_react, r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { t as PageHero } from "./PageHero-B2khC5ZF.mjs";
import { n as usePackages } from "./packages-De34pvPG.mjs";
import { t as PackageCard } from "./PackageCard-C00RwxmJ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/treks-Dz06RVrL.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function TreksPage() {
	const { packages } = usePackages();
	const treks = packages.filter((p) => p.category === "trek");
	const [content, setContent] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		async function load() {
			const { data } = await supabase.from("settings").select("*").eq("key", "static_pages").maybeSingle();
			if (data && typeof data.value === "object" && data.value !== null) {
				const val = data.value;
				if (val.treks) setContent(val.treks);
			}
		}
		load();
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
		eyebrow: "Treks",
		title: content?.title ? content.title : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: ["Walk into the ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-gradient",
			children: "wild Himalayas"
		})] }),
		subtitle: content?.subtitle || "From beginner-friendly weekend climbs to soulful summit pushes — every trek is led by experienced guides and built around small groups.",
		image: content?.image || "/assets/trek-kedarkantha-BKuhAilf.jpg"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "py-20 sm:py-28 bg-background",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mx-auto max-w-7xl px-4 sm:px-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3",
			children: treks.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PackageCard, { pkg: p }, p.slug))
		})
	})] });
}
//#endregion
export { TreksPage as component };
