"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function ExpertBio() {
  return (
    <section className="py-24 lg:py-40 px-6 border-b border-border bg-[#0D0D0E]">
      <div className="max-w-[1300px] mx-auto grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-16 lg:gap-24 items-center">
        
        {/* Prose Left */}
        <motion.div 
           initial={{ opacity: 0, x: -30 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true, margin: "-100px" }}
           transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
           className="font-body"
        >
          {/* Top Badge */}
          <div className="mb-10 lg:mb-12">
            <span className="inline-block border border-accent/40 text-accent text-[10px] sm:text-[11px] font-semibold tracking-[0.25em] px-5 py-2 rounded-full uppercase">
              Mentor
            </span>
          </div>
          
          <h2 className="font-display text-4xl sm:text-5xl lg:text-[4.5rem] text-text-high leading-[1.05] tracking-tight mb-12">
            Quem é <br className="hidden sm:block"/>
            <span className="text-accent italic font-light">Jonathan Proença?</span>
          </h2>
          
          <div className="space-y-6 text-[1.05rem] sm:text-[1.15rem] text-text-mid leading-relaxed font-light lg:pr-8">
            <p>Cresci em Madureira, subúrbio do Rio de Janeiro. Casa de um quarto, pai segurança, mãe fazendo curso técnico.</p>
            <p>Fui técnico de fábrica por 10 anos. Trabalhei de macacão. Sem MBA, sem escola europeia, sem pistolão.</p>
            <p>Enquanto isso, mapeei o padrão. Estudei como gestores pensam, como decisões de promoção são tomadas de verdade — não o que eles dizem na avaliação anual, mas o que acontece na reunião quando você não está na sala.</p>
          </div>
          
          {/* Pull Quote */}
          <blockquote className="font-body font-light text-xl sm:text-2xl text-accent my-10 border-l-[3px] border-accent/40 pl-6 py-2 leading-snug">
            Resultado: mais de 11 promoções. Transferências para França, Espanha, Egito e Estados Unidos. Hoje lidero um time de inteligência artificial em uma multinacional no Texas.
          </blockquote>
          
          <div className="space-y-6 text-[1.05rem] sm:text-[1.15rem] text-text-mid leading-relaxed font-light lg:pr-8">
            <p>E ainda estou na ativa.</p>
            <p>O que eu vou te ensinar nessa aula não está em nenhum livro de gestão. Não tem no seu MBA. Não tem no LinkedIn.</p>
            <p className="text-text-high italic font-normal">Está aqui. Gratuito. Por tempo limitado.</p>
          </div>
        </motion.div>

        {/* Editorial Photo Right */}
        <motion.div 
           initial={{ opacity: 0, y: 40 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: "-100px" }}
           transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
           className="relative group"
        >
           <div className="aspect-[4/5] lg:aspect-[3/4] bg-[#141416] rounded-3xl sm:rounded-[2rem] border border-white/5 relative overflow-hidden shrink-0 shadow-2xl">
            <Image 
                  src="/assets/jonathan-quem-sou-eu.webp" 
                  alt="Jonathan Proença, mentor executivo"
                  fill
                  className="object-cover object-top opacity-95 group-hover:opacity-100 group-hover:scale-[1.02] transition-all duration-1000"
                  sizes="(max-width: 1024px) 100vw, 50vw"
            />
            {/* Subtle inner shadow/gradient for blending text overflow just in case */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0E]/80 via-transparent to-transparent z-10" />
            <div className="absolute inset-0 bg-gradient-to-tr from-accent/5 via-transparent to-transparent z-10 mix-blend-color-dodge opacity-50" />
          </div>
        </motion.div>
        
      </div>
    </section>
  );
}
