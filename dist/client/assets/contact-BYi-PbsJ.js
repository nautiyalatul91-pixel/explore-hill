import { r as e, t } from "./jsx-runtime-DGeXAQPT.js";
import { r as n } from "./createLucideIcon-Ctx0NuqD.js";
import {
  _ as r,
  a as i,
  c as a,
  f as o,
  g as s,
  h as c,
  o as l,
  p as u,
} from "./index-ByEr9w9j.js";
import { t as d } from "./PageHero-BLDKAlfd.js";
import { t as f } from "./founder-DV9CEUHf.js";
var p = e(n()),
  m = t(),
  h = i({
    name: l().trim().min(2, `Enter your name`).max(100),
    email: l().trim().email(`Enter a valid email`).max(255),
    message: l().trim().min(5, `Tell us a little more`).max(1e3),
  });
function g() {
  let [e, t] = (0, p.useState)(!1);
  function n(e) {
    e.preventDefault();
    let n = new FormData(e.currentTarget),
      r = h.safeParse({
        name: n.get(`name`),
        email: n.get(`email`),
        message: n.get(`message`),
      });
    if (!r.success) {
      o.error(r.error.issues[0]?.message ?? `Please check the form`);
      return;
    }
    t(!0);
    let i = `Hi Explore Hills! I'm ${r.data.name} (${r.data.email}). ${r.data.message}`,
      a = `https://wa.me/916397710701?text=${encodeURIComponent(i)}`;
    (window.open(a, `_blank`, `noopener,noreferrer`),
      o.success(`Opening WhatsApp — we'll reply within hours.`),
      e.target.reset(),
      t(!1));
  }
  return (0, m.jsxs)(m.Fragment, {
    children: [
      (0, m.jsx)(d, {
        eyebrow: `Get in touch`,
        title: (0, m.jsxs)(m.Fragment, {
          children: [
            `Let's plan your`,
            ` `,
            (0, m.jsx)(`span`, {
              className: `text-gradient`,
              children: `Himalayan story`,
            }),
          ],
        }),
        subtitle: `Call, message or write — we usually reply within a few hours. Atul personally answers every WhatsApp.`,
        image: a,
      }),
      (0, m.jsx)(`section`, {
        className: `py-20 sm:py-28 bg-background`,
        children: (0, m.jsxs)(`div`, {
          className: `mx-auto max-w-7xl px-4 sm:px-6 grid lg:grid-cols-2 gap-12`,
          children: [
            (0, m.jsxs)(`div`, {
              className: `space-y-4`,
              children: [
                (0, m.jsxs)(`a`, {
                  href: `https://wa.me/916397710701`,
                  target: `_blank`,
                  rel: `noreferrer`,
                  className: `flex items-center gap-4 rounded-2xl bg-[oklch(0.62_0.16_150)] text-white p-5 shadow-glow hover:opacity-95 transition`,
                  children: [
                    (0, m.jsx)(`span`, {
                      className: `grid h-12 w-12 place-items-center rounded-xl bg-white/15`,
                      children: (0, m.jsx)(c, { className: `h-5 w-5` }),
                    }),
                    (0, m.jsxs)(`div`, {
                      className: `flex-1`,
                      children: [
                        (0, m.jsx)(`div`, {
                          className: `font-semibold`,
                          children: `Chat on WhatsApp`,
                        }),
                        (0, m.jsx)(`div`, {
                          className: `text-xs text-white/80`,
                          children: `+91 63977 10701 · Instant reply`,
                        }),
                      ],
                    }),
                    (0, m.jsx)(`span`, {
                      className: `text-sm font-semibold`,
                      children: `Open →`,
                    }),
                  ],
                }),
                (0, m.jsxs)(`a`, {
                  href: `tel:+916397710701`,
                  className: `flex items-center gap-4 rounded-2xl bg-card border border-border p-5 shadow-card hover-lift`,
                  children: [
                    (0, m.jsx)(`span`, {
                      className: `grid h-12 w-12 place-items-center rounded-xl bg-primary text-primary-foreground`,
                      children: (0, m.jsx)(u, { className: `h-5 w-5` }),
                    }),
                    (0, m.jsxs)(`div`, {
                      className: `flex-1`,
                      children: [
                        (0, m.jsx)(`div`, {
                          className: `font-semibold text-foreground`,
                          children: `Call Now`,
                        }),
                        (0, m.jsx)(`div`, {
                          className: `text-xs text-muted-foreground`,
                          children: `+91 63977 10701 · Mon–Sun 9 AM – 9 PM`,
                        }),
                      ],
                    }),
                    (0, m.jsx)(`span`, {
                      className: `text-sm font-semibold text-primary`,
                      children: `Dial →`,
                    }),
                  ],
                }),
                (0, m.jsxs)(`a`, {
                  href: `https://instagram.com/atul__nautiyal`,
                  target: `_blank`,
                  rel: `noreferrer`,
                  className: `flex items-center gap-4 rounded-2xl bg-card border border-border p-5 shadow-card hover-lift`,
                  children: [
                    (0, m.jsx)(`span`, {
                      className: `grid h-12 w-12 place-items-center rounded-xl bg-[var(--gradient-ember)] text-ember-foreground`,
                      children: (0, m.jsx)(r, { className: `h-5 w-5` }),
                    }),
                    (0, m.jsxs)(`div`, {
                      className: `flex-1`,
                      children: [
                        (0, m.jsx)(`div`, {
                          className: `font-semibold text-foreground`,
                          children: `Follow on Instagram`,
                        }),
                        (0, m.jsx)(`div`, {
                          className: `text-xs text-muted-foreground`,
                          children: `@atul__nautiyal · Stories from the trail`,
                        }),
                      ],
                    }),
                    (0, m.jsx)(`span`, {
                      className: `text-sm font-semibold text-primary`,
                      children: `Follow →`,
                    }),
                  ],
                }),
                (0, m.jsxs)(`a`, {
                  href: `mailto:contact@explorehills.in`,
                  className: `flex items-center gap-4 rounded-2xl bg-card border border-border p-5 shadow-card hover-lift`,
                  children: [
                    (0, m.jsx)(`span`, {
                      className: `grid h-12 w-12 place-items-center rounded-xl bg-forest text-forest-foreground`,
                      children: (0, m.jsx)(s, { className: `h-5 w-5` }),
                    }),
                    (0, m.jsxs)(`div`, {
                      className: `flex-1`,
                      children: [
                        (0, m.jsx)(`div`, {
                          className: `font-semibold text-foreground`,
                          children: `Email Us`,
                        }),
                        (0, m.jsx)(`div`, {
                          className: `text-xs text-muted-foreground`,
                          children: `contact@explorehills.in`,
                        }),
                      ],
                    }),
                    (0, m.jsx)(`span`, {
                      className: `text-sm font-semibold text-primary`,
                      children: `Write →`,
                    }),
                  ],
                }),
                (0, m.jsxs)(`div`, {
                  className: `mt-8 rounded-3xl overflow-hidden bg-ridge text-white relative`,
                  children: [
                    (0, m.jsx)(`div`, {
                      className: `absolute inset-0 bg-aurora opacity-60`,
                      "aria-hidden": !0,
                    }),
                    (0, m.jsxs)(`div`, {
                      className: `relative p-6 flex items-center gap-5`,
                      children: [
                        (0, m.jsx)(`img`, {
                          src: f,
                          alt: `Atul Nautiyal`,
                          loading: `lazy`,
                          className: `h-20 w-20 rounded-2xl object-cover`,
                        }),
                        (0, m.jsxs)(`div`, {
                          children: [
                            (0, m.jsx)(`p`, {
                              className: `text-xs uppercase tracking-widest text-white/70`,
                              children: `Founder`,
                            }),
                            (0, m.jsx)(`h3`, {
                              className: `font-display text-xl font-bold`,
                              children: `Atul Nautiyal`,
                            }),
                            (0, m.jsx)(`p`, {
                              className: `text-sm text-white/80`,
                              children: `Replies to every traveler personally.`,
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
            (0, m.jsxs)(`form`, {
              onSubmit: n,
              className: `rounded-3xl bg-card border border-border p-7 shadow-card space-y-5`,
              children: [
                (0, m.jsxs)(`div`, {
                  children: [
                    (0, m.jsx)(`h2`, {
                      className: `font-display text-3xl font-bold text-foreground`,
                      children: `Send us a note`,
                    }),
                    (0, m.jsx)(`p`, {
                      className: `mt-1 text-sm text-muted-foreground`,
                      children: `We'll continue the chat on WhatsApp for the fastest reply.`,
                    }),
                  ],
                }),
                (0, m.jsx)(_, {
                  label: `Your name`,
                  name: `name`,
                  placeholder: `Atul Nautiyal`,
                }),
                (0, m.jsx)(_, {
                  label: `Email`,
                  name: `email`,
                  type: `email`,
                  placeholder: `you@example.com`,
                }),
                (0, m.jsxs)(`div`, {
                  children: [
                    (0, m.jsx)(`label`, {
                      className: `text-xs font-semibold uppercase tracking-wider text-muted-foreground`,
                      children: `Message`,
                    }),
                    (0, m.jsx)(`textarea`, {
                      name: `message`,
                      rows: 5,
                      placeholder: `Tell us what kind of trip you're dreaming of…`,
                      className: `mt-2 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring`,
                    }),
                  ],
                }),
                (0, m.jsxs)(`button`, {
                  type: `submit`,
                  disabled: e,
                  className: `w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--gradient-ember)] px-6 py-3.5 text-sm font-semibold text-ember-foreground shadow-glow disabled:opacity-60`,
                  children: [
                    (0, m.jsx)(c, { className: `h-4 w-4` }),
                    ` Send via WhatsApp`,
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
function _({ label: e, name: t, type: n = `text`, placeholder: r }) {
  return (0, m.jsxs)(`div`, {
    children: [
      (0, m.jsx)(`label`, {
        className: `text-xs font-semibold uppercase tracking-wider text-muted-foreground`,
        children: e,
      }),
      (0, m.jsx)(`input`, {
        name: t,
        type: n,
        placeholder: r,
        className: `mt-2 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring`,
      }),
    ],
  });
}
export { g as component };
