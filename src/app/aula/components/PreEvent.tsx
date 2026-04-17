"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import ExpertProfile from "@/sections/ExpertProfile";

export default function PreEvent() {
  const [timeLeft, setTimeLeft] = useState<string>("00:00:00");

  useEffect(() => {
    const startStr = process.env.NEXT_PUBLIC_WEBINAR_START || "2026-05-14T21:00:00-03:00";
    if (!startStr) return;

    const target = new Date(startStr).getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = target - now;

      if (distance < 0) {
        clearInterval(interval);
        setTimeLeft("00:00:00");
        return;
      }

      const d = Math.floor(distance / (1000 * 60 * 60 * 24));
      const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((distance % (1000 * 60)) / 1000);

      if (d > 0) {
        setTimeLeft(`${d}d ${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`);
      } else {
        setTimeLeft(
          `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`
        );
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-[1200px] mx-auto px-6 py-12 lg:py-20 flex flex-col items-center">
      
      {/* BADGE ANIMADO */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        className="inline-flex items-center gap-2 px-4 py-1.5 bg-surface-2/60 backdrop-blur-md text-text-mid text-xs font-semibold uppercase tracking-widest rounded-full border border-white/5 mb-8"
      >
        Começa em breve · Fique nesta página
      </motion.div>

      {/* HEADLINES */}
      <motion.h1 
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="font-display text-3xl sm:text-4xl lg:text-5xl text-center text-text-high tracking-tight leading-[1.1] max-w-4xl opacity-90"
      >
        O método que nenhum diretor vai te ensinar para ser promovido em 90 dias
      </motion.h1>

      <motion.p 
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
        className="text-text-mid font-body text-center mt-6 text-sm sm:text-base max-w-2xl"
      >
        A aula será liberada automaticamente aqui nesta página.
      </motion.p>

      {/* PLACEHOLDER DE VÍDEO (COUNTDOWN) */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }}
        className="w-full max-w-4xl aspect-video bg-surface-1 border border-white/5 rounded-2xl md:rounded-3xl mt-12 flex flex-col items-center justify-center relative overflow-hidden shadow-2xl"
      >
        <div className="absolute inset-0 bg-accent/5 opacity-50 mix-blend-screen" />
        
        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-accent rounded-full flex items-center justify-center pl-2 shadow-[0_0_40px_rgba(201,169,97,0.3)] mb-8 z-10 opacity-50">
          <Play className="w-8 h-8 sm:w-10 sm:h-10 text-bg" />
        </div>

        <p className="text-text-mid text-sm uppercase tracking-widest font-bold mb-2 z-10">A aula começa em:</p>
        <div className="font-mono text-5xl sm:text-6xl md:text-7xl font-bold text-white tracking-widest z-10 tabular-nums">
          {timeLeft}
        </div>
      </motion.div>

      {/* QUICK LEARNINGS GRID */}
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
        className="w-full max-w-4xl mt-16 lg:mt-24"
      >
        <h3 className="text-center font-display text-2xl text-text-high mb-10">Enquanto espera, veja o que te aguarda:</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="bg-[#0A0A0B]/50 border border-white/5 p-6 rounded-2xl">
            <span className="text-accent font-mono text-sm opacity-50">01</span>
            <p className="text-text-high/80 mt-3 text-sm leading-relaxed">Por que quem entrega menos é promovido antes — e o que fazer a respeito</p>
          </div>

          <div className="bg-[#0A0A0B]/50 border border-white/5 p-6 rounded-2xl">
            <span className="text-accent font-mono text-sm opacity-50">02</span>
            <p className="text-text-high/80 mt-3 text-sm leading-relaxed">A conversa invisível que você nunca teve com seu gestor — e que muda tudo</p>
          </div>

          <div className="bg-[#0A0A0B]/50 border border-white/5 p-6 rounded-2xl">
            <span className="text-accent font-mono text-sm opacity-50">03</span>
            <p className="text-text-high/80 mt-3 text-sm leading-relaxed">Como usar IA para criar visibilidade absoluta e escalar seu nome na diretoria</p>
          </div>

        </div>
      </motion.div>

      {/* FOOTER BIO (Importado Oficial) */}
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
        className="w-[100vw] relative left-1/2 -translate-x-1/2 mt-16 pt-16 border-t border-white/5"
      >
        <div className="absolute top-8 left-0 w-full text-center z-10 px-6">
           <p className="text-xs text-accent mt-3 uppercase tracking-widest font-bold">
            Dica: Pegue papel e caneta ao assistir. Quem anota sai 10x na frente.
          </p>
        </div>
        <ExpertProfile />
      </motion.div>

    </div>
  );
}
