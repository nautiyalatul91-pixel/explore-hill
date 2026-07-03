import { t as e } from "./jsx-runtime-DGeXAQPT.js";
import { u as t } from "./index-ByEr9w9j.js";
import { t as n } from "./PageHero-BLDKAlfd.js";
import { r } from "./packages-HKOB1p0y.js";
import { t as i } from "./PackageCard-Cud42Brd.js";
var a = e();
function o() {
  return (0, a.jsxs)(a.Fragment, {
    children: [
      (0, a.jsx)(n, {
        eyebrow: `Treks`,
        title: (0, a.jsxs)(a.Fragment, {
          children: [
            `Walk into the `,
            (0, a.jsx)(`span`, {
              className: `text-gradient`,
              children: `wild Himalayas`,
            }),
          ],
        }),
        subtitle: `From beginner-friendly weekend climbs to soulful summit pushes — every trek is led by experienced guides and built around small groups.`,
        image: t,
      }),
      (0, a.jsx)(`section`, {
        className: `py-20 sm:py-28 bg-background`,
        children: (0, a.jsx)(`div`, {
          className: `mx-auto max-w-7xl px-4 sm:px-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3`,
          children: r.map((e) => (0, a.jsx)(i, { pkg: e }, e.slug)),
        }),
      }),
    ],
  });
}
export { o as component };
