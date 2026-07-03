import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  ArrowRight,
  Compass,
  Flame,
  Heart,
  Mountain,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
  Utensils,
} from "lucide-react";
import hero from "@/assets/hero-himalayas.jpg";
import galleryBonfire from "@/assets/gallery-bonfire.jpg";
import galleryCamping from "@/assets/gallery-camping.jpg";
import galleryGroup from "@/assets/gallery-group.jpg";
import galleryFood from "@/assets/gallery-food.jpg";
import { usePackages } from "@/lib/packages";
import { PackageCard } from "@/components/site/PackageCard";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "Explore Hills — Authentic Himalayan Adventures in Uttarakhand",
      },
      {
        name: "description",
        content:
          "Premium small-group treks, village stays, bonfire nights and spiritual journeys across the hidden Himalayas of Uttarakhand.",
      },
      {
        property: "og:title",
        content: "Explore Hills — Authentic Himalayan Adventures",
      },
      {
        property: "og:description",
        content:
          "Couple-friendly, small-group treks and village stays across Uttarakhand. Founded by Atul Nautiyal.",
      },
      { property: "og:image", content: hero },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

const stats = [
  { value: "2,500+", label: "Happy Travelers" },
  { value: "120+", label: "Trips Completed" },
  { value: "14–15", label: "Small Group Size" },
  { value: "4.9★", label: "Average Rating" },
];

const whyUs = [
  {
    icon: Heart,
    title: "Couple-friendly",
    text: "Private moments, quiet stays and itineraries designed for two.",
  },
  {
    icon: Users,
    title: "Small Groups",
    text: "Just 14–15 travelers per batch so every voice is heard.",
  },
  {
    icon: Flame,
    title: "Bonfire Nights",
    text: "Stories, music and warmth under a sky full of Himalayan stars.",
  },
  {
    icon: Utensils,
    title: "Local Food Included",
    text: "Authentic Garhwali meals cooked by our village hosts.",
  },
  {
    icon: Compass,
    title: "Hidden Destinations",
    text: "Off-the-grid valleys and villages most travelers never see.",
  },
  {
    icon: ShieldCheck,
    title: "Safe & Comfortable",
    text: "Vetted stays, certified guides and full transportation.",
  },
];

const testimonials = [
  {
    name: "Priya & Aman",
    trip: "Kedarkantha Trek",
    text: "The most magical 4 days of our lives. The team felt like family by the end of the trip.",
  },
  {
    name: "Rahul Sharma",
    trip: "Moila Top Trek",
    text: "Hidden gem of Uttarakhand. The bonfire night under stars is unmatched. Already booked the next one!",
  },
  {
    name: "Neha Kapoor",
    trip: "Hanol Cultural Trip",
    text: "Stayed in a traditional village home, ate the best food. Felt like discovering a different India.",
  },
];

const faqs = [
  {
    q: "What is the group size on each trip?",
    a: "We keep batches small at 14–15 travelers so the experience stays personal and the trails stay peaceful.",
  },
  {
    q: "Are your trips couple-friendly?",
    a: "Absolutely. We design every itinerary with couples, solo travelers and small groups of friends in mind.",
  },
  {
    q: "What's included in the price?",
    a: "Transportation from Dehradun, accommodation, all local meals, a certified guide, bonfire (where applicable) and group coordination.",
  },
  {
    q: "Do I need prior trekking experience?",
    a: "Most of our treks are beginner to moderate. Our guides brief and pace the group so first-timers feel safe and supported.",
  },
  {
    q: "How do I book a trip?",
    a: "Pick a package, hit Book Now, fill the form and our team confirms over WhatsApp within a few hours.",
  },
];

