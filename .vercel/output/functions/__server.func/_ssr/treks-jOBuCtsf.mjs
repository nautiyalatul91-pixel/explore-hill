import { r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { t as PageHero } from "./PageHero-B2khC5ZF.mjs";
import { t as trek_kedarkantha_default } from "./trek-kedarkantha-Jx50rRly.mjs";
import { r as treks } from "./packages-CLS7Ed0o.mjs";
import { t as PackageCard } from "./PackageCard-QZ3BiM7_.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/treks-jOBuCtsf.js
var import_jsx_runtime = require_jsx_runtime();
function TreksPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
		eyebrow: "Treks",
		title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: ["Walk into the ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-gradient",
			children: "wild Himalayas"
		})] }),
		subtitle: "From beginner-friendly weekend climbs to soulful summit pushes — every trek is led by experienced guides and built around small groups.",
		image: trek_kedarkantha_default
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
