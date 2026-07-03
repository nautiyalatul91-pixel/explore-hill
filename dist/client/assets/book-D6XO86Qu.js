import { r as e, t } from "./jsx-runtime-DGeXAQPT.js";
import { r as n, t as r } from "./createLucideIcon-Ctx0NuqD.js";
import { n as i, t as a } from "./client-ByUYNggG.js";
import { t as o } from "./shield-check-2oMmHvvh.js";
import {
  a as s,
  b as c,
  f as l,
  i as u,
  n as d,
  o as f,
  r as p,
  s as m,
} from "./index-ByEr9w9j.js";
import { t as h } from "./PageHero-BLDKAlfd.js";
import { n as g, t as _ } from "./packages-HKOB1p0y.js";
var v = r(`check`, [[`path`, { d: `M20 6 9 17l-5-5`, key: `1gmf2c` }]]),
  y = e(n()),
  b = t(),
  x = s({
    full_name: f().trim().min(2, `Full name is required`).max(100),
    phone: f()
      .trim()
      .regex(/^[+\d\s-]{7,20}$/, `Enter a valid phone number`),
    email: f().trim().email(`Enter a valid email`).max(255),
    package_slug: f().min(1, `Choose a package`),
    travel_date: f().min(1, `Pick a date`),
    travelers: p.number().int().min(1).max(50),
    special_requirements: f().trim().max(1e3).optional().or(u(``)),
  });
