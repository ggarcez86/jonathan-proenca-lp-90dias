"use server";

import { supabaseAdmin } from "@/lib/supabase";
import { headers } from "next/headers";

export async function logPageView(path: string) {
  try {
    const headersList = await headers();
    const userAgent = headersList.get("user-agent") || "unknown";
    
    // Obter IP (tenta headers comuns de proxy/Vercel)
    const ip = headersList.get("x-forwarded-for") 
      || headersList.get("x-real-ip") 
      || "unknown_ip";

    await supabaseAdmin.from("page_views").insert([
      {
        path,
        user_agent: userAgent,
        ip_address: ip,
      },
    ]);
  } catch (err) {
    // Falhas de tracking não devem derrubar a aplicação
    console.error("[Analytics ERROR]:", err);
  }
}
