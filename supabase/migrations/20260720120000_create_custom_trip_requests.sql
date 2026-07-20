-- Migration: Create custom_trip_requests table for Customize Your Trip feature
-- Date: 2026-07-20

CREATE TABLE IF NOT EXISTS public.custom_trip_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  phone text NOT NULL,
  email text,
  trip_type text,
  destination text,
  starting_city text,
  travel_date text,
  days text,
  travelers text,
  budget_range text,
  transport_required text,
  meal_preference text,
  adventure_level text,
  activities text[],
  special_requirements text,
  status text NOT NULL DEFAULT 'New',
  internal_notes text,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.custom_trip_requests ENABLE ROW LEVEL SECURITY;

-- Allow public & authenticated users to submit requests
CREATE POLICY "Anyone can insert custom trip requests"
  ON public.custom_trip_requests FOR INSERT
  TO anon, authenticated WITH CHECK (true);

-- Allow public & authenticated users to view custom trip requests
CREATE POLICY "Anyone can view custom trip requests"
  ON public.custom_trip_requests FOR SELECT
  TO anon, authenticated USING (true);

-- Allow public & authenticated users to update custom trip requests
CREATE POLICY "Anyone can update custom trip requests"
  ON public.custom_trip_requests FOR UPDATE
  TO anon, authenticated USING (true);

-- Allow public & authenticated users to delete custom trip requests
CREATE POLICY "Anyone can delete custom trip requests"
  ON public.custom_trip_requests FOR DELETE
  TO anon, authenticated USING (true);
