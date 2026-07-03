import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { PageHero } from "@/components/site/PageHero";
import hero from "@/assets/gallery-group.jpg";

export const Route = createFileRoute("/careers")({
  head: () => ({
    meta: [
      { title: "Careers — Join Explore Hills" },
    ],
  }),
  component: CareersPage,
});

function CareersPage() {
  const [content, setContent] = useState({
    title: "Careers at Explore Hills",
    content: "We are always looking for passionate mountain guides, content editors, coordinators, and local hosts who want to share the beauty of Uttarakhand with the world.\n\nOpen Roles:\n\n1. Certified Mountain Guide (Garhwal region)\nRequirements: BMC/AMC certified, first aid training, minimum 3 years guiding experience.\n\n2. Adventure Travel Coordinator (Dehradun base)\nRequirements: Customer support skills, logistics coordination experience, love for mountain trails.\n\nHow to Apply:\nSend your resume and a short note about your favorite Himalayan memory to contact@explorehills.in or message Atul Nautiyal on WhatsApp at +91 6397710701.",
  });

  useEffect(() => {
    async function load() {
      const { data } = await supabase.from("settings").select("*").eq("key", "static_pages").maybeSingle();
      if (data && typeof data.value === "object" && data.value !== null) {
        const val = data.value as any;
        if (val.careers) setContent(val.careers);
      }
    }
    load();
  }, []);

  return (
    <>
      <PageHero eyebrow="Join the Team" title={content.title} subtitle="Work in the lap of the Himalayas." image={hero} />
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
