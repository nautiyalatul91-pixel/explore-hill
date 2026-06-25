import { type ReactNode } from "react";

export function PageHero({
  eyebrow,
  title,
  subtitle,
  image,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  subtitle?: string;
  image: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative min-h-[70svh] flex items-end overflow-hidden">
      <img
        src={image}
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ridge/40 via-ridge/40 to-ridge/95" />
      <div className="absolute inset-0 bg-aurora opacity-40" />
      <div className="relative z-10 mx-auto max-w-7xl w-full px-4 sm:px-6 pt-40 pb-16 text-white">
        <span className="inline-flex items-center gap-2 rounded-full glass-dark px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-white/90 animate-fade-up">
          {eyebrow}
        </span>
        <h1 className="mt-6 font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] max-w-3xl animate-fade-up">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-5 max-w-2xl text-base sm:text-lg text-white/80 animate-fade-up">
            {subtitle}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}
