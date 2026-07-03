import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import hero from "@/assets/gallery-camping.jpg";
import { usePackages, inclusions } from "@/lib/packages";
import { z } from "zod";
import { useEffect, useMemo, useState } from "react";
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

type Departure = {
  id: string;
  package_slug: string;
  start_date: string;
  end_date: string;
  max_seats: number;
  booked_seats: number;
  status: string;
  created_at: string;
};

function formatBatchDates(startStr: string, endStr: string) {
  const start = new Date(startStr);
  const end = new Date(endStr);
  const startDay = start.toLocaleDateString("en-IN", { day: "numeric" });
  const startMonth = start.toLocaleDateString("en-IN", { month: "short" });
  const endDay = end.toLocaleDateString("en-IN", { day: "numeric" });
  const endMonth = end.toLocaleDateString("en-IN", { month: "short" });

  if (startMonth === endMonth) {
    return `${startDay} - ${endDay} ${startMonth}`;
  } else {
    return `${startDay} ${startMonth} - ${endDay} ${endMonth}`;
  }
}

function BookPage() {
  const { packages } = usePackages();
  const search = Route.useSearch();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState<{ id: string; name: string } | null>(null);

  const [departures, setDepartures] = useState<Departure[]>([]);
  const [loadingDepartures, setLoadingDepartures] = useState(true);
  const [selectedPkgSlug, setSelectedPkgSlug] = useState(search.pkg ?? "");
  const [selectedTravelDate, setSelectedTravelDate] = useState("");

  const [couponCode, setCouponCode] = useState("");
  const [checkingCoupon, setCheckingCoupon] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState<{
    id: string;
    code: string;
    discount_type: "percentage" | "fixed";
    discount_value: number;
  } | null>(null);
  const [couponError, setCouponError] = useState<string | null>(null);
  const [numTravelers, setNumTravelers] = useState(2);

  async function applyCoupon() {
    if (!couponCode.trim()) return;
    setCheckingCoupon(true);
    setCouponError(null);
    try {
      const codeUpper = couponCode.trim().toUpperCase();
      const { data, error } = await supabase
        .from("coupons")
        .select("*")
        .eq("code", codeUpper)
        .eq("status", "active")
        .maybeSingle();

      if (error || !data) {
        setCouponError("Invalid or inactive coupon code.");
        setAppliedCoupon(null);
        return;
      }

      if (data.expiry_date && new Date(data.expiry_date) < new Date()) {
        setCouponError("This coupon code has expired.");
        setAppliedCoupon(null);
        return;
      }

      if (data.max_uses && data.used_count >= data.max_uses) {
        setCouponError("This coupon code limit has been reached.");
        setAppliedCoupon(null);
        return;
      }

      const pkg = packages.find((p) => p.slug === selectedPkgSlug);
      const bookingTotal = pkg ? pkg.price * numTravelers : 0;
      if (data.min_booking_amount && bookingTotal < data.min_booking_amount) {
        setCouponError(`Min booking amount for this coupon is Rs. ${data.min_booking_amount}.`);
        setAppliedCoupon(null);
        return;
      }

      setAppliedCoupon({
        id: data.id,
        code: data.code,
        discount_type: data.discount_type,
        discount_value: data.discount_value,
      });
      toast.success("Coupon code applied successfully!");
    } catch (err) {
      console.error(err);
      setCouponError("Error checking coupon.");
    } finally {
      setCheckingCoupon(false);
    }
  }

  useEffect(() => {
    async function getDepartures() {
      const todayDate = new Date().toISOString().split("T")[0];
      const { data, error } = await supabase
        .from("departures")
        .select("*")
        .gte("start_date", todayDate)
        .neq("status", "cancelled")
        .order("start_date", { ascending: true });
      if (error) {
        console.error(error);
        toast.error("Failed to load departure dates");
      } else {
        setDepartures((data as Departure[]) ?? []);
      }
      setLoadingDepartures(false);
    }
    getDepartures();
  }, []);

  const availableDepartures = useMemo(() => {
    return departures.filter((d) => d.package_slug === selectedPkgSlug);
  }, [departures, selectedPkgSlug]);

  const selectedDeparture = useMemo(() => {
    return availableDepartures.find((d) => d.start_date === selectedTravelDate);
  }, [availableDepartures, selectedTravelDate]);

  const seatsLeft = selectedDeparture
    ? selectedDeparture.max_seats - selectedDeparture.booked_seats
    : 15;

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
    const pkg = packages.find((p) => p.slug === parsed.data.package_slug);
    if (!pkg) {
      toast.error("Please pick a valid package");
      return;
    }

    // Additional client-side validation for quota
    if (parsed.data.travelers > seatsLeft) {
      toast.error(`Only ${seatsLeft} seats left for this departure date.`);
      return;
    }

    const bookingId =
      typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
        ? crypto.randomUUID()
        : undefined;

    setSubmitting(true);
    try {
      const baseTotal = pkg.price * numTravelers;
      let discountAmount = 0;
      if (appliedCoupon) {
        if (appliedCoupon.discount_type === "percentage") {
          discountAmount = Math.round((baseTotal * appliedCoupon.discount_value) / 100);
        } else {
          discountAmount = appliedCoupon.discount_value;
        }
      }
      const finalTotal = Math.max(0, baseTotal - discountAmount);

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
        coupon_code: string | null;
        discount_amount: number;
        total_price: number;
      } = {
        full_name: parsed.data.full_name,
        phone: parsed.data.phone,
        email: parsed.data.email,
        package_slug: pkg.slug,
        package_name: pkg.name,
        travel_date: parsed.data.travel_date,
        travelers: parsed.data.travelers,
        special_requirements: parsed.data.special_requirements || null,
        coupon_code: appliedCoupon ? appliedCoupon.code : null,
        discount_amount: discountAmount,
        total_price: finalTotal,
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

      if (appliedCoupon) {
        const { data: cData } = await supabase
          .from("coupons")
          .select("used_count")
          .eq("id", appliedCoupon.id)
          .maybeSingle();
        if (cData) {
          await supabase
            .from("coupons")
            .update({ used_count: (cData.used_count || 0) + 1 })
            .eq("id", appliedCoupon.id);
        }
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
                value={selectedPkgSlug}
                onChange={(e) => {
                  setSelectedPkgSlug(e.target.value);
                  setSelectedTravelDate("");
                }}
                required
                className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring text-foreground"
              >
                <option value="" disabled>
                  Choose your adventure…
                </option>
                <optgroup label="Treks">
                  {packages
                    .filter((p) => p.category === "trek")
                    .map((p) => (
                      <option key={p.slug} value={p.slug}>
                        {p.name} · {p.priceLabel}
                      </option>
                    ))}
                </optgroup>
                <optgroup label="Trips">
                  {packages
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
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground font-semibold">
                  Travel Date
                </label>
                <select
                  name="travel_date"
                  value={selectedTravelDate}
                  onChange={(e) => setSelectedTravelDate(e.target.value)}
                  required
                  className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring text-foreground"
                >
                  <option value="" disabled>
                    {loadingDepartures
                      ? "Loading dates..."
                      : availableDepartures.length === 0
                        ? "No batches scheduled"
                        : "Choose a departure date…"}
                  </option>
                  {availableDepartures.map((d) => {
                    const remaining = d.max_seats - d.booked_seats;
                    const isFull = remaining <= 0 || d.status === "full";
                    return (
                      <option key={d.id} value={d.start_date} disabled={isFull}>
                        {formatBatchDates(d.start_date, d.end_date)}{" "}
                        {isFull ? "(Full)" : `(${remaining} seats left)`}
                      </option>
                    );
                  })}
                </select>
                {selectedPkgSlug &&
                  availableDepartures.length === 0 &&
                  !loadingDepartures && (
                    <p className="text-[11px] text-destructive mt-1.5 leading-normal">
                      No scheduled departures currently available for this
                      adventure. Please choose another package.
                    </p>
                  )}
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground font-semibold">
                  Number of Travelers
                </label>
                <input
                  name="travelers"
                  type="number"
                  min={1}
                  max={seatsLeft > 0 ? seatsLeft : 15}
                  value={numTravelers}
                  onChange={(e) => setNumTravelers(Math.max(1, Number(e.target.value)))}
                  required
                  className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring text-foreground"
                />
                {selectedDeparture && (
                  <p className="text-[11px] text-muted-foreground mt-1.5">
                    Maximum {seatsLeft} travelers allowed for this date.
                  </p>
                )}
              </div>
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

            {/* Coupon Code Section */}
            <div className="border-t border-border pt-5 space-y-3">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Apply Promo Code / Coupon
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. TREK10"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="w-full rounded-xl border border-input bg-background px-4 py-2 text-sm uppercase text-foreground placeholder:normal-case focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <button
                  type="button"
                  onClick={applyCoupon}
                  disabled={checkingCoupon || !couponCode.trim()}
                  className="rounded-xl bg-primary text-primary-foreground px-5 py-2 text-xs font-semibold hover:opacity-90 transition disabled:opacity-50 shrink-0 cursor-pointer"
                >
                  {checkingCoupon ? "Applying..." : "Apply Code"}
                </button>
              </div>
              {couponError && (
                <p className="text-xs text-red-500 font-semibold">{couponError}</p>
              )}
              {appliedCoupon && (
                <p className="text-xs text-green-600 font-bold flex items-center gap-1">
                  ✓ Code {appliedCoupon.code} applied! ({appliedCoupon.discount_type === "percentage" ? `${appliedCoupon.discount_value}% Off` : `Rs. ${appliedCoupon.discount_value} Off`})
                </p>
              )}
            </div>

            {/* Price breakdown details */}
            {selectedPkgSlug && (
              <div className="rounded-2xl bg-muted/20 border border-border p-5 space-y-2.5 text-sm text-foreground">
                <h4 className="font-bold text-xs uppercase text-muted-foreground tracking-wider mb-1">
                  Fare Summary
                </h4>
                {(() => {
                  const pkg = packages.find((p) => p.slug === selectedPkgSlug);
                  if (!pkg) return null;
                  const baseTotal = pkg.price * numTravelers;
                  let discount = 0;
                  if (appliedCoupon) {
                    if (appliedCoupon.discount_type === "percentage") {
                      discount = Math.round((baseTotal * appliedCoupon.discount_value) / 100);
                    } else {
                      discount = appliedCoupon.discount_value;
                    }
                  }
                  const final = Math.max(0, baseTotal - discount);
                  return (
                    <>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">{pkg.name} (x{numTravelers})</span>
                        <span className="font-semibold">Rs. {baseTotal}</span>
                      </div>
                      {appliedCoupon && (
                        <div className="flex justify-between text-green-600 font-semibold">
                          <span>Discount Applied ({appliedCoupon.code})</span>
                          <span>- Rs. {discount}</span>
                        </div>
                      )}
                      <div className="border-t border-border pt-2 mt-1.5 flex justify-between font-bold text-base text-primary">
                        <span>Total Payable</span>
                        <span>Rs. {final}</span>
                      </div>
                    </>
                  );
                })()}
              </div>
            )}

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
