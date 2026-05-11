"use server";

import { supabaseAdmin } from "@/lib/supabase";
import { headers } from "next/headers";
import { sendMetaEvent } from "@/lib/meta-capi";

interface PageViewInput {
  path: string;
  /** ID único para deduplicação Pixel ↔ CAPI */
  eventId?: string;
  /** Facebook Browser ID cookie (_fbp) */
  fbp?: string;
  /** Facebook Click ID cookie (_fbc) */
  fbc?: string;
  /** URL completa da página */
  eventSourceUrl?: string;
}

export async function logPageView(input: PageViewInput) {
  try {
    const headersList = await headers();
    const userAgent = headersList.get("user-agent") || "unknown";
    
    // Obter IP (tenta headers comuns de proxy/Vercel)
    const ip = headersList.get("x-forwarded-for")?.split(",")[0]?.trim()
      || headersList.get("x-real-ip") 
      || headersList.get("cf-connecting-ip")
      || "unknown_ip";

    await supabaseAdmin.from("page_views").insert([
      {
        path: input.path,
        user_agent: userAgent,
        ip_address: ip,
      },
    ]);

    // ──────────────────────────────────────────────────────────────
    // META CAPI — Disparo server-side do evento PageView
    // ──────────────────────────────────────────────────────────────
    if (input.eventId) {
      sendMetaEvent({
        eventName: "PageView",
        eventId: input.eventId,
        eventSourceUrl: input.eventSourceUrl || "https://webinario.ligaexecutiva.com.br",
        userData: {
          email: "",
          phone: "",
          fullName: "",
          clientIpAddress: ip,
          clientUserAgent: userAgent,
          fbp: input.fbp,
          fbc: input.fbc,
        },
      }).catch((err) => {
        console.error("[Meta CAPI] Erro no fire-and-forget (PageView):", err);
      });
    }
  } catch (err) {
    // Falhas de tracking não devem derrubar a aplicação
    console.error("[Analytics ERROR]:", err);
  }
}
