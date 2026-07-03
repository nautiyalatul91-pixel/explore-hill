import { t as trip_hanol_default } from "./trip-hanol-CLJKyHJu.js";
import { t as PageHero } from "./PageHero-B2khC5ZF.js";
import { t as founder_default } from "./founder-D3HUJiNh.js";
import { useState } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { Instagram, Mail, MessageCircle, Phone } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
//#region src/routes/contact.tsx?tsr-split=component
var schema = z.object({
  name: z.string().trim().min(2, "Enter your name").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  message: z.string().trim().min(5, "Tell us a little more").max(1e3),
});
function ContactPage() {
  const [submitting, setSubmitting] = useState(false);
  function onSubmit(e) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const parsed = schema.safeParse({
      name: fd.get("name"),
      email: fd.get("email"),
      message: fd.get("message"),
    });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please check the form");
      return;
    }
    setSubmitting(true);
    const text = `Hi Explore Hills! I'm ${parsed.data.name} (${parsed.data.email}). ${parsed.data.message}`;
    const url = `https://wa.me/916397710701?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    toast.success("Opening WhatsApp — we'll reply within hours.");
    e.target.reset();
    setSubmitting(false);
  }
  return /* @__PURE__ */ jsxs(Fragment, {
    children: [
      /* @__PURE__ */ jsx(PageHero, {
        eyebrow: "Get in touch",
        title: /* @__PURE__ */ jsxs(Fragment, {
          children: [
            "Let's plan your",
            " ",
            /* @__PURE__ */ jsx("span", {
              className: "text-gradient",
              children: "Himalayan story",
            }),
          ],
        }),
        subtitle:
          "Call, message or write — we usually reply within a few hours. Atul personally answers every WhatsApp.",
        image: trip_hanol_default,
      }),
      /* @__PURE__ */ jsx("section", {
        className: "py-20 sm:py-28 bg-background",
        children: /* @__PURE__ */ jsxs("div", {
          className:
            "mx-auto max-w-7xl px-4 sm:px-6 grid lg:grid-cols-2 gap-12",
          children: [
            /* @__PURE__ */ jsxs("div", {
              className: "space-y-4",
              children: [
                /* @__PURE__ */ jsxs("a", {
                  href: "https://wa.me/916397710701",
                  target: "_blank",
                  rel: "noreferrer",
                  className:
                    "flex items-center gap-4 rounded-2xl bg-[oklch(0.62_0.16_150)] text-white p-5 shadow-glow hover:opacity-95 transition",
                  children: [
                    /* @__PURE__ */ jsx("span", {
                      className:
                        "grid h-12 w-12 place-items-center rounded-xl bg-white/15",
                      children: /* @__PURE__ */ jsx(MessageCircle, {
                        className: "h-5 w-5",
                      }),
                    }),
                    /* @__PURE__ */ jsxs("div", {
                      className: "flex-1",
                      children: [
                        /* @__PURE__ */ jsx("div", {
                          className: "font-semibold",
                          children: "Chat on WhatsApp",
                        }),
                        /* @__PURE__ */ jsx("div", {
                          className: "text-xs text-white/80",
                          children: "+91 63977 10701 · Instant reply",
                        }),
                      ],
                    }),
                    /* @__PURE__ */ jsx("span", {
                      className: "text-sm font-semibold",
                      children: "Open →",
                    }),
                  ],
                }),
                /* @__PURE__ */ jsxs("a", {
                  href: "tel:+916397710701",
                  className:
                    "flex items-center gap-4 rounded-2xl bg-card border border-border p-5 shadow-card hover-lift",
                  children: [
                    /* @__PURE__ */ jsx("span", {
                      className:
                        "grid h-12 w-12 place-items-center rounded-xl bg-primary text-primary-foreground",
                      children: /* @__PURE__ */ jsx(Phone, {
                        className: "h-5 w-5",
                      }),
                    }),
                    /* @__PURE__ */ jsxs("div", {
                      className: "flex-1",
                      children: [
                        /* @__PURE__ */ jsx("div", {
                          className: "font-semibold text-foreground",
                          children: "Call Now",
                        }),
                        /* @__PURE__ */ jsx("div", {
                          className: "text-xs text-muted-foreground",
                          children: "+91 63977 10701 · Mon–Sun 9 AM – 9 PM",
                        }),
                      ],
                    }),
                    /* @__PURE__ */ jsx("span", {
                      className: "text-sm font-semibold text-primary",
                      children: "Dial →",
                    }),
                  ],
                }),
                /* @__PURE__ */ jsxs("a", {
                  href: "https://instagram.com/atul__nautiyal",
                  target: "_blank",
                  rel: "noreferrer",
                  className:
                    "flex items-center gap-4 rounded-2xl bg-card border border-border p-5 shadow-card hover-lift",
                  children: [
                    /* @__PURE__ */ jsx("span", {
                      className:
                        "grid h-12 w-12 place-items-center rounded-xl bg-[var(--gradient-ember)] text-ember-foreground",
                      children: /* @__PURE__ */ jsx(Instagram, {
                        className: "h-5 w-5",
                      }),
                    }),
                    /* @__PURE__ */ jsxs("div", {
                      className: "flex-1",
                      children: [
                        /* @__PURE__ */ jsx("div", {
                          className: "font-semibold text-foreground",
                          children: "Follow on Instagram",
                        }),
                        /* @__PURE__ */ jsx("div", {
                          className: "text-xs text-muted-foreground",
                          children: "@atul__nautiyal · Stories from the trail",
                        }),
                      ],
                    }),
                    /* @__PURE__ */ jsx("span", {
                      className: "text-sm font-semibold text-primary",
                      children: "Follow →",
                    }),
                  ],
                }),
                /* @__PURE__ */ jsxs("a", {
                  href: "mailto:contact@explorehills.in",
                  className:
                    "flex items-center gap-4 rounded-2xl bg-card border border-border p-5 shadow-card hover-lift",
                  children: [
                    /* @__PURE__ */ jsx("span", {
                      className:
                        "grid h-12 w-12 place-items-center rounded-xl bg-forest text-forest-foreground",
                      children: /* @__PURE__ */ jsx(Mail, {
                        className: "h-5 w-5",
                      }),
                    }),
                    /* @__PURE__ */ jsxs("div", {
                      className: "flex-1",
                      children: [
                        /* @__PURE__ */ jsx("div", {
                          className: "font-semibold text-foreground",
                          children: "Email Us",
                        }),
                        /* @__PURE__ */ jsx("div", {
                          className: "text-xs text-muted-foreground",
                          children: "contact@explorehills.in",
                        }),
                      ],
                    }),
                    /* @__PURE__ */ jsx("span", {
                      className: "text-sm font-semibold text-primary",
                      children: "Write →",
                    }),
                  ],
                }),
                /* @__PURE__ */ jsxs("div", {
                  className:
                    "mt-8 rounded-3xl overflow-hidden bg-ridge text-white relative",
                  children: [
                    /* @__PURE__ */ jsx("div", {
                      className: "absolute inset-0 bg-aurora opacity-60",
                      "aria-hidden": true,
                    }),
                    /* @__PURE__ */ jsxs("div", {
                      className: "relative p-6 flex items-center gap-5",
                      children: [
                        /* @__PURE__ */ jsx("img", {
                          src: founder_default,
                          alt: "Atul Nautiyal",
                          loading: "lazy",
                          className: "h-20 w-20 rounded-2xl object-cover",
                        }),
                        /* @__PURE__ */ jsxs("div", {
                          children: [
                            /* @__PURE__ */ jsx("p", {
                              className:
                                "text-xs uppercase tracking-widest text-white/70",
                              children: "Founder",
                            }),
                            /* @__PURE__ */ jsx("h3", {
                              className: "font-display text-xl font-bold",
                              children: "Atul Nautiyal",
                            }),
                            /* @__PURE__ */ jsx("p", {
                              className: "text-sm text-white/80",
                              children: "Replies to every traveler personally.",
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
            /* @__PURE__ */ jsxs("form", {
              onSubmit,
              className:
                "rounded-3xl bg-card border border-border p-7 shadow-card space-y-5",
              children: [
                /* @__PURE__ */ jsxs("div", {
                  children: [
                    /* @__PURE__ */ jsx("h2", {
                      className:
                        "font-display text-3xl font-bold text-foreground",
                      children: "Send us a note",
                    }),
                    /* @__PURE__ */ jsx("p", {
                      className: "mt-1 text-sm text-muted-foreground",
                      children:
                        "We'll continue the chat on WhatsApp for the fastest reply.",
                    }),
                  ],
                }),
                /* @__PURE__ */ jsx(Field, {
                  label: "Your name",
                  name: "name",
                  placeholder: "Atul Nautiyal",
                }),
                /* @__PURE__ */ jsx(Field, {
                  label: "Email",
                  name: "email",
                  type: "email",
                  placeholder: "you@example.com",
                }),
                /* @__PURE__ */ jsxs("div", {
                  children: [
                    /* @__PURE__ */ jsx("label", {
                      className:
                        "text-xs font-semibold uppercase tracking-wider text-muted-foreground",
                      children: "Message",
                    }),
                    /* @__PURE__ */ jsx("textarea", {
                      name: "message",
                      rows: 5,
                      placeholder:
                        "Tell us what kind of trip you're dreaming of…",
                      className:
                        "mt-2 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring",
                    }),
                  ],
                }),
                /* @__PURE__ */ jsxs("button", {
                  type: "submit",
                  disabled: submitting,
                  className:
                    "w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--gradient-ember)] px-6 py-3.5 text-sm font-semibold text-ember-foreground shadow-glow disabled:opacity-60",
                  children: [
                    /* @__PURE__ */ jsx(MessageCircle, {
                      className: "h-4 w-4",
                    }),
                    " Send via WhatsApp",
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
function Field({ label, name, type = "text", placeholder }) {
  return /* @__PURE__ */ jsxs("div", {
    children: [
      /* @__PURE__ */ jsx("label", {
        className:
          "text-xs font-semibold uppercase tracking-wider text-muted-foreground",
        children: label,
      }),
      /* @__PURE__ */ jsx("input", {
        name,
        type,
        placeholder,
        className:
          "mt-2 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring",
      }),
    ],
  });
}
//#endregion
export { ContactPage as component };
