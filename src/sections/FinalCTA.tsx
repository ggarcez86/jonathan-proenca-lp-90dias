"use client";

import CaptureForm from "@/components/CaptureForm";
import { motion } from "framer-motion";

export default function FinalCTA() {
  return (
    <section className="relative py-32 sm:py-40 px-6 bg-surface-1 border-b border-border overflow-hidden">
      {/* Background radial sutil para dar o tom dramático */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-surface-2 via-surface-1 to-bg pointer-events-none" />
      
      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl text-text-high leading-[1.1] tracking-tight">
            Sua próxima promoção começa nessa aula.
          </h2>
          <p className="text-xl sm:text-2xl text-text-mid font-body font-light">
            Gratuito. Ao vivo. Uma vez só.<br/>
            Garanta seu lugar antes que as vagas fechem.
          </p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-md mx-auto pt-8"
        >
          <div className="bg-surface-2 p-8 sm:p-10 border border-border rounded-xl shadow-2xl relative">
            {/* Ambient glow under the form */}
            <div className="absolute inset-0 bg-accent opacity-5 blur-2xl rounded-xl -z-10" />
            <CaptureForm variant="final" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
