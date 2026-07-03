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

-- Allow public read access to media bucket
CREATE POLICY IF NOT EXISTS "Public read access on media"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'media');

-- Allow authenticated users to upload to media bucket
CREATE POLICY IF NOT EXISTS "Authenticated upload to media"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'media');

-- Allow authenticated users to update their uploads
CREATE POLICY IF NOT EXISTS "Authenticated update on media"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'media');

-- Allow authenticated users to delete from media bucket
CREATE POLICY IF NOT EXISTS "Authenticated delete from media"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'media');
