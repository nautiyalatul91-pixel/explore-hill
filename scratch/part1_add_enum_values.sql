-- ==========================================================
-- PART 1: ADD ENUM VALUES (RUN THIS FIRST AND ALONE)
-- Run this in a new query window in Supabase SQL Editor.
-- If you get a transaction block error, run these lines one by one.
-- ==========================================================

ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'super_admin';
ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'manager';
ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'guide';
ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'content_editor';
ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'read_only';
