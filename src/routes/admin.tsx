import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Json } from "@/integrations/supabase/types";
import { PageHero } from "@/components/site/PageHero";
import hero from "@/assets/hero-himalayas.jpg";
import {
  CalendarDays,
  Loader2,
  LogOut,
  Search,
  ShieldAlert,
  Users,
  Plus,
  Trash2,
  Edit2,
  X,
  ArrowUp,
  ArrowDown,
  Upload,
  Image as ImageIcon,
  Folder,
  Lock,
  Clipboard,
  Check,
  Copy,
  ExternalLink,
  RefreshCw,
  FileText,
  AlertCircle,
  Eye,
  EyeOff,
  Sparkles,
  Flame,
  Bookmark,
  CheckSquare,
  Square,
  RotateCw,
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

type FAQItem = {
  q: string;
  a: string;
};

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
  guide_name: string | null;
  coordinator_name: string | null;
  vehicle_info: string | null;
  internal_notes: string | null;
  payment_status: string;
  updated_at: string;
};

type Customer = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  emergency_contact: string | null;
  address: string | null;
  government_id: string | null;
  medical_information: string | null;
  notes: string | null;
  internal_notes: string | null;
  tags: string[];
  vip: boolean;
  blacklisted: boolean;
  created_at: string;
};

type Lead = {
  id: string;
  name: string;
  phone: string | null;
  email: string | null;
  message: string | null;
  interested_package: string | null;
  lead_source: string | null;
  assigned_staff: string | null;
  lead_status: string;
  reminder_date: string | null;
  internal_notes: string | null;
  created_at: string;
};

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
  status: "draft" | "published" | "scheduled";
  publish_date: string;
  featured: boolean;
  meta_title: string | null;
  meta_description: string | null;
  canonical_url: string | null;
  og_image: string | null;
  created_at: string;
  updated_at: string;
};

type Coupon = {
  id: string;
  code: string;
  discount_type: "percentage" | "flat";
  discount_value: number;
  minimum_amount?: number;
  min_booking_amount?: number;
  maximum_discount?: number | null;
  usage_limit?: number | null;
  max_uses?: number | null;
  usage_count?: number;
  used_count?: number;
  expiry_date: string | null;
  applicable_packages?: string[] | null;
  is_enabled?: boolean;
  status?: string;
  created_at: string;
};

type Review = {
  id: string;
  package_slug: string;
  user_name: string;
  customer_name?: string;
  package_name?: string;
  rating: number;
  comment: string | null;
  images: string[] | null;
  videos: string[] | null;
  reply: string | null;
  status: "pending" | "approved" | "rejected" | "hidden";
  featured: boolean;
  verified: boolean;
  created_at: string;
};

type AuditLog = {
  id: string;
  user_id: string | null;
  action: string;
  target_type: string;
  target_id: string | null;
  details: any;
  ip_address: string | null;
  created_at: string;
};


type Departure = {
  id: string;
  package_slug: string;
  start_date: string;
  end_date: string;
  max_seats: number;
  booked_seats: number;
  status: "open" | "full" | "cancelled";
  created_at: string;
  unlimited_seats: boolean;
  waitlist_enabled: boolean;
  booking_cutoff_days: number;
  guide_name: string | null;
  guide_phone: string | null;
  meeting_time: string | null;
  meeting_location: string | null;
  internal_notes: string | null;
  visibility: string;
};

