"use server";

import { supabaseAdmin } from "@/lib/supabase";

export async function logViewerSession(sessionId: string) {
  await supabaseAdmin
    .from("viewer_sessions")
    .insert({ session_id: sessionId })
    .then(); // ignora erro de chave duplicada (reload na mesma sessão)
}
