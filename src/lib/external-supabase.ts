import { createClient } from "@supabase/supabase-js";
// Customer-owned Supabase project for storing booking submissions.
// Publishable (anon) key — safe to ship in the client bundle.
const URL = "https://ceibmitkquyuvbzfwqyn.supabase.co";
const ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNlaWJtaXRrcXV5dXZiemZ3cXluIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIyODI1OTUsImV4cCI6MjA5Nzg1ODU5NX0.AUKIBx_J9sG79Rl0DL7Ww_FdJER3SIvCXbLWw_arH08";
export const bookingsDb = createClient(URL, ANON_KEY, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
    storageKey: "explorehills-bookings",
  },
});
