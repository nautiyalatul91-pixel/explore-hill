import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { PageHero } from "@/components/site/PageHero";
import hero from "@/assets/hero-himalayas.jpg";
import founder from "@/assets/founder.jpg";
import { Compass, HeartHandshake, Leaf, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Explore Hills — Founded by Atul Nautiyal" },
      {
        name: "description",
        content:
          "Explore Hills is an Uttarakhand-born travel startup building authentic Himalayan experiences, founded by Atul Nautiyal.",
      },
      { property: "og:title", content: "About Explore Hills" },
      {
        property: "og:description",
        content: "Our story, mission and the team behind the hills.",
      },
      { property: "og:image", content: hero },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

const values = [
  {
    icon: Leaf,
    title: "Responsible",
    text: "Low-impact itineraries that respect mountain ecosystems and local culture.",
  },
  {
    icon: HeartHandshake,
    title: "Community-first",
    text: "Every trip directly supports village families, homestays and local guides.",
  },
  {
    icon: Sparkles,
    title: "Authentic",
    text: "Real food, real people, real Uttarakhand — never staged, never generic.",
  },
  {
    icon: Compass,
    title: "Curated",
    text: "Small groups, hidden routes and itineraries we'd run for our own families.",
  },
];

function AboutPage() {
  const [content, setContent] = useState<any>(null);

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from("settings")
        .select("*")
        .eq("key", "static_pages")
        .maybeSingle();
      if (data && typeof data.value === "object" && data.value !== null) {
        const val = data.value as any;
        if (val.about) setContent(val.about);
      }
    }
    load();
  }, []);

  return (
    <>
      <PageHero
        eyebrow="Our Story"
        title={
          content?.title ? content.title : (
            <>
              Born in the hills, built for{" "}
              <span className="text-gradient">travelers</span>
            </>
          )
        }
        subtitle={content?.subtitle || "Explore Hills is a young Uttarakhand-based travel startup on a mission to share the real Himalayas with the world — one small group at a time."}
        image={hero}
      />

      <section className="py-20 sm:py-28 bg-background">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="absolute -inset-4 bg-[var(--gradient-brand)] opacity-20 blur-3xl rounded-3xl" />
            <img
              src={founder}
              alt="Atul Nautiyal, founder of Explore Hills"
              loading="lazy"
              className="relative rounded-3xl shadow-elegant w-full"
            />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ember">
              Founder
            </p>
            <h2 className="mt-3 font-display text-4xl sm:text-5xl font-bold text-foreground">
              Atul Nautiyal
            </h2>
            <p className="mt-6 text-muted-foreground leading-relaxed">
              Growing up in the lap of the Garhwal Himalayas, Atul always knew
              the mountains had stories most travelers never heard. After years
              of guiding friends through hidden valleys, ancient temples and
              family-run village homestays, he built Explore Hills to make these
              experiences accessible — without losing what makes them special.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Today, Explore Hills runs small-group treks, cultural trips and
              spiritual journeys across Uttarakhand, all anchored in local
              communities and responsible tourism. We're not a tour operator —
              we're hosts in our own home.
            </p>
            <blockquote className="mt-8 rounded-2xl bg-secondary p-6 border-l-4 border-ember">
              <p className="font-display text-lg text-foreground italic">
                "The hills don't need to be conquered. They need to be listened
                to."
              </p>
              <footer className="mt-3 text-sm text-muted-foreground">
                — Atul Nautiyal, Founder
              </footer>
            </blockquote>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28 bg-ridge text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-aurora opacity-60" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl glass-dark p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ember">
              Mission
            </p>
            <h3 className="mt-3 font-display text-3xl font-bold">
              Authentic, responsible, unforgettable.
            </h3>
            <p className="mt-4 text-white/75">
              {content?.mission || "To open Uttarakhand's hidden corners to travelers in a way that uplifts local communities, protects fragile ecosystems and leaves every guest with a story worth telling."}
            </p>
          </div>
          <div className="rounded-3xl glass-dark p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ember">
              Vision
            </p>
            <h3 className="mt-3 font-display text-3xl font-bold">
              A new chapter for mountain tourism.
            </h3>
            <p className="mt-4 text-white/75">
              {content?.vision || "To become India's most trusted small-group Himalayan travel brand — a name travelers, villages and the mountains themselves can rely on."}
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ember">
              Our Values
            </p>
            <h2 className="mt-3 font-display text-4xl sm:text-5xl font-bold text-foreground">
              What we stand for
            </h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="rounded-2xl bg-card border border-border p-6 shadow-card hover-lift"
              >
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-[var(--gradient-brand)] text-white">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 font-display text-xl font-semibold text-foreground">
                  {title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">{text}</p>
              </div>
            ))}
          </div>
          <div className="mt-14 text-center">
            <Link
              to="/book"
              className="inline-flex items-center gap-2 rounded-full bg-[var(--gradient-ember)] px-7 py-3.5 text-sm font-semibold text-ember-foreground shadow-glow"
            >
              Travel with us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
