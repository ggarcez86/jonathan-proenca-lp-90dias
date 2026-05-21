"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, MessageCircle } from "lucide-react";
import { supabaseBrowser } from "@/lib/supabase-browser";
import {
  isMessageClean,
  isValidMessage,
  isValidNickname,
  canSendMessage,
  markMessageSent,
} from "@/lib/chat-moderation";

type ChatMessage = {
  id: string;
  author_name: string;
  message: string;
  created_at: string;
};

export default function LiveChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [nickname, setNickname] = useState("");
  const [showNicknameInput, setShowNicknameInput] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [viewerCount, setViewerCount] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const isAutoScrollEnabled = useRef(true);

  // Carrega nickname salvo do localStorage
  useEffect(() => {
    const saved = localStorage.getItem("chat_nickname");
    if (saved) {
      setNickname(saved);
      setShowNicknameInput(false);
    }
  }, []);

  // Gera viewer count simulado (baseado em mensagens únicas + baseline)
  useEffect(() => {
    const uniqueAuthors = new Set(messages.map((m) => m.author_name));
    const baseline = 45 + Math.floor(Math.random() * 30);
    setViewerCount(baseline + uniqueAuthors.size);
  }, [messages]);

  // Carrega mensagens iniciais
  useEffect(() => {
    const loadMessages = async () => {
      const { data } = await supabaseBrowser
        .from("chat_messages")
        .select("*")
        .eq("is_visible", true)
        .order("created_at", { ascending: true })
        .limit(100);

      if (data) setMessages(data);
    };

    loadMessages();
  }, []);

  // Realtime subscription
  useEffect(() => {
    const channel = supabaseBrowser
      .channel("chat-realtime")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "chat_messages",
          filter: "is_visible=eq.true",
        },
        (payload) => {
          const newMsg = payload.new as ChatMessage;
          setMessages((prev) => {
            // Evita duplicatas
            if (prev.some((m) => m.id === newMsg.id)) return prev;
            // Mantém últimas 100 mensagens
            const updated = [...prev, newMsg];
            return updated.slice(-100);
          });
        }
      )
      .subscribe();

    return () => {
      supabaseBrowser.removeChannel(channel);
    };
  }, []);

  // Auto-scroll quando novas mensagens chegam
  useEffect(() => {
    if (isAutoScrollEnabled.current && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Detecta se o user scrollou pra cima (desativa auto-scroll)
  const handleScroll = useCallback(() => {
    const container = chatContainerRef.current;
    if (!container) return;
    const { scrollTop, scrollHeight, clientHeight } = container;
    isAutoScrollEnabled.current = scrollHeight - scrollTop - clientHeight < 80;
  }, []);

  // Salva nickname
  const handleSetNickname = () => {
    const validation = isValidNickname(nickname);
    if (!validation.valid) {
      setError(validation.error || "Nome inválido.");
      return;
    }
    localStorage.setItem("chat_nickname", nickname.trim());
    setShowNicknameInput(false);
    setError(null);
  };

  // Envia mensagem
  const handleSend = async () => {
    if (sending) return;

    const messageValidation = isValidMessage(newMessage);
    if (!messageValidation.valid) {
      setError(messageValidation.error || "Mensagem inválida.");
      return;
    }

    if (!isMessageClean(newMessage)) {
      setError("Mensagem contém conteúdo inapropriado.");
      return;
    }

    const rateCheck = canSendMessage();
    if (!rateCheck.allowed) {
      setError(`Aguarde ${Math.ceil((rateCheck.waitMs || 0) / 1000)}s para enviar outra mensagem.`);
      return;
    }

    setSending(true);
    setError(null);

    const { error: dbError } = await supabaseBrowser.from("chat_messages").insert({
      author_name: nickname.trim(),
      message: newMessage.trim(),
    });

    if (dbError) {
      setError("Erro ao enviar. Tente novamente.");
      console.error("Chat insert error:", dbError);
    } else {
      markMessageSent();
      setNewMessage("");
      isAutoScrollEnabled.current = true;
    }

    setSending(false);
  };

  // Formata hora da mensagem
  const formatTime = (dateStr: string) => {
    return new Date(dateStr).toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="flex flex-col h-full bg-[#0A0A0B]/90 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl">

      {/* HEADER DO CHAT */}
      <div className="flex items-center justify-between px-4 py-3 bg-white/[0.03] border-b border-white/5 shrink-0">
        <div className="flex items-center gap-2">
          <MessageCircle className="w-4 h-4 text-accent" />
          <span className="text-sm font-bold text-text-high uppercase tracking-wider">Chat ao Vivo</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
          </span>
          <span className="text-xs text-text-low font-mono">{viewerCount} online</span>
        </div>
      </div>

      {/* ÁREA DE MENSAGENS */}
      <div
        ref={chatContainerRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto p-3 space-y-1 scrollbar-thin min-h-0"
      >
        {messages.length === 0 && (
          <div className="flex items-center justify-center h-full">
            <p className="text-text-low text-xs text-center px-4">
              Seja o primeiro a mandar uma mensagem! 🎉
            </p>
          </div>
        )}

        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="group px-2 py-1.5 rounded-lg hover:bg-white/[0.03] transition-colors"
            >
              <div className="flex items-baseline gap-2">
                <span className="text-accent font-bold text-xs shrink-0 max-w-[100px] truncate">
                  {msg.author_name}
                </span>
                <span className="text-text-high/80 text-[0.8rem] leading-snug break-words min-w-0">
                  {msg.message}
                </span>
                <span className="text-[10px] text-text-low/50 font-mono ml-auto shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                  {formatTime(msg.created_at)}
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        <div ref={messagesEndRef} />
      </div>

      {/* ÁREA DE INPUT */}
      <div className="border-t border-white/5 p-3 bg-white/[0.02] shrink-0">
        {/* Erro */}
        <AnimatePresence>
          {error && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="text-red-400 text-[11px] mb-2 px-1"
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>

        {showNicknameInput ? (
          /* NICKNAME INPUT */
          <div className="flex gap-2">
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSetNickname()}
              placeholder="Seu nome..."
              maxLength={30}
              className="flex-1 bg-surface-1 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-text-low/50 outline-none focus:border-accent/50 transition-colors"
            />
            <button
              onClick={handleSetNickname}
              className="px-4 py-2 bg-accent text-bg font-bold text-xs uppercase tracking-wider rounded-lg hover:bg-white transition-colors shrink-0"
            >
              Entrar
            </button>
          </div>
        ) : (
          /* MESSAGE INPUT */
          <div className="flex gap-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => {
                setNewMessage(e.target.value);
                setError(null);
              }}
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
              placeholder="Mande sua mensagem..."
              maxLength={280}
              disabled={sending}
              className="flex-1 bg-surface-1 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-text-low/50 outline-none focus:border-accent/50 transition-colors disabled:opacity-50"
            />
            <button
              onClick={handleSend}
              disabled={sending || newMessage.trim().length === 0}
              className="p-2.5 bg-accent text-bg rounded-lg hover:bg-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
