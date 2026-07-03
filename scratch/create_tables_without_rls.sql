-- =========================================================================
-- CREATE ALL CMS & CRM TABLES WITHOUT RLS RESTRICTIONS (FAIL-SAFE SCRIPT)
-- Run this in your Supabase SQL Editor.
-- This creates all tables and columns, seeds data, and disables RLS
-- to completely bypass any enum or policy compilation errors.
-- =========================================================================

-- 1. Create packages table
CREATE TABLE IF NOT EXISTS public.packages (
  slug text PRIMARY KEY,
  name text NOT NULL,
  category text NOT NULL CHECK (category IN ('trek', 'trip')),
  sub_category text,
  region text,
  location text,
  state text DEFAULT 'Uttarakhand',
  country text DEFAULT 'India',
  price numeric NOT NULL CHECK (price >= 0),
  discount_price numeric CHECK (discount_price >= 0),
  offer_badge text,
  offer_start_date date,
  offer_end_date date,
  duration text NOT NULL,
  difficulty text,
  altitude text,
  distance text,
  temperature text,
  best_season text,
  pickup_point text,
  drop_point text,
  meeting_point text,
  google_maps text,
  group_size text DEFAULT '14–15',
  minimum_age integer,
  maximum_age integer,
  package_code text,
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  sort_order integer NOT NULL DEFAULT 0,
  featured boolean NOT NULL DEFAULT false,
  trending boolean NOT NULL DEFAULT false,
  popular boolean NOT NULL DEFAULT false,
  new_arrival boolean NOT NULL DEFAULT false,
  visibility text NOT NULL DEFAULT 'visible' CHECK (visibility IN ('visible', 'hidden')),
  image text,
  images text[],
  overview text,
  highlights text[],
  inclusions text[],
  exclusions text[],
  things_to_carry text[],
  fitness_requirements text,
  cancellation_policy text,
  terms_conditions text,
  know_before_you_go text,
  safety_instructions text,
  emergency_contacts text,
  medical_requirements text,
  faqs jsonb DEFAULT '[]'::jsonb,
  tagline text,
  meta_title text,
  meta_description text,
  og_image text,
  canonical_url text,
  updated_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.packages DISABLE ROW LEVEL SECURITY;

-- 2. Create package_itineraries table
CREATE TABLE IF NOT EXISTS public.package_itineraries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  package_slug text NOT NULL REFERENCES public.packages(slug) ON DELETE CASCADE,
  day_number integer NOT NULL CHECK (day_number > 0),
  title text NOT NULL,
  subtitle text,
  description text,
  meals text,
  stay text,
  distance text,
  altitude text,
  travel_time text,
  activities text,
  notes text,
  images text[],
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (package_slug, day_number)
);
ALTER TABLE public.package_itineraries DISABLE ROW LEVEL SECURITY;

-- 3. Create media_library table
CREATE TABLE IF NOT EXISTS public.media_library (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  filename text NOT NULL,
  url text NOT NULL,
  size_bytes bigint,
  content_type text,
  folder text NOT NULL DEFAULT 'general',
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.media_library DISABLE ROW LEVEL SECURITY;

-- 4. Create customers table
CREATE TABLE IF NOT EXISTS public.customers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  phone text,
  emergency_contact text,
  address text,
  government_id text,
  medical_information text,
  notes text,
  internal_notes text,
  tags text[] DEFAULT '{}'::text[],
  vip boolean NOT NULL DEFAULT false,
  blacklisted boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.customers DISABLE ROW LEVEL SECURITY;

-- 5. Create leads table
CREATE TABLE IF NOT EXISTS public.leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  phone text,
  email text,
  message text,
  interested_package text,
  lead_source text,
  assigned_staff text,
  lead_status text NOT NULL DEFAULT 'new' CHECK (lead_status IN ('new', 'contacted', 'interested', 'converted', 'lost')),
  reminder_date date,
  internal_notes text,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.leads DISABLE ROW LEVEL SECURITY;

-- 6. Create settings table
CREATE TABLE IF NOT EXISTS public.settings (
  key text PRIMARY KEY,
  value jsonb NOT NULL,
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.settings DISABLE ROW LEVEL SECURITY;

-- 7. Create posts table (blogs)
CREATE TABLE IF NOT EXISTS public.posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  content text NOT NULL,
  summary text,
  featured_image text,
  categories text[] DEFAULT '{}'::text[],
  tags text[] DEFAULT '{}'::text[],
  author_name text,
  reading_time text,
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'scheduled')),
  publish_date timestamptz NOT NULL DEFAULT now(),
  featured boolean NOT NULL DEFAULT false,
  meta_title text,
  meta_description text,
  canonical_url text,
  og_image text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.posts DISABLE ROW LEVEL SECURITY;

