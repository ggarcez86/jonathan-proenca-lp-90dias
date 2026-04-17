import { createClient } from "@supabase/supabase-js";

async function run() {
  const supabase = createClient(
    "https://jfzkmpckwmoqixkhvgje.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpmemttcGNrd21vcWl4a2h2Z2plIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NjM3MDI3OSwiZXhwIjoyMDkxOTQ2Mjc5fQ.d_wI2trwIZNgvZiUwiWHbrWr5fjkGo2K-l6-rZbsBx4"
  );

  const { data, error } = await supabase.from('leads').select('*').limit(1);
  if (error || !data || data.length === 0) {
    console.error("No lead found", error);
    return;
  }
  
  const lead = data[0];
  console.log("Lead Encontrado:", lead);

  const response = await fetch("https://n8n.g6marketing.online/webhook-test/lead-webinar", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(lead)
  });

  console.log("Status N8N:", response.status, await response.text());
}
run();
