import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supabaseAdmin } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function GET() {
  // Verifica autenticação do dashboard
  const cookieStore = await cookies();
  const session = cookieStore.get("dashboard_auth");

  if (!session || session.value !== "true") {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }

  // Busca mensagens pendentes (is_visible = false)
  const { data: pending } = await supabaseAdmin
    .from("chat_messages")
    .select("*")
    .eq("is_visible", false)
    .order("created_at", { ascending: true });

  // Busca mensagens aprovadas (is_visible = true), últimas 50
  const { data: approved } = await supabaseAdmin
    .from("chat_messages")
    .select("*")
    .eq("is_visible", true)
    .order("created_at", { ascending: false })
    .limit(50);

  return NextResponse.json({
    pending: pending || [],
    approved: approved || [],
  });
}