-- 8. Create coupons table
CREATE TABLE IF NOT EXISTS public.coupons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text UNIQUE NOT NULL,
  discount_type text NOT NULL CHECK (discount_type IN ('percentage', 'flat')),
  discount_value numeric NOT NULL CHECK (discount_value > 0),
  minimum_amount numeric DEFAULT 0 CHECK (minimum_amount >= 0),
  min_booking_amount numeric DEFAULT 0,
  maximum_discount numeric CHECK (maximum_discount >= 0),
  usage_limit integer CHECK (usage_limit > 0),
  max_uses integer,
  usage_count integer NOT NULL DEFAULT 0 CHECK (usage_count >= 0),
  used_count integer DEFAULT 0,
  expiry_date date,
  applicable_packages text[],
  is_enabled boolean NOT NULL DEFAULT true,
  status text DEFAULT 'active',
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.coupons DISABLE ROW LEVEL SECURITY;

-- 9. Create reviews table
CREATE TABLE IF NOT EXISTS public.reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  package_slug text NOT NULL REFERENCES public.packages(slug) ON DELETE CASCADE,
  user_name text NOT NULL,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment text,
  images text[],
  videos text[],
  reply text,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  featured boolean NOT NULL DEFAULT false,
  verified boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.reviews DISABLE ROW LEVEL SECURITY;

-- 10. Create audit_logs table
CREATE TABLE IF NOT EXISTS public.audit_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid,
  action text NOT NULL,
  target_type text NOT NULL,
  target_id text,
  details jsonb DEFAULT '{}'::jsonb,
  ip_address text,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.audit_logs DISABLE ROW LEVEL SECURITY;

-- 11. Create package_gallery table
CREATE TABLE IF NOT EXISTS public.package_gallery (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  package_slug text NOT NULL REFERENCES public.packages(slug) ON DELETE CASCADE,
  media_id uuid NOT NULL REFERENCES public.media_library(id) ON DELETE CASCADE,
  sort_order integer NOT NULL DEFAULT 0,
  alt_text text,
  caption text,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (package_slug, media_id)
);
ALTER TABLE public.package_gallery DISABLE ROW LEVEL SECURITY;

-- 12. Extend bookings table columns
ALTER TABLE public.bookings 
  ADD COLUMN IF NOT EXISTS guide_name text,
  ADD COLUMN IF NOT EXISTS coordinator_name text,
  ADD COLUMN IF NOT EXISTS vehicle_info text,
  ADD COLUMN IF NOT EXISTS internal_notes text,
  ADD COLUMN IF NOT EXISTS payment_status text DEFAULT 'pending' CHECK (payment_status IN ('pending', 'completed', 'refunded')),
  ADD COLUMN IF NOT EXISTS updated_at timestamptz DEFAULT now();

-- 13. Extend departures table columns
ALTER TABLE public.departures ADD COLUMN IF NOT EXISTS unlimited_seats boolean NOT NULL DEFAULT false;
ALTER TABLE public.departures ADD COLUMN IF NOT EXISTS waitlist_enabled boolean NOT NULL DEFAULT false;
ALTER TABLE public.departures ADD COLUMN IF NOT EXISTS booking_cutoff_days integer NOT NULL DEFAULT 2;
ALTER TABLE public.departures ADD COLUMN IF NOT EXISTS guide_name text;
ALTER TABLE public.departures ADD COLUMN IF NOT EXISTS guide_phone text;
ALTER TABLE public.departures ADD COLUMN IF NOT EXISTS meeting_time text;
ALTER TABLE public.departures ADD COLUMN IF NOT EXISTS meeting_location text;
ALTER TABLE public.departures ADD COLUMN IF NOT EXISTS internal_notes text;
ALTER TABLE public.departures ADD COLUMN IF NOT EXISTS visibility text NOT NULL DEFAULT 'visible' CHECK (visibility IN ('visible', 'hidden'));

