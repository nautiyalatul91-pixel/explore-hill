import { t as e } from "./jsx-runtime-DGeXAQPT.js";
import { t } from "./createLucideIcon-Ctx0NuqD.js";
import { n, r, t as i } from "./map-pin-BOCy7l3d.js";
import { n as a, t as o } from "./sparkles-bbUy9Cay.js";
import { t as s } from "./shield-check-2oMmHvvh.js";
import { t as c } from "./users-CNMDuO64.js";
import { l, m as u, s as d, t as f, y as p } from "./index-ByEr9w9j.js";
import { i as m, r as h, t as g } from "./packages-HKOB1p0y.js";
import { n as _, t as v } from "./gallery-group-DCmK1VZG.js";
var y = t(`flame`, [
    [
      `path`,
      {
        d: `M12 3q1 4 4 6.5t3 5.5a1 1 0 0 1-14 0 5 5 0 0 1 1-3 1 1 0 0 0 5 0c0-2-1.5-3-1.5-5q0-2 2.5-4`,
        key: `1slcih`,
      },
    ],
  ]),
  b = t(`heart`, [
    [
      `path`,
      {
        d: `M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5`,
        key: `mvr1a0`,
      },
    ],
  ]),
  x = t(`star`, [
    [
      `path`,
      {
        d: `M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z`,
        key: `r04s7s`,
      },
    ],
  ]),
  S = t(`utensils`, [
    [`path`, { d: `M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2`, key: `cjf0a3` }],
    [`path`, { d: `M7 2v20`, key: `1473qp` }],
    [
      `path`,
      { d: `M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7`, key: `j28e5` },
    ],
  ]),
  C = e();
