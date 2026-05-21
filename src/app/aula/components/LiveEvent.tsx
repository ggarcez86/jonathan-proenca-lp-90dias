"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TimedSalesCTA from "./TimedSalesCTA";
import LiveChat from "./LiveChat";
import { supabaseBrowser } from "@/lib/supabase-browser";

export default function LiveEvent() {
  const [chatEnabled, setChatEnabled] = useState(false);

  useEffect(() => {
    // Busca estado inicial
    const fetchConfig = async () => {
      const { data } = await supabaseBrowser
        .from("site_config")
        .select("value")
        .eq("key", "chat_enabled")
        .single();
      
      if (data) setChatEnabled(data.value);
    };
    fetchConfig();

    // Inscreve pra mudanças em tempo real
    const channel = supabaseBrowser
      .channel("site-config-changes")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "site_config",
          filter: "key=eq.chat_enabled",
        },
        (payload) => {
          setChatEnabled(payload.new.value);
        }
      )
      .subscribe();

    return () => {
      supabaseBrowser.removeChannel(channel);
    };
  }, []);

  return (
    <div className="max-w-[1920px] mx-auto w-full px-4 sm:px-6 py-6 pb-24 flex flex-col items-center">
      
      {/* BADGE AO VIVO */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
        className="inline-flex items-center gap-3 px-4 py-1.5 bg-red-500/10 backdrop-blur-md text-red-500 text-xs sm:text-sm font-semibold uppercase tracking-widest rounded-full border border-red-500/20 mb-6"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
        </span>
        Acontecendo agora
      </motion.div>

      {/* LAYOUT: VIDEO + CHAT (side-by-side no desktop) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-[1400px] flex flex-col lg:flex-row gap-4"
      >
        {/* PLAYER CONTAINER */}
        <div className="flex-1 min-w-0">
          <div className="relative w-full aspect-video bg-[#0A0A0B] rounded-xl overflow-hidden shadow-2xl border border-white/10">
            <iframe
              src="https://www.youtube.com/embed/SKrnEMESjOw?autoplay=1&rel=0"
              title="Aula ao Vivo"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="absolute inset-0 w-full h-full border-0"
            />
          </div>

          {/* DADOS ABAIXO DO VIDEO */}
          <div className="mt-4 text-center lg:text-left">
            <p className="text-text-mid font-body text-sm sm:text-base tracking-wide">
              Método Liga Executiva · com <span className="text-white font-medium">Jonathan Proença</span>
            </p>
          </div>
        </div>

        {/* CHAT LATERAL */}
        <AnimatePresence>
          {chatEnabled && (
            <motion.div 
              initial={{ opacity: 0, width: 0, scale: 0.95 }}
              animate={{ opacity: 1, width: "auto", scale: 1 }}
              exit={{ opacity: 0, width: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="w-full lg:w-[380px] h-[400px] sm:h-[450px] lg:h-auto lg:min-h-[500px] shrink-0"
            >
              <LiveChat />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* COMPONENTE TEMPORIZADO DE VENDAS */}
      <div className="w-full max-w-[1400px] mt-4">
        <TimedSalesCTA />
      </div>

    </div>
  );
}
