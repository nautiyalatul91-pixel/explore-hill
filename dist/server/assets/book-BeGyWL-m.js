import { t as gallery_camping_default } from "./gallery-camping-sBiRzPvm.js";
import { t as Route } from "./book-DDZWMRGo.js";
import { t as PageHero } from "./PageHero-B2khC5ZF.js";
import { t as supabase } from "./client-B99rZN6a.js";
import { n as inclusions, t as allPackages } from "./packages-CLS7Ed0o.js";
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { Check, Loader2, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
//#region src/routes/book.tsx?tsr-split=component
var formSchema = z.object({
	full_name: z.string().trim().min(2, "Full name is required").max(100),
	phone: z.string().trim().regex(/^[+\d\s-]{7,20}$/, "Enter a valid phone number"),
	email: z.string().trim().email("Enter a valid email").max(255),
	package_slug: z.string().min(1, "Choose a package"),
	travel_date: z.string().min(1, "Pick a date"),
	travelers: z.coerce.number().int().min(1).max(50),
	special_requirements: z.string().trim().max(1e3).optional().or(z.literal(""))
});
function BookPage() {
	const search = Route.useSearch();
	const navigate = useNavigate();
	const [submitting, setSubmitting] = useState(false);
	const [done, setDone] = useState(null);
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
	if (done) return /* @__PURE__ */ jsx("section", {
		className: "min-h-[100svh] flex items-center justify-center bg-aurora text-white px-4 pt-28 pb-20",
		children: /* @__PURE__ */ jsxs("div", {
			className: "max-w-xl w-full rounded-3xl glass-dark p-10 text-center shadow-elegant",
			children: [
				/* @__PURE__ */ jsx("div", {
					className: "mx-auto grid h-16 w-16 place-items-center rounded-full bg-[var(--gradient-ember)] text-ember-foreground shadow-glow",
					children: /* @__PURE__ */ jsx(Check, { className: "h-8 w-8" })
				}),
				/* @__PURE__ */ jsx("h1", {
					className: "mt-6 font-display text-4xl font-bold",
					children: "You're in!"
				}),
				/* @__PURE__ */ jsxs("p", {
					className: "mt-3 text-white/80",
					children: [
						"Your seat on",
						" ",
						/* @__PURE__ */ jsx("span", {
							className: "font-semibold text-white",
							children: done.name
						}),
						" is reserved. Our team will reach out on WhatsApp within a few hours to confirm details and payment."
					]
				}),
				/* @__PURE__ */ jsxs("p", {
					className: "mt-2 text-xs text-white/50",
					children: ["Booking ID: ", done.id.slice(0, 8)]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "mt-8 flex flex-col sm:flex-row gap-3 justify-center",
					children: [/* @__PURE__ */ jsx("a", {
						href: "https://wa.me/916397710701",
						target: "_blank",
						rel: "noreferrer",
						className: "inline-flex items-center justify-center rounded-full bg-white text-ridge px-6 py-3 text-sm font-semibold",
						children: "Chat on WhatsApp"
					}), /* @__PURE__ */ jsx("button", {
						onClick: () => navigate({ to: "/" }),
						className: "inline-flex items-center justify-center rounded-full bg-white/10 border border-white/20 px-6 py-3 text-sm font-semibold",
						children: "Back home"
					})]
				})
			]
		})
	});
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(PageHero, {
		eyebrow: "Book Your Adventure",
		title: /* @__PURE__ */ jsxs(Fragment, { children: [
			"Reserve your ",
			/* @__PURE__ */ jsx("span", {
				className: "text-gradient",
				children: "Himalayan"
			}),
			" spot"
		] }),
		subtitle: "Fill in your details below. Our team will confirm on WhatsApp within hours and walk you through payment.",
		image: gallery_camping_default
	}), /* @__PURE__ */ jsx("section", {
		className: "py-20 sm:py-28 bg-background",
		children: /* @__PURE__ */ jsxs("div", {
			className: "mx-auto max-w-7xl px-4 sm:px-6 grid lg:grid-cols-[1.5fr_1fr] gap-8",
			children: [/* @__PURE__ */ jsxs("form", {
				onSubmit,
				className: "rounded-3xl bg-card border border-border p-7 sm:p-10 shadow-card space-y-5",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "grid sm:grid-cols-2 gap-5",
						children: [/* @__PURE__ */ jsx(Field, {
							label: "Full Name",
							name: "full_name",
							placeholder: "Atul Nautiyal",
							required: true
						}), /* @__PURE__ */ jsx(Field, {
							label: "Phone Number",
							name: "phone",
							placeholder: "+91 98XXXXXXXX",
							type: "tel",
							required: true
						})]
					}),
					/* @__PURE__ */ jsx(Field, {
						label: "Email Address",
						name: "email",
						type: "email",
						placeholder: "you@example.com",
						required: true
					}),
					/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
						className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground",
						children: "Trek / Trip"
					}), /* @__PURE__ */ jsxs("select", {
						name: "package_slug",
						defaultValue: search.pkg ?? "",
						required: true,
						className: "mt-2 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring",
						children: [
							/* @__PURE__ */ jsx("option", {
								value: "",
								disabled: true,
								children: "Choose your adventure…"
							}),
							/* @__PURE__ */ jsx("optgroup", {
								label: "Treks",
								children: allPackages.filter((p) => p.category === "trek").map((p) => /* @__PURE__ */ jsxs("option", {
									value: p.slug,
									children: [
										p.name,
										" · ",
										p.priceLabel
									]
								}, p.slug))
							}),
							/* @__PURE__ */ jsx("optgroup", {
								label: "Trips",
								children: allPackages.filter((p) => p.category === "trip").map((p) => /* @__PURE__ */ jsxs("option", {
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
					/* @__PURE__ */ jsxs("div", {
						className: "grid sm:grid-cols-2 gap-5",
						children: [/* @__PURE__ */ jsx(Field, {
							label: "Travel Date",
							name: "travel_date",
							type: "date",
							min: today,
							required: true
						}), /* @__PURE__ */ jsx(Field, {
							label: "Number of Travelers",
							name: "travelers",
							type: "number",
							min: 1,
							max: 15,
							defaultValue: "2",
							required: true
						})]
					}),
					/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
						className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground",
						children: "Special Requirements"
					}), /* @__PURE__ */ jsx("textarea", {
						name: "special_requirements",
						rows: 4,
						placeholder: "Dietary needs, fitness concerns, special occasions…",
						className: "mt-2 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
					})] }),
					/* @__PURE__ */ jsx("button", {
						type: "submit",
						disabled: submitting,
						className: "w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--gradient-ember)] px-6 py-4 text-sm font-semibold text-ember-foreground shadow-glow disabled:opacity-60",
						children: submitting ? /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Loader2, { className: "h-4 w-4 animate-spin" }), " Booking…"] }) : "Confirm Booking"
					}),
					/* @__PURE__ */ jsxs("p", {
						className: "text-xs text-muted-foreground text-center flex items-center justify-center gap-1.5",
						children: [/* @__PURE__ */ jsx(ShieldCheck, { className: "h-3.5 w-3.5" }), " Your details are safe with us. No payment required to reserve."]
					})
				]
			}), /* @__PURE__ */ jsxs("aside", {
				className: "space-y-5",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "rounded-3xl bg-ridge text-white p-7 relative overflow-hidden",
					children: [/* @__PURE__ */ jsx("div", {
						className: "absolute inset-0 bg-aurora opacity-60",
						"aria-hidden": true
					}), /* @__PURE__ */ jsxs("div", {
						className: "relative",
						children: [
							/* @__PURE__ */ jsx("p", {
								className: "text-xs font-semibold uppercase tracking-[0.2em] text-ember",
								children: "What's included"
							}),
							/* @__PURE__ */ jsx("h3", {
								className: "mt-3 font-display text-2xl font-bold",
								children: "Every trip comes with"
							}),
							/* @__PURE__ */ jsx("ul", {
								className: "mt-5 space-y-3",
								children: inclusions.map((i) => /* @__PURE__ */ jsxs("li", {
									className: "flex items-start gap-3 text-sm text-white/85",
									children: [/* @__PURE__ */ jsx("span", {
										className: "grid h-6 w-6 place-items-center rounded-full bg-[var(--gradient-ember)] text-ember-foreground shrink-0",
										children: /* @__PURE__ */ jsx(Check, { className: "h-3.5 w-3.5" })
									}), i]
								}, i))
							})
						]
					})]
				}), /* @__PURE__ */ jsxs("div", {
					className: "rounded-3xl bg-card border border-border p-7 shadow-card",
					children: [
						/* @__PURE__ */ jsx("p", {
							className: "text-xs font-semibold uppercase tracking-[0.2em] text-ember",
							children: "Group size"
						}),
						/* @__PURE__ */ jsx("h3", {
							className: "mt-3 font-display text-2xl font-bold text-foreground",
							children: "14–15 travelers per batch"
						}),
						/* @__PURE__ */ jsx("p", {
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
	return /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
		className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground",
		children: label
	}), /* @__PURE__ */ jsx("input", {
		...props,
		className: "mt-2 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
	})] });
}
//#endregion
export { BookPage as component };
