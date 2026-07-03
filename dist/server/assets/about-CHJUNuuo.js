import { t as hero_himalayas_default } from "./hero-himalayas-Dx5R6vBe.js";
import { t as PageHero } from "./PageHero-B2khC5ZF.js";
import { t as founder_default } from "./founder-D3HUJiNh.js";
import { Link } from "@tanstack/react-router";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { Compass, HeartHandshake, Leaf, Sparkles } from "lucide-react";
//#region src/routes/about.tsx?tsr-split=component
var values = [
  {
    icon: Leaf,
    title: "Responsible",
    text: "Low-impact itineraries that respect mountain ecosystems and local culture.",
  },
  {
    icon: HeartHandshake,
    title: "Community-first",
    text: "Every trip directly supports village families, homestays and local guides.",
  },
  {
    icon: Sparkles,
    title: "Authentic",
    text: "Real food, real people, real Uttarakhand — never staged, never generic.",
  },
  {
    icon: Compass,
    title: "Curated",
    text: "Small groups, hidden routes and itineraries we'd run for our own families.",
  },
];
function AboutPage() {
  return /* @__PURE__ */ jsxs(Fragment, {
    children: [
      /* @__PURE__ */ jsx(PageHero, {
        eyebrow: "Our Story",
        title: /* @__PURE__ */ jsxs(Fragment, {
          children: [
            "Born in the hills, built for",
            " ",
            /* @__PURE__ */ jsx("span", {
              className: "text-gradient",
              children: "travelers",
            }),
          ],
        }),
        subtitle:
          "Explore Hills is a young Uttarakhand-based travel startup on a mission to share the real Himalayas with the world — one small group at a time.",
        image: hero_himalayas_default,
      }),
      /* @__PURE__ */ jsx("section", {
        className: "py-20 sm:py-28 bg-background",
        children: /* @__PURE__ */ jsxs("div", {
          className:
            "mx-auto max-w-6xl px-4 sm:px-6 grid lg:grid-cols-2 gap-12 items-center",
          children: [
            /* @__PURE__ */ jsxs("div", {
              className: "relative",
              children: [
                /* @__PURE__ */ jsx("div", {
                  className:
                    "absolute -inset-4 bg-[var(--gradient-brand)] opacity-20 blur-3xl rounded-3xl",
                }),
                /* @__PURE__ */ jsx("img", {
                  src: founder_default,
                  alt: "Atul Nautiyal, founder of Explore Hills",
                  loading: "lazy",
                  className: "relative rounded-3xl shadow-elegant w-full",
                }),
              ],
            }),
            /* @__PURE__ */ jsxs("div", {
              children: [
                /* @__PURE__ */ jsx("p", {
                  className:
                    "text-xs font-semibold uppercase tracking-[0.2em] text-ember",
                  children: "Founder",
                }),
                /* @__PURE__ */ jsx("h2", {
                  className:
                    "mt-3 font-display text-4xl sm:text-5xl font-bold text-foreground",
                  children: "Atul Nautiyal",
                }),
                /* @__PURE__ */ jsx("p", {
                  className: "mt-6 text-muted-foreground leading-relaxed",
                  children:
                    "Growing up in the lap of the Garhwal Himalayas, Atul always knew the mountains had stories most travelers never heard. After years of guiding friends through hidden valleys, ancient temples and family-run village homestays, he built Explore Hills to make these experiences accessible — without losing what makes them special.",
                }),
                /* @__PURE__ */ jsx("p", {
                  className: "mt-4 text-muted-foreground leading-relaxed",
                  children:
                    "Today, Explore Hills runs small-group treks, cultural trips and spiritual journeys across Uttarakhand, all anchored in local communities and responsible tourism. We're not a tour operator — we're hosts in our own home.",
                }),
                /* @__PURE__ */ jsxs("blockquote", {
                  className:
                    "mt-8 rounded-2xl bg-secondary p-6 border-l-4 border-ember",
                  children: [
                    /* @__PURE__ */ jsx("p", {
                      className: "font-display text-lg text-foreground italic",
                      children:
                        '"The hills don\'t need to be conquered. They need to be listened to."',
                    }),
                    /* @__PURE__ */ jsx("footer", {
                      className: "mt-3 text-sm text-muted-foreground",
                      children: "— Atul Nautiyal, Founder",
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
      }),
      /* @__PURE__ */ jsxs("section", {
        className:
          "py-20 sm:py-28 bg-ridge text-white relative overflow-hidden",
        children: [
          /* @__PURE__ */ jsx("div", {
            className: "absolute inset-0 bg-aurora opacity-60",
            "aria-hidden": true,
          }),
          /* @__PURE__ */ jsxs("div", {
            className:
              "relative mx-auto max-w-7xl px-4 sm:px-6 grid gap-6 md:grid-cols-2",
            children: [
              /* @__PURE__ */ jsxs("div", {
                className: "rounded-3xl glass-dark p-8",
                children: [
                  /* @__PURE__ */ jsx("p", {
                    className:
                      "text-xs font-semibold uppercase tracking-[0.2em] text-ember",
                    children: "Mission",
                  }),
                  /* @__PURE__ */ jsx("h3", {
                    className: "mt-3 font-display text-3xl font-bold",
                    children: "Authentic, responsible, unforgettable.",
                  }),
                  /* @__PURE__ */ jsx("p", {
                    className: "mt-4 text-white/75",
                    children:
                      "To open Uttarakhand's hidden corners to travelers in a way that uplifts local communities, protects fragile ecosystems and leaves every guest with a story worth telling.",
                  }),
                ],
              }),
              /* @__PURE__ */ jsxs("div", {
                className: "rounded-3xl glass-dark p-8",
                children: [
                  /* @__PURE__ */ jsx("p", {
                    className:
                      "text-xs font-semibold uppercase tracking-[0.2em] text-ember",
                    children: "Vision",
                  }),
                  /* @__PURE__ */ jsx("h3", {
                    className: "mt-3 font-display text-3xl font-bold",
                    children: "A new chapter for mountain tourism.",
                  }),
                  /* @__PURE__ */ jsx("p", {
                    className: "mt-4 text-white/75",
                    children:
                      "To become India's most trusted small-group Himalayan travel brand — a name travelers, villages and the mountains themselves can rely on.",
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
      /* @__PURE__ */ jsx("section", {
        className: "py-20 sm:py-28 bg-background",
        children: /* @__PURE__ */ jsxs("div", {
          className: "mx-auto max-w-7xl px-4 sm:px-6",
          children: [
            /* @__PURE__ */ jsxs("div", {
              className: "text-center max-w-2xl mx-auto mb-14",
              children: [
                /* @__PURE__ */ jsx("p", {
                  className:
                    "text-xs font-semibold uppercase tracking-[0.2em] text-ember",
                  children: "Our Values",
                }),
                /* @__PURE__ */ jsx("h2", {
                  className:
                    "mt-3 font-display text-4xl sm:text-5xl font-bold text-foreground",
                  children: "What we stand for",
                }),
              ],
            }),
            /* @__PURE__ */ jsx("div", {
              className: "grid gap-5 sm:grid-cols-2 lg:grid-cols-4",
              children: values.map(({ icon: Icon, title, text }) =>
                /* @__PURE__ */ jsxs(
                  "div",
                  {
                    className:
                      "rounded-2xl bg-card border border-border p-6 shadow-card hover-lift",
                    children: [
                      /* @__PURE__ */ jsx("div", {
                        className:
                          "grid h-12 w-12 place-items-center rounded-xl bg-[var(--gradient-brand)] text-white",
                        children: /* @__PURE__ */ jsx(Icon, {
                          className: "h-5 w-5",
                        }),
                      }),
                      /* @__PURE__ */ jsx("h3", {
                        className:
                          "mt-5 font-display text-xl font-semibold text-foreground",
                        children: title,
                      }),
                      /* @__PURE__ */ jsx("p", {
                        className: "mt-2 text-sm text-muted-foreground",
                        children: text,
                      }),
                    ],
                  },
                  title,
                ),
              ),
            }),
            /* @__PURE__ */ jsx("div", {
              className: "mt-14 text-center",
              children: /* @__PURE__ */ jsx(Link, {
                to: "/book",
                className:
                  "inline-flex items-center gap-2 rounded-full bg-[var(--gradient-ember)] px-7 py-3.5 text-sm font-semibold text-ember-foreground shadow-glow",
                children: "Travel with us",
              }),
            }),
          ],
        }),
      }),
    ],
  });
}
//#endregion
export { AboutPage as component };
