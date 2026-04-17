"use client";

import { motion } from "framer-motion";

export default function Learnings() {
  const learnings = [
    {
      title: "Por que profissionais que entregam menos são promovidos antes de você",
      desc: "— e como virar esse jogo."
    },
    {
      title: "O erro silencioso que transforma bons profissionais em \"insubstituíveis no cargo\"",
      desc: "— e como sair dessa armadilha."
    },
    {
      title: "Como decodificar o perfil do seu gestor",
      desc: "— e falar exatamente o que ele precisa ouvir para te promover."
    },
    {
      title: "A conversa que você nunca teve com a sua liderança",
      desc: "— e que pode mudar tudo em 90 dias."
    },
    {
      title: "Como usar inteligência artificial para multiplicar seus resultados",
      desc: "— e criar visibilidade na sua empresa."
    },
    {
      title: "Como aplicar tudo isso já nos primeiros dias",
      desc: "— o passo a passo pra entrar em ação imediatamente."
    }
  ];

  return (
    <section className="py-12 sm:py-24 lg:py-32 px-6 max-w-[1300px] mx-auto border-b border-border">
      <h2 className="font-display text-[2rem] sm:text-5xl lg:text-[4rem] text-accent italic mb-10 sm:mb-16 tracking-tight leading-[1] sm:leading-[0.9]">
        O que você vai descobrir nessa aula
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {learnings.map((item, i) => (
          <motion.div 
            key={i}
            whileHover={{ scale: 0.97, backgroundColor: "#171719" }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="group relative p-6 sm:p-10 rounded-[1.5rem] sm:rounded-3xl bg-[#0D0D0E] border border-white/5 flex flex-col justify-start min-h-[160px] sm:min-h-[260px] overflow-hidden"
          >
            {/* Number */}
            <div className="mb-3 sm:mb-6">
              <span className="font-display text-lg sm:text-2xl text-text-low opacity-50 group-hover:opacity-100 group-hover:text-accent transition-colors">
                0{i + 1}
              </span>
            </div>

            {/* Content */}
            <div className="flex flex-col gap-2 sm:gap-3">
               <h3 className="text-[1.1rem] sm:text-[1.3rem] leading-tight sm:leading-snug text-text-high font-body font-light group-hover:text-accent transition-colors duration-500 pr-0 sm:pr-4">
                 {item.title}
               </h3>
               
               <p className="text-[12px] sm:text-[14px] text-text-mid font-body font-light italic leading-snug sm:leading-relaxed group-hover:text-text-high transition-colors duration-500">
                 {item.desc}
               </p>
            </div>

            {/* Subtle Gradient Glow that appears on hover inside the card */}
            <div className="absolute -inset-px rounded-3xl z-[-1] opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-gradient-to-br from-accent via-transparent to-transparent" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
