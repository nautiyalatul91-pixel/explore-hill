-- Create departures table
CREATE TABLE public.departures (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  package_slug text NOT NULL,
  start_date date NOT NULL,
  end_date date NOT NULL,
  max_seats integer NOT NULL DEFAULT 15,
  booked_seats integer NOT NULL DEFAULT 0,
  status text NOT NULL DEFAULT 'open' CONSTRAINT status_check CHECK (status IN ('open', 'full', 'cancelled')),
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Setup permissions
GRANT SELECT ON public.departures TO anon, authenticated;
GRANT ALL ON public.departures TO service_role;
GRANT INSERT, UPDATE, DELETE ON public.departures TO authenticated;

-- Enable RLS
ALTER TABLE public.departures ENABLE ROW LEVEL SECURITY;

-- Setup RLS policies
CREATE POLICY "Anyone can view departures"
ON public.departures FOR SELECT TO anon, authenticated
USING (true);

CREATE POLICY "Admins can insert departures"
ON public.departures FOR INSERT TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update departures"
ON public.departures FOR UPDATE TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete departures"
ON public.departures FOR DELETE TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Trigger function to keep booked_seats in sync and enforce quota validation
CREATE OR REPLACE FUNCTION public.sync_departure_seats()
RETURNS TRIGGER AS $$
DECLARE
  v_old_departure_id uuid;
  v_new_departure_id uuid;
  v_new_max_seats int;
  v_new_booked_seats int;
BEGIN
  -- 1. If UPDATE and date/slug changed, or if DELETING, subtract travelers from OLD batch
  IF (TG_OP = 'UPDATE' AND (OLD.package_slug != NEW.package_slug OR OLD.travel_date != NEW.travel_date)) 
     OR TG_OP = 'DELETE' 
  THEN
    IF OLD.status != 'cancelled' THEN
      UPDATE public.departures
      SET booked_seats = GREATEST(0, booked_seats - OLD.travelers),
          status = 'open'
      WHERE package_slug = OLD.package_slug AND start_date = OLD.travel_date;
    END IF;
  END IF;

  -- 2. If INSERT or UPDATE, calculate net change and apply to NEW batch
  IF TG_OP = 'INSERT' OR TG_OP = 'UPDATE' THEN
    SELECT id, max_seats, booked_seats 
    INTO v_new_departure_id, v_new_max_seats, v_new_booked_seats
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
          IF v_diff > 0 AND (v_new_booked_seats + v_diff) > v_new_max_seats THEN
            RAISE EXCEPTION 'Not enough seats available for this departure date. Available: %, Requested: %', 
              (v_new_max_seats - v_new_booked_seats), v_diff;
          END IF;

          UPDATE public.departures
          SET booked_seats = booked_seats + v_diff,
              status = CASE 
                WHEN booked_seats + v_diff >= max_seats THEN 'full'
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

-- Recreate trigger if it exists
DROP TRIGGER IF EXISTS trigger_sync_departure_seats ON public.bookings;
CREATE TRIGGER trigger_sync_departure_seats
AFTER INSERT OR UPDATE OR DELETE ON public.bookings
FOR EACH ROW EXECUTE FUNCTION public.sync_departure_seats();
