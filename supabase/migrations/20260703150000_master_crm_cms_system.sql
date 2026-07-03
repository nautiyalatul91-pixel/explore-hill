-- Database Migration for Part 2 CRM & CMS Modules

-- 1. Extend bookings table
ALTER TABLE public.bookings 
  ADD COLUMN IF NOT EXISTS guide_name text,
  ADD COLUMN IF NOT EXISTS coordinator_name text,
  ADD COLUMN IF NOT EXISTS vehicle_info text,
  ADD COLUMN IF NOT EXISTS internal_notes text,
  ADD COLUMN IF NOT EXISTS payment_status text DEFAULT 'pending' CHECK (payment_status IN ('pending', 'completed', 'refunded')),
  ADD COLUMN IF NOT EXISTS updated_at timestamptz DEFAULT now();

-- 2. Create customers table
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

-- Enable RLS on customers
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;

-- 3. Create leads table
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

-- Enable RLS on leads
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- 4. Create settings table
CREATE TABLE IF NOT EXISTS public.settings (
  key text PRIMARY KEY,
  value jsonb NOT NULL,
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS on settings
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;

-- 5. Create posts table (blogs)
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

-- Enable RLS on posts
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

-- 6. Create coupons table
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

-- Enable RLS on coupons
ALTER TABLE public.coupons ENABLE ROW LEVEL SECURITY;

-- 7. Create reviews table
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

-- Enable RLS on reviews
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- 8. Create audit_logs table
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

-- Enable RLS on audit_logs
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- 9. Create package_gallery table (Normalized media relationship)
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

-- Enable RLS on package_gallery
ALTER TABLE public.package_gallery ENABLE ROW LEVEL SECURITY;


-- 10. Triggers & Automation Functions

-- Sync booking to customer
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

-- Auto-update timestamps triggers
CREATE OR REPLACE TRIGGER set_posts_updated_at
  BEFORE UPDATE ON public.posts
  FOR EACH ROW
  EXECUTE FUNCTION public.set_current_timestamp_updated_at();

CREATE OR REPLACE TRIGGER set_settings_updated_at
  BEFORE UPDATE ON public.settings
  FOR EACH ROW
  EXECUTE FUNCTION public.set_current_timestamp_updated_at();


-- 11. Row Level Security Policies

-- Customers RLS Policies
CREATE POLICY "Admins/Managers can manage customers"
  ON public.customers FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'super_admin') OR public.has_role(auth.uid(), 'manager'));

-- Leads RLS Policies
CREATE POLICY "Anyone can insert leads"
  ON public.leads FOR INSERT TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Admins/Managers can manage leads"
  ON public.leads FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'super_admin') OR public.has_role(auth.uid(), 'manager'));

-- Settings RLS Policies
CREATE POLICY "Anyone can view settings"
  ON public.settings FOR SELECT TO anon, authenticated
  USING (true);

CREATE POLICY "Staff can manage settings"
  ON public.settings FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'super_admin') OR public.has_permission(auth.uid(), 'manage_content'));

-- Posts RLS Policies
CREATE POLICY "Anyone can view published posts"
  ON public.posts FOR SELECT TO anon, authenticated
  USING (status = 'published' AND publish_date <= now());

CREATE POLICY "Staff can manage posts"
  ON public.posts FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'super_admin') OR public.has_permission(auth.uid(), 'manage_content'));

-- Coupons RLS Policies
CREATE POLICY "Anyone can check coupons"
  ON public.coupons FOR SELECT TO anon, authenticated
  USING (is_enabled = true);

CREATE POLICY "Admins/Managers can manage coupons"
  ON public.coupons FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'super_admin') OR public.has_role(auth.uid(), 'manager'));

-- Reviews RLS Policies
CREATE POLICY "Anyone can view approved reviews"
  ON public.reviews FOR SELECT TO anon, authenticated
  USING (status = 'approved');

CREATE POLICY "Anyone can submit reviews"
  ON public.reviews FOR INSERT TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Staff can manage reviews"
  ON public.reviews FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'super_admin') OR public.has_permission(auth.uid(), 'manage_content'));

-- Audit Logs RLS Policies
CREATE POLICY "Admins can view audit logs"
  ON public.audit_logs FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'super_admin'));

CREATE POLICY "System can insert audit logs"
  ON public.audit_logs FOR INSERT TO authenticated
  WITH CHECK (true);

-- Package Gallery RLS Policies
CREATE POLICY "Anyone can view package gallery"
  ON public.package_gallery FOR SELECT TO anon, authenticated
  USING (true);

CREATE POLICY "Staff can manage package gallery"
  ON public.package_gallery FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'super_admin') OR public.has_permission(auth.uid(), 'manage_packages'));