type DbPackage = {
  slug: string;
  name: string;
  category: "trek" | "trip";
  sub_category: string | null;
  region: string | null;
  location: string | null;
  state: string | null;
  country: string | null;
  price: number;
  discount_price: number | null;
  offer_badge: string | null;
  offer_start_date: string | null;
  offer_end_date: string | null;
  duration: string;
  difficulty: string | null;
  altitude: string | null;
  distance: string | null;
  temperature: string | null;
  best_season: string | null;
  pickup_point: string | null;
  drop_point: string | null;
  meeting_point: string | null;
  google_maps: string | null;
  group_size: string | null;
  minimum_age: number | null;
  maximum_age: number | null;
  package_code: string | null;
  status: "draft" | "published" | "archived";
  sort_order: number;
  featured: boolean;
  trending: boolean;
  popular: boolean;
  new_arrival: boolean;
  visibility: "visible" | "hidden";
  image: string | null;
  images: string[] | null;
  overview: string | null;
  highlights: string[] | null;
  inclusions: string[] | null;
  exclusions: string[] | null;
  things_to_carry: string[] | null;
  fitness_requirements: string | null;
  cancellation_policy: string | null;
  terms_conditions: string | null;
  know_before_you_go: string | null;
  safety_instructions: string | null;
  emergency_contacts: string | null;
  medical_requirements: string | null;
  faqs: Json;
  tagline: string | null;
  meta_title: string | null;
  meta_description: string | null;
  og_image: string | null;
  canonical_url: string | null;
  updated_at: string;
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

type MediaItem = {
  id: string;
  filename: string;
  url: string;
  size_bytes: number | null;
  content_type: string | null;
  folder: string;
  created_at: string;
};

type UserRoleMap = {
  id: string;
  user_id: string;
  role: string;
  created_at: string;
};

type RolePermissionMap = {
  id: string;
  role: string;
  permission: string;
};

type AuthState = "loading" | "signed-out" | "not-admin" | "admin";

const dashboardRoles = [
  "super_admin",
  "admin",
  "manager",
  "guide",
  "content_editor",
  "read_only",
];
const allPermissionsList = [
  "manage_packages",
  "manage_batches",
  "manage_bookings",
  "manage_users",
  "manage_content",
];

function AdminPage() {
  const [auth, setAuth] = useState<AuthState>("loading");
  const [userRolesList, setUserRolesList] = useState<string[]>([]);
  const [userPermissions, setUserPermissions] = useState<string[]>([]);

  // Tables States
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [departures, setDepartures] = useState<Departure[]>([]);
  const [dbPackages, setDbPackages] = useState<DbPackage[]>([]);
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [userRoles, setUserRoles] = useState<UserRoleMap[]>([]);
  const [rolePermissions, setRolePermissions] = useState<RolePermissionMap[]>(
    [],
  );

  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [activeTab, setActiveTab] = useState<
    | "bookings"
    | "batches"
    | "packages"
    | "itinerary"
    | "content"
    | "media"
    | "rbac"
    | "customers"
    | "leads"
    | "blogs"
    | "coupons"
    | "reviews"
    | "settings"
    | "audit"
    | "analytics"
  >("bookings");

  // New Table States
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [companySettings, setCompanySettings] = useState<any>({
    company_name: "Explore Hills",
    phone: "+91 63977 10701",
    email: "contact@explorehills.in",
    whatsapp: "+91 63977 10701",
    logo: "",
    favicon: "",
    address: "Dehradun, Uttarakhand",
    google_maps: "",
    social_instagram: "https://instagram.com/atul__nautiyal",
    social_facebook: "",
    gst_details: "",
    bank_details: "",
    invoice_prefix: "EH-",
    founder_name: "Atul Nautiyal",
    founder_title: "Replies to every traveler personally.",
    founder_image: "",
    company_description: "Authentic Himalayan adventures, small-group experiences and hidden destinations of Uttarakhand.",
    footer_tagline: "Travel responsibly. Leave only footprints."
  });
  const [homepageSettings, setHomepageSettings] = useState<any>({
    hero_headline: "Born in the hills, built for travelers",
    hero_subheading: "Explore Hills is an Uttarakhand-based travel startup on a mission to share the real Himalayas.",
    hero_cta_text: "Book Your Adventure",
    hero_image: "",
    announcement_bar_text: "🍂 Autumn Season Treks are Open! Small group batches filling fast.",
    announcement_bar_enabled: true,
    stats: [
      { value: "2,500+", label: "Happy Travelers" },
      { value: "120+", label: "Trips Completed" },
      { value: "14–15", label: "Small Group Size" },
      { value: "4.9★", label: "Average Rating" }
    ],
    why_us: [
      { title: "Couple-friendly", text: "Private moments, quiet stays and itineraries designed for two." },
      { title: "Small Groups", text: "Just 14–15 travelers per batch so every voice is heard." },
      { title: "Bonfire Nights", text: "Stories, music and warmth under a sky full of Himalayan stars." },
      { title: "Local Food Included", text: "Authentic Garhwali meals cooked by our village hosts." },
      { title: "Hidden Destinations", text: "Off-the-grid valleys and villages most travelers never see." },
      { title: "Safe & Comfortable", text: "Vetted stays, certified guides and full transportation." }
    ],
    categories: [
      { title: "Treks", to: "/treks" },
      { title: "Cultural Trips", to: "/trips" },
      { title: "Camping", to: "/gallery" },
      { title: "Village Stays", to: "/gallery" }
    ],
    sections: [
      { id: "hero", enabled: true },
      { id: "stats", enabled: true },
      { id: "categories", enabled: true },
      { id: "why_us", enabled: true },
      { id: "departures", enabled: true },
      { id: "testimonials", enabled: true },
      { id: "faqs", enabled: true }
    ]
  });

  const [staticPagesSettings, setStaticPagesSettings] = useState({
    about: {
      title: "Born in the hills, built for travelers",
      subtitle: "Explore Hills is a young Uttarakhand-based travel startup on a mission to share the real Himalayas with the world — one small group at a time.",
      mission: "To open Uttarakhand's hidden corners to travelers in a way that uplifts local communities, protects fragile ecosystems and leaves every guest with a story worth telling.",
      vision: "To become India's most trusted small-group Himalayan travel brand — a name travelers, villages and the mountains themselves can rely on.",
    },
    privacy: {
      title: "Privacy Policy",
      content: "At Explore Hills, we take your privacy seriously. This privacy policy describes how we collect, use, and protect your personal information when you book a trek, subscribe to our newsletter, or fill out a contact lead form.",
    },
    terms: {
      title: "Terms and Conditions",
      content: "Please read these terms and conditions carefully before booking treks with Explore Hills.",
    },
    careers: {
      title: "Careers at Explore Hills",
      content: "We are always looking for passionate mountain guides, content editors, coordinators, and local hosts who want to share the beauty of Uttarakhand with the world.",
    },
    treks: {
      title: "Walk into the wild Himalayas",
      subtitle: "From beginner-friendly weekend climbs to soulful summit pushes — every trek is led by experienced guides and built around small groups.",
    },
    trips: {
      title: "Soulful journeys through timeless villages",
      subtitle: "Slow travel, village hospitality and the rituals that shape Uttarakhand — designed for travelers who want to feel, not just see.",
    },
    gallery: {
      title: "Frames from the trail",
      subtitle: "Mountains, villages, bonfires and the people who make our trips unforgettable.",
    },
    contact: {
      title: "Let's plan your Himalayan story",
      subtitle: "Call, message or write — we usually reply within a few hours. Atul personally answers every WhatsApp.",
    },
  });

  // Bookings CRUD state
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  // Blog CMS states
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [showAddPostForm, setShowAddPostForm] = useState(false);

  // Coupon states
  const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null);
  const [showAddCouponForm, setShowAddCouponForm] = useState(false);
  const [newCoupon, setNewCoupon] = useState({
    code: "",
    discount_type: "percentage" as const,
    discount_value: 10,
    min_booking_amount: 0,
    max_uses: 100,
    status: "active" as const,
    expiry_date: "",
  });
  // Reviews CMS states
  const [showAddReviewForm, setShowAddReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({
    package_slug: "",
    customer_name: "",
    rating: 5,
    comment: "",
    verified: true,
    status: "approved" as const,
  });

  const [newPost, setNewPost] = useState({
    title: "",
    slug: "",
    content: "",
    summary: "",
    featured_image: "",
    categories: [] as string[],
    tags: [] as string[],
    author_name: "Atul Nautiyal",
    reading_time: "5 min read",
    status: "draft" as const,
    publish_date: new Date().toISOString().slice(0, 16),
    featured: false,
    meta_title: "",
    meta_description: "",
    canonical_url: "",
    og_image: "",
  });

  // Departures CRUD state
  const [editingBatch, setEditingBatch] = useState<Departure | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newBatch, setNewBatch] = useState({
    package_slug: "",
    start_date: "",
    end_date: "",
    max_seats: 15,
    unlimited_seats: false,
    waitlist_enabled: false,
    booking_cutoff_days: 2,
    guide_name: "",
    guide_phone: "",
    meeting_time: "",
    meeting_location: "",
    internal_notes: "",
    status: "open" as const,
    visibility: "visible",
  });

  // Packages CRUD state
  const [editingPackage, setEditingPackage] = useState<DbPackage | null>(null);
  const [showAddPackageForm, setShowAddPackageForm] = useState(false);
  const [newPackage, setNewPackage] = useState<Partial<DbPackage>>({
    slug: "",
    name: "",
    category: "trek",
    sub_category: "",
    region: "",
    location: "",
    state: "Uttarakhand",
    country: "India",
    price: 0,
    discount_price: null,
    offer_badge: "",
    duration: "",
    difficulty: "Easy",
    altitude: "",
    distance: "",
    temperature: "",
    best_season: "",
    pickup_point: "",
    drop_point: "",
    meeting_point: "",
    google_maps: "",
    group_size: "14–15",
    minimum_age: 10,
    maximum_age: 60,
    package_code: "",
    status: "draft",
    sort_order: 0,
    featured: false,
    trending: false,
    popular: false,
    new_arrival: false,
    visibility: "visible",
    image: "",
    images: [],
  });

  // Itinerary Builder state
  const [selectedItinerarySlug, setSelectedItinerarySlug] = useState("");
  const [itineraryDays, setItineraryDays] = useState<ItineraryDay[]>([]);
  const [activeDayIndex, setActiveDayIndex] = useState<number | null>(null);

  // Content Editor state
  const [selectedContentSlug, setSelectedContentSlug] = useState("");
  const [contentFields, setContentFields] = useState<Partial<DbPackage>>({});

  // Media state
  const [mediaFolderFilter, setMediaFolderFilter] = useState("all");
  const [mediaUploadFolder, setMediaUploadFolder] = useState("general");
  const [imageProcessConfig, setImageProcessConfig] = useState({
    rotation: 0,
    quality: 0.8,
  });
  const [selectedImageToInsert, setSelectedImageToInsert] = useState<{
    callback: (url: string) => void;
  } | null>(null);

  // RBAC panel state
  const [newRoleMapping, setNewRoleMapping] = useState({
    user_id: "",
    role: "read_only",
  });

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
      const matchedRoles = roles?.map((r) => r.role) || [];
      setUserRolesList(matchedRoles);
      const isDashboardStaff = matchedRoles.some((r) =>
        dashboardRoles.includes(r),
      );

      if (isDashboardStaff) {
        // Fetch permissions for these roles
        const { data: perms } = await supabase
          .from("role_permissions")
          .select("permission")
          .in("role", matchedRoles);
        const permNames = perms?.map((p) => p.permission) || [];
        setUserPermissions(permNames);
        if (active) setAuth("admin");
      } else {
        if (active) setAuth("not-admin");
      }
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

  // Load dashboard data if authorized
  useEffect(() => {
    if (auth === "admin") {
      fetchBookings();
      fetchDepartures();
      fetchPackages();
      fetchMedia();
      fetchRBAC();
      fetchCustomers();
      fetchLeads();
      fetchPosts();
      fetchCoupons();
      fetchReviews();
      fetchAuditLogs();
      fetchSettings();
    }
  }, [auth]);

  async function fetchCustomers() {
    const { data, error } = await supabase
      .from("customers")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      console.error("Failed to load customers:", error.message);
    } else {
      setCustomers(data as Customer[]);
    }
  }

  async function fetchLeads() {
    const { data, error } = await supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      console.error("Failed to load leads:", error.message);
    } else {
      setLeads(data as Lead[]);
    }
  }

  async function fetchPosts() {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      console.error("Failed to load posts:", error.message);
    } else {
      setBlogPosts(data as BlogPost[]);
    }
  }

  async function fetchCoupons() {
    const { data, error } = await supabase
      .from("coupons")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      console.error("Failed to load coupons:", error.message);
    } else {
      setCoupons(data as Coupon[]);
    }
  }

  async function fetchReviews() {
    const { data, error } = await supabase
      .from("reviews")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      console.error("Failed to load reviews:", error.message);
    } else {
      const mapped = (data as any[]).map((row) => ({
        ...row,
        customer_name: row.customer_name || row.user_name || "Traveler",
        package_name: row.package_name || dbPackages.find((p) => p.slug === row.package_slug)?.name || row.package_slug,
      }));
      setReviews(mapped as Review[]);
    }
  }

  async function fetchAuditLogs() {
    const { data, error } = await supabase
      .from("audit_logs")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      console.error("Failed to load audit logs:", error.message);
    } else {
      setAuditLogs(data as AuditLog[]);
    }
  }

  async function fetchSettings() {
    const { data, error } = await supabase
      .from("settings")
      .select("*");
    if (error) {
      console.error("Failed to load settings:", error.message);
    } else {
      const company = data.find((s) => s.key === "company_settings");
      if (company) setCompanySettings(company.value);
      const homepage = data.find((s) => s.key === "homepage");
      if (homepage) setHomepageSettings(homepage.value);
      const staticPages = data.find((s) => s.key === "static_pages");
      if (staticPages) setStaticPagesSettings(staticPages.value);
    }
  }

  async function logAction(
    action: string,
    targetType: string,
    targetId: string | null,
    details: any = {},
  ) {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    await supabase.from("audit_logs").insert({
      user_id: user?.id || null,
      action,
      target_type: targetType,
      target_id: targetId,
      details: {
        ...details,
        user_email: user?.email || "anonymous",
      },
    });
    fetchAuditLogs();
  }

  async function fetchBookings() {
    setLoading(true);
    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      toast.error("Failed to load bookings: " + error.message);
    } else {
      setBookings(data as Booking[]);
    }
    setLoading(false);
  }

  async function fetchDepartures() {
    const { data, error } = await supabase
      .from("departures")
      .select("*")
      .order("start_date", { ascending: true });
    if (error) {
      toast.error("Failed to load departures: " + error.message);
    } else {
      setDepartures(data as Departure[]);
    }
  }

  async function fetchPackages() {
    const { data, error } = await supabase
      .from("packages")
      .select("*")
      .order("sort_order", { ascending: true });
    if (error) {
      toast.error("Failed to load packages: " + error.message);
    } else {
      setDbPackages(data as DbPackage[]);
    }
  }

  async function fetchMedia() {
    const { data, error } = await supabase
      .from("media_library")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      toast.error("Failed to load media: " + error.message);
    } else {
      setMediaItems(data as MediaItem[]);
    }
  }

  async function fetchRBAC() {
    const { data: rolesData, error: rolesError } = await supabase
      .from("user_roles")
      .select("*");
    const { data: permsData, error: permsError } = await supabase
      .from("role_permissions")
      .select("*");

    if (!rolesError && rolesData) setUserRoles(rolesData as UserRoleMap[]);
    if (!permsError && permsData)
      setRolePermissions(permsData as RolePermissionMap[]);
  }

  // Check custom roles permissions helper
  function hasPerm(permission: string) {
    return (
      userPermissions.includes(permission) ||
      userRolesList.includes("super_admin") ||
      userRolesList.includes("admin")
    );
  }

  // Bookings CRUD methods
  async function updateBooking(id: string, updates: Partial<Booking>) {
    if (!hasPerm("manage_bookings"))
      return toast.error("Unauthorized to modify bookings");
    const { error } = await supabase
      .from("bookings")
      .update(updates)
      .eq("id", id);
    if (error) {
      toast.error("Booking update failed: " + error.message);
    } else {
      toast.success("Booking updated successfully");
      logAction("update_booking", "booking", id, updates);
      fetchBookings();
      fetchDepartures();
      fetchCustomers();
    }
  }

  async function updateBookingStatus(id: string, status: string) {
    await updateBooking(id, { status });
  }

  // Customers CRM methods
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  async function updateCustomer(id: string, updates: Partial<Customer>) {
    if (!hasPerm("manage_bookings"))
      return toast.error("Unauthorized to modify customer records");
    const { error } = await supabase
      .from("customers")
      .update(updates)
      .eq("id", id);
    if (error) {
      toast.error("Customer update failed: " + error.message);
    } else {
      toast.success("Customer profile updated");
      logAction("update_customer", "customer", id, updates);
      fetchCustomers();
    }
  }

  async function toggleVIP(customer: Customer) {
    await updateCustomer(customer.id, { vip: !customer.vip });
  }

  async function toggleBlacklist(customer: Customer) {
    await updateCustomer(customer.id, { blacklisted: !customer.blacklisted });
  }

  // Leads CRM methods
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  async function updateLead(id: string, updates: Partial<Lead>) {
    if (!hasPerm("manage_bookings"))
      return toast.error("Unauthorized to modify leads");
    const { error } = await supabase
      .from("leads")
      .update(updates)
      .eq("id", id);
    if (error) {
      toast.error("Lead update failed: " + error.message);
    } else {
      toast.success("Lead updated successfully");
      logAction("update_lead", "lead", id, updates);
      fetchLeads();
    }
  }

  async function convertLeadToBooking(lead: Lead) {
    if (!hasPerm("manage_bookings"))
      return toast.error("Unauthorized to create bookings");
    const matchedPkg = dbPackages.find(
      (p) =>
        p.slug === lead.interested_package ||
        p.name.toLowerCase() === lead.interested_package?.toLowerCase(),
    );
    const packageName = matchedPkg ? matchedPkg.name : (lead.interested_package || "General Trek");
    const packageSlug = matchedPkg ? matchedPkg.slug : "general-trek";

    const { error } = await supabase
      .from("bookings")
      .insert({
        full_name: lead.name,
        email: lead.email || "no-email@explorehills.in",
        phone: lead.phone || "0000000000",
        package_name: packageName,
        package_slug: packageSlug,
        travel_date: new Date().toISOString().split("T")[0],
        travelers: 1,
        status: "pending",
      });

    if (error) {
      toast.error("Failed to convert lead: " + error.message);
    } else {
      await updateLead(lead.id, { lead_status: "converted" });
      toast.success("Lead converted to booking successfully!");
      fetchBookings();
      fetchCustomers();
    }
  }

  async function saveSettings(key: string, value: any) {
    if (!hasPerm("manage_batches"))
      return toast.error("Unauthorized to modify CMS settings");

    const { data: existing } = await supabase
      .from("settings")
      .select("key")
      .eq("key", key)
      .maybeSingle();

    let err;
    if (existing) {
      const { error } = await supabase
        .from("settings")
        .update({ value, updated_at: new Date().toISOString() })
        .eq("key", key);
      err = error;
    } else {
      const { error } = await supabase
        .from("settings")
        .insert({ key, value });
      err = error;
    }

    if (err) {
      toast.error("Failed to save settings: " + err.message);
    } else {
      toast.success("Settings saved successfully");
      logAction("save_settings", "settings", key, { key });
      fetchSettings();
    }
  }

  // Coupon CRUD methods
  async function handleAddCoupon(e: React.FormEvent) {
    e.preventDefault();
    if (!hasPerm("manage_batches"))
      return toast.error("Unauthorized to manage coupons");

    const { error } = await supabase.from("coupons").insert({
      code: newCoupon.code.toUpperCase().replace(/\s+/g, ""),
      discount_type: newCoupon.discount_type,
      discount_value: Number(newCoupon.discount_value),
      min_booking_amount: newCoupon.min_booking_amount ? Number(newCoupon.min_booking_amount) : null,
      max_uses: newCoupon.max_uses ? Number(newCoupon.max_uses) : null,
      status: newCoupon.status,
      expiry_date: newCoupon.expiry_date ? new Date(newCoupon.expiry_date).toISOString() : null,
    });

    if (error) {
      toast.error("Failed to add coupon: " + error.message);
    } else {
      toast.success("Coupon added successfully");
      logAction("create_coupon", "coupon", null, { code: newCoupon.code });
      setShowAddCouponForm(false);
      setNewCoupon({
        code: "",
        discount_type: "percentage",
        discount_value: 10,
        min_booking_amount: 0,
        max_uses: 100,
        status: "active",
        expiry_date: "",
      });
      fetchCoupons();
    }
  }

  async function handleUpdateCoupon(e: React.FormEvent) {
    e.preventDefault();
    if (!editingCoupon) return;
    if (!hasPerm("manage_batches"))
      return toast.error("Unauthorized to manage coupons");

    const { error } = await supabase
      .from("coupons")
      .update({
        code: editingCoupon.code.toUpperCase().replace(/\s+/g, ""),
        discount_type: editingCoupon.discount_type,
        discount_value: Number(editingCoupon.discount_value),
        min_booking_amount: editingCoupon.min_booking_amount ? Number(editingCoupon.min_booking_amount) : null,
        max_uses: editingCoupon.max_uses ? Number(editingCoupon.max_uses) : null,
        status: editingCoupon.status,
        expiry_date: editingCoupon.expiry_date ? new Date(editingCoupon.expiry_date).toISOString() : null,
      })
      .eq("id", editingCoupon.id);

    if (error) {
      toast.error("Failed to update coupon: " + error.message);
    } else {
      toast.success("Coupon updated successfully");
      logAction("update_coupon", "coupon", editingCoupon.id, { code: editingCoupon.code });
      setEditingCoupon(null);
      fetchCoupons();
    }
  }

  async function handleDeleteCoupon(id: string) {
    if (!confirm("Are you sure you want to delete this coupon?")) return;
    if (!hasPerm("manage_batches"))
      return toast.error("Unauthorized to manage coupons");

    const { error } = await supabase.from("coupons").delete().eq("id", id);
    if (error) {
      toast.error("Failed to delete coupon: " + error.message);
    } else {
      toast.success("Coupon deleted successfully");
      logAction("delete_coupon", "coupon", id, {});
      fetchCoupons();
    }
  }

  function exportDatabaseBackup() {
    const backup = {
      exported_at: new Date().toISOString(),
      bookings,
      customers,
      leads,
      departures,
      homepageSettings,
      companySettings,
      staticPagesSettings,
      posts: blogPosts,
    };

    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `explore_hills_backup_${new Date().toISOString().split("T")[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("Database backup downloaded successfully!");
    logAction("export_backup", "system", null, {});
  }

  // Reviews CRUD methods
  async function handleAddReview(e: React.FormEvent) {
    e.preventDefault();
    if (!hasPerm("manage_batches"))
      return toast.error("Unauthorized to manage reviews");

    const matchedPkg = dbPackages.find(p => p.slug === newReview.package_slug);
    const pkgName = matchedPkg ? matchedPkg.name : "General Trek";

    try {
      const { error } = await supabase.from("reviews").insert({
        package_slug: newReview.package_slug,
        user_name: newReview.customer_name,
        customer_name: newReview.customer_name,
        package_name: pkgName,
        rating: Number(newReview.rating),
        comment: newReview.comment,
        verified: newReview.verified,
        status: newReview.status,
      });

      if (error) {
        // Fallback insert with just standard schema columns (user_name, package_slug)
        const { error: fallbackError } = await supabase.from("reviews").insert({
          package_slug: newReview.package_slug,
          user_name: newReview.customer_name,
          rating: Number(newReview.rating),
          comment: newReview.comment,
          verified: newReview.verified,
          status: newReview.status,
        });

        if (fallbackError) throw fallbackError;
      }
      
      toast.success("Review added successfully");
      logAction("create_review", "review", null, { customer: newReview.customer_name });
      setShowAddReviewForm(false);
      setNewReview({
        package_slug: "",
        customer_name: "",
        rating: 5,
        comment: "",
        verified: true,
        status: "approved",
      });
      fetchReviews();
    } catch (err: any) {
      toast.error("Failed to add review: " + err.message);
    }
  }

  async function updateReviewStatus(id: string, status: "approved" | "pending" | "hidden") {
    if (!hasPerm("manage_batches"))
      return toast.error("Unauthorized to manage reviews");

    const { error } = await supabase
      .from("reviews")
      .update({ status })
      .eq("id", id);

    if (error) {
      toast.error("Failed to update status: " + error.message);
    } else {
      toast.success(`Review status updated to ${status}`);
      logAction("update_review_status", "review", id, { status });
      fetchReviews();
    }
  }

  async function handleDeleteReview(id: string) {
    if (!confirm("Are you sure you want to delete this review?")) return;
    if (!hasPerm("manage_batches"))
      return toast.error("Unauthorized to manage reviews");

    const { error } = await supabase.from("reviews").delete().eq("id", id);
    if (error) {
      toast.error("Failed to delete review: " + error.message);
    } else {
      toast.success("Review deleted successfully");
      logAction("delete_review", "review", id, {});
      fetchReviews();
    }
  }

  // Blog CMS CRUD methods
  async function handleAddPost(e: React.FormEvent) {
    e.preventDefault();
    if (!hasPerm("manage_batches"))
      return toast.error("Unauthorized to manage blog posts");

    const slugVal = newPost.slug || newPost.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
    const { error } = await supabase.from("posts").insert({
      title: newPost.title,
      slug: slugVal,
      content: newPost.content,
      summary: newPost.summary || null,
      featured_image: newPost.featured_image || null,
      categories: newPost.categories,
      tags: newPost.tags,
      author_name: newPost.author_name || null,
      reading_time: newPost.reading_time || null,
      status: newPost.status,
      publish_date: new Date(newPost.publish_date).toISOString(),
      featured: newPost.featured,
      meta_title: newPost.meta_title || null,
      meta_description: newPost.meta_description || null,
      canonical_url: newPost.canonical_url || null,
      og_image: newPost.og_image || null,
    });

    if (error) {
      toast.error("Failed to add post: " + error.message);
    } else {
      toast.success("Blog post added successfully");
      logAction("create_post", "post", null, { title: newPost.title });
      setShowAddPostForm(false);
      setNewPost({
        title: "",
        slug: "",
        content: "",
        summary: "",
        featured_image: "",
        categories: [],
        tags: [],
        author_name: "Atul Nautiyal",
        reading_time: "5 min read",
        status: "draft",
        publish_date: new Date().toISOString().slice(0, 16),
        featured: false,
        meta_title: "",
        meta_description: "",
        canonical_url: "",
        og_image: "",
      });
      fetchPosts();
    }
  }

  async function handleUpdatePost(e: React.FormEvent) {
    e.preventDefault();
    if (!editingPost) return;
    if (!hasPerm("manage_batches"))
      return toast.error("Unauthorized to manage blog posts");

    const { error } = await supabase
      .from("posts")
      .update({
        title: editingPost.title,
        slug: editingPost.slug,
        content: editingPost.content,
        summary: editingPost.summary,
        featured_image: editingPost.featured_image,
        categories: editingPost.categories,
        tags: editingPost.tags,
        author_name: editingPost.author_name,
        reading_time: editingPost.reading_time,
        status: editingPost.status,
        publish_date: new Date(editingPost.publish_date).toISOString(),
        featured: editingPost.featured,
        meta_title: editingPost.meta_title,
        meta_description: editingPost.meta_description,
        canonical_url: editingPost.canonical_url,
        og_image: editingPost.og_image,
        updated_at: new Date().toISOString(),
      })
      .eq("id", editingPost.id);

    if (error) {
      toast.error("Failed to update post: " + error.message);
    } else {
      toast.success("Blog post updated successfully");
      logAction("update_post", "post", editingPost.id, { title: editingPost.title });
      setEditingPost(null);
      fetchPosts();
    }
  }

  async function handleDeletePost(id: string) {
    if (!confirm("Are you sure you want to delete this blog post?")) return;
    if (!hasPerm("manage_batches"))
      return toast.error("Unauthorized to manage blog posts");

    const { error } = await supabase.from("posts").delete().eq("id", id);
    if (error) {
      toast.error("Failed to delete post: " + error.message);
    } else {
      toast.success("Blog post deleted");
      logAction("delete_post", "post", id, {});
      fetchPosts();
    }
  }

  // Departures CRUD methods
  async function handleAddBatch(e: React.FormEvent) {
    e.preventDefault();
    if (!hasPerm("manage_batches"))
      return toast.error("Unauthorized to add batches");
    const { error } = await supabase.from("departures").insert({
      package_slug: newBatch.package_slug,
      start_date: newBatch.start_date,
      end_date: newBatch.end_date,
      max_seats: newBatch.max_seats,
      unlimited_seats: newBatch.unlimited_seats,
      waitlist_enabled: newBatch.waitlist_enabled,
      booking_cutoff_days: newBatch.booking_cutoff_days,
      guide_name: newBatch.guide_name || null,
      guide_phone: newBatch.guide_phone || null,
      meeting_time: newBatch.meeting_time || null,
      meeting_location: newBatch.meeting_location || null,
      internal_notes: newBatch.internal_notes || null,
      status: newBatch.status,
      visibility: newBatch.visibility,
    });
    if (error) {
      toast.error("Failed to create departure: " + error.message);
    } else {
      toast.success("Departure batch scheduled successfully");
      setShowAddForm(false);
      setNewBatch({
        package_slug: "",
        start_date: "",
        end_date: "",
        max_seats: 15,
        unlimited_seats: false,
        waitlist_enabled: false,
        booking_cutoff_days: 2,
        guide_name: "",
        guide_phone: "",
        meeting_time: "",
        meeting_location: "",
        internal_notes: "",
        status: "open",
        visibility: "visible",
      });
      fetchDepartures();
    }
  }

  async function handleUpdateBatch(e: React.FormEvent) {
    e.preventDefault();
    if (!editingBatch) return;
    if (!hasPerm("manage_batches"))
      return toast.error("Unauthorized to update batches");
    const { error } = await supabase
      .from("departures")
      .update({
        package_slug: editingBatch.package_slug,
        start_date: editingBatch.start_date,
        end_date: editingBatch.end_date,
        max_seats: editingBatch.max_seats,
        unlimited_seats: editingBatch.unlimited_seats,
        waitlist_enabled: editingBatch.waitlist_enabled,
        booking_cutoff_days: editingBatch.booking_cutoff_days,
        guide_name: editingBatch.guide_name,
        guide_phone: editingBatch.guide_phone,
        meeting_time: editingBatch.meeting_time,
        meeting_location: editingBatch.meeting_location,
        internal_notes: editingBatch.internal_notes,
        status: editingBatch.status,
        visibility: editingBatch.visibility,
      })
      .eq("id", editingBatch.id);
    if (error) {
      toast.error("Failed to update: " + error.message);
    } else {
      toast.success("Batch updated successfully");
      setEditingBatch(null);
      fetchDepartures();
    }
  }

  async function handleDeleteBatch(id: string) {
    if (!hasPerm("manage_batches"))
      return toast.error("Unauthorized to delete batches");
    if (!confirm("Are you sure you want to delete this departure batch?"))
      return;
    const { error } = await supabase.from("departures").delete().eq("id", id);
    if (error) {
      toast.error("Failed to delete batch: " + error.message);
    } else {
      toast.success("Batch deleted");
      fetchDepartures();
    }
  }

  // Packages CRUD methods
  async function handleAddPackage(e: React.FormEvent) {
    e.preventDefault();
    if (!hasPerm("manage_packages"))
      return toast.error("Unauthorized to manage packages");
    if (!newPackage.slug || !newPackage.name)
      return toast.error("Name and slug are required");

    const { error } = await supabase.from("packages").insert({
      slug: newPackage.slug,
      name: newPackage.name,
      category: newPackage.category,
      sub_category: newPackage.sub_category || null,
      region: newPackage.region || null,
      location: newPackage.location || null,
      state: newPackage.state || null,
      country: newPackage.country || null,
      price: newPackage.price || 0,
      discount_price: newPackage.discount_price || null,
      offer_badge: newPackage.offer_badge || null,
      duration: newPackage.duration || "",
      difficulty: newPackage.difficulty || null,
      altitude: newPackage.altitude || null,
      distance: newPackage.distance || null,
      temperature: newPackage.temperature || null,
      best_season: newPackage.best_season || null,
      pickup_point: newPackage.pickup_point || null,
      drop_point: newPackage.drop_point || null,
      meeting_point: newPackage.meeting_point || null,
      google_maps: newPackage.google_maps || null,
      group_size: newPackage.group_size || "14–15",
      minimum_age: newPackage.minimum_age || null,
      maximum_age: newPackage.maximum_age || null,
      package_code: newPackage.package_code || null,
      status: newPackage.status || "draft",
      sort_order: newPackage.sort_order || 0,
      featured: newPackage.featured || false,
      trending: newPackage.trending || false,
      popular: newPackage.popular || false,
      new_arrival: newPackage.new_arrival || false,
      visibility: newPackage.visibility || "visible",
      image: newPackage.image || null,
      images: newPackage.images || [],
    });

    if (error) {
      toast.error("Failed to create package: " + error.message);
    } else {
      toast.success("Package created successfully");
      setShowAddPackageForm(false);
      fetchPackages();
    }
  }

  async function handleUpdatePackage(e: React.FormEvent) {
    e.preventDefault();
    if (!editingPackage) return;
    if (!hasPerm("manage_packages"))
      return toast.error("Unauthorized to manage packages");

    const { error } = await supabase
      .from("packages")
      .update({
        name: editingPackage.name,
        category: editingPackage.category,
        sub_category: editingPackage.sub_category,
        region: editingPackage.region,
        location: editingPackage.location,
        state: editingPackage.state,
        country: editingPackage.country,
        price: editingPackage.price,
        discount_price: editingPackage.discount_price,
        offer_badge: editingPackage.offer_badge,
        duration: editingPackage.duration,
        difficulty: editingPackage.difficulty,
        altitude: editingPackage.altitude,
        distance: editingPackage.distance,
        temperature: editingPackage.temperature,
        best_season: editingPackage.best_season,
        pickup_point: editingPackage.pickup_point,
        drop_point: editingPackage.drop_point,
        meeting_point: editingPackage.meeting_point,
        google_maps: editingPackage.google_maps,
        group_size: editingPackage.group_size,
        minimum_age: editingPackage.minimum_age,
        maximum_age: editingPackage.maximum_age,
        package_code: editingPackage.package_code,
        status: editingPackage.status,
        sort_order: editingPackage.sort_order,
        featured: editingPackage.featured,
        trending: editingPackage.trending,
        popular: editingPackage.popular,
        new_arrival: editingPackage.new_arrival,
        visibility: editingPackage.visibility,
        image: editingPackage.image,
        images: editingPackage.images,
      })
      .eq("slug", editingPackage.slug);

    if (error) {
      toast.error("Failed to update package: " + error.message);
    } else {
      toast.success("Package updated");
      setEditingPackage(null);
      fetchPackages();
    }
  }

  async function handleDeletePackage(slug: string) {
    if (!hasPerm("manage_packages"))
      return toast.error("Unauthorized to manage packages");
    if (!confirm("Are you sure you want to delete this package?")) return;
    const { error } = await supabase.from("packages").delete().eq("slug", slug);
    if (error) {
      toast.error("Failed to delete package: " + error.message);
    } else {
      toast.success("Package deleted");
      fetchPackages();
    }
  }

  async function handleDuplicatePackage(pkg: DbPackage) {
    if (!hasPerm("manage_packages"))
      return toast.error("Unauthorized to manage packages");
    const newSlug = `${pkg.slug}-copy-${Date.now().toString().slice(-4)}`;
    const newName = `${pkg.name} (Copy)`;
    const { error } = await supabase.from("packages").insert({
      ...pkg,
      slug: newSlug,
      name: newName,
      status: "draft",
      created_at: new Date().toISOString(),
    });
    if (error) {
      toast.error("Failed to duplicate package: " + error.message);
    } else {
      toast.success("Package duplicated");
      fetchPackages();
    }
  }

  // Itinerary Builder actions
  useEffect(() => {
    if (selectedItinerarySlug) {
      fetchItinerary(selectedItinerarySlug);
    } else {
      setItineraryDays([]);
    }
  }, [selectedItinerarySlug]);

  async function fetchItinerary(slug: string) {
    const { data, error } = await supabase
      .from("package_itineraries")
      .select("*")
      .eq("package_slug", slug)
      .order("day_number", { ascending: true });
    if (error) {
      toast.error("Failed to load itinerary: " + error.message);
    } else {
      setItineraryDays((data as ItineraryDay[]) || []);
    }
  }

  async function handleSaveItinerary() {
    if (!hasPerm("manage_packages")) return toast.error("Unauthorized");
    // Upsert days
    setLoading(true);
    // Delete existing days for slug first to prevent primary key conflicts, or perform incremental upsert
    const { error: delError } = await supabase
      .from("package_itineraries")
      .delete()
      .eq("package_slug", selectedItinerarySlug);

    if (delError) {
      toast.error("Failed to clear old days: " + delError.message);
      setLoading(false);
      return;
    }

    if (itineraryDays.length === 0) {
      toast.success("Itinerary cleared successfully");
      setLoading(false);
      return;
    }

    const payload = itineraryDays.map((d, index) => ({
      package_slug: selectedItinerarySlug,
      day_number: index + 1,
      title: d.title || `Day ${index + 1}`,
      subtitle: d.subtitle || null,
      description: d.description || null,
      meals: d.meals || null,
      stay: d.stay || null,
      distance: d.distance || null,
      altitude: d.altitude || null,
      travel_time: d.travel_time || null,
      activities: d.activities || null,
      notes: d.notes || null,
      images: d.images || null,
    }));

    const { error } = await supabase
      .from("package_itineraries")
      .insert(payload);
    setLoading(false);
    if (error) {
      toast.error("Failed to save itinerary: " + error.message);
    } else {
      toast.success("Itinerary saved successfully");
      fetchItinerary(selectedItinerarySlug);
    }
  }

  function moveDay(index: number, direction: "up" | "down") {
    if (direction === "up" && index === 0) return;
    if (direction === "down" && index === itineraryDays.length - 1) return;
    const target = direction === "up" ? index - 1 : index + 1;
    const copy = [...itineraryDays];
    const temp = copy[index];
    copy[index] = copy[target];
    copy[target] = temp;
    setItineraryDays(copy.map((d, idx) => ({ ...d, day_number: idx + 1 })));
  }

  // Section Content Editor actions
  useEffect(() => {
    if (selectedContentSlug) {
      const pkg = dbPackages.find((p) => p.slug === selectedContentSlug);
      if (pkg) {
        setContentFields({
          overview: pkg.overview || "",
          highlights: pkg.highlights || [],
          inclusions: pkg.inclusions || [],
          exclusions: pkg.exclusions || [],
          things_to_carry: pkg.things_to_carry || [],
          fitness_requirements: pkg.fitness_requirements || "",
          cancellation_policy: pkg.cancellation_policy || "",
          terms_conditions: pkg.terms_conditions || "",
          know_before_you_go: pkg.know_before_you_go || "",
          safety_instructions: pkg.safety_instructions || "",
          emergency_contacts: pkg.emergency_contacts || "",
          medical_requirements: pkg.medical_requirements || "",
          faqs: pkg.faqs || [],
        });
      }
    }
  }, [selectedContentSlug, dbPackages]);

  async function handleSaveContent() {
    if (!hasPerm("manage_content")) return toast.error("Unauthorized");
    setLoading(true);
    const { error } = await supabase
      .from("packages")
      .update(contentFields)
      .eq("slug", selectedContentSlug);
    setLoading(false);
    if (error) {
      toast.error("Failed to save content: " + error.message);
    } else {
      toast.success("Content sections saved successfully");
      fetchPackages();
    }
  }

  // Media library upload actions with canvas processing
  async function processAndUploadImage(file: File, folderName: string) {
    setLoading(true);
    try {
      // Rotation and quality compression using client side HTML5 canvas
      const img = new Image();
      img.src = URL.createObjectURL(file);
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject();
      });

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Could not create canvas context");

      if (imageProcessConfig.rotation % 180 === 0) {
        canvas.width = img.width;
        canvas.height = img.height;
      } else {
        canvas.width = img.height;
        canvas.height = img.width;
      }

      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate((imageProcessConfig.rotation * Math.PI) / 180);
      ctx.drawImage(img, -img.width / 2, -img.height / 2);

      const blob = await new Promise<Blob | null>((resolve) => {
        canvas.toBlob(
          (b) => resolve(b),
          "image/jpeg",
          imageProcessConfig.quality,
        );
      });

      if (!blob) throw new Error("Compression failed");

      // Generate filename
      const fileExt = "jpg";
      const cleanFileName = file.name
        .replace(/[^a-zA-Z0-9]/g, "_")
        .toLowerCase();
      const finalPath = `${folderName}/${Date.now()}_${cleanFileName}.${fileExt}`;

      const { data: storageData, error: storageError } = await supabase.storage
        .from("media")
        .upload(finalPath, blob, {
          contentType: "image/jpeg",
          cacheControl: "3600",
        });

      if (storageError) throw storageError;

      // Get public URL
      const { data: urlData } = supabase.storage
        .from("media")
        .getPublicUrl(finalPath);

      // Save to media_library DB Table
      const { error: dbError } = await supabase.from("media_library").insert({
        filename: file.name,
        url: urlData.publicUrl,
        size_bytes: blob.size,
        content_type: "image/jpeg",
        folder: folderName,
      });

      if (dbError) throw dbError;

      toast.success("Image uploaded & optimized successfully!");
      fetchMedia();
    } catch (err) {
      toast.error(
        "Upload failed: " + (err instanceof Error ? err.message : String(err)),
      );
    } finally {
      setLoading(false);
      // reset rotation after upload
      setImageProcessConfig((prev) => ({ ...prev, rotation: 0 }));
    }
  }

  async function handleDeleteMedia(item: MediaItem) {
    if (!hasPerm("manage_content")) return toast.error("Unauthorized");
    if (!confirm("Are you sure you want to delete this media asset?")) return;

    // Parse path from URL
    const parts = item.url.split("/storage/v1/object/public/media/");
    const storagePath = parts[1];
    if (storagePath) {
      await supabase.storage.from("media").remove([storagePath]);
    }

    const { error } = await supabase
      .from("media_library")
      .delete()
      .eq("id", item.id);
    if (error) {
      toast.error("Failed to delete from DB: " + error.message);
    } else {
      toast.success("Media asset deleted");
      fetchMedia();
    }
  }

  // RBAC Config actions
  async function handleAddRoleMapping(e: React.FormEvent) {
    e.preventDefault();
    if (!hasPerm("manage_users")) return toast.error("Unauthorized");
    const { error } = await supabase.from("user_roles").insert({
      user_id: newRoleMapping.user_id,
      role: newRoleMapping.role,
    });
    if (error) {
      toast.error("Failed to assign role: " + error.message);
    } else {
      toast.success("Role assigned successfully");
      setNewRoleMapping({ user_id: "", role: "read_only" });
      fetchRBAC();
    }
  }

  async function handleDeleteRoleMapping(id: string) {
    if (!hasPerm("manage_users")) return toast.error("Unauthorized");
    if (!confirm("Remove this role mapping?")) return;
    const { error } = await supabase.from("user_roles").delete().eq("id", id);
    if (error) {
      toast.error("Failed to remove role: " + error.message);
    } else {
      toast.success("Role removed");
      fetchRBAC();
    }
  }

  async function handleTogglePermission(role: string, perm: string) {
    if (!hasPerm("manage_users")) return toast.error("Unauthorized");
    const exists = rolePermissions.find(
      (rp) => rp.role === role && rp.permission === perm,
    );
    if (exists) {
      const { error } = await supabase
        .from("role_permissions")
        .delete()
        .eq("id", exists.id);
      if (error) toast.error(error.message);
      else toast.success(`Revoked ${perm} from ${role}`);
    } else {
      const { error } = await supabase
        .from("role_permissions")
        .insert({ role, permission: perm });
      if (error) toast.error(error.message);
      else toast.success(`Granted ${perm} to ${role}`);
    }
    fetchRBAC();
  }

  // Filtered lists for rendering
  const filteredBookings = useMemo(() => {
    return bookings.filter((b) => {
      const matchQuery =
        b.full_name.toLowerCase().includes(query.toLowerCase()) ||
        b.email.toLowerCase().includes(query.toLowerCase()) ||
        b.phone.includes(query) ||
        b.package_name.toLowerCase().includes(query.toLowerCase());
      const matchStatus = statusFilter === "all" || b.status === statusFilter;
      return matchQuery && matchStatus;
    });
  }, [bookings, query, statusFilter]);

  const filteredDepartures = useMemo(() => {
    return departures.filter((d) => {
      if (query === "") return true;
      return d.package_slug.toLowerCase().includes(query.toLowerCase());
    });
  }, [departures, query]);

  const filteredMedia = useMemo(() => {
    return mediaItems.filter((item) => {
      if (mediaFolderFilter === "all") return true;
      return item.folder === mediaFolderFilter;
    });
  }, [mediaItems, mediaFolderFilter]);

  const filteredCustomers = useMemo(() => {
    return customers.filter((c) => {
      if (query === "") return true;
      const q = query.toLowerCase();
      return (
        c.name.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        (c.phone && c.phone.includes(q)) ||
        c.tags.some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [customers, query]);

  const filteredLeads = useMemo(() => {
    return leads.filter((l) => {
      if (query === "") return true;
      const q = query.toLowerCase();
      return (
        l.name.toLowerCase().includes(q) ||
        (l.email && l.email.toLowerCase().includes(q)) ||
        (l.phone && l.phone.includes(q)) ||
        (l.message && l.message.toLowerCase().includes(q)) ||
        (l.interested_package && l.interested_package.toLowerCase().includes(q))
      );
    });
  }, [leads, query]);

  const filteredBlogPosts = useMemo(() => {
    return blogPosts.filter((p) => {
      if (query === "") return true;
      const q = query.toLowerCase();
      return (
        p.title.toLowerCase().includes(q) ||
        p.categories.some((c) => c.toLowerCase().includes(q)) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [blogPosts, query]);

  const filteredCoupons = useMemo(() => {
    return coupons.filter((c) => {
      if (query === "") return true;
      return c.code.toLowerCase().includes(query.toLowerCase());
    });
  }, [coupons, query]);

  const filteredReviews = useMemo(() => {
    return reviews.filter((r) => {
      if (query === "") return true;
      const q = query.toLowerCase();
      return (
        r.user_name.toLowerCase().includes(q) ||
        (r.comment && r.comment.toLowerCase().includes(q)) ||
        r.package_slug.toLowerCase().includes(q)
      );
    });
  }, [reviews, query]);

  const filteredAuditLogs = useMemo(() => {
    return auditLogs.filter((log) => {
      if (query === "") return true;
      const q = query.toLowerCase();
      return (
        log.action.toLowerCase().includes(q) ||
        log.target_type.toLowerCase().includes(q) ||
        (log.target_id && log.target_id.toLowerCase().includes(q))
      );
    });
  }, [auditLogs, query]);

  // Calculations for stats
  const totalTravelers = useMemo(() => {
    return bookings
      .filter((b) => b.status === "confirmed")
      .reduce((sum, b) => sum + b.travelers, 0);
  }, [bookings]);

  const occupancyRate = useMemo(() => {
    const activeDeps = departures.filter(
      (d) => d.status !== "cancelled" && !d.unlimited_seats,
    );
    if (activeDeps.length === 0) return 0;
    const totalMax = activeDeps.reduce((sum, d) => sum + d.max_seats, 0);
    const totalBooked = activeDeps.reduce((sum, d) => sum + d.booked_seats, 0);
    return Math.round((totalBooked / totalMax) * 100);
  }, [departures]);

  if (auth === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (auth === "signed-out") {
    return <SignIn />;
  }

  if (auth === "not-admin") {
    return (
      <section className="min-h-screen grid place-items-center px-4 bg-background">
        <div className="text-center max-w-md">
          <ShieldAlert className="h-16 w-16 mx-auto text-ember animate-bounce" />
          <h1 className="mt-6 font-display text-3xl font-bold text-foreground">
            Access Denied
          </h1>
          <p className="mt-3 text-muted-foreground">
            You do not have administrative staff clearances. Ask Atul Nautiyal
            to grant roles mapping.
          </p>
          <button
            onClick={() => supabase.auth.signOut()}
            className="mt-6 rounded-full bg-primary text-primary-foreground px-6 py-2.5 text-sm font-semibold hover:opacity-90 transition cursor-pointer"
          >
            Sign out
          </button>
        </div>
      </section>
    );
  }

  return (
    <>
      <PageHero
        eyebrow="Console"
        title={
          <>
            Control <span className="text-gradient">Center</span>
          </>
        }
        subtitle="Manage itineraries, client bookings, media files, departure dates, and internal controls."
        image={hero}
      />

      <section className="py-12 bg-background min-h-[600px]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          {/* Dashboard Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Stat label="Total Bookings" value={bookings.length.toString()} />
            <Stat
              label="Active Travelers"
              value={totalTravelers.toString()}
              icon={<Users className="h-4.5 w-4.5" />}
              highlight
            />
            <Stat
              label="Batches Scheduled"
              value={departures
                .filter((d) => d.status !== "cancelled")
                .length.toString()}
            />
            <Stat label="Avg Occupancy" value={`${occupancyRate}%`} />
          </div>

          {/* Navigation tabs */}
          <div className="flex flex-wrap gap-2 border-b border-border pb-4 mb-6">
            <button
              onClick={() => setActiveTab("bookings")}
              className={`rounded-xl px-4 py-2 text-sm font-semibold transition cursor-pointer ${activeTab === "bookings" ? "bg-primary text-primary-foreground" : "bg-card hover:bg-muted text-foreground border border-border"}`}
            >
              Bookings
            </button>
            <button
              onClick={() => setActiveTab("batches")}
              className={`rounded-xl px-4 py-2 text-sm font-semibold transition cursor-pointer ${activeTab === "batches" ? "bg-primary text-primary-foreground" : "bg-card hover:bg-muted text-foreground border border-border"}`}
            >
              Departure Batches
            </button>
            <button
              onClick={() => setActiveTab("packages")}
              className={`rounded-xl px-4 py-2 text-sm font-semibold transition cursor-pointer ${activeTab === "packages" ? "bg-primary text-primary-foreground" : "bg-card hover:bg-muted text-foreground border border-border"}`}
            >
              Packages CRUD
            </button>
            <button
              onClick={() => setActiveTab("itinerary")}
              className={`rounded-xl px-4 py-2 text-sm font-semibold transition cursor-pointer ${activeTab === "itinerary" ? "bg-primary text-primary-foreground" : "bg-card hover:bg-muted text-foreground border border-border"}`}
            >
              Itinerary Builder
            </button>
            <button
              onClick={() => setActiveTab("content")}
              className={`rounded-xl px-4 py-2 text-sm font-semibold transition cursor-pointer ${activeTab === "content" ? "bg-primary text-primary-foreground" : "bg-card hover:bg-muted text-foreground border border-border"}`}
            >
              Section Content
            </button>
            <button
              onClick={() => setActiveTab("media")}
              className={`rounded-xl px-4 py-2 text-sm font-semibold transition cursor-pointer ${activeTab === "media" ? "bg-primary text-primary-foreground" : "bg-card hover:bg-muted text-foreground border border-border"}`}
            >
              Media Library
            </button>
            <button
              onClick={() => setActiveTab("customers")}
              className={`rounded-xl px-4 py-2 text-sm font-semibold transition cursor-pointer ${activeTab === "customers" ? "bg-primary text-primary-foreground" : "bg-card hover:bg-muted text-foreground border border-border"}`}
            >
              Customers CRM
            </button>
            <button
              onClick={() => setActiveTab("leads")}
              className={`rounded-xl px-4 py-2 text-sm font-semibold transition cursor-pointer ${activeTab === "leads" ? "bg-primary text-primary-foreground" : "bg-card hover:bg-muted text-foreground border border-border"}`}
            >
              Leads CRM
            </button>
            <button
              onClick={() => setActiveTab("blogs")}
              className={`rounded-xl px-4 py-2 text-sm font-semibold transition cursor-pointer ${activeTab === "blogs" ? "bg-primary text-primary-foreground" : "bg-card hover:bg-muted text-foreground border border-border"}`}
            >
              Blog CMS
            </button>
            <button
              onClick={() => setActiveTab("coupons")}
              className={`rounded-xl px-4 py-2 text-sm font-semibold transition cursor-pointer ${activeTab === "coupons" ? "bg-primary text-primary-foreground" : "bg-card hover:bg-muted text-foreground border border-border"}`}
            >
              Coupons
            </button>
            <button
              onClick={() => setActiveTab("reviews")}
              className={`rounded-xl px-4 py-2 text-sm font-semibold transition cursor-pointer ${activeTab === "reviews" ? "bg-primary text-primary-foreground" : "bg-card hover:bg-muted text-foreground border border-border"}`}
            >
              Reviews
            </button>
            <button
              onClick={() => setActiveTab("settings")}
              className={`rounded-xl px-4 py-2 text-sm font-semibold transition cursor-pointer ${activeTab === "settings" ? "bg-primary text-primary-foreground" : "bg-card hover:bg-muted text-foreground border border-border"}`}
            >
              CMS Settings
            </button>
            <button
              onClick={() => setActiveTab("audit")}
              className={`rounded-xl px-4 py-2 text-sm font-semibold transition cursor-pointer ${activeTab === "audit" ? "bg-primary text-primary-foreground" : "bg-card hover:bg-muted text-foreground border border-border"}`}
            >
              Audit Logs
            </button>
            <button
              onClick={() => setActiveTab("analytics")}
              className={`rounded-xl px-4 py-2 text-sm font-semibold transition cursor-pointer ${activeTab === "analytics" ? "bg-primary text-primary-foreground" : "bg-card hover:bg-muted text-foreground border border-border"}`}
            >
              Analytics
            </button>
            <button
              onClick={() => setActiveTab("rbac")}
              className={`rounded-xl px-4 py-2 text-sm font-semibold transition cursor-pointer ${activeTab === "rbac" ? "bg-primary text-primary-foreground" : "bg-card hover:bg-muted text-foreground border border-border"}`}
            >
              RBAC Permissions
            </button>
            <button
              onClick={() => supabase.auth.signOut()}
              className="ml-auto rounded-xl bg-muted hover:bg-destructive hover:text-white px-4 py-2 text-sm font-semibold transition flex items-center gap-1.5 cursor-pointer text-muted-foreground border border-border"
            >
              <LogOut className="h-4 w-4" /> Sign out
            </button>
          </div>

          {/* Search bar */}
          {activeTab !== "rbac" && activeTab !== "media" && activeTab !== "settings" && activeTab !== "analytics" && (
            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder={
                  activeTab === "bookings"
                    ? "Search client name, email, trek..."
                    : activeTab === "customers"
                      ? "Search customer name, email, phone, tags..."
                      : activeTab === "leads"
                        ? "Search lead name, email, message, interested package..."
                        : activeTab === "blogs"
                          ? "Search blog title, categories, tags..."
                          : activeTab === "coupons"
                            ? "Search coupon code..."
                            : activeTab === "reviews"
                              ? "Search reviewer name, comment..."
                              : "Search package slug..."
                }
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full rounded-2xl border border-input bg-card pl-11 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring text-foreground"
              />
            </div>
          )}

          {/* ================================== BOOKINGS TAB ================================== */}
          {activeTab === "bookings" && (
            <div className="rounded-3xl border border-border bg-card shadow-card overflow-hidden">
              <div className="p-4 border-b border-border flex items-center justify-between gap-4 flex-wrap">
                <h3 className="font-display text-lg font-bold text-foreground">
                  Clients Booking List
                </h3>
                <div className="flex gap-2">
                  {["all", "pending", "confirmed", "cancelled"].map((st) => (
                    <button
                      key={st}
                      onClick={() => setStatusFilter(st)}
                      className={`capitalize rounded-lg px-3 py-1 text-xs font-semibold border ${statusFilter === st ? "bg-primary text-primary-foreground border-transparent" : "bg-background text-muted-foreground border-border hover:bg-muted"}`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-muted text-muted-foreground text-xs uppercase font-semibold">
                    <tr>
                      <th className="px-6 py-4">Client Details</th>
                      <th className="px-6 py-4">Adventure / Date</th>
                      <th className="px-6 py-4">Pax</th>
                      <th className="px-6 py-4">Requirements</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border text-foreground">
                    {filteredBookings.length === 0 ? (
                      <tr>
                        <td
                          colSpan={6}
                          className="px-6 py-10 text-center text-muted-foreground"
                        >
                          No bookings matches the criteria.
                        </td>
                      </tr>
                    ) : (
                      filteredBookings.map((b) => (
                        <tr key={b.id} className="hover:bg-muted/30 transition">
                          <td className="px-6 py-4">
                            <div className="font-semibold">{b.full_name}</div>
                            <div className="text-xs text-muted-foreground">
                              {b.email}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {b.phone}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="font-semibold">
                              {b.package_name}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Date: {b.travel_date}
                            </div>
                          </td>
                          <td className="px-6 py-4 font-semibold">
                            {b.travelers}
                          </td>
                          <td
                            className="px-6 py-4 text-xs max-w-xs truncate"
                            title={b.special_requirements || ""}
                          >
                            {b.special_requirements || "None"}
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${b.status === "confirmed" ? "bg-green-100 text-green-800" : b.status === "cancelled" ? "bg-red-100 text-red-800" : "bg-yellow-100 text-yellow-800"}`}
                            >
                              {b.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right space-x-1.5 whitespace-nowrap">
                            <button
                              onClick={() => setSelectedBooking(b)}
                              className="rounded bg-primary/10 px-2 py-1 text-xs font-semibold text-primary hover:bg-primary/20 transition cursor-pointer"
                            >
                              Edit Details
                            </button>
                            {b.status !== "confirmed" && (
                              <button
                                onClick={() =>
                                  updateBookingStatus(b.id, "confirmed")
                                }
                                className="rounded bg-green-50 px-2 py-1 text-xs font-semibold text-green-700 hover:bg-green-100 transition"
                              >
                                Confirm
                              </button>
                            )}
                            {b.status !== "cancelled" && (
                              <button
                                onClick={() =>
                                  updateBookingStatus(b.id, "cancelled")
                                }
                                className="rounded bg-red-50 px-2 py-1 text-xs font-semibold text-red-700 hover:bg-red-100 transition"
                              >
                                Cancel
                              </button>
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          {/* ================================== LEADS CRM TAB ================================== */}
          {activeTab === "leads" && (
            <div className="space-y-6">
              <div className="rounded-3xl border border-border bg-card shadow-card overflow-hidden">
                <div className="p-4 border-b border-border flex items-center justify-between gap-4 flex-wrap">
                  <h3 className="font-display text-lg font-bold text-foreground">
                    Inquiries & Contact Leads
                  </h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-muted text-muted-foreground text-xs uppercase font-semibold">
                      <tr>
                        <th className="px-6 py-4">Lead Details</th>
                        <th className="px-6 py-4">Inquiry / Message</th>
                        <th className="px-6 py-4">Interest / Source</th>
                        <th className="px-6 py-4">Status / Staff</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border text-foreground">
                      {filteredLeads.length === 0 ? (
                        <tr>
                          <td
                            colSpan={5}
                            className="px-6 py-10 text-center text-muted-foreground"
                          >
                            No leads captured yet.
                          </td>
                        </tr>
                      ) : (
                        filteredLeads.map((l) => (
                          <tr key={l.id} className="hover:bg-muted/30 transition">
                            <td className="px-6 py-4">
                              <div className="font-semibold text-foreground">{l.name}</div>
                              <div className="text-xs text-muted-foreground">{l.email || "No email"}</div>
                              <div className="text-xs text-muted-foreground">{l.phone || "No phone"}</div>
                            </td>
                            <td className="px-6 py-4 max-w-sm">
                              <p className="text-xs font-semibold text-foreground truncate" title={l.message || ""}>
                                {l.message || "No message content"}
                              </p>
                              <div className="text-[10px] text-muted-foreground mt-0.5">
                                Submitted: {new Date(l.created_at).toLocaleString()}
                              </div>
                            </td>
                            <td className="px-6 py-4 text-xs">
                              <div className="font-semibold text-primary">{l.interested_package || "General inquiry"}</div>
                              <div className="text-muted-foreground mt-0.5 capitalize">Src: {l.lead_source?.replace(/_/g, " ") || "unknown"}</div>
                            </td>
                            <td className="px-6 py-4 text-xs space-y-1">
                              <div>
                                <span className={`inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${l.lead_status === "new" ? "bg-blue-100 text-blue-800" : l.lead_status === "contacted" ? "bg-yellow-100 text-yellow-800" : l.lead_status === "converted" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                                  {l.lead_status}
                                </span>
                              </div>
                              <div className="text-muted-foreground">
                                Staff: {l.assigned_staff || "Unassigned"}
                              </div>
                            </td>
                            <td className="px-6 py-4 text-right space-x-2 whitespace-nowrap">
                              <button
                                onClick={() => setSelectedLead(l)}
                                className="rounded bg-primary/10 px-2 py-1 text-xs font-semibold text-primary hover:bg-primary/20 transition cursor-pointer"
                              >
                                Edit Details
                              </button>
                              {l.lead_status !== "converted" && (
                                <button
                                  onClick={() => convertLeadToBooking(l)}
                                  className="rounded bg-green-50 px-2 py-1 text-xs font-semibold text-green-700 hover:bg-green-100 transition cursor-pointer"
                                >
                                  Convert to Booking
                                </button>
                              )}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Lead Details Edit Modal */}
          {selectedLead && (
            <div className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4">
              <div className="w-full max-w-xl rounded-3xl bg-card border border-border p-6 shadow-elegant text-foreground max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center border-b border-border pb-4 mb-4">
                  <div>
                    <h4 className="font-display text-xl font-bold">
                      Edit Inquiry Lead
                    </h4>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Lead Reference: {selectedLead.id}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedLead(null)}
                    className="rounded-full hover:bg-muted p-1 cursor-pointer"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <div className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold uppercase text-muted-foreground">
                        Lead Status
                      </label>
                      <select
                        value={selectedLead.lead_status}
                        onChange={(e) =>
                          setSelectedLead({ ...selectedLead, lead_status: e.target.value })
                        }
                        className="mt-1.5 w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm"
                      >
                        <option value="new">New Inquiry</option>
                        <option value="contacted">Contacted / In Progress</option>
                        <option value="converted">Converted to Booking</option>
                        <option value="lost">Lost Lead</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-semibold uppercase text-muted-foreground">
                        Assigned Staff
                      </label>
                      <input
                        type="text"
                        value={selectedLead.assigned_staff || ""}
                        onChange={(e) =>
                          setSelectedLead({ ...selectedLead, assigned_staff: e.target.value })
                        }
                        placeholder="Staff Name"
                        className="mt-1.5 w-full rounded-xl border border-input bg-background px-3.5 py-2.5 text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold uppercase text-muted-foreground">
                        Follow-up Reminder Date
                      </label>
                      <input
                        type="date"
                        value={selectedLead.reminder_date || ""}
                        onChange={(e) =>
                          setSelectedLead({ ...selectedLead, reminder_date: e.target.value })
                        }
                        className="mt-1.5 w-full rounded-xl border border-input bg-background px-3.5 py-2.5 text-sm"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold uppercase text-muted-foreground">
                        Interested Trek / Package
                      </label>
                      <input
                        type="text"
                        value={selectedLead.interested_package || ""}
                        onChange={(e) =>
                          setSelectedLead({ ...selectedLead, interested_package: e.target.value })
                        }
                        className="mt-1.5 w-full rounded-xl border border-input bg-background px-3.5 py-2.5 text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold uppercase text-muted-foreground">
                      Client Message (Read Only)
                    </label>
                    <p className="mt-1.5 text-xs text-muted-foreground bg-muted p-3 rounded-xl border border-border whitespace-pre-wrap">
                      {selectedLead.message || "No message content"}
                    </p>
                  </div>

                  <div>
                    <label className="text-xs font-semibold uppercase text-muted-foreground">
                      Internal Notes
                    </label>
                    <textarea
                      value={selectedLead.internal_notes || ""}
                      onChange={(e) =>
                        setSelectedLead({ ...selectedLead, internal_notes: e.target.value })
                      }
                      placeholder="Notes from initial call, budget expectations..."
                      className="mt-1.5 w-full rounded-xl border border-input bg-background px-3.5 py-2 text-sm h-24 resize-none"
                    />
                  </div>

                  <div className="flex justify-end gap-2 border-t border-border pt-4">
                    <button
                      type="button"
                      onClick={() => setSelectedLead(null)}
                      className="rounded-xl border border-border px-4 py-2.5 text-xs font-semibold hover:bg-muted cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={async () => {
                        await updateLead(selectedLead.id, {
                          lead_status: selectedLead.lead_status,
                          assigned_staff: selectedLead.assigned_staff,
                          reminder_date: selectedLead.reminder_date,
                          interested_package: selectedLead.interested_package,
                          internal_notes: selectedLead.internal_notes,
                        });
                        setSelectedLead(null);
                      }}
                      className="rounded-xl bg-primary text-primary-foreground px-5 py-2.5 text-xs font-semibold hover:opacity-95 shadow-glow cursor-pointer"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* ================================== CUSTOMERS CRM TAB ================================== */}
          {activeTab === "customers" && (
            <div className="space-y-6">
              <div className="rounded-3xl border border-border bg-card shadow-card overflow-hidden">
                <div className="p-4 border-b border-border flex items-center justify-between gap-4 flex-wrap">
                  <h3 className="font-display text-lg font-bold text-foreground">
                    Customer Directory & Profiles
                  </h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-muted text-muted-foreground text-xs uppercase font-semibold">
                      <tr>
                        <th className="px-6 py-4">Customer Details</th>
                        <th className="px-6 py-4">Contact Info</th>
                        <th className="px-6 py-4">Tags / Labels</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border text-foreground">
                      {filteredCustomers.length === 0 ? (
                        <tr>
                          <td
                            colSpan={5}
                            className="px-6 py-10 text-center text-muted-foreground"
                          >
                            No customers found.
                          </td>
                        </tr>
                      ) : (
                        filteredCustomers.map((c) => (
                          <tr key={c.id} className="hover:bg-muted/30 transition">
                            <td className="px-6 py-4">
                              <div className="font-semibold text-foreground flex items-center gap-1.5">
                                {c.name}
                                {c.vip && (
                                  <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider">
                                    VIP
                                  </span>
                                )}
                                {c.blacklisted && (
                                  <span className="bg-red-100 text-red-800 text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider">
                                    Blacklisted
                                  </span>
                                )}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                Joined: {new Date(c.created_at).toLocaleDateString()}
                              </div>
                            </td>
                            <td className="px-6 py-4 text-xs">
                              <div>{c.email}</div>
                              <div className="text-muted-foreground mt-0.5">{c.phone || "No phone"}</div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex flex-wrap gap-1">
                                {c.tags && c.tags.length > 0 ? (
                                  c.tags.map((tag) => (
                                    <span key={tag} className="text-[10px] bg-primary/10 text-primary font-semibold px-2 py-0.5 rounded-full">
                                      {tag}
                                    </span>
                                  ))
                                ) : (
                                  <span className="text-xs text-muted-foreground">-</span>
                                )}
                              </div>
                            </td>
                            <td className="px-6 py-4 text-xs font-semibold">
                              {c.blacklisted ? (
                                <span className="text-red-600">Restricted</span>
                              ) : (
                                <span className="text-green-600">Active</span>
                              )}
                            </td>
                            <td className="px-6 py-4 text-right space-x-2 whitespace-nowrap">
                              <button
                                onClick={() => setSelectedCustomer(c)}
                                className="rounded bg-primary/10 px-2 py-1 text-xs font-semibold text-primary hover:bg-primary/20 transition cursor-pointer"
                              >
                                Edit Profile
                              </button>
                              <button
                                onClick={() => toggleVIP(c)}
                                className={`rounded px-2 py-1 text-xs font-semibold transition cursor-pointer ${c.vip ? "bg-amber-100 text-amber-800 hover:bg-amber-200" : "bg-muted text-foreground hover:bg-muted/80"}`}
                              >
                                {c.vip ? "Remove VIP" : "Make VIP"}
                              </button>
                              <button
                                onClick={() => toggleBlacklist(c)}
                                className={`rounded px-2 py-1 text-xs font-semibold transition cursor-pointer ${c.blacklisted ? "bg-green-100 text-green-800 hover:bg-green-200" : "bg-red-50 text-red-700 hover:bg-red-100"}`}
                              >
                                {c.blacklisted ? "Whitelist" : "Blacklist"}
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Customer Profile Edit Dialog */}
          {selectedCustomer && (
            <div className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4">
              <div className="w-full max-w-2xl rounded-3xl bg-card border border-border p-6 shadow-elegant text-foreground max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center border-b border-border pb-4 mb-4">
                  <div>
                    <h4 className="font-display text-xl font-bold">
                      Edit Customer Profile
                    </h4>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      System ID: {selectedCustomer.id}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedCustomer(null)}
                    className="rounded-full hover:bg-muted p-1 cursor-pointer"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <div className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold uppercase text-muted-foreground">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={selectedCustomer.name}
                        onChange={(e) =>
                          setSelectedCustomer({ ...selectedCustomer, name: e.target.value })
                        }
                        className="mt-1.5 w-full rounded-xl border border-input bg-background px-3.5 py-2.5 text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold uppercase text-muted-foreground">
                        Email Address
                      </label>
                      <input
                        type="email"
                        readOnly
                        value={selectedCustomer.email}
                        className="mt-1.5 w-full rounded-xl border border-input bg-muted px-3.5 py-2.5 text-sm cursor-not-allowed opacity-80"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold uppercase text-muted-foreground">
                        Phone Number
                      </label>
                      <input
                        type="text"
                        value={selectedCustomer.phone || ""}
                        onChange={(e) =>
                          setSelectedCustomer({ ...selectedCustomer, phone: e.target.value })
                        }
                        className="mt-1.5 w-full rounded-xl border border-input bg-background px-3.5 py-2.5 text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold uppercase text-muted-foreground">
                        Emergency Contact
                      </label>
                      <input
                        type="text"
                        value={selectedCustomer.emergency_contact || ""}
                        onChange={(e) =>
                          setSelectedCustomer({ ...selectedCustomer, emergency_contact: e.target.value })
                        }
                        placeholder="Name, Relationship & Phone"
                        className="mt-1.5 w-full rounded-xl border border-input bg-background px-3.5 py-2.5 text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold uppercase text-muted-foreground">
                        Government ID Details
                      </label>
                      <input
                        type="text"
                        value={selectedCustomer.government_id || ""}
                        onChange={(e) =>
                          setSelectedCustomer({ ...selectedCustomer, government_id: e.target.value })
                        }
                        placeholder="Aadhaar / Passport / Voter ID"
                        className="mt-1.5 w-full rounded-xl border border-input bg-background px-3.5 py-2.5 text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold uppercase text-muted-foreground">
                        Customer Tags (comma separated)
                      </label>
                      <input
                        type="text"
                        value={selectedCustomer.tags?.join(", ") || ""}
                        onChange={(e) =>
                          setSelectedCustomer({ ...selectedCustomer, tags: e.target.value.split(",").map(t => t.trim()).filter(Boolean) })
                        }
                        placeholder="Trekker, Elite, Student"
                        className="mt-1.5 w-full rounded-xl border border-input bg-background px-3.5 py-2.5 text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold uppercase text-muted-foreground">
                      Residential Address
                    </label>
                    <input
                      type="text"
                      value={selectedCustomer.address || ""}
                      onChange={(e) =>
                        setSelectedCustomer({ ...selectedCustomer, address: e.target.value })
                      }
                      className="mt-1.5 w-full rounded-xl border border-input bg-background px-3.5 py-2.5 text-sm"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold uppercase text-muted-foreground">
                      Medical Information
                    </label>
                    <textarea
                      value={selectedCustomer.medical_information || ""}
                      onChange={(e) =>
                        setSelectedCustomer({ ...selectedCustomer, medical_information: e.target.value })
                      }
                      placeholder="Allergies, high altitude issues, asthma..."
                      className="mt-1.5 w-full rounded-xl border border-input bg-background px-3.5 py-2 text-sm h-16 resize-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold uppercase text-muted-foreground">
                      General Notes
                    </label>
                    <textarea
                      value={selectedCustomer.notes || ""}
                      onChange={(e) =>
                        setSelectedCustomer({ ...selectedCustomer, notes: e.target.value })
                      }
                      className="mt-1.5 w-full rounded-xl border border-input bg-background px-3.5 py-2 text-sm h-16 resize-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold uppercase text-muted-foreground">
                      Internal Staff Notes
                    </label>
                    <textarea
                      value={selectedCustomer.internal_notes || ""}
                      onChange={(e) =>
                        setSelectedCustomer({ ...selectedCustomer, internal_notes: e.target.value })
                      }
                      className="mt-1.5 w-full rounded-xl border border-input bg-background px-3.5 py-2 text-sm h-16 resize-none"
                    />
                  </div>

                  <div className="flex justify-end gap-2 border-t border-border pt-4">
                    <button
                      type="button"
                      onClick={() => setSelectedCustomer(null)}
                      className="rounded-xl border border-border px-4 py-2.5 text-xs font-semibold hover:bg-muted cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={async () => {
                        await updateCustomer(selectedCustomer.id, {
                          name: selectedCustomer.name,
                          phone: selectedCustomer.phone,
                          emergency_contact: selectedCustomer.emergency_contact,
                          address: selectedCustomer.address,
                          government_id: selectedCustomer.government_id,
                          medical_information: selectedCustomer.medical_information,
                          notes: selectedCustomer.notes,
                          internal_notes: selectedCustomer.internal_notes,
                          tags: selectedCustomer.tags,
                        });
                        setSelectedCustomer(null);
                      }}
                      className="rounded-xl bg-primary text-primary-foreground px-5 py-2.5 text-xs font-semibold hover:opacity-95 shadow-glow cursor-pointer"
                    >
                      Save Profile
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* ================================== GLOBAL CMS & SETTINGS TAB ================================== */}
          {activeTab === "settings" && (
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Homepage configuration form */}
                <div className="rounded-3xl border border-border bg-card shadow-card p-6 text-foreground space-y-4">
                  <h3 className="font-display text-lg font-bold text-primary uppercase tracking-wider mb-2">
                    Homepage CMS Settings
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs font-semibold uppercase text-muted-foreground">
                        Hero Banner Headline
                      </label>
                      <input
                        type="text"
                        value={homepageSettings.hero_headline || ""}
                        onChange={(e) =>
                          setHomepageSettings({ ...homepageSettings, hero_headline: e.target.value })
                        }
                        className="mt-1.5 w-full rounded-xl border border-input bg-background px-3.5 py-2 text-sm"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold uppercase text-muted-foreground">
                        Hero Subheading Description
                      </label>
                      <textarea
                        value={homepageSettings.hero_subheading || ""}
                        onChange={(e) =>
                          setHomepageSettings({ ...homepageSettings, hero_subheading: e.target.value })
                        }
                        className="mt-1.5 w-full rounded-xl border border-input bg-background px-3.5 py-2 text-sm h-20 resize-none"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold uppercase text-muted-foreground">
                        Hero CTA Button Text
                      </label>
                      <input
                        type="text"
                        value={homepageSettings.hero_cta_text || ""}
                        onChange={(e) =>
                          setHomepageSettings({ ...homepageSettings, hero_cta_text: e.target.value })
                        }
                        className="mt-1.5 w-full rounded-xl border border-input bg-background px-3.5 py-2 text-sm"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold uppercase text-muted-foreground">
                        Hero Banner Image URL
                      </label>
                      <input
                        type="text"
                        value={homepageSettings.hero_image || ""}
                        onChange={(e) =>
                          setHomepageSettings({ ...homepageSettings, hero_image: e.target.value })
                        }
                        className="mt-1.5 w-full rounded-xl border border-input bg-background px-3.5 py-2 text-sm"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold uppercase text-muted-foreground">
                        Statistics Grid (JSON Array)
                      </label>
                      <textarea
                        value={typeof homepageSettings.stats === 'object' ? JSON.stringify(homepageSettings.stats, null, 2) : homepageSettings.stats || "[]"}
                        onChange={(e) => {
                          try {
                            const parsed = JSON.parse(e.target.value);
                            setHomepageSettings({ ...homepageSettings, stats: parsed });
                          } catch (err) {
                            setHomepageSettings({ ...homepageSettings, stats: e.target.value });
                          }
                        }}
                        className="mt-1.5 w-full rounded-xl border border-input bg-background px-3.5 py-2 text-sm h-24 font-mono text-[11px]"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold uppercase text-muted-foreground">
                        Why Choose Us Block (JSON Array)
                      </label>
                      <textarea
                        value={typeof homepageSettings.why_us === 'object' ? JSON.stringify(homepageSettings.why_us, null, 2) : homepageSettings.why_us || "[]"}
                        onChange={(e) => {
                          try {
                            const parsed = JSON.parse(e.target.value);
                            setHomepageSettings({ ...homepageSettings, why_us: parsed });
                          } catch (err) {
                            setHomepageSettings({ ...homepageSettings, why_us: e.target.value });
                          }
                        }}
                        className="mt-1.5 w-full rounded-xl border border-input bg-background px-3.5 py-2 text-sm h-24 font-mono text-[11px]"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold uppercase text-muted-foreground">
                        Homepage Sections Ordering & Visibility (JSON Array)
                      </label>
                      <textarea
                        value={typeof homepageSettings.sections === 'object' ? JSON.stringify(homepageSettings.sections, null, 2) : homepageSettings.sections || "[]"}
                        onChange={(e) => {
                          try {
                            const parsed = JSON.parse(e.target.value);
                            setHomepageSettings({ ...homepageSettings, sections: parsed });
                          } catch (err) {
                            setHomepageSettings({ ...homepageSettings, sections: e.target.value });
                          }
                        }}
                        className="mt-1.5 w-full rounded-xl border border-input bg-background px-3.5 py-2 text-sm h-24 font-mono text-[11px]"
                      />
                    </div>

                    <div className="border-t border-border pt-4 mt-2">
                      <div className="flex items-center gap-2 mb-3">
                        <input
                          type="checkbox"
                          id="announcement_bar_enabled"
                          checked={!!homepageSettings.announcement_bar_enabled}
                          onChange={(e) =>
                            setHomepageSettings({ ...homepageSettings, announcement_bar_enabled: e.target.checked })
                          }
                          className="rounded border-input text-primary focus:ring-ring"
                        />
                        <label htmlFor="announcement_bar_enabled" className="text-xs font-semibold uppercase text-muted-foreground cursor-pointer">
                          Enable Announcement Bar
                        </label>
                      </div>

                      <div>
                        <label className="text-xs font-semibold uppercase text-muted-foreground">
                          Announcement Bar Text
                        </label>
                        <input
                          type="text"
                          value={homepageSettings.announcement_bar_text || ""}
                          onChange={(e) =>
                            setHomepageSettings({ ...homepageSettings, announcement_bar_text: e.target.value })
                          }
                          className="mt-1.5 w-full rounded-xl border border-input bg-background px-3.5 py-2 text-sm"
                        />
                      </div>
                    </div>

                    <button
                      onClick={() => saveSettings("homepage", homepageSettings)}
                      className="w-full rounded-xl bg-primary text-primary-foreground py-2.5 text-xs font-semibold hover:opacity-95 shadow-glow cursor-pointer mt-2"
                    >
                      Save Homepage CMS
                    </button>
                  </div>
                </div>

                {/* Company settings configuration form */}
                <div className="rounded-3xl border border-border bg-card shadow-card p-6 text-foreground space-y-4">
                  <h3 className="font-display text-lg font-bold text-primary uppercase tracking-wider mb-2">
                    Company Profile & Invoicing
                  </h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-semibold uppercase text-muted-foreground">
                          Company Name
                        </label>
                        <input
                          type="text"
                          value={companySettings.company_name || ""}
                          onChange={(e) =>
                            setCompanySettings({ ...companySettings, company_name: e.target.value })
                          }
                          className="mt-1.5 w-full rounded-xl border border-input bg-background px-3.5 py-2 text-sm"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-semibold uppercase text-muted-foreground">
                          Invoice Prefix
                        </label>
                        <input
                          type="text"
                          value={companySettings.invoice_prefix || "EH-"}
                          onChange={(e) =>
                            setCompanySettings({ ...companySettings, invoice_prefix: e.target.value })
                          }
                          className="mt-1.5 w-full rounded-xl border border-input bg-background px-3.5 py-2 text-sm"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-semibold uppercase text-muted-foreground">
                          Support Email
                        </label>
                        <input
                          type="email"
                          value={companySettings.email || ""}
                          onChange={(e) =>
                            setCompanySettings({ ...companySettings, email: e.target.value })
                          }
                          className="mt-1.5 w-full rounded-xl border border-input bg-background px-3.5 py-2 text-sm"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-semibold uppercase text-muted-foreground">
                          Support Phone
                        </label>
                        <input
                          type="text"
                          value={companySettings.phone || ""}
                          onChange={(e) =>
                            setCompanySettings({ ...companySettings, phone: e.target.value })
                          }
                          className="mt-1.5 w-full rounded-xl border border-input bg-background px-3.5 py-2 text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-semibold uppercase text-muted-foreground">
                        GST details / Registration Number
                      </label>
                      <input
                        type="text"
                        value={companySettings.gst_details || ""}
                        onChange={(e) =>
                          setCompanySettings({ ...companySettings, gst_details: e.target.value })
                        }
                        className="mt-1.5 w-full rounded-xl border border-input bg-background px-3.5 py-2 text-sm"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold uppercase text-muted-foreground">
                        Corporate Address
                      </label>
                      <input
                        type="text"
                        value={companySettings.address || ""}
                        onChange={(e) =>
                          setCompanySettings({ ...companySettings, address: e.target.value })
                        }
                        className="mt-1.5 w-full rounded-xl border border-input bg-background px-3.5 py-2 text-sm"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold uppercase text-muted-foreground">
                        Instagram Profile Link
                      </label>
                      <input
                        type="text"
                        value={companySettings.social_instagram || ""}
                        onChange={(e) =>
                          setCompanySettings({ ...companySettings, social_instagram: e.target.value })
                        }
                        className="mt-1.5 w-full rounded-xl border border-input bg-background px-3.5 py-2 text-sm"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-semibold uppercase text-muted-foreground">
                          Founder Name
                        </label>
                        <input
                          type="text"
                          value={companySettings.founder_name || ""}
                          onChange={(e) =>
                            setCompanySettings({ ...companySettings, founder_name: e.target.value })
                          }
                          className="mt-1.5 w-full rounded-xl border border-input bg-background px-3.5 py-2 text-sm"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-semibold uppercase text-muted-foreground">
                          Founder Subtitle / Text
                        </label>
                        <input
                          type="text"
                          value={companySettings.founder_title || ""}
                          onChange={(e) =>
                            setCompanySettings({ ...companySettings, founder_title: e.target.value })
                          }
                          className="mt-1.5 w-full rounded-xl border border-input bg-background px-3.5 py-2 text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-semibold uppercase text-muted-foreground">
                        Founder Image URL
                      </label>
                      <input
                        type="text"
                        value={companySettings.founder_image || ""}
                        onChange={(e) =>
                          setCompanySettings({ ...companySettings, founder_image: e.target.value })
                        }
                        className="mt-1.5 w-full rounded-xl border border-input bg-background px-3.5 py-2 text-sm"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold uppercase text-muted-foreground">
                        Company Description (Footer / Site)
                      </label>
                      <textarea
                        value={companySettings.company_description || ""}
                        onChange={(e) =>
                          setCompanySettings({ ...companySettings, company_description: e.target.value })
                        }
                        className="mt-1.5 w-full rounded-xl border border-input bg-background px-3.5 py-2 text-sm h-16"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold uppercase text-muted-foreground">
                        Footer Tagline
                      </label>
                      <input
                        type="text"
                        value={companySettings.footer_tagline || ""}
                        onChange={(e) =>
                          setCompanySettings({ ...companySettings, footer_tagline: e.target.value })
                        }
                        className="mt-1.5 w-full rounded-xl border border-input bg-background px-3.5 py-2 text-sm"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold uppercase text-muted-foreground">
                        Navigation Menu Items (JSON Array)
                      </label>
                      <textarea
                        value={typeof companySettings.navigation === 'object' ? JSON.stringify(companySettings.navigation, null, 2) : companySettings.navigation || "[]"}
                        onChange={(e) => {
                          try {
                            const parsed = JSON.parse(e.target.value);
                            setCompanySettings({ ...companySettings, navigation: parsed });
                          } catch (err) {
                            setCompanySettings({ ...companySettings, navigation: e.target.value });
                          }
                        }}
                        className="mt-1.5 w-full rounded-xl border border-input bg-background px-3.5 py-2 text-sm h-24 font-mono text-[11px]"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold uppercase text-muted-foreground">
                        Bank Details (For Invoices)
                      </label>
                      <textarea
                        value={companySettings.bank_details || ""}
                        onChange={(e) =>
                          setCompanySettings({ ...companySettings, bank_details: e.target.value })
                        }
                        placeholder="Bank Name: HDFC&#10;Acc No: 1234567890&#10;IFSC: HDFC0001234"
                        className="mt-1.5 w-full rounded-xl border border-input bg-background px-3.5 py-2 text-sm h-20 resize-none"
                      />
                    </div>

                    <button
                      onClick={() => saveSettings("company_settings", companySettings)}
                      className="w-full rounded-xl bg-primary text-primary-foreground py-2.5 text-xs font-semibold hover:opacity-95 shadow-glow cursor-pointer mt-2"
                    >
                      Save Company Settings
                    </button>
                  </div>
                </div>

                {/* Static pages content editor */}
                <div className="md:col-span-2 rounded-3xl border border-border bg-card shadow-card p-6 text-foreground space-y-4">
                  <h3 className="font-display text-lg font-bold text-primary uppercase tracking-wider mb-2">
                    Static Pages Content Editor
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* About Page */}
                    <div className="space-y-3 p-4 border border-border rounded-2xl bg-muted/10">
                      <h4 className="font-bold text-sm text-foreground border-b border-border pb-1">About Page</h4>
                      <div>
                        <label className="text-[10px] font-semibold uppercase text-muted-foreground">Hero Title</label>
                        <input
                          type="text"
                          value={staticPagesSettings.about.title}
                          onChange={(e) =>
                            setStaticPagesSettings({
                              ...staticPagesSettings,
                              about: { ...staticPagesSettings.about, title: e.target.value },
                            })
                          }
                          className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-1.5 text-xs"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-semibold uppercase text-muted-foreground">Hero Subtitle</label>
                        <textarea
                          value={staticPagesSettings.about.subtitle}
                          onChange={(e) =>
                            setStaticPagesSettings({
                              ...staticPagesSettings,
                              about: { ...staticPagesSettings.about, subtitle: e.target.value },
                            })
                          }
                          className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-1.5 text-xs h-16 resize-none"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-semibold uppercase text-muted-foreground">Mission Statement</label>
                        <textarea
                          value={staticPagesSettings.about.mission}
                          onChange={(e) =>
                            setStaticPagesSettings({
                              ...staticPagesSettings,
                              about: { ...staticPagesSettings.about, mission: e.target.value },
                            })
                          }
                          className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-1.5 text-xs h-16 resize-none"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-semibold uppercase text-muted-foreground">Vision Statement</label>
                        <textarea
                          value={staticPagesSettings.about.vision}
                          onChange={(e) =>
                            setStaticPagesSettings({
                              ...staticPagesSettings,
                              about: { ...staticPagesSettings.about, vision: e.target.value },
                            })
                          }
                          className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-1.5 text-xs h-16 resize-none"
                        />
                      </div>
                    </div>

                    {/* Legal Pages */}
                    <div className="space-y-4">
                      {/* Privacy Policy */}
                      <div className="space-y-3 p-4 border border-border rounded-2xl bg-muted/10">
                        <h4 className="font-bold text-sm text-foreground border-b border-border pb-1">Privacy Policy</h4>
                        <div>
                          <label className="text-[10px] font-semibold uppercase text-muted-foreground">Page Title</label>
                          <input
                            type="text"
                            value={staticPagesSettings.privacy.title}
                            onChange={(e) =>
                              setStaticPagesSettings({
                                ...staticPagesSettings,
                                privacy: { ...staticPagesSettings.privacy, title: e.target.value },
                              })
                            }
                            className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-1.5 text-xs"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-semibold uppercase text-muted-foreground">Page Content</label>
                          <textarea
                            value={staticPagesSettings.privacy.content}
                            onChange={(e) =>
                              setStaticPagesSettings({
                                ...staticPagesSettings,
                                privacy: { ...staticPagesSettings.privacy, content: e.target.value },
                              })
                            }
                            className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-1.5 text-xs h-20"
                          />
                        </div>
                      </div>

                      {/* Terms and Conditions */}
                      <div className="space-y-3 p-4 border border-border rounded-2xl bg-muted/10">
                        <h4 className="font-bold text-sm text-foreground border-b border-border pb-1">Terms & Conditions</h4>
                        <div>
                          <label className="text-[10px] font-semibold uppercase text-muted-foreground">Page Title</label>
                          <input
                            type="text"
                            value={staticPagesSettings.terms.title}
                            onChange={(e) =>
                              setStaticPagesSettings({
                                ...staticPagesSettings,
                                terms: { ...staticPagesSettings.terms, title: e.target.value },
                              })
                            }
                            className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-1.5 text-xs"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-semibold uppercase text-muted-foreground">Page Content</label>
                          <textarea
                            value={staticPagesSettings.terms.content}
                            onChange={(e) =>
                              setStaticPagesSettings({
                                ...staticPagesSettings,
                                terms: { ...staticPagesSettings.terms, content: e.target.value },
                              })
                            }
                            className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-1.5 text-xs h-20"
                          />
                        </div>
                      </div>

                      {/* Careers */}
                      <div className="space-y-3 p-4 border border-border rounded-2xl bg-muted/10">
                        <h4 className="font-bold text-sm text-foreground border-b border-border pb-1">Careers</h4>
                        <div>
                          <label className="text-[10px] font-semibold uppercase text-muted-foreground">Page Title</label>
                          <input
                            type="text"
                            value={staticPagesSettings.careers.title}
                            onChange={(e) =>
                              setStaticPagesSettings({
                                ...staticPagesSettings,
                                careers: { ...staticPagesSettings.careers, title: e.target.value },
                              })
                            }
                            className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-1.5 text-xs"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-semibold uppercase text-muted-foreground">Page Content</label>
                          <textarea
                            value={staticPagesSettings.careers.content}
                            onChange={(e) =>
                              setStaticPagesSettings({
                                ...staticPagesSettings,
                                careers: { ...staticPagesSettings.careers, content: e.target.value },
                              })
                            }
                            className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-1.5 text-xs h-20"
                          />
                        </div>
                      </div>

                      {/* Treks Page */}
                      <div className="space-y-3 p-4 border border-border rounded-2xl bg-muted/10">
                        <h4 className="font-bold text-sm text-foreground border-b border-border pb-1">Treks Page</h4>
                        <div>
                          <label className="text-[10px] font-semibold uppercase text-muted-foreground">Page Hero Title</label>
                          <input
                            type="text"
                            value={staticPagesSettings.treks?.title || ""}
                            onChange={(e) =>
                              setStaticPagesSettings({
                                ...staticPagesSettings,
                                treks: { ...staticPagesSettings.treks, title: e.target.value },
                              })
                            }
                            className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-1.5 text-xs"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-semibold uppercase text-muted-foreground">Page Hero Subtitle</label>
                          <textarea
                            value={staticPagesSettings.treks?.subtitle || ""}
                            onChange={(e) =>
                              setStaticPagesSettings({
                                ...staticPagesSettings,
                                treks: { ...staticPagesSettings.treks, subtitle: e.target.value },
                              })
                            }
                            className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-1.5 text-xs h-20"
                          />
                        </div>
                      </div>

                      {/* Trips Page */}
                      <div className="space-y-3 p-4 border border-border rounded-2xl bg-muted/10">
                        <h4 className="font-bold text-sm text-foreground border-b border-border pb-1">Trips Page</h4>
                        <div>
                          <label className="text-[10px] font-semibold uppercase text-muted-foreground">Page Hero Title</label>
                          <input
                            type="text"
                            value={staticPagesSettings.trips?.title || ""}
                            onChange={(e) =>
                              setStaticPagesSettings({
                                ...staticPagesSettings,
                                trips: { ...staticPagesSettings.trips, title: e.target.value },
                              })
                            }
                            className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-1.5 text-xs"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-semibold uppercase text-muted-foreground">Page Hero Subtitle</label>
                          <textarea
                            value={staticPagesSettings.trips?.subtitle || ""}
                            onChange={(e) =>
                              setStaticPagesSettings({
                                ...staticPagesSettings,
                                trips: { ...staticPagesSettings.trips, subtitle: e.target.value },
                              })
                            }
                            className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-1.5 text-xs h-20"
                          />
                        </div>
                      </div>

                      {/* Gallery Page */}
                      <div className="space-y-3 p-4 border border-border rounded-2xl bg-muted/10">
                        <h4 className="font-bold text-sm text-foreground border-b border-border pb-1">Gallery Page</h4>
                        <div>
                          <label className="text-[10px] font-semibold uppercase text-muted-foreground">Page Hero Title</label>
                          <input
                            type="text"
                            value={staticPagesSettings.gallery?.title || ""}
                            onChange={(e) =>
                              setStaticPagesSettings({
                                ...staticPagesSettings,
                                gallery: { ...staticPagesSettings.gallery, title: e.target.value },
                              })
                            }
                            className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-1.5 text-xs"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-semibold uppercase text-muted-foreground">Page Hero Subtitle</label>
                          <textarea
                            value={staticPagesSettings.gallery?.subtitle || ""}
                            onChange={(e) =>
                              setStaticPagesSettings({
                                ...staticPagesSettings,
                                gallery: { ...staticPagesSettings.gallery, subtitle: e.target.value },
                              })
                            }
                            className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-1.5 text-xs h-20"
                          />
                        </div>
                      </div>

                      {/* Contact Page */}
                      <div className="space-y-3 p-4 border border-border rounded-2xl bg-muted/10">
                        <h4 className="font-bold text-sm text-foreground border-b border-border pb-1">Contact Page</h4>
                        <div>
                          <label className="text-[10px] font-semibold uppercase text-muted-foreground">Page Hero Title</label>
                          <input
                            type="text"
                            value={staticPagesSettings.contact?.title || ""}
                            onChange={(e) =>
                              setStaticPagesSettings({
                                ...staticPagesSettings,
                                contact: { ...staticPagesSettings.contact, title: e.target.value },
                              })
                            }
                            className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-1.5 text-xs"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-semibold uppercase text-muted-foreground">Page Hero Subtitle</label>
                          <textarea
                            value={staticPagesSettings.contact?.subtitle || ""}
                            onChange={(e) =>
                              setStaticPagesSettings({
                                ...staticPagesSettings,
                                contact: { ...staticPagesSettings.contact, subtitle: e.target.value },
                              })
                            }
                            className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-1.5 text-xs h-20"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => saveSettings("static_pages", staticPagesSettings)}
                    className="w-full rounded-xl bg-primary text-primary-foreground py-2.5 text-xs font-semibold hover:opacity-95 shadow-glow cursor-pointer mt-2"
                  >
                    Save Static Pages CMS
                  </button>
                </div>

                {/* Database Backup & Export Card */}
                <div className="md:col-span-2 rounded-3xl border border-border bg-card shadow-card p-6 text-foreground space-y-4">
                  <h3 className="font-display text-lg font-bold text-primary uppercase tracking-wider mb-2">
                    System Backups & Data Export
                  </h3>
                  <p className="text-xs text-muted-foreground font-semibold">
                    Download full JSON snapshots of all system tables (bookings, customers, leads, departures, blog posts, and site configurations) for offline backup.
                  </p>
                  <button
                    onClick={exportDatabaseBackup}
                    className="rounded-xl bg-[var(--gradient-ember)] text-ember-foreground px-6 py-3 text-xs font-bold hover:scale-[1.02] transition-transform shadow-glow cursor-pointer"
                  >
                    Download Full JSON Backup
                  </button>
                </div>
              </div>
            </div>
          )}
          {/* ================================== BLOG CMS TAB ================================== */}
          {activeTab === "blogs" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="font-display text-lg font-bold text-foreground">
                  Blog Posts CMS
                </h3>
                <button
                  onClick={() => setShowAddPostForm(true)}
                  className="rounded-xl bg-primary text-primary-foreground px-4 py-2 text-sm font-semibold hover:opacity-90 transition flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="h-4 w-4" /> Add Blog Post
                </button>
              </div>

              <div className="rounded-3xl border border-border bg-card shadow-card overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-muted text-muted-foreground text-xs uppercase font-semibold">
                      <tr>
                        <th className="px-6 py-4">Title / Author</th>
                        <th className="px-6 py-4">Status / Schedule</th>
                        <th className="px-6 py-4">Categories / Tags</th>
                        <th className="px-6 py-4">Featured</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border text-foreground">
                      {filteredBlogPosts.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="px-6 py-10 text-center text-muted-foreground">
                            No blog posts found.
                          </td>
                        </tr>
                      ) : (
                        filteredBlogPosts.map((p) => (
                          <tr key={p.id} className="hover:bg-muted/30 transition">
                            <td className="px-6 py-4">
                              <div className="font-semibold text-foreground">{p.title}</div>
                              <div className="text-xs text-muted-foreground">
                                By {p.author_name || "Admin"} · {p.reading_time || "5m read"}
                              </div>
                            </td>
                            <td className="px-6 py-4 text-xs">
                              <span className={`inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${p.status === "published" ? "bg-green-100 text-green-800" : p.status === "scheduled" ? "bg-blue-100 text-blue-800" : "bg-yellow-100 text-yellow-800"}`}>
                                {p.status}
                              </span>
                              <div className="text-[10px] text-muted-foreground mt-0.5">
                                Date: {new Date(p.publish_date).toLocaleString()}
                              </div>
                            </td>
                            <td className="px-6 py-4 text-xs">
                              <div>{p.categories?.join(", ") || "-"}</div>
                              <div className="text-muted-foreground mt-0.5">{p.tags?.join(", ") || "-"}</div>
                            </td>
                            <td className="px-6 py-4 text-xs">
                              {p.featured ? <span className="text-amber-500 font-semibold">Yes</span> : <span>No</span>}
                            </td>
                            <td className="px-6 py-4 text-right space-x-1.5 whitespace-nowrap">
                              <button
                                onClick={() => setEditingPost({
                                  ...p,
                                  publish_date: new Date(p.publish_date).toISOString().slice(0, 16)
                                })}
                                className="rounded bg-primary/10 px-2 py-1 text-xs font-semibold text-primary hover:bg-primary/20 transition cursor-pointer"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDeletePost(p.id)}
                                className="rounded bg-red-50 px-2 py-1 text-xs font-semibold text-red-700 hover:bg-red-100 transition cursor-pointer"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Add Post Modal */}
              {showAddPostForm && (
                <div className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4">
                  <div className="w-full max-w-3xl rounded-3xl bg-card border border-border p-6 shadow-elegant text-foreground max-h-[90vh] overflow-y-auto">
                    <div className="flex justify-between items-center border-b border-border pb-4 mb-4">
                      <h4 className="font-display text-xl font-bold">Write New Blog Post</h4>
                      <button onClick={() => setShowAddPostForm(false)} className="rounded-full hover:bg-muted p-1 cursor-pointer">
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                    <form onSubmit={handleAddPost} className="space-y-4">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs font-semibold uppercase text-muted-foreground">Post Title</label>
                          <input
                            type="text"
                            required
                            value={newPost.title}
                            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                            className="mt-1.5 w-full rounded-xl border border-input bg-background px-3.5 py-2 text-sm"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-semibold uppercase text-muted-foreground">URL Slug (leave empty to auto-generate)</label>
                          <input
                            type="text"
                            value={newPost.slug}
                            onChange={(e) => setNewPost({ ...newPost, slug: e.target.value })}
                            className="mt-1.5 w-full rounded-xl border border-input bg-background px-3.5 py-2 text-sm"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-xs font-semibold uppercase text-muted-foreground">Short Summary (SEO / Listing)</label>
                        <input
                          type="text"
                          value={newPost.summary}
                          onChange={(e) => setNewPost({ ...newPost, summary: e.target.value })}
                          className="mt-1.5 w-full rounded-xl border border-input bg-background px-3.5 py-2 text-sm"
                        />
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs font-semibold uppercase text-muted-foreground">Author Name</label>
                          <input
                            type="text"
                            value={newPost.author_name}
                            onChange={(e) => setNewPost({ ...newPost, author_name: e.target.value })}
                            className="mt-1.5 w-full rounded-xl border border-input bg-background px-3.5 py-2 text-sm"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-semibold uppercase text-muted-foreground">Reading Time</label>
                          <input
                            type="text"
                            value={newPost.reading_time}
                            onChange={(e) => setNewPost({ ...newPost, reading_time: e.target.value })}
                            className="mt-1.5 w-full rounded-xl border border-input bg-background px-3.5 py-2 text-sm"
                          />
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-3 gap-4">
                        <div>
                          <label className="text-xs font-semibold uppercase text-muted-foreground">Status</label>
                          <select
                            value={newPost.status}
                            onChange={(e) => setNewPost({ ...newPost, status: e.target.value as any })}
                            className="mt-1.5 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm"
                          >
                            <option value="draft">Draft</option>
                            <option value="published">Published</option>
                            <option value="scheduled">Scheduled</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-xs font-semibold uppercase text-muted-foreground">Publish Date</label>
                          <input
                            type="datetime-local"
                            value={newPost.publish_date}
                            onChange={(e) => setNewPost({ ...newPost, publish_date: e.target.value })}
                            className="mt-1.5 w-full rounded-xl border border-input bg-background px-3.5 py-1.5 text-sm"
                          />
                        </div>
                        <div className="flex items-center pt-6">
                          <input
                            type="checkbox"
                            id="new_post_featured"
                            checked={newPost.featured}
                            onChange={(e) => setNewPost({ ...newPost, featured: e.target.checked })}
                            className="rounded border-input text-primary focus:ring-ring"
                          />
                          <label htmlFor="new_post_featured" className="ml-2 text-xs font-semibold uppercase text-muted-foreground cursor-pointer">
                            Feature this Post
                          </label>
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs font-semibold uppercase text-muted-foreground">Categories (comma-separated)</label>
                          <input
                            type="text"
                            value={newPost.categories.join(", ")}
                            onChange={(e) => setNewPost({ ...newPost, categories: e.target.value.split(",").map(c => c.trim()).filter(Boolean) })}
                            placeholder="Uttarakhand, Trekking, Spiritual"
                            className="mt-1.5 w-full rounded-xl border border-input bg-background px-3.5 py-2 text-sm"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-semibold uppercase text-muted-foreground">Tags (comma-separated)</label>
                          <input
                            type="text"
                            value={newPost.tags.join(", ")}
                            onChange={(e) => setNewPost({ ...newPost, tags: e.target.value.split(",").map(t => t.trim()).filter(Boolean) })}
                            placeholder="Autumn, Kedarkantha, Local Foods"
                            className="mt-1.5 w-full rounded-xl border border-input bg-background px-3.5 py-2 text-sm"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-xs font-semibold uppercase text-muted-foreground">Featured Image URL</label>
                        <input
                          type="text"
                          value={newPost.featured_image}
                          onChange={(e) => setNewPost({ ...newPost, featured_image: e.target.value })}
                          className="mt-1.5 w-full rounded-xl border border-input bg-background px-3.5 py-2 text-sm"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-semibold uppercase text-muted-foreground">Post Content (Markdown supported)</label>
                        <textarea
                          required
                          value={newPost.content}
                          onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                          className="mt-1.5 w-full rounded-xl border border-input bg-background px-3.5 py-2 text-sm h-48"
                        />
                      </div>

                      {/* SEO Settings */}
                      <div className="border-t border-border pt-4 space-y-4">
                        <h5 className="text-xs font-bold uppercase tracking-wider text-primary">SEO Settings</h5>
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div>
                            <label className="text-xs font-semibold uppercase text-muted-foreground">Meta Title</label>
                            <input
                              type="text"
                              value={newPost.meta_title}
                              onChange={(e) => setNewPost({ ...newPost, meta_title: e.target.value })}
                              className="mt-1.5 w-full rounded-xl border border-input bg-background px-3.5 py-2 text-sm"
                            />
                          </div>
                          <div>
                            <label className="text-xs font-semibold uppercase text-muted-foreground">Meta Description</label>
                            <input
                              type="text"
                              value={newPost.meta_description}
                              onChange={(e) => setNewPost({ ...newPost, meta_description: e.target.value })}
                              className="mt-1.5 w-full rounded-xl border border-input bg-background px-3.5 py-2 text-sm"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end gap-2 border-t border-border pt-4">
                        <button type="button" onClick={() => setShowAddPostForm(false)} className="rounded-xl border border-border px-4 py-2.5 text-xs font-semibold hover:bg-muted cursor-pointer">
                          Cancel
                        </button>
                        <button type="submit" className="rounded-xl bg-primary text-primary-foreground px-5 py-2.5 text-xs font-semibold hover:opacity-95 shadow-glow cursor-pointer">
                          Publish Post
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              {/* Edit Post Modal */}
              {editingPost && (
                <div className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4">
                  <div className="w-full max-w-3xl rounded-3xl bg-card border border-border p-6 shadow-elegant text-foreground max-h-[90vh] overflow-y-auto">
                    <div className="flex justify-between items-center border-b border-border pb-4 mb-4">
                      <h4 className="font-display text-xl font-bold">Edit Blog Post</h4>
                      <button onClick={() => setEditingPost(null)} className="rounded-full hover:bg-muted p-1 cursor-pointer">
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                    <form onSubmit={handleUpdatePost} className="space-y-4">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs font-semibold uppercase text-muted-foreground">Post Title</label>
                          <input
                            type="text"
                            required
                            value={editingPost.title}
                            onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
                            className="mt-1.5 w-full rounded-xl border border-input bg-background px-3.5 py-2 text-sm"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-semibold uppercase text-muted-foreground">URL Slug</label>
                          <input
                            type="text"
                            required
                            value={editingPost.slug}
                            onChange={(e) => setEditingPost({ ...editingPost, slug: e.target.value })}
                            className="mt-1.5 w-full rounded-xl border border-input bg-background px-3.5 py-2 text-sm"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-xs font-semibold uppercase text-muted-foreground">Short Summary (SEO / Listing)</label>
                        <input
                          type="text"
                          value={editingPost.summary || ""}
                          onChange={(e) => setEditingPost({ ...editingPost, summary: e.target.value })}
                          className="mt-1.5 w-full rounded-xl border border-input bg-background px-3.5 py-2 text-sm"
                        />
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs font-semibold uppercase text-muted-foreground">Author Name</label>
                          <input
                            type="text"
                            value={editingPost.author_name || ""}
                            onChange={(e) => setEditingPost({ ...editingPost, author_name: e.target.value })}
                            className="mt-1.5 w-full rounded-xl border border-input bg-background px-3.5 py-2 text-sm"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-semibold uppercase text-muted-foreground">Reading Time</label>
                          <input
                            type="text"
                            value={editingPost.reading_time || ""}
                            onChange={(e) => setEditingPost({ ...editingPost, reading_time: e.target.value })}
                            className="mt-1.5 w-full rounded-xl border border-input bg-background px-3.5 py-2 text-sm"
                          />
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-3 gap-4">
                        <div>
                          <label className="text-xs font-semibold uppercase text-muted-foreground">Status</label>
                          <select
                            value={editingPost.status}
                            onChange={(e) => setEditingPost({ ...editingPost, status: e.target.value as any })}
                            className="mt-1.5 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm"
                          >
                            <option value="draft">Draft</option>
                            <option value="published">Published</option>
                            <option value="scheduled">Scheduled</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-xs font-semibold uppercase text-muted-foreground">Publish Date</label>
                          <input
                            type="datetime-local"
                            value={editingPost.publish_date}
                            onChange={(e) => setEditingPost({ ...editingPost, publish_date: e.target.value })}
                            className="mt-1.5 w-full rounded-xl border border-input bg-background px-3.5 py-1.5 text-sm"
                          />
                        </div>
                        <div className="flex items-center pt-6">
                          <input
                            type="checkbox"
                            id="edit_post_featured"
                            checked={editingPost.featured}
                            onChange={(e) => setEditingPost({ ...editingPost, featured: e.target.checked })}
                            className="rounded border-input text-primary focus:ring-ring"
                          />
                          <label htmlFor="edit_post_featured" className="ml-2 text-xs font-semibold uppercase text-muted-foreground cursor-pointer">
                            Feature this Post
                          </label>
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs font-semibold uppercase text-muted-foreground">Categories (comma-separated)</label>
                          <input
                            type="text"
                            value={editingPost.categories.join(", ")}
                            onChange={(e) => setEditingPost({ ...editingPost, categories: e.target.value.split(",").map(c => c.trim()).filter(Boolean) })}
                            className="mt-1.5 w-full rounded-xl border border-input bg-background px-3.5 py-2 text-sm"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-semibold uppercase text-muted-foreground">Tags (comma-separated)</label>
                          <input
                            type="text"
                            value={editingPost.tags.join(", ")}
                            onChange={(e) => setEditingPost({ ...editingPost, tags: e.target.value.split(",").map(t => t.trim()).filter(Boolean) })}
                            className="mt-1.5 w-full rounded-xl border border-input bg-background px-3.5 py-2 text-sm"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-xs font-semibold uppercase text-muted-foreground">Featured Image URL</label>
                        <input
                          type="text"
                          value={editingPost.featured_image || ""}
                          onChange={(e) => setEditingPost({ ...editingPost, featured_image: e.target.value })}
                          className="mt-1.5 w-full rounded-xl border border-input bg-background px-3.5 py-2 text-sm"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-semibold uppercase text-muted-foreground">Post Content (Markdown supported)</label>
                        <textarea
                          required
                          value={editingPost.content}
                          onChange={(e) => setEditingPost({ ...editingPost, content: e.target.value })}
                          className="mt-1.5 w-full rounded-xl border border-input bg-background px-3.5 py-2 text-sm h-48"
                        />
                      </div>

                      {/* SEO Settings */}
                      <div className="border-t border-border pt-4 space-y-4">
                        <h5 className="text-xs font-bold uppercase tracking-wider text-primary">SEO Settings</h5>
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div>
                            <label className="text-xs font-semibold uppercase text-muted-foreground">Meta Title</label>
                            <input
                              type="text"
                              value={editingPost.meta_title || ""}
                              onChange={(e) => setEditingPost({ ...editingPost, meta_title: e.target.value })}
                              className="mt-1.5 w-full rounded-xl border border-input bg-background px-3.5 py-2 text-sm"
                            />
                          </div>
                          <div>
                            <label className="text-xs font-semibold uppercase text-muted-foreground">Meta Description</label>
                            <input
                              type="text"
                              value={editingPost.meta_description || ""}
                              onChange={(e) => setEditingPost({ ...editingPost, meta_description: e.target.value })}
                              className="mt-1.5 w-full rounded-xl border border-input bg-background px-3.5 py-2 text-sm"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end gap-2 border-t border-border pt-4">
                        <button type="button" onClick={() => setEditingPost(null)} className="rounded-xl border border-border px-4 py-2.5 text-xs font-semibold hover:bg-muted cursor-pointer">
                          Cancel
                        </button>
                        <button type="submit" className="rounded-xl bg-primary text-primary-foreground px-5 py-2.5 text-xs font-semibold hover:opacity-95 shadow-glow cursor-pointer">
                          Save Changes
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}
          {/* ================================== COUPON SYSTEM TAB ================================== */}
          {activeTab === "coupons" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="font-display text-lg font-bold text-foreground">
                  Promotional Coupons
                </h3>
                <button
                  onClick={() => setShowAddCouponForm(true)}
                  className="rounded-xl bg-primary text-primary-foreground px-4 py-2 text-sm font-semibold hover:opacity-90 transition flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="h-4 w-4" /> Create Coupon
                </button>
              </div>

              <div className="rounded-3xl border border-border bg-card shadow-card overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-muted text-muted-foreground text-xs uppercase font-semibold">
                      <tr>
                        <th className="px-6 py-4">Promo Code</th>
                        <th className="px-6 py-4">Discount</th>
                        <th className="px-6 py-4">Status / Limit</th>
                        <th className="px-6 py-4">Used Count</th>
                        <th className="px-6 py-4">Expiry</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border text-foreground">
                      {coupons.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="px-6 py-10 text-center text-muted-foreground">
                            No coupons defined yet. Add some promotional codes!
                          </td>
                        </tr>
                      ) : (
                        coupons.map((c) => (
                          <tr key={c.id} className="hover:bg-muted/30 transition">
                            <td className="px-6 py-4 font-bold text-primary tracking-wide">
                              {c.code}
                            </td>
                            <td className="px-6 py-4">
                              {c.discount_type === "percentage" ? (
                                <span className="font-semibold">{c.discount_value}% Off</span>
                              ) : (
                                <span className="font-semibold">Rs. {c.discount_value} Off</span>
                              )}
                              {c.min_booking_amount && c.min_booking_amount > 0 ? (
                                <div className="text-[10px] text-muted-foreground mt-0.5">Min. Booking: Rs. {c.min_booking_amount}</div>
                              ) : null}
                            </td>
                            <td className="px-6 py-4 text-xs">
                              <span className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${c.status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                                {c.status}
                              </span>
                              {c.max_uses ? (
                                <div className="text-[10px] text-muted-foreground mt-0.5">Limit: {c.max_uses} max uses</div>
                              ) : (
                                <div className="text-[10px] text-muted-foreground mt-0.5">No usage limit</div>
                              )}
                            </td>
                            <td className="px-6 py-4 font-semibold text-xs">
                              {c.used_count || 0} / {c.max_uses || "∞"}
                            </td>
                            <td className="px-6 py-4 text-xs text-muted-foreground">
                              {c.expiry_date ? new Date(c.expiry_date).toLocaleDateString() : "Never Expires"}
                            </td>
                            <td className="px-6 py-4 text-right space-x-1.5 whitespace-nowrap">
                              <button
                                onClick={() => setEditingCoupon({
                                  ...c,
                                  expiry_date: c.expiry_date ? new Date(c.expiry_date).toISOString().slice(0, 16) : ""
                                })}
                                className="rounded bg-primary/10 px-2 py-1 text-xs font-semibold text-primary hover:bg-primary/20 transition cursor-pointer"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDeleteCoupon(c.id)}
                                className="rounded bg-red-50 px-2 py-1 text-xs font-semibold text-red-700 hover:bg-red-100 transition cursor-pointer"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Add Coupon Overlay */}
              {showAddCouponForm && (
                <div className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4">
                  <div className="w-full max-w-lg rounded-3xl bg-card border border-border p-6 shadow-elegant text-foreground max-h-[90vh] overflow-y-auto">
                    <div className="flex justify-between items-center border-b border-border pb-4 mb-4">
                      <h4 className="font-display text-xl font-bold">Create Coupon</h4>
                      <button onClick={() => setShowAddCouponForm(false)} className="rounded-full hover:bg-muted p-1 cursor-pointer">
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                    <form onSubmit={handleAddCoupon} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs font-semibold uppercase text-muted-foreground">Promo Code</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. TREK10"
                            value={newCoupon.code}
                            onChange={(e) => setNewCoupon({ ...newCoupon, code: e.target.value })}
                            className="mt-1.5 w-full rounded-xl border border-input bg-background px-3.5 py-2 text-sm"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-semibold uppercase text-muted-foreground">Status</label>
                          <select
                            value={newCoupon.status}
                            onChange={(e) => setNewCoupon({ ...newCoupon, status: e.target.value as any })}
                            className="mt-1.5 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm"
                          >
                            <option value="active">Active</option>
                            <option value="disabled">Disabled</option>
                            <option value="expired">Expired</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs font-semibold uppercase text-muted-foreground">Discount Type</label>
                          <select
                            value={newCoupon.discount_type}
                            onChange={(e) => setNewCoupon({ ...newCoupon, discount_type: e.target.value as any })}
                            className="mt-1.5 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm"
                          >
                            <option value="percentage">Percentage (%)</option>
                            <option value="fixed">Fixed Amount (Rs.)</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-xs font-semibold uppercase text-muted-foreground">Discount Value</label>
                          <input
                            type="number"
                            required
                            min={1}
                            value={newCoupon.discount_value}
                            onChange={(e) => setNewCoupon({ ...newCoupon, discount_value: Number(e.target.value) })}
                            className="mt-1.5 w-full rounded-xl border border-input bg-background px-3.5 py-2 text-sm"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs font-semibold uppercase text-muted-foreground">Min. Booking Amount (Rs.)</label>
                          <input
                            type="number"
                            value={newCoupon.min_booking_amount}
                            onChange={(e) => setNewCoupon({ ...newCoupon, min_booking_amount: Number(e.target.value) })}
                            className="mt-1.5 w-full rounded-xl border border-input bg-background px-3.5 py-2 text-sm"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-semibold uppercase text-muted-foreground">Usage Limit (Max Uses)</label>
                          <input
                            type="number"
                            value={newCoupon.max_uses}
                            onChange={(e) => setNewCoupon({ ...newCoupon, max_uses: Number(e.target.value) })}
                            className="mt-1.5 w-full rounded-xl border border-input bg-background px-3.5 py-2 text-sm"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-xs font-semibold uppercase text-muted-foreground">Expiry Date</label>
                        <input
                          type="datetime-local"
                          value={newCoupon.expiry_date}
                          onChange={(e) => setNewCoupon({ ...newCoupon, expiry_date: e.target.value })}
                          className="mt-1.5 w-full rounded-xl border border-input bg-background px-3.5 py-1.5 text-sm"
                        />
                      </div>

                      <div className="flex justify-end gap-2 border-t border-border pt-4">
                        <button type="button" onClick={() => setShowAddCouponForm(false)} className="rounded-xl border border-border px-4 py-2.5 text-xs font-semibold hover:bg-muted cursor-pointer">
                          Cancel
                        </button>
                        <button type="submit" className="rounded-xl bg-primary text-primary-foreground px-5 py-2.5 text-xs font-semibold hover:opacity-95 shadow-glow cursor-pointer">
                          Save Coupon
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              {/* Edit Coupon Overlay */}
              {editingCoupon && (
                <div className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4">
                  <div className="w-full max-w-lg rounded-3xl bg-card border border-border p-6 shadow-elegant text-foreground max-h-[90vh] overflow-y-auto">
                    <div className="flex justify-between items-center border-b border-border pb-4 mb-4">
                      <h4 className="font-display text-xl font-bold">Edit Coupon</h4>
                      <button onClick={() => setEditingCoupon(null)} className="rounded-full hover:bg-muted p-1 cursor-pointer">
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                    <form onSubmit={handleUpdateCoupon} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs font-semibold uppercase text-muted-foreground">Promo Code</label>
                          <input
                            type="text"
                            required
                            value={editingCoupon.code}
                            onChange={(e) => setEditingCoupon({ ...editingCoupon, code: e.target.value })}
                            className="mt-1.5 w-full rounded-xl border border-input bg-background px-3.5 py-2 text-sm"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-semibold uppercase text-muted-foreground">Status</label>
                          <select
                            value={editingCoupon.status}
                            onChange={(e) => setEditingCoupon({ ...editingCoupon, status: e.target.value as any })}
                            className="mt-1.5 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm"
                          >
                            <option value="active">Active</option>
                            <option value="disabled">Disabled</option>
                            <option value="expired">Expired</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs font-semibold uppercase text-muted-foreground">Discount Type</label>
                          <select
                            value={editingCoupon.discount_type}
                            onChange={(e) => setEditingCoupon({ ...editingCoupon, discount_type: e.target.value as any })}
                            className="mt-1.5 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm"
                          >
                            <option value="percentage">Percentage (%)</option>
                            <option value="fixed">Fixed Amount (Rs.)</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-xs font-semibold uppercase text-muted-foreground">Discount Value</label>
                          <input
                            type="number"
                            required
                            min={1}
                            value={editingCoupon.discount_value}
                            onChange={(e) => setEditingCoupon({ ...editingCoupon, discount_value: Number(e.target.value) })}
                            className="mt-1.5 w-full rounded-xl border border-input bg-background px-3.5 py-2 text-sm"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs font-semibold uppercase text-muted-foreground">Min. Booking Amount (Rs.)</label>
                          <input
                            type="number"
                            value={editingCoupon.min_booking_amount || ""}
                            onChange={(e) => setEditingCoupon({ ...editingCoupon, min_booking_amount: Number(e.target.value) })}
                            className="mt-1.5 w-full rounded-xl border border-input bg-background px-3.5 py-2 text-sm"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-semibold uppercase text-muted-foreground">Usage Limit (Max Uses)</label>
                          <input
                            type="number"
                            value={editingCoupon.max_uses || ""}
                            onChange={(e) => setEditingCoupon({ ...editingCoupon, max_uses: Number(e.target.value) })}
                            className="mt-1.5 w-full rounded-xl border border-input bg-background px-3.5 py-2 text-sm"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-xs font-semibold uppercase text-muted-foreground">Expiry Date</label>
                        <input
                          type="datetime-local"
                          value={editingCoupon.expiry_date || ""}
                          onChange={(e) => setEditingCoupon({ ...editingCoupon, expiry_date: e.target.value })}
                          className="mt-1.5 w-full rounded-xl border border-input bg-background px-3.5 py-1.5 text-sm"
                        />
                      </div>

                      <div className="flex justify-end gap-2 border-t border-border pt-4">
                        <button type="button" onClick={() => setEditingCoupon(null)} className="rounded-xl border border-border px-4 py-2.5 text-xs font-semibold hover:bg-muted cursor-pointer">
                          Cancel
                        </button>
                        <button type="submit" className="rounded-xl bg-primary text-primary-foreground px-5 py-2.5 text-xs font-semibold hover:opacity-95 shadow-glow cursor-pointer">
                          Save Changes
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}
          {/* ================================== REVIEWS CMS TAB ================================== */}
          {activeTab === "reviews" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="font-display text-lg font-bold text-foreground">
                  Customer Reviews Curation
                </h3>
                <button
                  onClick={() => setShowAddReviewForm(true)}
                  className="rounded-xl bg-primary text-primary-foreground px-4 py-2 text-sm font-semibold hover:opacity-90 transition flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="h-4 w-4" /> Add Review
                </button>
              </div>

              <div className="rounded-3xl border border-border bg-card shadow-card overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-muted text-muted-foreground text-xs uppercase font-semibold">
                      <tr>
                        <th className="px-6 py-4">Customer Name / Package</th>
                        <th className="px-6 py-4">Rating</th>
                        <th className="px-6 py-4">Comment</th>
                        <th className="px-6 py-4">Status / Verification</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border text-foreground text-xs">
                      {reviews.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="px-6 py-10 text-center text-muted-foreground">
                            No reviews recorded. Add custom reviews to verify traveler feedback!
                          </td>
                        </tr>
                      ) : (
                        reviews.map((r) => (
                          <tr key={r.id} className="hover:bg-muted/30 transition">
                            <td className="px-6 py-4">
                              <div className="font-bold text-foreground">{r.customer_name}</div>
                              <div className="text-[10px] text-muted-foreground mt-0.5">{r.package_name}</div>
                            </td>
                            <td className="px-6 py-4 font-semibold text-amber-500">
                              {"★".repeat(r.rating) + "☆".repeat(5 - r.rating)}
                            </td>
                            <td className="px-6 py-4 max-w-xs truncate" title={r.comment || ""}>
                              {r.comment || "-"}
                            </td>
                            <td className="px-6 py-4">
                              <span className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${r.status === "approved" ? "bg-green-100 text-green-800" : r.status === "pending" ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800"}`}>
                                {r.status}
                              </span>
                              {r.verified ? (
                                <div className="text-[9px] text-green-600 font-bold mt-0.5">✓ Verified Buyer</div>
                              ) : (
                                <div className="text-[9px] text-muted-foreground mt-0.5">Direct Submission</div>
                              )}
                            </td>
                            <td className="px-6 py-4 text-right space-x-1.5 whitespace-nowrap">
                              {r.status !== "approved" && (
                                <button
                                  onClick={() => updateReviewStatus(r.id, "approved")}
                                  className="rounded bg-green-50 px-2 py-1 text-[10px] font-semibold text-green-700 hover:bg-green-100 transition cursor-pointer"
                                >
                                  Approve
                                </button>
                              )}
                              {r.status !== "hidden" && (
                                <button
                                  onClick={() => updateReviewStatus(r.id, "hidden")}
                                  className="rounded bg-yellow-50 px-2 py-1 text-[10px] font-semibold text-yellow-700 hover:bg-yellow-100 transition cursor-pointer"
                                >
                                  Hide
                                </button>
                              )}
                              <button
                                onClick={() => handleDeleteReview(r.id)}
                                className="rounded bg-red-50 px-2 py-1 text-[10px] font-semibold text-red-700 hover:bg-red-100 transition cursor-pointer"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Add Review Overlay */}
              {showAddReviewForm && (
                <div className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4">
                  <div className="w-full max-w-lg rounded-3xl bg-card border border-border p-6 shadow-elegant text-foreground max-h-[90vh] overflow-y-auto">
                    <div className="flex justify-between items-center border-b border-border pb-4 mb-4">
                      <h4 className="font-display text-xl font-bold">Add Customer Review</h4>
                      <button onClick={() => setShowAddReviewForm(false)} className="rounded-full hover:bg-muted p-1 cursor-pointer">
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                    <form onSubmit={handleAddReview} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs font-semibold uppercase text-muted-foreground">Select Package</label>
                          <select
                            required
                            value={newReview.package_slug}
                            onChange={(e) => setNewReview({ ...newReview, package_slug: e.target.value })}
                            className="mt-1.5 w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm"
                          >
                            <option value="" disabled>Choose Package…</option>
                            {dbPackages.map(p => (
                              <option key={p.id} value={p.slug}>{p.name}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="text-xs font-semibold uppercase text-muted-foreground">Customer Name</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Atul Nautiyal"
                            value={newReview.customer_name}
                            onChange={(e) => setNewReview({ ...newReview, customer_name: e.target.value })}
                            className="mt-1.5 w-full rounded-xl border border-input bg-background px-3.5 py-2 text-sm"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <label className="text-xs font-semibold uppercase text-muted-foreground">Rating (1-5)</label>
                          <select
                            value={newReview.rating}
                            onChange={(e) => setNewReview({ ...newReview, rating: Number(e.target.value) })}
                            className="mt-1.5 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm"
                          >
                            <option value={5}>5 Stars</option>
                            <option value={4}>4 Stars</option>
                            <option value={3}>3 Stars</option>
                            <option value={2}>2 Stars</option>
                            <option value={1}>1 Star</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-xs font-semibold uppercase text-muted-foreground">Status</label>
                          <select
                            value={newReview.status}
                            onChange={(e) => setNewReview({ ...newReview, status: e.target.value as any })}
                            className="mt-1.5 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm"
                          >
                            <option value="approved">Approved</option>
                            <option value="pending">Pending</option>
                            <option value="hidden">Hidden</option>
                          </select>
                        </div>
                        <div className="flex items-center pt-6">
                          <input
                            type="checkbox"
                            id="review_verified"
                            checked={newReview.verified}
                            onChange={(e) => setNewReview({ ...newReview, verified: e.target.checked })}
                            className="rounded border-input text-primary focus:ring-ring"
                          />
                          <label htmlFor="review_verified" className="ml-2 text-xs font-semibold uppercase text-muted-foreground cursor-pointer">
                            Verified Booking
                          </label>
                        </div>
                      </div>

                      <div>
                        <label className="text-xs font-semibold uppercase text-muted-foreground">Review Comment</label>
                        <textarea
                          required
                          rows={3}
                          placeholder="Fabulous experience! Guides were extremely coordinates..."
                          value={newReview.comment}
                          onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                          className="mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                        />
                      </div>

                      <div className="flex justify-end gap-2 border-t border-border pt-4">
                        <button type="button" onClick={() => setShowAddReviewForm(false)} className="rounded-xl border border-border px-4 py-2.5 text-xs font-semibold hover:bg-muted cursor-pointer">
                          Cancel
                        </button>
                        <button type="submit" className="rounded-xl bg-primary text-primary-foreground px-5 py-2.5 text-xs font-semibold hover:opacity-95 shadow-glow cursor-pointer">
                          Add Review
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}
          {/* ================================== DEPARTURE BATCHES TAB ================================== */}
          {activeTab === "batches" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="font-display text-lg font-bold text-foreground">
                  Scheduled Batches
                </h3>
                <button
                  onClick={() => setShowAddForm(true)}
                  className="rounded-xl bg-primary text-primary-foreground px-4 py-2 text-sm font-semibold hover:opacity-90 transition flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="h-4 w-4" /> Add Batch
                </button>
              </div>

              {/* Add form dialog overlay modal */}
              {showAddForm && (
                <div className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4">
                  <div className="w-full max-w-2xl rounded-3xl bg-card border border-border p-6 shadow-elegant text-foreground max-h-[90vh] overflow-y-auto">
                    <div className="flex justify-between items-center border-b border-border pb-4 mb-4">
                      <h4 className="font-display text-xl font-bold">
                        Schedule Departure Batch
                      </h4>
                      <button
                        onClick={() => setShowAddForm(false)}
                        className="rounded-full hover:bg-muted p-1 cursor-pointer"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                    <form onSubmit={handleAddBatch} className="space-y-4">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs font-semibold uppercase text-muted-foreground">
                            Select Package
                          </label>
                          <select
                            value={newBatch.package_slug}
                            onChange={(e) =>
                              setNewBatch({
                                ...newBatch,
                                package_slug: e.target.value,
                              })
                            }
                            required
                            className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm"
                          >
                            <option value="" disabled>
                              Choose Package...
                            </option>
                            {dbPackages.map((p) => (
                              <option key={p.slug} value={p.slug}>
                                {p.name}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="text-xs font-semibold uppercase text-muted-foreground">
                            Max Seats Quota
                          </label>
                          <input
                            type="number"
                            value={newBatch.max_seats}
                            onChange={(e) =>
                              setNewBatch({
                                ...newBatch,
                                max_seats: parseInt(e.target.value) || 0,
                              })
                            }
                            min={1}
                            required
                            disabled={newBatch.unlimited_seats}
                            className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm"
                          />
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs font-semibold uppercase text-muted-foreground">
                            Start Date
                          </label>
                          <input
                            type="date"
                            value={newBatch.start_date}
                            onChange={(e) =>
                              setNewBatch({
                                ...newBatch,
                                start_date: e.target.value,
                              })
                            }
                            required
                            className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-semibold uppercase text-muted-foreground">
                            End Date
                          </label>
                          <input
                            type="date"
                            value={newBatch.end_date}
                            onChange={(e) =>
                              setNewBatch({
                                ...newBatch,
                                end_date: e.target.value,
                              })
                            }
                            required
                            className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm"
                          />
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-3 gap-4">
                        <div className="flex items-center gap-2 mt-4">
                          <input
                            type="checkbox"
                            id="unlimited_seats"
                            checked={newBatch.unlimited_seats}
                            onChange={(e) =>
                              setNewBatch({
                                ...newBatch,
                                unlimited_seats: e.target.checked,
                              })
                            }
                            className="h-4 w-4 text-primary border-border rounded"
                          />
                          <label
                            htmlFor="unlimited_seats"
                            className="text-xs font-semibold uppercase text-muted-foreground select-none"
                          >
                            Unlimited Seats
                          </label>
                        </div>
                        <div className="flex items-center gap-2 mt-4">
                          <input
                            type="checkbox"
                            id="waitlist_enabled"
                            checked={newBatch.waitlist_enabled}
                            onChange={(e) =>
                              setNewBatch({
                                ...newBatch,
                                waitlist_enabled: e.target.checked,
                              })
                            }
                            className="h-4 w-4 text-primary border-border rounded"
                          />
                          <label
                            htmlFor="waitlist_enabled"
                            className="text-xs font-semibold uppercase text-muted-foreground select-none"
                          >
                            Waitlist Toggle
                          </label>
                        </div>
                        <div>
                          <label className="text-xs font-semibold uppercase text-muted-foreground">
                            Cutoff Days before Start
                          </label>
                          <input
                            type="number"
                            value={newBatch.booking_cutoff_days}
                            onChange={(e) =>
                              setNewBatch({
                                ...newBatch,
                                booking_cutoff_days:
                                  parseInt(e.target.value) || 0,
                              })
                            }
                            min={0}
                            required
                            className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm"
                          />
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4 border-t border-border pt-4">
                        <div>
                          <label className="text-xs font-semibold uppercase text-muted-foreground">
                            Guide Name
                          </label>
                          <input
                            type="text"
                            value={newBatch.guide_name}
                            onChange={(e) =>
                              setNewBatch({
                                ...newBatch,
                                guide_name: e.target.value,
                              })
                            }
                            placeholder="e.g. Atul Nautiyal"
                            className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-semibold uppercase text-muted-foreground">
                            Guide Phone
                          </label>
                          <input
                            type="text"
                            value={newBatch.guide_phone}
                            onChange={(e) =>
                              setNewBatch({
                                ...newBatch,
                                guide_phone: e.target.value,
                              })
                            }
                            placeholder="e.g. +91 9876543210"
                            className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm"
                          />
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs font-semibold uppercase text-muted-foreground">
                            Meeting Time
                          </label>
                          <input
                            type="text"
                            value={newBatch.meeting_time}
                            onChange={(e) =>
                              setNewBatch({
                                ...newBatch,
                                meeting_time: e.target.value,
                              })
                            }
                            placeholder="e.g. 06:00 AM"
                            className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-semibold uppercase text-muted-foreground">
                            Meeting Location
                          </label>
                          <input
                            type="text"
                            value={newBatch.meeting_location}
                            onChange={(e) =>
                              setNewBatch({
                                ...newBatch,
                                meeting_location: e.target.value,
                              })
                            }
                            placeholder="e.g. Dehradun ISBT"
                            className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-xs font-semibold uppercase text-muted-foreground">
                          Internal Notes
                        </label>
                        <textarea
                          value={newBatch.internal_notes}
                          onChange={(e) =>
                            setNewBatch({
                              ...newBatch,
                              internal_notes: e.target.value,
                            })
                          }
                          placeholder="e.g. Guide assignment notes, transport vendors..."
                          className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm h-18 resize-none"
                        />
                      </div>

                      <button
                        type="submit"
                        className="mt-2 w-full rounded-xl bg-primary text-primary-foreground py-3 text-sm font-semibold shadow-glow cursor-pointer"
                      >
                        Schedule Batch
                      </button>
                    </form>
                  </div>
                </div>
              )}

              {/* Bookings Details Control Modal */}
              {selectedBooking && (
                <div className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4">
                  <div className="w-full max-w-3xl rounded-3xl bg-card border border-border p-6 shadow-elegant text-foreground max-h-[95vh] overflow-y-auto">
                    <div className="flex justify-between items-center border-b border-border pb-4 mb-4">
                      <div>
                        <h4 className="font-display text-xl font-bold">
                          Booking Details & CRM Control
                        </h4>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          Reference ID: {selectedBooking.id}
                        </p>
                      </div>
                      <button
                        onClick={() => setSelectedBooking(null)}
                        className="rounded-full hover:bg-muted p-1 cursor-pointer"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Customer Information Column */}
                      <div className="space-y-4">
                        <div>
                          <h5 className="text-sm font-bold text-primary uppercase tracking-wider mb-3">
                            Customer Information
                          </h5>
                          <div className="rounded-2xl border border-border p-4 bg-muted/20 space-y-2 text-sm">
                            <div>
                              <span className="font-semibold">Name:</span> {selectedBooking.full_name}
                            </div>
                            <div>
                              <span className="font-semibold">Email:</span> {selectedBooking.email}
                            </div>
                            <div>
                              <span className="font-semibold">Phone:</span> {selectedBooking.phone}
                            </div>
                            <div>
                              <span className="font-semibold">Pax Count:</span> {selectedBooking.travelers} Travelers
                            </div>
                            <div>
                              <span className="font-semibold">Special Requirements:</span>
                              <p className="text-xs text-muted-foreground mt-1 whitespace-pre-wrap bg-background p-2 rounded-lg border border-border">
                                {selectedBooking.special_requirements || "None"}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h5 className="text-sm font-bold text-primary uppercase tracking-wider mb-3">
                            Adventure Details
                          </h5>
                          <div className="rounded-2xl border border-border p-4 bg-muted/20 space-y-2 text-sm">
                            <div>
                              <span className="font-semibold">Package:</span> {selectedBooking.package_name}
                            </div>
                            <div>
                              <span className="font-semibold">Slug:</span> {selectedBooking.package_slug}
                            </div>
                            <div>
                              <span className="font-semibold">Travel Date:</span> {selectedBooking.travel_date}
                            </div>
                            <div>
                              <span className="font-semibold">Created At:</span> {new Date(selectedBooking.created_at).toLocaleString()}
                            </div>
                            {selectedBooking.updated_at && (
                              <div>
                                <span className="font-semibold">Last Modified:</span> {new Date(selectedBooking.updated_at).toLocaleString()}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Administrative & Operations Column */}
                      <div className="space-y-4">
                        <h5 className="text-sm font-bold text-primary uppercase tracking-wider mb-3">
                          Operations & Control
                        </h5>
                        <div className="space-y-3.5">
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="text-xs font-semibold uppercase text-muted-foreground">
                                Booking Status
                              </label>
                              <select
                                value={selectedBooking.status}
                                onChange={(e) =>
                                  setSelectedBooking({ ...selectedBooking, status: e.target.value })
                                }
                                className="mt-1.5 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm"
                              >
                                <option value="pending">Pending</option>
                                <option value="confirmed">Confirmed</option>
                                <option value="cancelled">Cancelled</option>
                              </select>
                            </div>

                            <div>
                              <label className="text-xs font-semibold uppercase text-muted-foreground">
                                Payment Status
                              </label>
                              <select
                                value={selectedBooking.payment_status || "pending"}
                                onChange={(e) =>
                                  setSelectedBooking({ ...selectedBooking, payment_status: e.target.value })
                                }
                                className="mt-1.5 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm"
                              >
                                <option value="pending">Pending</option>
                                <option value="completed">Completed</option>
                                <option value="refunded">Refunded</option>
                              </select>
                            </div>
                          </div>

                          <div>
                            <label className="text-xs font-semibold uppercase text-muted-foreground">
                              Assign Guide
                            </label>
                            <input
                              type="text"
                              value={selectedBooking.guide_name || ""}
                              onChange={(e) =>
                                setSelectedBooking({ ...selectedBooking, guide_name: e.target.value })
                              }
                              placeholder="Name of Guide"
                              className="mt-1.5 w-full rounded-xl border border-input bg-background px-3.5 py-2 text-sm"
                            />
                          </div>

                          <div>
                            <label className="text-xs font-semibold uppercase text-muted-foreground">
                              Assign Coordinator
                            </label>
                            <input
                              type="text"
                              value={selectedBooking.coordinator_name || ""}
                              onChange={(e) =>
                                setSelectedBooking({ ...selectedBooking, coordinator_name: e.target.value })
                              }
                              placeholder="Name of Coordinator"
                              className="mt-1.5 w-full rounded-xl border border-input bg-background px-3.5 py-2 text-sm"
                            />
                          </div>

                          <div>
                            <label className="text-xs font-semibold uppercase text-muted-foreground">
                              Vehicle Assignment
                            </label>
                            <input
                              type="text"
                              value={selectedBooking.vehicle_info || ""}
                              onChange={(e) =>
                                setSelectedBooking({ ...selectedBooking, vehicle_info: e.target.value })
                              }
                              placeholder="Vehicle number, type, vendor..."
                              className="mt-1.5 w-full rounded-xl border border-input bg-background px-3.5 py-2 text-sm"
                            />
                          </div>

                          <div>
                            <label className="text-xs font-semibold uppercase text-muted-foreground">
                              Internal Notes
                            </label>
                            <textarea
                              value={selectedBooking.internal_notes || ""}
                              onChange={(e) =>
                                setSelectedBooking({ ...selectedBooking, internal_notes: e.target.value })
                              }
                              placeholder="Internal staff notes, driver instructions..."
                              className="mt-1.5 w-full rounded-xl border border-input bg-background px-3.5 py-2 text-sm h-20 resize-none"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Booking Timeline */}
                    <div className="border-t border-border mt-6 pt-4">
                      <h5 className="text-sm font-bold text-primary uppercase tracking-wider mb-3">
                        Booking Activity History
                      </h5>
                      <div className="space-y-3.5 text-xs">
                        <div className="flex gap-4 items-start">
                          <span className="w-24 text-muted-foreground font-semibold">
                            {new Date(selectedBooking.created_at).toLocaleDateString()}
                          </span>
                          <div className="flex-1 border-l-2 border-primary pl-4 pb-2">
                            <span className="font-semibold text-foreground">Enquiry Created</span>
                            <p className="text-muted-foreground mt-0.5">
                              Client submitted booking request for {selectedBooking.package_name} ({selectedBooking.travelers} slots).
                            </p>
                          </div>
                        </div>
                        {selectedBooking.updated_at && (
                          <div className="flex gap-4 items-start">
                            <span className="w-24 text-muted-foreground font-semibold">
                              {new Date(selectedBooking.updated_at).toLocaleDateString()}
                            </span>
                            <div className="flex-1 border-l-2 border-primary pl-4">
                              <span className="font-semibold text-foreground">Last Modification</span>
                              <p className="text-muted-foreground mt-0.5">
                                Record metadata updated (payment: {selectedBooking.payment_status}, status: {selectedBooking.status}).
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-between items-center border-t border-border mt-6 pt-4 gap-3 flex-wrap">
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            // Print Summary / Invoice
                            const printContent = `
                              <div style="font-family: sans-serif; padding: 40px; color: #1e293b; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px;">
                                <h2 style="color: #0f172a; margin-bottom: 5px;">EXPLORE HILLS</h2>
                                <p style="color: #64748b; font-size: 13px; margin-top: 0;">Uttarakhand Adventure Travel</p>
                                <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;"/>
                                <h3>BOOKING INVOICE SUMMARY</h3>
                                <table style="width: 100%; border-collapse: collapse; margin-top: 15px; font-size: 14px;">
                                  <tr>
                                    <td style="padding: 6px 0; color: #64748b;"><strong>Reference ID:</strong></td>
                                    <td style="padding: 6px 0; text-align: right;">${selectedBooking.id}</td>
                                  </tr>
                                  <tr>
                                    <td style="padding: 6px 0; color: #64748b;"><strong>Booking Date:</strong></td>
                                    <td style="padding: 6px 0; text-align: right;">${new Date(selectedBooking.created_at).toLocaleDateString()}</td>
                                  </tr>
                                  <tr>
                                    <td style="padding: 6px 0; color: #64748b;"><strong>Client Name:</strong></td>
                                    <td style="padding: 6px 0; text-align: right;">${selectedBooking.full_name}</td>
                                  </tr>
                                  <tr>
                                    <td style="padding: 6px 0; color: #64748b;"><strong>Client Email:</strong></td>
                                    <td style="padding: 6px 0; text-align: right;">${selectedBooking.email}</td>
                                  </tr>
                                  <tr>
                                    <td style="padding: 6px 0; color: #64748b;"><strong>Client Phone:</strong></td>
                                    <td style="padding: 6px 0; text-align: right;">${selectedBooking.phone}</td>
                                  </tr>
                                  <tr>
                                    <td style="padding: 6px 0; color: #64748b;"><strong>Adventure Route:</strong></td>
                                    <td style="padding: 6px 0; text-align: right;">${selectedBooking.package_name}</td>
                                  </tr>
                                  <tr>
                                    <td style="padding: 6px 0; color: #64748b;"><strong>Departure Date:</strong></td>
                                    <td style="padding: 6px 0; text-align: right;">${selectedBooking.travel_date}</td>
                                  </tr>
                                  <tr>
                                    <td style="padding: 6px 0; color: #64748b;"><strong>Travelers Count:</strong></td>
                                    <td style="padding: 6px 0; text-align: right;">${selectedBooking.travelers} Person(s)</td>
                                  </tr>
                                  <tr>
                                    <td style="padding: 6px 0; color: #64748b;"><strong>Booking Status:</strong></td>
                                    <td style="padding: 6px 0; text-align: right; text-transform: uppercase; font-weight: bold;">${selectedBooking.status}</td>
                                  </tr>
                                  <tr>
                                    <td style="padding: 6px 0; color: #64748b;"><strong>Payment Status:</strong></td>
                                    <td style="padding: 6px 0; text-align: right; text-transform: uppercase; font-weight: bold;">${selectedBooking.payment_status}</td>
                                  </tr>
                                </table>
                                <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 25px 0;"/>
                                <p style="font-size: 11px; color: #94a3b8; text-align: center;">Explore Hills. Crafted in Uttarakhand. Leave only footprints.</p>
                              </div>
                            `;
                            const win = window.open("", "_blank");
                            if (win) {
                              win.document.write(printContent);
                              win.document.close();
                              win.print();
                            }
                          }}
                          className="rounded-xl border border-border bg-background px-4 py-2.5 text-xs font-semibold text-foreground hover:bg-muted cursor-pointer"
                        >
                          Print Summary
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(selectedBooking, null, 2));
                            const downloadAnchor = document.createElement('a');
                            downloadAnchor.setAttribute("href", dataStr);
                            downloadAnchor.setAttribute("download", `booking-${selectedBooking.id}.json`);
                            document.body.appendChild(downloadAnchor);
                            downloadAnchor.click();
                            downloadAnchor.remove();
                            toast.success("JSON exported successfully");
                          }}
                          className="rounded-xl border border-border bg-background px-4 py-2.5 text-xs font-semibold text-foreground hover:bg-muted cursor-pointer"
                        >
                          Export JSON
                        </button>
                      </div>

                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => setSelectedBooking(null)}
                          className="rounded-xl border border-border px-4 py-2.5 text-xs font-semibold text-foreground hover:bg-muted cursor-pointer"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          onClick={async () => {
                            await updateBooking(selectedBooking.id, {
                              status: selectedBooking.status,
                              payment_status: selectedBooking.payment_status,
                              guide_name: selectedBooking.guide_name,
                              coordinator_name: selectedBooking.coordinator_name,
                              vehicle_info: selectedBooking.vehicle_info,
                              internal_notes: selectedBooking.internal_notes,
                            });
                            setSelectedBooking(null);
                          }}
                          className="rounded-xl bg-primary text-primary-foreground px-5 py-2.5 text-xs font-semibold hover:opacity-95 shadow-glow cursor-pointer"
                        >
                          Save Updates
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Edit form overlay modal */}
              {editingBatch && (
                <div className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4">
                  <div className="w-full max-w-2xl rounded-3xl bg-card border border-border p-6 shadow-elegant text-foreground max-h-[90vh] overflow-y-auto">
                    <div className="flex justify-between items-center border-b border-border pb-4 mb-4">
                      <h4 className="font-display text-xl font-bold">
                        Edit Departure Batch
                      </h4>
                      <button
                        onClick={() => setEditingBatch(null)}
                        className="rounded-full hover:bg-muted p-1 cursor-pointer"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                    <form onSubmit={handleUpdateBatch} className="space-y-4">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs font-semibold uppercase text-muted-foreground">
                            Package Slug
                          </label>
                          <input
                            type="text"
                            readOnly
                            value={editingBatch.package_slug}
                            className="mt-2 w-full rounded-xl border border-input bg-muted px-4 py-2.5 text-sm cursor-not-allowed opacity-80"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-semibold uppercase text-muted-foreground">
                            Max Seats Quota
                          </label>
                          <input
                            type="number"
                            value={editingBatch.max_seats}
                            onChange={(e) =>
                              setEditingBatch({
                                ...editingBatch,
                                max_seats: parseInt(e.target.value) || 0,
                              })
                            }
                            min={1}
                            required
                            disabled={editingBatch.unlimited_seats}
                            className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm"
                          />
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs font-semibold uppercase text-muted-foreground">
                            Start Date
                          </label>
                          <input
                            type="date"
                            value={editingBatch.start_date}
                            onChange={(e) =>
                              setEditingBatch({
                                ...editingBatch,
                                start_date: e.target.value,
                              })
                            }
                            required
                            className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-semibold uppercase text-muted-foreground">
                            End Date
                          </label>
                          <input
                            type="date"
                            value={editingBatch.end_date}
                            onChange={(e) =>
                              setEditingBatch({
                                ...editingBatch,
                                end_date: e.target.value,
                              })
                            }
                            required
                            className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm"
                          />
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-3 gap-4">
                        <div className="flex items-center gap-2 mt-4">
                          <input
                            type="checkbox"
                            id="edit_unlimited_seats"
                            checked={editingBatch.unlimited_seats}
                            onChange={(e) =>
                              setEditingBatch({
                                ...editingBatch,
                                unlimited_seats: e.target.checked,
                              })
                            }
                            className="h-4 w-4 text-primary border-border rounded"
                          />
                          <label
                            htmlFor="edit_unlimited_seats"
                            className="text-xs font-semibold uppercase text-muted-foreground select-none"
                          >
                            Unlimited Seats
                          </label>
                        </div>
                        <div className="flex items-center gap-2 mt-4">
                          <input
                            type="checkbox"
                            id="edit_waitlist_enabled"
                            checked={editingBatch.waitlist_enabled}
                            onChange={(e) =>
                              setEditingBatch({
                                ...editingBatch,
                                waitlist_enabled: e.target.checked,
                              })
                            }
                            className="h-4 w-4 text-primary border-border rounded"
                          />
                          <label
                            htmlFor="edit_waitlist_enabled"
                            className="text-xs font-semibold uppercase text-muted-foreground select-none"
                          >
                            Waitlist Toggle
                          </label>
                        </div>
                        <div>
                          <label className="text-xs font-semibold uppercase text-muted-foreground">
                            Cutoff Days before Start
                          </label>
                          <input
                            type="number"
                            value={editingBatch.booking_cutoff_days}
                            onChange={(e) =>
                              setEditingBatch({
                                ...editingBatch,
                                booking_cutoff_days:
                                  parseInt(e.target.value) || 0,
                              })
                            }
                            min={0}
                            required
                            className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm"
                          />
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4 border-t border-border pt-4">
                        <div>
                          <label className="text-xs font-semibold uppercase text-muted-foreground">
                            Guide Name
                          </label>
                          <input
                            type="text"
                            value={editingBatch.guide_name || ""}
                            onChange={(e) =>
                              setEditingBatch({
                                ...editingBatch,
                                guide_name: e.target.value,
                              })
                            }
                            className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-semibold uppercase text-muted-foreground">
                            Guide Phone
                          </label>
                          <input
                            type="text"
                            value={editingBatch.guide_phone || ""}
                            onChange={(e) =>
                              setEditingBatch({
                                ...editingBatch,
                                guide_phone: e.target.value,
                              })
                            }
                            className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm"
                          />
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs font-semibold uppercase text-muted-foreground">
                            Meeting Time
                          </label>
                          <input
                            type="text"
                            value={editingBatch.meeting_time || ""}
                            onChange={(e) =>
                              setEditingBatch({
                                ...editingBatch,
                                meeting_time: e.target.value,
                              })
                            }
                            className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-semibold uppercase text-muted-foreground">
                            Meeting Location
                          </label>
                          <input
                            type="text"
                            value={editingBatch.meeting_location || ""}
                            onChange={(e) =>
                              setEditingBatch({
                                ...editingBatch,
                                meeting_location: e.target.value,
                              })
                            }
                            className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm"
                          />
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs font-semibold uppercase text-muted-foreground">
                            Visibility
                          </label>
                          <select
                            value={editingBatch.visibility}
                            onChange={(e) =>
                              setEditingBatch({
                                ...editingBatch,
                                visibility: e.target.value,
                              })
                            }
                            className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm"
                          >
                            <option value="visible">Visible</option>
                            <option value="hidden">Hidden</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-xs font-semibold uppercase text-muted-foreground">
                            Status
                          </label>
                          <select
                            value={editingBatch.status}
                            onChange={(e) =>
                              setEditingBatch({
                                ...editingBatch,
                                status: e.target.value as
                                  | "open"
                                  | "full"
                                  | "cancelled",
                              })
                            }
                            className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm"
                          >
                            <option value="open">Open</option>
                            <option value="full">Full</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="text-xs font-semibold uppercase text-muted-foreground">
                          Internal Notes
                        </label>
                        <textarea
                          value={editingBatch.internal_notes || ""}
                          onChange={(e) =>
                            setEditingBatch({
                              ...editingBatch,
                              internal_notes: e.target.value,
                            })
                          }
                          className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm h-18 resize-none"
                        />
                      </div>

                      <button
                        type="submit"
                        className="mt-2 w-full rounded-xl bg-primary text-primary-foreground py-3 text-sm font-semibold shadow-glow cursor-pointer"
                      >
                        Update Batch details
                      </button>
                    </form>
                  </div>
                </div>
              )}

              <div className="rounded-3xl border border-border bg-card shadow-card overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-muted text-muted-foreground text-xs uppercase font-semibold">
                      <tr>
                        <th className="px-6 py-4">Package</th>
                        <th className="px-6 py-4">Dates</th>
                        <th className="px-6 py-4">Occupancy</th>
                        <th className="px-6 py-4">Guide Details</th>
                        <th className="px-6 py-4">Visibility</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border text-foreground">
                      {filteredDepartures.length === 0 ? (
                        <tr>
                          <td
                            colSpan={7}
                            className="px-6 py-10 text-center text-muted-foreground"
                          >
                            No batches scheduled.
                          </td>
                        </tr>
                      ) : (
                        filteredDepartures.map((d) => {
                          const occ = d.unlimited_seats
                            ? 0
                            : Math.round((d.booked_seats / d.max_seats) * 100);
                          return (
                            <tr
                              key={d.id}
                              className="hover:bg-muted/30 transition"
                            >
                              <td className="px-6 py-4 font-semibold capitalize">
                                {d.package_slug.replace(/-/g, " ")}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="font-semibold">
                                  {d.start_date}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  to {d.end_date}
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <div className="font-semibold">
                                  {d.unlimited_seats
                                    ? "Unlimited"
                                    : `${d.booked_seats} / ${d.max_seats}`}
                                </div>
                                {!d.unlimited_seats && (
                                  <div className="w-24 bg-muted h-1.5 rounded-full mt-1 overflow-hidden">
                                    <div
                                      className={`h-full rounded-full ${occ >= 90 ? "bg-red-500" : occ >= 50 ? "bg-yellow-500" : "bg-green-500"}`}
                                      style={{
                                        width: `${Math.min(occ, 100)}%`,
                                      }}
                                    />
                                  </div>
                                )}
                              </td>
                              <td className="px-6 py-4 text-xs">
                                {d.guide_name ? (
                                  <>
                                    <div className="font-semibold">
                                      {d.guide_name}
                                    </div>
                                    <div className="text-muted-foreground">
                                      {d.guide_phone || "No phone"}
                                    </div>
                                  </>
                                ) : (
                                  <span className="text-muted-foreground">
                                    Unassigned
                                  </span>
                                )}
                              </td>
                              <td className="px-6 py-4">
                                <span
                                  className={`inline-flex rounded-full px-2 py-0.5 text-xs font-semibold ${d.visibility === "visible" ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800"}`}
                                >
                                  {d.visibility}
                                </span>
                              </td>
                              <td className="px-6 py-4">
                                <span
                                  className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${d.status === "open" ? "bg-green-100 text-green-800" : d.status === "cancelled" ? "bg-red-100 text-red-800" : "bg-yellow-100 text-yellow-800"}`}
                                >
                                  {d.status}
                                </span>
                              </td>
                              <td className="px-6 py-4 text-right space-x-1.5 whitespace-nowrap">
                                <button
                                  onClick={() => setEditingBatch(d)}
                                  className="text-primary hover:text-primary/80 transition"
                                >
                                  <Edit2 className="h-4 w-4 inline" />
                                </button>
                                <button
                                  onClick={() => handleDeleteBatch(d.id)}
                                  className="text-destructive hover:text-destructive/80 transition"
                                >
                                  <Trash2 className="h-4 w-4 inline" />
                                </button>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ================================== PACKAGES CRUD TAB ================================== */}
          {activeTab === "packages" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="font-display text-lg font-bold text-foreground">
                  Packages Directory
                </h3>
                <button
                  onClick={() => setShowAddPackageForm(true)}
                  className="rounded-xl bg-primary text-primary-foreground px-4 py-2 text-sm font-semibold hover:opacity-90 transition flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="h-4 w-4" /> Add Package
                </button>
              </div>

              {/* Add Package form modal */}
              {showAddPackageForm && (
                <div className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4">
                  <div className="w-full max-w-4xl rounded-3xl bg-card border border-border p-6 shadow-elegant text-foreground max-h-[90vh] overflow-y-auto">
                    <div className="flex justify-between items-center border-b border-border pb-4 mb-4">
                      <h4 className="font-display text-xl font-bold">
                        Add Adventure Package
                      </h4>
                      <button
                        onClick={() => setShowAddPackageForm(false)}
                        className="rounded-full hover:bg-muted p-1 cursor-pointer"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                    <form onSubmit={handleAddPackage} className="space-y-4">
                      <div className="grid sm:grid-cols-3 gap-4">
                        <div>
                          <label className="text-xs font-semibold uppercase text-muted-foreground">
                            Package Name
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="Moila Top Trek"
                            value={newPackage.name}
                            onChange={(e) => {
                              const slugVal = e.target.value
                                .toLowerCase()
                                .replace(/[^a-z0-9]+/g, "-")
                                .replace(/(^-|-$)/g, "");
                              setNewPackage({
                                ...newPackage,
                                name: e.target.value,
                                slug: slugVal,
                              });
                            }}
                            className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-semibold uppercase text-muted-foreground">
                            URL Slug
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="moila-top"
                            value={newPackage.slug}
                            onChange={(e) =>
                              setNewPackage({
                                ...newPackage,
                                slug: e.target.value,
                              })
                            }
                            className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-semibold uppercase text-muted-foreground">
                            Category
                          </label>
                          <select
                            value={newPackage.category}
                            onChange={(e) =>
                              setNewPackage({
                                ...newPackage,
                                category: e.target.value as "trek" | "trip",
                              })
                            }
                            className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm"
                          >
                            <option value="trek">Trek</option>
                            <option value="trip">Trip</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-4 gap-4">
                        <div>
                          <label className="text-xs font-semibold uppercase text-muted-foreground">
                            Sub Category
                          </label>
                          <input
                            type="text"
                            placeholder="Cultural"
                            value={newPackage.sub_category || ""}
                            onChange={(e) =>
                              setNewPackage({
                                ...newPackage,
                                sub_category: e.target.value,
                              })
                            }
                            className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-semibold uppercase text-muted-foreground">
                            Region
                          </label>
                          <input
                            type="text"
                            placeholder="Jaunsar-Bawar"
                            value={newPackage.region || ""}
                            onChange={(e) =>
                              setNewPackage({
                                ...newPackage,
                                region: e.target.value,
                              })
                            }
                            className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-semibold uppercase text-muted-foreground">
                            Location
                          </label>
                          <input
                            type="text"
                            placeholder="Hanol"
                            value={newPackage.location || ""}
                            onChange={(e) =>
                              setNewPackage({
                                ...newPackage,
                                location: e.target.value,
                              })
                            }
                            className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-semibold uppercase text-muted-foreground">
                            Duration
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="3 Days / 2 Nights"
                            value={newPackage.duration}
                            onChange={(e) =>
                              setNewPackage({
                                ...newPackage,
                                duration: e.target.value,
                              })
                            }
                            className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm"
                          />
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-4 gap-4">
                        <div>
                          <label className="text-xs font-semibold uppercase text-muted-foreground">
                            Price (INR)
                          </label>
                          <input
                            type="number"
                            required
                            value={newPackage.price}
                            onChange={(e) =>
                              setNewPackage({
                                ...newPackage,
                                price: parseFloat(e.target.value) || 0,
                              })
                            }
                            className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-semibold uppercase text-muted-foreground">
                            Discount Price
                          </label>
                          <input
                            type="number"
                            value={newPackage.discount_price || ""}
                            onChange={(e) =>
                              setNewPackage({
                                ...newPackage,
                                discount_price: e.target.value
                                  ? parseFloat(e.target.value)
                                  : null,
                              })
                            }
                            className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-semibold uppercase text-muted-foreground">
                            Offer Badge
                          </label>
                          <input
                            type="text"
                            placeholder="10% OFF"
                            value={newPackage.offer_badge || ""}
                            onChange={(e) =>
                              setNewPackage({
                                ...newPackage,
                                offer_badge: e.target.value,
                              })
                            }
                            className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-semibold uppercase text-muted-foreground">
                            Difficulty
                          </label>
                          <select
                            value={newPackage.difficulty || "Easy"}
                            onChange={(e) =>
                              setNewPackage({
                                ...newPackage,
                                difficulty: e.target.value,
                              })
                            }
                            className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm"
                          >
                            <option value="Easy">Easy</option>
                            <option value="Easy – Moderate">
                              Easy – Moderate
                            </option>
                            <option value="Moderate">Moderate</option>
                            <option value="Strenuous">Strenuous</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-3 gap-4 border-t border-border pt-4">
                        <div>
                          <label className="text-xs font-semibold uppercase text-muted-foreground">
                            Featured Image URL
                          </label>
                          <div className="flex gap-2 mt-2">
                            <input
                              type="text"
                              placeholder="Image link..."
                              value={newPackage.image || ""}
                              onChange={(e) =>
                                setNewPackage({
                                  ...newPackage,
                                  image: e.target.value,
                                })
                              }
                              className="w-full rounded-xl border border-input bg-background px-4 py-2 text-sm"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedImageToInsert({
                                  callback: (url) =>
                                    setNewPackage((prev) => ({
                                      ...prev,
                                      image: url,
                                    })),
                                });
                                setActiveTab("media");
                              }}
                              className="rounded-xl bg-muted border border-border px-3 hover:bg-muted/80 text-xs font-semibold cursor-pointer"
                            >
                              Choose
                            </button>
                          </div>
                        </div>
                        <div>
                          <label className="text-xs font-semibold uppercase text-muted-foreground">
                            Status
                          </label>
                          <select
                            value={newPackage.status}
                            onChange={(e) =>
                              setNewPackage({
                                ...newPackage,
                                status: e.target.value as
                                  | "draft"
                                  | "published"
                                  | "archived",
                              })
                            }
                            className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm"
                          >
                            <option value="draft">Draft</option>
                            <option value="published">Published</option>
                            <option value="archived">Archived</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-xs font-semibold uppercase text-muted-foreground">
                            Sort Order
                          </label>
                          <input
                            type="number"
                            value={newPackage.sort_order}
                            onChange={(e) =>
                              setNewPackage({
                                ...newPackage,
                                sort_order: parseInt(e.target.value) || 0,
                              })
                            }
                            className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm"
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="mt-4 w-full rounded-xl bg-primary text-primary-foreground py-3 text-sm font-semibold shadow-glow cursor-pointer"
                      >
                        Create Package Record
                      </button>
                    </form>
                  </div>
                </div>
              )}

              {/* Edit Package form modal */}
              {editingPackage && (
                <div className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4">
                  <div className="w-full max-w-4xl rounded-3xl bg-card border border-border p-6 shadow-elegant text-foreground max-h-[90vh] overflow-y-auto">
                    <div className="flex justify-between items-center border-b border-border pb-4 mb-4">
                      <h4 className="font-display text-xl font-bold">
                        Edit Adventure details
                      </h4>
                      <button
                        onClick={() => setEditingPackage(null)}
                        className="rounded-full hover:bg-muted p-1 cursor-pointer"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                    <form onSubmit={handleUpdatePackage} className="space-y-4">
                      <div className="grid sm:grid-cols-3 gap-4">
                        <div>
                          <label className="text-xs font-semibold uppercase text-muted-foreground">
                            Package Name
                          </label>
                          <input
                            type="text"
                            required
                            value={editingPackage.name}
                            onChange={(e) =>
                              setEditingPackage({
                                ...editingPackage,
                                name: e.target.value,
                              })
                            }
                            className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-semibold uppercase text-muted-foreground">
                            Slug
                          </label>
                          <input
                            type="text"
                            readOnly
                            value={editingPackage.slug}
                            className="mt-2 w-full rounded-xl border border-input bg-muted px-4 py-2.5 text-sm opacity-80 cursor-not-allowed"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-semibold uppercase text-muted-foreground">
                            Category
                          </label>
                          <select
                            value={editingPackage.category}
                            onChange={(e) =>
                              setEditingPackage({
                                ...editingPackage,
                                category: e.target.value as "trek" | "trip",
                              })
                            }
                            className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm"
                          >
                            <option value="trek">Trek</option>
                            <option value="trip">Trip</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-4 gap-4">
                        <div>
                          <label className="text-xs font-semibold uppercase text-muted-foreground">
                            Sub Category
                          </label>
                          <input
                            type="text"
                            value={editingPackage.sub_category || ""}
                            onChange={(e) =>
                              setEditingPackage({
                                ...editingPackage,
                                sub_category: e.target.value,
                              })
                            }
                            className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-semibold uppercase text-muted-foreground">
                            Region
                          </label>
                          <input
                            type="text"
                            value={editingPackage.region || ""}
                            onChange={(e) =>
                              setEditingPackage({
                                ...editingPackage,
                                region: e.target.value,
                              })
                            }
                            className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-semibold uppercase text-muted-foreground">
                            Location
                          </label>
                          <input
                            type="text"
                            value={editingPackage.location || ""}
                            onChange={(e) =>
                              setEditingPackage({
                                ...editingPackage,
                                location: e.target.value,
                              })
                            }
                            className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-semibold uppercase text-muted-foreground">
                            Duration
                          </label>
                          <input
                            type="text"
                            required
                            value={editingPackage.duration}
                            onChange={(e) =>
                              setEditingPackage({
                                ...editingPackage,
                                duration: e.target.value,
                              })
                            }
                            className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm"
                          />
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-4 gap-4">
                        <div>
                          <label className="text-xs font-semibold uppercase text-muted-foreground">
                            Price (INR)
                          </label>
                          <input
                            type="number"
                            required
                            value={editingPackage.price}
                            onChange={(e) =>
                              setEditingPackage({
                                ...editingPackage,
                                price: parseFloat(e.target.value) || 0,
                              })
                            }
                            className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-semibold uppercase text-muted-foreground">
                            Discount Price
                          </label>
                          <input
                            type="number"
                            value={editingPackage.discount_price || ""}
                            onChange={(e) =>
                              setEditingPackage({
                                ...editingPackage,
                                discount_price: e.target.value
                                  ? parseFloat(e.target.value)
                                  : null,
                              })
                            }
                            className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-semibold uppercase text-muted-foreground">
                            Offer Badge
                          </label>
                          <input
                            type="text"
                            value={editingPackage.offer_badge || ""}
                            onChange={(e) =>
                              setEditingPackage({
                                ...editingPackage,
                                offer_badge: e.target.value,
                              })
                            }
                            className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-semibold uppercase text-muted-foreground">
                            Difficulty
                          </label>
                          <select
                            value={editingPackage.difficulty || "Easy"}
                            onChange={(e) =>
                              setEditingPackage({
                                ...editingPackage,
                                difficulty: e.target.value,
                              })
                            }
                            className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm"
                          >
                            <option value="Easy">Easy</option>
                            <option value="Easy – Moderate">
                              Easy – Moderate
                            </option>
                            <option value="Moderate">Moderate</option>
                            <option value="Strenuous">Strenuous</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-3 gap-4 border-t border-border pt-4">
                        <div>
                          <label className="text-xs font-semibold uppercase text-muted-foreground">
                            Featured Image URL
                          </label>
                          <div className="flex gap-2 mt-2">
                            <input
                              type="text"
                              value={editingPackage.image || ""}
                              onChange={(e) =>
                                setEditingPackage({
                                  ...editingPackage,
                                  image: e.target.value,
                                })
                              }
                              className="w-full rounded-xl border border-input bg-background px-4 py-2 text-sm"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedImageToInsert({
                                  callback: (url) =>
                                    setEditingPackage((prev) =>
                                      prev ? { ...prev, image: url } : null,
                                    ),
                                });
                                setActiveTab("media");
                              }}
                              className="rounded-xl bg-muted border border-border px-3 hover:bg-muted/80 text-xs font-semibold cursor-pointer"
                            >
                              Choose
                            </button>
                          </div>
                        </div>
                        <div>
                          <label className="text-xs font-semibold uppercase text-muted-foreground">
                            Status
                          </label>
                          <select
                            value={editingPackage.status}
                            onChange={(e) =>
                              setEditingPackage({
                                ...editingPackage,
                                status: e.target.value as
                                  | "draft"
                                  | "published"
                                  | "archived",
                              })
                            }
                            className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm"
                          >
                            <option value="draft">Draft</option>
                            <option value="published">Published</option>
                            <option value="archived">Archived</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-xs font-semibold uppercase text-muted-foreground">
                            Sort Order
                          </label>
                          <input
                            type="number"
                            value={editingPackage.sort_order}
                            onChange={(e) =>
                              setEditingPackage({
                                ...editingPackage,
                                sort_order: parseInt(e.target.value) || 0,
                              })
                            }
                            className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm"
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="mt-4 w-full rounded-xl bg-primary text-primary-foreground py-3 text-sm font-semibold shadow-glow cursor-pointer"
                      >
                        Update Package Record
                      </button>
                    </form>
                  </div>
                </div>
              )}

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {dbPackages.map((pkg) => (
                  <div
                    key={pkg.slug}
                    className="rounded-3xl border border-border bg-card shadow-card p-6 flex flex-col justify-between hover-lift"
                  >
                    <div>
                      {pkg.image && (
                        <img
                          src={pkg.image}
                          alt={pkg.name}
                          className="h-40 w-full object-cover rounded-2xl mb-4"
                        />
                      )}
                      <div className="flex justify-between items-start gap-2">
                        <span
                          className={`rounded-full px-2.5 py-0.5 text-xs font-semibold uppercase ${pkg.category === "trek" ? "bg-ember/10 text-ember" : "bg-primary/10 text-primary"}`}
                        >
                          {pkg.category}
                        </span>
                        <span
                          className={`rounded-full px-2 py-0.5 text-[10px] uppercase font-bold border ${pkg.status === "published" ? "bg-green-50 text-green-700 border-green-200" : pkg.status === "archived" ? "bg-gray-100 text-gray-600 border-gray-200" : "bg-yellow-50 text-yellow-700 border-yellow-200"}`}
                        >
                          {pkg.status}
                        </span>
                      </div>
                      <h4 className="font-display text-xl font-bold text-foreground mt-3">
                        {pkg.name}
                      </h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        Slug: {pkg.slug}
                      </p>
                      <p className="text-sm font-semibold text-foreground mt-2">
                        Price: ₹{pkg.price.toLocaleString("en-IN")}
                      </p>
                    </div>

                    <div className="flex gap-2 mt-6 pt-4 border-t border-border">
                      <button
                        onClick={() => setEditingPackage(pkg)}
                        className="rounded-xl border border-border hover:bg-muted text-foreground p-2 flex-1 text-xs font-semibold flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <Edit2 className="h-3.5 w-3.5" /> Edit
                      </button>
                      <button
                        onClick={() => handleDuplicatePackage(pkg)}
                        className="rounded-xl border border-border hover:bg-muted text-foreground p-2 flex-1 text-xs font-semibold flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <Copy className="h-3.5 w-3.5" /> Duplicate
                      </button>
                      <button
                        onClick={() => handleDeletePackage(pkg.slug)}
                        className="rounded-xl border border-destructive/20 hover:bg-destructive/10 text-destructive p-2 text-xs font-semibold cursor-pointer"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================================== ITINERARY BUILDER TAB ================================== */}
          {activeTab === "itinerary" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center flex-wrap gap-4">
                <div>
                  <h3 className="font-display text-lg font-bold text-foreground">
                    Visual Itinerary Builder
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Drag, duplicate, or re-order day flows dynamically.
                  </p>
                </div>
                <div className="flex gap-2">
                  <select
                    value={selectedItinerarySlug}
                    onChange={(e) => setSelectedItinerarySlug(e.target.value)}
                    className="rounded-xl border border-input bg-card px-4 py-2 text-sm text-foreground focus:outline-none"
                  >
                    <option value="">Select Package...</option>
                    {dbPackages.map((p) => (
                      <option key={p.slug} value={p.slug}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                  {selectedItinerarySlug && (
                    <button
                      onClick={handleSaveItinerary}
                      disabled={loading}
                      className="rounded-xl bg-primary text-primary-foreground px-4 py-2 text-sm font-semibold hover:opacity-90 disabled:opacity-60 transition cursor-pointer"
                    >
                      {loading ? "Saving..." : "Save Itinerary"}
                    </button>
                  )}
                </div>
              </div>

              {selectedItinerarySlug ? (
                <div className="grid lg:grid-cols-[1.2fr_1fr] gap-6">
                  {/* Days list */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        Itinerary Days ({itineraryDays.length})
                      </span>
                      <button
                        onClick={() => {
                          const newDay: ItineraryDay = {
                            package_slug: selectedItinerarySlug,
                            day_number: itineraryDays.length + 1,
                            title: `Day ${itineraryDays.length + 1}: Path Title`,
                            subtitle: "",
                            description: "",
                            meals: "",
                            stay: "",
                            distance: "",
                            altitude: "",
                            travel_time: "",
                            activities: "",
                            notes: "",
                            images: [],
                          };
                          setItineraryDays([...itineraryDays, newDay]);
                          setActiveDayIndex(itineraryDays.length);
                        }}
                        className="rounded-lg bg-muted border border-border px-3 py-1.5 text-xs font-semibold hover:bg-muted/80 flex items-center gap-1 cursor-pointer"
                      >
                        <Plus className="h-3.5 w-3.5" /> Add Day
                      </button>
                    </div>

                    {itineraryDays.length === 0 ? (
                      <div className="rounded-3xl border border-dashed border-border p-12 text-center text-muted-foreground bg-card">
                        No days scheduled for this itinerary. Click "Add Day" to
                        begin.
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {itineraryDays.map((d, index) => (
                          <div
                            key={index}
                            onClick={() => setActiveDayIndex(index)}
                            className={`rounded-2xl border p-5 bg-card flex items-center justify-between gap-4 cursor-pointer hover:border-primary/50 transition-colors ${activeDayIndex === index ? "border-primary ring-2 ring-primary/20" : "border-border shadow-card"}`}
                          >
                            <div>
                              <span className="text-xs font-bold uppercase tracking-wider text-ember">
                                Day {d.day_number}
                              </span>
                              <h4 className="font-display text-lg font-bold text-foreground mt-0.5">
                                {d.title || "No Title"}
                              </h4>
                              <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                                {d.description ||
                                  "No description written yet..."}
                              </p>
                            </div>
                            <div
                              className="flex items-center gap-1.5"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <button
                                onClick={() => moveDay(index, "up")}
                                disabled={index === 0}
                                className="rounded p-1 hover:bg-muted disabled:opacity-30 cursor-pointer"
                              >
                                <ArrowUp className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => moveDay(index, "down")}
                                disabled={index === itineraryDays.length - 1}
                                className="rounded p-1 hover:bg-muted disabled:opacity-30 cursor-pointer"
                              >
                                <ArrowDown className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => {
                                  const copy = [...itineraryDays];
                                  copy.splice(index + 1, 0, {
                                    ...d,
                                    day_number: d.day_number + 1,
                                    title: `${d.title} (Copy)`,
                                  });
                                  setItineraryDays(
                                    copy.map((day, idx) => ({
                                      ...day,
                                      day_number: idx + 1,
                                    })),
                                  );
                                }}
                                className="rounded p-1 hover:bg-muted text-primary cursor-pointer"
                                title="Duplicate Day"
                              >
                                <Copy className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => {
                                  const copy = [...itineraryDays];
                                  copy.splice(index, 1);
                                  setItineraryDays(
                                    copy.map((day, idx) => ({
                                      ...day,
                                      day_number: idx + 1,
                                    })),
                                  );
                                  setActiveDayIndex(null);
                                }}
                                className="rounded p-1 hover:bg-muted text-destructive cursor-pointer"
                                title="Delete Day"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Day Fields Detail Editor */}
                  <div>
                    {activeDayIndex !== null &&
                    itineraryDays[activeDayIndex] ? (
                      <div className="rounded-3xl border border-border bg-card p-6 shadow-card space-y-4">
                        <div className="flex justify-between items-center border-b border-border pb-3">
                          <h4 className="font-display text-lg font-bold text-foreground">
                            Edit Day {itineraryDays[activeDayIndex].day_number}{" "}
                            Details
                          </h4>
                          <button
                            onClick={() => setActiveDayIndex(null)}
                            className="rounded-full hover:bg-muted p-1 cursor-pointer"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>

                        <div>
                          <label className="text-xs font-semibold uppercase text-muted-foreground">
                            Day Title
                          </label>
                          <input
                            type="text"
                            value={itineraryDays[activeDayIndex].title}
                            onChange={(e) => {
                              const copy = [...itineraryDays];
                              copy[activeDayIndex].title = e.target.value;
                              setItineraryDays(copy);
                            }}
                            className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm"
                          />
                        </div>

                        <div>
                          <label className="text-xs font-semibold uppercase text-muted-foreground">
                            Subtitle / Path route
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. Dehradun to Leyla Camp"
                            value={itineraryDays[activeDayIndex].subtitle || ""}
                            onChange={(e) => {
                              const copy = [...itineraryDays];
                              copy[activeDayIndex].subtitle = e.target.value;
                              setItineraryDays(copy);
                            }}
                            className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-xs font-semibold uppercase text-muted-foreground">
                              Meals Included
                            </label>
                            <input
                              type="text"
                              placeholder="e.g. Breakfast, Dinner"
                              value={itineraryDays[activeDayIndex].meals || ""}
                              onChange={(e) => {
                                const copy = [...itineraryDays];
                                copy[activeDayIndex].meals = e.target.value;
                                setItineraryDays(copy);
                              }}
                              className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm"
                            />
                          </div>
                          <div>
                            <label className="text-xs font-semibold uppercase text-muted-foreground">
                              Stay Location
                            </label>
                            <input
                              type="text"
                              placeholder="e.g. Camping tents"
                              value={itineraryDays[activeDayIndex].stay || ""}
                              onChange={(e) => {
                                const copy = [...itineraryDays];
                                copy[activeDayIndex].stay = e.target.value;
                                setItineraryDays(copy);
                              }}
                              className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-3">
                          <div>
                            <label className="text-xs font-semibold uppercase text-muted-foreground">
                              Distance
                            </label>
                            <input
                              type="text"
                              placeholder="e.g. 5 km"
                              value={
                                itineraryDays[activeDayIndex].distance || ""
                              }
                              onChange={(e) => {
                                const copy = [...itineraryDays];
                                copy[activeDayIndex].distance = e.target.value;
                                setItineraryDays(copy);
                              }}
                              className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm"
                            />
                          </div>
                          <div>
                            <label className="text-xs font-semibold uppercase text-muted-foreground">
                              Altitude
                            </label>
                            <input
                              type="text"
                              placeholder="e.g. 9,500 ft"
                              value={
                                itineraryDays[activeDayIndex].altitude || ""
                              }
                              onChange={(e) => {
                                const copy = [...itineraryDays];
                                copy[activeDayIndex].altitude = e.target.value;
                                setItineraryDays(copy);
                              }}
                              className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm"
                            />
                          </div>
                          <div>
                            <label className="text-xs font-semibold uppercase text-muted-foreground">
                              Travel Time
                            </label>
                            <input
                              type="text"
                              placeholder="e.g. 4 hours"
                              value={
                                itineraryDays[activeDayIndex].travel_time || ""
                              }
                              onChange={(e) => {
                                const copy = [...itineraryDays];
                                copy[activeDayIndex].travel_time =
                                  e.target.value;
                                setItineraryDays(copy);
                              }}
                              className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="text-xs font-semibold uppercase text-muted-foreground">
                            Description / Log details
                          </label>
                          <textarea
                            value={
                              itineraryDays[activeDayIndex].description || ""
                            }
                            onChange={(e) => {
                              const copy = [...itineraryDays];
                              copy[activeDayIndex].description = e.target.value;
                              setItineraryDays(copy);
                            }}
                            className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm h-24"
                          />
                        </div>

                        <div>
                          <label className="text-xs font-semibold uppercase text-muted-foreground">
                            Important Notes
                          </label>
                          <input
                            type="text"
                            placeholder="Carry water bottles..."
                            value={itineraryDays[activeDayIndex].notes || ""}
                            onChange={(e) => {
                              const copy = [...itineraryDays];
                              copy[activeDayIndex].notes = e.target.value;
                              setItineraryDays(copy);
                            }}
                            className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm"
                          />
                        </div>

                        <div>
                          <label className="text-xs font-semibold uppercase text-muted-foreground block">
                            Day Highlights
                          </label>
                          <div className="mt-2 flex flex-wrap gap-1.5">
                            {((itineraryDays[activeDayIndex].activities || "")
                              .split(",")
                              .map((h) => h.trim())
                              .filter(Boolean)
                            ).map((hl, hlIdx) => (
                              <span
                                key={hlIdx}
                                className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary"
                              >
                                {hl}
                                <button
                                  type="button"
                                  onClick={() => {
                                    const currentHls = (itineraryDays[activeDayIndex].activities || "")
                                      .split(",")
                                      .map((h) => h.trim())
                                      .filter(Boolean);
                                    const newHl = currentHls.filter((_, idx) => idx !== hlIdx);
                                    const copy = [...itineraryDays];
                                    copy[activeDayIndex].activities = newHl.join(",");
                                    setItineraryDays(copy);
                                  }}
                                  className="ml-1 text-xs hover:text-red-500 font-bold focus:outline-none cursor-pointer"
                                >
                                  ×
                                </button>
                              </span>
                            ))}
                          </div>
                          <div className="flex gap-2 mt-2">
                            <input
                              type="text"
                              id="new-highlight-input"
                              placeholder="e.g. Temple Visit, Waterfall"
                              className="flex-1 rounded-xl border border-input bg-background px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-ring text-foreground"
                              onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                  e.preventDefault();
                                  const val = e.currentTarget.value.trim();
                                  if (val) {
                                    const currentHls = (itineraryDays[activeDayIndex].activities || "")
                                      .split(",")
                                      .map((h) => h.trim())
                                      .filter(Boolean);
                                    const copy = [...itineraryDays];
                                    copy[activeDayIndex].activities = [...currentHls, val].join(",");
                                    setItineraryDays(copy);
                                    e.currentTarget.value = "";
                                  }
                                }
                              }}
                            />
                            <button
                              type="button"
                              onClick={() => {
                                const input = document.getElementById("new-highlight-input") as HTMLInputElement;
                                const val = input?.value.trim();
                                if (val) {
                                  const currentHls = (itineraryDays[activeDayIndex].activities || "")
                                    .split(",")
                                    .map((h) => h.trim())
                                    .filter(Boolean);
                                  const copy = [...itineraryDays];
                                  copy[activeDayIndex].activities = [...currentHls, val].join(",");
                                  setItineraryDays(copy);
                                  if (input) input.value = "";
                                }
                              }}
                              className="rounded-xl bg-primary text-primary-foreground px-3 py-1.5 text-xs font-semibold hover:bg-primary/95 transition cursor-pointer"
                            >
                              Add
                            </button>
                          </div>
                        </div>

                        <div>
                          <label className="text-xs font-semibold uppercase text-muted-foreground">
                            Day Images List
                          </label>
                          <div className="flex gap-2 mt-2">
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedImageToInsert({
                                  callback: (url) => {
                                    const copy = [...itineraryDays];
                                    const imgArr =
                                      copy[activeDayIndex].images || [];
                                    copy[activeDayIndex].images = [
                                      ...imgArr,
                                      url,
                                    ];
                                    setItineraryDays(copy);
                                  },
                                });
                                setActiveTab("media");
                              }}
                              className="rounded-xl border border-border px-4 py-2 hover:bg-muted text-xs font-semibold flex items-center gap-1 cursor-pointer"
                            >
                              <ImageIcon className="h-4 w-4" /> Pick from Media
                              Library
                            </button>
                          </div>
                          {itineraryDays[activeDayIndex].images &&
                            itineraryDays[activeDayIndex].images!.length >
                              0 && (
                              <div className="flex flex-wrap gap-2 mt-3">
                                {itineraryDays[activeDayIndex].images!.map(
                                  (url, i) => (
                                    <div
                                      key={i}
                                      className="relative h-16 w-16 group rounded-lg overflow-hidden border border-border"
                                    >
                                      <img
                                        src={url}
                                        alt=""
                                        className="h-full w-full object-cover"
                                      />
                                      <button
                                        type="button"
                                        onClick={() => {
                                          const copy = [...itineraryDays];
                                          copy[activeDayIndex].images = copy[
                                            activeDayIndex
                                          ].images!.filter(
                                            (_, idx) => idx !== i,
                                          );
                                          setItineraryDays(copy);
                                        }}
                                        className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition cursor-pointer"
                                      >
                                        <Trash2 className="h-4 w-4" />
                                      </button>
                                    </div>
                                  ),
                                )}
                              </div>
                            )}
                        </div>
                      </div>
                    ) : (
                      <div className="rounded-3xl border border-border bg-card p-12 text-center text-muted-foreground">
                        Select a Day Card on the left to modify details.
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="rounded-3xl border border-border bg-card p-20 text-center text-muted-foreground">
                  Select a Trek / Trip package from the dropdown to edit visual
                  itinerary day flows.
                </div>
              )}
            </div>
          )}

          {/* ================================== PACKAGE CONTENT TAB ================================== */}
          {activeTab === "content" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center flex-wrap gap-4">
                <div>
                  <h3 className="font-display text-lg font-bold text-foreground">
                    Package Content Sections
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Edit inclusions, exclusions, things to carry, and FAQs.
                  </p>
                </div>
                <div className="flex gap-2">
                  <select
                    value={selectedContentSlug}
                    onChange={(e) => setSelectedContentSlug(e.target.value)}
                    className="rounded-xl border border-input bg-card px-4 py-2 text-sm text-foreground focus:outline-none"
                  >
                    <option value="">Select Package...</option>
                    {dbPackages.map((p) => (
                      <option key={p.slug} value={p.slug}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                  {selectedContentSlug && (
                    <button
                      onClick={handleSaveContent}
                      disabled={loading}
                      className="rounded-xl bg-primary text-primary-foreground px-4 py-2 text-sm font-semibold hover:opacity-90 disabled:opacity-60 transition cursor-pointer"
                    >
                      {loading ? "Saving..." : "Save Sections"}
                    </button>
                  )}
                </div>
              </div>

              {selectedContentSlug ? (
                <div className="grid lg:grid-cols-[1.5fr_1fr] gap-8">
                  {/* Rich Text Areas */}
                  <div className="rounded-3xl border border-border bg-card p-6 shadow-card space-y-6">
                    <div>
                      <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground font-bold">
                        Overview / Package Intro Description
                      </label>
                      <textarea
                        value={contentFields.overview || ""}
                        onChange={(e) =>
                          setContentFields({
                            ...contentFields,
                            overview: e.target.value,
                          })
                        }
                        className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm h-32"
                      />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground font-bold">
                          Fitness & Medical Requirements
                        </label>
                        <textarea
                          value={contentFields.fitness_requirements || ""}
                          onChange={(e) =>
                            setContentFields({
                              ...contentFields,
                              fitness_requirements: e.target.value,
                            })
                          }
                          className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm h-28"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground font-bold">
                          Cancellation Policy
                        </label>
                        <textarea
                          value={contentFields.cancellation_policy || ""}
                          onChange={(e) =>
                            setContentFields({
                              ...contentFields,
                              cancellation_policy: e.target.value,
                            })
                          }
                          className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm h-28"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground font-bold">
                          Know Before You Go
                        </label>
                        <textarea
                          value={contentFields.know_before_you_go || ""}
                          onChange={(e) =>
                            setContentFields({
                              ...contentFields,
                              know_before_you_go: e.target.value,
                            })
                          }
                          className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm h-28"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground font-bold">
                          Safety Instructions
                        </label>
                        <textarea
                          value={contentFields.safety_instructions || ""}
                          onChange={(e) =>
                            setContentFields({
                              ...contentFields,
                              safety_instructions: e.target.value,
                            })
                          }
                          className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm h-28"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground font-bold">
                          Emergency Contacts & Numbers
                        </label>
                        <input
                          type="text"
                          value={contentFields.emergency_contacts || ""}
                          onChange={(e) =>
                            setContentFields({
                              ...contentFields,
                              emergency_contacts: e.target.value,
                            })
                          }
                          className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground font-bold">
                          Terms & Conditions
                        </label>
                        <textarea
                          value={contentFields.terms_conditions || ""}
                          onChange={(e) =>
                            setContentFields({
                              ...contentFields,
                              terms_conditions: e.target.value,
                            })
                          }
                          className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm h-28"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Bullet list fields (Highlights, Inclusions, Exclusions, carry FAQ) */}
                  <div className="space-y-6">
                    {/* Inclusions Array */}
                    <div className="rounded-3xl border border-border bg-card p-6 shadow-card">
                      <div className="flex justify-between items-center mb-3">
                        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                          Inclusions List
                        </label>
                        <button
                          type="button"
                          onClick={() => {
                            const arr = contentFields.inclusions || [];
                            setContentFields({
                              ...contentFields,
                              inclusions: [...arr, ""],
                            });
                          }}
                          className="text-primary hover:text-primary/80 text-xs font-semibold cursor-pointer"
                        >
                          + Add Line
                        </button>
                      </div>
                      <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                        {(contentFields.inclusions || []).map((inc, i) => (
                          <div key={i} className="flex gap-2">
                            <input
                              type="text"
                              value={inc}
                              onChange={(e) => {
                                const copy = [
                                  ...(contentFields.inclusions || []),
                                ];
                                copy[i] = e.target.value;
                                setContentFields({
                                  ...contentFields,
                                  inclusions: copy,
                                });
                              }}
                              className="w-full rounded-lg border border-input bg-background px-3 py-1.5 text-xs"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                const copy = [
                                  ...(contentFields.inclusions || []),
                                ].filter((_, idx) => idx !== i);
                                setContentFields({
                                  ...contentFields,
                                  inclusions: copy,
                                });
                              }}
                              className="text-destructive hover:text-destructive/85 p-1 cursor-pointer"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Exclusions Array */}
                    <div className="rounded-3xl border border-border bg-card p-6 shadow-card">
                      <div className="flex justify-between items-center mb-3">
                        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                          Exclusions List
                        </label>
                        <button
                          type="button"
                          onClick={() => {
                            const arr = contentFields.exclusions || [];
                            setContentFields({
                              ...contentFields,
                              exclusions: [...arr, ""],
                            });
                          }}
                          className="text-primary hover:text-primary/80 text-xs font-semibold cursor-pointer"
                        >
                          + Add Line
                        </button>
                      </div>
                      <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                        {(contentFields.exclusions || []).map((exc, i) => (
                          <div key={i} className="flex gap-2">
                            <input
                              type="text"
                              value={exc}
                              onChange={(e) => {
                                const copy = [
                                  ...(contentFields.exclusions || []),
                                ];
                                copy[i] = e.target.value;
                                setContentFields({
                                  ...contentFields,
                                  exclusions: copy,
                                });
                              }}
                              className="w-full rounded-lg border border-input bg-background px-3 py-1.5 text-xs"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                const copy = [
                                  ...(contentFields.exclusions || []),
                                ].filter((_, idx) => idx !== i);
                                setContentFields({
                                  ...contentFields,
                                  exclusions: copy,
                                });
                              }}
                              className="text-destructive hover:text-destructive/85 p-1 cursor-pointer"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* FAQs JSON Array */}
                    <div className="rounded-3xl border border-border bg-card p-6 shadow-card">
                      <div className="flex justify-between items-center mb-3">
                        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                          FAQs Q&A List
                        </label>
                        <button
                          type="button"
                          onClick={() => {
                            const arr = (contentFields.faqs as FAQItem[]) || [];
                            setContentFields({
                              ...contentFields,
                              faqs: [...arr, { q: "", a: "" }],
                            });
                          }}
                          className="text-primary hover:text-primary/80 text-xs font-semibold cursor-pointer"
                        >
                          + Add FAQ
                        </button>
                      </div>
                      <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
                        {((contentFields.faqs as FAQItem[]) || []).map(
                          (faq, i) => (
                            <div
                              key={i}
                              className="border border-border rounded-xl p-3 bg-muted/20 relative space-y-2"
                            >
                              <button
                                type="button"
                                onClick={() => {
                                  const copy = [
                                    ...((contentFields.faqs as FAQItem[]) ||
                                      []),
                                  ].filter((_, idx) => idx !== i);
                                  setContentFields({
                                    ...contentFields,
                                    faqs: copy,
                                  });
                                }}
                                className="absolute top-2 right-2 text-destructive hover:text-destructive/85 cursor-pointer"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                              <input
                                type="text"
                                placeholder="Question?"
                                value={faq.q || ""}
                                onChange={(e) => {
                                  const copy = [
                                    ...((contentFields.faqs as FAQItem[]) ||
                                      []),
                                  ];
                                  copy[i].q = e.target.value;
                                  setContentFields({
                                    ...contentFields,
                                    faqs: copy,
                                  });
                                }}
                                className="w-[90%] rounded bg-background border border-input px-2 py-1 text-xs"
                              />
                              <textarea
                                placeholder="Answer details..."
                                value={faq.a || ""}
                                onChange={(e) => {
                                  const copy = [
                                    ...((contentFields.faqs as FAQItem[]) ||
                                      []),
                                  ];
                                  copy[i].a = e.target.value;
                                  setContentFields({
                                    ...contentFields,
                                    faqs: copy,
                                  });
                                }}
                                className="w-full rounded bg-background border border-input px-2 py-1 text-xs h-12"
                              />
                            </div>
                          ),
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="rounded-3xl border border-border bg-card p-20 text-center text-muted-foreground">
                  Select a Trek / Trip package to build content sections.
                </div>
              )}
            </div>
          )}

          {/* ================================== MEDIA LIBRARY TAB ================================== */}
          {activeTab === "media" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center flex-wrap gap-4">
                <div>
                  <h3 className="font-display text-lg font-bold text-foreground">
                    Media Asset Store
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Drag-and-drop assets, compress dynamically, or link featured
                    assets.
                  </p>
                </div>
                {selectedImageToInsert && (
                  <div className="bg-amber-100 text-amber-800 rounded-xl px-4 py-2 text-xs font-semibold flex items-center gap-2">
                    <span>Click on any image below to insert it!</span>
                    <button
                      onClick={() => setSelectedImageToInsert(null)}
                      className="bg-amber-200 text-amber-900 rounded-full p-0.5"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                )}
              </div>

              {/* Upload widget */}
              <div className="grid md:grid-cols-[1fr_2fr] gap-6">
                <div className="rounded-3xl border border-border bg-card p-6 shadow-card space-y-4">
                  <h4 className="font-display text-md font-bold">
                    Upload Options
                  </h4>

                  <div>
                    <label className="text-xs font-semibold uppercase text-muted-foreground">
                      Target Folder
                    </label>
                    <select
                      value={mediaUploadFolder}
                      onChange={(e) => setMediaUploadFolder(e.target.value)}
                      className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-2 text-sm text-foreground focus:outline-none"
                    >
                      <option value="general">general</option>
                      <option value="packages">packages</option>
                      <option value="gallery">gallery</option>
                      <option value="blog">blog</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-2 border-t border-border pt-4">
                    <div>
                      <label className="text-[10px] font-bold uppercase text-muted-foreground flex items-center gap-1">
                        <RotateCw className="h-3 w-3" /> Rotate
                      </label>
                      <select
                        value={imageProcessConfig.rotation}
                        onChange={(e) =>
                          setImageProcessConfig({
                            ...imageProcessConfig,
                            rotation: parseInt(e.target.value) || 0,
                          })
                        }
                        className="mt-1 w-full rounded-lg border border-input bg-background px-2 py-1 text-xs text-foreground focus:outline-none"
                      >
                        <option value="0">0°</option>
                        <option value="90">90°</option>
                        <option value="180">180°</option>
                        <option value="270">270°</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[10px] font-bold uppercase text-muted-foreground">
                        Quality
                      </label>
                      <select
                        value={imageProcessConfig.quality}
                        onChange={(e) =>
                          setImageProcessConfig({
                            ...imageProcessConfig,
                            quality: parseFloat(e.target.value) || 0.8,
                          })
                        }
                        className="mt-1 w-full rounded-lg border border-input bg-background px-2 py-1 text-xs text-foreground focus:outline-none"
                      >
                        <option value="0.5">Low (50%)</option>
                        <option value="0.8">Medium (80%)</option>
                        <option value="0.95">High (95%)</option>
                      </select>
                    </div>
                  </div>

                  <div className="border-2 border-dashed border-border rounded-2xl p-6 text-center hover:border-primary/50 transition cursor-pointer relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file)
                          processAndUploadImage(file, mediaUploadFolder);
                      }}
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    />
                    <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                    <span className="text-xs text-muted-foreground block font-semibold">
                      Drag files here or Browse
                    </span>
                    <span className="text-[10px] text-muted-foreground/60 block mt-1">
                      Images up to 5MB
                    </span>
                  </div>
                </div>

                {/* Media gallery grid */}
                <div className="rounded-3xl border border-border bg-card p-6 shadow-card">
                  <div className="flex justify-between items-center mb-6 flex-wrap gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      Assets Grid ({filteredMedia.length})
                    </span>
                    <div className="flex gap-1">
                      {["all", "general", "packages", "gallery", "blog"].map(
                        (f) => (
                          <button
                            key={f}
                            onClick={() => setMediaFolderFilter(f)}
                            className={`capitalize rounded-lg px-2.5 py-1 text-[11px] font-semibold border ${mediaFolderFilter === f ? "bg-primary text-primary-foreground border-transparent" : "bg-background text-muted-foreground border-border hover:bg-muted"}`}
                          >
                            {f}
                          </button>
                        ),
                      )}
                    </div>
                  </div>

                  {filteredMedia.length === 0 ? (
                    <div className="py-20 text-center text-muted-foreground text-sm">
                      No media files uploaded in this folder yet.
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 max-h-[480px] overflow-y-auto pr-1">
                      {filteredMedia.map((item) => (
                        <div
                          key={item.id}
                          onClick={() => {
                            if (selectedImageToInsert) {
                              selectedImageToInsert.callback(item.url);
                              setSelectedImageToInsert(null);
                              // Swap back to editing tabs
                              setActiveTab(
                                editingPackage ? "packages" : "itinerary",
                              );
                              toast.success("Image URL bound!");
                            }
                          }}
                          className={`relative aspect-square rounded-2xl overflow-hidden border group transition shadow-card cursor-pointer ${selectedImageToInsert ? "border-amber-400 hover:ring-2 hover:ring-amber-400" : "border-border hover:border-primary"}`}
                        >
                          <img
                            src={item.url}
                            alt={item.filename}
                            className="h-full w-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex flex-col justify-end p-2.5 transition text-white text-left">
                            <span className="text-[10px] font-bold block truncate">
                              {item.filename}
                            </span>
                            <span className="text-[9px] text-white/70 block uppercase tracking-wider mt-0.5">
                              Folder: {item.folder}
                            </span>
                            <div
                              className="flex gap-1.5 mt-2"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <button
                                onClick={() => {
                                  navigator.clipboard.writeText(item.url);
                                  toast.success("URL copied to clipboard!");
                                }}
                                className="rounded bg-white/20 p-1 hover:bg-white/30 text-white cursor-pointer"
                                title="Copy public URL"
                              >
                                <Copy className="h-3 w-3" />
                              </button>
                              <button
                                onClick={() => handleDeleteMedia(item)}
                                className="rounded bg-red-600/30 p-1 hover:bg-red-600/50 text-red-100 cursor-pointer"
                                title="Delete Asset"
                              >
                                <Trash2 className="h-3 w-3" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ================================== ANALYTICS TAB ================================== */}
          {activeTab === "analytics" && (
            <div className="space-y-6">
              <h3 className="font-display text-lg font-bold text-foreground">
                Executive Analytics Dashboard
              </h3>

              {(() => {
                const confirmed = bookings.filter(b => b.status === "confirmed" || b.status === "completed");
                const totalRevenue = confirmed.reduce((acc, b) => {
                  const val = Number(b.total_price);
                  if (!isNaN(val) && val > 0) return acc + val;
                  // fallback to base price
                  const basePkg = dbPackages.find(p => p.slug === b.package_slug);
                  return acc + ((basePkg?.price || 5999) * (b.travelers || 1));
                }, 0);

                const occupancyBooked = departures.reduce((acc, d) => acc + (d.booked_seats || 0), 0);
                const occupancyMax = departures.reduce((acc, d) => acc + (d.max_seats || 15), 0);
                const occupancyRate = occupancyMax > 0 ? ((occupancyBooked / occupancyMax) * 100).toFixed(1) : "0";

                const conversionRate = leads.length > 0 ? ((bookings.length / leads.length) * 100).toFixed(1) : "0";

                // Top packages analytics
                const pkgStats = dbPackages.map(pkg => {
                  const pkgBookings = bookings.filter(b => b.package_slug === pkg.slug);
                  const pkgRevenue = pkgBookings.filter(b => b.status === "confirmed" || b.status === "completed").reduce((acc, b) => {
                    const val = Number(b.total_price);
                    return acc + (isNaN(val) ? (pkg.price * (b.travelers || 1)) : val);
                  }, 0);
                  const travelers = pkgBookings.reduce((acc, b) => acc + (b.travelers || 1), 0);
                  return {
                    name: pkg.name,
                    slug: pkg.slug,
                    bookingsCount: pkgBookings.length,
                    travelers,
                    revenue: pkgRevenue,
                  };
                }).sort((a, b) => b.revenue - a.revenue);

                return (
                  <>
                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                      <div className="rounded-2xl p-6 border bg-card border-border shadow-card">
                        <div className="text-xs uppercase tracking-wider text-muted-foreground">Total Revenue</div>
                        <div className="mt-3 font-display text-3xl font-bold text-primary">₹{totalRevenue.toLocaleString("en-IN")}</div>
                        <div className="text-[10px] text-muted-foreground mt-1">Confirmed & Completed Bookings</div>
                      </div>
                      <div className="rounded-2xl p-6 border bg-card border-border shadow-card">
                        <div className="text-xs uppercase tracking-wider text-muted-foreground">Occupancy Rate</div>
                        <div className="mt-3 font-display text-3xl font-bold text-foreground">{occupancyRate}%</div>
                        <div className="text-[10px] text-muted-foreground mt-1">{occupancyBooked} / {occupancyMax} seats filled</div>
                      </div>
                      <div className="rounded-2xl p-6 border bg-card border-border shadow-card">
                        <div className="text-xs uppercase tracking-wider text-muted-foreground">Lead Conversion</div>
                        <div className="mt-3 font-display text-3xl font-bold text-foreground">{conversionRate}%</div>
                        <div className="text-[10px] text-muted-foreground mt-1">{bookings.length} bookings from {leads.length} leads</div>
                      </div>
                      <div className="rounded-2xl p-6 border bg-[var(--gradient-ember)] text-ember-foreground border-transparent shadow-glow">
                        <div className="text-xs uppercase tracking-wider text-ember-foreground/80">Total bookings</div>
                        <div className="mt-3 font-display text-3xl font-bold text-ember-foreground">{bookings.length}</div>
                        <div className="text-[10px] text-ember-foreground/75 mt-1">Bookings registered globally</div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 mt-6">
                      {/* Top Selling Treks/Trips list */}
                      <div className="md:col-span-2 rounded-3xl border border-border bg-card shadow-card p-6 text-foreground space-y-4">
                        <h4 className="font-display text-md font-bold uppercase tracking-wider text-primary">
                          Top Adventures Performance
                        </h4>
                        <div className="overflow-x-auto">
                          <table className="w-full text-left text-xs">
                            <thead>
                              <tr className="border-b border-border text-muted-foreground font-semibold">
                                <th className="py-2">Trek / Trip Name</th>
                                <th className="py-2 text-center">Bookings</th>
                                <th className="py-2 text-center">Travelers</th>
                                <th className="py-2 text-right">Revenue Generated</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                              {pkgStats.slice(0, 5).map(stat => (
                                <tr key={stat.slug} className="hover:bg-muted/10">
                                  <td className="py-3 font-semibold text-foreground">{stat.name}</td>
                                  <td className="py-3 text-center">{stat.bookingsCount}</td>
                                  <td className="py-3 text-center">{stat.travelers}</td>
                                  <td className="py-3 text-right font-bold text-primary">₹{stat.revenue.toLocaleString("en-IN")}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>

                      {/* Revenue breakdown progress widgets */}
                      <div className="rounded-3xl border border-border bg-card shadow-card p-6 text-foreground space-y-4">
                        <h4 className="font-display text-md font-bold uppercase tracking-wider text-primary">
                          Revenue Distribution
                        </h4>
                        <div className="space-y-4 pt-2">
                          {pkgStats.slice(0, 4).map(stat => {
                            const pct = totalRevenue > 0 ? Math.round((stat.revenue / totalRevenue) * 100) : 0;
                            return (
                              <div key={stat.slug} className="space-y-1">
                                <div className="flex justify-between text-xs font-semibold">
                                  <span className="truncate w-36 text-muted-foreground">{stat.name}</span>
                                  <span>{pct}%</span>
                                </div>
                                <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden">
                                  <div
                                    className="bg-primary h-1.5 rounded-full"
                                    style={{ width: `${pct}%` }}
                                  />
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </>
                );
              })()}
            </div>
          )}

          {/* ================================== AUDIT LOGS TAB ================================== */}
          {activeTab === "audit" && (
            <div className="space-y-6">
              <h3 className="font-display text-lg font-bold text-foreground">
                Security Audit Log
              </h3>
              <p className="text-xs text-muted-foreground font-semibold">
                Trace operations, configuration saves, booking adjustments, and staff actions.
              </p>

              <div className="rounded-3xl border border-border bg-card shadow-card overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-muted text-muted-foreground text-xs uppercase font-semibold">
                      <tr>
                        <th className="px-6 py-4">Action</th>
                        <th className="px-6 py-4">Target Type</th>
                        <th className="px-6 py-4">Target ID</th>
                        <th className="px-6 py-4">Timestamp</th>
                        <th className="px-6 py-4">Details</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border text-foreground text-xs">
                      {auditLogs.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="px-6 py-10 text-center text-muted-foreground">
                            No logs registered yet.
                          </td>
                        </tr>
                      ) : (
                        auditLogs.map((log) => (
                          <tr key={log.id} className="hover:bg-muted/30 transition">
                            <td className="px-6 py-4 font-semibold text-primary capitalize">
                              {log.action.replace(/_/g, " ")}
                            </td>
                            <td className="px-6 py-4 font-mono text-muted-foreground">
                              {log.target_type}
                            </td>
                            <td className="px-6 py-4 font-mono text-muted-foreground">
                              {log.target_id || "-"}
                            </td>
                            <td className="px-6 py-4 text-muted-foreground">
                              {new Date(log.created_at).toLocaleString()}
                            </td>
                            <td className="px-6 py-4 max-w-xs truncate" title={JSON.stringify(log.details)}>
                              <code className="text-[10px] bg-muted px-1.5 py-0.5 rounded">{JSON.stringify(log.details)}</code>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ================================== RBAC CONFIG TAB ================================== */}
          {activeTab === "rbac" && (
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Assign roles panel */}
                <div className="rounded-3xl border border-border bg-card p-6 shadow-card space-y-4">
                  <h3 className="font-display text-lg font-bold text-foreground">
                    User Staff Roles
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Assign custom administrative roles to Supabase user IDs.
                  </p>

                  <form onSubmit={handleAddRoleMapping} className="flex gap-2">
                    <input
                      type="text"
                      required
                      placeholder="Paste User UUID..."
                      value={newRoleMapping.user_id}
                      onChange={(e) =>
                        setNewRoleMapping({
                          ...newRoleMapping,
                          user_id: e.target.value,
                        })
                      }
                      className="w-full rounded-xl border border-input bg-background px-3 py-2 text-xs text-foreground focus:outline-none"
                    />
                    <select
                      value={newRoleMapping.role}
                      onChange={(e) =>
                        setNewRoleMapping({
                          ...newRoleMapping,
                          role: e.target.value,
                        })
                      }
                      className="rounded-xl border border-input bg-background px-2 py-2 text-xs text-foreground"
                    >
                      <option value="super_admin">Super Admin</option>
                      <option value="admin">Admin</option>
                      <option value="manager">Manager</option>
                      <option value="guide">Guide</option>
                      <option value="content_editor">Content Editor</option>
                      <option value="read_only">Read Only</option>
                    </select>
                    <button
                      type="submit"
                      className="rounded-xl bg-primary text-primary-foreground px-4 py-2 text-xs font-semibold hover:opacity-90 transition cursor-pointer"
                    >
                      Add
                    </button>
                  </form>

                  <div className="overflow-y-auto max-h-72 border border-border rounded-2xl pr-1 divide-y divide-border">
                    {userRoles.map((ur) => (
                      <div
                        key={ur.id}
                        className="flex items-center justify-between p-3 text-xs bg-muted/10"
                      >
                        <div>
                          <div
                            className="font-semibold truncate w-48 text-muted-foreground"
                            title={ur.user_id}
                          >
                            {ur.user_id}
                          </div>
                          <span className="rounded bg-primary/10 text-primary px-1.5 py-0.5 text-[10px] uppercase font-bold mt-1 inline-block">
                            {ur.role}
                          </span>
                        </div>
                        <button
                          onClick={() => handleDeleteRoleMapping(ur.id)}
                          className="text-destructive hover:bg-destructive/10 p-1 rounded cursor-pointer"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Configurable permission grid matrix */}
                <div className="rounded-3xl border border-border bg-card p-6 shadow-card space-y-4">
                  <h3 className="font-display text-lg font-bold text-foreground">
                    Role Permissions Matrix
                  </h3>
                  <p className="text-xs text-muted-foreground font-semibold">
                    Define custom permissions for each security group.
                  </p>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="py-2">Permission</th>
                          <th className="py-2 text-center">Super Admin</th>
                          <th className="py-2 text-center">Admin</th>
                          <th className="py-2 text-center">Manager</th>
                          <th className="py-2 text-center">Editor</th>
                          <th className="py-2 text-center">Guide</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        {allPermissionsList.map((perm) => (
                          <tr key={perm} className="hover:bg-muted/10">
                            <td className="py-3 font-semibold text-muted-foreground capitalize">
                              {perm.replace(/_/g, " ")}
                            </td>
                            {/* Checkbox triggers for each role type */}
                            {[
                              "super_admin",
                              "admin",
                              "manager",
                              "content_editor",
                              "guide",
                            ].map((role) => {
                              const checked = rolePermissions.some(
                                (rp) =>
                                  rp.role === role && rp.permission === perm,
                              );
                              return (
                                <td key={role} className="py-3 text-center">
                                  <button
                                    type="button"
                                    onClick={() =>
                                      handleTogglePermission(role, perm)
                                    }
                                    className="text-primary hover:scale-110 transition cursor-pointer"
                                  >
                                    {checked ? (
                                      <CheckSquare className="h-4.5 w-4.5 fill-current" />
                                    ) : (
                                      <Square className="h-4.5 w-4.5" />
                                    )}
                                  </button>
                                </td>
                              );
                            })}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}
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
          className="mt-5 w-full rounded-xl bg-[var(--gradient-ember)] text-ember-foreground py-3 text-sm font-semibold shadow-glow disabled:opacity-60 inline-flex items-center justify-center gap-2 cursor-pointer"
        >
          {busy && <Loader2 className="h-4 w-4 animate-spin" />}
          {mode === "signin" ? "Sign in" : "Create account"}
        </button>
        <button
          type="button"
          onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
          className="mt-4 w-full text-xs text-white/70 hover:text-white cursor-pointer"
        >
          {mode === "signin"
            ? "Need an account? Sign up"
            : "Have an account? Sign in"}
        </button>
      </form>
    </section>
  );
}
