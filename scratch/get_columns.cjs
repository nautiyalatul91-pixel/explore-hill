const { createClient } = require('@supabase/supabase-js');

const db_url = "https://ceibmitkquyuvbzfwqyn.supabase.co";
const db_key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNlaWJtaXRrcXV5dXZiemZ3cXluIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIyODI1OTUsImV4cCI6MjA5Nzg1ODU5NX0.AUKIBx_J9sG79Rl0DL7Ww_FdJER3SIvCXbLWw_arH08";

const client = createClient(db_url, db_key);

async function checkColumn(col) {
  const { data, error } = await client.from('bookings').select(col).limit(1);
  if (error) {
    console.log(`Column '${col}': Error - ${error.message}`);
  } else {
    console.log(`Column '${col}': OK`);
  }
}

async function run() {
  const cols = ["id", "full_name", "phone", "email", "package_slug", "package_name", "travel_date", "travelers", "special_requirements", "status", "created_at"];
  for (const col of cols) {
    await checkColumn(col);
  }
}

run();
