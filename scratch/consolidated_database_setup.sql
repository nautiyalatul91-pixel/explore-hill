-- =========================================================================
-- CONSOLIDATED DATABASE SETUP FOR EXPLORE HILLS CMS & CRM
-- Run this in your Supabase SQL Editor to set up all tables, triggers, and seed data.
-- =========================================================================

-- 1. Ensure Enum Values exist
ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'super_admin';
ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'manager';
ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'guide';
ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'content_editor';
ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'read_only';

-- 2. Create updated_at trigger helper function if not exists
CREATE OR REPLACE FUNCTION public.set_current_timestamp_updated_at()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 3. Create role_permissions table
CREATE TABLE IF NOT EXISTS public.role_permissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  role public.app_role NOT NULL,
  permission text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (role, permission)
);
ALTER TABLE public.role_permissions ENABLE ROW LEVEL SECURITY;

-- 4. Create permission checking helper function
CREATE OR REPLACE FUNCTION public.has_permission(_user_id uuid, _permission text)
RETURNS boolean
LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path = public
AS $$
DECLARE
  v_has bool;
BEGIN
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles ur
    JOIN public.role_permissions rp ON ur.role = rp.role
    WHERE ur.user_id = _user_id AND rp.permission = _permission
  ) INTO v_has;
  RETURN v_has;
END;
$$;

-- 5. Create packages table
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
ALTER TABLE public.packages ENABLE ROW LEVEL SECURITY;

-- Create trigger on packages
CREATE OR REPLACE TRIGGER set_packages_updated_at
  BEFORE UPDATE ON public.packages
  FOR EACH ROW
  EXECUTE FUNCTION public.set_current_timestamp_updated_at();

-- 6. Create package_itineraries table
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
ALTER TABLE public.package_itineraries ENABLE ROW LEVEL SECURITY;

