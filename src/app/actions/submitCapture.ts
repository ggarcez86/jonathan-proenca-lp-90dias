"use server";

import { captureFormSchema } from "@/lib/schemas/captureForm";
import { supabaseAdmin } from "@/lib/supabase";
import { headers } from "next/headers";

export async function submitCapture(formData: any) {
  // 1. Honeypot check (Se preenchido, é bot)
  if (formData.honey) {
    // Retornamos sucesso fake para despistar bot automatizado
    return { success: true }; 
  }

  // 2. Validação estrita do Payload com Zod
  const result = captureFormSchema.safeParse(formData);
  
  if (!result.success) {
    return { success: false, error: "Verifique os dados informados." };
  }

  try {
    // 3. Preparando Insert Payload
    // Formatamos o Telefone para tirar máscara caso não tenha sido tirado (apenas números)
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
      // Supabase código 23505 = Unique Violation (email já cadastrado)
      if (error.code === '23505') {
        console.log(`[Lead INFO] O email ${payload.email} tentou se cadastrar novamente. Bypass aplicado.`);
        // Consideramos sucesso para liberar o acesso da pessoa que já é lead.
        return { success: true };
      }
      
      console.error("[Lead ERROR] Falha ao injetar no Supabase:", error);
      // Se for outro erro, lançamos pra tratar abaixo
      throw error;
    }

  } catch (error) {
    // 5. Fallback & Graceful Degradation
    // Per PRD: "Sempre direcionar para success mesmo se falhar"
    console.error("FALLBACK LOG - Lead recebido mas backend falhou gravemente", {
      data: result.data,
      error
    });
    // Se estivesse em Produção Rigorosa, retornaríamos error, 
    // mas em marketing, preferimos que ele chegue ao grupo VIP do Whatsapp se o BD cair.
  }

  // Se tudo deu certo ou falhou silenciosamente no catch:
  return { success: true };
}
