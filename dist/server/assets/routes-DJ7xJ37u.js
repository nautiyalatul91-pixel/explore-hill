import { t as gallery_bonfire_default } from "./gallery-bonfire-33oJG19z.js";
import { t as gallery_camping_default } from "./gallery-camping-sBiRzPvm.js";
import { t as hero_himalayas_default } from "./hero-himalayas-Dx5R6vBe.js";
import { i as trips, r as treks, t as allPackages } from "./packages-CLS7Ed0o.js";
import { n as gallery_food_default, t as gallery_group_default } from "./gallery-group-C_0vxpEE.js";
import { Link } from "@tanstack/react-router";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { ArrowRight, Clock, Compass, Flame, Heart, MapPin, Mountain, ShieldCheck, Sparkles, Star, Users, Utensils } from "lucide-react";
//#region src/components/site/Packagecard.tsx
function PackageCard({ pkg }) {
	return /* @__PURE__ */ jsxs("article", {
		className: "group relative overflow-hidden rounded-3xl bg-card shadow-card hover-lift",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "relative aspect-[4/3] overflow-hidden",
			children: [
				/* @__PURE__ */ jsx("img", {
					src: pkg.image,
					alt: pkg.name,
					loading: "lazy",
					width: 1280,
					height: 960,
					className: "h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-110"
				}),
				/* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-ridge/80 via-ridge/10 to-transparent" }),
				/* @__PURE__ */ jsxs("div", {
					className: "absolute top-4 left-4 flex gap-2",
					children: [/* @__PURE__ */ jsx("span", {
						className: "rounded-full glass px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-ridge",
						children: pkg.category === "trek" ? "Trek" : "Trip"
					}), pkg.difficulty && /* @__PURE__ */ jsx("span", {
						className: "rounded-full bg-ember/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-ember-foreground",
						children: pkg.difficulty
					})]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "absolute bottom-4 left-5 right-5 text-white",
					children: [/* @__PURE__ */ jsx("h3", {
						className: "font-display text-2xl font-bold leading-tight",
						children: pkg.name
					}), /* @__PURE__ */ jsxs("div", {
						className: "mt-1 flex items-center gap-3 text-xs text-white/80",
						children: [/* @__PURE__ */ jsxs("span", {
							className: "inline-flex items-center gap-1",
							children: [
								/* @__PURE__ */ jsx(Clock, { className: "h-3.5 w-3.5" }),
								" ",
								pkg.duration
							]
						}), /* @__PURE__ */ jsxs("span", {
							className: "inline-flex items-center gap-1",
							children: [/* @__PURE__ */ jsx(MapPin, { className: "h-3.5 w-3.5" }), " Uttarakhand"]
						})]
					})]
				})
			]
		}), /* @__PURE__ */ jsxs("div", {
			className: "p-6",
			children: [
				/* @__PURE__ */ jsx("p", {
					className: "text-sm text-muted-foreground line-clamp-2",
					children: pkg.tagline
				}),
				/* @__PURE__ */ jsx("ul", {
					className: "mt-4 grid grid-cols-2 gap-x-3 gap-y-1.5 text-xs text-foreground/80",
					children: pkg.highlights.slice(0, 4).map((h) => /* @__PURE__ */ jsxs("li", {
						className: "flex items-start gap-1.5",
						children: [
							/* @__PURE__ */ jsx("span", { className: "mt-1 h-1 w-1 rounded-full bg-ember shrink-0" }),
							" ",
							h
						]
					}, h))
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "mt-6 flex items-end justify-between",
					children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
						className: "text-[10px] uppercase tracking-widest text-muted-foreground",
						children: "From"
					}), /* @__PURE__ */ jsxs("p", {
						className: "font-display text-2xl font-bold text-primary",
						children: [pkg.priceLabel, /* @__PURE__ */ jsxs("span", {
							className: "text-xs font-medium text-muted-foreground",
							children: [" ", "/person"]
						})]
					})] }), /* @__PURE__ */ jsxs(Link, {
						to: "/book",
						search: { pkg: pkg.slug },
						className: "inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2.5 text-xs font-semibold text-primary-foreground hover:bg-primary/90 transition",
						children: ["Book Now ", /* @__PURE__ */ jsx(ArrowRight, { className: "h-3.5 w-3.5" })]
					})]
				})
			]
		})]
	});
}
//#endregion
//#region src/routes/index.tsx?tsr-split=component
var stats = [
	{
		value: "2,500+",
		label: "Happy Travelers"
	},
	{
		value: "120+",
		label: "Trips Completed"
	},
	{
		value: "14–15",
		label: "Small Group Size"
	},
	{
		value: "4.9★",
		label: "Average Rating"
	}
];
var whyUs = [
	{
		icon: Heart,
		title: "Couple-friendly",
		text: "Private moments, quiet stays and itineraries designed for two."
	},
	{
		icon: Users,
		title: "Small Groups",
		text: "Just 14–15 travelers per batch so every voice is heard."
	},
	{
		icon: Flame,
		title: "Bonfire Nights",
		text: "Stories, music and warmth under a sky full of Himalayan stars."
	},
	{
		icon: Utensils,
		title: "Local Food Included",
		text: "Authentic Garhwali meals cooked by our village hosts."
	},
	{
		icon: Compass,
		title: "Hidden Destinations",
		text: "Off-the-grid valleys and villages most travelers never see."
	},
	{
		icon: ShieldCheck,
		title: "Safe & Comfortable",
		text: "Vetted stays, certified guides and full transportation."
	}
];
var categories = [
	{
		title: "Treks",
		image: gallery_camping_default,
		count: `${treks.length} routes`,
		to: "/treks"
	},
	{
		title: "Cultural Trips",
		image: gallery_food_default,
		count: `${trips.length} journeys`,
		to: "/trips"
	},
	{
		title: "Camping",
		image: gallery_bonfire_default,
		count: "Bonfire nights",
		to: "/gallery"
	},
	{
		title: "Village Stays",
		image: gallery_group_default,
		count: "Local hosts",
		to: "/gallery"
	}
];
var testimonials = [
	{
		name: "Priya & Aman",
		trip: "Kedarkantha Trek",
		text: "The most magical 4 days of our lives. The team felt like family by the end of the trip."
	},
	{
		name: "Rahul Sharma",
		trip: "Moila Top Trek",
		text: "Hidden gem of Uttarakhand. The bonfire night under stars is unmatched. Already booked the next one!"
	},
	{
		name: "Neha Kapoor",
		trip: "Hanol Cultural Trip",
		text: "Stayed in a traditional village home, ate the best food. Felt like discovering a different India."
	}
];
var faqs = [
	{
		q: "What is the group size on each trip?",
		a: "We keep batches small at 14–15 travelers so the experience stays personal and the trails stay peaceful."
	},
	{
		q: "Are your trips couple-friendly?",
		a: "Absolutely. We design every itinerary with couples, solo travelers and small groups of friends in mind."
	},
	{
		q: "What's included in the price?",
		a: "Transportation from Dehradun, accommodation, all local meals, a certified guide, bonfire (where applicable) and group coordination."
	},
	{
		q: "Do I need prior trekking experience?",
		a: "Most of our treks are beginner to moderate. Our guides brief and pace the group so first-timers feel safe and supported."
	},
	{
		q: "How do I book a trip?",
		a: "Pick a package, hit Book Now, fill the form and our team confirms over WhatsApp within a few hours."
	}
];
function Home() {
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsxs("section", {
			className: "relative min-h-[100svh] flex items-center justify-center overflow-hidden",
			children: [
				/* @__PURE__ */ jsx("img", {
					src: hero_himalayas_default,
					alt: "Snow-capped Himalayan peaks of Uttarakhand at golden hour",
					className: "absolute inset-0 h-full w-full object-cover scale-105",
					fetchPriority: "high"
				}),
				/* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-ridge/30 via-ridge/40 to-ridge/90" }),
				/* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-aurora opacity-40" }),
				/* @__PURE__ */ jsxs("div", {
					className: "relative z-10 mx-auto max-w-5xl px-6 pt-32 pb-24 text-center text-white",
					children: [
						/* @__PURE__ */ jsxs("span", {
							className: "inline-flex items-center gap-2 rounded-full glass-dark px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-white/90 animate-fade-up",
							children: [/* @__PURE__ */ jsx(Sparkles, { className: "h-3.5 w-3.5 text-ember" }), "Small-group Himalayan adventures"]
						}),
						/* @__PURE__ */ jsxs("h1", {
							className: "mt-6 font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.02] tracking-tight animate-fade-up",
							children: [
								"Explore the",
								/* @__PURE__ */ jsx("br", {}),
								/* @__PURE__ */ jsx("span", {
									className: "text-gradient",
									children: "Hidden Himalayas"
								})
							]
						}),
						/* @__PURE__ */ jsx("p", {
							className: "mx-auto mt-6 max-w-2xl text-base sm:text-lg text-white/85 animate-fade-up",
							children: "Authentic treks, village stays, camping experiences and spiritual journeys across Uttarakhand — crafted for couples, small groups and weekend wanderers."
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 animate-fade-up",
							children: [/* @__PURE__ */ jsxs(Link, {
								to: "/book",
								className: "inline-flex items-center gap-2 rounded-full bg-[var(--gradient-ember)] px-7 py-3.5 text-sm font-semibold text-ember-foreground shadow-glow hover:scale-[1.02] transition-transform",
								children: ["Book Your Adventure ", /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4" })]
							}), /* @__PURE__ */ jsx(Link, {
								to: "/trips",
								className: "inline-flex items-center gap-2 rounded-full glass-dark border border-white/25 px-7 py-3.5 text-sm font-semibold text-white hover:bg-white/15 transition",
								children: "Explore Trips"
							})]
						}),
						/* @__PURE__ */ jsx("div", {
							className: "mt-20 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto",
							children: stats.map((s) => /* @__PURE__ */ jsxs("div", {
								className: "rounded-2xl glass-dark p-4 text-center",
								children: [/* @__PURE__ */ jsx("div", {
									className: "font-display text-2xl sm:text-3xl font-bold text-white",
									children: s.value
								}), /* @__PURE__ */ jsx("div", {
									className: "mt-1 text-[11px] uppercase tracking-wider text-white/70",
									children: s.label
								})]
							}, s.label))
						})
					]
				}),
				/* @__PURE__ */ jsx("div", {
					className: "absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 text-xs tracking-widest uppercase animate-float",
					children: "Scroll to discover"
				})
			]
		}),
		/* @__PURE__ */ jsx("section", {
			className: "relative py-24 sm:py-32 bg-background",
			children: /* @__PURE__ */ jsxs("div", {
				className: "mx-auto max-w-7xl px-4 sm:px-6",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12",
					children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
						className: "text-xs font-semibold uppercase tracking-[0.2em] text-ember",
						children: "Featured Adventures"
					}), /* @__PURE__ */ jsx("h2", {
						className: "mt-3 font-display text-4xl sm:text-5xl font-bold text-foreground max-w-2xl",
						children: "Handpicked journeys into the heart of Uttarakhand"
					})] }), /* @__PURE__ */ jsxs(Link, {
						to: "/treks",
						className: "inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all",
						children: ["View all treks ", /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4" })]
					})]
				}), /* @__PURE__ */ jsx("div", {
					className: "grid gap-6 sm:grid-cols-2 lg:grid-cols-3",
					children: allPackages.slice(0, 6).map((p) => /* @__PURE__ */ jsx(PackageCard, { pkg: p }, p.slug))
				})]
			})
		}),
		/* @__PURE__ */ jsxs("section", {
			className: "relative py-24 sm:py-32 overflow-hidden bg-ridge text-white",
			children: [/* @__PURE__ */ jsx("div", {
				className: "absolute inset-0 bg-aurora opacity-70",
				"aria-hidden": true
			}), /* @__PURE__ */ jsxs("div", {
				className: "relative mx-auto max-w-7xl px-4 sm:px-6",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "max-w-2xl",
					children: [
						/* @__PURE__ */ jsx("p", {
							className: "text-xs font-semibold uppercase tracking-[0.2em] text-ember",
							children: "Why Explore Hills"
						}),
						/* @__PURE__ */ jsxs("h2", {
							className: "mt-3 font-display text-4xl sm:text-5xl font-bold",
							children: [
								"Travel that feels personal,",
								/* @__PURE__ */ jsx("br", {}),
								"never packaged."
							]
						}),
						/* @__PURE__ */ jsx("p", {
							className: "mt-4 text-white/70",
							children: "We're a small Uttarakhand-rooted team building intimate experiences that respect local culture, support village communities and put travelers first."
						})
					]
				}), /* @__PURE__ */ jsx("div", {
					className: "mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
					children: whyUs.map(({ icon: Icon, title, text }) => /* @__PURE__ */ jsxs("div", {
						className: "group rounded-2xl glass-dark p-6 hover:bg-white/10 transition-colors",
						children: [
							/* @__PURE__ */ jsx("div", {
								className: "grid h-12 w-12 place-items-center rounded-xl bg-[var(--gradient-ember)] text-ember-foreground shadow-glow",
								children: /* @__PURE__ */ jsx(Icon, { className: "h-5 w-5" })
							}),
							/* @__PURE__ */ jsx("h3", {
								className: "mt-5 font-display text-xl font-semibold",
								children: title
							}),
							/* @__PURE__ */ jsx("p", {
								className: "mt-2 text-sm text-white/70",
								children: text
							})
						]
					}, title))
				})]
			})]
		}),
		/* @__PURE__ */ jsx("section", {
			className: "py-24 sm:py-32 bg-mist",
			children: /* @__PURE__ */ jsxs("div", {
				className: "mx-auto max-w-7xl px-4 sm:px-6",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "text-center max-w-2xl mx-auto",
					children: [/* @__PURE__ */ jsx("p", {
						className: "text-xs font-semibold uppercase tracking-[0.2em] text-ember",
						children: "Adventure Categories"
					}), /* @__PURE__ */ jsx("h2", {
						className: "mt-3 font-display text-4xl sm:text-5xl font-bold text-foreground",
						children: "Choose your kind of adventure"
					})]
				}), /* @__PURE__ */ jsx("div", {
					className: "mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4",
					children: categories.map((c) => /* @__PURE__ */ jsxs(Link, {
						to: c.to,
						className: "group relative aspect-[3/4] overflow-hidden rounded-3xl shadow-card hover-lift",
						children: [
							/* @__PURE__ */ jsx("img", {
								src: c.image,
								alt: c.title,
								loading: "lazy",
								className: "absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-110"
							}),
							/* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-ridge via-ridge/30 to-transparent" }),
							/* @__PURE__ */ jsxs("div", {
								className: "absolute inset-x-5 bottom-5 text-white",
								children: [/* @__PURE__ */ jsx("p", {
									className: "text-[11px] uppercase tracking-widest text-white/70",
									children: c.count
								}), /* @__PURE__ */ jsx("h3", {
									className: "font-display text-2xl font-bold",
									children: c.title
								})]
							})
						]
					}, c.title))
				})]
			})
		}),
		/* @__PURE__ */ jsx("section", {
			className: "py-24 sm:py-32 bg-background",
			children: /* @__PURE__ */ jsxs("div", {
				className: "mx-auto max-w-7xl px-4 sm:px-6",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "text-center max-w-2xl mx-auto mb-14",
					children: [/* @__PURE__ */ jsx("p", {
						className: "text-xs font-semibold uppercase tracking-[0.2em] text-ember",
						children: "Travelers Love Us"
					}), /* @__PURE__ */ jsx("h2", {
						className: "mt-3 font-display text-4xl sm:text-5xl font-bold text-foreground",
						children: "Stories from the trail"
					})]
				}), /* @__PURE__ */ jsx("div", {
					className: "grid gap-6 md:grid-cols-3",
					children: testimonials.map((t) => /* @__PURE__ */ jsxs("figure", {
						className: "rounded-3xl bg-card border border-border p-7 shadow-card hover-lift",
						children: [
							/* @__PURE__ */ jsx("div", {
								className: "flex gap-1 text-ember",
								children: Array.from({ length: 5 }).map((_, i) => /* @__PURE__ */ jsx(Star, { className: "h-4 w-4 fill-current" }, i))
							}),
							/* @__PURE__ */ jsxs("blockquote", {
								className: "mt-4 font-display text-lg leading-snug text-foreground",
								children: [
									"\"",
									t.text,
									"\""
								]
							}),
							/* @__PURE__ */ jsxs("figcaption", {
								className: "mt-6 flex items-center gap-3",
								children: [/* @__PURE__ */ jsx("div", {
									className: "grid h-11 w-11 place-items-center rounded-full bg-[var(--gradient-brand)] text-white font-semibold",
									children: t.name.charAt(0)
								}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
									className: "text-sm font-semibold text-foreground",
									children: t.name
								}), /* @__PURE__ */ jsx("div", {
									className: "text-xs text-muted-foreground",
									children: t.trip
								})] })]
							})
						]
					}, t.name))
				})]
			})
		}),
		/* @__PURE__ */ jsx("section", {
			className: "py-24 sm:py-32 bg-mist",
			children: /* @__PURE__ */ jsxs("div", {
				className: "mx-auto max-w-7xl px-4 sm:px-6",
				children: [/* @__PURE__ */ jsx("div", {
					className: "flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12",
					children: /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
						className: "text-xs font-semibold uppercase tracking-[0.2em] text-ember",
						children: "Upcoming Departures"
					}), /* @__PURE__ */ jsx("h2", {
						className: "mt-3 font-display text-4xl sm:text-5xl font-bold text-foreground",
						children: "Spots filling fast — secure yours"
					})] })
				}), /* @__PURE__ */ jsx("div", {
					className: "grid gap-3",
					children: allPackages.slice(0, 4).map((p, i) => {
						const date = /* @__PURE__ */ new Date();
						date.setDate(date.getDate() + 14 + i * 7);
						const formatted = date.toLocaleDateString("en-IN", {
							day: "2-digit",
							month: "short",
							year: "numeric"
						});
						return /* @__PURE__ */ jsxs("div", {
							className: "flex flex-col sm:flex-row sm:items-center gap-4 rounded-2xl bg-card border border-border p-5 shadow-card hover:shadow-elegant transition-shadow",
							children: [
								/* @__PURE__ */ jsx("img", {
									src: p.image,
									alt: p.name,
									loading: "lazy",
									className: "h-20 w-full sm:w-28 rounded-xl object-cover"
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "flex-1 min-w-0",
									children: [/* @__PURE__ */ jsx("div", {
										className: "font-display text-lg font-semibold text-foreground",
										children: p.name
									}), /* @__PURE__ */ jsxs("div", {
										className: "text-xs text-muted-foreground mt-0.5",
										children: [
											p.duration,
											" · Departs ",
											formatted
										]
									})]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "text-left sm:text-right",
									children: [/* @__PURE__ */ jsx("div", {
										className: "font-display text-xl font-bold text-primary",
										children: p.priceLabel
									}), /* @__PURE__ */ jsx("div", {
										className: "text-[11px] uppercase tracking-wider text-muted-foreground",
										children: "per person"
									})]
								}),
								/* @__PURE__ */ jsxs(Link, {
									to: "/book",
									search: { pkg: p.slug },
									className: "inline-flex items-center justify-center gap-1.5 rounded-full bg-[var(--gradient-ember)] text-ember-foreground px-5 py-2.5 text-xs font-semibold shadow-glow",
									children: ["Reserve ", /* @__PURE__ */ jsx(ArrowRight, { className: "h-3.5 w-3.5" })]
								})
							]
						}, p.slug);
					})
				})]
			})
		}),
		/* @__PURE__ */ jsx("section", {
			className: "py-24 sm:py-32 bg-background",
			children: /* @__PURE__ */ jsxs("div", {
				className: "mx-auto max-w-4xl px-4 sm:px-6",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "text-center max-w-2xl mx-auto mb-12",
					children: [/* @__PURE__ */ jsx("p", {
						className: "text-xs font-semibold uppercase tracking-[0.2em] text-ember",
						children: "Frequently Asked"
					}), /* @__PURE__ */ jsx("h2", {
						className: "mt-3 font-display text-4xl sm:text-5xl font-bold text-foreground",
						children: "Everything you wanted to know"
					})]
				}), /* @__PURE__ */ jsx("div", {
					className: "space-y-3",
					children: faqs.map((f) => /* @__PURE__ */ jsxs("details", {
						className: "group rounded-2xl bg-card border border-border p-6 shadow-card",
						children: [/* @__PURE__ */ jsxs("summary", {
							className: "flex items-center justify-between cursor-pointer list-none",
							children: [/* @__PURE__ */ jsx("span", {
								className: "font-display text-lg font-semibold text-foreground pr-4",
								children: f.q
							}), /* @__PURE__ */ jsx("span", {
								className: "grid h-8 w-8 place-items-center rounded-full bg-secondary text-primary group-open:rotate-45 transition-transform",
								children: "+"
							})]
						}), /* @__PURE__ */ jsx("p", {
							className: "mt-4 text-sm text-muted-foreground leading-relaxed",
							children: f.a
						})]
					}, f.q))
				})]
			})
		}),
		/* @__PURE__ */ jsxs("section", {
			className: "relative py-24 sm:py-32 overflow-hidden",
			children: [
				/* @__PURE__ */ jsx("img", {
					src: hero_himalayas_default,
					alt: "",
					"aria-hidden": true,
					className: "absolute inset-0 h-full w-full object-cover"
				}),
				/* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-ridge/95 via-ridge/85 to-ridge/70" }),
				/* @__PURE__ */ jsxs("div", {
					className: "relative mx-auto max-w-4xl px-6 text-center text-white",
					children: [
						/* @__PURE__ */ jsx(Mountain, { className: "mx-auto h-10 w-10 text-ember" }),
						/* @__PURE__ */ jsxs("h2", {
							className: "mt-5 font-display text-4xl sm:text-6xl font-bold leading-tight",
							children: [
								"Your next adventure begins",
								/* @__PURE__ */ jsx("br", {}),
								"in the hills."
							]
						}),
						/* @__PURE__ */ jsx("p", {
							className: "mx-auto mt-5 max-w-xl text-white/80",
							children: "Book a seat with us and discover why thousands of travelers call Explore Hills their go-to Himalayan crew."
						}),
						/* @__PURE__ */ jsxs(Link, {
							to: "/book",
							className: "mt-10 inline-flex items-center gap-2 rounded-full bg-[var(--gradient-ember)] px-7 py-3.5 text-sm font-semibold text-ember-foreground shadow-glow hover:scale-[1.02] transition-transform",
							children: ["Book Your Adventure ", /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4" })]
						})
					]
				})
			]
		})
	] });
}
//#endregion
export { Home as component };
