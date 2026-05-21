"use client";

import { motion } from "framer-motion";
import TimedSalesCTA from "./TimedSalesCTA";

export default function LiveEvent() {
  return (
    <div className="max-w-[1200px] mx-auto w-full px-6 py-6 pb-24 flex flex-col items-center">
      
      {/* BADGE AO VIVO */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
        className="inline-flex items-center gap-3 px-4 py-1.5 bg-red-500/10 backdrop-blur-md text-red-500 text-xs sm:text-sm font-semibold uppercase tracking-widest rounded-full border border-red-500/20 mb-8"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
        </span>
        Acontecendo agora
      </motion.div>

      {/* PLAYER CONTAINER */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}
        className="relative w-full max-w-[1100px] mx-auto aspect-video bg-[#0A0A0B] rounded-xl overflow-hidden shadow-2xl border border-white/10"
      >
        <iframe
          src="https://www.youtube.com/embed/SKrnEMESjOw?autoplay=1&rel=0"
          title="Aula ao Vivo"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="absolute inset-0 w-full h-full border-0"
        />
      </motion.div>

      {/* DADOS ABAIXO DO VIDEO */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-6 text-center">
        <p className="text-text-mid font-body text-sm sm:text-base tracking-wide">
          Método Liga Executiva · com <span className="text-white font-medium">Jonathan Proença</span>
        </p>
      </motion.div>

      {/* COMPONENTE TEMPORIZADO DE VENDAS */}
      <div className="w-full mt-4">
        <TimedSalesCTA />
      </div>

    </div>
  );
}
