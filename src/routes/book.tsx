import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import hero from "@/assets/gallery-camping.jpg";
import { allPackages, inclusions } from "@/lib/packages";
import { z } from "zod";
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Check, Loader2, ShieldCheck } from "lucide-react";

const searchSchema = z.object({ pkg: z.string().optional() });

export const Route = createFileRoute("/book")({
  validateSearch: (s) => searchSchema.parse(s),
  head: () => ({
    meta: [
      { title: "Book Your Adventure — Explore Hills" },
      {
        name: "description",
        content:
          "Reserve your spot on an Explore Hills trek or cultural trip. Small groups, expert guides, all-inclusive packages.",
      },
      { property: "og:title", content: "Book Your Adventure — Explore Hills" },
      {
        property: "og:description",
        content: "Reserve a Himalayan adventure today.",
      },
      { property: "og:image", content: hero },
      { property: "og:url", content: "/book" },
    ],
    links: [{ rel: "canonical", href: "/book" }],
  }),
  component: BookPage,
});

const formSchema = z.object({
  full_name: z.string().trim().min(2, "Full name is required").max(100),
  phone: z
    .string()
    .trim()
    .regex(/^[+\d\s-]{7,20}$/, "Enter a valid phone number"),
  email: z.string().trim().email("Enter a valid email").max(255),
  package_slug: z.string().min(1, "Choose a package"),
  travel_date: z.string().min(1, "Pick a date"),
  travelers: z.coerce.number().int().min(1).max(50),
  special_requirements: z
    .string()
    .trim()
    .max(1000)
    .optional()
    .or(z.literal("")),
});

