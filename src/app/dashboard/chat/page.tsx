"use client";

import { useState, useEffect, useCallback } from "react";
import { supabaseAdmin } from "@/lib/supabase";
import { approveMessage, hideMessage, toggleChatEnabled, toggleCtaVisible, triggerForceReload } from "@/app/actions/chatModeration";
import { Check, X, MessageCircle, ArrowLeft, Power, ShoppingCart, RefreshCw } from "lucide-react";

type ChatMessage = {
  id: string;
  author_name: string;
  message: string;
  is_visible: boolean;
  created_at: string;
};

export default function ChatModerationPage() {
  const [pending, setPending] = useState<ChatMessage[]>([]);
  const [approved, setApproved] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [chatEnabled, setChatEnabled] = useState(false);
  const [ctaVisible, setCtaVisible] = useState(false);
  const [toggling, setToggling] = useState(false);
  const [togglingCta, setTogglingCta] = useState(false);
  const [reloading, setReloading] = useState(false);

  const loadMessages = useCallback(async () => {
    // Busca mensagens pendentes via API direta (o RLS bloqueia is_visible=false para anon,
    // então vamos usar um endpoint server-side). Por enquanto, usamos fetch com polling.
    const res = await fetch("/api/chat/pending");
    if (res.ok) {
      const data = await res.json();
      setPending(data.pending || []);
      setApproved(data.approved || []);
      setChatEnabled(data.chat_enabled || false);
      setCtaVisible(data.cta_visible || false);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    loadMessages();
    // Polling a cada 2 segundos para capturar novas mensagens pendentes
    const interval = setInterval(loadMessages, 2000);
    return () => clearInterval(interval);
  }, [loadMessages]);

  const handleApprove = async (messageId: string) => {
    setProcessingId(messageId);
    const result = await approveMessage(messageId);
    if (result.error) {
      alert(result.error);
    } else {
      // Move da lista pendente para aprovada localmente
      const msg = pending.find((m) => m.id === messageId);
      if (msg) {
        setPending((prev) => prev.filter((m) => m.id !== messageId));
        setApproved((prev) => [{ ...msg, is_visible: true }, ...prev]);
      }
    }
    setProcessingId(null);
  };

  const handleReject = async (messageId: string) => {
    setProcessingId(messageId);
    const result = await hideMessage(messageId);
    if (result.error) {
      alert(result.error);
    } else {
      setPending((prev) => prev.filter((m) => m.id !== messageId));
    }
    setProcessingId(null);
  };

  const handleToggleChat = async () => {
    setToggling(true);
    const result = await toggleChatEnabled(!chatEnabled);
    if (result.error) {
      alert(result.error);
    } else {
      setChatEnabled(!chatEnabled);
    }
    setToggling(false);
  };

  const handleForceReload = async () => {
    if (!confirm("Forçar reload em todos os browsers com /aula aberto?")) return;
    setReloading(true);
    const result = await triggerForceReload();
    if (result.error) alert(result.error);
    setReloading(false);
  };

  const handleToggleCta = async () => {
    setTogglingCta(true);
    const result = await toggleCtaVisible(!ctaVisible);
    if (result.error) {
      alert(result.error);
    } else {
      setCtaVisible(!ctaVisible);
    }
    setTogglingCta(false);
  };

  const formatTime = (dateStr: string) => {
    return new Date(dateStr).toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-bg text-text-high p-4 sm:p-6 md:p-12 font-body selection:bg-accent/30 selection:text-white">
      <div className="max-w-4xl mx-auto space-y-8">

        {/* HEADER */}
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-white/5">
          <div className="flex items-center gap-3">
            <MessageCircle className="w-6 h-6 text-accent" />
            <div>
              <h1 className="font-display text-2xl text-white tracking-tight flex items-center gap-3 flex-wrap">
                Moderação do Chat
                <button
                  onClick={handleToggleChat}
                  disabled={toggling || loading}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider transition-colors ${
                    chatEnabled
                      ? "bg-green-500/20 text-green-400 border border-green-500/30 hover:bg-green-500/30"
                      : "bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30"
                  } disabled:opacity-50`}
                >
                  <Power className="w-3 h-3" />
                  {chatEnabled ? "Chat On" : "Chat Off"}
                </button>
                <button
                  onClick={handleToggleCta}
                  disabled={togglingCta || loading}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider transition-colors ${
                    ctaVisible
                      ? "bg-accent/20 text-accent border border-accent/30 hover:bg-accent/30"
                      : "bg-white/5 text-text-low border border-white/10 hover:bg-white/10"
                  } disabled:opacity-50`}
                >
                  <ShoppingCart className="w-3 h-3" />
                  {ctaVisible ? "Pitch On" : "Pitch Off"}
                </button>
                <button
                  onClick={handleForceReload}
                  disabled={reloading}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider transition-colors bg-blue-500/10 text-blue-400 border border-blue-500/20 hover:bg-blue-500/20 disabled:opacity-50"
                >
                  <RefreshCw className="w-3 h-3" />
                  {reloading ? "Enviando..." : "Forçar Reload"}
                </button>
              </h1>
              <p className="text-sm text-text-low mt-0.5">
                <span className="text-yellow-400 font-bold">{pending.length}</span> pendentes · <span className="text-green-400 font-bold">{approved.length}</span> aprovadas
              </p>
            </div>
          </div>
          <a
            href="/dashboard"
            className="text-xs font-bold uppercase tracking-widest text-text-mid hover:text-white py-2 px-4 rounded-lg bg-surface-2/50 border border-white/5 flex items-center gap-2 transition-colors"
          >
            <ArrowLeft className="w-3 h-3" /> Dashboard
          </a>
        </header>

        {loading ? (
          <div className="text-center py-20 text-text-low">Carregando...</div>
        ) : (
          <>
            {/* FILA DE PENDENTES */}
            <section>
              <h2 className="text-sm font-bold text-yellow-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
                Aguardando aprovação ({pending.length})
              </h2>

              {pending.length === 0 ? (
                <div className="text-center py-12 text-text-low bg-[#0A0A0B] border border-white/5 rounded-xl">
                  Nenhuma mensagem pendente. 👍
                </div>
              ) : (
                <div className="space-y-2">
                  {pending.map((msg) => (
                    <div
                      key={msg.id}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#0A0A0B] border border-yellow-500/20 hover:border-yellow-500/40 transition-colors"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline gap-2 flex-wrap">
                          <span className="text-accent font-bold text-sm">{msg.author_name}</span>
                          <span className="text-[11px] text-text-low font-mono">{formatTime(msg.created_at)}</span>
                        </div>
                        <p className="text-text-high/80 text-sm mt-0.5 break-words">{msg.message}</p>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        {/* APROVAR */}
                        <button
                          onClick={() => handleApprove(msg.id)}
                          disabled={processingId === msg.id}
                          className="p-2.5 text-green-400 hover:bg-green-500/20 rounded-lg transition-all disabled:opacity-50"
                          title="Aprovar"
                        >
                          <Check className="w-5 h-5" />
                        </button>
                        {/* REJEITAR */}
                        <button
                          onClick={() => handleReject(msg.id)}
                          disabled={processingId === msg.id}
                          className="p-2.5 text-red-400 hover:bg-red-500/20 rounded-lg transition-all disabled:opacity-50"
                          title="Rejeitar"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* MENSAGENS APROVADAS */}
            <section>
              <h2 className="text-sm font-bold text-green-400 uppercase tracking-widest mb-4">
                Aprovadas ({approved.length})
              </h2>

              {approved.length === 0 ? (
                <div className="text-center py-8 text-text-low bg-[#0A0A0B] border border-white/5 rounded-xl">
                  Nenhuma mensagem aprovada ainda.
                </div>
              ) : (
                <div className="space-y-1">
                  {approved.map((msg) => (
                    <div
                      key={msg.id}
                      className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-[#0A0A0B]/50 border border-white/5"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline gap-2">
                          <span className="text-accent/70 font-bold text-xs">{msg.author_name}</span>
                          <span className="text-[10px] text-text-low/50 font-mono">{formatTime(msg.created_at)}</span>
                        </div>
                        <p className="text-text-mid text-sm break-words">{msg.message}</p>
                      </div>
                      <Check className="w-3.5 h-3.5 text-green-500/40 shrink-0" />
                    </div>
                  ))}
                </div>
              )}
            </section>
          </>
        )}
      </div>
    </div>
  );
}