function w({ pkg: e }) {
  return (0, C.jsxs)(`article`, {
    className: `group relative overflow-hidden rounded-3xl bg-card shadow-card hover-lift`,
    children: [
      (0, C.jsxs)(`div`, {
        className: `relative aspect-[4/3] overflow-hidden`,
        children: [
          (0, C.jsx)(`img`, {
            src: e.image,
            alt: e.name,
            loading: `lazy`,
            width: 1280,
            height: 960,
            className: `h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-110`,
          }),
          (0, C.jsx)(`div`, {
            className: `absolute inset-0 bg-gradient-to-t from-ridge/80 via-ridge/10 to-transparent`,
          }),
          (0, C.jsxs)(`div`, {
            className: `absolute top-4 left-4 flex gap-2`,
            children: [
              (0, C.jsx)(`span`, {
                className: `rounded-full glass px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-ridge`,
                children: e.category === `trek` ? `Trek` : `Trip`,
              }),
              e.difficulty &&
                (0, C.jsx)(`span`, {
                  className: `rounded-full bg-ember/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-ember-foreground`,
                  children: e.difficulty,
                }),
            ],
          }),
          (0, C.jsxs)(`div`, {
            className: `absolute bottom-4 left-5 right-5 text-white`,
            children: [
              (0, C.jsx)(`h3`, {
                className: `font-display text-2xl font-bold leading-tight`,
                children: e.name,
              }),
              (0, C.jsxs)(`div`, {
                className: `mt-1 flex items-center gap-3 text-xs text-white/80`,
                children: [
                  (0, C.jsxs)(`span`, {
                    className: `inline-flex items-center gap-1`,
                    children: [
                      (0, C.jsx)(n, { className: `h-3.5 w-3.5` }),
                      ` `,
                      e.duration,
                    ],
                  }),
                  (0, C.jsxs)(`span`, {
                    className: `inline-flex items-center gap-1`,
                    children: [
                      (0, C.jsx)(i, { className: `h-3.5 w-3.5` }),
                      ` Uttarakhand`,
                    ],
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
      (0, C.jsxs)(`div`, {
        className: `p-6`,
        children: [
          (0, C.jsx)(`p`, {
            className: `text-sm text-muted-foreground line-clamp-2`,
            children: e.tagline,
          }),
          (0, C.jsx)(`ul`, {
            className: `mt-4 grid grid-cols-2 gap-x-3 gap-y-1.5 text-xs text-foreground/80`,
            children: e.highlights.slice(0, 4).map((e) =>
              (0, C.jsxs)(
                `li`,
                {
                  className: `flex items-start gap-1.5`,
                  children: [
                    (0, C.jsx)(`span`, {
                      className: `mt-1 h-1 w-1 rounded-full bg-ember shrink-0`,
                    }),
                    ` `,
                    e,
                  ],
                },
                e,
              ),
            ),
          }),
          (0, C.jsxs)(`div`, {
            className: `mt-6 flex items-end justify-between`,
            children: [
              (0, C.jsxs)(`div`, {
                children: [
                  (0, C.jsx)(`p`, {
                    className: `text-[10px] uppercase tracking-widest text-muted-foreground`,
                    children: `From`,
                  }),
                  (0, C.jsxs)(`p`, {
                    className: `font-display text-2xl font-bold text-primary`,
                    children: [
                      e.priceLabel,
                      (0, C.jsxs)(`span`, {
                        className: `text-xs font-medium text-muted-foreground`,
                        children: [` `, `/person`],
                      }),
                    ],
                  }),
                ],
              }),
              (0, C.jsxs)(p, {
                to: `/book`,
                search: { pkg: e.slug },
                className: `inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2.5 text-xs font-semibold text-primary-foreground hover:bg-primary/90 transition`,
                children: [
                  `Book Now `,
                  (0, C.jsx)(r, { className: `h-3.5 w-3.5` }),
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  });
}
var T = [
    { value: `2,500+`, label: `Happy Travelers` },
    { value: `120+`, label: `Trips Completed` },
    { value: `14–15`, label: `Small Group Size` },
    { value: `4.9★`, label: `Average Rating` },
  ],
  E = [
    {
      icon: b,
      title: `Couple-friendly`,
      text: `Private moments, quiet stays and itineraries designed for two.`,
    },
    {
      icon: c,
      title: `Small Groups`,
      text: `Just 14–15 travelers per batch so every voice is heard.`,
    },
    {
      icon: y,
      title: `Bonfire Nights`,
      text: `Stories, music and warmth under a sky full of Himalayan stars.`,
    },
    {
      icon: S,
      title: `Local Food Included`,
      text: `Authentic Garhwali meals cooked by our village hosts.`,
    },
    {
      icon: a,
      title: `Hidden Destinations`,
      text: `Off-the-grid valleys and villages most travelers never see.`,
    },
    {
      icon: s,
      title: `Safe & Comfortable`,
      text: `Vetted stays, certified guides and full transportation.`,
    },
  ],
  D = [
    { title: `Treks`, image: d, count: `${h.length} routes`, to: `/treks` },
    {
      title: `Cultural Trips`,
      image: _,
      count: `${m.length} journeys`,
      to: `/trips`,
    },
    { title: `Camping`, image: l, count: `Bonfire nights`, to: `/gallery` },
    { title: `Village Stays`, image: v, count: `Local hosts`, to: `/gallery` },
  ],
  O = [
    {
      name: `Priya & Aman`,
      trip: `Kedarkantha Trek`,
      text: `The most magical 4 days of our lives. The team felt like family by the end of the trip.`,
    },
    {
      name: `Rahul Sharma`,
      trip: `Moila Top Trek`,
      text: `Hidden gem of Uttarakhand. The bonfire night under stars is unmatched. Already booked the next one!`,
    },
    {
      name: `Neha Kapoor`,
      trip: `Hanol Cultural Trip`,
      text: `Stayed in a traditional village home, ate the best food. Felt like discovering a different India.`,
    },
  ],
  k = [
    {
      q: `What is the group size on each trip?`,
      a: `We keep batches small at 14–15 travelers so the experience stays personal and the trails stay peaceful.`,
    },
    {
      q: `Are your trips couple-friendly?`,
      a: `Absolutely. We design every itinerary with couples, solo travelers and small groups of friends in mind.`,
    },
    {
      q: `What's included in the price?`,
      a: `Transportation from Dehradun, accommodation, all local meals, a certified guide, bonfire (where applicable) and group coordination.`,
    },
    {
      q: `Do I need prior trekking experience?`,
      a: `Most of our treks are beginner to moderate. Our guides brief and pace the group so first-timers feel safe and supported.`,
    },
    {
      q: `How do I book a trip?`,
      a: `Pick a package, hit Book Now, fill the form and our team confirms over WhatsApp within a few hours.`,
    },
  ];
function A() {
  return (0, C.jsxs)(C.Fragment, {
    children: [
      (0, C.jsxs)(`section`, {
        className: `relative min-h-[100svh] flex items-center justify-center overflow-hidden`,
        children: [
          (0, C.jsx)(`img`, {
            src: f,
            alt: `Snow-capped Himalayan peaks of Uttarakhand at golden hour`,
            className: `absolute inset-0 h-full w-full object-cover scale-105`,
            fetchPriority: `high`,
          }),
          (0, C.jsx)(`div`, {
            className: `absolute inset-0 bg-gradient-to-b from-ridge/30 via-ridge/40 to-ridge/90`,
          }),
          (0, C.jsx)(`div`, {
            className: `absolute inset-0 bg-aurora opacity-40`,
          }),
          (0, C.jsxs)(`div`, {
            className: `relative z-10 mx-auto max-w-5xl px-6 pt-32 pb-24 text-center text-white`,
            children: [
              (0, C.jsxs)(`span`, {
                className: `inline-flex items-center gap-2 rounded-full glass-dark px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-white/90 animate-fade-up`,
                children: [
                  (0, C.jsx)(o, { className: `h-3.5 w-3.5 text-ember` }),
                  `Small-group Himalayan adventures`,
                ],
              }),
              (0, C.jsxs)(`h1`, {
                className: `mt-6 font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.02] tracking-tight animate-fade-up`,
                children: [
                  `Explore the`,
                  (0, C.jsx)(`br`, {}),
                  (0, C.jsx)(`span`, {
                    className: `text-gradient`,
                    children: `Hidden Himalayas`,
                  }),
                ],
              }),
              (0, C.jsx)(`p`, {
                className: `mx-auto mt-6 max-w-2xl text-base sm:text-lg text-white/85 animate-fade-up`,
                children: `Authentic treks, village stays, camping experiences and spiritual journeys across Uttarakhand — crafted for couples, small groups and weekend wanderers.`,
              }),
              (0, C.jsxs)(`div`, {
                className: `mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 animate-fade-up`,
                children: [
                  (0, C.jsxs)(p, {
                    to: `/book`,
                    className: `inline-flex items-center gap-2 rounded-full bg-[var(--gradient-ember)] px-7 py-3.5 text-sm font-semibold text-ember-foreground shadow-glow hover:scale-[1.02] transition-transform`,
                    children: [
                      `Book Your Adventure `,
                      (0, C.jsx)(r, { className: `h-4 w-4` }),
                    ],
                  }),
                  (0, C.jsx)(p, {
                    to: `/trips`,
                    className: `inline-flex items-center gap-2 rounded-full glass-dark border border-white/25 px-7 py-3.5 text-sm font-semibold text-white hover:bg-white/15 transition`,
                    children: `Explore Trips`,
                  }),
                ],
              }),
              (0, C.jsx)(`div`, {
                className: `mt-20 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto`,
                children: T.map((e) =>
                  (0, C.jsxs)(
                    `div`,
                    {
                      className: `rounded-2xl glass-dark p-4 text-center`,
                      children: [
                        (0, C.jsx)(`div`, {
                          className: `font-display text-2xl sm:text-3xl font-bold text-white`,
                          children: e.value,
                        }),
                        (0, C.jsx)(`div`, {
                          className: `mt-1 text-[11px] uppercase tracking-wider text-white/70`,
                          children: e.label,
                        }),
                      ],
                    },
                    e.label,
                  ),
                ),
              }),
            ],
          }),
          (0, C.jsx)(`div`, {
            className: `absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 text-xs tracking-widest uppercase animate-float`,
            children: `Scroll to discover`,
          }),
        ],
      }),
      (0, C.jsx)(`section`, {
        className: `relative py-24 sm:py-32 bg-background`,
        children: (0, C.jsxs)(`div`, {
          className: `mx-auto max-w-7xl px-4 sm:px-6`,
          children: [
            (0, C.jsxs)(`div`, {
              className: `flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12`,
              children: [
                (0, C.jsxs)(`div`, {
                  children: [
                    (0, C.jsx)(`p`, {
                      className: `text-xs font-semibold uppercase tracking-[0.2em] text-ember`,
                      children: `Featured Adventures`,
                    }),
                    (0, C.jsx)(`h2`, {
                      className: `mt-3 font-display text-4xl sm:text-5xl font-bold text-foreground max-w-2xl`,
                      children: `Handpicked journeys into the heart of Uttarakhand`,
                    }),
                  ],
                }),
                (0, C.jsxs)(p, {
                  to: `/treks`,
                  className: `inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all`,
                  children: [
                    `View all treks `,
                    (0, C.jsx)(r, { className: `h-4 w-4` }),
                  ],
                }),
              ],
            }),
            (0, C.jsx)(`div`, {
              className: `grid gap-6 sm:grid-cols-2 lg:grid-cols-3`,
              children: g
                .slice(0, 6)
                .map((e) => (0, C.jsx)(w, { pkg: e }, e.slug)),
            }),
          ],
        }),
      }),
      (0, C.jsxs)(`section`, {
        className: `relative py-24 sm:py-32 overflow-hidden bg-ridge text-white`,
        children: [
          (0, C.jsx)(`div`, {
            className: `absolute inset-0 bg-aurora opacity-70`,
            "aria-hidden": !0,
          }),
          (0, C.jsxs)(`div`, {
            className: `relative mx-auto max-w-7xl px-4 sm:px-6`,
            children: [
              (0, C.jsxs)(`div`, {
                className: `max-w-2xl`,
                children: [
                  (0, C.jsx)(`p`, {
                    className: `text-xs font-semibold uppercase tracking-[0.2em] text-ember`,
                    children: `Why Explore Hills`,
                  }),
                  (0, C.jsxs)(`h2`, {
                    className: `mt-3 font-display text-4xl sm:text-5xl font-bold`,
                    children: [
                      `Travel that feels personal,`,
                      (0, C.jsx)(`br`, {}),
                      `never packaged.`,
                    ],
                  }),
                  (0, C.jsx)(`p`, {
                    className: `mt-4 text-white/70`,
                    children: `We're a small Uttarakhand-rooted team building intimate experiences that respect local culture, support village communities and put travelers first.`,
                  }),
                ],
              }),
              (0, C.jsx)(`div`, {
                className: `mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3`,
                children: E.map(({ icon: e, title: t, text: n }) =>
                  (0, C.jsxs)(
                    `div`,
                    {
                      className: `group rounded-2xl glass-dark p-6 hover:bg-white/10 transition-colors`,
                      children: [
                        (0, C.jsx)(`div`, {
                          className: `grid h-12 w-12 place-items-center rounded-xl bg-[var(--gradient-ember)] text-ember-foreground shadow-glow`,
                          children: (0, C.jsx)(e, { className: `h-5 w-5` }),
                        }),
                        (0, C.jsx)(`h3`, {
                          className: `mt-5 font-display text-xl font-semibold`,
                          children: t,
                        }),
                        (0, C.jsx)(`p`, {
                          className: `mt-2 text-sm text-white/70`,
                          children: n,
                        }),
                      ],
                    },
                    t,
                  ),
                ),
              }),
            ],
          }),
        ],
      }),
      (0, C.jsx)(`section`, {
        className: `py-24 sm:py-32 bg-mist`,
        children: (0, C.jsxs)(`div`, {
          className: `mx-auto max-w-7xl px-4 sm:px-6`,
          children: [
            (0, C.jsxs)(`div`, {
              className: `text-center max-w-2xl mx-auto`,
              children: [
                (0, C.jsx)(`p`, {
                  className: `text-xs font-semibold uppercase tracking-[0.2em] text-ember`,
                  children: `Adventure Categories`,
                }),
                (0, C.jsx)(`h2`, {
                  className: `mt-3 font-display text-4xl sm:text-5xl font-bold text-foreground`,
                  children: `Choose your kind of adventure`,
                }),
              ],
            }),
            (0, C.jsx)(`div`, {
              className: `mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4`,
              children: D.map((e) =>
                (0, C.jsxs)(
                  p,
                  {
                    to: e.to,
                    className: `group relative aspect-[3/4] overflow-hidden rounded-3xl shadow-card hover-lift`,
                    children: [
                      (0, C.jsx)(`img`, {
                        src: e.image,
                        alt: e.title,
                        loading: `lazy`,
                        className: `absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-110`,
                      }),
                      (0, C.jsx)(`div`, {
                        className: `absolute inset-0 bg-gradient-to-t from-ridge via-ridge/30 to-transparent`,
                      }),
                      (0, C.jsxs)(`div`, {
                        className: `absolute inset-x-5 bottom-5 text-white`,
                        children: [
                          (0, C.jsx)(`p`, {
                            className: `text-[11px] uppercase tracking-widest text-white/70`,
                            children: e.count,
                          }),
                          (0, C.jsx)(`h3`, {
                            className: `font-display text-2xl font-bold`,
                            children: e.title,
                          }),
                        ],
                      }),
                    ],
                  },
                  e.title,
                ),
              ),
            }),
          ],
        }),
      }),
      (0, C.jsx)(`section`, {
        className: `py-24 sm:py-32 bg-background`,
        children: (0, C.jsxs)(`div`, {
          className: `mx-auto max-w-7xl px-4 sm:px-6`,
          children: [
            (0, C.jsxs)(`div`, {
              className: `text-center max-w-2xl mx-auto mb-14`,
              children: [
                (0, C.jsx)(`p`, {
                  className: `text-xs font-semibold uppercase tracking-[0.2em] text-ember`,
                  children: `Travelers Love Us`,
                }),
                (0, C.jsx)(`h2`, {
                  className: `mt-3 font-display text-4xl sm:text-5xl font-bold text-foreground`,
                  children: `Stories from the trail`,
                }),
              ],
            }),
            (0, C.jsx)(`div`, {
              className: `grid gap-6 md:grid-cols-3`,
              children: O.map((e) =>
                (0, C.jsxs)(
                  `figure`,
                  {
                    className: `rounded-3xl bg-card border border-border p-7 shadow-card hover-lift`,
                    children: [
                      (0, C.jsx)(`div`, {
                        className: `flex gap-1 text-ember`,
                        children: Array.from({ length: 5 }).map((e, t) =>
                          (0, C.jsx)(
                            x,
                            { className: `h-4 w-4 fill-current` },
                            t,
                          ),
                        ),
                      }),
                      (0, C.jsxs)(`blockquote`, {
                        className: `mt-4 font-display text-lg leading-snug text-foreground`,
                        children: [`"`, e.text, `"`],
                      }),
                      (0, C.jsxs)(`figcaption`, {
                        className: `mt-6 flex items-center gap-3`,
                        children: [
                          (0, C.jsx)(`div`, {
                            className: `grid h-11 w-11 place-items-center rounded-full bg-[var(--gradient-brand)] text-white font-semibold`,
                            children: e.name.charAt(0),
                          }),
                          (0, C.jsxs)(`div`, {
                            children: [
                              (0, C.jsx)(`div`, {
                                className: `text-sm font-semibold text-foreground`,
                                children: e.name,
                              }),
                              (0, C.jsx)(`div`, {
                                className: `text-xs text-muted-foreground`,
                                children: e.trip,
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  },
                  e.name,
                ),
              ),
            }),
          ],
        }),
      }),
      (0, C.jsx)(`section`, {
        className: `py-24 sm:py-32 bg-mist`,
        children: (0, C.jsxs)(`div`, {
          className: `mx-auto max-w-7xl px-4 sm:px-6`,
          children: [
            (0, C.jsx)(`div`, {
              className: `flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12`,
              children: (0, C.jsxs)(`div`, {
                children: [
                  (0, C.jsx)(`p`, {
                    className: `text-xs font-semibold uppercase tracking-[0.2em] text-ember`,
                    children: `Upcoming Departures`,
                  }),
                  (0, C.jsx)(`h2`, {
                    className: `mt-3 font-display text-4xl sm:text-5xl font-bold text-foreground`,
                    children: `Spots filling fast — secure yours`,
                  }),
                ],
              }),
            }),
            (0, C.jsx)(`div`, {
              className: `grid gap-3`,
              children: g.slice(0, 4).map((e, t) => {
                let n = new Date();
                n.setDate(n.getDate() + 14 + t * 7);
                let i = n.toLocaleDateString(`en-IN`, {
                  day: `2-digit`,
                  month: `short`,
                  year: `numeric`,
                });
                return (0, C.jsxs)(
                  `div`,
                  {
                    className: `flex flex-col sm:flex-row sm:items-center gap-4 rounded-2xl bg-card border border-border p-5 shadow-card hover:shadow-elegant transition-shadow`,
                    children: [
                      (0, C.jsx)(`img`, {
                        src: e.image,
                        alt: e.name,
                        loading: `lazy`,
                        className: `h-20 w-full sm:w-28 rounded-xl object-cover`,
                      }),
                      (0, C.jsxs)(`div`, {
                        className: `flex-1 min-w-0`,
                        children: [
                          (0, C.jsx)(`div`, {
                            className: `font-display text-lg font-semibold text-foreground`,
                            children: e.name,
                          }),
                          (0, C.jsxs)(`div`, {
                            className: `text-xs text-muted-foreground mt-0.5`,
                            children: [e.duration, ` · Departs `, i],
                          }),
                        ],
                      }),
                      (0, C.jsxs)(`div`, {
                        className: `text-left sm:text-right`,
                        children: [
                          (0, C.jsx)(`div`, {
                            className: `font-display text-xl font-bold text-primary`,
                            children: e.priceLabel,
                          }),
                          (0, C.jsx)(`div`, {
                            className: `text-[11px] uppercase tracking-wider text-muted-foreground`,
                            children: `per person`,
                          }),
                        ],
                      }),
                      (0, C.jsxs)(p, {
                        to: `/book`,
                        search: { pkg: e.slug },
                        className: `inline-flex items-center justify-center gap-1.5 rounded-full bg-[var(--gradient-ember)] text-ember-foreground px-5 py-2.5 text-xs font-semibold shadow-glow`,
                        children: [
                          `Reserve `,
                          (0, C.jsx)(r, { className: `h-3.5 w-3.5` }),
                        ],
                      }),
                    ],
                  },
                  e.slug,
                );
              }),
            }),
          ],
        }),
      }),
      (0, C.jsx)(`section`, {
        className: `py-24 sm:py-32 bg-background`,
        children: (0, C.jsxs)(`div`, {
          className: `mx-auto max-w-4xl px-4 sm:px-6`,
          children: [
            (0, C.jsxs)(`div`, {
              className: `text-center max-w-2xl mx-auto mb-12`,
              children: [
                (0, C.jsx)(`p`, {
                  className: `text-xs font-semibold uppercase tracking-[0.2em] text-ember`,
                  children: `Frequently Asked`,
                }),
                (0, C.jsx)(`h2`, {
                  className: `mt-3 font-display text-4xl sm:text-5xl font-bold text-foreground`,
                  children: `Everything you wanted to know`,
                }),
              ],
            }),
            (0, C.jsx)(`div`, {
              className: `space-y-3`,
              children: k.map((e) =>
                (0, C.jsxs)(
                  `details`,
                  {
                    className: `group rounded-2xl bg-card border border-border p-6 shadow-card`,
                    children: [
                      (0, C.jsxs)(`summary`, {
                        className: `flex items-center justify-between cursor-pointer list-none`,
                        children: [
                          (0, C.jsx)(`span`, {
                            className: `font-display text-lg font-semibold text-foreground pr-4`,
                            children: e.q,
                          }),
                          (0, C.jsx)(`span`, {
                            className: `grid h-8 w-8 place-items-center rounded-full bg-secondary text-primary group-open:rotate-45 transition-transform`,
                            children: `+`,
                          }),
                        ],
                      }),
                      (0, C.jsx)(`p`, {
                        className: `mt-4 text-sm text-muted-foreground leading-relaxed`,
                        children: e.a,
                      }),
                    ],
                  },
                  e.q,
                ),
              ),
            }),
          ],
        }),
      }),
      (0, C.jsxs)(`section`, {
        className: `relative py-24 sm:py-32 overflow-hidden`,
        children: [
          (0, C.jsx)(`img`, {
            src: f,
            alt: ``,
            "aria-hidden": !0,
            className: `absolute inset-0 h-full w-full object-cover`,
          }),
          (0, C.jsx)(`div`, {
            className: `absolute inset-0 bg-gradient-to-r from-ridge/95 via-ridge/85 to-ridge/70`,
          }),
          (0, C.jsxs)(`div`, {
            className: `relative mx-auto max-w-4xl px-6 text-center text-white`,
            children: [
              (0, C.jsx)(u, { className: `mx-auto h-10 w-10 text-ember` }),
              (0, C.jsxs)(`h2`, {
                className: `mt-5 font-display text-4xl sm:text-6xl font-bold leading-tight`,
                children: [
                  `Your next adventure begins`,
                  (0, C.jsx)(`br`, {}),
                  `in the hills.`,
                ],
              }),
              (0, C.jsx)(`p`, {
                className: `mx-auto mt-5 max-w-xl text-white/80`,
                children: `Book a seat with us and discover why thousands of travelers call Explore Hills their go-to Himalayan crew.`,
              }),
              (0, C.jsxs)(p, {
                to: `/book`,
                className: `mt-10 inline-flex items-center gap-2 rounded-full bg-[var(--gradient-ember)] px-7 py-3.5 text-sm font-semibold text-ember-foreground shadow-glow hover:scale-[1.02] transition-transform`,
                children: [
                  `Book Your Adventure `,
                  (0, C.jsx)(r, { className: `h-4 w-4` }),
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  });
}
export { A as component };
