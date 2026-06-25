import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import hero from "@/assets/gallery-bonfire.jpg";
import bonfire from "@/assets/gallery-bonfire.jpg";
import camping from "@/assets/gallery-camping.jpg";
import food from "@/assets/gallery-food.jpg";
import group from "@/assets/gallery-group.jpg";
import himalayas from "@/assets/hero-himalayas.jpg";
import moila from "@/assets/trek-moila.jpg";
import nagtibba from "@/assets/trek-nagtibba.jpg";
import yulla from "@/assets/trek-yulla.jpg";
import kedarkantha from "@/assets/trek-kedarkantha.jpg";
import hanol from "@/assets/trip-hanol.jpg";
import mahasu from "@/assets/trip-mahasu.jpg";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Himalayan Moments | Explore Hills" },
      {
        name: "description",
        content:
          "A visual journey through our Himalayan adventures — mountains, villages, bonfires and people.",
      },
      { property: "og:title", content: "Gallery — Explore Hills" },
      {
        property: "og:description",
        content:
          "Mountains, villages, bonfires and the people who make our trips magical.",
      },
      { property: "og:image", content: hero },
      { property: "og:url", content: "/gallery" },
    ],
    links: [{ rel: "canonical", href: "/gallery" }],
  }),
  component: GalleryPage,
});

const items = [
  {
    src: himalayas,
    alt: "Snow capped Himalayan peaks",
    tag: "Himalayas",
    span: "row-span-2",
  },
  { src: bonfire, alt: "Group around bonfire", tag: "Bonfire night" },
  {
    src: camping,
    alt: "Tents under Milky Way",
    tag: "Camping",
    span: "row-span-2",
  },
  { src: food, alt: "Local food being served", tag: "Local food" },
  { src: group, alt: "Trekking group on trail", tag: "Group travel" },
  { src: moila, alt: "Forest trail", tag: "Moila Top" },
  { src: kedarkantha, alt: "Snow trek", tag: "Kedarkantha" },
  { src: nagtibba, alt: "Mountain sunrise", tag: "Nag Tibba" },
  { src: yulla, alt: "Mountain temple", tag: "Yulla Kanda" },
  { src: hanol, alt: "Village houses", tag: "Hanol village" },
  { src: mahasu, alt: "Mahasu Devta Temple", tag: "Mahasu Temple" },
];

function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title={
          <>
            Frames from the <span className="text-gradient">trail</span>
          </>
        }
        subtitle="Mountains, villages, bonfires and the people who make our trips unforgettable."
        image={hero}
      />
      <section className="py-20 sm:py-28 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[180px] sm:auto-rows-[220px] gap-3">
            {items.map((it, i) => (
              <figure
                key={i}
                className={`group relative overflow-hidden rounded-2xl shadow-card hover-lift ${it.span ?? ""}`}
              >
                <img
                  src={it.src}
                  alt={it.alt}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1500ms] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ridge/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <figcaption className="absolute bottom-3 left-3 right-3 text-xs font-semibold uppercase tracking-wider text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  {it.tag}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
