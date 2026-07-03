-- =========================================================================
-- ADD COUPON & PRICING COLUMNS TO BOOKINGS TABLE
-- Run this in your Supabase SQL Editor.
-- =========================================================================

-- 1. Add missing coupon and price columns to the bookings table
ALTER TABLE public.bookings ADD COLUMN IF NOT EXISTS coupon_code text;
ALTER TABLE public.bookings ADD COLUMN IF NOT EXISTS discount_amount numeric NOT NULL DEFAULT 0;
ALTER TABLE public.bookings ADD COLUMN IF NOT EXISTS total_price numeric;

-- 2. Force rebuild API schema cache
NOTIFY pgrst, 'reload schema';
