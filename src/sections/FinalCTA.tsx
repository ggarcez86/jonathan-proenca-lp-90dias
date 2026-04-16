"use client";

import CaptureForm from "@/components/CaptureForm";
import { motion } from "framer-motion";

export default function FinalCTA() {
  return (
    <section className="relative py-32 sm:py-40 px-6 bg-[#0A0A0B] border-b border-border overflow-hidden">
      {/* Background radial sutil para dar o tom dramático */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-accent/5 via-transparent to-transparent pointer-events-none" />
      
      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl text-text-high leading-[1.1] tracking-tight">
            Sua próxima promoção <br className="hidden sm:block"/>
            <span className="italic font-light text-accent">pode começar aqui.</span>
          </h2>
          <p className="text-xl sm:text-[1.35rem] text-text-mid font-body font-light leading-relaxed">
            Gratuito. Ao vivo. Sem replay.<br/>
            E com aplicação prática imediata.<br/>
            <span className="text-text-high/90">Garanta seu lugar antes que as vagas fechem.</span>
          </p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full max-w-[640px] mx-auto pt-8 text-left relative"
        >
          {/* Subtle glow underneath to boost contrast */}
          <div className="absolute inset-x-8 inset-y-12 bg-accent opacity-[0.05] blur-[60px] rounded-full z-0 pointer-events-none" />
          
          <div className="relative z-10 w-full">
            <CaptureForm variant="hero" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
