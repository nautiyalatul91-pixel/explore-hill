import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { PageHero } from "@/components/site/PageHero";
import { usePackages, type Package } from "@/lib/packages";
import { 
  Calendar, 
  Clock, 
  MapPin, 
  ArrowLeft, 
  Star, 
  ShieldCheck, 
  ChevronRight, 
  Sparkles,
  MessageSquare,
  Utensils,
  Home,
  Mountain,
  Info,
  Compass,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/packages/$slug")({
  head: () => ({
    meta: [
      { title: `Adventure Details — Explore Hills` },
    ],
  }),
  component: PackageDetail,
});

type DbReview = {
  id: string;
  package_slug: string;
  user_name: string;
  customer_name?: string;
  rating: number;
  comment: string | null;
  verified: boolean;
  status: string;
  created_at: string;
};

type ItineraryDay = {
  id?: string;
  package_slug: string;
  day_number: number;
  title: string;
  subtitle: string | null;
  description: string | null;
  meals: string | null;
  stay: string | null;
  distance: string | null;
  altitude: string | null;
  travel_time: string | null;
  activities: string | null;
  notes: string | null;
  images: string[] | null;
};

function PackageDetail() {
  const { slug } = Route.useParams();
  const { packages, loading: loadingPkgs } = usePackages();
  const [pkg, setPkg] = useState<Package | null>(null);
  const [reviews, setReviews] = useState<DbReview[]>([]);
  const [loadingReviews, setLoadingReviews] = useState(true);
  const [submittingReview, setSubmittingReview] = useState(false);

  // Itinerary States
  const [itinerary, setItinerary] = useState<ItineraryDay[]>([]);
  const [loadingItinerary, setLoadingItinerary] = useState(true);
  const [expandedDay, setExpandedDay] = useState<number | null>(1); // Day 1 open by default

  // Review Form States
  const [formName, setFormName] = useState("");
  const [formRating, setFormRating] = useState(5);
  const [formComment, setFormComment] = useState("");

  useEffect(() => {
    if (!loadingPkgs && packages.length > 0) {
      const found = packages.find((p) => p.slug === slug);
      if (found) {
        setPkg(found);
      }
    }
  }, [slug, packages, loadingPkgs]);

  useEffect(() => {
    async function loadReviews() {
      if (!slug) return;
      setLoadingReviews(true);
      const { data, error } = await supabase
        .from("reviews")
        .select("*")
        .eq("package_slug", slug)
        .eq("status", "approved")
        .order("created_at", { ascending: false });

      if (!error && data) {
        setReviews(data as DbReview[]);
      }
      setLoadingReviews(false);
    }
    loadReviews();
  }, [slug]);

  useEffect(() => {
    async function loadItinerary() {
      if (!slug) return;
      setLoadingItinerary(true);
      const { data, error } = await supabase
        .from("package_itineraries")
        .select("*")
        .eq("package_slug", slug)
        .order("day_number", { ascending: true });

      if (!error && data) {
        setItinerary(data as ItineraryDay[]);
      }
      setLoadingItinerary(false);
    }
    loadItinerary();
  }, [slug]);

  async function handleAddPublicReview(e: React.FormEvent) {
    e.preventDefault();
    if (!formName.trim() || !formComment.trim()) {
      return toast.error("Please fill in all fields.");
    }
    setSubmittingReview(true);

    try {
      const { error } = await supabase.from("reviews").insert({
        package_slug: slug,
        user_name: formName.trim(),
        customer_name: formName.trim(),
        rating: Number(formRating),
        comment: formComment.trim(),
        verified: false,
        status: "pending", // Direct public reviews require approval
      });

      if (error) throw error;

      toast.success("Thank you! Your review has been submitted for approval.");
      setFormName("");
      setFormRating(5);
      setFormComment("");
    } catch (err: any) {
      toast.error("Failed to submit review: " + err.message);
    } finally {
      setSubmittingReview(false);
    }
  }

  if (loadingPkgs) {
    return (
      <div className="min-h-screen grid place-items-center bg-background text-muted-foreground">
        Loading adventure details...
      </div>
    );
  }

  if (!pkg) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background space-y-4">
        <div className="text-xl font-bold text-foreground">Adventure not found</div>
        <p className="text-sm text-muted-foreground">The package you are looking for has been moved or deleted.</p>
        <Link to="/treks" className="rounded-xl bg-primary text-primary-foreground px-4 py-2 text-sm font-semibold">
          Back to Treks
        </Link>
      </div>
    );
  }

  // Calculate Average Rating
  const avgRating = reviews.length > 0 
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
    : null;

  return (
    <>
      <PageHero
        eyebrow={pkg.category === "trek" ? "Himalayan Trek" : "Cultural Trip"}
        title={pkg.name}
        subtitle={pkg.tagline}
        image={pkg.image}
      />

      <div className="py-16 bg-background text-foreground">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Back button */}
          <div className="mb-10">
            <Link 
              to={pkg.category === "trek" ? "/treks" : "/trips"} 
              className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-primary hover:opacity-80 transition"
            >
              <ArrowLeft className="h-4 w-4" /> Back to {pkg.category === "trek" ? "Treks" : "Trips"}
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Left Content: Description, Highlights, Route, Reviews */}
            <div className="lg:col-span-2 space-y-12">
              
              {/* Highlights & Meta */}
              <section className="bg-card border border-border rounded-3xl p-6 sm:p-8 space-y-6">
                <div className="flex flex-wrap gap-6 text-sm text-muted-foreground border-b border-border pb-6">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-ember" />
                    <div>
                      <div className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Duration</div>
                      <div className="font-semibold text-foreground">{pkg.duration}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-ember" />
                    <div>
                      <div className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Location</div>
                      <div className="font-semibold text-foreground">Uttarakhand</div>
                    </div>
                  </div>
                  {pkg.difficulty && (
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-ember" />
                      <div>
                        <div className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Difficulty</div>
                        <div className="font-semibold text-foreground">{pkg.difficulty}</div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <h3 className="font-display text-2xl font-bold">Adventure Highlights</h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-foreground/90">
                    {pkg.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-ember shrink-0" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </section>

              {/* Itinerary / Route Stops */}
              {!loadingItinerary && itinerary.length > 0 ? (
                <section className="space-y-6">
                  <h3 className="font-display text-2xl font-bold">Detailed Itinerary</h3>
                  <div className="space-y-4">
                    {itinerary.map((day) => {
                      const isOpen = expandedDay === day.day_number;
                      return (
                        <div 
                          key={day.id || day.day_number} 
                          className="bg-card border border-border rounded-2xl overflow-hidden transition-all duration-300 shadow-sm"
                        >
                          {/* Accordion Trigger */}
                          <button
                            type="button"
                            onClick={() => setExpandedDay(isOpen ? null : day.day_number)}
                            className="w-full text-left px-6 py-4 flex items-center justify-between gap-4 font-display text-lg font-semibold text-foreground hover:bg-muted/30 transition cursor-pointer"
                          >
                            <div className="flex items-center gap-3">
                              <span className="grid h-8 w-8 place-items-center rounded-full bg-primary/10 text-primary text-xs font-bold shrink-0">
                                D{day.day_number}
                              </span>
                              <div>
                                <span>{day.title}</span>
                                {day.subtitle && (
                                  <span className="block text-xs font-sans text-muted-foreground font-normal mt-0.5">
                                    {day.subtitle}
                                  </span>
                                )}
                              </div>
                            </div>
                            {isOpen ? (
                              <ChevronUp className="h-5 w-5 text-muted-foreground shrink-0" />
                            ) : (
                              <ChevronDown className="h-5 w-5 text-muted-foreground shrink-0" />
                            )}
                          </button>

                          {/* Accordion Content */}
                          {isOpen && (
                            <div className="px-6 pb-6 pt-3 border-t border-border/50 space-y-5 animate-fadeIn">
                              
                              {/* Metadata Grid */}
                              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs bg-muted/40 rounded-xl p-4 border border-border/40">
                                {day.meals && (
                                  <div className="flex items-center gap-2">
                                    <Utensils className="h-4 w-4 text-primary shrink-0" />
                                    <div>
                                      <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider block">Meals</span>
                                      <span className="font-semibold text-foreground">{day.meals}</span>
                                    </div>
                                  </div>
                                )}
                                {day.stay && (
                                  <div className="flex items-center gap-2">
                                    <Home className="h-4 w-4 text-primary shrink-0" />
                                    <div>
                                      <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider block">Stay</span>
                                      <span className="font-semibold text-foreground">{day.stay}</span>
                                    </div>
                                  </div>
                                )}
                                {day.distance && (
                                  <div className="flex items-center gap-2">
                                    <Compass className="h-4 w-4 text-primary shrink-0" />
                                    <div>
                                      <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider block">Distance</span>
                                      <span className="font-semibold text-foreground">{day.distance}</span>
                                    </div>
                                  </div>
                                )}
                                {day.altitude && (
                                  <div className="flex items-center gap-2">
                                    <Mountain className="h-4 w-4 text-primary shrink-0" />
                                    <div>
                                      <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider block">Altitude</span>
                                      <span className="font-semibold text-foreground">{day.altitude}</span>
                                    </div>
                                  </div>
                                )}
                                {day.travel_time && (
                                  <div className="flex items-center gap-2">
                                    <Clock className="h-4 w-4 text-primary shrink-0" />
                                    <div>
                                      <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider block">Travel Time</span>
                                      <span className="font-semibold text-foreground">{day.travel_time}</span>
                                    </div>
                                  </div>
                                )}
                              </div>

                              {/* Description */}
                              {day.description && (
                                <div className="text-sm text-foreground/90 leading-relaxed whitespace-pre-line font-sans">
                                  {day.description}
                                </div>
                              )}

                              {/* Notes */}
                              {day.notes && (
                                <div className="flex gap-3 bg-amber-500/5 border border-amber-500/15 rounded-xl p-4 text-xs text-foreground/95">
                                  <Info className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                                  <div>
                                    <span className="font-bold text-amber-600 uppercase tracking-wider block mb-1 text-[10px]">Important Note</span>
                                    {day.notes}
                                  </div>
                                </div>
                              )}

                              {/* Images */}
                              {day.images && day.images.length > 0 && (
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                  {day.images.map((imgUrl, imgIdx) => (
                                    <div key={imgIdx} className="relative aspect-[4/3] rounded-xl overflow-hidden border border-border group/img">
                                      <img
                                        src={imgUrl}
                                        alt={`Day ${day.day_number} - Image ${imgIdx + 1}`}
                                        className="w-full h-full object-cover transition-transform duration-300 group-hover/img:scale-105"
                                      />
                                    </div>
                                  ))}
                                </div>
                              )}

                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </section>
              ) : (
                pkg.route && pkg.route.length > 0 && (
                  <section className="space-y-6">
                    <h3 className="font-display text-2xl font-bold">Planned Route</h3>
                    <div className="relative border-l-2 border-dashed border-primary/30 pl-8 space-y-6">
                      {pkg.route.map((stop, i) => (
                        <div key={stop + i} className="relative">
                          <span className="absolute -left-[42px] grid h-8 w-8 place-items-center rounded-full bg-[var(--gradient-brand)] text-white text-xs font-bold shadow-card">
                            {i + 1}
                          </span>
                          <div className="flex items-center gap-2 font-display text-lg font-semibold text-foreground">
                            <MapPin className="h-4 w-4 text-ember" /> {stop}
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                )
              )}

              {/* REVIEWS SECTION */}
              <section className="space-y-8 pt-8 border-t border-border">
                <div className="flex flex-wrap items-end justify-between gap-4">
                  <div>
                    <h3 className="font-display text-3xl font-bold">Traveler Reviews</h3>
                    <p className="text-sm text-muted-foreground mt-1">Authentic stories and experiences shared by our explorers.</p>
                  </div>
                  {avgRating && (
                    <div className="flex items-center gap-2 bg-amber-500/10 text-amber-600 rounded-2xl px-4 py-2 border border-amber-500/20">
                      <Star className="h-5 w-5 fill-amber-500 text-amber-500" />
                      <span className="text-lg font-bold">{avgRating}</span>
                      <span className="text-xs text-muted-foreground">({reviews.length} reviews)</span>
                    </div>
                  )}
                </div>

                {/* Reviews List */}
                <div className="space-y-6">
                  {loadingReviews ? (
                    <div className="text-sm text-muted-foreground">Loading reviews...</div>
                  ) : reviews.length === 0 ? (
                    <div className="bg-card border border-border rounded-3xl p-8 text-center text-muted-foreground space-y-2">
                      <MessageSquare className="h-8 w-8 text-muted-foreground/50 mx-auto" />
                      <p className="font-semibold text-foreground">No reviews yet</p>
                      <p className="text-xs">Be the first to share your journey for {pkg.name}!</p>
                    </div>
                  ) : (
                    reviews.map((r) => (
                      <div key={r.id} className="bg-card border border-border rounded-3xl p-6 space-y-4">
                        <div className="flex flex-wrap items-start justify-between gap-2 border-b border-border pb-3">
                          <div>
                            <div className="font-bold text-foreground flex items-center gap-1.5">
                              {r.customer_name || r.user_name}
                              {r.verified && (
                                <span className="inline-flex items-center gap-0.5 rounded-full bg-green-500/10 px-2 py-0.5 text-[9px] font-bold text-green-700 uppercase tracking-wider">
                                  <ShieldCheck className="h-3 w-3" /> Verified Explorer
                                </span>
                              )}
                            </div>
                            <div className="text-[10px] text-muted-foreground mt-0.5">
                              {r.created_at ? new Date(r.created_at).toLocaleDateString() : "Recent Journey"}
                            </div>
                          </div>
                          <div className="flex text-amber-500">
                            {"★".repeat(r.rating) + "☆".repeat(5 - r.rating)}
                          </div>
                        </div>
                        <p className="text-sm text-foreground/90 whitespace-pre-wrap leading-relaxed">
                          {r.comment}
                        </p>
                      </div>
                    ))
                  )}
                </div>

                {/* Review Submission Form */}
                <div className="bg-card border border-border rounded-3xl p-6 sm:p-8 space-y-6">
                  <div className="space-y-1">
                    <h4 className="font-display text-xl font-bold">Write a Review</h4>
                    <p className="text-xs text-muted-foreground">Have you completed this adventure? Help other travelers by sharing your experience.</p>
                  </div>
                  <form onSubmit={handleAddPublicReview} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Your Name</label>
                        <input
                          type="text"
                          required
                          value={formName}
                          onChange={(e) => setFormName(e.target.value)}
                          placeholder="e.g. Rahul Sharma"
                          className="mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring text-foreground"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Rating</label>
                        <select
                          value={formRating}
                          onChange={(e) => setFormRating(Number(e.target.value))}
                          className="mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring text-foreground"
                        >
                          <option value={5}>5 Stars - Excellent</option>
                          <option value={4}>4 Stars - Good</option>
                          <option value={3}>3 Stars - Average</option>
                          <option value={2}>2 Stars - Poor</option>
                          <option value={1}>1 Star - Very Poor</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Your Experience</label>
                      <textarea
                        required
                        rows={4}
                        value={formComment}
                        onChange={(e) => setFormComment(e.target.value)}
                        placeholder="Tell us about the campsites, guides, landscapes, and overall organization..."
                        className="mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring text-foreground"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={submittingReview}
                      className="rounded-xl bg-primary text-primary-foreground px-6 py-2.5 text-xs font-semibold hover:bg-primary/95 transition cursor-pointer disabled:opacity-50"
                    >
                      {submittingReview ? "Submitting..." : "Submit Review"}
                    </button>
                  </form>
                </div>

              </section>

            </div>

            {/* Right Sidebar: Booking Summary & Details */}
            <div className="space-y-6">
              <div className="bg-card border border-border rounded-3xl p-6 space-y-6 sticky top-6 shadow-card">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">All-Inclusive Price</span>
                  <div className="font-display text-4xl font-bold text-primary mt-1">
                    {pkg.priceLabel}
                    <span className="text-xs font-medium text-muted-foreground"> /person</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="text-xs font-bold uppercase text-muted-foreground border-b border-border pb-2">Includes</div>
                  <ul className="text-xs text-foreground/80 space-y-2">
                    <li className="flex items-center gap-2">✓ Transportation from Dehradun</li>
                    <li className="flex items-center gap-2">✓ Certified Local Guides</li>
                    <li className="flex items-center gap-2">✓ Warm Camping Stays & Tents</li>
                    <li className="flex items-center gap-2">✓ Fresh Cooked Local Meals</li>
                    <li className="flex items-center gap-2">✓ Bonfire Experiences</li>
                  </ul>
                </div>

                <Link
                  to="/book"
                  search={{ pkg: pkg.slug }}
                  className="w-full inline-flex items-center justify-center gap-1.5 rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition shadow-card text-center"
                >
                  Book This Adventure <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

          </div>

        </div>
      </div>
    </>
  );
}
