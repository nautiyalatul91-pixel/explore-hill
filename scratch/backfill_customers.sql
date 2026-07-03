-- =========================================================================
-- BACKFILL CUSTOMERS FROM EXISTING BOOKINGS
-- Run this in your Supabase SQL Editor.
-- This imports all travelers from your existing bookings into the
-- Customer CRM database table.
-- =========================================================================

INSERT INTO public.customers (name, email, phone)
SELECT DISTINCT ON (email) 
  full_name as name, 
  email, 
  phone
FROM public.bookings
ON CONFLICT (email) DO UPDATE
SET 
  name = EXCLUDED.name,
  phone = COALESCE(public.customers.phone, EXCLUDED.phone);
