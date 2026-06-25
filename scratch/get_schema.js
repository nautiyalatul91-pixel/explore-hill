const db_url = "https://ceibmitkquyuvbzfwqyn.supabase.co/rest/v1/";
const db_key =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNlaWJtaXRrcXV5dXZiemZ3cXluIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIyODI1OTUsImV4cCI6MjA5Nzg1ODU5NX0.AUKIBx_J9sG79Rl0DL7Ww_FdJER3SIvCXbLWw_arH08";

async function run() {
  try {
    const res = await fetch(db_url, {
      headers: {
        apikey: db_key,
        Authorization: `Bearer ${db_key}`,
      },
    });
    const spec = await res.json();
    console.log("Response:", spec);
  } catch (e) {
    console.error("Error:", e);
  }
}

run();