-- 7. Create media_library table
CREATE TABLE IF NOT EXISTS public.media_library (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  filename text NOT NULL,
  url text NOT NULL,
  size_bytes bigint,
  content_type text,
  folder text NOT NULL DEFAULT 'general',
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.media_library ENABLE ROW LEVEL SECURITY;

-- 8. Create customers table
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
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;

-- 9. Create leads table
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
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- 10. Create settings table
CREATE TABLE IF NOT EXISTS public.settings (
  key text PRIMARY KEY,
  value jsonb NOT NULL,
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;

-- Create trigger on settings
CREATE OR REPLACE TRIGGER set_settings_updated_at
  BEFORE UPDATE ON public.settings
  FOR EACH ROW
  EXECUTE FUNCTION public.set_current_timestamp_updated_at();

-- 11. Create posts table (blogs)
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
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

-- Create trigger on posts
CREATE OR REPLACE TRIGGER set_posts_updated_at
  BEFORE UPDATE ON public.posts
  FOR EACH ROW
  EXECUTE FUNCTION public.set_current_timestamp_updated_at();

-- 12. Create coupons table
CREATE TABLE IF NOT EXISTS public.coupons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text UNIQUE NOT NULL,
  discount_type text NOT NULL CHECK (discount_type IN ('percentage', 'flat')),
  discount_value numeric NOT NULL CHECK (discount_value > 0),
  minimum_amount numeric DEFAULT 0 CHECK (minimum_amount >= 0),
  maximum_discount numeric CHECK (maximum_discount >= 0),
  usage_limit integer CHECK (usage_limit > 0),
  usage_count integer NOT NULL DEFAULT 0 CHECK (usage_count >= 0),
  expiry_date date,
  applicable_packages text[],
  is_enabled boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.coupons ENABLE ROW LEVEL SECURITY;

-- 13. Create reviews table
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
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- 14. Create audit_logs table
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
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- 15. Create package_gallery table
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
ALTER TABLE public.package_gallery ENABLE ROW LEVEL SECURITY;

-- 16. Extend existing bookings table
ALTER TABLE public.bookings 
  ADD COLUMN IF NOT EXISTS guide_name text,
  ADD COLUMN IF NOT EXISTS coordinator_name text,
  ADD COLUMN IF NOT EXISTS vehicle_info text,
  ADD COLUMN IF NOT EXISTS internal_notes text,
  ADD COLUMN IF NOT EXISTS payment_status text DEFAULT 'pending' CHECK (payment_status IN ('pending', 'completed', 'refunded')),
  ADD COLUMN IF NOT EXISTS updated_at timestamptz DEFAULT now();

-- 17. Extend existing departures table
ALTER TABLE public.departures ADD COLUMN IF NOT EXISTS unlimited_seats boolean NOT NULL DEFAULT false;
ALTER TABLE public.departures ADD COLUMN IF NOT EXISTS waitlist_enabled boolean NOT NULL DEFAULT false;
ALTER TABLE public.departures ADD COLUMN IF NOT EXISTS booking_cutoff_days integer NOT NULL DEFAULT 2;
ALTER TABLE public.departures ADD COLUMN IF NOT EXISTS guide_name text;
ALTER TABLE public.departures ADD COLUMN IF NOT EXISTS guide_phone text;
ALTER TABLE public.departures ADD COLUMN IF NOT EXISTS meeting_time text;
ALTER TABLE public.departures ADD COLUMN IF NOT EXISTS meeting_location text;
ALTER TABLE public.departures ADD COLUMN IF NOT EXISTS internal_notes text;
ALTER TABLE public.departures ADD COLUMN IF NOT EXISTS visibility text NOT NULL DEFAULT 'visible' CHECK (visibility IN ('visible', 'hidden'));

-- 18. Sync triggers
CREATE OR REPLACE FUNCTION public.sync_booking_to_customer()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.customers (name, email, phone)
  VALUES (NEW.full_name, NEW.email, NEW.phone)
  ON CONFLICT (email) DO UPDATE
  SET name = EXCLUDED.name,
      phone = COALESCE(customers.phone, EXCLUDED.phone);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER trigger_sync_booking_to_customer
  AFTER INSERT ON public.bookings
  FOR EACH ROW
  EXECUTE FUNCTION public.sync_booking_to_customer();

-- Re-create fixed sync_departure_seats trigger function
CREATE OR REPLACE FUNCTION public.sync_departure_seats()
RETURNS TRIGGER AS $$
DECLARE
  v_old_departure_id uuid;
  v_new_departure_id uuid;
  v_new_max_seats int;
  v_new_booked_seats int;
  v_unlimited_seats bool;
BEGIN
  -- 1. If UPDATE and date/slug changed, or if DELETING, subtract travelers from OLD batch
  IF (TG_OP = 'UPDATE' AND (OLD.package_slug != NEW.package_slug OR OLD.travel_date != NEW.travel_date)) 
     OR TG_OP = 'DELETE' 
  THEN
    IF OLD.status != 'cancelled' THEN
      UPDATE public.departures
      SET booked_seats = GREATEST(0, booked_seats - OLD.travelers),
          status = CASE 
            WHEN status = 'cancelled' THEN 'cancelled'
            ELSE 'open'
          END
      WHERE package_slug = OLD.package_slug AND start_date = OLD.travel_date;
    END IF;
  END IF;

  -- 2. If INSERT or UPDATE, calculate net change and apply to NEW batch
  IF TG_OP = 'INSERT' OR TG_OP = 'UPDATE' THEN
    SELECT id, max_seats, booked_seats, unlimited_seats 
    INTO v_new_departure_id, v_new_max_seats, v_new_booked_seats, v_unlimited_seats
    FROM public.departures
    WHERE package_slug = NEW.package_slug
      AND start_date = NEW.travel_date
    LIMIT 1;

    IF v_new_departure_id IS NOT NULL THEN
      DECLARE
        v_diff int := 0;
      BEGIN
        IF TG_OP = 'INSERT' THEN
          IF NEW.status != 'cancelled' THEN
            v_diff := NEW.travelers;
          END IF;
        ELSIF TG_OP = 'UPDATE' THEN
          -- Date or slug changed: old seats were already subtracted, so treat as a new addition
          IF OLD.package_slug != NEW.package_slug OR OLD.travel_date != NEW.travel_date THEN
            IF NEW.status != 'cancelled' THEN
              v_diff := NEW.travelers;
            END IF;
          -- Date/slug did not change, check standard updates
          ELSE
            IF OLD.status != 'cancelled' AND NEW.status = 'cancelled' THEN
              v_diff := -OLD.travelers;
            ELSIF OLD.status = 'cancelled' AND NEW.status != 'cancelled' THEN
              v_diff := NEW.travelers;
            ELSIF OLD.status != 'cancelled' AND NEW.status != 'cancelled' THEN
              v_diff := NEW.travelers - OLD.travelers;
            END IF;
          END IF;
        END IF;

        IF v_diff != 0 THEN
          -- Check seat limits only if seats are NOT unlimited
          IF v_diff > 0 AND NOT COALESCE(v_unlimited_seats, FALSE) AND (v_new_booked_seats + v_diff) > v_new_max_seats THEN
            RAISE EXCEPTION 'Not enough seats available for this departure date. Available: %, Requested: %', 
              (v_new_max_seats - v_new_booked_seats), v_diff;
          END IF;

          UPDATE public.departures
          SET booked_seats = booked_seats + v_diff,
              status = CASE 
                WHEN status = 'cancelled' THEN 'cancelled'
                WHEN NOT COALESCE(unlimited_seats, FALSE) AND booked_seats + v_diff >= max_seats THEN 'full'
                ELSE 'open'
              END
          WHERE id = v_new_departure_id;
        END IF;
      END;
    END IF;
  END IF;

  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 19. RLS Policies
CREATE POLICY "Super admins can manage permissions"
ON public.role_permissions FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'super_admin'));

CREATE POLICY "Anyone can select permissions"
ON public.role_permissions FOR SELECT TO anon, authenticated
USING (true);

