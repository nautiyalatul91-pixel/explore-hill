import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { PageHero } from "@/components/site/PageHero";
import hero from "@/assets/trip-hanol.jpg";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms and Conditions — Explore Hills" },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
  const [content, setContent] = useState({
    title: "Terms and Conditions",
    content: "Please read these terms and conditions carefully before booking treks with Explore Hills.\n\n1. Booking & Confirmations\nAll bookings must be confirmed via WhatsApp. Seats are only reserved upon slot verification.\n\n2. Health & Safety\nTrekking in the Himalayas requires physical fitness. Clients must report any respiratory, cardiac, or medical conditions in advance on their traveler profile.\n\n3. Cancellation Policy\n- Cancellations 15 days before departure: 90% refund.\n- Cancellations 7-14 days before departure: 50% refund.\n- Cancellations within 7 days: No refund.\n\n4. Environmental Policy\nExplore Hills promotes responsible mountain tourism. Littering on trails is strictly prohibited.",
  });

  useEffect(() => {
    async function load() {
      const { data } = await supabase.from("settings").select("*").eq("key", "static_pages").maybeSingle();
      if (data && typeof data.value === "object" && data.value !== null) {
        const val = data.value as any;
        if (val.terms) setContent(val.terms);
      }
    }
    load();
  }, []);

  return (
    <>
      <PageHero eyebrow="Legal" title={content.title} subtitle="Booking policies, safety rules, and mountain codes." image={hero} />
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
