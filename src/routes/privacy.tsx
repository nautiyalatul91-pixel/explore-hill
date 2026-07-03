import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { PageHero } from "@/components/site/PageHero";
import hero from "@/assets/trip-hanol.jpg";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Explore Hills" },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  const [content, setContent] = useState({
    title: "Privacy Policy",
    content: "At Explore Hills, we take your privacy seriously. This privacy policy describes how we collect, use, and protect your personal information when you book a trek, subscribe to our newsletter, or fill out a contact lead form.\n\n1. Information Collection\nWe collect your name, email address, phone number, and special requirements when you place a booking or request a quote.\n\n2. Information Usage\nYour details are only used to coordinate your travel arrangements, verify guide requirements, and contact you via WhatsApp or Email.\n\n3. Data Protection\nWe do not sell or lease customer profiles to third parties. All traveler profiles are secured with Supabase storage and Row Level Security permissions.",
  });

  useEffect(() => {
    async function load() {
      const { data } = await supabase.from("settings").select("*").eq("key", "static_pages").maybeSingle();
      if (data && typeof data.value === "object" && data.value !== null) {
        const val = data.value as any;
        if (val.privacy) setContent(val.privacy);
      }
    }
    load();
  }, []);

  return (
    <>
      <PageHero eyebrow="Legal" title={content.title} subtitle="How we handle and protect traveler information." image={hero} />
      <section className="py-20 bg-background text-foreground animate-fade-up">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="prose dark:prose-invert max-w-none whitespace-pre-wrap font-sans text-sm sm:text-base leading-relaxed space-y-4">
            {content.content}
          </div>
        </div>
      </section>
    </>
  );
}
