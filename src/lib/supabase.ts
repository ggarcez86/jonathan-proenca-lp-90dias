import { createClient } from "@supabase/supabase-js";

// Instanciamos o client padrão do Supabase.
// IMPORTANTE: Estamos usando a SERVICE_ROLE_KEY! 
// Este client só pode ser executado em Server Actions ou Route Handlers.
// NUNCA importe este arquivo em Client Components ("use client"), caso contrário, a Service Role vaza pro navegador.

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// Verificador para dev não perder o log do erro
if (!supabaseUrl || !supabaseServiceKey) {
  console.warn("AVISO: Variáveis de ambiente do Supabase ausentes no .env.local.");
}

export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    // Como estamos no Server e usando a role admin, não precisamos persistir sessão auth
    autoRefreshToken: false,
    persistSession: false,
  },
});
