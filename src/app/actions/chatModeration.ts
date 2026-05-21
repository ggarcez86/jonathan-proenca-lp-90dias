"use server";

import { supabaseAdmin } from "@/lib/supabase";
import { cookies } from "next/headers";

/**
 * Oculta uma mensagem do chat (moderação).
 * Somente acessível para admins autenticados no dashboard.
 */
export async function hideMessage(messageId: string) {
  // Verifica autenticação do dashboard
  const cookieStore = await cookies();
  const session = cookieStore.get("dashboard_auth");

  if (!session || session.value !== "true") {
    return { error: "Não autorizado." };
  }

  const { error } = await supabaseAdmin
    .from("chat_messages")
    .update({ is_visible: false })
    .eq("id", messageId);

  if (error) {
    console.error("Erro ao ocultar mensagem:", error);
    return { error: "Falha ao ocultar mensagem." };
  }

  return { success: true };
}
