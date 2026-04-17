"use client";

import { motion } from "framer-motion";
import TimedSalesCTA from "./TimedSalesCTA";

export default function PostEvent() {
  return (
    <div className="max-w-[1200px] mx-auto w-full px-6 py-12 lg:py-16 flex flex-col items-center">
      
      {/* BADGE REPLAY */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        className="inline-flex items-center gap-2 px-4 py-1.5 bg-surface-2/60 backdrop-blur-md text-text-mid text-xs font-semibold uppercase tracking-widest rounded-full border border-white/5 mb-8"
      >
        Replay liberado por tempo limitado
      </motion.div>

      {/* HEADLINES */}
      <motion.h1 
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="font-display text-3xl sm:text-4xl text-center text-text-high tracking-tight leading-[1.1] max-w-3xl opacity-90"
      >
        Perdeu o encontro ao vivo? Assista a gravação oficial.
      </motion.h1>

      <motion.p 
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
        className="text-text-mid font-body text-center mt-4 text-sm sm:text-base max-w-2xl mb-12"
      >
        O replay dessa masterclass sairá do ar em breve. Se você quer o Método Próxima Cadeira, as inscrições estão oficialmente abertas logo abaixo.
      </motion.p>

      {/* PLAYER CONTAINER */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }}
        className="relative w-full max-w-[1100px] mx-auto aspect-video bg-[#0A0A0B] rounded-xl overflow-hidden shadow-2xl border border-white/10"
      >
        {/* Placeholder do Iframe */}
        <div className="absolute inset-0 flex items-center justify-center text-text-low border-2 border-dashed border-white/5 m-4 rounded-lg bg-surface-1/50">
           [O Vídeo da Vturb entrará neste espaço na versão de Produção]
        </div>
      </motion.div>

      {/* COMPONENTE TEMPORIZADO DE VENDAS (Aberto por padrão no Replay) */}
      <div className="w-full mt-8">
        <TimedSalesCTA alwaysVisible={true} />
      </div>

      {/* RECAP DO REPLAY */}
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
        className="w-full max-w-[1100px] mt-16 pt-16 border-t border-white/5"
      >
        <h3 className="font-display text-2xl text-text-high mb-8 text-center sm:text-left">O que você viu nessa aula:</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <p className="p-4 bg-surface-1 rounded-xl text-sm text-text-mid border border-white/5">01. Por que entregar resultado não é suficiente e o que realmente faz alguém ser promovido.</p>
          <p className="p-4 bg-surface-1 rounded-xl text-sm text-text-mid border border-white/5">02. O mapa de percepção: como seu gestor realmente decide quem sobe.</p>
          <p className="p-4 bg-surface-1 rounded-xl text-sm text-text-mid border border-white/5">03. A conversa de carreira que muda o jogo em 90 dias.</p>
          <p className="p-4 bg-surface-1 rounded-xl text-sm text-text-mid border border-white/5">04. O caminho guiado para escalar sua carreira com a mentoria Método Próxima Cadeira.</p>
        </div>
      </motion.div>

    </div>
  );
}
