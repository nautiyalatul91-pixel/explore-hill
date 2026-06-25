import { r as __toESM } from "../_runtime.mjs";
import { n as require_react, r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { t as PageHero } from "./PageHero-B2khC5ZF.mjs";
import { v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { g as LoaderCircle, o as ShieldCheck, w as Check } from "../_libs/lucide-react.mjs";
import { t as supabase } from "./client-B99rZN6a.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as gallery_camping_default } from "./gallery-camping-sBiRzPvm.mjs";
import { i as stringType, n as literalType, r as objectType, t as coerce } from "../_libs/zod.mjs";
import { t as Route } from "./book-DDZWMRGo.mjs";
import { n as inclusions, t as allPackages } from "./packages-CLS7Ed0o.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/book-BeGyWL-m.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var formSchema = objectType({
	full_name: stringType().trim().min(2, "Full name is required").max(100),
	phone: stringType().trim().regex(/^[+\d\s-]{7,20}$/, "Enter a valid phone number"),
	email: stringType().trim().email("Enter a valid email").max(255),
	package_slug: stringType().min(1, "Choose a package"),
	travel_date: stringType().min(1, "Pick a date"),
	travelers: coerce.number().int().min(1).max(50),
	special_requirements: stringType().trim().max(1e3).optional().or(literalType(""))
});
function BookPage() {
	const search = Route.useSearch();
	const navigate = useNavigate();
	const [submitting, setSubmitting] = (0, import_react.useState)(false);
	const [done, setDone] = (0, import_react.useState)(null);
	const today = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
	async function onSubmit(e) {
		e.preventDefault();
		const fd = new FormData(e.currentTarget);
		const raw = Object.fromEntries(fd.entries());
		const parsed = formSchema.safeParse(raw);
		if (!parsed.success) {
			toast.error(parsed.error.issues[0]?.message ?? "Please check your details");
			return;
		}
		const pkg = allPackages.find((p) => p.slug === parsed.data.package_slug);
		if (!pkg) {
			toast.error("Please pick a valid package");
			return;
		}
		const bookingId = typeof crypto !== "undefined" && typeof crypto.randomUUID === "function" ? crypto.randomUUID() : void 0;
		setSubmitting(true);
		try {
			const payload = {
				full_name: parsed.data.full_name,
				phone: parsed.data.phone,
				email: parsed.data.email,
				package_slug: pkg.slug,
				package_name: pkg.name,
				travel_date: parsed.data.travel_date,
				travelers: parsed.data.travelers,
				special_requirements: parsed.data.special_requirements || null
			};
			if (bookingId) payload.id = bookingId;
			const { error } = await supabase.from("bookings").insert(payload);
			if (error) {
				console.error(error);
				toast.error("Could not submit booking: " + error.message);
				return;
			}
			toast.success("Booking received! We'll confirm on WhatsApp shortly.");
			setDone({
				id: bookingId || "Pending",
				name: pkg.name
			});
		} catch (err) {
			console.error(err);
			toast.error(err instanceof Error ? err.message : "An unexpected error occurred. Please try WhatsApp.");
		} finally {
			setSubmitting(false);
		}
	}
	if (done) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "min-h-[100svh] flex items-center justify-center bg-aurora text-white px-4 pt-28 pb-20",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-xl w-full rounded-3xl glass-dark p-10 text-center shadow-elegant",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto grid h-16 w-16 place-items-center rounded-full bg-[var(--gradient-ember)] text-ember-foreground shadow-glow",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-8 w-8" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-6 font-display text-4xl font-bold",
					children: "You're in!"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-3 text-white/80",
					children: [
						"Your seat on",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-semibold text-white",
							children: done.name
						}),
						" is reserved. Our team will reach out on WhatsApp within a few hours to confirm details and payment."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 text-xs text-white/50",
					children: ["Booking ID: ", done.id.slice(0, 8)]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 flex flex-col sm:flex-row gap-3 justify-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "https://wa.me/916397710701",
						target: "_blank",
						rel: "noreferrer",
						className: "inline-flex items-center justify-center rounded-full bg-white text-ridge px-6 py-3 text-sm font-semibold",
						children: "Chat on WhatsApp"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => navigate({ to: "/" }),
						className: "inline-flex items-center justify-center rounded-full bg-white/10 border border-white/20 px-6 py-3 text-sm font-semibold",
						children: "Back home"
					})]
				})
			]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
		eyebrow: "Book Your Adventure",
		title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			"Reserve your ",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-gradient",
				children: "Himalayan"
			}),
			" spot"
		] }),
		subtitle: "Fill in your details below. Our team will confirm on WhatsApp within hours and walk you through payment.",
		image: gallery_camping_default
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "py-20 sm:py-28 bg-background",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-7xl px-4 sm:px-6 grid lg:grid-cols-[1.5fr_1fr] gap-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit,
				className: "rounded-3xl bg-card border border-border p-7 sm:p-10 shadow-card space-y-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid sm:grid-cols-2 gap-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Full Name",
							name: "full_name",
							placeholder: "Atul Nautiyal",
							required: true
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Phone Number",
							name: "phone",
							placeholder: "+91 98XXXXXXXX",
							type: "tel",
							required: true
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Email Address",
						name: "email",
						type: "email",
						placeholder: "you@example.com",
						required: true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground",
						children: "Trek / Trip"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						name: "package_slug",
						defaultValue: search.pkg ?? "",
						required: true,
						className: "mt-2 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "",
								disabled: true,
								children: "Choose your adventure…"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("optgroup", {
								label: "Treks",
								children: allPackages.filter((p) => p.category === "trek").map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
									value: p.slug,
									children: [
										p.name,
										" · ",
										p.priceLabel
									]
								}, p.slug))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("optgroup", {
								label: "Trips",
								children: allPackages.filter((p) => p.category === "trip").map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
									value: p.slug,
									children: [
										p.name,
										" · ",
										p.priceLabel
									]
								}, p.slug))
							})
						]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid sm:grid-cols-2 gap-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Travel Date",
							name: "travel_date",
							type: "date",
							min: today,
							required: true
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Number of Travelers",
							name: "travelers",
							type: "number",
							min: 1,
							max: 15,
							defaultValue: "2",
							required: true
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground",
						children: "Special Requirements"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						name: "special_requirements",
						rows: 4,
						placeholder: "Dietary needs, fitness concerns, special occasions…",
						className: "mt-2 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "submit",
						disabled: submitting,
						className: "w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--gradient-ember)] px-6 py-4 text-sm font-semibold text-ember-foreground shadow-glow disabled:opacity-60",
						children: submitting ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }), " Booking…"] }) : "Confirm Booking"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-muted-foreground text-center flex items-center justify-center gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-3.5 w-3.5" }), " Your details are safe with us. No payment required to reserve."]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "space-y-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-3xl bg-ridge text-white p-7 relative overflow-hidden",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute inset-0 bg-aurora opacity-60",
						"aria-hidden": true
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-semibold uppercase tracking-[0.2em] text-ember",
								children: "What's included"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-3 font-display text-2xl font-bold",
								children: "Every trip comes with"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "mt-5 space-y-3",
								children: inclusions.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex items-start gap-3 text-sm text-white/85",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "grid h-6 w-6 place-items-center rounded-full bg-[var(--gradient-ember)] text-ember-foreground shrink-0",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-3.5 w-3.5" })
									}), i]
								}, i))
							})
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-3xl bg-card border border-border p-7 shadow-card",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-semibold uppercase tracking-[0.2em] text-ember",
							children: "Group size"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-3 font-display text-2xl font-bold text-foreground",
							children: "14–15 travelers per batch"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm text-muted-foreground",
							children: "Just enough to make friends, small enough to keep the trail peaceful."
						})
					]
				})]
			})]
		})
	})] });
}
function Field({ label, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
		className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground",
		children: label
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		...props,
		className: "mt-2 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
	})] });
}
//#endregion
export { BookPage as component };
