import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Clock,
  MapPin,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import type { Package } from "@/lib/packages";
import { useState } from "react";

export function PackageCard({ pkg }: { pkg: Package }) {
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const hasMultipleImages = !!pkg.images && pkg.images.length > 1;
  const currentImage = hasMultipleImages
    ? pkg.images![activeImageIdx]
    : pkg.image;

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (pkg.images) {
      setActiveImageIdx((prev) =>
        prev === 0 ? pkg.images!.length - 1 : prev - 1,
      );
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (pkg.images) {
      setActiveImageIdx((prev) =>
        prev === pkg.images!.length - 1 ? 0 : prev + 1,
      );
    }
  };

  return (
    <article className="group relative overflow-hidden rounded-3xl bg-card shadow-card hover-lift">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Link to="/packages/$slug" params={{ slug: pkg.slug }} className="block h-full w-full">
          <img
            src={currentImage}
            alt={pkg.name}
            loading="lazy"
            width={1280}
            height={960}
            className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
          />
        </Link>

        {/* Navigation Arrows */}
        {hasMultipleImages && (
          <>
            <button
              onClick={handlePrev}
              type="button"
              className="absolute left-3 top-1/2 -translate-y-1/2 z-20 flex h-8 w-8 items-center justify-center rounded-full glass border-none text-ridge hover:bg-white/30 transition opacity-0 group-hover:opacity-100 cursor-pointer"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={handleNext}
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 z-20 flex h-8 w-8 items-center justify-center rounded-full glass border-none text-ridge hover:bg-white/30 transition opacity-0 group-hover:opacity-100 cursor-pointer"
              aria-label="Next image"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}

        {/* Indicators */}
        {hasMultipleImages && (
          <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-20 flex gap-1.5">
            {pkg.images!.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setActiveImageIdx(idx);
                }}
                className={`h-1.5 rounded-full transition-all cursor-pointer ${
                  idx === activeImageIdx ? "bg-white w-3" : "bg-white/50 w-1.5"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-ridge/80 via-ridge/10 to-transparent pointer-events-none" />
        <div className="absolute top-4 left-4 flex gap-2 z-10">
          <span className="rounded-full glass px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-ridge">
            {pkg.category === "trek" ? "Trek" : "Trip"}
          </span>
          {pkg.difficulty && (
            <span className="rounded-full bg-ember/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-ember-foreground">
              {pkg.difficulty}
            </span>
          )}
        </div>
        <div className="absolute bottom-4 left-5 right-5 text-white z-10">
          <h3 className="font-display text-2xl font-bold leading-tight hover:text-ember transition-colors">
            <Link to="/packages/$slug" params={{ slug: pkg.slug }} className="text-white hover:text-ember transition-colors">
              {pkg.name}
            </Link>
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
        <div className="mt-6 flex items-center justify-between">
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
            <Link
              to="/packages/$slug"
              params={{ slug: pkg.slug }}
              className="block text-[10px] font-semibold text-muted-foreground hover:text-primary transition-colors mt-1"
            >
              View Details & Reviews
            </Link>
          </div>
          <Link
            to="/book"
            search={{ pkg: pkg.slug }}
            className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2.5 text-xs font-semibold text-primary-foreground hover:bg-primary/90 transition shadow-sm"
          >
            Book Now <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}
