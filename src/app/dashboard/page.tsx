import { supabaseAdmin } from "@/lib/supabase";
import { Users, Eye, TrendingUp, LogOut } from "lucide-react";
import { logoutDashboard } from "@/app/actions/dashboardAuth";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  // === DADOS MESTRES ===
  
  // 1. Total de Visitas Orgânicas
  const { count: viewsCount } = await supabaseAdmin
    .from("page_views")
    .select("*", { count: "exact", head: true })
    .eq("path", "/");

  // 2. Total de Leads
  const { count: leadsCount } = await supabaseAdmin
    .from("leads")
    .select("*", { count: "exact", head: true });

  // 3. Últimos 20 Leads
  const { data: latestLeads } = await supabaseAdmin
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(20);

  // Cálculos Derivados
  const vCount = viewsCount || 0;
  const lCount = leadsCount || 0;
  const conversionRate = vCount > 0 ? ((lCount / vCount) * 100).toFixed(1) : "0.0";

  return (
    <div className="min-h-screen bg-bg text-text-high p-6 md:p-12 font-body selection:bg-accent/30 selection:text-white">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* HEADER */}
        <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-white/5">
          <div>
            <h1 className="font-display text-3xl text-white tracking-tight">Mission Control</h1>
            <p className="text-sm text-text-low mt-1">Visão geral de tráfego e captação.</p>
          </div>
          <form action={logoutDashboard}>
            <button className="text-xs font-bold uppercase tracking-widest text-text-mid hover:text-white py-2 px-4 rounded-lg bg-surface-2/50 border border-white/5 flex items-center gap-2 transition-colors">
              <LogOut className="w-3 h-3" /> Encerrar Sessão
            </button>
          </form>
        </header>

        {/* METRICS CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#0A0A0B] border border-white/5 p-6 rounded-2xl flex items-start gap-4">
            <div className="w-12 h-12 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-full flex items-center justify-center shrink-0">
              <Eye className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-text-low uppercase tracking-widest mb-1">Acessos à Landing Page</p>
              <h2 className="text-4xl font-display text-white">{vCount}</h2>
            </div>
          </div>

          <div className="bg-[#0A0A0B] border border-white/5 p-6 rounded-2xl flex items-start gap-4">
            <div className="w-12 h-12 bg-green-500/10 border border-green-500/20 text-green-400 rounded-full flex items-center justify-center shrink-0">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-text-low uppercase tracking-widest mb-1">Leads Capturados</p>
              <h2 className="text-4xl font-display text-white">{lCount}</h2>
            </div>
          </div>

          <div className="bg-[#0A0A0B] border border-white/5 p-6 rounded-2xl flex items-start gap-4">
            <div className="w-12 h-12 bg-accent/10 border border-accent/20 text-accent rounded-full flex items-center justify-center shrink-0">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-text-low uppercase tracking-widest mb-1">Taxa de Conversão</p>
              <h2 className="text-4xl font-display text-white">{conversionRate}%</h2>
            </div>
          </div>
        </div>

        {/* DATA TABLE */}
        <div className="bg-[#0A0A0B] border border-white/5 rounded-2xl overflow-hidden">
          <div className="px-6 py-5 border-b border-white/5 bg-white/[0.02]">
            <h3 className="text-sm font-bold text-text-high uppercase tracking-widest">Últimos Leads Inseridos</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-text-mid">
              <thead className="bg-[#0A0A0B] border-b border-white/5 text-xs uppercase tracking-wider text-text-low">
                <tr>
                  <th className="px-6 py-4 font-semibold">Data</th>
                  <th className="px-6 py-4 font-semibold">Nome</th>
                  <th className="px-6 py-4 font-semibold">Email</th>
                  <th className="px-6 py-4 font-semibold">WhatsApp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {latestLeads && latestLeads.length > 0 ? (
                  latestLeads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-text-low font-mono text-xs">
                        {new Date(lead.created_at).toLocaleString('pt-BR')}
                      </td>
                      <td className="px-6 py-4 font-medium text-text-high">{lead.name}</td>
                      <td className="px-6 py-4">{lead.email}</td>
                      <td className="px-6 py-4 font-mono text-text-low">{lead.whatsapp}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center text-text-low">
                      Nenhum lead capturado ainda. O funil está vazio.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
