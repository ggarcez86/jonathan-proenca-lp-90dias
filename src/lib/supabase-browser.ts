import { createClient } from "@supabase/supabase-js";

// Cliente Supabase para o BROWSER (usa a chave anon, segura para exposição pública).
// Usado para: Realtime subscriptions do chat e inserção de mensagens via RLS.

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabaseBrowser = createClient(supabaseUrl, supabaseAnonKey);
