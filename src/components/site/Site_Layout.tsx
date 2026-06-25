import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Menu,
  X,
  Mountain,
  Phone,
  Instagram,
  Mail,
  MessageCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/treks", label: "Treks" },
  { to: "/trips", label: "Trips" },
  { to: "/gallery", label: "Gallery" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-2.5 shrink-0">
      <span
        className={cn(
          "grid h-10 w-10 place-items-center rounded-xl shadow-card",
          light
            ? "bg-white/15 text-white"
            : "bg-primary text-primary-foreground",
        )}
      >
        <Mountain className="h-5 w-5" strokeWidth={2.2} />
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-lg font-bold tracking-tight",
            light ? "text-white" : "text-foreground",
          )}
        >
          Explore Hills
        </span>
        <span
          className={cn(
            "text-[10px] uppercase tracking-[0.18em]",
            light ? "text-white/70" : "text-muted-foreground",
          )}
        >
          Uttarakhand
        </span>
      </span>
    </Link>
  );
}

function Header() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled ? "py-2" : "py-4",
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div
          className={cn(
            "flex items-center justify-between rounded-2xl px-4 py-2.5 transition-all duration-500",
            scrolled
              ? "glass shadow-card"
              : "bg-white/10 backdrop-blur-md border border-white/15",
          )}
        >
          <Logo light={!scrolled} />
          <nav className="hidden lg:flex items-center gap-1">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "px-3.5 py-2 text-sm font-medium rounded-lg transition-colors",
                  scrolled
                    ? "text-foreground hover:bg-secondary"
                    : "text-white/90 hover:bg-white/15",
                )}
                activeProps={{
                  className: scrolled
                    ? "px-3.5 py-2 text-sm font-semibold rounded-lg bg-secondary text-primary"
                    : "px-3.5 py-2 text-sm font-semibold rounded-lg bg-white/20 text-white",
                }}
                activeOptions={{ exact: item.to === "/" }}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="hidden lg:block">
            <Link
              to="/book"
              className="inline-flex items-center gap-2 rounded-xl bg-[var(--gradient-ember)] px-5 py-2.5 text-sm font-semibold text-ember-foreground shadow-glow hover:opacity-95 transition"
            >
              Book Now
            </Link>
          </div>
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setOpen((o) => !o)}
            className={cn(
              "lg:hidden grid h-10 w-10 place-items-center rounded-lg",
              scrolled
                ? "text-foreground hover:bg-secondary"
                : "text-white hover:bg-white/15",
            )}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {open && (
          <div className="lg:hidden mt-2 rounded-2xl glass p-3 shadow-elegant animate-fade-up">
            <div className="flex flex-col gap-1">
              {NAV.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="px-4 py-3 rounded-lg text-sm font-medium text-foreground hover:bg-secondary"
                  activeProps={{
                    className:
                      "px-4 py-3 rounded-lg text-sm font-semibold bg-secondary text-primary",
                  }}
                  activeOptions={{ exact: item.to === "/" }}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                to="/book"
                className="mt-2 inline-flex items-center justify-center rounded-xl bg-[var(--gradient-ember)] px-5 py-3 text-sm font-semibold text-ember-foreground shadow-glow"
              >
                Book Your Adventure
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="relative bg-ridge text-white">
      <div
        className="absolute inset-0 bg-aurora opacity-60"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Logo light />
            <p className="text-sm text-white/70 max-w-xs">
              Authentic Himalayan adventures, small-group experiences and hidden
              destinations of Uttarakhand.
            </p>
          </div>
          <div>
            <h4 className="font-display text-base font-semibold mb-4">
              Explore
            </h4>
            <ul className="space-y-2 text-sm text-white/70">
              {NAV.map((n) => (
                <li key={n.to}>
                  <Link
                    to={n.to}
                    className="hover:text-white transition-colors"
                  >
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-display text-base font-semibold mb-4">
              Contact
            </h4>
            <ul className="space-y-3 text-sm text-white/70">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" /> +91 63977 10701
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" /> contact@explorehills.in
              </li>
              <li className="flex items-center gap-2">
                <Instagram className="h-4 w-4" /> @atul__nautiyal
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-display text-base font-semibold mb-4">
              Get in touch
            </h4>
            <div className="flex flex-col gap-3">
              <a
                href="https://wa.me/916397710701"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[oklch(0.62_0.16_150)] px-4 py-2.5 text-sm font-semibold text-white hover:opacity-95 transition"
              >
                <MessageCircle className="h-4 w-4" /> Chat on WhatsApp
              </a>
              <Link
                to="/book"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white text-ridge px-4 py-2.5 text-sm font-semibold hover:bg-white/90 transition"
              >
                Book Your Adventure
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/50">
          <p>
            © {new Date().getFullYear()} Explore Hills. Crafted in Uttarakhand
            by Atul Nautiyal.
          </p>
          <p>Travel responsibly. Leave only footprints.</p>
        </div>
      </div>
    </footer>
  );
}

function FloatingWhatsApp() {
  return (
    <a
      href="https://wa.me/916397710701?text=Hi%20Explore%20Hills%2C%20I%27d%20like%20to%20know%20more%20about%20your%20trips."
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 grid h-14 w-14 place-items-center rounded-full bg-[oklch(0.62_0.18_150)] text-white shadow-glow hover:scale-105 transition-transform animate-float"
    >
      <MessageCircle className="h-6 w-6" />
    </a>
  );
}

export function SiteLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <FloatingWhatsApp />
      <Toaster position="top-right" richColors closeButton />
    </div>
  );
}