function S() {
  let e = d.useSearch(),
    t = c(),
    [n, r] = (0, y.useState)(!1),
    [s, u] = (0, y.useState)(null),
    f = new Date().toISOString().split(`T`)[0];
  async function p(e) {
    e.preventDefault();
    let t = new FormData(e.currentTarget),
      n = Object.fromEntries(t.entries()),
      i = x.safeParse(n);
    if (!i.success) {
      l.error(i.error.issues[0]?.message ?? `Please check your details`);
      return;
    }
    let o = _.find((e) => e.slug === i.data.package_slug);
    if (!o) {
      l.error(`Please pick a valid package`);
      return;
    }
    let s =
      typeof crypto < `u` && typeof crypto.randomUUID == `function`
        ? crypto.randomUUID()
        : void 0;
    r(!0);
    try {
      let e = {
        full_name: i.data.full_name,
        phone: i.data.phone,
        email: i.data.email,
        package_slug: o.slug,
        package_name: o.name,
        travel_date: i.data.travel_date,
        travelers: i.data.travelers,
        special_requirements: i.data.special_requirements || null,
      };
      s && (e.id = s);
      let { error: t } = await a.from(`bookings`).insert(e);
      if (t) {
        (console.error(t), l.error(`Could not submit booking: ` + t.message));
        return;
      }
      (l.success(`Booking received! We'll confirm on WhatsApp shortly.`),
        u({ id: s || `Pending`, name: o.name }));
    } catch (e) {
      (console.error(e),
        l.error(
          e instanceof Error
            ? e.message
            : `An unexpected error occurred. Please try WhatsApp.`,
        ));
    } finally {
      r(!1);
    }
  }
  return s
    ? (0, b.jsx)(`section`, {
        className: `min-h-[100svh] flex items-center justify-center bg-aurora text-white px-4 pt-28 pb-20`,
        children: (0, b.jsxs)(`div`, {
          className: `max-w-xl w-full rounded-3xl glass-dark p-10 text-center shadow-elegant`,
          children: [
            (0, b.jsx)(`div`, {
              className: `mx-auto grid h-16 w-16 place-items-center rounded-full bg-[var(--gradient-ember)] text-ember-foreground shadow-glow`,
              children: (0, b.jsx)(v, { className: `h-8 w-8` }),
            }),
            (0, b.jsx)(`h1`, {
              className: `mt-6 font-display text-4xl font-bold`,
              children: `You're in!`,
            }),
            (0, b.jsxs)(`p`, {
              className: `mt-3 text-white/80`,
              children: [
                `Your seat on`,
                ` `,
                (0, b.jsx)(`span`, {
                  className: `font-semibold text-white`,
                  children: s.name,
                }),
                ` is reserved. Our team will reach out on WhatsApp within a few hours to confirm details and payment.`,
              ],
            }),
            (0, b.jsxs)(`p`, {
              className: `mt-2 text-xs text-white/50`,
              children: [`Booking ID: `, s.id.slice(0, 8)],
            }),
            (0, b.jsxs)(`div`, {
              className: `mt-8 flex flex-col sm:flex-row gap-3 justify-center`,
              children: [
                (0, b.jsx)(`a`, {
                  href: `https://wa.me/916397710701`,
                  target: `_blank`,
                  rel: `noreferrer`,
                  className: `inline-flex items-center justify-center rounded-full bg-white text-ridge px-6 py-3 text-sm font-semibold`,
                  children: `Chat on WhatsApp`,
                }),
                (0, b.jsx)(`button`, {
                  onClick: () => t({ to: `/` }),
                  className: `inline-flex items-center justify-center rounded-full bg-white/10 border border-white/20 px-6 py-3 text-sm font-semibold`,
                  children: `Back home`,
                }),
              ],
            }),
          ],
        }),
      })
    : (0, b.jsxs)(b.Fragment, {
        children: [
          (0, b.jsx)(h, {
            eyebrow: `Book Your Adventure`,
            title: (0, b.jsxs)(b.Fragment, {
              children: [
                `Reserve your `,
                (0, b.jsx)(`span`, {
                  className: `text-gradient`,
                  children: `Himalayan`,
                }),
                ` spot`,
              ],
            }),
            subtitle: `Fill in your details below. Our team will confirm on WhatsApp within hours and walk you through payment.`,
            image: m,
          }),
          (0, b.jsx)(`section`, {
            className: `py-20 sm:py-28 bg-background`,
            children: (0, b.jsxs)(`div`, {
              className: `mx-auto max-w-7xl px-4 sm:px-6 grid lg:grid-cols-[1.5fr_1fr] gap-8`,
              children: [
                (0, b.jsxs)(`form`, {
                  onSubmit: p,
                  className: `rounded-3xl bg-card border border-border p-7 sm:p-10 shadow-card space-y-5`,
                  children: [
                    (0, b.jsxs)(`div`, {
                      className: `grid sm:grid-cols-2 gap-5`,
                      children: [
                        (0, b.jsx)(C, {
                          label: `Full Name`,
                          name: `full_name`,
                          placeholder: `Atul Nautiyal`,
                          required: !0,
                        }),
                        (0, b.jsx)(C, {
                          label: `Phone Number`,
                          name: `phone`,
                          placeholder: `+91 98XXXXXXXX`,
                          type: `tel`,
                          required: !0,
                        }),
                      ],
                    }),
                    (0, b.jsx)(C, {
                      label: `Email Address`,
                      name: `email`,
                      type: `email`,
                      placeholder: `you@example.com`,
                      required: !0,
                    }),
                    (0, b.jsxs)(`div`, {
                      children: [
                        (0, b.jsx)(`label`, {
                          className: `text-xs font-semibold uppercase tracking-wider text-muted-foreground`,
                          children: `Trek / Trip`,
                        }),
                        (0, b.jsxs)(`select`, {
                          name: `package_slug`,
                          defaultValue: e.pkg ?? ``,
                          required: !0,
                          className: `mt-2 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring`,
                          children: [
                            (0, b.jsx)(`option`, {
                              value: ``,
                              disabled: !0,
                              children: `Choose your adventure…`,
                            }),
                            (0, b.jsx)(`optgroup`, {
                              label: `Treks`,
                              children: _.filter(
                                (e) => e.category === `trek`,
                              ).map((e) =>
                                (0, b.jsxs)(
                                  `option`,
                                  {
                                    value: e.slug,
                                    children: [e.name, ` · `, e.priceLabel],
                                  },
                                  e.slug,
                                ),
                              ),
                            }),
                            (0, b.jsx)(`optgroup`, {
                              label: `Trips`,
                              children: _.filter(
                                (e) => e.category === `trip`,
                              ).map((e) =>
                                (0, b.jsxs)(
                                  `option`,
                                  {
                                    value: e.slug,
                                    children: [e.name, ` · `, e.priceLabel],
                                  },
                                  e.slug,
                                ),
                              ),
                            }),
                          ],
                        }),
                      ],
                    }),
                    (0, b.jsxs)(`div`, {
                      className: `grid sm:grid-cols-2 gap-5`,
                      children: [
                        (0, b.jsx)(C, {
                          label: `Travel Date`,
                          name: `travel_date`,
                          type: `date`,
                          min: f,
                          required: !0,
                        }),
                        (0, b.jsx)(C, {
                          label: `Number of Travelers`,
                          name: `travelers`,
                          type: `number`,
                          min: 1,
                          max: 15,
                          defaultValue: `2`,
                          required: !0,
                        }),
                      ],
                    }),
                    (0, b.jsxs)(`div`, {
                      children: [
                        (0, b.jsx)(`label`, {
                          className: `text-xs font-semibold uppercase tracking-wider text-muted-foreground`,
                          children: `Special Requirements`,
                        }),
                        (0, b.jsx)(`textarea`, {
                          name: `special_requirements`,
                          rows: 4,
                          placeholder: `Dietary needs, fitness concerns, special occasions…`,
                          className: `mt-2 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring`,
                        }),
                      ],
                    }),
                    (0, b.jsx)(`button`, {
                      type: `submit`,
                      disabled: n,
                      className: `w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--gradient-ember)] px-6 py-4 text-sm font-semibold text-ember-foreground shadow-glow disabled:opacity-60`,
                      children: n
                        ? (0, b.jsxs)(b.Fragment, {
                            children: [
                              (0, b.jsx)(i, {
                                className: `h-4 w-4 animate-spin`,
                              }),
                              ` Booking…`,
                            ],
                          })
                        : `Confirm Booking`,
                    }),
                    (0, b.jsxs)(`p`, {
                      className: `text-xs text-muted-foreground text-center flex items-center justify-center gap-1.5`,
                      children: [
                        (0, b.jsx)(o, { className: `h-3.5 w-3.5` }),
                        ` Your details are safe with us. No payment required to reserve.`,
                      ],
                    }),
                  ],
                }),
                (0, b.jsxs)(`aside`, {
                  className: `space-y-5`,
                  children: [
                    (0, b.jsxs)(`div`, {
                      className: `rounded-3xl bg-ridge text-white p-7 relative overflow-hidden`,
                      children: [
                        (0, b.jsx)(`div`, {
                          className: `absolute inset-0 bg-aurora opacity-60`,
                          "aria-hidden": !0,
                        }),
                        (0, b.jsxs)(`div`, {
                          className: `relative`,
                          children: [
                            (0, b.jsx)(`p`, {
                              className: `text-xs font-semibold uppercase tracking-[0.2em] text-ember`,
                              children: `What's included`,
                            }),
                            (0, b.jsx)(`h3`, {
                              className: `mt-3 font-display text-2xl font-bold`,
                              children: `Every trip comes with`,
                            }),
                            (0, b.jsx)(`ul`, {
                              className: `mt-5 space-y-3`,
                              children: g.map((e) =>
                                (0, b.jsxs)(
                                  `li`,
                                  {
                                    className: `flex items-start gap-3 text-sm text-white/85`,
                                    children: [
                                      (0, b.jsx)(`span`, {
                                        className: `grid h-6 w-6 place-items-center rounded-full bg-[var(--gradient-ember)] text-ember-foreground shrink-0`,
                                        children: (0, b.jsx)(v, {
                                          className: `h-3.5 w-3.5`,
                                        }),
                                      }),
                                      e,
                                    ],
                                  },
                                  e,
                                ),
                              ),
                            }),
                          ],
                        }),
                      ],
                    }),
                    (0, b.jsxs)(`div`, {
                      className: `rounded-3xl bg-card border border-border p-7 shadow-card`,
                      children: [
                        (0, b.jsx)(`p`, {
                          className: `text-xs font-semibold uppercase tracking-[0.2em] text-ember`,
                          children: `Group size`,
                        }),
                        (0, b.jsx)(`h3`, {
                          className: `mt-3 font-display text-2xl font-bold text-foreground`,
                          children: `14–15 travelers per batch`,
                        }),
                        (0, b.jsx)(`p`, {
                          className: `mt-3 text-sm text-muted-foreground`,
                          children: `Just enough to make friends, small enough to keep the trail peaceful.`,
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
          }),
        ],
      });
}
function C({ label: e, ...t }) {
  return (0, b.jsxs)(`div`, {
    children: [
      (0, b.jsx)(`label`, {
        className: `text-xs font-semibold uppercase tracking-wider text-muted-foreground`,
        children: e,
      }),
      (0, b.jsx)(`input`, {
        ...t,
        className: `mt-2 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring`,
      }),
    ],
  });
}
export { S as component };
