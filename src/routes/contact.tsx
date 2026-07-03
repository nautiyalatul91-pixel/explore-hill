import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import hero from "@/assets/trip-hanol.jpg";
import founder from "@/assets/founder.jpg";
import { Instagram, Mail, MessageCircle, Phone } from "lucide-react";
import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Explore Hills — Talk to Atul" },
      {
        name: "description",
        content:
          "Reach Explore Hills via WhatsApp, Instagram, call or email. Founder Atul Nautiyal personally answers every message.",
      },
      { property: "og:title", content: "Contact Explore Hills" },
      {
        property: "og:description",
        content:
          "WhatsApp +91 6397710701 · @atul__nautiyal · contact@explorehills.in",
      },
      { property: "og:image", content: hero },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

const schema = z.object({
  name: z.string().trim().min(2, "Enter your name").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  message: z.string().trim().min(5, "Tell us a little more").max(1000),
});

function ContactPage() {
  const [submitting, setSubmitting] = useState(false);
  const [company, setCompany] = useState<any>(null);
  const [pageSettings, setPageSettings] = useState<any>(null);

  useEffect(() => {
    async function load() {
      const { data: comp } = await supabase
        .from("settings")
        .select("*")
        .eq("key", "company_settings")
        .maybeSingle();
      if (comp && typeof comp.value === "object" && comp.value !== null) {
        setCompany(comp.value);
      }

      const { data: page } = await supabase
        .from("settings")
        .select("*")
        .eq("key", "static_pages")
        .maybeSingle();
      if (page && page.value?.contact) {
        setPageSettings(page.value.contact);
      }
    }
    load();
  }, []);

  const phone = company?.phone || "+91 63977 10701";
  const email = company?.email || "contact@explorehills.in";
  const instagram = company?.social_instagram || "https://instagram.com/atul__nautiyal";
  const instagramHandle = instagram.split("/").pop() || "atul__nautiyal";
  const targetPhone = (company?.whatsapp || company?.phone || "+91 63977 10701").replace(/[^0-9]/g, "");

  const founderName = company?.founder_name || "Atul Nautiyal";
  const founderTitle = company?.founder_title || "Replies to every traveler personally.";
  const founderImg = company?.founder_image || founder;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const parsed = schema.safeParse({
      name: fd.get("name"),
      email: fd.get("email"),
      message: fd.get("message"),
    });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please check the form");
      return;
    }
    setSubmitting(true);
    try {
      await supabase.from("leads").insert({
        name: parsed.data.name,
        email: parsed.data.email,
        message: parsed.data.message,
        lead_source: "website_contact_form",
        lead_status: "new",
      });
    } catch (err) {
      console.error("Error storing lead:", err);
    }
    const text = `Hi Explore Hills! I'm ${parsed.data.name} (${parsed.data.email}). ${parsed.data.message}`;
    const url = `https://wa.me/${targetPhone}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    toast.success("Opening WhatsApp — we'll reply within hours.");
    (e.target as HTMLFormElement).reset();
    setSubmitting(false);
  }

  return (
    <>
      <PageHero
        eyebrow="Get in touch"
        title={
          pageSettings?.title ? pageSettings.title : (
            <>
              Let's plan your <span className="text-gradient">Himalayan story</span>
            </>
          )
        }
        subtitle={pageSettings?.subtitle || "Call, message or write — we usually reply within a few hours. Atul personally answers every WhatsApp."}
        image={pageSettings?.image || hero}
      />

      <section className="py-20 sm:py-28 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 grid lg:grid-cols-2 gap-12">
          <div className="space-y-4">
            <a
              href={`https://wa.me/${targetPhone}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-4 rounded-2xl bg-[oklch(0.62_0.16_150)] text-white p-5 shadow-glow hover:opacity-95 transition"
            >
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-white/15">
                <MessageCircle className="h-5 w-5" />
              </span>
              <div className="flex-1">
                <div className="font-semibold">Chat on WhatsApp</div>
                <div className="text-xs text-white/80">
                  {phone} · Instant reply
                </div>
              </div>
              <span className="text-sm font-semibold">Open →</span>
            </a>
            <a
              href={`tel:${targetPhone}`}
              className="flex items-center gap-4 rounded-2xl bg-card border border-border p-5 shadow-card hover-lift"
            >
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-primary text-primary-foreground">
                <Phone className="h-5 w-5" />
              </span>
              <div className="flex-1">
                <div className="font-semibold text-foreground">Call Now</div>
                <div className="text-xs text-muted-foreground">
                  {phone} · Mon–Sun 9 AM – 9 PM
                </div>
              </div>
              <span className="text-sm font-semibold text-primary">Dial →</span>
            </a>
            <a
              href={instagram}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-4 rounded-2xl bg-card border border-border p-5 shadow-card hover-lift"
            >
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-[var(--gradient-ember)] text-ember-foreground">
                <Instagram className="h-5 w-5" />
              </span>
              <div className="flex-1">
                <div className="font-semibold text-foreground">
                  Follow on Instagram
                </div>
                <div className="text-xs text-muted-foreground">
                  {instagramHandle.startsWith("@") ? instagramHandle : `@${instagramHandle}`} · Stories from the trail
                </div>
              </div>
              <span className="text-sm font-semibold text-primary">
                Follow →
              </span>
            </a>
            <a
              href={`mailto:${email}`}
              className="flex items-center gap-4 rounded-2xl bg-card border border-border p-5 shadow-card hover-lift"
            >
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-forest text-forest-foreground">
                <Mail className="h-5 w-5" />
              </span>
              <div className="flex-1">
                <div className="font-semibold text-foreground">Email Us</div>
                <div className="text-xs text-muted-foreground">
                  {email}
                </div>
              </div>
              <span className="text-sm font-semibold text-primary">
                Write →
              </span>
            </a>

            <div className="mt-8 rounded-3xl overflow-hidden bg-ridge text-white relative">
              <div
                className="absolute inset-0 bg-aurora opacity-60"
                aria-hidden
              />
              <div className="relative p-6 flex items-center gap-5">
                <img
                  src={founderImg}
                  alt={founderName}
                  loading="lazy"
                  className="h-20 w-20 rounded-2xl object-cover"
                />
                <div>
                  <p className="text-xs uppercase tracking-widest text-white/70">
                    Founder
                  </p>
                  <h3 className="font-display text-xl font-bold">
                    {founderName}
                  </h3>
                  <p className="text-sm text-white/80">
                    {founderTitle}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <form
            onSubmit={onSubmit}
            className="rounded-3xl bg-card border border-border p-7 shadow-card space-y-5"
          >
            <div>
              <h2 className="font-display text-3xl font-bold text-foreground">
                Send us a note
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                We'll continue the chat on WhatsApp for the fastest reply.
              </p>
            </div>
            <Field label="Your name" name="name" placeholder="Atul Nautiyal" />
            <Field
              label="Email"
              name="email"
              type="email"
              placeholder="you@example.com"
            />
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Message
              </label>
              <textarea
                name="message"
                rows={5}
                placeholder="Tell us what kind of trip you're dreaming of…"
                className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--gradient-ember)] px-6 py-3.5 text-sm font-semibold text-ember-foreground shadow-glow disabled:opacity-60"
            >
              <MessageCircle className="h-4 w-4" /> Send via WhatsApp
            </button>
          </form>
        </div>
      </section>
    </>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </label>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
      />
    </div>
  );
}
