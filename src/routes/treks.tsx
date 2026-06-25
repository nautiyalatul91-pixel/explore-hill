import { createFileRoute } from "@tanstack/react-router";
import { treks } from "@/lib/packages";
import { PackageCard } from "@/components/site/PackageCard";
import { PageHero } from "@/components/site/PageHero";
import hero from "@/assets/trek-kedarkantha.jpg";

export const Route = createFileRoute("/treks")({
  head: () => ({
    meta: [
      { title: "Himalayan Treks in Uttarakhand — Explore Hills" },
      {
        name: "description",
        content:
          "Small-group Himalayan treks: Kedarkantha, Moila Top, Nag Tibba and Yulla Kanda. Camping, bonfires and certified guides included.",
      },
      { property: "og:title", content: "Himalayan Treks — Explore Hills" },
      {
        property: "og:description",
        content: "Beginner to moderate treks across Uttarakhand.",
      },
      { property: "og:image", content: hero },
      { property: "og:url", content: "/treks" },
    ],
    links: [{ rel: "canonical", href: "/treks" }],
  }),
  component: TreksPage,
});

function TreksPage() {
  return (
    <>
      <PageHero
        eyebrow="Treks"
        title={
          <>
            Walk into the <span className="text-gradient">wild Himalayas</span>
          </>
        }
        subtitle="From beginner-friendly weekend climbs to soulful summit pushes — every trek is led by experienced guides and built around small groups."
        image={hero}
      />
      <section className="py-20 sm:py-28 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {treks.map((p) => (
            <PackageCard key={p.slug} pkg={p} />
          ))}
        </div>
      </section>
    </>
  );
}
