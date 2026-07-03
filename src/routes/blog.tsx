import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { PageHero } from "@/components/site/PageHero";
import hero from "@/assets/gallery-bonfire.jpg";
import { Calendar, User, Clock, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Explore Hills Journal — Stories, Tips & Trekking Guides" },
      {
        name: "description",
        content:
          "Read adventure guides, local Garhwali stories, packing checklists, and guides to Uttarakhand's hidden trails.",
      },
    ],
    links: [{ rel: "canonical", href: "/blog" }],
  }),
  component: BlogPage,
});

type BlogPost = {
  id: string;
  slug: string;
  title: string;
  summary: string | null;
  featured_image: string | null;
  categories: string[];
  tags: string[];
  author_name: string | null;
  reading_time: string | null;
  publish_date: string;
  featured: boolean;
};

function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      // Fetch only published posts whose publish date is past
      const { data, error } = await supabase
        .from("posts")
        .select("id, slug, title, summary, featured_image, categories, tags, author_name, reading_time, publish_date, featured")
        .eq("status", "published")
        .lte("publish_date", new Date().toISOString())
        .order("publish_date", { ascending: false });

      if (!error && data) {
        setPosts(data as BlogPost[]);
      }
      setLoading(false);
    }
    load();
  }, []);

  const featuredPost = posts.find((p) => p.featured) || posts[0];
  const regularPosts = featuredPost ? posts.filter((p) => p.id !== featuredPost.id) : posts;

  return (
    <>
      <PageHero
        eyebrow="Explore Hills Journal"
        title={
          <>
            Stories from the <span className="text-gradient">Himalayan Trails</span>
          </>
        }
        subtitle="Guides, checklists, safety tips and local Garhwali stories from our mountain guides."
        image={hero}
      />

      <section className="py-20 sm:py-28 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 space-y-16">
          {loading ? (
            <div className="text-center py-10 text-muted-foreground">
              Loading adventure stories...
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-10 text-muted-foreground">
              No journal entries found. Check back soon as our guides write from the trail!
            </div>
          ) : (
            <>
              {/* Featured Post Card */}
              {featuredPost && (
                <div className="rounded-3xl border border-border bg-card overflow-hidden shadow-card hover-lift grid md:grid-cols-2 animate-fade-up">
                  <div className="h-64 md:h-auto relative min-h-[300px]">
                    <img
                      src={featuredPost.featured_image || hero}
                      alt={featuredPost.title}
                      className="absolute inset-0 h-full w-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute top-4 left-4 bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                      Featured
                    </div>
                  </div>
                  <div className="p-8 sm:p-10 flex flex-col justify-center space-y-4">
                    <div className="flex flex-wrap gap-1">
                      {featuredPost.categories.map((c) => (
                        <span key={c} className="text-[10px] bg-primary/10 text-primary font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
                          {c}
                        </span>
                      ))}
                    </div>
                    <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
                      <Link to="/blog/$slug" params={{ slug: featuredPost.slug }} className="hover:text-primary transition-colors">
                        {featuredPost.title}
                      </Link>
                    </h2>
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {featuredPost.summary || "Read the latest update from our trekking coordinators on the trail."}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><User className="h-3.5 w-3.5" /> {featuredPost.author_name || "Atul Nautiyal"}</span>
                      <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> {new Date(featuredPost.publish_date).toLocaleDateString()}</span>
                      <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {featuredPost.reading_time || "5 min read"}</span>
                    </div>
                    <div>
                      <Link
                        to="/blog/$slug"
                        params={{ slug: featuredPost.slug }}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all"
                      >
                        Read Full Story <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              )}

              {/* Regular Posts Grid */}
              {regularPosts.length > 0 && (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {regularPosts.map((p) => (
                    <div key={p.id} className="rounded-3xl border border-border bg-card overflow-hidden shadow-card hover-lift flex flex-col h-full animate-fade-up">
                      <div className="h-48 relative overflow-hidden">
                        <img
                          src={p.featured_image || hero}
                          alt={p.title}
                          className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                          loading="lazy"
                        />
                      </div>
                      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                        <div className="space-y-3">
                          <div className="flex flex-wrap gap-1">
                            {p.categories.map((c) => (
                              <span key={c} className="text-[9px] bg-primary/10 text-primary font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
                                {c}
                              </span>
                            ))}
                          </div>
                          <h3 className="font-display text-lg font-bold text-foreground line-clamp-2">
                            <Link to="/blog/$slug" params={{ slug: p.slug }} className="hover:text-primary transition-colors">
                              {p.title}
                            </Link>
                          </h3>
                          <p className="text-xs text-muted-foreground line-clamp-3">
                            {p.summary || "Explore trekking guides and Himalayan stories."}
                          </p>
                        </div>
                        <div className="space-y-3 pt-3 border-t border-border">
                          <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                            <span className="flex items-center gap-1"><User className="h-3 w-3" /> {p.author_name || "Atul"}</span>
                            <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {p.reading_time || "5m"}</span>
                          </div>
                          <div>
                            <Link
                              to="/blog/$slug"
                              params={{ slug: p.slug }}
                              className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:gap-2 transition-all"
                            >
                              Read More <ArrowRight className="h-3 w-3" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}
