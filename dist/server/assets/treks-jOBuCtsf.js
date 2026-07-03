import { t as trek_kedarkantha_default } from "./trek-kedarkantha-Jx50rRly.js";
import { t as PageHero } from "./PageHero-B2khC5ZF.js";
import { r as treks } from "./packages-CLS7Ed0o.js";
import { t as PackageCard } from "./PackageCard-QZ3BiM7_.js";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
//#region src/routes/treks.tsx?tsr-split=component
function TreksPage() {
  return /* @__PURE__ */ jsxs(Fragment, {
    children: [
      /* @__PURE__ */ jsx(PageHero, {
        eyebrow: "Treks",
        title: /* @__PURE__ */ jsxs(Fragment, {
          children: [
            "Walk into the ",
            /* @__PURE__ */ jsx("span", {
              className: "text-gradient",
              children: "wild Himalayas",
            }),
          ],
        }),
        subtitle:
          "From beginner-friendly weekend climbs to soulful summit pushes — every trek is led by experienced guides and built around small groups.",
        image: trek_kedarkantha_default,
      }),
      /* @__PURE__ */ jsx("section", {
        className: "py-20 sm:py-28 bg-background",
        children: /* @__PURE__ */ jsx("div", {
          className:
            "mx-auto max-w-7xl px-4 sm:px-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3",
          children: treks.map((p) =>
            /* @__PURE__ */ jsx(PackageCard, { pkg: p }, p.slug),
          ),
        }),
      }),
    ],
  });
}
//#endregion
export { TreksPage as component };
