"use client";

import CaptureForm from "@/components/CaptureForm";
import Image from "next/image";
import { motion } from "framer-motion";
import { Particles } from "@/components/magicui/Particles";

const fadeUpBlur = {
  hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
  visible: { 
    opacity: 1, 
    y: 0, 
    filter: "blur(0px)",
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } 
  }
};

const stagger = {
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

export default function Hero() {
  return (
    <section className="relative min-h-screen py-20 lg:py-0 flex items-center bg-bg overflow-hidden border-b border-border">
      
      {/* BACKGROUND EFFECTS */}
      {/* Spherical Glows */}
      <motion.div 
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.05, 0.15, 0.05],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 right-1/4 w-[800px] h-[800px] bg-accent/30 rounded-full blur-[150px] pointer-events-none mix-blend-screen z-0"
      />
      {/* Noise Texture */}
      <div className="absolute inset-0 z-0 opacity-[0.04] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />
      
      {/* MAGIC UI PARTICLES (Foligem Dourada) */}
      <Particles 
        className="absolute inset-0 w-full h-full z-0 opacity-100" 
        quantity={450} 
        color="#C9A961" 
      />

      {/* JONATHAN IMAGE SIDE (Direita Estrita) */}
      <div 
        className="absolute inset-y-0 right-0 w-full lg:w-[60%] overflow-hidden z-0 pointer-events-none"
        style={{ MaskImage: "linear-gradient(to right, transparent 0%, black 25%)", WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 25%)" }}
      >
        <motion.div
          initial={{ opacity: 0, filter: "blur(10px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <Image 
            src="/assets/jonathan-hero.webp" 
            alt="Jonathan Proença"
            fill
            priority
            unoptimized={true}
            className="object-cover object-[center_30%]"
          />
        </motion.div>
        {/* Gradientes para fundir o limite da esquerda da imagem ao fundo da página e não ter "corte duro" */}
        <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-bg via-bg/80 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-bg to-transparent" />
      </div>

      <div className="w-full relative z-10 px-6 lg:px-16 xl:px-24 2xl:px-32 max-w-[1920px] mx-auto">
        <div className="flex flex-col lg:flex-row w-full justify-between gap-12 lg:gap-8 min-h-[90vh] items-center">
          
          {/* LADO ESQUERDO: Texto + Form Prensado */}
          <div className="flex flex-col w-full lg:w-[48%] xl:w-[45%] max-w-[640px] text-left pt-12 lg:pt-0 shrink-0">
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={stagger}
              className="space-y-4"
            >
              {/* Badge */}
              <motion.div variants={fadeUpBlur}>
                <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-surface-2/60 backdrop-blur-md text-accent text-[10px] sm:text-xs font-semibold uppercase tracking-[0.25em] rounded-full border border-accent/20">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent text-accent opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                  </span>
                  Aula ao vivo e gratuita
                </div>
              </motion.div>
              
              {/* Headline */}
              <motion.h1 variants={fadeUpBlur} className="font-display text-[3rem] sm:text-[4rem] xl:text-[4.5rem] leading-[0.9] tracking-tight text-text-high drop-shadow-2xl">
                O método que <span className="block mt-1"><em className="italic text-accent font-light">nenhum diretor vai te ensinar</em></span> para ser promovido em 90 dias
              </motion.h1>
              
              {/* Subheadline + Copy */}
              <motion.p variants={fadeUpBlur} className="text-[1.1rem] sm:text-[1.2rem] xl:text-[1.35rem] text-text-mid font-body leading-[1.6] font-light mb-6 w-full">
                Mesmo que você já tenha tentado de tudo.<br/>
                Mesmo que seu gestor nunca te dê feedback claro.<br/>
                Não é azar, é porque ninguém te ensinou as regras do jogo.
              </motion.p>
              
              {/* max-w-full deixa a tabela preencher o container esquerdo confortavelmente sem espremer */}
              <motion.div variants={fadeUpBlur} className="w-full relative z-20 mt-10 lg:mt-14">
                <CaptureForm variant="hero" />
              </motion.div>

            </motion.div>
          </div>

          {/* LADO DIREITO: Espaço vazado para preservar o Rosto do Expert */}
          <div className="hidden lg:flex flex-col w-full lg:w-[50%]"></div>
          
        </div>
      </div>
    </section>
  );
}
