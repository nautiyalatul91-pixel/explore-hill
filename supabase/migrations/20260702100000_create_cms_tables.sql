-- Create role_permissions table
CREATE TABLE IF NOT EXISTS public.role_permissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  role public.app_role NOT NULL,
  permission text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (role, permission)
);

-- Enable RLS on role_permissions
ALTER TABLE public.role_permissions ENABLE ROW LEVEL SECURITY;

-- Create permission checks policy or simple check functions
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

-- Create packages table
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

-- Create updated_at trigger function if not exists
CREATE OR REPLACE FUNCTION public.set_current_timestamp_updated_at()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger on packages
CREATE OR REPLACE TRIGGER set_packages_updated_at
  BEFORE UPDATE ON public.packages
  FOR EACH ROW
  EXECUTE FUNCTION public.set_current_timestamp_updated_at();

-- Enable RLS on packages
ALTER TABLE public.packages ENABLE ROW LEVEL SECURITY;

-- Create package_itineraries table
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

-- Enable RLS on package_itineraries
ALTER TABLE public.package_itineraries ENABLE ROW LEVEL SECURITY;

-- Create media_library table
CREATE TABLE IF NOT EXISTS public.media_library (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  filename text NOT NULL,
  url text NOT NULL,
  size_bytes integer,
  content_type text,
  folder text NOT NULL DEFAULT 'general',
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS on media_library
ALTER TABLE public.media_library ENABLE ROW LEVEL SECURITY;

-- RLS Policies for role_permissions
CREATE POLICY "Super admins can manage permissions"
ON public.role_permissions FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'super_admin'));

CREATE POLICY "Anyone can select permissions"
ON public.role_permissions FOR SELECT TO anon, authenticated
USING (true);

-- RLS Policies for packages
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

-- RLS Policies for package_itineraries
CREATE POLICY "Anyone can view itineraries"
ON public.package_itineraries FOR SELECT TO anon, authenticated
USING (true);

CREATE POLICY "Content managers can edit itineraries"
ON public.package_itineraries FOR ALL TO authenticated
USING (public.has_permission(auth.uid(), 'manage_packages') OR public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'super_admin'));

-- RLS Policies for media_library
CREATE POLICY "Anyone can view media"
ON public.media_library FOR SELECT TO anon, authenticated
USING (true);

CREATE POLICY "Staff can manage media"
ON public.media_library FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'super_admin') OR public.has_permission(auth.uid(), 'manage_content'));

-- Seed roles permissions defaults
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

-- Seed existing treks and trips into public.packages (backward compatibility + data recovery check)
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
