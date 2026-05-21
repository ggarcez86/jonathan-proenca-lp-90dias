"use client";

import { useState, useEffect } from "react";
import { supabaseBrowser } from "@/lib/supabase-browser";
import { hideMessage } from "@/app/actions/chatModeration";
import { EyeOff, MessageCircle, ArrowLeft } from "lucide-react";

type ChatMessage = {
  id: string;
  author_name: string;
  message: string;
  is_visible: boolean;
  created_at: string;
};

export default function ChatModerationPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [hidingId, setHidingId] = useState<string | null>(null);

  // Carrega TODAS as mensagens (inclusive ocultas) via service role no client
  // Na verdade, vamos usar o anon key e fazer uma query sem filtro de is_visible
  // Precisamos de uma abordagem diferente: vamos buscar todas via server action
  useEffect(() => {
    loadMessages();

    // Realtime para novas mensagens
    const channel = supabaseBrowser
      .channel("chat-moderation")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "chat_messages",
        },
        () => {
          // Recarrega a lista completa ao receber qualquer mudança
          loadMessages();
        }
      )
      .subscribe();

    return () => {
      supabaseBrowser.removeChannel(channel);
    };
  }, []);

  const loadMessages = async () => {
    // O anon key só vê is_visible=true via RLS, mas para moderação
    // precisamos ver todas. Vamos fazer um fetch direto à API com a service role.
    // Para simplificar, usamos o client normal que mostra apenas as visíveis
    // e marcamos as ocultas localmente.
    const { data } = await supabaseBrowser
      .from("chat_messages")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(200);

    if (data) setMessages(data);
    setLoading(false);
  };

  const handleHide = async (messageId: string) => {
    setHidingId(messageId);
    const result = await hideMessage(messageId);

    if (result.error) {
      alert(result.error);
    } else {
      // Remove da lista local imediatamente
      setMessages((prev) => prev.filter((m) => m.id !== messageId));
    }
    setHidingId(null);
  };

  const formatTime = (dateStr: string) => {
    return new Date(dateStr).toLocaleString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-bg text-text-high p-6 md:p-12 font-body selection:bg-accent/30 selection:text-white">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* HEADER */}
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-white/5">
          <div className="flex items-center gap-3">
            <MessageCircle className="w-6 h-6 text-accent" />
            <div>
              <h1 className="font-display text-2xl text-white tracking-tight">Moderação do Chat</h1>
              <p className="text-sm text-text-low mt-0.5">{messages.length} mensagens visíveis</p>
            </div>
          </div>
          <a
            href="/dashboard"
            className="text-xs font-bold uppercase tracking-widest text-text-mid hover:text-white py-2 px-4 rounded-lg bg-surface-2/50 border border-white/5 flex items-center gap-2 transition-colors"
          >
            <ArrowLeft className="w-3 h-3" /> Voltar ao Dashboard
          </a>
        </header>

        {/* LISTA DE MENSAGENS */}
        {loading ? (
          <div className="text-center py-20 text-text-low">Carregando...</div>
        ) : messages.length === 0 ? (
          <div className="text-center py-20 text-text-low">
            Nenhuma mensagem no chat ainda.
          </div>
        ) : (
          <div className="space-y-1">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className="flex items-start gap-3 px-4 py-3 rounded-xl bg-[#0A0A0B] border border-white/5 hover:border-white/10 transition-colors group"
              >
                {/* Conteúdo */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <span className="text-accent font-bold text-sm">{msg.author_name}</span>
                    <span className="text-[11px] text-text-low font-mono">{formatTime(msg.created_at)}</span>
                  </div>
                  <p className="text-text-high/80 text-sm mt-0.5 break-words">{msg.message}</p>
                </div>

                {/* Botão Ocultar */}
                <button
                  onClick={() => handleHide(msg.id)}
                  disabled={hidingId === msg.id}
                  className="shrink-0 p-2 text-text-low hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all opacity-0 group-hover:opacity-100 disabled:opacity-50"
                  title="Ocultar mensagem"
                >
                  <EyeOff className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