function BookPage() {
  const search = Route.useSearch();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState<{ id: string; name: string } | null>(null);
  const today = new Date().toISOString().split("T")[0];

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const raw = Object.fromEntries(fd.entries());
    const parsed = formSchema.safeParse(raw);
    if (!parsed.success) {
      toast.error(
        parsed.error.issues[0]?.message ?? "Please check your details",
      );
      return;
    }
    const pkg = allPackages.find((p) => p.slug === parsed.data.package_slug);
    if (!pkg) {
      toast.error("Please pick a valid package");
      return;
    }
    const bookingId =
      typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
        ? crypto.randomUUID()
        : undefined;

    setSubmitting(true);
    try {
      const payload: {
        id?: string;
        full_name: string;
        phone: string;
        email: string;
        package_slug: string;
        package_name: string;
        travel_date: string;
        travelers: number;
        special_requirements: string | null;
      } = {
        full_name: parsed.data.full_name,
        phone: parsed.data.phone,
        email: parsed.data.email,
        package_slug: pkg.slug,
        package_name: pkg.name,
        travel_date: parsed.data.travel_date,
        travelers: parsed.data.travelers,
        special_requirements: parsed.data.special_requirements || null,
      };

      if (bookingId) {
        payload.id = bookingId;
      }

      const { error } = await supabase.from("bookings").insert(payload);

      if (error) {
        console.error(error);
        toast.error("Could not submit booking: " + error.message);
        return;
      }
      toast.success("Booking received! We'll confirm on WhatsApp shortly.");
      setDone({ id: bookingId || "Pending", name: pkg.name });
    } catch (err) {
      console.error(err);
      toast.error(
        err instanceof Error
          ? err.message
          : "An unexpected error occurred. Please try WhatsApp.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <section className="min-h-[100svh] flex items-center justify-center bg-aurora text-white px-4 pt-28 pb-20">
        <div className="max-w-xl w-full rounded-3xl glass-dark p-10 text-center shadow-elegant">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[var(--gradient-ember)] text-ember-foreground shadow-glow">
            <Check className="h-8 w-8" />
          </div>
          <h1 className="mt-6 font-display text-4xl font-bold">You're in!</h1>
          <p className="mt-3 text-white/80">
            Your seat on{" "}
            <span className="font-semibold text-white">{done.name}</span> is
            reserved. Our team will reach out on WhatsApp within a few hours to
            confirm details and payment.
          </p>
          <p className="mt-2 text-xs text-white/50">
            Booking ID: {done.id.slice(0, 8)}
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="https://wa.me/916397710701"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-white text-ridge px-6 py-3 text-sm font-semibold"
            >
              Chat on WhatsApp
            </a>
            <button
              onClick={() => navigate({ to: "/" })}
              className="inline-flex items-center justify-center rounded-full bg-white/10 border border-white/20 px-6 py-3 text-sm font-semibold"
            >
              Back home
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <PageHero
        eyebrow="Book Your Adventure"
        title={
          <>
            Reserve your <span className="text-gradient">Himalayan</span> spot
          </>
        }
        subtitle="Fill in your details below. Our team will confirm on WhatsApp within hours and walk you through payment."
        image={hero}
      />

      <section className="py-20 sm:py-28 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 grid lg:grid-cols-[1.5fr_1fr] gap-8">
          <form
            onSubmit={onSubmit}
            className="rounded-3xl bg-card border border-border p-7 sm:p-10 shadow-card space-y-5"
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <Field
                label="Full Name"
                name="full_name"
                placeholder="Atul Nautiyal"
                required
              />
              <Field
                label="Phone Number"
                name="phone"
                placeholder="+91 98XXXXXXXX"
                type="tel"
                required
              />
            </div>
            <Field
              label="Email Address"
              name="email"
              type="email"
              placeholder="you@example.com"
              required
            />

            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Trek / Trip
              </label>
              <select
                name="package_slug"
                defaultValue={search.pkg ?? ""}
                required
                className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="" disabled>
                  Choose your adventure…
                </option>
                <optgroup label="Treks">
                  {allPackages
                    .filter((p) => p.category === "trek")
                    .map((p) => (
                      <option key={p.slug} value={p.slug}>
                        {p.name} · {p.priceLabel}
                      </option>
                    ))}
                </optgroup>
                <optgroup label="Trips">
                  {allPackages
                    .filter((p) => p.category === "trip")
                    .map((p) => (
                      <option key={p.slug} value={p.slug}>
                        {p.name} · {p.priceLabel}
                      </option>
                    ))}
                </optgroup>
              </select>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <Field
                label="Travel Date"
                name="travel_date"
                type="date"
                min={today}
                required
              />
              <Field
                label="Number of Travelers"
                name="travelers"
                type="number"
                min={1}
                max={15}
                defaultValue="2"
                required
              />
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Special Requirements
              </label>
              <textarea
                name="special_requirements"
                rows={4}
                placeholder="Dietary needs, fitness concerns, special occasions…"
                className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--gradient-ember)] px-6 py-4 text-sm font-semibold text-ember-foreground shadow-glow disabled:opacity-60"
            >
              {submitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Booking…
                </>
              ) : (
                "Confirm Booking"
              )}
            </button>
            <p className="text-xs text-muted-foreground text-center flex items-center justify-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5" /> Your details are safe with
              us. No payment required to reserve.
            </p>
          </form>

          <aside className="space-y-5">
            <div className="rounded-3xl bg-ridge text-white p-7 relative overflow-hidden">
              <div
                className="absolute inset-0 bg-aurora opacity-60"
                aria-hidden
              />
              <div className="relative">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ember">
                  What's included
                </p>
                <h3 className="mt-3 font-display text-2xl font-bold">
                  Every trip comes with
                </h3>
                <ul className="mt-5 space-y-3">
                  {inclusions.map((i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-sm text-white/85"
                    >
                      <span className="grid h-6 w-6 place-items-center rounded-full bg-[var(--gradient-ember)] text-ember-foreground shrink-0">
                        <Check className="h-3.5 w-3.5" />
                      </span>
                      {i}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="rounded-3xl bg-card border border-border p-7 shadow-card">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ember">
                Group size
              </p>
              <h3 className="mt-3 font-display text-2xl font-bold text-foreground">
                14–15 travelers per batch
              </h3>
              <p className="mt-3 text-sm text-muted-foreground">
                Just enough to make friends, small enough to keep the trail
                peaceful.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}

function Field({
  label,
  ...props
}: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </label>
      <input
        {...props}
        className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
      />
    </div>
  );
}
