import { Link } from "@tanstack/react-router";
import { ArrowRight, Clock, MapPin } from "lucide-react";
import type { Package } from "@/lib/packages";

export function PackageCard({ pkg }: { pkg: Package }) {
  return (
    <article className="group relative overflow-hidden rounded-3xl bg-card shadow-card hover-lift">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={pkg.image}
          alt={pkg.name}
          loading="lazy"
          width={1280}
          height={960}
          className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ridge/80 via-ridge/10 to-transparent" />
        <div className="absolute top-4 left-4 flex gap-2">
          <span className="rounded-full glass px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-ridge">
            {pkg.category === "trek" ? "Trek" : "Trip"}
          </span>
          {pkg.difficulty && (
            <span className="rounded-full bg-ember/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-ember-foreground">
              {pkg.difficulty}
            </span>
          )}
        </div>
        <div className="absolute bottom-4 left-5 right-5 text-white">
          <h3 className="font-display text-2xl font-bold leading-tight">
            {pkg.name}
          </h3>
          <div className="mt-1 flex items-center gap-3 text-xs text-white/80">
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" /> {pkg.duration}
            </span>
            <span className="inline-flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" /> Uttarakhand
            </span>
          </div>
        </div>
      </div>
      <div className="p-6">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {pkg.tagline}
        </p>
        <ul className="mt-4 grid grid-cols-2 gap-x-3 gap-y-1.5 text-xs text-foreground/80">
          {pkg.highlights.slice(0, 4).map((h) => (
            <li key={h} className="flex items-start gap-1.5">
              <span className="mt-1 h-1 w-1 rounded-full bg-ember shrink-0" />{" "}
              {h}
            </li>
          ))}
        </ul>
        <div className="mt-6 flex items-end justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
              From
            </p>
            <p className="font-display text-2xl font-bold text-primary">
              {pkg.priceLabel}
              <span className="text-xs font-medium text-muted-foreground">
                {" "}
                /person
              </span>
            </p>
          </div>
          <Link
            to="/book"
            search={{ pkg: pkg.slug }}
            className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2.5 text-xs font-semibold text-primary-foreground hover:bg-primary/90 transition"
          >
            Book Now <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}
