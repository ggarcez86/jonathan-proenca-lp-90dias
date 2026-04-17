"use server";

import { captureFormSchema } from "@/lib/schemas/captureForm";
import { supabaseAdmin } from "@/lib/supabase";
import { headers } from "next/headers";

// Função auxiliar de disparo para reaproveitamento
async function dispatchWebhook(payload: any) {
  const webhookUrl = process.env.N8N_WEBHOOK_URL;
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

export async function submitCapture(formData: any) {
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
    const { error } = await supabaseAdmin
      .from("leads")
      .insert([payload]);

    if (error) {
      if (error.code === '23505') {
        console.log(`[Lead INFO] O email ${payload.email} tentou se cadastrar novamente. Bypass aplicado.`);
        // Chamada do webhook para garantir que leads repetidos também entrem em contato novamente!
        await dispatchWebhook(payload);
        return { success: true };
      }
      
      console.error("[Lead ERROR] Falha ao injetar no Supabase:", error);
      throw error;
    }

    // 4.5. Disparo do Webhook N8N (Aguardando resposta com Timeout)
    await dispatchWebhook(payload);

  } catch (error) {
    console.error("FALLBACK LOG - Lead recebido mas backend falhou gravemente", {
      data: result.data,
      error
    });
  }

  return { success: true };
}
