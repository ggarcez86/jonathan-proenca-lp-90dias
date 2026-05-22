"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TimedSalesCTA from "./TimedSalesCTA";
import LiveChat from "./LiveChat";
import { supabaseBrowser } from "@/lib/supabase-browser";

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

export default function LiveEvent() {
  const [chatEnabled, setChatEnabled] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);
  const playerRef = useRef<any>(null);

  // Chat toggle via Supabase Realtime
  useEffect(() => {
    const fetchConfig = async () => {
      const { data } = await supabaseBrowser
        .from("site_config")
        .select("value")
        .eq("key", "chat_enabled")
        .single();
      if (data) setChatEnabled(data.value);
    };
    fetchConfig();

    const channel = supabaseBrowser
      .channel("site-config-changes")
      .on("postgres_changes", {
        event: "UPDATE",
        schema: "public",
        table: "site_config",
        filter: "key=eq.chat_enabled",
      }, (payload) => { setChatEnabled(payload.new.value); })
      .subscribe();

    return () => { supabaseBrowser.removeChannel(channel); };
  }, []);

  // YouTube IFrame API — detecta fim do vídeo e exibe placeholder
  useEffect(() => {
    const initPlayer = () => {
      if (!document.getElementById("yt-player")) return;
      playerRef.current = new window.YT.Player("yt-player", {
        events: {
          onStateChange: (e: any) => {
            if (e.data === 0) { // 0 = YT.PlayerState.ENDED
              setVideoEnded(true);
              try { playerRef.current?.destroy(); } catch {}
              playerRef.current = null;
            }
          },
        },
      });
    };

    if (typeof window.YT !== "undefined" && window.YT.Player) {
      initPlayer();
    } else {
      const prev = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        if (prev) prev();
        initPlayer();
      };
      if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
        const script = document.createElement("script");
        script.src = "https://www.youtube.com/iframe_api";
        document.head.appendChild(script);
      }
    }

    return () => {
      if (playerRef.current) {
        try { playerRef.current.destroy(); } catch {}
        playerRef.current = null;
      }
    };
  }, []);

  return (
    <div className="max-w-[1920px] mx-auto w-full px-4 sm:px-6 py-6 pb-24 flex flex-col items-center">

      {/* BADGE */}
      <motion.div
        initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
        className="inline-flex items-center gap-3 px-4 py-1.5 bg-accent/10 backdrop-blur-md text-accent text-xs sm:text-sm font-semibold uppercase tracking-widest rounded-full border border-accent/20 mb-6"
      >
        Replay · Assista agora
      </motion.div>

      {/* LAYOUT: VIDEO + CHAT */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-[1400px] flex flex-col lg:flex-row gap-4"
      >
        {/* PLAYER CONTAINER */}
        <div className="flex-1 min-w-0">
          <div className="relative w-full aspect-video bg-[#0A0A0B] rounded-xl overflow-hidden shadow-2xl border border-white/10 flex items-center justify-center">
            {!videoEnded ? (
              <iframe
                id="yt-player"
                src="https://www.youtube.com/embed/a6cRqmYV5jM?autoplay=1&rel=0&enablejsapi=1"
                title="Replay da Aula"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="absolute inset-0 w-full h-full border-0"
              />
            ) : (
              <div className="text-center px-8">
                <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-5">
                  <svg className="w-6 h-6 text-text-low" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 7.5A2.25 2.25 0 017.5 5.25h9a2.25 2.25 0 012.25 2.25v9a2.25 2.25 0 01-2.25 2.25h-9a2.25 2.25 0 01-2.25-2.25v-9z" />
                  </svg>
                </div>
                <p className="text-text-high font-body font-semibold text-base">O vídeo foi encerrado.</p>
                <p className="text-text-low font-body text-sm mt-2">Obrigado por assistir!</p>
              </div>
            )}
          </div>

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

      {/* CTA DE VENDAS */}
      <div className="w-full max-w-[1400px] mt-4">
        <TimedSalesCTA />
      </div>

    </div>
  );
}
