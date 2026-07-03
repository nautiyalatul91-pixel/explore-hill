-- Seed default settings for company, homepage sections, and static pages
INSERT INTO public.settings (key, value) VALUES
  ('company_settings', '{
    "company_name": "Explore Hills",
    "phone": "+91 63977 10701",
    "email": "contact@explorehills.in",
    "whatsapp": "+91 63977 10701",
    "logo": "",
    "favicon": "",
    "address": "Dehradun, Uttarakhand",
    "google_maps": "",
    "social_instagram": "https://instagram.com/atul__nautiyal",
    "social_facebook": "",
    "gst_details": "",
    "bank_details": "",
    "invoice_prefix": "EH-",
    "founder_name": "Atul Nautiyal",
    "founder_title": "Replies to every traveler personally.",
    "company_description": "Authentic Himalayan adventures, small-group experiences and hidden destinations of Uttarakhand.",
    "footer_tagline": "Travel responsibly. Leave only footprints."
  }'::jsonb),
  ('homepage', '{
    "hero_headline": "Born in the hills, built for travelers",
    "hero_subheading": "Explore Hills is an Uttarakhand-based travel startup on a mission to share the real Himalayas.",
    "hero_cta_text": "Book Your Adventure",
    "hero_image": "",
    "announcement_bar_text": "🍂 Autumn Season Treks are Open! Small group batches filling fast.",
    "announcement_bar_enabled": true,
    "stats": [
      {"value": "2,500+", "label": "Happy Travelers"},
      {"value": "120+", "label": "Trips Completed"},
      {"value": "14–15", "label": "Small Group Size"},
      {"value": "4.9★", "label": "Average Rating"}
    ],
    "why_us": [
      {"title": "Couple-friendly", "text": "Private moments, quiet stays and itineraries designed for two."},
      {"title": "Small Groups", "text": "Just 14–15 travelers per batch so every voice is heard."},
      {"title": "Bonfire Nights", "text": "Stories, music and warmth under a sky full of Himalayan stars."},
      {"title": "Local Food Included", "text": "Authentic Garhwali meals cooked by our village hosts."},
      {"title": "Hidden Destinations", "text": "Off-the-grid valleys and villages most travelers never see."},
      {"title": "Safe & Comfortable", "text": "Vetted stays, certified guides and full transportation."}
    ],
    "categories": [
      {"title": "Treks", "to": "/treks"},
      {"title": "Cultural Trips", "to": "/trips"},
      {"title": "Camping", "to": "/gallery"},
      {"title": "Village Stays", "to": "/gallery"}
    ],
    "sections": [
      {"id": "hero", "enabled": true},
      {"id": "stats", "enabled": true},
      {"id": "categories", "enabled": true},
      {"id": "why_us", "enabled": true},
      {"id": "departures", "enabled": true},
      {"id": "testimonials", "enabled": true},
      {"id": "faqs", "enabled": true}
    ]
  }'::jsonb),
  ('static_pages', '{
    "about": {
      "title": "Born in the hills, built for travelers",
      "subtitle": "Explore Hills is a young Uttarakhand-based travel startup on a mission to share the real Himalayas with the world — one small group at a time.",
      "mission": "To open Uttarakhand''s hidden corners to travelers in a way that uplifts local communities, protects fragile ecosystems and leaves every guest with a story worth telling.",
      "vision": "To become India''s most trusted small-group Himalayan travel brand — a name travelers, villages and the mountains themselves can rely on."
    },
    "privacy": {
      "title": "Privacy Policy",
      "content": "At Explore Hills, we take your privacy seriously. This privacy policy describes how we collect, use, and protect your personal information when you book a trek, subscribe to our newsletter, or fill out a contact lead form."
    },
    "terms": {
      "title": "Terms and Conditions",
      "content": "Please read these terms and conditions carefully before booking treks with Explore Hills."
    },
    "careers": {
      "title": "Careers at Explore Hills",
      "content": "We are always looking for passionate mountain guides, content editors, coordinators, and local hosts who want to share the beauty of Uttarakhand with the world."
    },
    "treks": {
      "title": "Walk into the wild Himalayas",
      "subtitle": "From beginner-friendly weekend climbs to soulful summit pushes — every trek is led by experienced guides and built around small groups."
    },
    "trips": {
      "title": "Soulful journeys through timeless villages",
      "subtitle": "Slow travel, village hospitality and the rituals that shape Uttarakhand — designed for travelers who want to feel, not just see."
    },
    "gallery": {
      "title": "Frames from the trail",
      "subtitle": "Mountains, villages, bonfires and the people who make our trips unforgettable."
    },
    "contact": {
      "title": "Let''s plan your Himalayan story",
      "subtitle": "Call, message or write — we usually reply within a few hours. Atul personally answers every WhatsApp."
    }
  }'::jsonb)
ON CONFLICT (key) DO NOTHING;
