-- =========================================================================
-- FIX COUPONS TABLE COLUMNS (ALIGNING WITH FRONTEND QUERIES)
-- Run this in your Supabase SQL Editor.
-- This ensures the 'coupons' table matches the properties queried by the
-- checkout and coupon management code.
-- =========================================================================

-- 1. Add missing frontend-aligned columns to coupons table
ALTER TABLE public.coupons ADD COLUMN IF NOT EXISTS min_booking_amount numeric DEFAULT 0;
ALTER TABLE public.coupons ADD COLUMN IF NOT EXISTS max_uses integer;
ALTER TABLE public.coupons ADD COLUMN IF NOT EXISTS used_count integer DEFAULT 0;
ALTER TABLE public.coupons ADD COLUMN IF NOT EXISTS status text DEFAULT 'active';

-- 2. Force rebuild API schema cache
NOTIFY pgrst, 'reload schema';
