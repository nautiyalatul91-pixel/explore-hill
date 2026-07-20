import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useMemo } from "react";
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

const formatIndexBatchDate = (dateStr: string) => {
  const [year, month, day] = dateStr.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString("en-US", { day: "2-digit", month: "short", year: "numeric" });
};

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
  const [departuresList, setDeparturesList] = useState<any[]>([]);
  const [loadingDepartures, setLoadingDepartures] = useState(true);
  const [whatsappPhone, setWhatsappPhone] = useState("916397710701");
  const [companyName, setCompanyName] = useState("Explore Hills");

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

    async function loadDepartures() {
      const todayDate = new Date().toISOString().split("T")[0];
      const { data, error } = await supabase
        .from("departures")
        .select("*")
        .gte("start_date", todayDate)
        .neq("status", "cancelled")
        .neq("visibility", "hidden")
        .order("start_date", { ascending: true });
      if (!error && data) {
        setDeparturesList(data);
      }
      setLoadingDepartures(false);
    }
    loadDepartures();

    async function loadSettings() {
      const { data } = await supabase.from("settings").select("*").maybeSingle();
      if (data) {
        if (data.whatsapp || data.phone) {
          setWhatsappPhone((data.whatsapp || data.phone).replace(/[^0-9]/g, ""));
        }
        if (data.company_name) {
          setCompanyName(data.company_name);
        }
      }
    }
    loadSettings();
  }, []);

  const treksCount = packages.filter((p) => p.category === "trek").length;
  const tripsCount = packages.filter((p) => p.category === "trip").length;

  const displayedPackages = useMemo(() => {
    return packages
      .map((p) => {
        const pkgBatches = departuresList.filter((d) => d.package_slug === p.slug);
        if (pkgBatches.length === 0) return null;
        
        // Find the first available (not sold out) batch
        const availableBatch = pkgBatches.find((d) => {
          const isSoldOut = d.status === "full" || (d.booked_seats >= d.max_seats && !d.unlimited_seats);
          return !isSoldOut;
        });
        
        // If an available batch is found, return package and that batch. Otherwise, return package and the nearest batch (first one).
        const selectedBatch = availableBatch || pkgBatches[0];
        
        return {
          pkg: p,
          batch: selectedBatch,
        };
      })
      .filter((item): item is { pkg: typeof packages[0]; batch: any } => item !== null)
      // Sort by the selected batch's start_date ascending so the earliest departures are at the top!
      .sort((a, b) => a.batch.start_date.localeCompare(b.batch.start_date));
  }, [packages, departuresList]);

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

  const rawSections = homepageData?.sections && Array.isArray(homepageData.sections)
    ? homepageData.sections.filter((s: any) => s.enabled)
    : [
        { id: "hero" },
        { id: "featured" },
        { id: "why_us" },
        { id: "categories" },
        { id: "testimonials" },
        { id: "departures" },
        { id: "customize" },
        { id: "faqs" }
      ];

  const activeSections = rawSections.some((s: any) => s.id === "customize")
    ? rawSections
    : rawSections.flatMap((s: any) => s.id === "departures" ? [s, { id: "customize" }] : [s]);

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

        {loadingDepartures ? (
          <div className="text-sm text-muted-foreground text-center py-8">Loading upcoming departures...</div>
        ) : displayedPackages.length === 0 ? (
          <div className="rounded-3xl border border-border bg-card p-12 text-center text-muted-foreground max-w-2xl mx-auto shadow-sm">
            <p className="font-semibold text-foreground text-lg">No upcoming departures available at the moment.</p>
            <p className="text-xs mt-2">Check back later or contact us directly on WhatsApp to inquire about custom batches.</p>
            <a
              href={`https://wa.me/${whatsappPhone}?text=Hi%20${encodeURIComponent(companyName)}%2C%20I%27d%20like%20to%20inquire%20about%20upcoming%20departure%20batches.`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-[oklch(0.62_0.16_150)] px-5 py-2.5 text-xs font-semibold text-white shadow-glow hover:opacity-95 transition mt-4"
            >
              Chat on WhatsApp
            </a>
          </div>
        ) : (
          <div className="grid gap-4">
            {displayedPackages.map(({ pkg: p, batch }) => {
              const isSoldOut = batch.status === "full" || (batch.booked_seats >= batch.max_seats && !batch.unlimited_seats);
              const seatsLeftVal = batch.max_seats - batch.booked_seats;

              return (
                <div
                  key={p.slug}
                  className="flex flex-col sm:flex-row sm:items-center gap-5 rounded-2xl bg-card border border-border p-5 shadow-card hover:shadow-elegant transition-shadow"
                >
                  <img
                    src={p.image}
                    alt={p.name}
                    loading="lazy"
                    className="h-24 w-full sm:w-36 rounded-xl object-cover shrink-0"
                  />
                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <h3 className="font-display text-lg font-bold text-foreground leading-tight">
                        {p.name}
                      </h3>
                      <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-primary">
                        {p.category === "trek" ? "Trek" : "Trip"}
                      </span>
                    </div>

                    <div className="text-xs text-muted-foreground flex flex-wrap items-center gap-2">
                      <span>{p.duration}</span>
                      <span>•</span>
                      <span>Departs {formatIndexBatchDate(batch.start_date)}</span>
                    </div>

                    {/* Dynamic Seat Availability Indicator */}
                    <div className="text-xs flex items-center gap-1.5 font-semibold pt-1">
                      {isSoldOut ? (
                        <span className="text-red-600 flex items-center gap-1.5">
                          <span className="h-1.5 w-1.5 rounded-full bg-red-600" /> Sold Out
                        </span>
                      ) : seatsLeftVal < 5 ? (
                        <span className="text-amber-600 flex items-center gap-1.5">
                          <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" /> Only {seatsLeftVal} Seats Left
                        </span>
                      ) : (
                        <span className="text-green-600 flex items-center gap-1.5">
                          <span className="h-1.5 w-1.5 rounded-full bg-green-500" /> {batch.unlimited_seats ? "Seats Available" : `${seatsLeftVal} Seats Left`}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="text-left sm:text-right shrink-0">
                    <div className="font-display text-xl font-bold text-primary">
                      {p.priceLabel}
                    </div>
                    <div className="text-[11px] uppercase tracking-wider text-muted-foreground">
                      per person
                    </div>
                  </div>

                  <div className="shrink-0 sm:pl-4">
                    {isSoldOut ? (
                      <a
                        href={`https://wa.me/${whatsappPhone}?text=Hi%20${encodeURIComponent(companyName)}%2C%20I%20would%20like%20to%20join%20the%20next%20available%20batch%20for%20${encodeURIComponent(p.name)}.`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center gap-1.5 rounded-full bg-[oklch(0.62_0.16_150)] text-white px-5 py-3 text-xs font-semibold shadow-glow hover:opacity-95 transition text-center min-w-[130px]"
                      >
                        Join via WhatsApp
                      </a>
                    ) : (
                      <Link
                        to="/packages/$slug"
                        params={{ slug: p.slug }}
                        className="inline-flex items-center justify-center gap-1.5 rounded-full bg-[var(--gradient-ember)] text-ember-foreground px-5 py-3 text-xs font-semibold shadow-glow hover:opacity-90 transition text-center min-w-[130px]"
                      >
                        View Details <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
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

  const renderCustomizeYourTrip = () => (
    <section className="py-20 sm:py-28 bg-card border-y border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary">
            <Sparkles className="h-3.5 w-3.5" /> Didn't find a suitable trip?
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-foreground">
            ✨ Customize Your Trip
          </h2>
          <p className="text-base text-muted-foreground leading-relaxed">
            Planning a special trip with your family, partner or friends? Tell us your budget, travel dates and requirements, and our travel experts will design a completely personalized trip exclusively for you.
          </p>
        </div>

        {/* Perfect For Grid */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {[
            { title: "Family Trips", emoji: "👨‍👩‍👧‍👦", desc: "Warm & comfortable" },
            { title: "Couple Getaways", emoji: "❤️", desc: "Private & romantic" },
            { title: "Friends Group Trips", emoji: "👥", desc: "Bonfires & fun" },
            { title: "College Tours", emoji: "🎓", desc: "Budget friendly" },
            { title: "Custom Adventure Trips", emoji: "🏔️", desc: "Offbeat trails" },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-border bg-background p-5 text-center shadow-sm hover:border-primary/40 hover:shadow-md transition-all"
            >
              <div className="text-3xl mb-2">{item.emoji}</div>
              <div className="font-display text-sm font-bold text-foreground">{item.title}</div>
              <div className="text-[11px] text-muted-foreground mt-0.5">{item.desc}</div>
            </div>
          ))}
        </div>

        {/* Subheading & CTA */}
        <div className="mt-12 rounded-3xl bg-mist border border-border p-8 text-center max-w-3xl mx-auto space-y-4 shadow-sm">
          <div className="space-y-1">
            <h3 className="font-display text-xl font-bold text-foreground">
              Need help planning your trip?
            </h3>
            <p className="text-xs text-muted-foreground">
              Our travel experts will contact you within 24 hours with a personalized itinerary and quotation.
            </p>
          </div>
          <div>
            <Link
              to="/customize"
              className="inline-flex items-center gap-2 rounded-full bg-[var(--gradient-ember)] px-8 py-3.5 text-sm font-semibold text-ember-foreground shadow-glow hover:scale-[1.02] transition-transform"
            >
              Plan My Trip <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
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
    customize: renderCustomizeYourTrip,
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
