-- =========================================================================
-- SEED MOCK BLOG POSTS FOR CMS & BLOG PAGE TESTING
-- Run this in your Supabase SQL Editor.
-- This inserts 3 professional, realistic adventure guides into your blog.
-- =========================================================================

INSERT INTO public.posts (
  slug, title, summary, content, featured_image, categories, tags, author_name, reading_time, status, publish_date, featured
) VALUES 
  (
    'winter-trekking-tips-uttarakhand',
    '5 Essential Tips for Your First Winter Trek in Uttarakhand',
    'Planning your first snow hike? From layering secrets to keeping your water from freezing, here is what our guides recommend.',
    '# 5 Essential Tips for Your First Winter Trek in Uttarakhand

Winter in the Himalayas is a magical experience. Snow-laden pine forests, frozen lakes, and crisp 360-degree views of Himalayan peaks draw thousands of trekkers every year to destinations like **Kedarkantha** and **Har Ki Dun**.

However, winter trekking is very different from trekking in summer. Temperatures can plunge below freezing at night, and the trail demands respect.

Here are 5 essential tips from our certified guides to make your first winter trek safe and unforgettable:

---

### 1. Master the 3-Layer System
Don’t just pile on heavy sweaters. The key to staying warm is building layers that you can easily take off and put on:
*   **Base Layer**: Moisture-wicking thermal top and bottom (wool or synthetic - never cotton!).
*   **Middle Layer**: Warm insulation like fleece or a lightweight down jacket.
*   **Outer Layer**: Windproof and waterproof shell jacket and pants.

### 2. Keep Your Water Bottles Inside Your Sleeping Bag
At high altitudes, temperatures drop below freezing at night. If you leave your metal or plastic water bottles outside, they will freeze solid. Keep your bottle inside your tent, or wrapped in a spare jacket inside your sleeping bag.

### 3. Take Care of Your Feet (Gaiters & Microspikes)
Walking on soft snow is easy, but walking on hard ice is slippery and dangerous. Wear microspikes on your boots for grip, and use gaiters to prevent snow from entering your boots and soaking your socks.

### 4. Hydrate & Eat (Even If You Don''t Feel Like It)
The cold air dries you out fast. You burn twice as many calories walking in the snow to keep your body warm. Drink plenty of warm water and snack on nuts, energy bars, and chocolates along the trail.

### 5. Start Early on Summit Day
Winter weather changes rapidly in the afternoon. Start your summit push early in the morning (around 4:00 AM) to catch the golden sunrise and return safely to camp before the afternoon clouds or winds set in.',
    'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?q=80&w=1200&auto=format&fit=crop',
    ARRAY['Trekking', 'Guides'],
    ARRAY['Winter Trekking', 'Safety Tips', 'Uttarakhand'],
    'Atul Nautiyal',
    '5 min read',
    'published',
    now(),
    true
  ),
  (
    'discovering-hanol-tons-valley',
    'Discovering Hanol: The Hidden Cultural Heritage Village of Tons Valley',
    'Explore the legend of the ancient Mahasu Devta temple and the unique architecture of the Tons River Valley.',
    '# Discovering Hanol: The Hidden Cultural Heritage Village of Tons Valley

Nestled deep in the northwestern corner of Uttarakhand, along the fast-flowing Tons river, lies **Hanol** — a village that feels untouched by time.

Hanol is not your typical tourist destination. It is a sacred heritage village steeped in mythology, unique architecture, and warm hospitality.

---

### The Legend of Mahasu Devta
The heart of Hanol is the ancient **Mahasu Devta Temple**, built in the 9th century. The temple is dedicated to Lord Mahasu (the local deity of the Jaunsar-Bawar region). According to local legend, the deity saved the valley from a terrible demon named Kirbir.

The temple is a masterpiece of wooden architecture, constructed in the classic Indo-Tibetan style with beautifully carved wooden gables and gongs.

### Live Like a Local
In Hanol, we stay in traditional double-story wooden houses called **Kath-Kuni** homes. The ground floor is historically used for keeping sheep and cattle (which keeps the house warm), while the family lives on the wood-paneled upper floor.

The food is as authentic as the stays. Expect hot Garhwali meals made from local millets (Mandua), red rice, and homegrown organic lentils served around a traditional wood stove.',
    'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200&auto=format&fit=crop',
    ARRAY['Culture', 'Travel'],
    ARRAY['Hanol', 'Heritage', 'Offbeat'],
    'Atul Nautiyal',
    '4 min read',
    'published',
    now() - interval '2 days',
    false
  ),
  (
    'moila-top-packing-checklist',
    'Moila Top Checklist: What to Pack for a Weekend Forest Hike',
    'A simple, lightweight checklist to prepare you for the alpine meadows, campfires, and starry nights of Moila Top.',
    '# Moila Top Checklist: What to Pack for a Weekend Forest Hike

At an altitude of 2,700 meters, **Moila Top** is the perfect weekend escape. It offers dense pine trails, rolling green meadows (bugyals), and a mysterious ancient cave near the summit.

Because it is a short 3-day trek, you don’t need to carry a heavy 60L backpack. Traveling light will make the hike much more enjoyable.

Here is your exact packing checklist for Moila Top:

---

### 🎒 The Backpack
*   A **30L to 40L backpack** with comfortable shoulder straps.
*   A rain cover for your backpack (essential for mountain weather).

### 🧥 Clothes & Warm Wear
*   1 quick-dry trekking t-shirt.
*   1 pair of comfortable trekking pants (avoid heavy jeans!).
*   1 warm fleece or light down jacket (nights get cold at the top).
*   1 raincoat or windcheater.
*   2 pairs of trekking socks.
*   A woolen cap (beanie) and gloves.

### 🥾 Footwear
*   Sturdy trekking shoes with good grip.
*   A pair of lightweight camp sandals or slippers to wear in the evening.

### 🔦 Accessories & Personal Items
*   **Headlamp or Flashlight** (with extra batteries for the campsite).
*   Reusable water bottle (at least 1L to 2L).
*   Personal toilet kit (toothbrush, biodegradable soap, wet wipes).
*   Sunscreen, sunglasses, and lip balm.',
    'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?q=80&w=1200&auto=format&fit=crop',
    ARRAY['Checklists', 'Trekking'],
    ARRAY['Moila Top', 'Packing Guide', 'Weekend Hike'],
    'Guides Team',
    '3 min read',
    'published',
    now() - interval '5 days',
    false
  )
ON CONFLICT (slug) DO NOTHING;