-- 14. Seed packages data
INSERT INTO public.packages (
  slug, name, category, duration, price, difficulty, highlights, tagline, status, visibility, sort_order
) VALUES
  (
    'moila-top',
    'Moila Top Trek',
    'trek',
    '3 Days / 2 Nights',
    5999,
    'Easy – Moderate',
    ARRAY['Dense forest trails', 'Mountain meadows', 'Bonfire experience', 'Camping under the stars', 'Authentic village stay', 'Local Garhwali food'],
    'Forest trails, alpine meadows and bonfire nights under a sky full of stars.',
    'published',
    'visible',
    1
  ),
  (
    'kedarkantha',
    'Kedarkantha Trek',
    'trek',
    '4 Days / 3 Nights',
    8999,
    'Moderate',
    ARRAY['Snow trekking', 'Sunrise summit experience', 'Alpine camping', 'Photography paradise', 'Sweeping Himalayan views'],
    'Summit India''s most iconic winter peak with a 360° Himalayan panorama.',
    'published',
    'visible',
    2
  ),
  (
    'nag-tibba',
    'Nag Tibba Trek',
    'trek',
    '3 Days / 2 Nights',
    4999,
    'Easy',
    ARRAY['Weekend friendly', 'Lush forest trails', 'Golden sunrise views', 'Camping experience'],
    'The perfect weekend escape with forests, ridgelines and a glowing sunrise.',
    'published',
    'visible',
    3
  ),
  (
    'yulla-kanda',
    'Yulla Kanda Trek',
    'trek',
    '4 Days / 3 Nights',
    7499,
    'Moderate',
    ARRAY['Highest Krishna Temple', 'Remote Himalayan route', 'Camping under the peaks', 'Rich local culture', 'Scenic mountain views'],
    'A spiritual ridge walk to the highest Krishna temple in the Himalayas.',
    'published',
    'visible',
    4
  ),
  (
    'hanol-cultural',
    'Hanol Cultural Trip',
    'trip',
    '2 Days / 1 Night',
    3999,
    'Easy',
    ARRAY['Hanol village experience', 'Traditional Garhwali culture', 'Home-cooked local food', 'Riverside landscapes', 'Slow, intentional travel'],
    'Live like a local in the heritage village of Hanol along the Tons river.',
    'published',
    'visible',
    5
  ),
  (
    'mahasu-devta-yatra',
    'Mahasu Devta Yatra',
    'trip',
    '3 Days / 2 Nights',
    5499,
    'Easy',
    ARRAY['Religious & heritage tourism', 'Visit to Mahasu Devta Temple', 'Authentic village stays', 'Scenic mountain drives', 'Cultural local experiences'],
    'A soulful circuit through Uttarakhand''s sacred temples and timeless villages.',
    'published',
    'visible',
    6
  )
ON CONFLICT (slug) DO NOTHING;

