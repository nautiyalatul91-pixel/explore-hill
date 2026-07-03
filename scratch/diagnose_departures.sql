-- =========================================================================
-- DIAGNOSTIC AND FORCE REBUILD COLUMN SCRIPT
-- Run this in your Supabase SQL Editor for project "ceibmitkquyuvbzfwqyn".
-- =========================================================================

-- 1. Try to add the column without IF NOT EXISTS to see if it already exists or if it adds successfully
ALTER TABLE public.departures ADD COLUMN booking_cutoff_days integer NOT NULL DEFAULT 2;

-- 2. If the query above succeeds or says it already exists, run this to force rebuild cache
NOTIFY pgrst, 'reload schema';

-- 3. Verify columns currently in departures table
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'departures';
