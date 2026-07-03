-- =========================================================================
-- SEED MOCK LEADS FOR CRM TESTING
-- Run this in your Supabase SQL Editor.
-- This inserts 3 test leads so you can test the Leads CRM pipelines.
-- =========================================================================

INSERT INTO public.leads (name, phone, email, message, interested_package, lead_source, lead_status, internal_notes)
VALUES 
  ('Amit Patel', '+91 98765 43210', 'amit.patel@gmail.com', 'Interested in Moila Top Trek for next weekend. Please share group details.', 'Moila Top Trek', 'website_contact_form', 'new', 'Wants to travel with a group of 4 friends.'),
  ('Sarah Khan', '+91 87654 32109', 'sarah.khan@yahoo.com', 'Do you have custom packages for couples for Yulla Kanda?', 'Yulla Kanda Trek', 'website_contact_form', 'contacted', 'Sent itinerary on WhatsApp. Waiting for reply.'),
  ('Vikram Singh', '+91 76543 21098', 'vikram.singh@outlook.com', 'Looking for Kedarkantha Trek starting from Dehradun.', 'Kedarkantha Trek', 'website_contact_form', 'interested', 'Requested snow trek equipment details.');
