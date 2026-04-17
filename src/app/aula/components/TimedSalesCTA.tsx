"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function TimedSalesCTA({ alwaysVisible = false }: { alwaysVisible?: boolean }) {
  const [visible, setVisible] = useState(alwaysVisible);

  useEffect(() => {
    if (alwaysVisible) return;

    // Tempo de aparecimento (ex: 4500s = 75 minutos). Padrão super rápido de 5seg pra testes se não achar a env
    const CTA_SECONDS = Number(process.env.NEXT_PUBLIC_CTA_APPEAR_SECONDS || 5);
    
    const timer = setTimeout(() => {
      setVisible(true);
    }, CTA_SECONDS * 1000);

    return () => clearTimeout(timer);
  }, [alwaysVisible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mt-12 bg-gradient-to-b from-[#141416] to-[#0A0A0B] border border-accent/20 rounded-2xl p-8 sm:p-12 text-center max-w-3xl mx-auto shadow-2xl relative overflow-hidden"
        >
          {/* Brilho de Fundo do CTA */}
          <div className="absolute inset-0 bg-accent/5 rounded-2xl blur-3xl pointer-events-none" />

          <p className="text-sm font-bold text-accent uppercase tracking-widest mb-3 relative z-10">
            {alwaysVisible ? "Participou da aula?" : "Inscrições abertas para a Mentoria"}
          </p>
          
          <h2 className="font-display text-3xl sm:text-4xl text-white mb-4 relative z-10">
            Método Próxima Cadeira
          </h2>

          <p className="w-full max-w-[90%] sm:max-w-xl mx-auto text-text-mid font-body text-[0.95rem] sm:text-base mb-8 relative z-10 leading-relaxed">
            {alwaysVisible 
              ? "Se você quer aplicar esse método com meu acompanhamento de perto, as inscrições estão oficialmente abertas." 
              : "Condição especial exclusiva para quem está ao vivo. Válida apenas durante esta sessão."}
          </p>

          <a 
            href={process.env.NEXT_PUBLIC_SALES_URL || "#"} 
            target="_blank" rel="noopener noreferrer"
            className="inline-flex w-full sm:w-auto items-center justify-center gap-2 px-8 py-4 bg-accent hover:bg-white text-bg font-bold font-body text-sm sm:text-base uppercase tracking-widest rounded-xl transition-all duration-300 relative z-10 shadow-[0_0_30px_rgba(201,169,97,0.3)] hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] hover:-translate-y-1"
          >
            Quero conhecer a mentoria →
          </a>

          <p className="text-xs text-text-low font-body mt-6 uppercase tracking-widest relative z-10">
            Vagas limitadas · Turma Especial
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