-- 15. Seed default settings
INSERT INTO public.settings (key, value) VALUES
  ('company_settings', '{
    "company_name": "Explore Hills",
    "phone": "+91 63977 10701",
    "email": "contact@explorehills.in",
    "whatsapp": "+91 63977 10701",
    "logo": "",
    "favicon": "",
    "address": "Dehradun, Uttarakhand",
    "google_maps": "",
    "social_instagram": "https://instagram.com/atul__nautiyal",
    "social_facebook": "",
    "gst_details": "",
    "bank_details": "",
    "invoice_prefix": "EH-",
    "founder_name": "Atul Nautiyal",
    "founder_title": "Replies to every traveler personally.",
    "company_description": "Authentic Himalayan adventures, small-group experiences and hidden destinations of Uttarakhand.",
    "footer_tagline": "Travel responsibly. Leave only footprints."
  }'::jsonb),
  ('homepage', '{
    "hero_headline": "Born in the hills, built for travelers",
    "hero_subheading": "Explore Hills is an Uttarakhand-based travel startup on a mission to share the real Himalayas.",
    "hero_cta_text": "Book Your Adventure",
    "hero_image": "",
    "announcement_bar_text": "🍂 Autumn Season Treks are Open! Small group batches filling fast.",
    "announcement_bar_enabled": true,
    "stats": [
      {"value": "2,500+", "label": "Happy Travelers"},
      {"value": "120+", "label": "Trips Completed"},
      {"value": "14–15", "label": "Small Group Size"},
      {"value": "4.9★", "label": "Average Rating"}
    ],
    "why_us": [
      {"title": "Couple-friendly", "text": "Private moments, quiet stays and itineraries designed for two."},
      {"title": "Small Groups", "text": "Just 14–15 travelers per batch so every voice is heard."},
      {"title": "Bonfire Nights", "text": "Stories, music and warmth under a sky full of Himalayan stars."},
      {"title": "Local Food Included", "text": "Authentic Garhwali meals cooked by our village hosts."},
      {"title": "Hidden Destinations", "text": "Off-the-grid valleys and villages most travelers never see."},
      {"title": "Safe & Comfortable", "text": "Vetted stays, certified guides and full transportation."}
    ],
    "categories": [
      {"title": "Treks", "to": "/treks"},
      {"title": "Cultural Trips", "to": "/trips"},
      {"title": "Camping", "to": "/gallery"},
      {"title": "Village Stays", "to": "/gallery"}
    ],
    "sections": [
      {"id": "hero", "enabled": true},
      {"id": "stats", "enabled": true},
      {"id": "categories", "enabled": true},
      {"id": "why_us", "enabled": true},
      {"id": "departures", "enabled": true},
      {"id": "testimonials", "enabled": true},
      {"id": "faqs", "enabled": true}
    ]
  }'::jsonb),
  ('static_pages', '{
    "about": {
      "title": "Born in the hills, built for travelers",
      "subtitle": "Explore Hills is a young Uttarakhand-based travel startup on a mission to share the real Himalayas with the world — one small group at a time.",
      "mission": "To open Uttarakhand''s hidden corners to travelers in a way that uplifts local communities, protects fragile ecosystems and leaves every guest with a story worth telling.",
      "vision": "To become India''s most trusted small-group Himalayan travel brand — a name travelers, villages and the mountains themselves can rely on."
    },
    "privacy": {
      "title": "Privacy Policy",
      "content": "At Explore Hills, we take your privacy seriously. This privacy policy describes how we collect, use, and protect your personal information when you book a trek, subscribe to our newsletter, or fill out a contact lead form."
    },
    "terms": {
      "title": "Terms and Conditions",
      "content": "Please read these terms and conditions carefully before booking treks with Explore Hills."
    },
    "careers": {
      "title": "Careers at Explore Hills",
      "content": "We are always looking for passionate mountain guides, content editors, coordinators, and local hosts who want to share the beauty of Uttarakhand with the world."
    },
    "treks": {
      "title": "Walk into the wild Himalayas",
      "subtitle": "From beginner-friendly weekend climbs to soulful summit pushes — every trek is led by experienced guides and built around small groups."
    },
    "trips": {
      "title": "Soulful journeys through timeless villages",
      "subtitle": "Slow travel, village hospitality and the rituals that shape Uttarakhand — designed for travelers who want to feel, not just see."
    },
    "gallery": {
      "title": "Frames from the trail",
      "subtitle": "Mountains, villages, bonfires and the people who make our trips unforgettable."
    },
    "contact": {
      "title": "Let''s plan your Himalayan story",
      "subtitle": "Call, message or write — we usually reply within a few hours. Atul personally answers every WhatsApp."
    }
  }'::jsonb)
ON CONFLICT (key) DO NOTHING;

-- 16. Force Rebuild PostgREST Schema Cache
NOTIFY pgrst, 'reload schema';
