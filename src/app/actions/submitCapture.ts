"use server";

import { captureFormSchema } from "@/lib/schemas/captureForm";
import { supabaseAdmin } from "@/lib/supabase";
import { sendMetaEvent } from "@/lib/meta-capi";
import { headers } from "next/headers";

// Função auxiliar de disparo para reaproveitamento
async function dispatchWebhook(payload: any) {
  const webhookUrl = process.env.N8N_WEBHOOK_URL;
  console.log(">>> [DEBUG] Disparando Webhook para a URL:", webhookUrl);
  if (!webhookUrl) return;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);
    
    await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
  } catch (err) {
    console.error("[Lead Webhook ERROR] Falha ou lentidão ao enviar para o N8N:", err);
  }
}

/**
 * Extrai o IP real do cliente dos headers da requisição.
 * Suporta proxies comuns (Vercel, Cloudflare, etc.)
 */
async function getClientIp(): Promise<string> {
  const headersList = await headers();
  return (
    headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    headersList.get("x-real-ip") ||
    headersList.get("cf-connecting-ip") ||
    "0.0.0.0"
  );
}

/**
 * Extrai o User-Agent do cliente dos headers.
 */
async function getClientUserAgent(): Promise<string> {
  const headersList = await headers();
  return headersList.get("user-agent") || "";
}

interface SubmitCaptureInput {
  name: string;
  email: string;
  whatsapp: string;
  honey?: string;
  /** ID único para deduplicação Pixel ↔ CAPI */
  eventId?: string;
  /** Facebook Browser ID cookie (_fbp) */
  fbp?: string;
  /** Facebook Click ID cookie (_fbc) */
  fbc?: string;
  /** URL da página de origem */
  eventSourceUrl?: string;
}

export async function submitCapture(formData: SubmitCaptureInput) {
  // 1. Honeypot check (Se preenchido, é bot)
  if (formData.honey) {
    return { success: true }; 
  }

  // 2. Validação estrita do Payload com Zod
  const result = captureFormSchema.safeParse(formData);
  
  if (!result.success) {
    return { success: false, error: "Verifique os dados informados." };
  }

  try {
    // 3. Preparando Insert Payload
    const cleanWhatsapp = result.data.whatsapp.replace(/\D/g, "");

    const payload = {
      name: result.data.name,
      email: result.data.email.toLowerCase().trim(),
      whatsapp: cleanWhatsapp,
    };

    // 4. Inserção no Supabase (ignorando RLS porque supabaseAdmin usa Service Role)
    const { data: insertedData, error } = await supabaseAdmin
      .from("leads")
      .insert([payload])
      .select("id")
      .single();

    if (error) {
      if (error.code === '23505') {
        console.log(`[Lead INFO] O email ${payload.email} tentou se cadastrar novamente. Bypass aplicado.`);
        // Chamada do webhook para garantir que leads repetidos também entrem em contato novamente!
        await dispatchWebhook(payload);

        // ── META CAPI para leads duplicados (P2 fix) ──
        if (formData.eventId) {
          const { data: existingLead } = await supabaseAdmin
            .from("leads")
            .select("id")
            .eq("email", payload.email)
            .single();

          const clientIp = await getClientIp();
          const clientUserAgent = await getClientUserAgent();

          sendMetaEvent({
            eventName: "Lead",
            eventId: formData.eventId,
            eventSourceUrl: formData.eventSourceUrl || "https://webinario.ligaexecutiva.com.br",
            userData: {
              email: result.data.email,
              phone: result.data.whatsapp,
              fullName: result.data.name,
              clientIpAddress: clientIp,
              clientUserAgent: clientUserAgent,
              fbp: formData.fbp,
              fbc: formData.fbc,
              externalId: existingLead?.id,
            },
          }).catch((err) => {
            console.error("[Meta CAPI] Erro no fire-and-forget (bypass):", err);
          });
        }

        return { success: true };
      }
      
      console.error("[Lead ERROR] Falha ao injetar no Supabase:", error);
      throw error;
    }

    // 4.5. Disparo do Webhook N8N (Aguardando resposta com Timeout)
    await dispatchWebhook(payload);

    // ──────────────────────────────────────────────────────────────
    // 5. META CONVERSIONS API — Disparo server-side do evento Lead
    // ──────────────────────────────────────────────────────────────
    if (formData.eventId) {
      const clientIp = await getClientIp();
      const clientUserAgent = await getClientUserAgent();

      // Fire-and-forget: não bloqueia o retorno da action
      sendMetaEvent({
        eventName: "Lead",
        eventId: formData.eventId,
        eventSourceUrl: formData.eventSourceUrl || "https://webinario.ligaexecutiva.com.br",
        userData: {
          email: result.data.email,
          phone: result.data.whatsapp,
          fullName: result.data.name,
          clientIpAddress: clientIp,
          clientUserAgent: clientUserAgent,
          fbp: formData.fbp,
          fbc: formData.fbc,
          externalId: insertedData?.id,
        },
      }).catch((err) => {
        console.error("[Meta CAPI] Erro no fire-and-forget:", err);
      });
    }

  } catch (error) {
    console.error("FALLBACK LOG - Lead recebido mas backend falhou gravemente", {
      data: result.data,
      error
    });
  }

  return { success: true };
}
