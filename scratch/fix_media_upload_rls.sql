-- =========================================================================
-- FIX STORAGE UPLOAD RLS POLICY
-- Run this in your Supabase SQL Editor.
-- This grants both anon (anonymous) and authenticated users rights to upload
-- and read from the 'media' bucket and 'media_library' table.
-- =========================================================================

-- 1. Ensure the 'media' bucket is configured correctly
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'media',
  'media',
  true,
  10485760,  -- 10 MB
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml', 'video/mp4']
)
ON CONFLICT (id) DO UPDATE SET public = true;

-- 2. Drop existing policies to prevent conflicts
DROP POLICY IF EXISTS "Auth upload media" ON storage.objects;
DROP POLICY IF EXISTS "Auth select media" ON storage.objects;
DROP POLICY IF EXISTS "Auth update media" ON storage.objects;
DROP POLICY IF EXISTS "Auth delete media" ON storage.objects;
DROP POLICY IF EXISTS "Allow anon and auth insert media" ON storage.objects;
DROP POLICY IF EXISTS "Allow anon and auth select media" ON storage.objects;
DROP POLICY IF EXISTS "Allow anon and auth update media" ON storage.objects;
DROP POLICY IF EXISTS "Allow anon and auth delete media" ON storage.objects;

-- 3. Create permissive policies for 'media' bucket to bypass any auth token issues
CREATE POLICY "Allow anon and auth insert media" ON storage.objects
  FOR INSERT TO anon, authenticated
  WITH CHECK (bucket_id = 'media');

CREATE POLICY "Allow anon and auth select media" ON storage.objects
  FOR SELECT TO anon, authenticated
  USING (bucket_id = 'media');

CREATE POLICY "Allow anon and auth update media" ON storage.objects
  FOR UPDATE TO anon, authenticated
  USING (bucket_id = 'media');

CREATE POLICY "Allow anon and auth delete media" ON storage.objects
  FOR DELETE TO anon, authenticated
  USING (bucket_id = 'media');

-- 4. Enable RLS and create permissive policies for media_library table
ALTER TABLE public.media_library ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Auth insert media_library" ON public.media_library;
DROP POLICY IF EXISTS "Public read media_library" ON public.media_library;
DROP POLICY IF EXISTS "Auth delete media_library" ON public.media_library;
DROP POLICY IF EXISTS "Allow anon and auth insert media_library" ON public.media_library;
DROP POLICY IF EXISTS "Allow anon and auth select media_library" ON public.media_library;
DROP POLICY IF EXISTS "Allow anon and auth delete media_library" ON public.media_library;

CREATE POLICY "Allow anon and auth insert media_library" ON public.media_library
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Allow anon and auth select media_library" ON public.media_library
  FOR SELECT TO anon, authenticated
  USING (true);

CREATE POLICY "Allow anon and auth delete media_library" ON public.media_library
  FOR DELETE TO anon, authenticated
  USING (true);
