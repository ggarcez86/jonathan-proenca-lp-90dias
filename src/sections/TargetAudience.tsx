"use client";

import { motion } from "framer-motion";

export default function TargetAudience() {
  const audience = [
    "Você entrega mais do que todo mundo e continua no mesmo cargo há mais de 1 ano.",
    "Você já recebeu feedback vago tipo \"você está no caminho certo\" e não entendeu o que fazer com isso.",
    "Você já investiu em curso, certificação ou MBA e ainda não foi promovido.",
    "Você viu um colega com menos resultado ser promovido na sua frente — e não entendeu por quê.",
    "Você quer subir sem precisar \"puxar saco\", mudar quem você é ou jogar política."
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } }
  };

  return (
    <section className="py-24 lg:py-40 px-6 max-w-[1300px] mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
        
        {/* Left Side: Sticky Editorial Headline */}
        <div className="lg:col-span-5 relative">
          <div className="sticky top-32">
            <h2 className="font-display text-4xl sm:text-5xl lg:text-[4.5rem] text-text-high tracking-tight leading-[1] mb-12">
              Essa aula é <br className="hidden lg:block"/><span className="text-accent italic font-light">para você se...</span>
            </h2>
            
            <div className="h-[1px] w-12 bg-accent/40 mb-12" />
            
            {/* Split paragraph and larger typography to fill vertical space organically */}
            <div className="flex flex-col gap-8 w-full lg:max-w-[85%] pr-4 lg:pr-8">
              <p className="text-text-high/90 font-body text-xl lg:text-2xl leading-relaxed font-light">
                Nenhuma técnica genérica vai te salvar se a base estiver errada. 
              </p>
              <p className="text-text-mid font-body text-base lg:text-lg leading-relaxed">
                Se você sentiu o peso de <strong className="text-text-high font-medium">pelo menos um</strong> desses cenários, o modelo mental que você usa para crescer está sabotando a sua carreira.
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Staggered Premium Glass List */}
        <motion.div 
          className="lg:col-span-7 flex flex-col gap-5 sm:gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {audience.map((item, i) => (
             <motion.div 
               key={i}
               variants={itemVariants}
               className="group relative p-8 sm:p-10 rounded-3xl bg-[#141416]/70 backdrop-blur-sm border border-white/10 hover:border-accent/40 hover:bg-[#1A1A1D] transition-all duration-500 overflow-hidden"
             >
               <div className="flex gap-6 sm:gap-8 items-start">
                 
                 {/* Diamond Abstract High-Ticket Icon (higher base opacity for visibility) */}
                 <div className="mt-1.5 flex-shrink-0 text-accent opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500">
                    <svg width="12" height="12" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="7" width="9.89949" height="9.89949" transform="rotate(45 7 0)" fill="currentColor"/>
                    </svg>
                 </div>
                 
                 {/* Higher contrast base text (text-text-high/80 instead of deep mid) */}
                 <p className="text-lg sm:text-[1.3rem] text-text-high/80 font-body font-light leading-relaxed group-hover:text-text-high transition-colors duration-500">
                   {item}
                 </p>
                 
               </div>

               {/* Inner glow mask that reveals exactly on hover */}
               <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 opacity-0 group-hover:opacity-100" />
             </motion.div>
          ))}
        </motion.div>
        
      </div>
    </section>
  );
}
