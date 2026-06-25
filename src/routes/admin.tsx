import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { PageHero } from "@/components/site/PageHero";
import hero from "@/assets/hero-himalayas.jpg";
import {
  CalendarDays,
  Loader2,
  LogOut,
  Search,
  ShieldAlert,
  Users,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Dashboard — Explore Hills" },
      { name: "description", content: "Internal dashboard." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminPage,
});

type Booking = {
  id: string;
  full_name: string;
  phone: string;
  email: string;
  package_slug: string;
  package_name: string;
  travel_date: string;
  travelers: number;
  special_requirements: string | null;
  status: string;
  created_at: string;
};

type AuthState = "loading" | "signed-out" | "not-admin" | "admin";

function AdminPage() {
  const [auth, setAuth] = useState<AuthState>("loading");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    let active = true;
    async function check() {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) {
        if (active) setAuth("signed-out");
        return;
      }
      const { data: roles } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", userData.user.id);
      const isAdmin = roles?.some((r) => r.role === "admin");
      if (active) setAuth(isAdmin ? "admin" : "not-admin");
    }
    check();
    const { data: sub } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_IN" || event === "SIGNED_OUT") check();
    });
    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (auth !== "admin") return;
    setLoading(true);
    supabase
      .from("bookings")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data, error }) => {
        setLoading(false);
        if (error) {
          toast.error("Failed to load bookings");
          return;
        }
        setBookings((data as Booking[]) ?? []);
      });
  }, [auth]);

  const filtered = useMemo(() => {
    return bookings.filter((b) => {
      if (statusFilter !== "all" && b.status !== statusFilter) return false;
      if (!query) return true;
      const q = query.toLowerCase();
      return (
        b.full_name.toLowerCase().includes(q) ||
        b.email.toLowerCase().includes(q) ||
        b.phone.toLowerCase().includes(q) ||
        b.package_name.toLowerCase().includes(q)
      );
    });
  }, [bookings, query, statusFilter]);

  const totalTravelers = useMemo(
    () => bookings.reduce((s, b) => s + b.travelers, 0),
    [bookings],
  );
  const upcoming = useMemo(
    () => bookings.filter((b) => new Date(b.travel_date) >= new Date()).length,
    [bookings],
  );
  const pending = useMemo(
    () => bookings.filter((b) => b.status === "pending").length,
    [bookings],
  );

  async function updateStatus(id: string, status: string) {
    const prev = bookings;
    setBookings((bs) => bs.map((b) => (b.id === id ? { ...b, status } : b)));
    const { error } = await supabase
      .from("bookings")
      .update({ status })
      .eq("id", id);
    if (error) {
      setBookings(prev);
      toast.error("Could not update");
    } else toast.success(`Marked ${status}`);
  }

  if (auth === "loading") {
    return (
      <div className="min-h-[100svh] grid place-items-center">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  if (auth === "signed-out") return <SignIn />;

  if (auth === "not-admin") {
    return (
      <section className="min-h-[100svh] grid place-items-center bg-background pt-32 pb-16 px-4">
        <div className="max-w-md text-center rounded-3xl bg-card border border-border p-10 shadow-card">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-destructive/10 text-destructive">
            <ShieldAlert className="h-6 w-6" />
          </div>
          <h1 className="mt-5 font-display text-2xl font-bold text-foreground">
            Admin access required
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Your account is signed in but doesn't have admin privileges. Ask
            Atul to grant you the admin role.
          </p>
          <button
            onClick={() => supabase.auth.signOut()}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-secondary px-5 py-2.5 text-sm font-semibold text-foreground"
          >
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        </div>
      </section>
    );
  }

  return (
    <>
      <PageHero
        eyebrow="Admin"
        title={
          <>
            Bookings <span className="text-gradient">control room</span>
          </>
        }
        subtitle="Live view of every booking submitted across the site."
        image={hero}
      />

      <section className="py-12 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 space-y-8">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Stat label="Total bookings" value={bookings.length.toString()} />
            <Stat
              label="Total travelers"
              value={totalTravelers.toString()}
              icon={<Users className="h-4 w-4" />}
            />
            <Stat
              label="Upcoming departures"
              value={upcoming.toString()}
              icon={<CalendarDays className="h-4 w-4" />}
            />
            <Stat label="Pending review" value={pending.toString()} highlight />
          </div>

          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search name, email, phone, package…"
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-input bg-card text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {["all", "pending", "confirmed", "cancelled"].map((s) => (
                <button
                  key={s}
                  onClick={() => setStatusFilter(s)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold capitalize transition ${
                    statusFilter === s
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-foreground hover:bg-accent"
                  }`}
                >
                  {s}
                </button>
              ))}
              <button
                onClick={() => supabase.auth.signOut()}
                className="ml-2 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-secondary text-foreground hover:bg-accent"
              >
                <LogOut className="h-3.5 w-3.5" /> Sign out
              </button>
            </div>
          </div>

          <div className="rounded-2xl bg-card border border-border shadow-card overflow-hidden">
            {loading ? (
              <div className="p-16 text-center">
                <Loader2 className="h-6 w-6 animate-spin text-primary mx-auto" />
              </div>
            ) : filtered.length === 0 ? (
              <div className="p-16 text-center text-muted-foreground text-sm">
                No bookings match.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-secondary text-xs uppercase tracking-wider text-muted-foreground">
                    <tr>
                      <th className="text-left p-4">Traveler</th>
                      <th className="text-left p-4">Package</th>
                      <th className="text-left p-4">Travel date</th>
                      <th className="text-left p-4">Pax</th>
                      <th className="text-left p-4">Status</th>
                      <th className="text-right p-4">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((b) => (
                      <tr
                        key={b.id}
                        className="border-t border-border align-top hover:bg-secondary/40"
                      >
                        <td className="p-4">
                          <div className="font-semibold text-foreground">
                            {b.full_name}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {b.email}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {b.phone}
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="font-medium text-foreground">
                            {b.package_name}
                          </div>
                          {b.special_requirements && (
                            <div className="text-xs text-muted-foreground mt-1 max-w-xs line-clamp-2">
                              {b.special_requirements}
                            </div>
                          )}
                        </td>
                        <td className="p-4 text-foreground">
                          {new Date(b.travel_date).toLocaleDateString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                        </td>
                        <td className="p-4 text-foreground">{b.travelers}</td>
                        <td className="p-4">
                          <span
                            className={`inline-block px-2.5 py-1 rounded-full text-[11px] font-semibold capitalize ${
                              b.status === "confirmed"
                                ? "bg-forest/15 text-forest"
                                : b.status === "cancelled"
                                  ? "bg-destructive/15 text-destructive"
                                  : "bg-ember/15 text-ember"
                            }`}
                          >
                            {b.status}
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <div className="inline-flex gap-2">
                            {b.status !== "confirmed" && (
                              <button
                                onClick={() => updateStatus(b.id, "confirmed")}
                                className="px-3 py-1.5 rounded-full text-xs font-semibold bg-forest text-forest-foreground hover:opacity-90"
                              >
                                Confirm
                              </button>
                            )}
                            {b.status !== "cancelled" && (
                              <button
                                onClick={() => updateStatus(b.id, "cancelled")}
                                className="px-3 py-1.5 rounded-full text-xs font-semibold bg-secondary text-foreground hover:bg-accent"
                              >
                                Cancel
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

function Stat({
  label,
  value,
  icon,
  highlight,
}: {
  label: string;
  value: string;
  icon?: React.ReactNode;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl p-6 border ${highlight ? "bg-[var(--gradient-ember)] text-ember-foreground border-transparent shadow-glow" : "bg-card border-border shadow-card"}`}
    >
      <div
        className={`flex items-center gap-2 text-xs uppercase tracking-wider ${highlight ? "text-ember-foreground/80" : "text-muted-foreground"}`}
      >
        {icon} {label}
      </div>
      <div
        className={`mt-3 font-display text-4xl font-bold ${highlight ? "text-ember-foreground" : "text-foreground"}`}
      >
        {value}
      </div>
    </div>
  );
}

function SignIn() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [busy, setBusy] = useState(false);

  async function handle(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const email = String(fd.get("email") ?? "").trim();
    const password = String(fd.get("password") ?? "");
    if (!email || !password) return toast.error("Email and password required");
    setBusy(true);
    if (mode === "signup") {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: window.location.origin + "/admin" },
      });
      setBusy(false);
      if (error) return toast.error(error.message);
      toast.success("Account created. Ask Atul to grant admin access.");
    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      setBusy(false);
      if (error) return toast.error(error.message);
      toast.success("Signed in");
    }
  }

  return (
    <section className="min-h-[100svh] grid place-items-center px-4 pt-32 pb-16 bg-aurora">
      <form
        onSubmit={handle}
        className="w-full max-w-md rounded-3xl glass-dark p-8 text-white shadow-elegant"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ember">
          Admin
        </p>
        <h1 className="mt-3 font-display text-3xl font-bold">
          {mode === "signin" ? "Sign in" : "Create account"}
        </h1>
        <p className="mt-2 text-sm text-white/70">
          Manage bookings and travelers.
        </p>
        <div className="mt-6 space-y-3">
          <input
            name="email"
            type="email"
            required
            placeholder="Email"
            className="w-full rounded-xl bg-white/10 border border-white/20 px-4 py-3 text-sm text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-ember"
          />
          <input
            name="password"
            type="password"
            required
            minLength={6}
            placeholder="Password"
            className="w-full rounded-xl bg-white/10 border border-white/20 px-4 py-3 text-sm text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-ember"
          />
        </div>
        <button
          disabled={busy}
          type="submit"
          className="mt-5 w-full rounded-xl bg-[var(--gradient-ember)] text-ember-foreground py-3 text-sm font-semibold shadow-glow disabled:opacity-60 inline-flex items-center justify-center gap-2"
        >
          {busy && <Loader2 className="h-4 w-4 animate-spin" />}
          {mode === "signin" ? "Sign in" : "Create account"}
        </button>
        <button
          type="button"
          onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
          className="mt-4 w-full text-xs text-white/70 hover:text-white"
        >
          {mode === "signin"
            ? "Need an account? Sign up"
            : "Have an account? Sign in"}
        </button>
      </form>
    </section>
  );
}
