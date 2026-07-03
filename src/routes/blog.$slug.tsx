import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { PageHero } from "@/components/site/PageHero";
import hero from "@/assets/gallery-bonfire.jpg";
import { Calendar, User, Clock, ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/blog/$slug")({
  head: () => ({
    meta: [
      { title: `Journal Details — Explore Hills` },
    ],
  }),
  component: BlogPostDetail,
});

type BlogPost = {
  id: string;
  slug: string;
  title: string;
  content: string;
  summary: string | null;
  featured_image: string | null;
  categories: string[];
  tags: string[];
  author_name: string | null;
  reading_time: string | null;
  publish_date: string;
};

function BlogPostDetail() {
  const { slug } = Route.useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("slug", slug)
        .maybeSingle();

      if (!error && data) {
        setPost(data as BlogPost);
      }
      setLoading(false);
    }
    load();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen grid place-items-center bg-background text-muted-foreground">
        Loading story details...
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background space-y-4">
        <div className="text-xl font-bold text-foreground">Story not found</div>
        <p className="text-sm text-muted-foreground">The story you are looking for has been moved or deleted.</p>
        <Link to="/blog" className="rounded-xl bg-primary text-primary-foreground px-4 py-2 text-sm font-semibold">
          Back to Journal
        </Link>
      </div>
    );
  }

  return (
    <>
      <PageHero
        eyebrow="Explore Hills Journal"
        title={post.title}
        subtitle={post.summary || `Written by ${post.author_name || "Atul Nautiyal"}`}
        image={post.featured_image || hero}
      />

      <article className="py-20 bg-background text-foreground">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 space-y-8">
          <div className="flex items-center gap-4 text-xs text-muted-foreground border-b border-border pb-4">
            <Link to="/blog" className="inline-flex items-center gap-1.5 text-primary font-semibold mr-auto">
              <ArrowLeft className="h-4 w-4" /> Back to Journal
            </Link>
            <span className="flex items-center gap-1"><User className="h-3.5 w-3.5" /> {post.author_name || "Atul Nautiyal"}</span>
            <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> {new Date(post.publish_date).toLocaleDateString()}</span>
            <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {post.reading_time || "5 min read"}</span>
          </div>

          <div className="prose dark:prose-invert max-w-none whitespace-pre-wrap font-sans text-sm sm:text-base leading-relaxed space-y-4">
            {post.content}
          </div>

          <div className="border-t border-border pt-6 mt-8 space-y-4">
            <div className="flex flex-wrap gap-2">
              {post.categories.map((c) => (
                <span key={c} className="text-xs bg-primary/10 text-primary font-semibold px-3 py-1 rounded-full uppercase tracking-wide">
                  {c}
                </span>
              ))}
              {post.tags.map((t) => (
                <span key={t} className="text-xs bg-muted text-muted-foreground font-semibold px-3 py-1 rounded-full">
                  #{t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
