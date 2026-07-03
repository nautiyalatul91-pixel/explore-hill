-- Configure Supabase Storage buckets
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES 
  ('packages', 'packages', true, 5242880, '{image/jpeg,image/png,image/webp,image/gif}'),
  ('gallery', 'gallery', true, 5242880, '{image/jpeg,image/png,image/webp,image/gif}'),
  ('blog', 'blog', true, 5242880, '{image/jpeg,image/png,image/webp,image/gif}'),
  ('documents', 'documents', false, 10485760, NULL),
  ('media', 'media', true, 10485760, NULL)
ON CONFLICT (id) DO NOTHING;

-- RLS Policies on storage.objects
DROP POLICY IF EXISTS "Public Select Objects" ON storage.objects;
CREATE POLICY "Public Select Objects" ON storage.objects FOR SELECT USING (bucket_id IN ('packages', 'gallery', 'blog', 'media'));

DROP POLICY IF EXISTS "Admin Insert Objects" ON storage.objects;
CREATE POLICY "Admin Insert Objects" ON storage.objects FOR INSERT TO authenticated 
WITH CHECK (bucket_id IN ('packages', 'gallery', 'blog', 'documents', 'media') AND (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'super_admin') OR public.has_permission(auth.uid(), 'manage_content')));

DROP POLICY IF EXISTS "Admin Update Objects" ON storage.objects;
CREATE POLICY "Admin Update Objects" ON storage.objects FOR UPDATE TO authenticated 
USING (bucket_id IN ('packages', 'gallery', 'blog', 'documents', 'media') AND (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'super_admin') OR public.has_permission(auth.uid(), 'manage_content')));

DROP POLICY IF EXISTS "Admin Delete Objects" ON storage.objects;
CREATE POLICY "Admin Delete Objects" ON storage.objects FOR DELETE TO authenticated 
USING (bucket_id IN ('packages', 'gallery', 'blog', 'documents', 'media') AND (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'super_admin') OR public.has_permission(auth.uid(), 'manage_content')));
