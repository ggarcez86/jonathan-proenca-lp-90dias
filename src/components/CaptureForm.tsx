"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { captureFormSchema, type CaptureFormPayload } from "@/lib/schemas/captureForm";
import { submitCapture } from "@/app/actions/submitCapture";
import { useRouter } from "next/navigation";
import { BorderBeam } from "@/components/magicui/BorderBeam";

// Utility mask for WhatsApp
const maskWhatsApp = (value: string) => {
  return value
    .replace(/\D/g, "")
    .slice(0, 11)
    .replace(/(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2");
};

export default function CaptureForm({ variant = "hero" }: { variant?: "hero" | "final" }) {
  const router = useRouter();
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CaptureFormPayload & { honey?: string }>({
    resolver: zodResolver(captureFormSchema),
  });

  const onSubmit = async (data: any) => {
    setServerError("");
    const result = await submitCapture(data);
    
    if (result.success) {
      router.push("/obrigado");
    } else {
      setServerError(result.error || "Ocorreu um erro. Tente novamente.");
    }
  };

  // Glassmorphism wrapper base
  const formWrapperClasses = 'bg-[#0A0A0B]/40 backdrop-blur-xl p-4 sm:p-6 lg:p-10 border border-white/5 rounded-2xl shadow-[0_30px_60px_rgba(0,0,0,0.5)] relative overflow-hidden group';

  const inputClasses = 'w-full bg-black/40 border border-white/10 px-3 sm:px-4 py-2.5 sm:py-3 md:py-4 text-text-high text-[14px] sm:text-[15px] md:text-base rounded-lg sm:rounded-xl focus:outline-none focus:border-accent focus:bg-black/60 focus:ring-1 focus:ring-accent transition-all font-body placeholder:text-text-low backdrop-blur-md';

  return (
    <motion.form 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`w-full ${formWrapperClasses}`}
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* Light bleed superior fixo na caixa */}
      <div className="absolute top-0 inset-x-0 h-[1px] w-full bg-gradient-to-r from-transparent via-white/30 to-transparent z-10" />

      {/* OVERLAY do BorderBeam absoluto! Não importa o container, a borda VAI percorrer o form por cima do fundo */}
      <BorderBeam 
        duration={12} 
        borderWidth={2} 
        colorFrom="#C9A961" 
        colorTo="transparent" 
        className="absolute inset-0 z-20 pointer-events-none rounded-2xl" 
      />

      {/* Inputs elevados no eixo Z para ficarem acima da luz */}
      <div className="relative z-30">
        <div className="text-center mb-4 sm:mb-8">
          <h3 className="text-[1.1rem] sm:text-2xl lg:text-[1.65rem] font-display tracking-wide text-text-high drop-shadow-md">Garanta seu lugar agora</h3>
          <p className="text-[11px] sm:text-[12px] md:text-[13px] text-text-mid font-body mt-0.5 sm:mt-2">(As vagas fecham quando lotar)</p>
        </div>

        {serverError && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-500 text-xs p-3 rounded text-center mb-4">
            {serverError}
          </div>
        )}

        <input type="text" {...register("honey")} className="hidden" tabIndex={-1} autoComplete="off" />

        <div className="space-y-3 sm:space-y-4">
          <div>
            <label className="block text-[11px] sm:text-xs font-bold text-text-mid uppercase tracking-[0.2em] mb-2.5 font-body ml-1">Nome completo</label>
            <input 
              type="text" 
              {...register("name")}
              className={inputClasses} 
              placeholder="Seu nome real" 
              disabled={isSubmitting}
            />
            {errors.name && <p className="text-[12px] text-red-400 mt-1.5 ml-1">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block text-[11px] sm:text-xs font-bold text-text-mid uppercase tracking-[0.2em] mb-2.5 font-body ml-1">Seu melhor e-mail</label>
            <input 
              type="email" 
              {...register("email")}
              className={inputClasses} 
              placeholder="voce@empresa.com.br" 
              disabled={isSubmitting}
            />
            {errors.email ? (
               <p className="text-[12px] text-red-400 mt-1.5 ml-1">{errors.email.message}</p>
            ) : (
               <p className="hidden sm:block text-[11px] text-text-low mt-1.5 font-body ml-1">Para enviar o link corporativo da aula.</p>
            )}
          </div>

          <div>
            <label className="block text-[11px] sm:text-xs font-bold text-text-mid uppercase tracking-[0.2em] mb-2.5 font-body ml-1">WhatsApp (DDD)</label>
            <input 
              type="tel" 
              {...register("whatsapp")}
              onChange={(e) => {
                const masked = maskWhatsApp(e.target.value);
                setValue("whatsapp", masked, { shouldValidate: true });
              }}
              className={inputClasses} 
              placeholder="(11) 98765-4321"
              disabled={isSubmitting} 
            />
            {errors.whatsapp ? (
               <p className="text-[12px] text-red-400 mt-1.5 ml-1">{errors.whatsapp.message}</p>
            ) : (
               <p className="hidden sm:block text-[11px] text-text-low mt-1.5 font-body ml-1">Para o link de acesso exclusivo 1h antes.</p>
            )}
          </div>
        </div>

        <button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full mt-5 sm:mt-8 bg-gradient-to-r from-accent to-accent/90 text-[#0A0A0B] py-3 sm:py-3.5 md:py-4 rounded-xl text-[0.8rem] sm:text-[0.85rem] font-bold uppercase tracking-[0.2em] hover:brightness-110 shadow-[0_0_15px_rgba(201,169,97,0.3)] sm:shadow-[0_0_20px_rgba(201,169,97,0.3)] hover:shadow-[0_0_30px_rgba(201,169,97,0.5)] active:scale-[0.98] transition-all duration-300 font-body flex items-center justify-center gap-3 group disabled:opacity-70 disabled:cursor-not-allowed"
        >
          <span>{isSubmitting ? "Enviando..." : "Quero minha vaga"}</span>
          {!isSubmitting && <span className="group-hover:translate-x-1.5 transition-transform duration-300">→</span>}
        </button>

        <p className="text-[9px] sm:text-[10px] md:text-[11px] text-center text-text-low mt-3 sm:mt-4 md:mt-6 font-body uppercase tracking-wider font-semibold opacity-70">
          100% gratuito &middot; Sem cartão
        </p>
      </div>
    </motion.form>
  );
}
