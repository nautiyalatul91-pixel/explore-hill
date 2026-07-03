-- Extend departures table with new columns
ALTER TABLE public.departures ADD COLUMN IF NOT EXISTS unlimited_seats boolean NOT NULL DEFAULT false;
ALTER TABLE public.departures ADD COLUMN IF NOT EXISTS waitlist_enabled boolean NOT NULL DEFAULT false;
ALTER TABLE public.departures ADD COLUMN IF NOT EXISTS booking_cutoff_days integer NOT NULL DEFAULT 2;
ALTER TABLE public.departures ADD COLUMN IF NOT EXISTS guide_name text;
ALTER TABLE public.departures ADD COLUMN IF NOT EXISTS guide_phone text;
ALTER TABLE public.departures ADD COLUMN IF NOT EXISTS meeting_time text;
ALTER TABLE public.departures ADD COLUMN IF NOT EXISTS meeting_location text;
ALTER TABLE public.departures ADD COLUMN IF NOT EXISTS internal_notes text;
ALTER TABLE public.departures ADD COLUMN IF NOT EXISTS visibility text NOT NULL DEFAULT 'visible' CHECK (visibility IN ('visible', 'hidden'));

-- Re-create sync trigger function to handle unlimited_seats bypass correctly
CREATE OR REPLACE FUNCTION public.sync_departure_seats()
RETURNS TRIGGER AS $$
DECLARE
  v_old_departure_id uuid;
  v_new_departure_id uuid;
  v_new_max_seats int;
  v_new_booked_seats int;
  v_unlimited_seats bool;
BEGIN
  -- 1. If UPDATE and date/slug changed, or if DELETING, subtract travelers from OLD batch
  IF (TG_OP = 'UPDATE' AND (OLD.package_slug != NEW.package_slug OR OLD.travel_date != NEW.travel_date)) 
     OR TG_OP = 'DELETE' 
  THEN
    IF OLD.status != 'cancelled' THEN
      UPDATE public.departures
      SET booked_seats = GREATEST(0, booked_seats - OLD.travelers),
          status = CASE 
            WHEN status = 'cancelled' THEN 'cancelled'
            ELSE 'open'
          END
      WHERE package_slug = OLD.package_slug AND start_date = OLD.travel_date;
    END IF;
  END IF;

  -- 2. If INSERT or UPDATE, calculate net change and apply to NEW batch
  IF TG_OP = 'INSERT' OR TG_OP = 'UPDATE' THEN
    SELECT id, max_seats, booked_seats, unlimited_seats 
    INTO v_new_departure_id, v_new_max_seats, v_new_booked_seats, v_unlimited_seats
    FROM public.departures
    WHERE package_slug = NEW.package_slug
      AND start_date = NEW.travel_date
    LIMIT 1;

    IF v_new_departure_id IS NOT NULL THEN
      DECLARE
        v_diff int := 0;
      BEGIN
        IF TG_OP = 'INSERT' THEN
          IF NEW.status != 'cancelled' THEN
            v_diff := NEW.travelers;
          END IF;
        ELSIF TG_OP = 'UPDATE' THEN
          -- Date or slug changed: old seats were already subtracted, so treat as a new addition
          IF OLD.package_slug != NEW.package_slug OR OLD.travel_date != NEW.travel_date THEN
            IF NEW.status != 'cancelled' THEN
              v_diff := NEW.travelers;
            END IF;
          -- Date/slug did not change, check standard updates
          ELSE
            IF OLD.status != 'cancelled' AND NEW.status = 'cancelled' THEN
              v_diff := -OLD.travelers;
            ELSIF OLD.status = 'cancelled' AND NEW.status != 'cancelled' THEN
              v_diff := NEW.travelers;
            ELSIF OLD.status != 'cancelled' AND NEW.status != 'cancelled' THEN
              v_diff := NEW.travelers - OLD.travelers;
            END IF;
          END IF;
        END IF;

        IF v_diff != 0 THEN
          -- Check seat limits only if seats are NOT unlimited
          IF v_diff > 0 AND NOT COALESCE(v_unlimited_seats, FALSE) AND (v_new_booked_seats + v_diff) > v_new_max_seats THEN
            RAISE EXCEPTION 'Not enough seats available for this departure date. Available: %, Requested: %', 
              (v_new_max_seats - v_new_booked_seats), v_diff;
          END IF;

          UPDATE public.departures
          SET booked_seats = booked_seats + v_diff,
              status = CASE 
                WHEN status = 'cancelled' THEN 'cancelled'
                WHEN NOT COALESCE(unlimited_seats, FALSE) AND booked_seats + v_diff >= max_seats THEN 'full'
                ELSE 'open'
              END
          WHERE id = v_new_departure_id;
        END IF;
      END;
    END IF;
  END IF;

  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
