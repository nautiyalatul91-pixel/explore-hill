-- Migration: Add missing columns to reviews and seed reviews for each package
-- Date: 2026-07-06

-- 1. Add customer_name and package_name to reviews if not exists
ALTER TABLE public.reviews ADD COLUMN IF NOT EXISTS customer_name text;
ALTER TABLE public.reviews ADD COLUMN IF NOT EXISTS package_name text;

-- 2. Drop user_name NOT NULL constraint temporarily (if needed)
ALTER TABLE public.reviews ALTER COLUMN user_name DROP NOT NULL;

-- 3. Create name synchronization trigger
CREATE OR REPLACE FUNCTION public.sync_review_names()
RETURNS trigger AS $$
BEGIN
  IF NEW.customer_name IS NOT NULL AND NEW.user_name IS NULL THEN
    NEW.user_name := NEW.customer_name;
  ELSIF NEW.user_name IS NOT NULL AND NEW.customer_name IS NULL THEN
    NEW.customer_name := NEW.user_name;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_sync_review_names ON public.reviews;
CREATE TRIGGER trigger_sync_review_names
  BEFORE INSERT OR UPDATE ON public.reviews
  FOR EACH ROW
  EXECUTE FUNCTION public.sync_review_names();

-- 4. Create package name auto-population trigger
CREATE OR REPLACE FUNCTION public.populate_review_package_name()
RETURNS trigger AS $$
BEGIN
  IF NEW.package_name IS NULL AND NEW.package_slug IS NOT NULL THEN
    SELECT name INTO NEW.package_name FROM public.packages WHERE slug = NEW.package_slug;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_populate_review_package_name ON public.reviews;
CREATE TRIGGER trigger_populate_review_package_name
  BEFORE INSERT OR UPDATE ON public.reviews
  FOR EACH ROW
  EXECUTE FUNCTION public.populate_review_package_name();

-- 5. Seed realistic reviews for all 6 packages
DELETE FROM public.reviews WHERE package_slug IN ('moila-top', 'kedarkantha', 'nag-tibba', 'yulla-kanda', 'hanol-cultural', 'mahasu-devta-yatra');

INSERT INTO public.reviews (package_slug, customer_name, rating, comment, verified, status, featured) VALUES
-- Moila Top Trek
('moila-top', 'Amit Rawat', 5, 'An absolute dream weekend trek! The meadows of Moila Top are so pristine. Camping under a clear night sky was the highlight.', true, 'approved', true),
('moila-top', 'Neha Joshi', 5, 'Very well managed. The guide was knowledgeable and the local Garhwali food served at the campsite was delicious.', true, 'approved', false),
('moila-top', 'Vikram Singh', 4, 'Great trek for beginners. The forest trail is beautiful and not too steep. Perfect bonfire experience!', true, 'approved', false),
('moila-top', 'Priya Sharma', 5, 'Beautiful village stays and hospitality. Atul and his team did a fantastic job coordinating everything.', true, 'approved', true),
('moila-top', 'Rahul Verma', 4, 'Enjoyed the alpine campsite. The views of the peaks at sunrise were breathtaking. Highly recommend.', true, 'approved', false),
('moila-top', 'Aarav Gupta', 5, 'The caves near Moila Top were fascinating. Exceptional organization and friendly staff.', true, 'approved', false),

-- Kedarkantha Trek
('kedarkantha', 'Sandeep Negi', 5, 'Unforgettable snow trekking experience! The 360-degree view of Himalayan peaks from the summit was magical.', true, 'approved', true),
('kedarkantha', 'Ananya Sen', 5, 'Summit day was challenging but totally worth it. The sunrise summit climb is something I''ll cherish forever.', true, 'approved', true),
('kedarkantha', 'Rohan Das', 4, 'Excellent tents and sleeping bags. Even in freezing temperatures, the crew kept us warm with hot chai and soup.', true, 'approved', false),
('kedarkantha', 'Meera Nair', 5, 'Organized perfectly. The guides prioritized our safety and set a comfortable pace for everyone.', true, 'approved', false),
('kedarkantha', 'Divya Teja', 5, 'Loved the snow slopes and frozen lakes. Best winter trek in India, hands down.', true, 'approved', false),
('kedarkantha', 'Kunal Roy', 4, 'Stunning forest trails covered in white. The group size was small which made it very personal.', true, 'approved', false),
('kedarkantha', 'Shreya Ghoshal', 5, 'Trekking through the pine forests in winter is like walking through a postcard. Excellent guides.', true, 'approved', false),

