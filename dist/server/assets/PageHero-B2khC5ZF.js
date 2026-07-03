import { jsx, jsxs } from "react/jsx-runtime";
//#region src/components/site/PageHero.tsx
function PageHero({ eyebrow, title, subtitle, image, children }) {
  return /* @__PURE__ */ jsxs("section", {
    className: "relative min-h-[70svh] flex items-end overflow-hidden",
    children: [
      /* @__PURE__ */ jsx("img", {
        src: image,
        alt: "",
        "aria-hidden": true,
        className: "absolute inset-0 h-full w-full object-cover",
      }),
      /* @__PURE__ */ jsx("div", {
        className:
          "absolute inset-0 bg-gradient-to-b from-ridge/40 via-ridge/40 to-ridge/95",
      }),
      /* @__PURE__ */ jsx("div", {
        className: "absolute inset-0 bg-aurora opacity-40",
      }),
      /* @__PURE__ */ jsxs("div", {
        className:
          "relative z-10 mx-auto max-w-7xl w-full px-4 sm:px-6 pt-40 pb-16 text-white",
        children: [
          /* @__PURE__ */ jsx("span", {
            className:
              "inline-flex items-center gap-2 rounded-full glass-dark px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-white/90 animate-fade-up",
            children: eyebrow,
          }),
          /* @__PURE__ */ jsx("h1", {
            className:
              "mt-6 font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] max-w-3xl animate-fade-up",
            children: title,
          }),
          subtitle &&
            /* @__PURE__ */ jsx("p", {
              className:
                "mt-5 max-w-2xl text-base sm:text-lg text-white/80 animate-fade-up",
              children: subtitle,
            }),
          children,
        ],
      }),
    ],
  });
}
//#endregion
export { PageHero as t };
