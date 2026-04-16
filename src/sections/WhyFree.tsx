"use client";

import { motion } from "framer-motion";

export default function WhyFree() {
  return (
    <section className="py-24 lg:py-40 px-6 border-b border-border relative overflow-hidden bg-bg">
      <div className="max-w-[800px] mx-auto relative z-10">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          {/* Subtle top accent */}
          <div className="flex justify-center mb-10">
            <div className="h-[1px] w-12 bg-accent/40" />
          </div>

          <h2 className="font-display text-4xl sm:text-5xl lg:text-[4.5rem] text-text-high mb-16 tracking-tight leading-none">
            Por que é <br className="sm:hidden" /><span className="text-accent italic font-light">gratuito?</span>
          </h2>
          
          <div className="text-[1.15rem] sm:text-[1.35rem] text-text-mid font-body font-light leading-relaxed mx-auto space-y-8">
            <p>
              Porque eu já fui o profissional que entregava tudo e não entendia por que não subia. 
            </p>
            <p className="text-text-high font-normal">
              Eu sei o que essa sensação faz com você.
            </p>
            <p>
              E eu sei que existe uma saída. Uma que não exige que você mude quem é.
            </p>
          </div>
          
          {/* Final Punchline isolated as a quote */}
          <div className="mt-16 pt-12 border-t border-white/5 relative">
            <p className="text-accent text-2xl sm:text-3xl lg:text-4xl font-display italic tracking-wide leading-snug">
              "Essa aula é a minha forma de provar isso antes de qualquer outra coisa."
            </p>
          </div>
        </motion.div>
        
      </div>
      
      {/* Background oversized watermark quote */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[45%] text-[30rem] lg:text-[45rem] font-display text-white/[0.02] pointer-events-none select-none leading-none z-0">
        "
      </div>
    </section>
  );
}