CREATE POLICY "Anyone can view packages"
ON public.packages FOR SELECT TO anon, authenticated
USING (visibility = 'visible' OR status = 'published' OR public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'super_admin') OR public.has_role(auth.uid(), 'content_editor'));

CREATE POLICY "Content managers can insert packages"
ON public.packages FOR INSERT TO authenticated
WITH CHECK (public.has_permission(auth.uid(), 'manage_packages') OR public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'super_admin'));

CREATE POLICY "Content managers can update packages"
ON public.packages FOR UPDATE TO authenticated
USING (public.has_permission(auth.uid(), 'manage_packages') OR public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'super_admin'));

CREATE POLICY "Content managers can delete packages"
ON public.packages FOR DELETE TO authenticated
USING (public.has_permission(auth.uid(), 'manage_packages') OR public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'super_admin'));

CREATE POLICY "Anyone can view itineraries"
ON public.package_itineraries FOR SELECT TO anon, authenticated
USING (true);

CREATE POLICY "Content managers can edit itineraries"
ON public.package_itineraries FOR ALL TO authenticated
USING (public.has_permission(auth.uid(), 'manage_packages') OR public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'super_admin'));

CREATE POLICY "Anyone can view media"
ON public.media_library FOR SELECT TO anon, authenticated
USING (true);

CREATE POLICY "Staff can manage media"
ON public.media_library FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'super_admin') OR public.has_permission(auth.uid(), 'manage_content'));

CREATE POLICY "Admins/Managers can manage customers"
ON public.customers FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'super_admin') OR public.has_role(auth.uid(), 'manager'));

CREATE POLICY "Anyone can insert leads"
ON public.leads FOR INSERT TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Admins/Managers can manage leads"
ON public.leads FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'super_admin') OR public.has_role(auth.uid(), 'manager'));

CREATE POLICY "Anyone can view settings"
ON public.settings FOR SELECT TO anon, authenticated
USING (true);

CREATE POLICY "Staff can manage settings"
ON public.settings FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'super_admin') OR public.has_permission(auth.uid(), 'manage_content'));

CREATE POLICY "Anyone can view published posts"
ON public.posts FOR SELECT TO anon, authenticated
USING (status = 'published' AND publish_date <= now());

CREATE POLICY "Staff can manage posts"
ON public.posts FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'super_admin') OR public.has_permission(auth.uid(), 'manage_content'));

CREATE POLICY "Anyone can check coupons"
ON public.coupons FOR SELECT TO anon, authenticated
USING (is_enabled = true);

CREATE POLICY "Admins/Managers can manage coupons"
ON public.coupons FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'super_admin') OR public.has_role(auth.uid(), 'manager'));

CREATE POLICY "Anyone can view approved reviews"
ON public.reviews FOR SELECT TO anon, authenticated
USING (status = 'approved');

CREATE POLICY "Anyone can submit reviews"
ON public.reviews FOR INSERT TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Staff can manage reviews"
ON public.reviews FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'super_admin') OR public.has_permission(auth.uid(), 'manage_content'));

CREATE POLICY "Admins can view audit logs"
ON public.audit_logs FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'super_admin'));

CREATE POLICY "System can insert audit logs"
ON public.audit_logs FOR INSERT TO authenticated
WITH CHECK (true);

CREATE POLICY "Anyone can view package gallery"
ON public.package_gallery FOR SELECT TO anon, authenticated
USING (true);

CREATE POLICY "Staff can manage package gallery"
ON public.package_gallery FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'super_admin') OR public.has_permission(auth.uid(), 'manage_packages'));


-- 20. Seed Initial Data
INSERT INTO public.role_permissions (role, permission) VALUES
  ('admin', 'manage_packages'),
  ('admin', 'manage_batches'),
  ('admin', 'manage_bookings'),
  ('admin', 'manage_users'),
  ('admin', 'manage_content'),
  ('super_admin', 'manage_packages'),
  ('super_admin', 'manage_batches'),
  ('super_admin', 'manage_bookings'),
  ('super_admin', 'manage_users'),
  ('super_admin', 'manage_content'),
  ('manager', 'manage_bookings'),
  ('manager', 'manage_batches'),
  ('content_editor', 'manage_packages'),
  ('content_editor', 'manage_content')
ON CONFLICT (role, permission) DO NOTHING;

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

-- Create the 'media' storage bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'media',
  'media',
  true,
  10485760,  -- 10 MB max file size
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml', 'video/mp4']
)
ON CONFLICT (id) DO NOTHING;

-- Grant permissions on storage.objects to avoid any issues
CREATE POLICY "Public read media" ON storage.objects
  FOR SELECT USING (bucket_id = 'media');

CREATE POLICY "Auth upload media" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'media');

CREATE POLICY "Auth update media" ON storage.objects
  FOR UPDATE TO authenticated
  USING (bucket_id = 'media');

CREATE POLICY "Auth delete media" ON storage.objects
  FOR DELETE TO authenticated
  USING (bucket_id = 'media');
