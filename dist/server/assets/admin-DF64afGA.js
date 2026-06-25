import { t as hero_himalayas_default } from "./hero-himalayas-Dx5R6vBe.js";
import { t as PageHero } from "./PageHero-B2khC5ZF.js";
import { t as supabase } from "./client-B99rZN6a.js";
import { useEffect, useMemo, useState } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { CalendarDays, Loader2, LogOut, Search, ShieldAlert, Users } from "lucide-react";
import { toast } from "sonner";
//#region src/routes/admin.tsx?tsr-split=component
function AdminPage() {
	const [auth, setAuth] = useState("loading");
	const [bookings, setBookings] = useState([]);
	const [loading, setLoading] = useState(false);
	const [query, setQuery] = useState("");
	const [statusFilter, setStatusFilter] = useState("all");
	useEffect(() => {
		let active = true;
		async function check() {
			const { data: userData } = await supabase.auth.getUser();
			if (!userData.user) {
				if (active) setAuth("signed-out");
				return;
			}
			const { data: roles } = await supabase.from("user_roles").select("role").eq("user_id", userData.user.id);
			const isAdmin = roles?.some((r) => r.role === "admin");
			if (active) setAuth(isAdmin ? "admin" : "not-admin");
		}
		check();
		const { data: sub } = supabase.auth.onAuthStateChange((event) => {
			if (event === "SIGNED_IN" || event === "SIGNED_OUT") check();
		});
		return () => {
			active = false;
			sub.subscription.unsubscribe();
		};
	}, []);
	useEffect(() => {
		if (auth !== "admin") return;
		setLoading(true);
		supabase.from("bookings").select("*").order("created_at", { ascending: false }).then(({ data, error }) => {
			setLoading(false);
			if (error) {
				toast.error("Failed to load bookings");
				return;
			}
			setBookings(data ?? []);
		});
	}, [auth]);
	const filtered = useMemo(() => {
		return bookings.filter((b) => {
			if (statusFilter !== "all" && b.status !== statusFilter) return false;
			if (!query) return true;
			const q = query.toLowerCase();
			return b.full_name.toLowerCase().includes(q) || b.email.toLowerCase().includes(q) || b.phone.toLowerCase().includes(q) || b.package_name.toLowerCase().includes(q);
		});
	}, [
		bookings,
		query,
		statusFilter
	]);
	const totalTravelers = useMemo(() => bookings.reduce((s, b) => s + b.travelers, 0), [bookings]);
	const upcoming = useMemo(() => bookings.filter((b) => new Date(b.travel_date) >= /* @__PURE__ */ new Date()).length, [bookings]);
	const pending = useMemo(() => bookings.filter((b) => b.status === "pending").length, [bookings]);
	async function updateStatus(id, status) {
		const prev = bookings;
		setBookings((bs) => bs.map((b) => b.id === id ? {
			...b,
			status
		} : b));
		const { error } = await supabase.from("bookings").update({ status }).eq("id", id);
		if (error) {
			setBookings(prev);
			toast.error("Could not update");
		} else toast.success(`Marked ${status}`);
	}
	if (auth === "loading") return /* @__PURE__ */ jsx("div", {
		className: "min-h-[100svh] grid place-items-center",
		children: /* @__PURE__ */ jsx(Loader2, { className: "h-6 w-6 animate-spin text-primary" })
	});
	if (auth === "signed-out") return /* @__PURE__ */ jsx(SignIn, {});
	if (auth === "not-admin") return /* @__PURE__ */ jsx("section", {
		className: "min-h-[100svh] grid place-items-center bg-background pt-32 pb-16 px-4",
		children: /* @__PURE__ */ jsxs("div", {
			className: "max-w-md text-center rounded-3xl bg-card border border-border p-10 shadow-card",
			children: [
				/* @__PURE__ */ jsx("div", {
					className: "mx-auto grid h-14 w-14 place-items-center rounded-full bg-destructive/10 text-destructive",
					children: /* @__PURE__ */ jsx(ShieldAlert, { className: "h-6 w-6" })
				}),
				/* @__PURE__ */ jsx("h1", {
					className: "mt-5 font-display text-2xl font-bold text-foreground",
					children: "Admin access required"
				}),
				/* @__PURE__ */ jsx("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Your account is signed in but doesn't have admin privileges. Ask Atul to grant you the admin role."
				}),
				/* @__PURE__ */ jsxs("button", {
					onClick: () => supabase.auth.signOut(),
					className: "mt-6 inline-flex items-center gap-2 rounded-xl bg-secondary px-5 py-2.5 text-sm font-semibold text-foreground",
					children: [/* @__PURE__ */ jsx(LogOut, { className: "h-4 w-4" }), " Sign out"]
				})
			]
		})
	});
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(PageHero, {
		eyebrow: "Admin",
		title: /* @__PURE__ */ jsxs(Fragment, { children: ["Bookings ", /* @__PURE__ */ jsx("span", {
			className: "text-gradient",
			children: "control room"
		})] }),
		subtitle: "Live view of every booking submitted across the site.",
		image: hero_himalayas_default
	}), /* @__PURE__ */ jsx("section", {
		className: "py-12 bg-background",
		children: /* @__PURE__ */ jsxs("div", {
			className: "mx-auto max-w-7xl px-4 sm:px-6 space-y-8",
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
					children: [
						/* @__PURE__ */ jsx(Stat, {
							label: "Total bookings",
							value: bookings.length.toString()
						}),
						/* @__PURE__ */ jsx(Stat, {
							label: "Total travelers",
							value: totalTravelers.toString(),
							icon: /* @__PURE__ */ jsx(Users, { className: "h-4 w-4" })
						}),
						/* @__PURE__ */ jsx(Stat, {
							label: "Upcoming departures",
							value: upcoming.toString(),
							icon: /* @__PURE__ */ jsx(CalendarDays, { className: "h-4 w-4" })
						}),
						/* @__PURE__ */ jsx(Stat, {
							label: "Pending review",
							value: pending.toString(),
							highlight: true
						})
					]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "relative flex-1 max-w-md",
						children: [/* @__PURE__ */ jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ jsx("input", {
							value: query,
							onChange: (e) => setQuery(e.target.value),
							placeholder: "Search name, email, phone, package…",
							className: "w-full pl-9 pr-4 py-2.5 rounded-xl border border-input bg-card text-sm focus:outline-none focus:ring-2 focus:ring-ring"
						})]
					}), /* @__PURE__ */ jsxs("div", {
						className: "flex gap-2 flex-wrap",
						children: [[
							"all",
							"pending",
							"confirmed",
							"cancelled"
						].map((s) => /* @__PURE__ */ jsx("button", {
							onClick: () => setStatusFilter(s),
							className: `px-3 py-1.5 rounded-full text-xs font-semibold capitalize transition ${statusFilter === s ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground hover:bg-accent"}`,
							children: s
						}, s)), /* @__PURE__ */ jsxs("button", {
							onClick: () => supabase.auth.signOut(),
							className: "ml-2 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-secondary text-foreground hover:bg-accent",
							children: [/* @__PURE__ */ jsx(LogOut, { className: "h-3.5 w-3.5" }), " Sign out"]
						})]
					})]
				}),
				/* @__PURE__ */ jsx("div", {
					className: "rounded-2xl bg-card border border-border shadow-card overflow-hidden",
					children: loading ? /* @__PURE__ */ jsx("div", {
						className: "p-16 text-center",
						children: /* @__PURE__ */ jsx(Loader2, { className: "h-6 w-6 animate-spin text-primary mx-auto" })
					}) : filtered.length === 0 ? /* @__PURE__ */ jsx("div", {
						className: "p-16 text-center text-muted-foreground text-sm",
						children: "No bookings match."
					}) : /* @__PURE__ */ jsx("div", {
						className: "overflow-x-auto",
						children: /* @__PURE__ */ jsxs("table", {
							className: "w-full text-sm",
							children: [/* @__PURE__ */ jsx("thead", {
								className: "bg-secondary text-xs uppercase tracking-wider text-muted-foreground",
								children: /* @__PURE__ */ jsxs("tr", { children: [
									/* @__PURE__ */ jsx("th", {
										className: "text-left p-4",
										children: "Traveler"
									}),
									/* @__PURE__ */ jsx("th", {
										className: "text-left p-4",
										children: "Package"
									}),
									/* @__PURE__ */ jsx("th", {
										className: "text-left p-4",
										children: "Travel date"
									}),
									/* @__PURE__ */ jsx("th", {
										className: "text-left p-4",
										children: "Pax"
									}),
									/* @__PURE__ */ jsx("th", {
										className: "text-left p-4",
										children: "Status"
									}),
									/* @__PURE__ */ jsx("th", {
										className: "text-right p-4",
										children: "Action"
									})
								] })
							}), /* @__PURE__ */ jsx("tbody", { children: filtered.map((b) => /* @__PURE__ */ jsxs("tr", {
								className: "border-t border-border align-top hover:bg-secondary/40",
								children: [
									/* @__PURE__ */ jsxs("td", {
										className: "p-4",
										children: [
											/* @__PURE__ */ jsx("div", {
												className: "font-semibold text-foreground",
												children: b.full_name
											}),
											/* @__PURE__ */ jsx("div", {
												className: "text-xs text-muted-foreground",
												children: b.email
											}),
											/* @__PURE__ */ jsx("div", {
												className: "text-xs text-muted-foreground",
												children: b.phone
											})
										]
									}),
									/* @__PURE__ */ jsxs("td", {
										className: "p-4",
										children: [/* @__PURE__ */ jsx("div", {
											className: "font-medium text-foreground",
											children: b.package_name
										}), b.special_requirements && /* @__PURE__ */ jsx("div", {
											className: "text-xs text-muted-foreground mt-1 max-w-xs line-clamp-2",
											children: b.special_requirements
										})]
									}),
									/* @__PURE__ */ jsx("td", {
										className: "p-4 text-foreground",
										children: new Date(b.travel_date).toLocaleDateString("en-IN", {
											day: "2-digit",
											month: "short",
											year: "numeric"
										})
									}),
									/* @__PURE__ */ jsx("td", {
										className: "p-4 text-foreground",
										children: b.travelers
									}),
									/* @__PURE__ */ jsx("td", {
										className: "p-4",
										children: /* @__PURE__ */ jsx("span", {
											className: `inline-block px-2.5 py-1 rounded-full text-[11px] font-semibold capitalize ${b.status === "confirmed" ? "bg-forest/15 text-forest" : b.status === "cancelled" ? "bg-destructive/15 text-destructive" : "bg-ember/15 text-ember"}`,
											children: b.status
										})
									}),
									/* @__PURE__ */ jsx("td", {
										className: "p-4 text-right",
										children: /* @__PURE__ */ jsxs("div", {
											className: "inline-flex gap-2",
											children: [b.status !== "confirmed" && /* @__PURE__ */ jsx("button", {
												onClick: () => updateStatus(b.id, "confirmed"),
												className: "px-3 py-1.5 rounded-full text-xs font-semibold bg-forest text-forest-foreground hover:opacity-90",
												children: "Confirm"
											}), b.status !== "cancelled" && /* @__PURE__ */ jsx("button", {
												onClick: () => updateStatus(b.id, "cancelled"),
												className: "px-3 py-1.5 rounded-full text-xs font-semibold bg-secondary text-foreground hover:bg-accent",
												children: "Cancel"
											})]
										})
									})
								]
							}, b.id)) })]
						})
					})
				})
			]
		})
	})] });
}
function Stat({ label, value, icon, highlight }) {
	return /* @__PURE__ */ jsxs("div", {
		className: `rounded-2xl p-6 border ${highlight ? "bg-[var(--gradient-ember)] text-ember-foreground border-transparent shadow-glow" : "bg-card border-border shadow-card"}`,
		children: [/* @__PURE__ */ jsxs("div", {
			className: `flex items-center gap-2 text-xs uppercase tracking-wider ${highlight ? "text-ember-foreground/80" : "text-muted-foreground"}`,
			children: [
				icon,
				" ",
				label
			]
		}), /* @__PURE__ */ jsx("div", {
			className: `mt-3 font-display text-4xl font-bold ${highlight ? "text-ember-foreground" : "text-foreground"}`,
			children: value
		})]
	});
}
function SignIn() {
	const [mode, setMode] = useState("signin");
	const [busy, setBusy] = useState(false);
	async function handle(e) {
		e.preventDefault();
		const fd = new FormData(e.currentTarget);
		const email = String(fd.get("email") ?? "").trim();
		const password = String(fd.get("password") ?? "");
		if (!email || !password) return toast.error("Email and password required");
		setBusy(true);
		if (mode === "signup") {
			const { error } = await supabase.auth.signUp({
				email,
				password,
				options: { emailRedirectTo: window.location.origin + "/admin" }
			});
			setBusy(false);
			if (error) return toast.error(error.message);
			toast.success("Account created. Ask Atul to grant admin access.");
		} else {
			const { error } = await supabase.auth.signInWithPassword({
				email,
				password
			});
			setBusy(false);
			if (error) return toast.error(error.message);
			toast.success("Signed in");
		}
	}
	return /* @__PURE__ */ jsx("section", {
		className: "min-h-[100svh] grid place-items-center px-4 pt-32 pb-16 bg-aurora",
		children: /* @__PURE__ */ jsxs("form", {
			onSubmit: handle,
			className: "w-full max-w-md rounded-3xl glass-dark p-8 text-white shadow-elegant",
			children: [
				/* @__PURE__ */ jsx("p", {
					className: "text-xs font-semibold uppercase tracking-[0.2em] text-ember",
					children: "Admin"
				}),
				/* @__PURE__ */ jsx("h1", {
					className: "mt-3 font-display text-3xl font-bold",
					children: mode === "signin" ? "Sign in" : "Create account"
				}),
				/* @__PURE__ */ jsx("p", {
					className: "mt-2 text-sm text-white/70",
					children: "Manage bookings and travelers."
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "mt-6 space-y-3",
					children: [/* @__PURE__ */ jsx("input", {
						name: "email",
						type: "email",
						required: true,
						placeholder: "Email",
						className: "w-full rounded-xl bg-white/10 border border-white/20 px-4 py-3 text-sm text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-ember"
					}), /* @__PURE__ */ jsx("input", {
						name: "password",
						type: "password",
						required: true,
						minLength: 6,
						placeholder: "Password",
						className: "w-full rounded-xl bg-white/10 border border-white/20 px-4 py-3 text-sm text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-ember"
					})]
				}),
				/* @__PURE__ */ jsxs("button", {
					disabled: busy,
					type: "submit",
					className: "mt-5 w-full rounded-xl bg-[var(--gradient-ember)] text-ember-foreground py-3 text-sm font-semibold shadow-glow disabled:opacity-60 inline-flex items-center justify-center gap-2",
					children: [busy && /* @__PURE__ */ jsx(Loader2, { className: "h-4 w-4 animate-spin" }), mode === "signin" ? "Sign in" : "Create account"]
				}),
				/* @__PURE__ */ jsx("button", {
					type: "button",
					onClick: () => setMode(mode === "signin" ? "signup" : "signin"),
					className: "mt-4 w-full text-xs text-white/70 hover:text-white",
					children: mode === "signin" ? "Need an account? Sign up" : "Have an account? Sign in"
				})
			]
		})
	});
}
//#endregion
export { AdminPage as component };