-- Nag Tibba Trek
('nag-tibba', 'Rajesh Kumar', 4, 'Perfect weekend getaway from Dehradun. Easy climb and spectacular views from the top.', true, 'approved', false),
('nag-tibba', 'Sneha Patra', 5, 'Very convenient itinerary. Camped near the temple and saw one of the best sunrises of my life.', true, 'approved', true),
('nag-tibba', 'Aditya Rao', 4, 'Highly recommended for first-timers. The trail is well-defined and the camping set up was very neat.', true, 'approved', false),
('nag-tibba', 'Tanya Bajaj', 5, 'Short, sweet, and satisfying. The local guides told us amazing folk stories around the bonfire.', true, 'approved', false),
('nag-tibba', 'Abhinav Mishra', 5, 'Good food, great company, and clean tents. Can''t ask for a better weekend trek.', true, 'approved', false),

-- Yulla Kanda Trek
('yulla-kanda', 'Harish Thakur', 5, 'A deeply spiritual and scenic journey. Reaching the lake and temple at such a high altitude was humbling.', true, 'approved', true),
('yulla-kanda', 'Ritu Rana', 5, 'Remote and untouched by commercial tourism. Pristine beauty and rich local Kinnauri culture.', true, 'approved', false),
('yulla-kanda', 'Suresh Kumar', 4, 'Tougher than Nag Tibba but the views of the snow-clad peaks are unparalleled. Excellent crew.', true, 'approved', false),
('yulla-kanda', 'Preeti Dhiman', 5, 'The lake is beautiful. The temple has a very serene energy. Thanks to the guides for safety management.', true, 'approved', false),
('yulla-kanda', 'Kartik Aryan', 5, 'Kinnaur at its best! High altitude ridge walks were thrilling. Loved the local hospitality.', true, 'approved', false),

-- Hanol Cultural Trip
('hanol-cultural', 'Sunita Devi', 5, 'Felt like home! The village stay in Hanol was heartwarming. The food was organic and delicious.', true, 'approved', true),
('hanol-cultural', 'Deepak Bisht', 5, 'Fascinating architecture of the Mahasu Devta temple. Tons river views are very peaceful.', true, 'approved', false),
('hanol-cultural', 'Anjali Mehta', 5, 'Great escape from city life. Slow, intentional, and educational cultural experience.', true, 'approved', false),
('hanol-cultural', 'Manish Pandey', 4, 'Enjoyed the interaction with local villagers. Learned a lot about local history and folklore.', true, 'approved', false),
('hanol-cultural', 'Swati Goel', 5, 'Simple living, high thinking. The hosts were incredibly hospitable. Riverside walk was beautiful.', true, 'approved', false),

-- Mahasu Devta Yatra
('mahasu-devta-yatra', 'Ramesh Chandra', 5, 'A wonderful pilgrimage circuit. Very peaceful temples and clean village homestays.', true, 'approved', true),
('mahasu-devta-yatra', 'Kavita Rawat', 5, 'Well-planned yatra. The scenic drive and spiritual stops were perfectly balanced.', true, 'approved', false),
('mahasu-devta-yatra', 'Jagdish Prasad', 5, 'Atul and his guides ensured all elders in the group were comfortable. Highly respectful team.', true, 'approved', false),
('mahasu-devta-yatra', 'Nidhi Pant', 4, 'Beautiful heritage route. Loved the Bisoi and Lakhwar village stops. Very authentic.', true, 'approved', false),
('mahasu-devta-yatra', 'Sanjay Dutt', 5, 'Superb organization. The local food served at each stop was fresh and delicious.', true, 'approved', false),
('mahasu-devta-yatra', 'Pooja Hegde', 5, 'A soul-enriching experience. Felt connected to the history and rituals of Uttarakhand.', true, 'approved', false);
