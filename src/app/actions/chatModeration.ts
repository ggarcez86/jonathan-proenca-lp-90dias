"use server";

import { supabaseAdmin } from "@/lib/supabase";
import { cookies } from "next/headers";

async function checkAuth() {
  const cookieStore = await cookies();
  const session = cookieStore.get("dashboard_auth");
  return session?.value === "true";
}

/**
 * Aprova uma mensagem pendente (torna visível no chat público).
 */
export async function approveMessage(messageId: string) {
  if (!(await checkAuth())) return { error: "Não autorizado." };

  const { error } = await supabaseAdmin
    .from("chat_messages")
    .update({ is_visible: true })
    .eq("id", messageId);

  if (error) {
    console.error("Erro ao aprovar mensagem:", error);
    return { error: "Falha ao aprovar mensagem." };
  }
  return { success: true };
}

/**
 * Rejeita/oculta uma mensagem do chat.
 */
export async function hideMessage(messageId: string) {
  if (!(await checkAuth())) return { error: "Não autorizado." };

  const { error } = await supabaseAdmin
    .from("chat_messages")
    .delete()
    .eq("id", messageId);

  if (error) {
    console.error("Erro ao rejeitar mensagem:", error);
    return { error: "Falha ao rejeitar mensagem." };
  }
  return { success: true };
}

/**
 * Ativa/Desativa o chat em tempo real.
 */
export async function toggleChatEnabled(enabled: boolean) {
  if (!(await checkAuth())) return { error: "Não autorizado." };

  const { error } = await supabaseAdmin
    .from("site_config")
    .update({ value: enabled })
    .eq("key", "chat_enabled");

  if (error) {
    console.error("Erro ao alternar chat:", error);
    return { error: "Falha ao alterar status do chat." };
  }
  return { success: true };
}

/**
 * Ativa/Desativa o CTA de vendas em tempo real.
 */
export async function toggleCtaVisible(enabled: boolean) {
  if (!(await checkAuth())) return { error: "Não autorizado." };

  const { error } = await supabaseAdmin
    .from("site_config")
    .update({ value: enabled })
    .eq("key", "cta_visible");

  if (error) {
    console.error("Erro ao alternar CTA:", error);
    return { error: "Falha ao alterar status do CTA." };
  }
  return { success: true };
}