function Home() {
  const { packages } = usePackages();
  const [homepageData, setHomepageData] = useState<any>(null);
  const [reviewsList, setReviewsList] = useState<any[]>([]);

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from("settings")
        .select("*")
        .eq("key", "homepage")
        .maybeSingle();
      if (data && typeof data.value === "object" && data.value !== null) {
        setHomepageData(data.value);
      }
    }
    load();

    async function loadReviews() {
      const { data } = await supabase
        .from("reviews")
        .select("*")
        .eq("status", "approved")
        .eq("featured", true)
        .limit(6);
      if (data && data.length > 0) {
        setReviewsList(data.map(r => ({
          name: r.user_name,
          trip: r.package_name,
          text: r.comment
        })));
      }
    }
    loadReviews();
  }, []);

  const treksCount = packages.filter((p) => p.category === "trek").length;
  const tripsCount = packages.filter((p) => p.category === "trip").length;

  const statsList = homepageData?.stats && Array.isArray(homepageData.stats)
    ? homepageData.stats
    : stats;

  const whyUsList = homepageData?.why_us && Array.isArray(homepageData.why_us)
    ? homepageData.why_us.map((item: any) => {
        let icon = Heart;
        const title = item.title.toLowerCase();
        if (title.includes("couple")) icon = Heart;
        else if (title.includes("group")) icon = Users;
        else if (title.includes("bonfire")) icon = Flame;
        else if (title.includes("food")) icon = Utensils;
        else if (title.includes("hidden") || title.includes("dest")) icon = Compass;
        else if (title.includes("safe") || title.includes("comfort")) icon = ShieldCheck;
        return {
          icon,
          title: item.title,
          text: item.text
        };
      })
    : whyUs;

  const dynamicCategories = [
    { title: "Treks", to: "/treks", count: `${treksCount} routes`, image: galleryCamping },
    { title: "Cultural Trips", to: "/trips", count: `${tripsCount} journeys`, image: galleryFood },
    { title: "Camping", to: "/gallery", count: "Stories", image: galleryBonfire },
    { title: "Village Stays", to: "/gallery", count: "Stories", image: galleryGroup },
  ];

  const categoriesList = homepageData?.categories && Array.isArray(homepageData.categories)
    ? homepageData.categories.map((c: any) => {
        let img = galleryCamping;
        if (c.title.toLowerCase().includes("trek")) img = galleryCamping;
        else if (c.title.toLowerCase().includes("trip")) img = galleryFood;
        else if (c.title.toLowerCase().includes("camp")) img = galleryBonfire;
        else if (c.title.toLowerCase().includes("stay")) img = galleryGroup;
        return {
          title: c.title,
          to: c.to,
          count: c.title.toLowerCase().includes("trek") ? `${treksCount} routes` : c.title.toLowerCase().includes("trip") ? `${tripsCount} journeys` : c.count || "Stories",
          image: c.image || img
        };
      })
    : dynamicCategories;

  const testimonialsList = reviewsList.length > 0 ? reviewsList : testimonials;

  const faqsList = homepageData?.faqs && Array.isArray(homepageData.faqs)
    ? homepageData.faqs
    : faqs;

  const activeSections = homepageData?.sections && Array.isArray(homepageData.sections)
    ? homepageData.sections.filter((s: any) => s.enabled)
    : [
        { id: "hero" },
        { id: "featured" },
        { id: "why_us" },
        { id: "categories" },
        { id: "testimonials" },
        { id: "departures" },
        { id: "faqs" }
      ];

  const renderHero = () => (
    <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden">
      <img
        src={homepageData?.hero_image || hero}
        alt="Snow-capped Himalayan peaks of Uttarakhand at golden hour"
        className="absolute inset-0 h-full w-full object-cover scale-105"
        fetchPriority="high"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ridge/30 via-ridge/40 to-ridge/90" />
      <div className="absolute inset-0 bg-aurora opacity-40" />

      <div className="relative z-10 mx-auto max-w-5xl px-6 pt-32 pb-24 text-center text-white">
        <span className="inline-flex items-center gap-2 rounded-full glass-dark px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-white/90 animate-fade-up">
          <Sparkles className="h-3.5 w-3.5 text-ember" />
          Small-group Himalayan adventures
        </span>
        <h1 className="mt-6 font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.02] tracking-tight animate-fade-up">
          {homepageData?.hero_headline ? homepageData.hero_headline : (
            <>
              Explore the
              <br />
              <span className="text-gradient">Hidden Himalayas</span>
            </>
          )}
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg text-white/85 animate-fade-up">
          {homepageData?.hero_subheading || "Authentic treks, village stays, camping experiences and spiritual journeys across Uttarakhand — crafted for couples, small groups and weekend wanderers."}
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 animate-fade-up">
          <Link
            to="/book"
            className="inline-flex items-center gap-2 rounded-full bg-[var(--gradient-ember)] px-7 py-3.5 text-sm font-semibold text-ember-foreground shadow-glow hover:scale-[1.02] transition-transform"
          >
            {homepageData?.hero_cta_text || "Book Your Adventure"} <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/trips"
            className="inline-flex items-center gap-2 rounded-full glass-dark border border-white/25 px-7 py-3.5 text-sm font-semibold text-white hover:bg-white/15 transition"
          >
            Explore Trips
          </Link>
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto">
          {statsList.map((s: any) => (
            <div
              key={s.label}
              className="rounded-2xl glass-dark p-4 text-center"
            >
              <div className="font-display text-2xl sm:text-3xl font-bold text-white">
                {s.value}
              </div>
              <div className="mt-1 text-[11px] uppercase tracking-wider text-white/70">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 text-xs tracking-widest uppercase animate-float">
        Scroll to discover
      </div>
    </section>
  );

  const renderFeatured = () => (
    <section className="relative py-24 sm:py-32 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ember">
              Featured Adventures
            </p>
            <h2 className="mt-3 font-display text-4xl sm:text-5xl font-bold text-foreground max-w-2xl">
              Handpicked journeys into the heart of Uttarakhand
            </h2>
          </div>
          <Link
            to="/treks"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all"
          >
            View all treks <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {packages.slice(0, 6).map((p) => (
            <PackageCard key={p.slug} pkg={p} />
          ))}
        </div>
      </div>
    </section>
  );

  const renderWhyUs = () => (
    <section className="relative py-24 sm:py-32 overflow-hidden bg-ridge text-white">
      <div className="absolute inset-0 bg-aurora opacity-70" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ember">
            Why Explore Hills
          </p>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl font-bold">
            Travel that feels personal,
            <br />
            never packaged.
          </h2>
          <p className="mt-4 text-white/70">
            We''re a small Uttarakhand-rooted team building intimate
            experiences that respect local culture, support village
            communities and put travelers first.
          </p>
        </div>
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {whyUsList.map(({ icon: Icon, title, text }: any) => (
            <div
              key={title}
              className="group rounded-2xl glass-dark p-6 hover:bg-white/10 transition-colors"
            >
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-[var(--gradient-ember)] text-ember-foreground shadow-glow">
                {Icon && <Icon className="h-5 w-5" />}
              </div>
              <h3 className="mt-5 font-display text-xl font-semibold">
                {title}
              </h3>
              <p className="mt-2 text-sm text-white/70">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  const renderCategories = () => (
    <section className="py-24 sm:py-32 bg-mist">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ember">
            Adventure Categories
          </p>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl font-bold text-foreground">
            Choose your kind of adventure
          </h2>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categoriesList.map((c) => (
            <Link
              key={c.title}
              to={c.to}
              className="group relative aspect-[3/4] overflow-hidden rounded-3xl shadow-card hover-lift"
            >
              <img
                src={c.image}
                alt={c.title}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ridge via-ridge/30 to-transparent" />
              <div className="absolute inset-x-5 bottom-5 text-white">
                <p className="text-[11px] uppercase tracking-widest text-white/70">
                  {c.count}
                </p>
                <h3 className="font-display text-2xl font-bold">{c.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );

  const renderTestimonials = () => (
    <section className="py-24 sm:py-32 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ember">
            Travelers Love Us
          </p>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl font-bold text-foreground">
            Stories from the trail
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {testimonialsList.map((t) => (
            <figure
              key={t.name}
              className="rounded-3xl bg-card border border-border p-7 shadow-card hover-lift"
            >
              <div className="flex gap-1 text-ember">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <blockquote className="mt-4 font-display text-lg leading-snug text-foreground">
                "{t.text}"
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-full bg-[var(--gradient-brand)] text-white font-semibold">
                  {t.name?.charAt(0) || "U"}
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground">
                    {t.name}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {t.trip}
                  </div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );

  const renderDepartures = () => (
    <section className="py-24 sm:py-32 bg-mist">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ember">
              Upcoming Departures
            </p>
            <h2 className="mt-3 font-display text-4xl sm:text-5xl font-bold text-foreground">
              Spots filling fast — secure yours
            </h2>
          </div>
        </div>
        <div className="grid gap-3">
          {packages.slice(0, 4).map((p, i) => {
            const date = new Date();
            date.setDate(date.getDate() + 14 + i * 7);
            const formatted = date.toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            });
            return (
              <div
                key={p.slug}
                className="flex flex-col sm:flex-row sm:items-center gap-4 rounded-2xl bg-card border border-border p-5 shadow-card hover:shadow-elegant transition-shadow"
              >
                <img
                  src={p.image}
                  alt={p.name}
                  loading="lazy"
                  className="h-20 w-full sm:w-28 rounded-xl object-cover"
                />
                <div className="flex-1 min-w-0">
                  <div className="font-display text-lg font-semibold text-foreground">
                    {p.name}
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">
                    {p.duration} · Departs {formatted}
                  </div>
                </div>
                <div className="text-left sm:text-right">
                  <div className="font-display text-xl font-bold text-primary">
                    {p.priceLabel}
                  </div>
                  <div className="text-[11px] uppercase tracking-wider text-muted-foreground">
                    per person
                  </div>
                </div>
                <Link
                  to="/book"
                  search={{ pkg: p.slug }}
                  className="inline-flex items-center justify-center gap-1.5 rounded-full bg-[var(--gradient-ember)] text-ember-foreground px-5 py-2.5 text-xs font-semibold shadow-glow"
                >
                  Reserve <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );

  const renderFAQs = () => (
    <section className="py-24 sm:py-32 bg-background">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ember">
            Frequently Asked
          </p>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl font-bold text-foreground">
            Everything you wanted to know
          </h2>
        </div>
        <div className="space-y-3">
          {faqsList.map((f: any) => (
            <details
              key={f.q}
              className="group rounded-2xl bg-card border border-border p-6 shadow-card"
            >
              <summary className="flex items-center justify-between cursor-pointer list-none">
                <span className="font-display text-lg font-semibold text-foreground pr-4">
                  {f.q}
                </span>
                <span className="grid h-8 w-8 place-items-center rounded-full bg-secondary text-primary group-open:rotate-45 transition-transform">
                  +
                </span>
              </summary>
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                {f.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );

  const SECTIONS_MAP: Record<string, () => JSX.Element> = {
    hero: renderHero,
    featured: renderFeatured,
    why_us: renderWhyUs,
    categories: renderCategories,
    testimonials: renderTestimonials,
    departures: renderDepartures,
    faqs: renderFAQs
  };

  return (
    <>
      {activeSections.map((sec: any) => {
        const renderFn = SECTIONS_MAP[sec.id];
        return renderFn ? <span key={sec.id}>{renderFn()}</span> : null;
      })}

      {/* CTA */}
      <section className="relative py-24 sm:py-32 overflow-hidden">
        <img
          src={homepageData?.hero_image || hero}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ridge/95 via-ridge/85 to-ridge/70" />
        <div className="relative mx-auto max-w-4xl px-6 text-center text-white">
          <Mountain className="mx-auto h-10 w-10 text-ember" />
          <h2 className="mt-5 font-display text-4xl sm:text-6xl font-bold leading-tight">
            Your next adventure begins
            <br />
            in the hills.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-white/80">
            Book a seat with us and discover why thousands of travelers call
            Explore Hills their go-to Himalayan crew.
          </p>
          <Link
            to="/book"
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-[var(--gradient-ember)] px-7 py-3.5 text-sm font-semibold text-ember-foreground shadow-glow hover:scale-[1.02] transition-transform"
          >
            Book Your Adventure <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
