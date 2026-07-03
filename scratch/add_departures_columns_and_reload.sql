-- =========================================================================
-- TARGETED FIX: ADD DEPARTURES COLUMNS & RELOAD API SCHEMA CACHE
-- Run this in your Supabase SQL Editor.
-- =========================================================================

-- 1. Extend departures table with missing columns
ALTER TABLE public.departures ADD COLUMN IF NOT EXISTS unlimited_seats boolean NOT NULL DEFAULT false;
ALTER TABLE public.departures ADD COLUMN IF NOT EXISTS waitlist_enabled boolean NOT NULL DEFAULT false;
ALTER TABLE public.departures ADD COLUMN IF NOT EXISTS booking_cutoff_days integer NOT NULL DEFAULT 2;
ALTER TABLE public.departures ADD COLUMN IF NOT EXISTS guide_name text;
ALTER TABLE public.departures ADD COLUMN IF NOT EXISTS guide_phone text;
ALTER TABLE public.departures ADD COLUMN IF NOT EXISTS meeting_time text;
ALTER TABLE public.departures ADD COLUMN IF NOT EXISTS meeting_location text;
ALTER TABLE public.departures ADD COLUMN IF NOT EXISTS internal_notes text;
ALTER TABLE public.departures ADD COLUMN IF NOT EXISTS visibility text NOT NULL DEFAULT 'visible' CHECK (visibility IN ('visible', 'hidden'));

-- 2. Force Supabase API to reload schema cache
NOTIFY pgrst, 'reload schema';
