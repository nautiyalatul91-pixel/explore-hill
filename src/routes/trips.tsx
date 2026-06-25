import { createFileRoute } from "@tanstack/react-router";
import { trips } from "@/lib/packages";
import { PackageCard } from "@/components/site/PackageCard";
import { PageHero } from "@/components/site/PageHero";
import hero from "@/assets/trip-mahasu.jpg";
import { MapPin } from "lucide-react";

export const Route = createFileRoute("/trips")({
  head: () => ({
    meta: [
      { title: "Cultural & Spiritual Trips in Uttarakhand — Explore Hills" },
      {
        name: "description",
        content:
          "Village stays, temple yatras and cultural journeys across the hidden corners of Uttarakhand.",
      },
      { property: "og:title", content: "Cultural Trips — Explore Hills" },
      {
        property: "og:description",
        content: "Hanol, Mahasu Devta Yatra and more.",
      },
      { property: "og:image", content: hero },
      { property: "og:url", content: "/trips" },
    ],
    links: [{ rel: "canonical", href: "/trips" }],
  }),
  component: TripsPage,
});

function TripsPage() {
  const mahasu = trips.find((t) => t.slug === "mahasu-devta-yatra");
  return (
    <>
      <PageHero
        eyebrow="Cultural Trips"
        title={
          <>
            Soulful journeys through{" "}
            <span className="text-gradient">timeless villages</span>
          </>
        }
        subtitle="Slow travel, village hospitality and the rituals that shape Uttarakhand — designed for travelers who want to feel, not just see."
        image={hero}
      />
      <section className="py-20 sm:py-28 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 grid gap-6 sm:grid-cols-2">
          {trips.map((p) => (
            <PackageCard key={p.slug} pkg={p} />
          ))}
        </div>
      </section>
      {mahasu?.route && (
        <section className="py-20 sm:py-28 bg-mist">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ember">
              Featured route
            </p>
            <h2 className="mt-3 font-display text-4xl sm:text-5xl font-bold text-foreground">
              Mahasu Devta Yatra
            </h2>
            <p className="mt-3 text-muted-foreground max-w-2xl">
              A three-day circuit through ancient temples, riverside villages
              and sacred mountain trails.
            </p>
            <ol className="mt-10 relative border-l-2 border-dashed border-primary/30 pl-8 space-y-6">
              {mahasu.route.map((stop, i) => (
                <li key={stop + i} className="relative">
                  <span className="absolute -left-[42px] grid h-8 w-8 place-items-center rounded-full bg-[var(--gradient-brand)] text-white text-xs font-bold shadow-card">
                    {i + 1}
                  </span>
                  <div className="flex items-center gap-2 font-display text-xl font-semibold text-foreground">
                    <MapPin className="h-4 w-4 text-ember" /> {stop}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}
    </>
  );
}
