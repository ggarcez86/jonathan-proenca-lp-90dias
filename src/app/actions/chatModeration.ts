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
 * Força o reload de todos os browsers com /aula aberto.
 */
export async function triggerForceReload() {
  if (!(await checkAuth())) return { error: "Não autorizado." };

  const timestamp = Date.now();

  const { data: updated, error: updateError } = await supabaseAdmin
    .from("site_config")
    .update({ value: timestamp })
    .eq("key", "force_reload")
    .select();

  if (updateError) {
    console.error("Erro ao forçar reload (update):", updateError);
    return { error: "Falha ao forçar reload." };
  }

  if (!updated || updated.length === 0) {
    const { error: insertError } = await supabaseAdmin
      .from("site_config")
      .insert({ key: "force_reload", value: timestamp });

    if (insertError) {
      console.error("Erro ao forçar reload (insert):", insertError);
      return { error: "Falha ao forçar reload." };
    }
  }
  return { success: true };
}

/**
 * Ativa/Desativa o CTA de vendas em tempo real.
 */
export async function toggleCtaVisible(enabled: boolean) {
  if (!(await checkAuth())) return { error: "Não autorizado." };

  const { data: updated, error: updateError } = await supabaseAdmin
    .from("site_config")
    .update({ value: enabled })
    .eq("key", "cta_visible")
    .select();

  if (updateError) {
    console.error("Erro ao alternar CTA:", updateError);
    return { error: "Falha ao alterar status do CTA." };
  }

  if (!updated || updated.length === 0) {
    const { error: insertError } = await supabaseAdmin
      .from("site_config")
      .insert({ key: "cta_visible", value: enabled });
    if (insertError) {
      console.error("Erro ao criar CTA (insert):", insertError);
      return { error: "Falha ao alterar status do CTA." };
    }
  }
  return { success: true };
}

