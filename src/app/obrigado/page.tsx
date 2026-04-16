"use client";

import { motion } from "framer-motion";
import { CheckCircle, MessageCircle, Mail } from "lucide-react";
import { BorderBeam } from "@/components/magicui/BorderBeam";
import { Particles } from "@/components/magicui/Particles";

export default function ObrigadoPage() {
  const whatsappUrl = process.env.NEXT_PUBLIC_WHATSAPP_GROUP_URL || "#";
  const isWhatsappPending = whatsappUrl === "#" || whatsappUrl === "";

  return (
    <main className="min-h-screen bg-bg relative overflow-hidden flex flex-col items-center justify-center py-20 px-6">
      <Particles 
        className="absolute inset-0 z-0 opacity-40" 
        quantity={100} 
        ease={80} 
        color="#C9A961" 
        refresh 
      />

      <div className="absolute top-0 right-[-10vw] w-[50vw] h-[50vw] rounded-full bg-gradient-radial from-accent/10 to-transparent blur-3xl mix-blend-screen pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-2xl mx-auto"
      >
        <div className="w-full bg-[#0A0A0B]/40 backdrop-blur-xl p-8 lg:p-12 border border-white/5 rounded-3xl shadow-[0_30px_60px_rgba(0,0,0,0.5)] relative overflow-hidden text-center group">
          
          <div className="absolute top-0 inset-x-0 h-[1px] w-full bg-gradient-to-r from-transparent via-white/30 to-transparent z-10" />
          
          <BorderBeam 
            duration={15} 
            borderWidth={1.5} 
            colorFrom="#C9A961" 
            colorTo="transparent" 
            className="absolute inset-0 z-20 pointer-events-none rounded-3xl" 
          />

          <div className="relative z-30 flex flex-col items-center w-full">
            
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="w-20 h-20 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center mb-6"
            >
              <CheckCircle className="w-10 h-10 text-accent" />
            </motion.div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-text-high leading-[1.1] tracking-tight drop-shadow-2xl mb-4">
              Cadastro <span className="italic text-accent font-light">Confirmado!</span>
            </h1>

            <p className="w-full text-base sm:text-lg text-text-mid font-body leading-relaxed max-w-[500px] mx-auto mb-10 px-4">
              Sua vaga para a aula "Como Ser Promovido em 90 Dias" está garantida. Nosso time já processou seus dados de acesso.
            </p>

            {/* STATUS BOX */}
            <div className="w-full bg-black/40 border border-white/10 rounded-2xl p-6 text-left mb-10">
              <h3 className="text-xs sm:text-[13px] font-bold text-text-mid uppercase tracking-[0.2em] mb-5 font-body border-b border-white/5 pb-4">
                Próximos Passos Obrigatórios
              </h3>

              <div className="space-y-8">
                <div className="flex gap-4 sm:gap-5 items-start">
                  <div className="mt-1 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-surface-2 border border-white/5 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-text-high" />
                  </div>
                  <div>
                    <h4 className="text-base sm:text-lg font-semibold text-accent mb-1.5 font-body">Verifique seu E-mail</h4>
                    <p className="text-sm sm:text-[15px] text-gray-300 leading-relaxed font-body">
                      O link de transmissão VIP será enviado para o seu e-mail. Se cair no spam ou promoções, mova para a caixa de entrada para não perder o link no dia.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 sm:gap-5 items-start">
                  <div className="mt-1 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-surface-2 border border-white/5 flex items-center justify-center shrink-0">
                    <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-400" />
                  </div>
                  <div>
                    <h4 className="text-base sm:text-lg font-semibold text-accent mb-1.5 font-body">Receba Alertas no WhatsApp</h4>
                    <p className="text-sm sm:text-[15px] text-gray-300 leading-relaxed font-body">
                      Nós vamos te enviar lembretes e links de materiais extras no seu WhatsApp cadastrado, para você não depender de lembrar o horário no meio da sua rotina corrida.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* GRUPO DE WHATSAPP CTA */}
            <div className="w-full flex flex-col items-center">
              <p className="text-sm text-text-high font-bold mb-4">Entre no Grupo VIP e Não Perca os Materiais</p>
              <a 
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                role="button"
                className={`w-full max-w-[320px] flex items-center justify-center gap-3 py-4 px-6 rounded-xl text-[0.85rem] font-bold uppercase tracking-[0.15em] transition-all duration-300 font-body shadow-[0_0_20px_rgba(34,197,94,0.15)] hover:shadow-[0_0_30px_rgba(34,197,94,0.3)] active:scale-[0.98] ${
                  isWhatsappPending 
                  ? "bg-surface-2 text-text-mid cursor-not-allowed border border-white/10" 
                  : "bg-green-600 hover:bg-green-500 text-white"
                }`}
                onClick={(e) => isWhatsappPending && e.preventDefault()}
              >
                <div className="shrink-0 flex items-center justify-center">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <span className="whitespace-nowrap">{isWhatsappPending ? "Grupo em Criação..." : "Entrar no Grupo Oficial"}</span>
              </a>
              {isWhatsappPending && (
                <p className="text-[10px] text-text-low mt-3 uppercase tracking-widest bg-yellow-500/10 text-yellow-500 px-3 py-1 rounded-full border border-yellow-500/20">
                  ⚠️ Link pendente - Cadastre no arquivo .env
                </p>
              )}
            </div>

          </div>
        </div>
        
        {/* SMALL FOOTER */}
        <div className="mt-10 text-center">
          <p className="text-xs text-text-low font-body tracking-wider uppercase opacity-50">
            Jonathan Proença &copy; {new Date().getFullYear()}
          </p>
        </div>
      </motion.div>
    </main>
  );
}
